import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import gsap from 'gsap';
import { Power3 } from "gsap";




const Landing = () => {


  useEffect(()=>{
var mainscursor=document.querySelector("#cursor")



const cursortimeline=gsap.timeline()

cursortimeline.to(mainscursor,{
  duration:2,
  opacity:1,
  ease:Power3.easeIn,

  
})

document.addEventListener('mousemove',(e)=>{
  mainscursor.style.left=e.x  + "px";
  mainscursor.style.top=e.y  + "px"

})

return () => {
  document.removeEventListener("mousemove", function (e) {
    mainscursor.style.left=e.x + "px";
    mainscursor.style.top=e.y  + "px"

  });
};
}, []);


 
  const ref=useRef(null)

  return (
    <div id='landing' className='h-screen w-full bg-gradient-to-tr from-zinc-700 to-zinc-800 flex flex-col items-center sm:flex-col md:flex-row '>
      <div id="cursor" ref={ref} className='h-8 w-8 rounded-full fixed border z-[999]  '>

      </div>
      
      <div className='w-full sm:w-full md:w-3/5 h-full p-6 sm:pt-16 md:pt-0 sm:pl-5 md:p-12  md:mt-40 sm:mt-10 max-sm:mt-28 justify-center lg:pt-40 '>
        <h1 className='text-3xl sm:text-4xl lg:text-6xl text-white'>HELLO I AM </h1>
        <motion.h1
          transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.5 }}
          className='text-4xl sm:text-6xl lg:text-7xl leading-none  text-white mt-2 uppercase'
        >
          

          <Typewriter words={['Nidhin Simon']} cursorStyle='|' />
        </motion.h1>
        <motion.h1
          transition={{ ease: [0.11, 0, 0.5, 0], duration: 0.5, stiffness: 20, damping: 30 }}
          className='text-2xl sm:text-4xl lg:text-6xl leading-none  text-white mt-2'
        >
          <Typewriter
            words={['FULL STACK DEVELOPER', 'FRONTEND DEVELOPER', 'BACKEND DEVELOPER']}
            loop={false}
            cursor
            cursorStyle='|'
            typeSpeed={400}
            deleteSpeed={50}
            delaySpeed={2500}
          />
        </motion.h1>
        <p className='text-white capitalize mt-2 leading-none' >
          Passionate Full stack Web developer transforming  ideas into seamless and visually stunning web applications
        </p>
      </div>
      <div className='w-full sm:w-full md:w-2/5 h-full flex justify-center items-center  '>
       
      
        <div className='w-full sm:w-80 h-96 bg-transparent rounded-3xl flex justify-center items-center max-sm:h-48  border-b-2'>
          <img className='h-full w-full object-cover max-sm:object-contain rounded-3xl border-b-2' src="./99.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
