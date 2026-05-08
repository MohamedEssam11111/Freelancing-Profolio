import React, { useEffect, useState, useRef } from "react";
import { client, urlFor } from "../sanityClient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import portfolioImg from "/portfolio.png";
import yumifyImg from "/yumify.png";
import coffeeImg from "/coffee.png";

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = ({ isDark }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "project"]`)
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch(console.error);
  }, []);
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      projects.forEach((_, index) => {
        const block = `.project-block-${index}`;
        const image = `${block} .project-image`;
        const content = `${block} .project-content > *`;
        const fillText = `${block} .fill-text-active`;

        // Entrance Animation for the whole block
        gsap.fromTo(
          block,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Scroll-based Scale and Parallax for Image
        gsap.fromTo(
          image,
          { scale: 1.1, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          },
        );

        // Line-by-line Word Fill Animation
        const words = gsap.utils.toArray(`${block} .word-fill`);
        if (words.length > 0) {
          gsap.fromTo(
            words,
            {
              color: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.15)",
            },
            {
              color: isDark ? "#FFFFFF" : "#111111",
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 70%",
                end: "top 10%",
                scrub: true,
              },
            },
          );
        }

        // Staggered Text entrance for other elements (excluding the description which is handled above)
        const otherContent = gsap.utils
          .toArray(content)
          .filter((el) => !el.classList.contains("fill-text-container"));
        gsap.fromTo(
          otherContent,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 70%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects, isDark]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`case-studies relative w-full py-24 md:py-48 overflow-hidden transition-colors duration-700 ${isDark ? "bg-transparent" : "bg-transparent"}`}
    >
      {/* Section Header - Constrained to Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24 md:mb-40">
        <span className="text-dark-primary font-mono text-sm tracking-[0.5em] uppercase block mb-4">
          Case Studies
        </span>
        <h2
          className={`text-5xl md:text-8xl font-heading tracking-tighter uppercase leading-none ${isDark ? "text-white" : "text-black"}`}
        >
          Featured <br /> Projects
        </h2>
      </div>

      {/* Projects Loop - Wide Layout */}
      <div className="flex flex-col gap-32 md:gap-64">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-block-${idx} flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image Side - Balanced (50% width) */}
            <div
              className={`relative w-full md:w-[50%] lg:w-[55%] aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="absolute inset-0 bg-black/10 z-[1]" />
                <img
                  src={urlFor(project.image).url()}
                  alt={project.title}
                  className="project-image w-full h-full object-cover will-change-transform"
                />
              </a>
            </div>

            {/* Content Side - Refined (50% width) */}
            <div
              className={`project-content w-full md:w-[50%] lg:w-[45%] flex flex-col gap-6 p-6 sm:p-12 md:p-8 lg:p-16`}
            >
              <div className="flex items-center gap-4">
                <span className="text-dark-primary font-mono text-xl font-bold">
                  {idx + 1}
                </span>
                <div className="h-[1px] w-12 bg-dark-primary" />
              </div>

              <h3
                className={`text-3xl md:text-5xl font-heading leading-[1.1] uppercase tracking-tight ${isDark ? "text-white" : "text-black"}`}
              >
                {project.title}
              </h3>

              <p className="text-dark-primary font-body text-lg italic opacity-90">
                {project.hook}
              </p>

              {/* Paragraph Fill Animation Container */}
              <div className="fill-text-container relative">
                <p className="font-body text-lg md:text-xl leading-relaxed flex flex-wrap">
                  {project.description.split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="word-fill mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              <div
                className={`flex flex-col gap-2 p-6 rounded-xl border mt-4 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-primary">
                    The Approach
                  </span>
                  <p
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {project.approach}
                  </p>
                </div>
                <div className="w-full h-[1px] my-2 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-primary">
                    The Result
                  </span>
                  <p
                    className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {project.result}
                  </p>
                </div>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 group w-fit"
              >
                <span
                  className={`text-sm font-bold uppercase tracking-[0.2em] transform transition-transform duration-300 group-hover:translate-x-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  {project.cta}
                </span>
                <div className="w-10 h-[2px] bg-dark-primary group-hover:w-16 transition-all duration-300" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-dark-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default CaseStudies;
