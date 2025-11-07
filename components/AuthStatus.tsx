"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div className="text-sm">
          <p className="font-medium">{session.user?.name}</p>
          <p className="text-gray-500 text-xs">{session.user?.email}</p>
        </div>
      </div>

      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        variant="outline"
        size="sm"
      >
        Sign Out
      </Button>
    </div>
  );
}
