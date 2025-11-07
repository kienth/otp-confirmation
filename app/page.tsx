"use client";

import React, { useState } from "react";
import { OTPForm } from "@/components/OTPForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isVerified ? (
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
                your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <button
                onClick={() => setIsVerified(false)}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Verify another email
              </button>
            </CardContent>
          </Card>
        ) : (
          <OTPForm onVerificationSuccess={handleVerificationSuccess} />
        )}
      </div>
    </main>
  );
}
