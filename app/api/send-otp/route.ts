import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpStore from "@/lib/otpStore";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== SEND OTP ENDPOINT CALLED ===");
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const currentTime = Date.now();
    const expires = currentTime + 10 * 60 * 1000; // 10 minutes

    // Store OTP FIRST (before trying to send email)
    console.log(`=== OTP TIMING DEBUG ===`);
    console.log(
      `Current time: ${currentTime} (${new Date(currentTime).toISOString()})`
    );
    console.log(
      `Expires time: ${expires} (${new Date(expires).toISOString()})`
    );
    console.log(
      `Time difference: ${(expires - currentTime) / 1000 / 60} minutes`
    );
    console.log(`Storing OTP for ${email}: ${otp}`);
    otpStore.set(email, otp, expires);

    // Debug OTP storage
    console.log(`OTP stored for ${email}: ${otp}`);
    console.log(`Total OTPs in store: ${otpStore.size()}`);
    console.log("All stored OTPs:", Array.from(otpStore.getAll().entries()));

    // Try to send email (but don't fail if this doesn't work)
    try {
      // Debug environment variables (remove in production)
      console.log("Email config:", {
        user: process.env.EMAIL_USER ? "***configured***" : "MISSING",
        pass: process.env.EMAIL_PASS ? "***configured***" : "MISSING",
      });

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use gmail service instead of manual config
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        // Additional Gmail-specific options
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 30000, // 30 seconds
        socketTimeout: 60000, // 60 seconds
      });

      // Verify transporter configuration
      console.log("Verifying SMTP connection...");
      await transporter.verify();
      console.log("SMTP connection verified successfully");

      // Send email
      console.log("Sending email...");
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">OTP Verification</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p style="color: #666;">This OTP will expire in 10 minutes.</p>
            <p style="color: #666;">If you didn't request this OTP, please ignore this email.</p>
          </div>
        `,
      });
      console.log("Email sent successfully");

      return NextResponse.json(
        { message: "OTP sent successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending failed, but OTP is stored:", emailError);

      // Return success anyway since OTP is stored and can be verified
      // In a real app, you might want to return an error here
      return NextResponse.json(
        {
          message: "OTP generated and stored (email sending failed)",
          otp: otp, // Only for testing - remove in production
          warning:
            "Email could not be sent, but you can use the OTP above for testing",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in send-otp:", error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to send OTP",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
