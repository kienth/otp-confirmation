import { NextRequest, NextResponse } from "next/server";
import otpStore from "@/lib/otpStore";

export async function GET() {
  try {
    const allOTPs = otpStore.getAll();
    const now = Date.now();

    const otpInfo = Array.from(allOTPs.entries()).map(([email, data]) => ({
      email,
      otp: data.otp,
      expiresAt: new Date(data.expires).toISOString(),
      createdAt: new Date(data.createdAt).toISOString(),
      isExpired: now > data.expires,
      remainingTimeMs: Math.max(0, data.expires - now),
      remainingTimeMinutes: Math.max(
        0,
        (data.expires - now) / 1000 / 60
      ).toFixed(2),
      // Raw timestamps for debugging
      expiresTimestamp: data.expires,
      currentTimestamp: now,
    }));

    return NextResponse.json({
      success: true,
      totalOTPs: otpStore.size(),
      otps: otpInfo,
      currentTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get debug info",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
