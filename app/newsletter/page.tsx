"use client";

import { useSession } from "next-auth/react";
import { AuthStatus } from "@/components/AuthStatus";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewsletterPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">
                  Newsletter System
                </h1>
              </div>
              <AuthStatus />
            </div>
          </div>
        </header>

        <main className="flex items-center justify-center p-4 pt-16">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">
                  Newsletter System
                </h1>
              </div>
              <AuthStatus />
            </div>
          </div>
        </header>

        <main className="flex items-center justify-center p-4 pt-16">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <svg
                  className="h-8 w-8 text-yellow-600"
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
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in with your Google account to access the newsletter
                system.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/signin">Sign In with Google</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">← Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Authentication */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                Newsletter System
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">OTP Verification</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href="/newsletter">Newsletter</Link>
                </Button>
              </nav>
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📧 Newsletter Creator
            </CardTitle>
            <CardDescription>
              Welcome, {session.user?.name}! Create and send newsletters with
              our rich text editor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-10 w-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Newsletter Editor Coming Soon
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                The rich text newsletter editor with TiptapEditor is currently
                being set up. You can still use the OTP verification feature.
              </p>
              <div className="space-y-2 pt-4">
                <p className="text-sm text-gray-500">
                  <strong>Current Features Available:</strong>
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✅ Google Authentication</li>
                  <li>✅ OTP Email Verification</li>
                  <li>🚧 Newsletter Rich Text Editor (In Progress)</li>
                  <li>🚧 HTML Email Templates (In Progress)</li>
                </ul>
              </div>
              <Button asChild className="mt-6">
                <Link href="/">← Back to OTP Verification</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
