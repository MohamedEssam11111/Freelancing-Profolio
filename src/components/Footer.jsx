import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isDark }) => {
  const footerRef = useRef(null);
  const mainVisualRef = useRef(null);
  const secondaryVisualRef1 = useRef(null);
  const secondaryVisualRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main visual floating animation (Moon or Sun)
      gsap.to(mainVisualRef.current, {
        y: 10,
        x: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Secondary visuals drifting animation (Meteorites or Clouds)
      gsap.to(secondaryVisualRef1.current, {
        x: 15,
        y: isDark ? -10 : 0,
        rotation: isDark ? 5 : 0,
        duration: isDark ? 6 : 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      gsap.to(secondaryVisualRef2.current, {
        x: isDark ? -10 : -20,
        y: isDark ? 15 : 0,
        rotation: isDark ? -8 : 0,
        duration: isDark ? 8 : 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2
      });

      // Reveal animation on scroll
      gsap.from(".footer-content > *", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, footerRef);

    return () => ctx.revert();
  }, [isDark]);

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/mohamed-essam-759b98357/", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/MohamedEssam11111", label: "GitHub" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/mohamed.e.ssam/", label: "Instagram" }
  ];

  return (
    <footer 
      ref={footerRef}
      className={`relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-gradient-to-b from-[#05060A] to-[#0B0F1A]' : 'bg-gradient-to-b from-[#F8FAFF] to-[#EAF2FF]'
      }`}
    >
      {/* Background Stars (Subtle) - Only in Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
                opacity: Math.random() * 0.4,
                animation: `pulse ${Math.random() * 3 + 2}s infinite`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
          
          {/* Left: Main Visual (Moon/Sun) */}
          <div className="relative w-full md:w-1/2 flex justify-center items-center h-[300px] md:h-[400px]">
            {/* Global Glow */}
            <div className={`absolute w-64 h-64 blur-[100px] opacity-20 rounded-full ${isDark ? 'bg-white' : 'bg-[#FFD700]'}`} />

            {isDark ? (
              <>
                {/* Cartoony Moon */}
                <div 
                  ref={mainVisualRef}
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full z-20 shadow-[0_0_80px_rgba(255,255,255,0.05),inset_-30px_-30px_60px_rgba(0,0,0,0.1)] border border-white/5 overflow-hidden transition-colors duration-700"
                  style={{ background: '#E2E4EB' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" />
                  {[
                    { top: '25%', left: '35%', size: '35px', opacity: 0.6 },
                    { top: '48%', left: '18%', size: '55px', opacity: 0.7 },
                    { top: '65%', left: '42%', size: '80px', opacity: 0.5 },
                    { top: '32%', left: '72%', size: '25px', opacity: 0.6 },
                    { top: '78%', left: '58%', size: '42px', opacity: 0.5 },
                  ].map((crater, i) => (
                    <div 
                      key={i}
                      className="absolute pointer-events-none rounded-full"
                      style={{
                        top: crater.top,
                        left: crater.left,
                        width: crater.size,
                        height: crater.size,
                        opacity: crater.opacity,
                        background: 'radial-gradient(circle at 70% 30%, rgba(0,0,0,0.4) 0%, transparent 80%)',
                        boxShadow: 'inset 6px -6px 12px rgba(0,0,0,0.6), inset -2px 2px 4px rgba(255,255,255,0.05)',
                        filter: 'blur(3px)'
                      }}
                    />
                  ))}
                </div>

                {/* Meteorites */}
                <div ref={secondaryVisualRef1} className="absolute top-[10%] left-[10%] w-16 h-16 opacity-40 z-10">
                  <div className="w-full h-full bg-[#D1D5DB]" style={{ borderRadius: '65% 35% 72% 28% / 45% 32% 68% 55%', boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', transform: 'rotate(25deg)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 opacity-50" style={{ borderRadius: 'inherit' }} />
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-black/20 rounded-full blur-[2px]" />
                    <div className="absolute -top-6 -left-6 w-16 h-6 bg-white/10 blur-xl rotate-[135deg]" />
                  </div>
                </div>
                <div ref={secondaryVisualRef2} className="absolute bottom-[20%] right-[15%] w-12 h-12 opacity-30 z-10">
                  <div className="w-full h-full bg-[#D1D5DB]" style={{ borderRadius: '38% 62% 43% 57% / 65% 35% 52% 48%', boxShadow: 'inset -5px -5px 12px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', transform: 'rotate(-15deg)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 opacity-50" style={{ borderRadius: 'inherit' }} />
                    <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-black/20 rounded-full blur-[1px]" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Sun Wrapper with Circular Glow */}
                <div ref={mainVisualRef} className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center z-20">
                  {/* Radial Outer Glow Layer (Soft Edge Fade) */}
                  <div 
                    className="absolute inset-[-50%] rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.1) 45%, transparent 70%)',
                      filter: 'blur(30px)'
                    }}
                  />
                  
                  {/* Cartoony Sun Core */}
                  <div 
                    className="relative w-full h-full rounded-full transition-colors duration-700 bg-[#FFD700] border border-yellow-200/50"
                    style={{
                      boxShadow: `
                        0 0 40px rgba(255, 200, 0, 0.5),
                        0 0 80px rgba(255, 200, 0, 0.3),
                        0 0 120px rgba(255, 200, 0, 0.15),
                        inset -20px -20px 40px rgba(255, 165, 0, 0.2)
                      `
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-400/20 pointer-events-none rounded-full" />
                    
                    {/* Sun Shine Highlight */}
                    <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 blur-[15px] rounded-full" />
  
                    {/* Stylized Rays */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute inset-0 origin-center opacity-30"
                        style={{ transform: `rotate(${i * 45}deg)` }}
                      >
                        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-gradient-to-b from-yellow-400/80 to-orange-400/0 blur-[10px] rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cloud 1 */}
                <div 
                  ref={secondaryVisualRef1}
                  className="absolute top-[15%] left-[5%] w-32 md:w-48 h-16 md:h-24 opacity-80 z-10"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gray-100 rounded-full blur-[1px]" />
                    <div className="absolute bottom-4 left-4 w-1/2 h-2/3 bg-white rounded-full" />
                    <div className="absolute bottom-0 right-4 w-1/2 h-1/2 bg-gray-200/50 rounded-full" />
                  </div>
                </div>

                {/* Cloud 2 */}
                <div 
                  ref={secondaryVisualRef2}
                  className="absolute bottom-[25%] right-[5%] w-24 md:w-40 h-12 md:h-20 opacity-70 z-10"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-4 w-1/2 h-1/2 bg-gray-100 rounded-full" />
                    <div className="absolute bottom-3 left-10 w-2/3 h-2/3 bg-white rounded-full blur-[0.5px]" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gray-200/60 rounded-full" />
                  </div>
                </div>
              </>
            )}
          </div>


          {/* Right: Content */}
          <div className="w-full md:w-1/2 footer-content text-center md:text-left">
            <h3 className={`text-4xl md:text-5xl font-heading uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Mohamed Essam
            </h3>
            <p className={`text-xl font-body max-w-sm mb-12 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Frontend Developer crafting engaging web experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${isDark ? 'text-dark-primary' : 'text-light-primary'}`}>
                  Follow Me
                </h4>
                <div className="flex flex-col gap-4">
                  {socialLinks.map((link, i) => (
                    <motion.a 
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8 }}
                      className={`flex items-center gap-3 font-body text-sm transition-colors ${
                        isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${isDark ? 'text-dark-primary' : 'text-light-primary'}`}>
                  Let's Connect
                </h4>
                <motion.a 
                  href="mailto:mohamedessam9523@gmail.com"
                  whileHover={{ x: 8 }}
                  className={`flex items-center gap-3 font-body text-sm transition-colors ${
                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  <Mail size={18} />
                  mohamedessam9523@gmail.com
                </motion.a>
              </div>
            </div>

            <div className={`pt-12 border-t text-[10px] font-mono tracking-widest uppercase opacity-40 ${
              isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'
            }`}>
              © 2026 Mohamed Essam. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 blur-[120px] opacity-10 pointer-events-none rounded-full ${
        isDark ? 'bg-dark-primary/20' : 'bg-light-primary/20'
      }`} />
    </footer>
  );
};

export default Footer;
