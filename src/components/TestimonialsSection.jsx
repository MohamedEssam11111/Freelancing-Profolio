import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Emad Abdalla",
    image: "../../public/assets/emad.png",
    portfolioPreview: "../../public/assets/emad portfolio.png",
    feedback:
      "“Thank you, Mohamed, for building my portfolio. You captured my work beautifully and made it simple for patients to connect with me. I truly appreciate your professionalism, and I highly recommend you to anyone looking for a reliable developer.”",
  },
  {
    name: "Mohamed Ramadan",
    image: "../../public/assets/ramadan.png",
    portfolioPreview: "../../public/assets/ramadan portfolio.png",
    feedback:
      "“شكراً ليك يا محمد على بناء البورتفوليو بتاعي. قدرت تعرض مشاريعي ومهاراتي في النيتوركنج بشكل واضح وبطريقة طبيعية تعكس شخصيتي. التجربة معاك كانت ممتازة، وأنصح أي حد محتاج يظهر شغله إنه يتعاون معاك لأنك مطوّر ويب محترف.”",
  },
];

const TestimonialsSection = ({ isDark }) => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".testimonials-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-header",
            start: "top 85%",
          },
        },
      );

      // Card Entrance Animation
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    // We use requestAnimationFrame implicitely through motion components
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className={`relative w-full py-24 md:py-48 overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#0B0B0F]" : "bg-[#F8F9FC]"}`}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle Background Elements */}
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 ${isDark ? "block" : "hidden"}`}
      >
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-dark-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-dark-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <div className="testimonials-header mb-24 md:mb-32">
          <span className="text-dark-primary font-mono text-sm tracking-[0.5em] uppercase block mb-4">
            Testimonials
          </span>
          <h2
            className={`text-5xl md:text-7xl font-heading tracking-tighter uppercase leading-none mb-6 ${isDark ? "text-white" : "text-black"}`}
          >
            Client Stories
          </h2>
          <p
            className={`font-body text-xl max-w-2xl leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Real feedback from professionals I've collaborated with on their
            digital journeys.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testimonial-card group relative p-8 md:p-12 rounded-[2rem] border transition-all duration-500 cursor-default flex flex-col justify-between h-full ${
                isDark
                  ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                  : "bg-black/[0.02] border-black/10 hover:bg-black/[0.04] hover:border-black/20"
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Feedback */}
              <div className="relative mb-12">
                <span
                  className={`absolute -top-6 -left-4 text-7xl font-serif opacity-10 ${isDark ? "text-white" : "text-black"}`}
                >
                  “
                </span>
                <p
                  className={`font-body text-lg md:text-xl italic leading-relaxed relative z-10 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                >
                  {t.feedback}
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dark-primary/30 p-1 bg-dark-primary/5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover rounded-full"
                    width="64"
                    height="64"
                  />
                </div>
                <div>
                  <h4
                    className={`text-xl font-heading uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}
                  >
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-4 bg-dark-primary rounded-full" />
                    <span className="text-dark-primary font-mono text-xs uppercase tracking-widest font-bold">
                      Verified Client
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Portfolio Preview (Inside card on small screens) */}
              <div className="mt-8 md:hidden">
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-[16/10]">
                  <img
                    src={t.portfolioPreview}
                    alt={`${t.name} Portfolio`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Preview Image (Cursor Follow) - PC only */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: mousePos.x + 30,
              y: mousePos.y + 30,
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotate: { duration: 0.2 },
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 100,
              pointerEvents: "none",
              transformOrigin: "top left",
            }}
            className="hidden md:block w-80 aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border border-white/20 bg-black/20 backdrop-blur-sm"
          >
            <img
              src={testimonials[hoveredIndex].portfolioPreview}
              alt="Project Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em] opacity-80 decoration-dark-primary underline underline-offset-4">
                View Live Project
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
