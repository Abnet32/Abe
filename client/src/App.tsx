import React, { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Services from "./components/Services.tsx";
import QualitySection from "./components/QualitySection.tsx";
import WhyChooseUs from "./components/WhyChooseUs.tsx";
import LeaderBanner from "./components/LeaderBanner.tsx";
import Footer from "./components/Footer.tsx";
import ChatWidget from "./components/ChatWidget.tsx";
import Login from "./components/Login.tsx";
import AdminDashboard from "./components/AdminDashboard.tsx";
import ContactPage from "./components/ContactPage.tsx";
import AboutPage from "./components/AboutPage.tsx";
import ServicesPage from "./components/ServicesPage.tsx";

type ViewState = "home" | "login" | "admin" | "contact" | "about" | "services";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  // Default to true for demo purposes as requested
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string>("");

  // Handle scrolling after view change
  useEffect(() => {
    if (currentView === "home" && scrollTarget) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setScrollTarget(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView, scrollTarget]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView("admin");
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("home");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);

    if (view === "home") {
      if (sectionId) {
        setScrollTarget(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setChatInitialMessage(prompt);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Only show public Header if NOT in admin view */}
      {currentView !== "admin" && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      <main>
        {currentView === "home" && (
          <>
            <Hero />
            <About onNavigate={handleNavigate} />
            <Services onLearnMore={handleOpenChatWithPrompt} />
            <QualitySection />
            <WhyChooseUs />
            <LeaderBanner />
          </>
        )}

        {currentView === "login" && <Login onLogin={handleLogin} />}

        {currentView === "admin" && (
          <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
        )}

        {currentView === "contact" && <ContactPage />}

        {currentView === "about" && <AboutPage onNavigate={handleNavigate} />}

        {currentView === "services" && (
          <ServicesPage onLearnMore={handleOpenChatWithPrompt} />
        )}
      </main>

      {/* Hide Footer on Admin pages to remove 'Schedule Your Appointment' banner */}
      {currentView !== "admin" && <Footer onNavigate={handleNavigate} />}

      <ChatWidget
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        initialMessage={chatInitialMessage}
      />
    </div>
  );
};

export default App;
