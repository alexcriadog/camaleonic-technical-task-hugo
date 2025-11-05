"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { useSession } from "@/lib/auth-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (isPending) {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image ?? undefined,
      });
    } else {
      setUser(null);
    }
  }, [session, isPending, setUser, setLoading]);

  return <>{children}</>;
}
