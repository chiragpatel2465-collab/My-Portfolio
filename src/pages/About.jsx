import { motion, useReducedMotion } from "framer-motion";

const PHOTO_URL = "/Profile_img.webp";

const PARAGRAPH_1 = `I'm Chirag Patel, a frontend developer and IT student based in India, actively looking for my first professional opportunity. I love crafting clean, responsive, and visually engaging web experiences that feel great to use.`;

const PARAGRAPH_2 = `I believe good interfaces should be fast, intuitive, and accessible to everyone. When I'm not coding, you'll find me exploring new tools, tinkering with side projects, or going deep on design inspiration.`;

const STACK_PILLS = [
  "HTML / CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Git & GitHub",
  "Framer Motion",
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  // Animations
  const cardEntranceVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : -50,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const pulseDotAnimation = prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.4, 1],
        opacity: [1, 0.5, 1],
      };

  return (
    <section
      id="about"
      aria-label="About section"
      className="min-h-screen py-24 md:py-32 relative overflow-hidden flex items-center"
    >
      {/* Background Decor */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-600/6 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Inner Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT COLUMN — PHOTO CARD */}
          <motion.div
            className="order-1 relative w-full max-w-[320px] lg:max-w-[460px] mx-auto"
            variants={cardEntranceVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Glow blob behind card */}
            <div
              className="absolute inset-0 rounded-3xl bg-linear-to-br from-violet-600/30 to-fuchsia-600/15 blur-3xl scale-105 z-0"
              aria-hidden="true"
            />

            {/* Glass Card */}
            <div
              className="relative z-10 backdrop-blur-xl bg-white/4 border border-white/10 rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                aspectRatio: "4/5",
              }}
            >
              <img
                src={PHOTO_URL}
                alt={`Chirag Patel — Frontend Developer`}
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom subtle gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-to-t from-[#0a0a0f]/70 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Open to Work Badge */}
              <div
                className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-green-400/30 rounded-full px-4 py-1.5 flex items-center gap-2"
                aria-label="Status: Open to Work"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={pulseDotAnimation}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-green-300">
                  Open to Work
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — TEXT CONTENT */}
          <motion.div
            className="order-2 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.p
              variants={itemVariants}
              className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              About Me
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              A bit about <br /> who I am
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-5"
            >
              {PARAGRAPH_1}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10"
            >
              {PARAGRAPH_2}
            </motion.p>

            {/* STACK & TOOLS BLOCK */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
                Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {STACK_PILLS.map((pill) => (
                  <motion.div
                    key={pill}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.06,
                            boxShadow: "0 0 12px rgba(139,92,246,0.3)",
                          }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/5 border border-violet-500/25 hover:border-violet-500/60 text-white/80 hover:text-white backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-default"
                  >
                    {pill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
