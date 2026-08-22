import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const { data: contact, error: contactError } =
      await resend.contacts.create({
        email: cleanEmail,
        unsubscribed: false,
      });

    if (contactError) {
      console.error("Resend contact error:", contactError);

      return NextResponse.json(
        { error: "Could not subscribe." },
        { status: 500 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: "Wait...What?! <hello@waitwhat.media>",
      to: cleanEmail,
      replyTo: "tom@waitwhat.media",
      subject: "You’re in.",
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
              <h1 style="
                margin: 0 0 24px;
                font-size: 32px;
                line-height: 1.1;
                font-weight: 800;
              ">
                You’re in.
              </h1>

              <p style="
                margin: 0 0 20px;
                font-size: 17px;
                line-height: 1.6;
              ">
                Next time we find something that makes us say
                <em>Wait...What?!</em>, you’ll get it.
              </p>

              <p style="
                margin: 0 0 28px;
                font-size: 17px;
                line-height: 1.6;
              ">
                Until then, go find something you missed.
              </p>

              <a
                href="https://waitwhat.media"
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
                Find a story →
              </a>

              <p style="
                margin: 32px 0 0;
                font-size: 15px;
                line-height: 1.6;
              ">
                Tom<br />
                Wait...What?!
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error("Welcome email error:", emailError);

      // Subscriber was still successfully captured,
      // so don't make the signup appear to fail.
    }

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Subscribe error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}