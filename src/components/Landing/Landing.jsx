import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Landing = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { 
        x: clientX, 
        y: clientY, 
        duration: 0, 
        ease: 'none' 
      });
      gsap.to(ring, { 
        x: clientX, 
        y: clientY, 
        duration: 0.15, 
        ease: 'power2.out' 
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Entry animations
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo('.reveal-text', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
    );

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id='landing' className='relative h-screen w-full bg-[#080808] overflow-hidden flex flex-col justify-center px-10 md:px-20'>
      {/* Custom Cursor */}
      <div ref={cursorRef} className='fixed top-0 left-0 w-3 h-3 bg-[#C9F31D] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2' />
      <div ref={ringRef} className='fixed top-0 left-0 w-10 h-10 border border-[#C9F31D] rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2' />

      <div className='z-10 mt-20 md:mt-0'>
        <div className='overflow-hidden'>
          <h1 className='reveal-text text-[#C9F31D] font-medium tracking-tighter text-sm uppercase mb-6'>
            Full Stack Developer & Designer
          </h1>
        </div>
        
        <div className='overflow-hidden'>
          <h2 className='reveal-text text-[clamp(2.5rem,8vw,9rem)] leading-[0.85] font-bold text-[#F0EDE6] tracking-tighter uppercase'>
            Nidhin <br /> Simon
          </h2>
        </div>

        <div className='mt-10 overflow-hidden'>
          <p className='reveal-text text-[#888] max-w-xl text-lg md:text-xl leading-relaxed'>
            Transforming complex ideas into pixel-perfect, high-performance web experiences. 
            Focused on modern tech stacks and seamless interactions.
          </p>
        </div>

        <div className='mt-12 overflow-hidden'>
           <div className='reveal-text flex flex-wrap gap-4 md:gap-6'>
              <a href="#Works" className='px-10 py-4 bg-[#C9F31D] text-[#080808] font-bold uppercase text-xs md:text-sm rounded-full transition-all hover:bg-white active:scale-95'>
                View Work
              </a>
              <a href="#Contact" className='px-10 py-4 border border-[#F0EDE6] text-[#F0EDE6] font-bold uppercase text-xs md:text-sm rounded-full transition-all hover:bg-white hover:text-[#080808] active:scale-95'>
                Let's Talk
              </a>
           </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className='absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] bg-[#C9F31D] rounded-full opacity-[0.03] blur-[150px] pointer-events-none' />

      {/* Availability Badge */}
      <div className='absolute top-28 right-10 md:right-20 flex items-center gap-3 px-5 py-2.5 bg-[#111] border border-white/5 rounded-full'>
        <div className='w-2 h-2 bg-[#C9F31D] rounded-full animate-pulse shadow-[0_0_12px_#C9F31D]' />
        <span className='text-[10px] uppercase tracking-[0.2em] font-semibold text-[#888]'>Available for hire</span>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50'>
        <span className='text-[9px] uppercase tracking-[0.4em] text-[#888] font-medium'>Scroll</span>
        <div className='w-px h-16 bg-gradient-to-b from-[#C9F31D] to-transparent' />
      </div>
    </section>
  );
};

export default Landing;
