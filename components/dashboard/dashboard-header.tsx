"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Home, Table2, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useState } from "react";

export function DashboardHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo href="/dashboard" priority />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/dashboard/charts"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <BarChart3 className="size-4" />
              Charts
            </Link>
            <Link
              href="/dashboard/tables"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Table2 className="size-4" />
              Tables
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="text-muted-foreground text-sm">{user?.email}</div>
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hidden md:flex"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-4">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors"
            >
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/dashboard/charts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors"
            >
              <BarChart3 className="size-4" />
              Charts
            </Link>
            <Link
              href="/dashboard/tables"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors"
            >
              <Table2 className="size-4" />
              Tables
            </Link>
            <div className="border-muted my-2 border-t" />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition-colors"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
