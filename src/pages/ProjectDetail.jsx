import { useState } from 'react';
import { useParams, Link , useNavigate} from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiChevronLeft, FiChevronRight, FiCheck, FiArrowRight, FiCode } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import projects  from '../data/Project';

const ProjectDetail = () => {
  const { id } = useParams();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const handleBackToProjects = (e) => {
    e.preventDefault();
    navigate("/", { state: { scrollToProjects: true } });
  };

  // Find current project
  const project = projects.find((p) => p.id === id);

  // Helper functions
  const handlePrevImage = () => {
    if (!project) return;
    setCurrentIndex((prev) => (prev === 0 ? project.galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!project) return;
    setCurrentIndex((prev) => (prev === project.galleryImages.length - 1 ? 0 : prev + 1));
  };

  const findAdjacentProjects = () => {
    if (!project) return { prevProject: null, nextProject: null };
    const index = projects.findIndex((p) => p.id === project.id);
    const prevProject = index > 0 ? projects[index - 1] : null;
    const nextProject = index < projects.length - 1 ? projects[index + 1] : null;
    return { prevProject, nextProject };
  };

  const { prevProject, nextProject } = findAdjacentProjects();

  // Conditional Animations based on user preference
  const heroAnim = prefersReducedMotion 
    ? { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } }
    : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: "easeOut" } };

  const fadeUpScrollAnim = prefersReducedMotion 
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: "easeOut" }, viewport: { once: true, amount: 0.3 } };

  const featureAnim = prefersReducedMotion
    ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: -16 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, viewport: { once: true, amount: 0.4 } };

  const carouselSectionAnim = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, viewport: { once: true, amount: 0.2 } };

  // Error State
  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
          Project not found
        </h1>
        <button
           onClick={handleBackToProjects} 
          className="bg-violet-600 hover:bg-violet-500 transition-colors px-6 py-2.5 rounded-xl text-white font-medium flex items-center gap-2"
        >
          <FiArrowLeft size={18} />
          Back to Projects
        </button>
      </section>
    );
  }

  return (
    <section 
      id="project-detail" 
      aria-label="Project details"
      className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-10 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-violet-600/8 blur-3xl rounded-full pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-fuchsia-600/6 blur-3xl rounded-full pointer-events-none -z-10" aria-hidden="true" />

      {/* 1. BACK NAVIGATION */}
      <motion.div 
        whileHover={prefersReducedMotion ? {} : { x: -4 }}
        className="inline-block mb-6 sm:mb-8 md:mb-10"
      >
        <button 
          onClick={handleBackToProjects} 
          className="flex items-center gap-2 text-white/50 hover:text-violet-400 text-xs sm:text-sm font-medium transition-colors duration-200"
          aria-label="Back to all projects"
        >
          <FiArrowLeft size={18} />
          Back to Projects
        </button>
      </motion.div>

      {/* 2. HERO IMAGE SECTION */}
      <motion.div 
        {...heroAnim}
        className="w-full rounded-2xl overflow-hidden mb-6 sm:mb-8 md:mb-10 border border-white/10 bg-white/5 aspect-video relative flex items-center justify-center"
      >
        {!imageError ? (
          <img 
            src={project.thumbnail} 
            alt={`${project.title} hero screenshot`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.fallbackGradient} flex flex-col items-center justify-center text-white/30`}>
            <FiCode size={48} className="mb-2" />
            <span className="text-sm tracking-widest uppercase">Preview Unavailable</span>
          </div>
        )}
      </motion.div>

      {/* 3. TITLE + METADATA BLOCK */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          {project.title}
        </h1>
        
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3 sm:mb-4">
          Built With
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {project.techStack.map((tech, i) => (
            <span 
              key={i}
              className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} code on GitHub (opens in new tab)`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, boxShadow: "0 0 24px rgba(139,92,246,0.4)" }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
              className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium w-full sm:w-auto transition-colors"
            >
              <SiGithub size={18} />
              View Code
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo (opens in new tab)`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, boxShadow: "0 0 24px rgba(139,92,246,0.4)" }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
              className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium w-full sm:w-auto transition-colors"
            >
              <FiExternalLink size={18} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* 4. DIVIDER */}
      <hr className="border-white/8 my-6 sm:my-8 md:my-10" />

      {/* 5. PROJECT DESCRIPTION SECTION */}
      <motion.p 
        {...fadeUpScrollAnim}
        className="text-white/65 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8"
      >
        {project.description}
      </motion.p>

      {/* 6. KEY FEATURES SECTION */}
      <div className="mb-8 sm:mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-4 sm:mb-6">
          Key Features
        </p>
        <div className="flex flex-col">
          {project.keyFeatures.map((feature, i) => (
            <motion.div 
              key={i}
              {...featureAnim}
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              tabIndex="0"
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 mb-3 sm:mb-4 flex items-start gap-4 transition-colors hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
              }}
            >
              <FiCheck size={20} className="text-violet-400 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-xs sm:text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 7. DIVIDER */}
      <hr className="border-white/8 my-6 sm:my-8 md:my-10" />

      {/* 8. IMAGE GALLERY CAROUSEL */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <motion.div {...carouselSectionAnim}>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4 sm:mb-6">
            Project Showcase
          </p>
          
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] mb-4 aspect-video flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={project.galleryImages[currentIndex]}
                alt={`${project.title} gallery image ${currentIndex + 1}`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 100 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </AnimatePresence>

            {/* Navigation Arrows (Visible sm+) */}
            {project.galleryImages.length > 1 && (
              <>
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 p-2 sm:p-3 rounded-full text-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={24} />
                </motion.button>

                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 p-2 sm:p-3 rounded-full text-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Next image"
                >
                  <FiChevronRight size={24} />
                </motion.button>
              </>
            )}
          </div>

          {/* Dot Indicators */}
          {project.galleryImages.length > 1 && (
            <div className="flex justify-center gap-2 mb-6 sm:mb-8">
              {project.galleryImages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.3 }}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={currentIndex === index ? "true" : "false"}
                  className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] ${
                    currentIndex === index ? "bg-violet-500 w-6" : "bg-white/20 hover:bg-white/40 w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* 9. BOTTOM NAVIGATION (Prev / Next Project) */}
      <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="w-full sm:w-1/2 flex justify-start">
          {prevProject && (
            <motion.div whileHover={prefersReducedMotion ? {} : { x: -3 }}>
              <Link 
                to={`/projects/${prevProject.id}`}
                className="flex items-center gap-2 text-white/50 hover:text-violet-400 text-xs sm:text-sm font-medium transition-colors"
                aria-label={`Previous Project: ${prevProject.title}`}
              >
                <FiArrowLeft size={18} />
                Previous Project
              </Link>
            </motion.div>
          )}
        </div>

        <div className="w-full sm:w-1/2 flex justify-start sm:justify-end">
          {nextProject && (
            <motion.div whileHover={prefersReducedMotion ? {} : { x: 3 }}>
              <Link 
                to={`/projects/${nextProject.id}`}
                className="flex items-center gap-2 text-white/50 hover:text-violet-400 text-xs sm:text-sm font-medium transition-colors"
                aria-label={`Next Project: ${nextProject.title}`}
              >
                Next Project
                <FiArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;