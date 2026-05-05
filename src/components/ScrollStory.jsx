import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    text: "Most websites look good\u2026",
    subtext: "but they don\u2019t engage."
  },
  {
    text: "Users scroll\u2026",
    subtext: "then leave."
  },
  {
    text: "I don\u2019t build websites.",
    subtext: "I build experiences."
  },
  {
    text: "Scroll-driven storytelling",
    subtext: "that keeps users hooked."
  },
  {
    text: "More engagement. More interaction.",
    subtext: "More conversions."
  }
];

const ScrollStory = ({ isDark }) => {
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const scenesRef = useRef([]);

  // Split text into characters for character-based animation
  const splitChars = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      scenesRef.current.forEach((scene, i) => {
        const headline = scene.querySelector('.headline');
        const chars = headline.querySelectorAll('.char');
        const secondary = scene.querySelector('.secondary');
        const secondaryFill = scene.querySelector('.secondary-fill');

        // Initial hide all scenes except possibly the first (timeline handles order)
        gsap.set(scene, { opacity: 0, y: 60, blur: 10, scale: 0.98 });
        
        // 1. ENTRY
        tl.to(scene, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        });

        // Staggered characters for headline
        tl.from(chars, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power3.out'
        }, "<");

        // 2. ACTIVE STATE (Micro movement / Hold)
        tl.to(scene, {
          scale: 1.02,
          duration: 2,
          ease: 'none'
        });

        // Paragraph filling animation for secondary text
        // Starts gray, fills to primary color
        if (secondaryFill) {
          tl.to(secondaryFill, {
            width: '100%',
            duration: 1.5,
            ease: 'power1.inOut'
          }, "<+=0.2");
        }

        // 3. EXIT (unless it's the last scene)
        if (i < scenesRef.current.length - 1) {
          tl.to(scene, {
            opacity: 0,
            y: -60,
            filter: 'blur(8px)',
            duration: 1,
            ease: 'power2.in'
          });
        }
      });

      // Background subtle gradient shift during scroll
      tl.to(containerRef.current, {
        backgroundPosition: "100% 100%",
        duration: scenesRef.current.length * 4,
        ease: "none"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="scroll-story relative min-h-screen overflow-hidden flex flex-col items-center justify-center cursor-default transition-colors duration-700 ease-in-out"
      style={{
        backgroundColor: isDark ? '#0B0B0F' : '#F8F9FC',
        backgroundImage: isDark 
          ? 'radial-gradient(circle at center, rgba(192, 132, 252, 0.05) 0%, transparent 70%)' 
          : 'radial-gradient(circle at center, rgba(15, 23, 42, 0.03) 0%, transparent 70%)',
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%'
      }}
    >
      <div className="relative w-full max-w-6xl px-8 h-full flex items-center justify-center">
        {scenes.map((scene, idx) => (
          <div 
            key={idx}
            ref={el => scenesRef.current[idx] = el}
            className="absolute inset-0 flex flex-col items-center justify-center text-center py-20"
          >
            <h2 
              className="headline font-heading text-6xl md:text-8xl mb-8 tracking-tighter uppercase overflow-hidden transition-colors duration-700 ease-in-out"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              {splitChars(scene.text)}
            </h2>

            <div className="relative inline-block mt-4">
              {/* Secondary text wrapper for fill effect */}
              <div 
                className="secondary font-body text-xl md:text-3xl font-medium tracking-wide text-dark-text-secondary light:text-light-text-secondary opacity-50 whitespace-nowrap"
              >
                {scene.subtext}
              </div>
              <div 
                className="secondary-fill absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap font-body text-xl md:text-3xl font-medium tracking-wide text-dark-primary light:text-light-primary border-r-2 border-dark-primary light:border-light-primary w-0"
              >
                {scene.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle depth dots background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full" 
             style={{ 
               backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'}11 1px, transparent 0)`, 
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      {/* Bottom Soft Fade */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none transition-colors duration-700 ease-in-out"
        style={{
          background: `linear-gradient(to bottom, transparent, ${isDark ? '#0B0B0F' : '#F8F9FC'})`
        }}
      />
    </section>
  );
};

export default ScrollStory;
