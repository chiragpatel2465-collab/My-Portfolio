// src/components/sections/ContactSection.jsx
/*
 * EMAILJS SETUP — complete these steps before testing:
 * 1. npm install @emailjs/browser
 * 2. Create a free account at https://emailjs.com
 * 3. Add a Gmail/Outlook service → copy Service ID
 * 4. Create a template with variables:
 *    {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *    → copy Template ID
 * 5. Go to Account → copy Public Key
 * 6. Create .env in project root and add:
 *    VITE_EMAILJS_SERVICE_ID=...
 *    VITE_EMAILJS_TEMPLATE_ID=...
 *    VITE_EMAILJS_PUBLIC_KEY=...
 * 7. Add .env to .gitignore — never commit your keys!
 */

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// CONTACT LINKS DATA
const CONTACT_LINKS = [
  {
    icon: FiMail,
    label: "chiragpatel2465@gmail.com",
    href: "mailto:chiragpatel2465@gmail.com",
  },
  {
    icon: FaLinkedin,
    label: "linkedin.com/in/chirag-patel",
    href: "https://www.linkedin.com/in/chirag-patel-5bb00331a/",
  },
  {
    icon: FaGithub,
    label: "github.com/chiragpatel2465-collab",
    href: "https://github.com/chiragpatel2465-collab",
  },
];

const DESCRIPTION_TEXT =
  "I'm open to frontend opportunities, internships, and freelance projects — short or long-term. Whether it's a landing page, a full product, or just a fresh pair of eyes — let's talk.";
export default function ContactSection() {
  const formRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Form states
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [errors, setErrors] = useState({});

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    const tempErrors = {};
    if (!formData.from_name.trim()) tempErrors.from_name = true;
    if (!formData.from_email.trim()) tempErrors.from_email = true;
    if (!formData.message.trim()) tempErrors.message = true;

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
        },
      )
      .then(() => {
        setStatus("success");
        setFormData({
          from_name: "",
          from_email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 3000);
      })
      .catch((err) => {
        console.error("EmailJS Error: ", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      });
  };

  // Motion Configuration
  const cardVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const leftContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const leftItemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const rightFormVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="min-h-screen relative overflow-hidden flex items-center py-24 md:py-32"
    >
      {/* Background Atmospheric Orbs */}
      <div
        className="absolute top-1/4 left-0 w-80 h-80 bg-violet-600/8 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/6 blur-3xl rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Inner Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Outer Floating Card Panel */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative p-6 md:p-10 lg:p-14 rounded-2xl lg:rounded-3xl backdrop-blur-2xl bg-white/3 border border-white/10 overflow-hidden"
          style={{
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle violet wash gradient replacement on the right half */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-3xl bg-linear-to-bl from-violet-600/10 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN (~40% width / 5 cols) */}
            <motion.div
              variants={leftContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-5 flex flex-col mb-4 lg:mb-0"
            >
              <motion.span
                variants={leftItemVariants}
                className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
              >
                GET IN TOUCH
              </motion.span>

              <motion.h2
                variants={leftItemVariants}
                className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] pb-6"
              >
                Let's work <br /> together
              </motion.h2>

              <motion.p
                variants={leftItemVariants}
                className="text-white/55 text-base leading-relaxed mb-10"
              >
                {DESCRIPTION_TEXT}
              </motion.p>

              {/* Vertical Contact/Social Links Listing */}
              <div className="flex flex-col gap-4">
                {CONTACT_LINKS.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={leftItemVariants}
                      whileHover={prefersReducedMotion ? {} : { x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group w-fit"
                      >
                        <div className="bg-white/6 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm flex items-center justify-center">
                          <Icon
                            className="text-violet-400"
                            size={18}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-white/60 group-hover:text-violet-400 text-sm font-medium transition-colors duration-200">
                          {link.label}
                        </span>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT COLUMN (~60% width / 7 cols) */}
            <motion.div
              variants={rightFormVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-7 w-full"
            >
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-5">
                  {/* Row 1: Name + Email side by side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="from_name"
                        className="text-white/60 text-sm font-medium mb-1.5"
                      >
                        Name{" "}
                        <span className="text-violet-400" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                      />
                      {errors.from_name && (
                        <p className="text-red-400 text-xs mt-1" role="alert">
                          This field is required
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="from_email"
                        className="text-white/60 text-sm font-medium mb-1.5"
                      >
                        Email{" "}
                        <span className="text-violet-400" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                      />
                      {errors.from_email && (
                        <p className="text-red-400 text-xs mt-1" role="alert">
                          This field is required
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="subject"
                      className="text-white/60 text-sm font-medium mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Discussion"
                      className="bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  {/* Row 3: Message */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="text-white/60 text-sm font-medium mb-1.5"
                    >
                      Message{" "}
                      <span className="text-violet-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project details..."
                      className="resize-none bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1" role="alert">
                        This field is required
                      </p>
                    )}
                  </div>

                  {/* Submit Actions Button Box */}
                  <div className="mt-4" aria-live="polite">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      aria-label="Send message"
                      aria-disabled={status === "sending"}
                      whileHover={
                        prefersReducedMotion || status === "sending"
                          ? {}
                          : {
                              scale: 1.02,
                              boxShadow: "0 0 28px rgba(139,92,246,0.5)",
                            }
                      }
                      whileTap={
                        prefersReducedMotion || status === "sending"
                          ? {}
                          : { scale: 0.97 }
                      }
                      className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                        status === "sending"
                          ? "bg-violet-600/60 cursor-not-allowed opacity-60"
                          : "bg-violet-600 hover:bg-violet-500"
                      }`}
                    >
                      {status === "idle" && (
                        <>
                          <span>Send message</span>
                          <FiArrowRight size={16} />
                        </>
                      )}
                      {status === "sending" && (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Sending...</span>
                        </>
                      )}
                      {status === "success" && (
                        <span className="text-green-400 font-bold flex items-center gap-1">
                          Message Sent! ✓
                        </span>
                      )}
                      {status === "error" && (
                        <>
                          <span>Send message</span>
                          <FiArrowRight size={16} />
                        </>
                      )}
                    </motion.button>

                    {status === "error" && (
                      <p
                        className="text-red-400 text-sm font-medium mt-3 text-center"
                        role="alert"
                      >
                        Failed to send. Try again.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
