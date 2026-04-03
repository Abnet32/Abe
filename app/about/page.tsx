"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AboutPage from "@/components/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutRoutePage() {
  const router = useRouter();
  const handleNavigate = (
    view: "home" | "login" | "admin" | "contact" | "about" | "services",
  ) => {
    router.push(view === "home" ? "/" : `/${view}`);
  };

  return (
    <>
      <Header
        currentView="about"
        onNavigate={handleNavigate}
        isLoggedIn={false}
        onLogout={() => undefined}
      />
      <AboutPage onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
