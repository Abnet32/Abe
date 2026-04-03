"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    const role = String(session.user.role || "customer").toLowerCase();
    router.replace(role === "admin" || role === "employee" ? "/admin" : "/");
  }, [router, session]);

  return (
    <Login
      onLogin={(role) => {
        const normalizedRole = role.toLowerCase();
        router.push(
          normalizedRole === "admin" || normalizedRole === "employee"
            ? "/admin"
            : "/",
        );
      }}
    />
  );
}
