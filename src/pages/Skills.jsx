import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
  SiVite,
  SiFigma,
  SiAnthropic,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";

const CIRCUMFERENCE = 314.16; // 2 * Math.PI * 50

const ICON_MAP = {
  SiHtml5,
  FaCss3Alt,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
  SiVite,
  SiFigma,
  SiAnthropic,
  TbBrandFramerMotion,
};

const SKILLS_DATA = [
  {
    category: "FRONTEND",
    skills: [
      { name: "HTML5", percent: 95, icon: "SiHtml5", color: "#e34f26" },
      { name: "CSS3", percent: 90, icon: "FaCss3Alt", color: "#1572b6" },
      { name: "JavaScript", percent: 88, icon: "SiJavascript", color: "#f7df1e" },
      { name: "React", percent: 85, icon: "SiReact", color: "#61dafb" },
      { name: "Tailwind CSS", percent: 87, icon: "SiTailwindcss", color: "#38bdf8" },
      { name: "TypeScript", percent: 75, icon: "SiTypescript", color: "#3178c6" },
      { name: "Framer Motion", percent: 78, icon: "TbBrandFramerMotion", color: "#8b5cf6" },
    ],
  },
  {
    category: "TOOLS & WORKFLOW",
    skills: [
      { name: "Git & GitHub", percent: 88, icon: "SiGithub", color: "#ffffff" },
      { name: "Vite", percent: 85, icon: "SiVite", color: "#646cff" },
      { name: "Figma", percent: 72, icon: "SiFigma", color: "#f24e1e" },
      { name: "Claude AI", percent: 90, icon: "SiAnthropic", color: "#cc9b7a" },
      { name: "Antigravity", percent: 80, icon: null, color: "#8b5cf6" },
    ],
  },
  {
    category: "SOFT SKILLS",
    skills: [
      { name: "Problem Solving", percent: 92, icon: null, emoji: "🧩", color: "#8b5cf6" },
      { name: "Communication", percent: 85, icon: null, emoji: "💬", color: "#a78bfa" },
      { name: "Team Collaboration", percent: 88, icon: null, emoji: "🤝", color: "#c4b5fd" },
      { name: "Attention to Detail", percent: 90, icon: null, emoji: "🔍", color: "#8b5cf6" },
      { name: "Adaptability", percent: 87, icon: null, emoji: "🔄", color: "#a78bfa" },
      { name: "Time Management", percent: 82, icon: null, emoji: "⏱️", color: "#c4b5fd" },
    ],
  },
];

const SparkleIcon = ({ color }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
    <path d="M19 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
  </svg>
);

const RadialMeter = ({ percent, color, icon, name, emoji }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  
  const progressValue = useMotionValue(0);
  const roundedPercent = useTransform(progressValue, (latest) => Math.round(latest));
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    const unsubscribe = progressValue.on("change", (latest) => {
      setDashOffset(CIRCUMFERENCE - (CIRCUMFERENCE * latest) / 100);
    });
    return () => unsubscribe();
  }, [progressValue]);

  useEffect(() => {
    if (prefersReducedMotion) {
      progressValue.set(percent);
      return;
    }
    
    if (isInView) {
      const controls = animate(progressValue, percent, {
        duration: 1.4,
        ease: [0.33, 1, 0.68, 1],
      });
      return () => controls.stop();
    }
  }, [isInView, percent, prefersReducedMotion, progressValue]);

  let CenterContent;
  if (icon && ICON_MAP[icon]) {
    const IconComponent = ICON_MAP[icon];
    CenterContent = <IconComponent size={28} color={color} />;
  } else if (emoji) {
    CenterContent = <span className="text-2xl">{emoji}</span>;
  } else if (name === "Antigravity") {
    CenterContent = <SparkleIcon color={color} />;
  } else {
    CenterContent = (
      <span className="text-xl font-bold" style={{ color }}>
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center group w-full"
      role="img"
      aria-label={`${name}: ${percent}% proficiency`}
    >
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 flex items-center justify-center">
        <svg
          className="w-full h-full transform"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          {/* Outer track */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Inner animated fill */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
            className="transition-all duration-300"
          />
        </svg>

        {/* Center content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {CenterContent}
          <div className="text-xs font-bold text-white/70 mt-1 flex items-center">
            <motion.span>{roundedPercent}</motion.span>
            <span>%</span>
          </div>
        </div>
      </div>

      {/* Skill name */}
      <h4 className="text-sm font-medium text-white/80 text-center mt-3 max-w-[90px] mx-auto leading-tight">
        {name}
      </h4>
    </div>
  );
};

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07 },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0, 
      y: prefersReducedMotion ? 0 : 24, 
      scale: prefersReducedMotion ? 1 : 0.92 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      aria-label="Skills section"
      className="min-h-screen py-24 md:py-32 relative overflow-hidden max-w-7xl mx-auto px-6 md:px-12"
    >
      {/* Background Decor */}
      <div
        className="absolute top-1/4 left-0 w-80 h-80 bg-violet-600/10 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-fuchsia-600/8 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Title Block */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase block mb-4">
            What I Know
          </span>
          <h2 className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Technical Proficiency
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto text-center">
            A comprehensive overview of my technical stack, tools, and professional competencies honed through building production-ready applications.
          </p>
        </div>

        {/* Categories */}
        {SKILLS_DATA.map((categoryData, index) => {
          // Determine grid columns dynamically based on category type as per requirements
          let gridColsClass = "grid-cols-3 sm:grid-cols-4";
          if (categoryData.category === "FRONTEND") {
            gridColsClass += " md:grid-cols-5 lg:grid-cols-7";
          } else if (categoryData.category === "TOOLS & WORKFLOW") {
            gridColsClass += " md:grid-cols-5";
          } else if (categoryData.category === "SOFT SKILLS") {
            gridColsClass += " md:grid-cols-6";
          }

          return (
            <div key={categoryData.category} className="mb-16 md:mb-20">
              {/* Category Heading Row */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xl font-semibold text-white/90 whitespace-nowrap">
                  {categoryData.category}
                </h3>
                <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className={`grid gap-6 md:gap-8 ${gridColsClass}`}
              >
                {categoryData.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.06, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    tabIndex={0}
                    className="group p-5 md:p-6 flex flex-col items-center rounded-2xl backdrop-blur-xl bg-white/6 border border-white/10 transition-colors duration-300 hover:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <RadialMeter
                      percent={skill.percent}
                      color={skill.color}
                      icon={skill.icon}
                      name={skill.name}
                      emoji={skill.emoji}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}