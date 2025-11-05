"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { LogIn, UserPlus, LayoutDashboard, Loader2 } from "lucide-react";

export function Header() {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo priority />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="text-muted-foreground size-4 animate-spin" />
              <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
          ) : isAuthenticated ? (
            <>
              <span className="text-muted-foreground hidden text-sm sm:inline">
                {user?.name}
              </span>
              <Button asChild>
                <Link href="/dashboard" className="gap-2">
                  <LayoutDashboard className="size-4" />
                  Go to Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" className="gap-2">
                  <LogIn className="size-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup" className="gap-2">
                  <UserPlus className="size-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
