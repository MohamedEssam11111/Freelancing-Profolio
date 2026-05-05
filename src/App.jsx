/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollStory from "./components/ScrollStory";
import ServicesSection from "./components/ServicesSection";
import CaseStudies from "./components/CaseStudies";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Button1 from "./components/Button1";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import SkillsSection from "./components/SkillsSection";
import Lenis from "@studio-freight/lenis";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.05, // Heavy inertia
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.style.backgroundColor = "#0B0B0F";
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.style.backgroundColor = "#F8F9FC";
    }
  }, [isDark]);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${isDark ? "text-dark-text-primary" : "text-light-text-primary light"}`}
    >
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <Background isDark={isDark} />

      <main>
        <Hero isDark={isDark} />
        <ScrollStory isDark={isDark} />
        <ServicesSection isDark={isDark} />
        <SkillsSection isDark={isDark} />
        <CaseStudies isDark={isDark} />
        <ProcessSection isDark={isDark} />
        <TestimonialsSection isDark={isDark} />
        <CtaSection isDark={isDark} />
        <Footer isDark={isDark} />
      </main>

      <div className="fixed top-8 right-8 z-[100] scale-75 md:scale-90 origin-top-right">
        <Button1
          defaultActive={!isDark}
          onClick={(isActive) => setIsDark(!isActive)}
          size="10px"
        />
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(192,132,252,0.05)_0%,transparent_50%)]" />
    </div>
  );
}
