import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Linkedin,
  Instagram,
  Github,
  MessageCircle,
  Send,
  FileDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  {
    icon: <MessageCircle size={22} />,
    href: "https://wa.me/201116731195?text=مرحبا%20محمد%20رأيت%20البورتفوليو%20بتاعك",
    color: "#25D366",
    label: "WhatsApp",
    position:
      "bottom-4 -left-4 sm:bottom-12 sm:-left-20 md:bottom-16 md:-left-24", // Cluster: Bottom Left
    delay: 0,
    duration: 3.2,
  },
  {
    icon: <Instagram size={22} />,
    href: "https://www.instagram.com/mohamed.e.ssam/",
    color: "#E4405F",
    label: "Instagram",
    position:
      "-bottom-6 left-2 sm:-bottom-16 sm:-left-8 md:-bottom-20 md:-left-12", // Cluster: Bottom Left
    delay: 0.8,
    duration: 3.8,
  },
  {
    icon: <Linkedin size={22} />,
    href: "https://www.linkedin.com/in/mohamed-essam-759b98357/",
    color: "#0077B5",
    label: "LinkedIn",
    position:
      "bottom-2 -right-4 sm:bottom-8 sm:-right-24 md:bottom-12 md:-right-28", // Cluster: Bottom Right
    delay: 1.5,
    duration: 4.2,
  },
  {
    icon: <Github size={22} />,
    href: "https://github.com/MohamedEssam11111",
    color: "#6e5494",
    label: "GitHub",
    position:
      "-bottom-4 right-2 sm:-bottom-12 sm:right-4 md:-bottom-16 md:right-8", // Cluster: Bottom Right
    delay: 2.2,
    duration: 3.5,
  },
  {
    icon: <FileDown size={22} />,
    href: "/assets/Mohamed_Essam_Frontend_Developer_CV.pdf",
    color: "#D4FF00",
    label: "CV",
    position:
      "-bottom-20 left-[10%] sm:-bottom-32 sm:left-[25%] md:-bottom-40 md:left-[30%]", // Cluster: Below Form
    delay: 3,
    duration: 4.5,
    isDownload: "Mohamed_Essam_Frontend_Developer_CV.pdf",
  },
];

const CtaSection = ({ isDark, onSuccess, onError }) => {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".cta-headline",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".cta-subtext",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ".cta-form-container",
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ".mobile-icons-row",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2",
        );

      // Floating animations - enabled for both desktop and mobile
      gsap.utils.toArray(".floating-icon-wrapper").forEach((el, i) => {
        const iconData = floatingIcons[i % floatingIcons.length];

        // Organic Floating Motion
        gsap.to(el, {
          y: i % 2 === 0 ? 6 : -6,
          x: i % 3 === 0 ? -3 : 3,
          duration: iconData.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: iconData.delay,
        });

        // Glow Pulse Animation (Breathing Lamp Effect)
        const iconLink = el.querySelector("a");
        if (iconLink) {
          gsap.fromTo(
            iconLink,
            {
              boxShadow: `0 0 16px ${iconData.color}66, 0 0 32px ${iconData.color}44, 0 0 48px ${iconData.color}22`,
              opacity: 0.8,
            },
            {
              boxShadow: `0 0 24px ${iconData.color}99, 0 0 48px ${iconData.color}66, 0 0 64px ${iconData.color}33`,
              opacity: 1,
              duration: 2 + Math.random() * 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: iconData.delay,
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_wocm0e7",
        "template_63eeqwb",
        e.target,
        "jVtZQyd4Ct53yGik0",
      );

      // ✅ SUCCESS
      onSuccess?.();
      e.target.reset();
    } catch (error) {
      // ❌ FAILURE
      onError?.();
      console.error("EmailJS Error:", error);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`relative w-full py-32 md:py-56 overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#0B0B0F]" : "bg-[#F8F9FC]"}`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] blur-[150px] opacity-20 rounded-full bg-dark-primary/15`}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`cta-headline text-5xl md:text-8xl font-heading tracking-tighter uppercase leading-[0.9] mb-8 ${isDark ? "text-white" : "text-black"}`}
          >
            Let’s Build Something <br /> That Stands Out
          </h2>
          <p
            className={`cta-subtext font-body text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            I design and develop high-performing websites that engage users and
            drive real results.
          </p>
        </div>

        {/* Contact Form Wrapper for Controlled Icon Positioning */}
        <div className="cta-form-container max-w-2xl mx-auto relative group-form">
          {/* DESKTOP ONLY: Absolute floating orbit cluster */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {floatingIcons.map((item, idx) => (
              <div
                key={idx}
                className={`absolute ${item.position} pointer-events-auto floating-icon-wrapper z-20`}
              >
                <motion.a
                  href={item.href}
                  target={item.isDownload ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  download={item.isDownload}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 40px ${item.color}bb, 0 0 80px ${item.color}77`,
                    filter: "brightness(1.3)",
                  }}
                  className={`flex items-center justify-center w-14 h-14 rounded-full border backdrop-blur-xl transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white/70 hover:text-white"
                      : "bg-black/5 border-black/10 text-black/50 hover:text-black"
                  }`}
                  style={{
                    "--hover-color": item.color,
                  }}
                >
                  {item.icon}
                </motion.a>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className={`p-8 md:p-12 rounded-[28px] border bg-gradient-to-br transition-all duration-500 relative z-10 ${
              isDark
                ? "from-white/[0.03] to-white/[0.01] border-dark-primary/40"
                : "from-black/[0.02] to-black/[0.01] border-dark-primary/40"
            }`}
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className={`font-mono text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className={`w-full px-6 py-4 rounded-xl border bg-transparent font-body focus:outline-none transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white placeholder:text-white/20 focus:border-dark-primary"
                      : "border-black/10 text-black placeholder:text-black/20 focus:border-dark-primary"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className={`font-mono text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className={`w-full px-6 py-4 rounded-xl border bg-transparent font-body focus:outline-none transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white placeholder:text-white/20 focus:border-dark-primary"
                      : "border-black/10 text-black placeholder:text-black/20 focus:border-dark-primary"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className={`font-mono text-[10px] uppercase tracking-widest font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="How can I help you?"
                  className={`w-full px-6 py-4 rounded-xl border bg-transparent font-body resize-none focus:outline-none transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white placeholder:text-white/20 focus:border-dark-primary"
                      : "border-black/10 text-black placeholder:text-black/20 focus:border-dark-primary"
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="group flex items-center justify-center gap-3 w-full py-5 bg-dark-primary text-black font-heading uppercase tracking-widest text-lg rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,255,0,0.2)] active:scale-95 mt-4"
              >
                Send Message
                <Send
                  size={20}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </form>
        </div>

        {/* MOBILE ONLY: Simple clustered row below the form */}
        <div className="mobile-icons-row flex md:hidden justify-center items-center flex-wrap gap-4 mt-8 px-4 relative z-20">
          {floatingIcons.map((item, idx) => (
            <div key={idx} className="floating-icon-wrapper">
              <motion.a
                href={item.href}
                target={item.isDownload ? undefined : "_blank"}
                rel="noopener noreferrer"
                download={item.isDownload}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 30px ${item.color}bb, 0 0 60px ${item.color}77`,
                  filter: "brightness(1.2)",
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-white/10 border-white/10 text-white/70 hover:text-white"
                    : "bg-black/5 border-black/10 text-black/50 hover:text-black"
                }`}
              >
                {item.icon}
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
