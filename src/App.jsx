import './App.css'
import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Projects from './pages/Project'
import ProjectDetail from './pages/ProjectDetail'
import AboutSection from './pages/About'
import ContactSection from './pages/Contact'
import HeroSection from './pages/Home'
import SkillsSection from './pages/Skills'
import Nav from './Components/Nav'

function HomePage({ homeRef, aboutRef, contactRef, skillRef, projectRef }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToProjects && projectRef?.current) {
      const yOffset = -80;
      const y = projectRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [location.state, projectRef]);

  return (
    <div>
      <Nav
        homeRef={homeRef}
        aboutRef={aboutRef}
        projectRef={projectRef}
        skillRef={skillRef}
        contactRef={contactRef}
      />

      <section ref={homeRef} style={{ minHeight: '100vh' }}>
        <HeroSection contactRef={contactRef} projectRef={projectRef} />
      </section>

      <section ref={aboutRef}>
        <AboutSection />
      </section>

      <section ref={skillRef}>
        <SkillsSection />
      </section>

      <section ref={projectRef}>
        <Projects />
      </section>

      <section ref={contactRef}>
        <ContactSection />
      </section>
    </div>
  )
}



function App() {
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const skillRef = useRef(null)
  const projectRef = useRef(null)
  const homeRef = useRef(null)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            homeRef={homeRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
            skillRef={skillRef}
            projectRef={projectRef}
          />
        }
      />

      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
