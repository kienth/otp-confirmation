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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Navigation Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛡️ Secure Communication Platform
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            OTP Verification & Newsletter System
          </p>

          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/">
              <Button variant="default" className="flex items-center space-x-2">
                <span>🔐</span>
                <span>OTP Verification</span>
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>📧</span>
                <span>Newsletter Creator</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* OTP Section */}
          <div>
            {isVerified ? (
              <Card className="w-full">
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
                    Your email has been successfully verified. You can now
                    access your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <button
                    onClick={() => setIsVerified(false)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline block mx-auto"
                  >
                    Verify another email
                  </button>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">
                      Now try our Newsletter Creator:
                    </p>
                    <Link href="/newsletter">
                      <Button className="w-full flex items-center justify-center space-x-2">
                        <span>📧</span>
                        <span>Create Newsletter</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <OTPForm onVerificationSuccess={handleVerificationSuccess} />
            )}
          </div>

          {/* Features Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🔐</span>
                  <span>OTP Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Secure email verification using One-Time Passwords (OTP)
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ 6-digit secure OTP codes</li>
                  <li>✅ 10-minute expiration time</li>
                  <li>✅ Gmail SMTP integration</li>
                  <li>✅ Beautiful email templates</li>
                  <li>✅ Real-time verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>Newsletter Creator</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Rich text editor for creating beautiful HTML newsletters
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Tiptap rich text editor</li>
                  <li>✅ Formatting, images, tables</li>
                  <li>✅ Mobile-responsive emails</li>
                  <li>✅ Bulk email sending</li>
                  <li>✅ Professional templates</li>
                </ul>
                <div className="mt-4">
                  <Link href="/newsletter">
                    <Button variant="outline" className="w-full">
                      Try Newsletter Creator →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tech Stack */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">
              🛠️ Built With Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-semibold">Frontend</div>
                <div className="text-gray-600">
                  Next.js 14, TypeScript, Tailwind CSS
                </div>
              </div>
              <div>
                <div className="font-semibold">UI Components</div>
                <div className="text-gray-600">shadcn/ui, Tiptap Editor</div>
              </div>
              <div>
                <div className="font-semibold">Email Service</div>
                <div className="text-gray-600">Nodemailer, Gmail SMTP</div>
              </div>
              <div>
                <div className="font-semibold">API & State</div>
                <div className="text-gray-600">
                  REST API, Axios, React Hooks
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
