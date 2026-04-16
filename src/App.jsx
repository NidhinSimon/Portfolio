import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Marquee from './components/marquuee/Marquee'
import Projects from './components/Projectss/Projects'
import Skills from './components/Skills/Skills'
import MiniPRojects from './components/Mini PRojects/MiniPRojects'
import Contact from './components/Contact/Contact'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <Landing />
      <Marquee />
      <Projects />
      <MiniPRojects />
      <Skills />
      <Contact />
    </>
  )

}

export default App

