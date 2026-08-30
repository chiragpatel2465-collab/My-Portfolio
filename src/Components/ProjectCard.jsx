import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FiExternalLink, FiCode, FiArrowRight } from "react-icons/fi";

const ProjectCard = ({ project, variants }) => {
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const hoverAnimations = shouldReduceMotion
    ? {}
    : {
        y: -6,
        borderColor: "rgba(139,92,246,0.3)",
        boxShadow: "0 20px 48px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
      };

  return (
    <motion.article
      variants={variants}
      whileHover={hoverAnimations}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* THUMBNAIL AREA */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0f]">
        {!imgError ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-linear-to-br ${project.fallbackGradient} flex items-center justify-center`}
          >
            <FiCode size={40} className="text-white/20" />
          </div>
        )}

        {project.featured && (
          <div
            className="absolute top-0 left-0 bg-violet-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-br-xl rounded-tl-2xl"
            aria-label="Featured project"
          >
            ✦ Featured
          </div>
        )}

        <div className="absolute inset-0 bg-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* CARD BODY */}
      <div className="p-6 flex flex-col grow gap-4">
        {/* Title + Date */}
        <div className="flex justify-between items-start gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="text-white text-lg font-bold leading-tight hover:text-violet-400 transition-colors focus:outline-none"
          >
            {project.title}
          </Link>
          <span className="text-white/35 text-xs shrink-0 mt-1">
            {project.date}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-white/55 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-4">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            whileHover={!shouldReduceMotion ? { scale: 1.04 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.96 } : {}}
            className="bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/25 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-sm transition-colors focus:outline-none"
          >
            <SiGithub size={16} />
            <span>Code</span>
          </motion.a>

          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo (opens in new tab)`}
            whileHover={
              !shouldReduceMotion
                ? { scale: 1.04, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }
                : {}
            }
            whileTap={!shouldReduceMotion ? { scale: 0.96 } : {}}
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors focus:outline-none"
          >
            <FiExternalLink size={16} />
            <span>Live Demo</span>
          </motion.a>

          <Link
            to={`/projects/${project.id}`}
            className="ml-auto text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 group/link focus:outline-none transition-colors"
          >
            View Details
            <span className="inline-block">
              <FiArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;