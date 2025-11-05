"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GalleryVerticalEnd,
  BarChart3,
  Home,
  Table2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

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
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-xl font-semibold">Camaleonic Analytics</span>
          </Link>

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
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
