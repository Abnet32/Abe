"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ServicesPage from "@/components/ServicesPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServicesRoutePage() {
  const router = useRouter();
  const handleNavigate = (
    view: "home" | "login" | "admin" | "contact" | "about" | "services",
  ) => {
    router.push(view === "home" ? "/" : `/${view}`);
  };

  return (
    <>
      <Header
        currentView="services"
        onNavigate={handleNavigate}
        isLoggedIn={false}
        onLogout={() => undefined}
      />
      <ServicesPage onLearnMore={() => router.push("/contact")} />
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
