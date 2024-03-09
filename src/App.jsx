import { useEffect, useRef, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Marquee from './components/marquuee/Marquee'
import Projects from './components/Projectss/Projects'
import LocomotiveScroll from 'locomotive-scroll';
import Skills from './components/Skills/Skills'
import MiniPRojects from './components/Mini PRojects/MiniPRojects'
import Contact from './components/Contact/Contact'

function App() {


  const locomotiveScroll = new LocomotiveScroll()


  return (
    <>

        <Navbar />
        <Landing  />
        <Marquee />

        <Projects />
        <MiniPRojects />
        <Skills />
<Contact/>


    
    </>
  )
}

export default App
