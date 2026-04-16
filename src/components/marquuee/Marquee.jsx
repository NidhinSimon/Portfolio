import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MarqueeTransition = () => {
  const containerRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Eye movement logic
      const moveEye = (eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(clientY - eyeY, clientX - eyeX);
        const distance = Math.min(rect.width / 4, Math.hypot(clientX - eyeX, clientY - eyeY) / 15);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        gsap.to(eye.querySelector('.pupil'), {
          x,
          y,
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      moveEye(leftEyeRef.current);
      moveEye(rightEyeRef.current);

      // Parallax text logic
      if (textRef.current) {
        const xMove = (clientX - innerWidth / 2) / 30;
        const yMove = (clientY - innerHeight / 2) / 30;
        gsap.to(textRef.current, {
          x: xMove,
          y: yMove,
          duration: 1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className='relative h-screen w-full bg-[#C9F31D] overflow-hidden flex flex-col items-center justify-center py-20'
    >
      {/* Background distortion text */}
      <div className='absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none'>
        <h2 className='text-[20vw] font-black text-[#080808] whitespace-nowrap leading-none'>
          HIRE ME • HIRE ME • HIRE ME
        </h2>
      </div>

      <div ref={textRef} className='relative z-10 text-center'>
        <h2 className='text-[clamp(3rem,10vw,12rem)] font-bold text-[#080808] tracking-tighter leading-[0.85] uppercase mb-10'>
          Ready to <br /> collaborate?
        </h2>

        {/* Interactive Eyes */}
        <div className='flex gap-10 justify-center items-center mt-10'>
          {[leftEyeRef, rightEyeRef].map((ref, i) => (
            <div 
              key={i}
              ref={ref}
              className='w-[15vw] h-[15vw] max-w-[180px] max-h-[180px] bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#080808]'
            >
              <div className='pupil w-1/3 h-1/3 bg-[#080808] rounded-full relative'>
                <div className='absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-40' />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip bottom */}
      <div className='absolute bottom-10 w-full overflow-hidden border-y border-[#080808]/10 py-4'>
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='flex whitespace-nowrap gap-10'
        >
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className='text-3xl font-bold text-[#080808]/40 uppercase tracking-widest'>
              Full Stack • Designer • Creative Developer • 
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ready-section { h2 { font-size: 4rem !important; } }
        }
      `}</style>
    </section>
  )
}

export default MarqueeTransition;
