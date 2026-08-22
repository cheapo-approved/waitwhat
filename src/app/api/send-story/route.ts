import { createHmac } from "crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function createUnsubscribeToken(email: string) {
  const secret = process.env.UNSUBSCRIBE_SECRET;

  if (!secret) {
    throw new Error("UNSUBSCRIBE_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, title, summary, slug } = await request.json();

    if (
      !email ||
      typeof email !== "string" ||
      !title ||
      typeof title !== "string" ||
      !summary ||
      typeof summary !== "string" ||
      !slug ||
      typeof slug !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const storyUrl = `https://waitwhat.media/story/${encodeURIComponent(slug)}`;

    const token = createUnsubscribeToken(cleanEmail);

    // TEMPORARY LOCAL TEST URL.
    // Change this back to https://waitwhat.media before deploying.
    const unsubscribeUrl =
      `http://waitwhat.media/api/unsubscribe` +
      `?email=${encodeURIComponent(cleanEmail)}` +
      `&token=${encodeURIComponent(token)}`;

    const { data, error } = await resend.emails.send({
      from: "Wait...What?! <hello@waitwhat.media>",
      to: cleanEmail,
      replyTo: "tom@waitwhat.media",
      subject: title,
      html: `
        <!doctype html>
        <html>
          <body style="
            margin: 0;
            padding: 0;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            color: #111111;
          ">
            <div style="
              max-width: 560px;
              margin: 0 auto;
              padding: 48px 24px;
            ">
              <p style="
                margin: 0 0 14px;
                font-size: 12px;
                line-height: 1.4;
                font-weight: 700;
                letter-spacing: 2px;
                color: #888888;
              ">
                NEW DISCOVERY
              </p>

              <h1 style="
                margin: 0 0 24px;
                font-size: 32px;
                line-height: 1.15;
                font-weight: 800;
              ">
                ${title}
              </h1>

              <p style="
                margin: 0 0 28px;
                font-size: 17px;
                line-height: 1.6;
              ">
                ${summary}
              </p>

              <a
                href="${storyUrl}"
                style="
                  display: inline-block;
                  background: #111111;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: 700;
                  padding: 12px 18px;
                  border-radius: 8px;
                "
              >
                Read the story →
              </a>

              <p style="
                margin: 32px 0 0;
                font-size: 15px;
                line-height: 1.6;
              ">
                Tom
              </p>

              <p style="
                margin: 48px 0 0;
                font-size: 11px;
                line-height: 1.5;
                color: #888888;
              ">
                Don’t want these anymore?
                <a
                  href="${unsubscribeUrl}"
                  style="
                    color: #888888;
                    text-decoration: underline;
                  "
                >
                  Unsubscribe.
                </a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Story email error:", error);

      return NextResponse.json(
        { error: "Could not send story." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Send story error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}