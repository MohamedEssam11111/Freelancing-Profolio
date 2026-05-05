import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    phase: "Discover",
    title: "Understand the Problem",
    text: "I start by understanding your goals, your users, and what success looks like."
  },
  {
    number: "02",
    phase: "Plan",
    title: "Structure the Experience",
    text: "I define layout, user flow, and content structure to guide users clearly."
  },
  {
    number: "03",
    phase: "Design",
    title: "Design the Interface",
    text: "I create clean, modern interfaces focused on usability and interaction."
  },
  {
    number: "04",
    phase: "Build",
    title: "Develop the Product",
    text: "I build fast, responsive websites using modern technologies like React and Tailwind."
  },
  {
    number: "05",
    phase: "Optimize",
    title: "Refine & Improve",
    text: "I test, polish, and optimize the experience to ensure smooth performance."
  }
];

const ProcessSection = ({ isDark }) => {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Entrance Animation
      gsap.fromTo(".process-header", 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 85%",
          }
        }
      );

      // Header Text Fill Animation
      const headerWords = gsap.utils.toArray(".process-header-description .process-word-fill");
      if (headerWords.length > 0) {
        gsap.fromTo(headerWords,
          { color: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" },
          {
            color: isDark ? "#FFFFFF" : "#111111",
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-header-description",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.5,
            }
          }
        );
      }

      // Steps Entrance Animation
      gsap.fromTo(".process-card", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
          }
        }
      );

      // Paragraph Fill Animation per Card
      const cards = gsap.utils.toArray(".process-card");
      cards.forEach((card) => {
        const words = card.querySelectorAll(".process-word-fill");
        if (words.length > 0) {
          gsap.fromTo(words,
            { color: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" },
            {
              color: isDark ? "#FFFFFF" : "#111111",
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 40%",
                scrub: 0.5,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <section 
      id="process"
      ref={containerRef}
      className={`process-section relative w-full py-24 md:py-48 transition-all duration-700 overflow-hidden`}
      style={{
        background: isDark 
          ? 'linear-gradient(180deg, #0B0B0F 0%, #11121A 100%)' 
          : 'linear-gradient(180deg, #F8F9FC 0%, #EEF1F7 100%)'
      }}
    >
      {/* Noise Texture Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${isDark ? 'invert' : ''}`} 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${isDark ? 'invert-0' : 'invert'}`}
        style={{ backgroundImage: `radial-gradient(${isDark ? 'white' : 'black'} 1px, transparent 0)`, backgroundSize: '40px 40px' }}
      />

      {/* Radial Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-dark-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <div className="process-header mb-24 md:mb-32">
          <span className="text-dark-primary font-mono text-sm tracking-[0.5em] uppercase block mb-4">
            Workflow
          </span>
          <h2 className={`text-5xl md:text-7xl font-heading tracking-tighter uppercase leading-none mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            How I Work
          </h2>
          <div className="process-header-description fill-text-container">
            <p className={`flex flex-wrap font-body text-xl max-w-2xl leading-relaxed`}>
              {"A clear process to build engaging and high-performing web experiences.".split(' ').map((word, wIdx) => (
                <span key={wIdx} className="process-word-fill mr-[0.25em]">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className={`hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] opacity-20 ${isDark ? 'bg-white' : 'bg-black'}`} />
          
          {processSteps.map((step, idx) => (
            <div 
              key={idx}
              className="process-card group relative flex flex-col items-start gap-6"
            >
              {/* Step Number Badge */}
              <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-lg border transition-all duration-500 group-hover:scale-110 group-hover:bg-dark-primary group-hover:border-dark-primary group-hover:text-black ${
                isDark 
                ? 'bg-black border-white/20 text-white' 
                : 'bg-white border-black/20 text-black'
              }`}>
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex flex-col gap-3">
                <span className="text-dark-primary font-mono text-[10px] font-bold uppercase tracking-widest">
                  Step {step.number} — {step.phase}
                </span>
                <h3 className={`text-xl md:text-2xl font-heading uppercase leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
                  {step.title}
                </h3>
                <div className="fill-text-container">
                  <p className="flex flex-wrap font-body text-sm leading-relaxed">
                    {step.text.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="process-word-fill mr-[0.25em]">
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Gradient Background (Subtle) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-dark-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ProcessSection;
