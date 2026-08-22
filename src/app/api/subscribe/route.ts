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

    const { data, error } = await resend.contacts.create({
      email: email.trim().toLowerCase(),
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Could not subscribe." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: data,
    });
  } catch (error) {
    console.error("Subscribe error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}