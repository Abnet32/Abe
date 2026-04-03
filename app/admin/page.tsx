"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import type { AdminView } from "@/types";
import { authClient } from "@/lib/auth-client";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const role = String(session?.user.role || "").toLowerCase();
    if (!session || (role !== "admin" && role !== "employee")) {
      if (!isPending) {
        router.push("/login");
      }
      return;
    }

    setIsAuthorized(true);
  }, [isPending, router, session]);

  const handleNavigate = (view: AdminView, sectionId?: string) => {
    const pathMap: Record<AdminView, string> = {
      dashboard: "/admin",
      overview: "/admin?view=overview",
      orders: "/admin?view=orders",
      "new-order": "/admin?view=new-order",
      "edit-order": "/admin?view=edit-order",
      calendar: "/admin?view=calendar",
      inventory: "/admin?view=inventory",
      employees: "/admin?view=employees",
      "add-employee": "/admin?view=add-employee",
      "edit-employee": "/admin?view=edit-employee",
      "employee-detail": "/admin?view=employee-detail",
      customers: "/admin?view=customers",
      "add-customer": "/admin?view=add-customer",
      "edit-customer": "/admin?view=edit-customer",
      "customer-detail": "/admin?view=customer-detail",
      services: "/admin?view=services",
    };

    if (view === "dashboard" || view === "overview") {
      router.push("/admin");
      return;
    }

    router.push(pathMap[view]);
    if (sectionId) {
      window.setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const handleLogout = () => {
    void authClient.signOut();
    router.push("/");
  };

  if (!isAuthorized) return null;

  return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
}
