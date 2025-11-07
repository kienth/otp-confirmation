import { NextRequest, NextResponse } from "next/server";
import otpStore from "@/lib/otpStore";

export async function POST(request: NextRequest) {
  try {
    console.log("=== SEND OTP TEST ENDPOINT CALLED ===");
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate test OTP
    const testOTP = "123456";
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    console.log(`Storing test OTP for ${email}: ${testOTP}`);

    // Store OTP
    otpStore.set(email, testOTP, expires);

    console.log(`OTP stored. Store size: ${otpStore.size()}`);
    console.log("All stored OTPs:", Array.from(otpStore.getAll().entries()));

    return NextResponse.json({
      success: true,
      message: "Test OTP stored successfully",
      email,
      otp: testOTP, // Only for testing - remove in production
      storeSize: otpStore.size(),
    });
  } catch (error) {
    console.error("Test send OTP error:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
