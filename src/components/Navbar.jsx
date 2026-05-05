import React from "react";

const Navbar = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -100; // Match scroll-margin-top
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-center pointer-events-none">
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="pointer-events-auto transition-transform duration-300 hover:scale-110 active:scale-95 group"
      >
        <img
          src="../../public/assets/me.png"
          alt="Logo"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-dark-primary/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-dark-primary/30 transition-all"
        />
      </a>
      <div className="hidden md:flex items-center gap-8 px-8 py-3 glass rounded-full pointer-events-auto">
        {[
          { label: "Expertise", href: "#services" },
          { label: "Skills", href: "#skills" },
          { label: "Work", href: "#work" },
          { label: "Process", href: "#process" },
          { label: "Testimonials", href: "#testimonials" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="text-[10px] uppercase tracking-widest font-bold text-dark-text-secondary light:text-light-text-secondary hover:text-dark-primary light:hover:text-light-primary transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "#contact")}
          className="text-[10px] uppercase tracking-widest font-bold text-dark-text-secondary light:text-light-text-secondary hover:text-dark-primary transition-colors"
        >
          Contact
        </a>
      </div>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-dark-text-secondary light:text-light-text-secondary pointer-events-auto">
        EN
      </div>
    </nav>
  );
};

export default Navbar;
