"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessage =
    error && errorMessages[error]
      ? errorMessages[error]
      : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600">Something went wrong during sign in</p>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 text-center">
              ⚠️ Sign In Failed
            </CardTitle>
            <CardDescription className="text-center">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Error code: {error || "Unknown"}
              </p>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/signin">Try Again</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Common Solutions:
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Make sure you're using a valid Google account</li>
                <li>• Check your internet connection</li>
                <li>• Clear your browser cache and cookies</li>
                <li>• Try using an incognito/private window</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
