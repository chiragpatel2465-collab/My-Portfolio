import {  useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiVite,
  SiPostman,
  SiClaude,
} from "react-icons/si";
import { FaNodeJs ,FaCss3Alt} from "react-icons/fa";

const ICON_MAP = {
  SiHtml5,
  FaCss3Alt,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiVite,
  SiPostman,
  SiClaude,
  
};

const SKILLS_DATA = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5",  icon: "SiHtml5", color: "#e34f26" },
      { name: "CSS3", icon: "FaCss3Alt", color: "#1572b6" },
      { name: "JavaScript",  icon: "SiJavascript", color: "#f7df1e" },
      { name: "React",  icon: "SiReact", color: "#61dafb" },
      { name: "Tailwind CSS",  icon: "SiTailwindcss", color: "#38bdf8" },
      { name: "TypeScript",  icon: "SiTypescript", color: "#3178c6" },
      { name: "Framer Motion",  icon: "SiFramer", color: "white" },
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Node.js",  icon: "FaNodeJs", color: "#1f6b22" },
      { name: "Express.js", icon: "SiExpress", color: "white" },
      { name: "MongoDB",  icon: "SiMongodb", color: "#2fa450" },
     
    ],
  },
  {
    category: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", icon: "SiGithub", color: "#ffffff" },
      { name: "Vite", icon: "SiVite", color: "#646cff" },
      { name: "Postman", icon: "SiPostman", color: "#f24e1e" },
      { name: "Claude AI", icon: "SiClaude", color: "#d9633f" },
    ],
  },
];

const SparkleIcon = ({ color }) => (
  <svg
    width="25"
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
 
 

 
  let CenterContent;
  if (icon && ICON_MAP[icon]) {
    const IconComponent = ICON_MAP[icon];
    CenterContent = <IconComponent size={44} color={color} />;
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
     
      className="flex flex-col items-center group w-full"
      role="img"
      
    >
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 flex items-center justify-center">
        
        

        {/* Center content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {CenterContent}
          
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
          if (categoryData.category === "Frontend") {
            gridColsClass += " md:grid-cols-5 lg:grid-cols-5";
          } else if (categoryData.category === "Backend & Databases") {
            gridColsClass += " md:grid-cols-5";
          } else if (categoryData.category === "Tools & Workflow") {
            gridColsClass += " md:grid-cols-4";
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