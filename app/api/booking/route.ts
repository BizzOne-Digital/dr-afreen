import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BookingInquiry from "@/lib/models/BookingInquiry";
import { sendBookingEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, patientType, concernType, preferredDate, message } = body;

    // Validate required fields
    if (!name || !phone || !patientType || !concernType || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Basic sanitization
    if (name.length > 100 || phone.length > 20 || message.length > 2000) {
      return NextResponse.json(
        { error: "Input exceeds allowed length." },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiry = await BookingInquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      patientType: patientType.trim(),
      concernType: concernType.trim(),
      preferredDate: preferredDate?.trim() || undefined,
      message: message.trim(),
    });

    // Send email notification (non-blocking)
    try {
      await sendBookingEmail({
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim(),
        patientType: patientType.trim(),
        concernType: concernType.trim(),
        preferredDate: preferredDate?.trim(),
        message: message.trim(),
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted. Dr. Afreen will reach out on WhatsApp shortly.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or message on WhatsApp." },
      { status: 500 }
    );
  }
}
