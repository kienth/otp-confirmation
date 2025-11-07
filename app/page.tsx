"use client";

import React, { useState } from "react";
import { OTPForm } from "@/components/OTPForm";
import { AuthStatus } from "@/components/AuthStatus";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const { data: session, status } = useSession();

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Authentication */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                OTP & Newsletter System
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {session && (
                <nav className="flex space-x-4">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/">OTP Verification</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/newsletter">Newsletter</Link>
                  </Button>
                </nav>
              )}
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md">
          {!session && status !== "loading" ? (
            // Show sign-in prompt for unauthenticated users
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <CardTitle>Welcome to OTP System</CardTitle>
                <CardDescription>
                  Please sign in with your Google account to access OTP
                  verification and newsletter features.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild className="w-full">
                  <Link href="/auth/signin">Sign In with Google</Link>
                </Button>
              </CardContent>
            </Card>
          ) : status === "loading" ? (
            // Loading state
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </CardContent>
            </Card>
          ) : isVerified ? (
            // Verification success state
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <CardTitle className="text-green-800">
                  Verification Successful!
                </CardTitle>
                <CardDescription>
                  Your email has been successfully verified. You can now access
                  all features.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Button
                  onClick={() => setIsVerified(false)}
                  variant="outline"
                  className="w-full"
                >
                  Verify another email
                </Button>
                <Button asChild className="w-full">
                  <Link href="/newsletter">Go to Newsletter →</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            // OTP Form for authenticated users
            <OTPForm onVerificationSuccess={handleVerificationSuccess} />
          )}
        </div>
      </main>
    </div>
  );
}
