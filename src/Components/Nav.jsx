import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { scrollToSection } from "../utils/scrollToSection";

export default function Nav({ homeRef, aboutRef, projectRef, skillRef, contactRef }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  // Close mobile menu on Escape key & lock body scroll when open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // prevent background scroll
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const links = [
    { label: "Home", ref: homeRef },
    { label: "About", ref: aboutRef },
    { label: "Skills", ref: skillRef },
    { label: "Projects", ref: projectRef },
    { label: "Contact", ref: contactRef },
  ]


  return (
    <>
      <div className="flex justify-center w-screen px-4 z-50 bg-transparent">
        <div className="flex items-center justify-between fixed top-0 left-0 mx-auto px-3 py-3 rounded-full w-full z-50">
          <div className="flex items-center">
            <motion.div
              className="w-full h-full mr-6 flex items-center "
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/Profile_image.png" alt="Profile Image" className="w-10 h-10 rounded-full border-2 border-white object-contain" />
              <div className="flex flex-col gap-0 mx-3">
                <p className="text-sm font-bold text-violet-500">Chirag Patel</p>
                <p className="text-xs text-slate-400">Frontend Developer</p>
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={(e) => scrollToSection(link.ref, e)} 
                  className="text-sm text-violet-500 hover:text-violet-400 transition-colors font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <button
              className="inline-flex items-center justify-center px-5 py-2 text-sm text-white border border-violet-500 rounded-full hover:bg-violet-500/20 transition-colors cursor-pointer"
              onClick={(e) => scrollToSection(contactRef, e)}
            >
              Hire me
            </button>
          </motion.div>

          {/* Mobile Menu Button - sits in fixed navbar, changes dynamically and remains clickable on top */}
          <motion.button className="md:hidden flex items-center z-50" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
            {isOpen ? <X className="h-6 w-6 text-violet-500 cursor-pointer" /> : <Menu className="h-6 w-6 text-violet-500 cursor-pointer" />}
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black z-40 pt-24 px-6 md:hidden"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col text-center space-y-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <button
                      className="text-base bg-linear-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent font-medium cursor-pointer"
                      onClick={(e) => {
                        scrollToSection(link.ref, e);
                        toggleMenu();
                      }}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="pt-6"
                >
                  <button
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-violet-500 border border-violet-500 rounded-full hover:bg-violet-500 hover:border-violet-400 transition-colors cursor-pointer"
                    onClick={(e) => {
                      scrollToSection(contactRef, e);
                      toggleMenu();
                    }}
                  >
                    Let's Connect!
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
