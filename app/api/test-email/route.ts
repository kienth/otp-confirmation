import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    // Check if environment variables are set
    const requiredEnvVars = {
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing environment variables",
          missing: missingVars,
          message: "Please configure your .env.local file",
        },
        { status: 400 }
      );
    }

    // Test SMTP connection with Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Verify connection
    await transporter.verify();

    return NextResponse.json({
      success: true,
      message: "SMTP configuration is valid!",
      config: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        // Don't expose the password
      },
    });
  } catch (error) {
    console.error("SMTP test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "SMTP connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
        troubleshooting: {
          commonIssues: [
            "Check if you are using App Password (not regular password)",
            "Ensure 2-Factor Authentication is enabled on Gmail",
            "Verify EMAIL_HOST and EMAIL_PORT are correct",
            "Check if EMAIL_USER and EMAIL_PASS are properly set",
          ],
        },
      },
      { status: 500 }
    );
  }
}
