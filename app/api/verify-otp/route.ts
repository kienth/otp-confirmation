import { NextRequest, NextResponse } from "next/server";
import otpStore from "@/lib/otpStore";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    console.log(`Verifying OTP for ${email}: ${otp}`);
    console.log(`Total OTPs in store: ${otpStore.size()}`);
    console.log("All stored OTPs:", Array.from(otpStore.getAll().entries()));

    // Get stored OTP
    const storedData = otpStore.get(email);

    if (!storedData) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new one." },
        { status: 400 }
      );
    }

    // Debug timing before checking expiration
    const currentTime = Date.now();
    const timeRemaining = storedData.expires - currentTime;
    const minutesRemaining = timeRemaining / 1000 / 60;

    console.log(`=== OTP EXPIRATION DEBUG ===`);
    console.log(
      `Current time: ${currentTime} (${new Date(currentTime).toISOString()})`
    );
    console.log(
      `Expires time: ${storedData.expires} (${new Date(
        storedData.expires
      ).toISOString()})`
    );
    console.log(
      `Time remaining: ${timeRemaining}ms (${minutesRemaining.toFixed(
        2
      )} minutes)`
    );
    console.log(`Is expired: ${currentTime > storedData.expires}`);

    // Check if OTP has expired
    if (Date.now() > storedData.expires) {
      console.log(`OTP EXPIRED - Deleting OTP for ${email}`);
      otpStore.delete(email);
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // OTP is valid, remove from store
    otpStore.delete(email);

    return NextResponse.json(
      { message: "OTP verified successfully", verified: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
