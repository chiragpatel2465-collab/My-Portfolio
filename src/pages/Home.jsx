import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { scrollToSection } from "../utils/scrollToSection";

// ============================================================================
// CONSTANTS & DATA
// ============================================================================


const PLACEHOLDER_NAME = "Chirag Patel";
const PLACEHOLDER_DESC =
  "I am a student of Shree Swaminarayan Institute of Technology, studying IT. I am passionate about building web applications and learning new technologies.";
const PLACEHOLDER_IMAGE_URL = "/Profile_image.png";


const ROLES = ["Frontend Developer", "React Developer", "MERN Enthusiast"];

const TYPEWRITER_TYPE_SPEED = 80;
const TYPEWRITER_DELETE_SPEED = 40;
const TYPEWRITER_PAUSE_MS = 1800;

const GLASS_SHADOW =
  "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
const BUTTON_HOVER_GLOW = "0 0 24px rgba(139,92,246,0.5)";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardEntryVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ============================================================================
// SUBCOMPONENTS: BACKGROUND ASSETS
// ============================================================================

const IsometricCube = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
    <polygon
      points="30,10 50,22 50,46 30,58 10,46 10,22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <polyline
      points="10,22 30,34 50,22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="30"
      y1="34"
      x2="30"
      y2="58"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const Octahedron = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
    <polygon
      points="30,5 55,30 30,55 5,30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="30"
      y1="5"
      x2="30"
      y2="55"
      stroke="currentColor"
      strokeWidth="1"
    />
    <line
      x1="5"
      y1="30"
      x2="55"
      y2="30"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const Rhombus = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
    <polygon
      points="30,10 50,30 30,50 10,30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <polygon
      points="25,15 45,35 25,55 5,35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const GEOMETRIC_SHAPES = [
  {
    Component: IsometricCube,
    classes: "w-16 h-16 md:w-24 md:h-24 top-[15%] right-[10%] text-violet-500",
    delay: 0,
    showOnMobile: true,
  },
  {
    Component: Octahedron,
    classes: "w-20 h-20 md:w-32 md:h-32 bottom-[20%] left-[5%] text-white",
    delay: 1,
    showOnMobile: true,
  },
  {
    Component: Rhombus,
    classes: "w-12 h-12 md:w-20 md:h-20 top-[40%] right-[35%] text-fuchsia-500",
    delay: 2,
    showOnMobile: false,
  },
  {
    Component: IsometricCube,
    classes: "w-14 h-14 md:w-28 md:h-28 top-[60%] right-[15%] text-violet-500",
    delay: 1.5,
    showOnMobile: false,
  },
  {
    Component: Octahedron,
    classes: "w-10 h-10 md:w-16 md:h-16 top-[25%] left-[20%] text-white",
    delay: 0.5,
    showOnMobile: false,
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const HeroSection = ({ contactRef, projectRef }) => {
  const prefersReducedMotion = useReducedMotion();

  // --- Typewriter State & Logic ---
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  

  useEffect(() => {
    const currentRole = ROLES[loopNum % ROLES.length];
    let timer;
    let pauseTimer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText((prev) => {
          const next = prev.slice(0, -1);
          if (next === "") {
            setIsDeleting(false);
            setLoopNum((p) => p + 1);
          }
          return next;
        });
      }, TYPEWRITER_DELETE_SPEED);
    } else {
      timer = setTimeout(() => {
        setTypedText((prev) => {
          const next = currentRole.slice(0, prev.length + 1);
          if (next === currentRole) {
            pauseTimer = setTimeout(() => setIsDeleting(true), TYPEWRITER_PAUSE_MS);
          }
          return next;
        });
      }, TYPEWRITER_TYPE_SPEED);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(pauseTimer);
    };
  }, [typedText, isDeleting, loopNum]);

  // --- Mouse Parallax Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rawRotateX = useTransform(mouseY, [-1, 1], [8, -8]);
  const rawRotateY = useTransform(mouseX, [-1, 1], [-8, 8]);

  const smoothRotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center overflow-hidden w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LAYER 1: Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-72 h-72 md:w-96 md:h-96 bg-violet-600/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 30, -20, 0], y: [0, -40, 20, 0] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-72 h-72 md:w-96 md:h-96 bg-fuchsia-600/15 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, -30, 20, 0], y: [0, 40, -20, 0] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[40%] w-60 h-60 md:w-80 md:h-80 bg-indigo-600/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 20, -30, 0], y: [0, 20, -30, 0] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* LAYER 2: 3D Geometric Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {GEOMETRIC_SHAPES.map((shape, idx) => {
          const ShapeComp = shape.Component;
          return (
            <motion.div
              key={idx}
              className={`absolute ${shape.classes} ${!shape.showOnMobile ? "hidden md:block" : ""}`}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.25 }
                  : {
                      rotate: [0, 360],
                      y: [0, -15, 0],
                      opacity: [0.15, 0.35, 0.15],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      rotate: {
                        duration: 25 + idx * 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: {
                        duration: 5 + idx,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: shape.delay,
                      },
                      opacity: {
                        duration: 5 + idx,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: shape.delay,
                      },
                    }
              }
            >
              <ShapeComp className="w-full h-full" />
            </motion.div>
          );
        })}
      </div>

      {/* INNER CONTENT WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        {/* LEFT COLUMN: Text Content */}
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 font-light"
          >
            Hi, I'm 👋
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold py-3 tracking-tight bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            {PLACEHOLDER_NAME}
          </motion.h1>

          {/* Typewriter Role */}
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold text-white/80"
            role="text"
            aria-label={`I'm a ${typedText}`}
          >
            I'm a{" "}
            <span className="inline-block min-w-56 text-left">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block ml-[2px] font-light"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-white/50 max-w-lg leading-relaxed mx-auto lg:mx-0"
          >
            {PLACEHOLDER_DESC}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4"
          >
            {/* Button A: Primary */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={(e) => scrollToSection(projectRef, e)}
                aria-label="View My Projects"
                className="group relative flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3 rounded-xl transition-colors w-full sm:w-auto"
                style={{ transition: "box-shadow 0.3s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = BUTTON_HOVER_GLOW)
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                View Projects
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Button B: Secondary */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={(e) => scrollToSection(contactRef, e)}
                aria-label="Contact Me"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-violet-500/50 text-white font-semibold px-7 py-3 rounded-xl backdrop-blur-sm transition-all w-full sm:w-auto"
              >
                <FiMail className="w-5 h-5" aria-hidden="true" />
                Contact Me
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Avatar Card */}
        <motion.div
          className="hidden lg:flex justify-center items-center"
          variants={cardEntryVariants}
          initial="hidden"
          animate="visible"
          style={{ transformPerspective: 1000 }}
        >
          <motion.div
            style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
            className="relative w-92 h-92 md:w-92 md:h-92"
          >
            {/* Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-linear-to-br from-violet-600/40 to-fuchsia-600/20 blur-2xl z-0"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glass Card Wrapper with Float Animation */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full z-10"
            >
              <div
                className="w-full h-full rounded-full overflow-hidden backdrop-blur-xl bg-white/8 border border-white/15 relative"
                style={{ boxShadow: GLASS_SHADOW }}
              >
                <img
                  src={PLACEHOLDER_IMAGE_URL}
                  alt={`${PLACEHOLDER_NAME} - Frontend Developer`}
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Gradient Overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-[#0a0a0f]/60 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
