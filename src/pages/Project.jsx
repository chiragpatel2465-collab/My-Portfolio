import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "../Components/ProjectCard";
import projects from "../data/Project";

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      aria-label="Projects section"
      className="min-h-screen relative overflow-hidden py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-12 bg-[#0a0a0f]"
    >
      {/* Background Orbs */}
      <div
        className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/8 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-fuchsia-600/6 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* SECTION HEADER */}
      <div className="relative z-10 mb-16 text-center flex flex-col items-center">
        <span className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">
          My Work
        </span>
        <h2 className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Featured Projects
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
          A collection of things I've built — from side projects to frontend experiments.
        </p>
      </div>

      {/* PROJECT GRID */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        variants={!shouldReduceMotion ? containerVariants : {}}
        initial={!shouldReduceMotion ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variants={!shouldReduceMotion ? cardVariants : {}}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;