"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import QualitySection from "@/components/QualitySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeaderBanner from "@/components/LeaderBanner";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState("");

  const handleLogout = () => {
    void authClient.signOut();
    router.push("/");
  };

  const handleNavigate = (
    view: "home" | "login" | "admin" | "contact" | "about" | "services",
    sectionId?: string,
  ) => {
    if (view === "home") {
      router.push("/");
      if (sectionId) {
        window.setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
      return;
    }

    const pathMap: Record<
      "home" | "login" | "admin" | "contact" | "about" | "services",
      string
    > = {
      home: "/",
      login: "/login",
      admin: "/admin",
      contact: "/contact",
      about: "/about",
      services: "/services",
    };

    router.push(pathMap[view]);
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setChatInitialMessage(prompt);
    setIsChatOpen(true);
  };

  return (
    <>
      <Header
        currentView="home"
        onNavigate={handleNavigate}
        isLoggedIn={!!session}
        onLogout={handleLogout}
      />

      <main>
        <Hero />
        <About onNavigate={handleNavigate} />
        <Services onLearnMore={handleOpenChatWithPrompt} />
        <QualitySection />
        <WhyChooseUs />
        <LeaderBanner />
      </main>

      <Footer onNavigate={handleNavigate} />

      <ChatWidget
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        initialMessage={chatInitialMessage}
      />
    </>
  );
}
