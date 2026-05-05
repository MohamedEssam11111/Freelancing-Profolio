import React from "react";
import { motion } from "motion/react";
import { Code2, Palette, Zap, Wrench, ChevronRight } from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    icon: <Code2 size={24} className="text-dark-primary" />,
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js"],
  },
  {
    category: "Styling & UI",
    icon: <Palette size={24} className="text-dark-primary" />,
    skills: ["Tailwind CSS", "Responsive Design", "UI/UX Principles"],
  },
  {
    category: "Animation",
    icon: <Zap size={24} className="text-dark-primary" />,
    skills: ["GSAP", "ScrollTrigger", "Framer Motion"],
  },
  {
    category: "Workflow",
    icon: <Wrench size={24} className="text-dark-primary" />,
    skills: ["Git & GitHub", "REST APIs", "Vercel Deployment"],
  },
];

const SkillsSection = ({ isDark }) => {
  return (
    <section
      id="skills"
      className={`relative w-full py-24 md:py-32 overflow-hidden ${isDark ? "bg-[#0B0B0F]" : "bg-[#F8F9FC]"}`}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-dark-primary/50" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-dark-primary">
              Technical Arsenal
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold tracking-tighter ${isDark ? "text-white" : "text-black"}`}
          >
            Skills & <span className="text-dark-primary">Capabilities.</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative p-8 rounded-3xl  border border-white/5 hover:border-dark-primary/30 transition-all duration-500 ${isDark ? "bg-white/[0.03]" : "bg-black/[0.03]"}`}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(212,255,0,0.05)]" />

              <div className="mb-6 p-3 w-fit rounded-2xl bg-white/[0.05] border border-white/5 text-dark-primary group-hover:scale-110 transition-transform duration-500">
                {group.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-6 tracking-tight ${isDark ? "text-white/90" : "text-black/90"}`}
              >
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.05] border border-white/5 text-dark-text-secondary hover:text-dark-primary hover:border-dark-primary/30 transition-all cursor-default"
                  >
                    <ChevronRight size={10} className="text-dark-primary/50" />
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative side accent */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-0 group-hover:h-1/2 bg-gradient-to-b from-transparent via-dark-primary to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-dark-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default SkillsSection;
