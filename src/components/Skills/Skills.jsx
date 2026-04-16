import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const skillsList = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 
  'TypeScript', 'Framer Motion', 'GSAP', 'Tailwind CSS', 
  'Next.js', 'Redux', 'Git/GitHub', 'AWS', 'REST APIs', 
  'PostgreSQL', 'Socket.io', 'JWT', 'Clash Display'
];

const MagneticTag = ({ skill, index, isInView }) => {
  const tagRef = useRef(null);

  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;

    const onMouseMove = (e) => {
      const rect = tag.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < 120) {
        gsap.to(tag, {
          x: distanceX * 0.4,
          y: distanceY * 0.4,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(tag, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <motion.div
      ref={tagRef}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        backgroundColor: '#C9F31D',
        color: '#080808',
        borderColor: '#C9F31D',
        scale: 1.1,
        zIndex: 10
      }}
      className='px-6 py-3 rounded-full border border-white/10 text-[#F0EDE6] text-sm md:text-base font-medium transition-colors cursor-none bg-[#111]'
    >
      {skill}
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id='Skills' className='py-32 px-10 md:px-20 bg-[#080808] border-t border-white/5 overflow-hidden'>
      <div className='flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto'>
        <div className='lg:w-1/3'>
          <h2 className='text-[#888] text-xs uppercase tracking-[0.3em] font-medium mb-4'>Expertise</h2>
          <h3 className='text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#F0EDE6] tracking-tighter uppercase mb-8 leading-[0.9]'>
            My <span className='text-[#C9F31D]'>Tech <br /> Stack</span>
          </h3>
          <p className='text-[#888] text-lg leading-relaxed max-w-sm'>
            I blend technical proficiency with creative aesthetics to build robust, scalable, and visually stunning digital solutions.
          </p>
          
          <div className='mt-12 flex items-center gap-4 text-[#C9F31D]'>
            <div className='w-12 h-px bg-[#C9F31D]/30' />
            <span className='text-[10px] uppercase tracking-widest font-bold'>Hover to interact</span>
          </div>
        </div>

        <div ref={containerRef} className='lg:w-2/3 flex flex-wrap gap-4 content-start'>
          {skillsList.map((skill, index) => (
            <MagneticTag key={skill} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
