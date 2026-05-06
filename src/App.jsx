/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  /* =========================
     TOAST MESSAGE SYSTEM
     ========================= */
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', show: bool }
  const [remainingMs, setRemainingMs] = useState(5000);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let rafId;
    let lastTime;

    const tick = (currentTime) => {
      if (!lastTime) {
        lastTime = currentTime;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isHovered) {
        setRemainingMs((prev) => {
          const next = Math.max(0, prev - delta);
          if (next === 0) {
            setToast(null);
            return 0;
          }
          return next;
        });
      }

      if (toast) {
        rafId = requestAnimationFrame(tick);
      }
    };

    if (toast) {
      rafId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafId);
  }, [toast, isHovered]);

  const triggerToast = (type) => {
    setToast(null); // Reset first if one is active
    setTimeout(() => {
      setRemainingMs(5000);
      setToast({ type });
    }, 10);
  };

  const timeLeftSeconds = Math.ceil(remainingMs / 1000);

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

      {/* Toast Message System - Global Stacking Context */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed top-8 left-1/2 z-[99999] w-[90%] max-w-[500px] pointer-events-auto"
          >
            <div
              className={`relative px-8 py-6 rounded-2xl border backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${
                isDark
                  ? "bg-black/95 border-white/10"
                  : "bg-white/95 border-black/10"
              }`}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border flex-shrink-0 ${
                    toast.type === "error"
                      ? "bg-red-500/10 border-red-500/20"
                      : "bg-dark-primary/10 border-dark-primary/20"
                  }`}
                >
                  <div className="text-2xl">
                    {toast.type === "error" ? "❌" : "🚀"}
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <h3
                    className={`text-lg font-heading uppercase tracking-tighter leading-tight ${
                      toast.type === "error"
                        ? "text-red-500"
                        : isDark
                          ? "text-dark-primary"
                          : "text-light-primary"
                    }`}
                  >
                    {toast.type === "error"
                      ? "Failed to Send Message"
                      : "Message Sent Successfully"}
                  </h3>
                  <p
                    className={`text-xs tracking-tight font-medium mt-1 opacity-60`}
                  >
                    {toast.type === "error"
                      ? "Something went wrong. Please try again."
                      : "I’ll get back to you as soon as possible."}
                  </p>
                </div>

                <div className="ml-auto flex flex-col items-end opacity-40">
                  <span className="text-[10px] font-mono uppercase tracking-widest">
                    {timeLeftSeconds}s
                  </span>
                </div>
              </div>

              {/* Thin Progress Bar - GPU Accelerated & Smooth */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/10 dark:bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${toast.type === "error" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "bg-dark-primary shadow-[0_0_10px_rgba(212,255,0,0.6)]"}`}
                  style={{
                    width: "100%",
                    transformOrigin: "left",
                    transform: `scaleX(${remainingMs / 5000})`,
                    transition: isHovered ? "none" : "transform 0.1s linear",
                    willChange: "transform",
                  }}
                />
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_15px_rgba(212,255,0,0.03)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <CtaSection
          isDark={isDark}
          onSuccess={() => triggerToast("success")}
          onError={() => triggerToast("error")}
        />
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
