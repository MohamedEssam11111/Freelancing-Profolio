import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import portfolioImg from "../../public/assets/portfolio1.png";
import coffeeImg from "../../public/assets/coffee1.png";
import yumifyImg from "../../public/assets/yumify1.png";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Portfolio & Personal Sites",
    description:
      "Modern portfolios that showcase your work and help you stand out.",
    image: portfolioImg,
  },
  {
    title: "Landing Pages That Convert",
    description:
      "Focused landing pages built to drive action and maximize results.",
    image: coffeeImg,
  },
  {
    title: "Conversion-Focused Websites",
    description:
      "Websites designed to guide users, increase engagement, and turn visitors into clients.",
    image: yumifyImg,
  },
];

const ServicesSection = ({ isDark }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
      });

      // Parallax effect for backgrounds
      gsap.utils.toArray(".card-bg").forEach((bg) => {
        gsap.to(bg, {
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            containerAnimation: tl.scrollTrigger?.animation,
            scrub: true,
          },
        });
      });

      // Paragraph filling animation for each slide
      gsap.utils.toArray(".service-slide").forEach((slide, idx) => {
        const fill = slide.querySelector(".secondary-fill");
        if (fill) {
          if (idx === 0) {
            // First card uses vertical trigger (starts when section enters from bottom, ends when it pins)
            gsap.to(fill, {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Starts as it comes into view
                end: "top top", // Finishes right before it pins
                scrub: true,
              },
            });
          } else {
            // Remaining cards use horizontal trigger
            gsap.to(fill, {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl.scrollTrigger?.animation,
                start: "left center",
                end: "center center",
                scrub: true,
              },
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="services-section relative overflow-hidden w-screen h-[100dvh] transition-colors duration-700 ease-in-out mt-[80px] md:mt-[120px] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      style={{
        backgroundColor: isDark
          ? "rgba(11, 11, 15, 0.75)"
          : "rgba(248, 249, 252, 0.75)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        ref={trackRef}
        className="services-track flex flex-nowrap h-full w-fit m-0 p-0 will-change-transform"
      >
        {services.map((service, idx) => (
          <div
            key={idx}
            className="service-slide relative flex-shrink-0 w-screen h-full overflow-hidden"
            style={{ flex: "0 0 100vw" }}
          >
            {/* Background Image Layer */}
            <div
              className="card-bg absolute inset-0 -left-[10%] w-[120%] h-full bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${service.image})` }}
            />

            {/* Direct Overlay for each slide */}
            <div className="absolute inset-0 bg-black/50 z-[1]" />

            {/* Content Layer - Breaking out of containers */}
            <div className="relative z-[2] h-full flex flex-col justify-end p-6 sm:p-12 md:p-16 lg:p-24 pb-24 sm:pb-32">
              <div className="w-full max-w-[90vw] md:max-w-[700px] lg:max-w-7xl">
                <h3 className="text-[clamp(2rem,8vw,3rem)] sm:text-[clamp(3rem,10vw,4.5rem)] md:text-[clamp(4.5rem,12vw,6rem)] lg:text-8xl font-heading text-white uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6">
                  {service.title}
                </h3>

                {/* Paragraph filling wrapper */}
                <div className="relative inline-block mt-2 md:mt-4 mb-4 md:mb-6">
                  {/* Base Layer */}
                  <div className="secondary font-body text-[clamp(1rem,4vw,1.25rem)] sm:text-[clamp(1.25rem,4vw,1.5rem)] md:text-[clamp(1.5rem,3vw,1.875rem)] lg:text-3xl font-medium tracking-wide text-gray-400 opacity-20 whitespace-normal w-[85vw] sm:w-[75vw] md:w-[600px] lg:w-[50vw] max-w-4xl leading-relaxed">
                    {service.description}
                  </div>
                  {/* Fill Layer */}
                  <div className="secondary-fill absolute top-0 left-0 h-full overflow-hidden whitespace-normal font-body text-[clamp(1rem,4vw,1.25rem)] sm:text-[clamp(1.25rem,4vw,1.5rem)] md:text-[clamp(1.5rem,3vw,1.875rem)] lg:text-3xl font-medium tracking-wide text-dark-primary border-r-2 border-dark-primary w-0 leading-relaxed">
                    <div className="w-[85vw] sm:w-[75vw] md:w-[600px] lg:w-[50vw] max-w-4xl">
                      {service.description}
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 w-16 md:w-24 h-[2px] md:h-[3px] bg-dark-primary shadow-[0_0_20px_rgba(192,132,252,0.5)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Indicator */}
      <div className="absolute bottom-10 right-10 z-10 flex items-center gap-4 opacity-50">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
          Explore Services
        </span>
        <div className="w-16 h-[1px] bg-white"></div>
      </div>
    </section>
  );
};

export default ServicesSection;
