import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhiteImg from "/white img.png";
import BlackImg from "/black img.png";
gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isDark }) => {
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageFrameRef = useRef(null);

  const headline = "build websites that drive real engagement";
  const paragraph =
    "I'am Mohamed-Essam a Frontend developer focused on building high-impact websites, landing pages, and portfolio experiences using React. I combine clean UI, smooth animations, and real-world functionality to create interfaces that not only look sharp — but actually work, scale, and deliver results.";

  useEffect(() => {
    // 1. Headline Animation
    const allChars = headlineRef.current.querySelectorAll(".char");

    gsap.fromTo(
      allChars,
      {
        opacity: (i, el) => (el.closest(".text-gradient") ? 1 : 0),
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        ease: "power4.out",
        duration: 1.2,
        delay: 0.5,
      },
    );

    // 2. Paragraph Line-by-Line Scroll Fill Animation
    const pChars = paragraphRef.current.querySelectorAll(".p-char");

    // Define solid hex colors for muted state to avoid transparency/fade
    const mutedColor = isDark ? "#2D2D35" : "#D1D5DB";
    const activeColor = isDark ? "#C084FC" : "#A855F7";

    gsap.fromTo(
      pChars,
      {
        color: mutedColor,
      },
      {
        color: activeColor,
        stagger: 0.02,
        duration: 0.01, // Near-instant pop for each character
        ease: "none",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        },
      },
    );
  }, [isDark]);

  return (
    <section className="relative min-h-[120vh] w-full pt-48 flex flex-col md:flex-row items-center px-12 gap-16 overflow-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 z-10">
        <div className="mb-6 inline-block px-3 py-1 rounded-full border border-dark-primary/30 light:border-light-primary/30 bg-dark-primary/10 light:bg-light-primary/10 text-dark-primary light:text-light-primary text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
          Available for projects
        </div>

        <h1
          ref={headlineRef}
          className={`text-[54px] md:text-[74px] font-black leading-[0.95] uppercase tracking-tighter mb-8 ${
            isDark ? "text-dark-text-primary" : "text-black"
          }`}
        >
          {(() => {
            const words = headline.split(" ");
            const result = [];
            let i = 0;
            while (i < words.length) {
              const word = words[i];
              const nextWord = words[i + 1];

              if (
                word.toLowerCase() === "drive" &&
                nextWord?.toLowerCase() === "real"
              ) {
                result.push(
                  <span key={i} className="text-gradient inline-block mr-4">
                    {`${word} ${nextWord}`.split("").map((char, j) => (
                      <span
                        key={j}
                        className="char inline-block whitespace-pre"
                      >
                        {char}
                      </span>
                    ))}
                  </span>,
                );
                i += 2;
              } else {
                result.push(
                  <span key={i} className="inline-block mr-4">
                    {word.split("").map((char, j) => (
                      <span
                        key={j}
                        className="char inline-block whitespace-pre"
                      >
                        {char}
                      </span>
                    ))}
                  </span>,
                );
                i++;
              }
            }
            return result;
          })()}
        </h1>

        <div className="relative mb-10 max-w-lg">
          <p
            ref={paragraphRef}
            className="font-body text-xl leading-relaxed font-medium"
          >
            {paragraph.split("").map((char, i) => (
              <span key={i} className="p-char">
                {char}
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            className="px-8 py-4 bg-gradient-to-r from-dark-primary to-dark-secondary light:from-light-primary light:to-light-secondary text-black light:text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:opacity-90 transition-opacity shadow-[0_10px_30px_rgba(192,132,252,0.3)]"
            href="#contact"
          >
            Start Your Project
          </a>
          <a
            className="flex items-center gap-3 group text-[10px] font-bold uppercase tracking-widest text-dark-text-secondary light:text-light-text-secondary"
            href="#contact"
          >
            <span className="w-8 h-[1px] bg-dark-text-secondary light:bg-light-text-secondary group-hover:w-12 transition-all"></span>
            View Portfolio
          </a>
        </div>
      </div>

      {/* Right Image Frame */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10">
        <div
          ref={imageFrameRef}
          className="relative w-[340px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-dark-surface"
        >
          {/* Black Background Profile */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              !isDark
                ? "z-20 opacity-100 scale-100"
                : "z-10 opacity-0 scale-110"
            }`}
          >
            <img
              src={BlackImg}
              className="w-full h-full object-cover"
              alt="Profile Dark"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* White Background Profile */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isDark ? "z-20 opacity-100 scale-100" : "z-10 opacity-0 scale-110"
            }`}
          >
            <img
              src={WhiteImg}
              className="w-full h-full object-cover"
              alt="Profile Light"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
