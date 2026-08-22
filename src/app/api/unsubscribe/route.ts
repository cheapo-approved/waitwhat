import { createHmac, timingSafeEqual } from "crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function createExpectedToken(email: string) {
  const secret = process.env.UNSUBSCRIBE_SECRET;

  if (!secret) {
    throw new Error("UNSUBSCRIBE_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

function tokenIsValid(email: string, token: string) {
  const expected = createExpectedToken(email);

  const expectedBuffer = Buffer.from(expected);
  const tokenBuffer = Buffer.from(token);

  if (expectedBuffer.length !== tokenBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, tokenBuffer);
}

function pageHtml({
  title,
  message,
  buttonLabel,
  buttonHref,
  form,
}: {
  title: string;
  message: string;
  buttonLabel?: string;
  buttonHref?: string;
  form?: string;
}) {
  return `
    <!doctype html>
    <html>
      <body style="
        margin: 0;
        padding: 40px 24px;
        background: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        color: #111111;
        text-align: center;
      ">
        <div style="
          max-width: 520px;
          margin: 60px auto 0;
        ">
          <h1 style="
            margin: 0 0 16px;
            font-size: 32px;
            line-height: 1.1;
          ">
            ${title}
          </h1>

          <p style="
            margin: 0;
            font-size: 17px;
            line-height: 1.6;
            color: #555555;
          ">
            ${message}
          </p>

          ${
            form ??
            (buttonLabel && buttonHref
              ? `
                <a
                  href="${buttonHref}"
                  style="
                    display: inline-block;
                    margin-top: 28px;
                    background: #111111;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 12px 18px;
                    border-radius: 8px;
                  "
                >
                  ${buttonLabel}
                </a>
              `
              : "")
          }
        </div>
      </body>
    </html>
  `;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      return new NextResponse(
        pageHtml({
          title: "Something went wrong.",
          message: "This unsubscribe link is incomplete.",
          buttonLabel: "Back to Wait...What? →",
          buttonHref: "https://waitwhat.media",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!tokenIsValid(cleanEmail, token)) {
      return new NextResponse(
        pageHtml({
          title: "Something went wrong.",
          message: "This unsubscribe link isn't valid.",
          buttonLabel: "Back to Wait...What? →",
          buttonHref: "https://waitwhat.media",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    const form = `
      <form method="POST" action="/api/unsubscribe" style="margin-top: 28px;">
        <input type="hidden" name="email" value="${cleanEmail}" />
        <input type="hidden" name="token" value="${token}" />

        <button
          type="submit"
          style="
            border: 0;
            cursor: pointer;
            background: #111111;
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            padding: 12px 18px;
            border-radius: 8px;
          "
        >
          Unsubscribe
        </button>
      </form>
    `;

    return new NextResponse(
      pageHtml({
        title: "Want out?",
        message: "Tap below and we won't send you any more story emails.",
        form,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("Unsubscribe GET error:", error);

    return new NextResponse("Something went wrong.", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const token = String(formData.get("token") ?? "");

    if (!email || !token || !tokenIsValid(email, token)) {
      return new NextResponse(
        pageHtml({
          title: "Something went wrong.",
          message: "We couldn't verify this unsubscribe request.",
          buttonLabel: "Back to Wait...What? →",
          buttonHref: "https://waitwhat.media",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    const { error } = await resend.contacts.update({
      email,
      unsubscribed: true,
    });

    if (error) {
      console.error("Unsubscribe error:", error);

      return new NextResponse(
        pageHtml({
          title: "Something went wrong.",
          message: "We couldn't unsubscribe you right now.",
          buttonLabel: "Back to Wait...What? →",
          buttonHref: "https://waitwhat.media",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    return new NextResponse(
      pageHtml({
        title: "You're out.",
        message: "No hard feelings. You won't get any more story emails.",
        buttonLabel: "Back to Wait...What? →",
        buttonHref: "https://waitwhat.media",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("Unsubscribe POST error:", error);

    return new NextResponse("Something went wrong.", {
      status: 500,
    });
  }
}