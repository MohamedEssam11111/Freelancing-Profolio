import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Background = ({ isDark }) => {
  const containerRef = useRef(null);
  const darkGroupRef = useRef(null);
  const lightGroupRef = useRef(null);
  const bgLayerRef = useRef(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Immediate state on mount
      gsap.set(bgLayerRef.current, { 
        backgroundColor: isDark ? '#0B0B0F' : '#FFFFFF' 
      });
      gsap.set(darkGroupRef.current, { 
        y: isDark ? 0 : -1200,
        opacity: isDark ? 1 : 0
      });
      gsap.set(lightGroupRef.current, { 
        y: isDark ? -1200 : 0,
        opacity: isDark ? 0 : 1 
      });
      isFirstRender.current = false;
      return;
    }

    const tl = gsap.timeline();

    if (isDark) {
      // TRANSITION TO DARK
      // PHASE 1: Sun & Clouds Exit (Move UP)
      tl.to(lightGroupRef.current, {
        y: -1200,
        opacity: 1, // Keep visible while moving
        duration: 1.2,
        ease: 'power2.inOut'
      });

      // Background color transition (starts with Phase 1)
      tl.to(bgLayerRef.current, {
        backgroundColor: '#0B0B0F',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0);

      // PHASE 2: Moon & Meteorites Entry (From TOP to 0)
      // Only starts after Phase 1 is fully complete
      tl.fromTo(darkGroupRef.current,
        { y: -1200, opacity: 1 },
        { 
          y: 0, 
          duration: 1.5, 
          ease: 'power2.out' 
        },
        "+=0.1" // Small delay between phases for polish
      );
      
      // Cleanup: ensure the exited group is eventually hidden
      tl.set(lightGroupRef.current, { opacity: 0 });
    } else {
      // TRANSITION TO LIGHT
      // PHASE 1: Moon & Meteorites Exit (Move UP)
      tl.to(darkGroupRef.current, {
        y: -1200,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      });

      // Background color transition
      tl.to(bgLayerRef.current, {
        backgroundColor: '#FFFFFF',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0);

      // PHASE 2: Sun & Clouds Entry (From TOP to 0)
      tl.fromTo(lightGroupRef.current,
        { y: -1200, opacity: 1 },
        { 
          y: 0, 
          duration: 1.5, 
          ease: 'power2.out' 
        },
        "+=0.1" // Small delay between phases
      );

      // Cleanup: ensure the exited group is eventually hidden
      tl.set(darkGroupRef.current, { opacity: 0 });
    }
  }, [isDark]);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.float-element');
    elements.forEach((el, index) => {
      gsap.to(el, {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.2
      });
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(elements, {
        y: (i) => scrollY * (0.05 + i * 0.02),
        overwrite: 'auto'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Shared Background Layer for smooth color interpolation */}
      <div 
        ref={bgLayerRef} 
        className="absolute inset-0"
      />

      {/* Dark Mode Background Elements */}
      <div 
        ref={darkGroupRef} 
        className="absolute inset-0"
      >
        {/* Realistic Detailed Moon with Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] float-element z-10">
          {/* Soft White Global Glow */}
          <div className="absolute inset-[-80px] rounded-full bg-white/5 blur-[100px]" />
          <div className="absolute inset-[-30px] rounded-full bg-white/10 blur-[50px]" />
          
          {/* Moon Body - Soft White-Gray Surface */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.1),inset_-40px_-40px_90px_rgba(0,0,0,0.1)] border border-white/10 bg-[#E2E4EB]">
            {/* Base Texture Layer - Soft Grayish White */}
            <img 
              src="https://images.unsplash.com/photo-1522030239044-12f014385ca3?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale brightness-110 contrast-110 opacity-30 mix-blend-multiply"
              alt="Moon Texture"
              referrerPolicy="no-referrer"
            />

            {/* Global Lighting Overlay (Consistent top-right white source) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />

            {/* Realistic Surface Depth Craters (Simulated Dents) */}
            {[
              { top: '25%', left: '35%', size: '35px', opacity: 0.6 },
              { top: '48%', left: '18%', size: '55px', opacity: 0.7 },
              { top: '65%', left: '42%', size: '80px', opacity: 0.5 },
              { top: '32%', left: '72%', size: '25px', opacity: 0.6 },
              { top: '78%', left: '58%', size: '42px', opacity: 0.5 },
              { top: '15%', left: '62%', size: '22px', opacity: 0.6 },
              { top: '55%', left: '78%', size: '18px', opacity: 0.7 },
              { top: '82%', left: '30%', size: '32px', opacity: 0.6 },
            ].map((crater, i) => (
              <div 
                key={`crater-${i}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: crater.top,
                  left: crater.left,
                  width: crater.size,
                  height: crater.size,
                  opacity: crater.opacity,
                  // Smooth indentation blending
                  background: 'radial-gradient(circle at 70% 30%, rgba(0,0,0,0.4) 0%, transparent 80%)',
                  boxShadow: `
                    inset 6px -6px 12px rgba(0,0,0,0.6), 
                    inset -2px 2px 4px rgba(255,255,255,0.05)
                  `,
                  filter: 'blur(3px)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Meteorites (Soft Organic Asteroid Fragments) */}
        {[
          { top: '25%', left: '15%', size: '65px', radius: '65% 35% 72% 28% / 45% 32% 68% 55%', rotate: 25 },
          { top: '55%', left: '25%', size: '90px', radius: '45% 55% 62% 38% / 58% 42% 58% 42%', rotate: -15 },
          { top: '75%', left: '12%', size: '50px', radius: '38% 62% 43% 57% / 65% 35% 52% 48%', rotate: 50 },
        ].map((meteor, i) => (
          <div 
            key={`meteor-${i}`}
            className="absolute float-element z-10"
            style={{
              top: meteor.top,
              left: meteor.left,
              width: meteor.size,
              height: meteor.size,
              opacity: 0.35,
            }}
          >
            {/* Layered Cinematic Bloom (Behind Fragment) */}
            <div 
              className="absolute inset-[-10px] bg-white/[0.08] blur-xl pointer-events-none" 
              style={{ 
                borderRadius: meteor.radius, 
                transform: `rotate(${meteor.rotate}deg)`,
                animation: 'glow-pulse 6s ease-in-out infinite alternate'
              }}
            />
            <div 
              className="absolute inset-[-35px] bg-white/[0.04] blur-3xl pointer-events-none" 
              style={{ 
                borderRadius: meteor.radius, 
                transform: `rotate(${meteor.rotate}deg)`,
                animation: 'glow-pulse 10s ease-in-out infinite alternate'
              }}
            />
            <div 
              className="absolute inset-[-60px] bg-white/[0.02] blur-[100px] pointer-events-none" 
              style={{ 
                borderRadius: '50%',
                animation: 'glow-pulse 15s ease-in-out infinite alternate'
              }}
            />
            
            {/* Rock Fragment Body - Smooth and Sculpted */}
            <div 
              className="relative w-full h-full bg-[#D1D5DB]"
              style={{
                borderRadius: meteor.radius,
                transform: `rotate(${meteor.rotate}deg)`,
                boxShadow: `
                  inset -8px -8px 20px rgba(0,0,0,0.3),
                  inset 4px 4px 10px rgba(255,255,255,0.05),
                  0 0 15px rgba(255,255,255,0.02)
                `,
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {/* Soft Surface Shading & Highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none"
                style={{ borderRadius: meteor.radius }}
              />
              
              {/* Complex Surface Irregularities (Bumps & Dents) - EXACT PRESERVATION OF CRATER LOGIC */}
              {[...Array(5)].map((_, j) => (
                <div 
                  key={j}
                  className="absolute bg-black/30 rounded-full"
                  style={{
                    top: `${10 + Math.random() * 70}%`,
                    left: `${10 + Math.random() * 70}%`,
                    width: `${30 + Math.random() * 40}%`,
                    height: `${30 + Math.random() * 40}%`,
                    background: 'radial-gradient(circle at 70% 30%, rgba(0,0,0,0.4) 0%, transparent 80%)',
                    boxShadow: `
                      inset ${3 + j}px ${-3 - j}px ${6 + j}px rgba(0,0,0,0.6),
                      ${1}px ${1}px ${2}px rgba(255,255,255,0.05)
                    `,
                    filter: 'blur(3px)',
                    transform: `rotate(${j * 72}deg) scale(${0.8 + Math.random() * 0.4})`
                  }}
                />
              ))}
              
              {/* Tonal Variance (Dusty/Organic Look) */}
              <div className="absolute inset-0 opacity-15 mix-blend-overlay"
                   style={{ 
                     backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
                     backgroundSize: '8px 8px',
                     borderRadius: meteor.radius 
                   }} />
            </div>
          </div>
        ))}

        {/* Stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Light Mode Background Elements */}
      <div 
        ref={lightGroupRef} 
        className="absolute inset-0"
      >
        {/* Realistic Luminous Sun with Corona and Solar Plasma Gas */}
        <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] float-element z-10 scale-110">
          {/* Layered Corona (Outer Glow) */}
          <div className="absolute inset-[-180px] rounded-full bg-gradient-to-br from-[#FFA000]/10 via-[#FFD54F]/5 to-transparent blur-[140px] opacity-40" />
          <div className="absolute inset-[-80px] rounded-full bg-gradient-to-br from-[#FFC107]/20 to-transparent blur-[100px] opacity-60" />

          {/* Organic Solar Plasma / "Gas" Edges */}
          <div className="absolute inset-[-10%] rounded-[45%_55%_62%_38%_/_58%_42%_58%_42%] bg-gradient-to-br from-[#FFA000]/40 to-transparent blur-[50px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-[-8%] rounded-[55%_45%_38%_62%_/_42%_58%_42%_58%] bg-gradient-to-br from-[#FFB300]/30 to-transparent blur-[40px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '-2s' }} />

          {/* Main Luminous Sun Body */}
          <div className="relative w-full h-full">
            {/* Outer Gas Edge (Orange-Yellow) */}
            <div className="absolute inset-0 rounded-full bg-[#FFA000] blur-[45px] opacity-80" />
            
            {/* Mid Gradient (Warm Yellow) */}
            <div className="absolute inset-[5%] rounded-full bg-gradient-to-br from-[#FFD54F] via-[#FFC107] to-transparent blur-[30px] opacity-90" />
            
            {/* Core Yellow Glow */}
            <div className="absolute inset-[10%] rounded-full bg-[#FFD54F] blur-[20px]" />
            
            {/* Main Luminous Core Base (Light Yellow) */}
            <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-[#FFF5CC] via-[#FFE680] to-[#FFD54F] blur-[25px] opacity-95" />
            
            {/* Egg-White Sheen (Extremely Subtle Off-Center Highlight) */}
            <div className="absolute top-[35%] right-[38%] w-[5%] h-[4%] rounded-[60%_40%_50%_60%] bg-white blur-[6px] opacity-40" />
            
            {/* Soft Inner Luminous Depth */}
            <div className="absolute inset-[20%] rounded-full bg-[#FFF5CC] blur-[15px] opacity-50" />
          </div>
        </div>

        {/* Expanded Full-Width Atmospheric Clouds - Refined Position & Depth */}
        <div className="absolute top-[-8%] -left-[10%] w-[120%] h-[500px] pointer-events-none animate-cloud-slow">
          {/* Cloud Group 1: Left Sector */}
          <div className="absolute top-[8%] left-[5%] w-[55%] h-[60%] opacity-85">
            {/* Deep Volume Shadow */}
            <div className="absolute inset-0 bg-[#4B5563] blur-[90px] rounded-full scale-y-45 translate-y-12 opacity-90" />
            {/* Mid Tone Layer */}
            <div className="absolute inset-[15%] bg-[#6B7280] blur-[70px] rounded-full scale-y-50" />
            {/* Internal Luminous Highlight (Darker Dirty White) */}
            <div className="absolute inset-[25%] bg-[#D1D5DB] blur-[50px] rounded-full opacity-95 shadow-[inset_0_0_40px_rgba(255,255,255,0.2)]" />
          </div>

          {/* Cloud Group 2: Center-Left Bridge */}
          <div className="absolute top-[25%] left-[20%] w-[45%] h-[55%] opacity-75" style={{ animationDelay: '-15s' }}>
            <div className="absolute inset-0 bg-[#4B5563] blur-[80px] rounded-full scale-y-35 translate-y-8 opacity-85" />
            <div className="absolute inset-[15%] bg-[#6B7280] blur-[75px] rounded-full scale-y-45" />
            <div className="absolute inset-[25%] bg-[#E5E7EB] blur-[60px] rounded-full opacity-90" />
          </div>

          {/* Cloud Group 3: Right Sector (Near Sun framing) */}
          <div className="absolute top-[2%] right-[15%] w-[35%] h-[40%] opacity-70">
            <div className="absolute inset-0 bg-[#4B5563] blur-[75px] rounded-full scale-y-40 translate-y-6 opacity-85" />
            <div className="absolute inset-[15%] bg-[#6B7280] blur-[65px] rounded-full scale-y-50" />
            {/* Luminous Inner Core */}
            <div className="absolute inset-[25%] bg-[#D1D5DB] blur-[45px] rounded-full opacity-95" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
