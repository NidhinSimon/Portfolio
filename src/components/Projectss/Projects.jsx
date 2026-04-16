import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const projects = [
  {
    id: '01',
    title: 'Fixxit',
    category: 'Full Stack App',
    img: './Fixxit.png',
    tech: ['MERNStack', 'Stripe', 'FramerMotion'],
    desc: 'Automotive service platform connecting mechanics and users.'
  },
  {
    id: '02',
    title: 'Watchify',
    category: 'E-Commerce',
    img: './Watchifyy.png',
    tech: ['NextJS', 'Redux', 'Tailwind'],
    desc: 'Premium luxury watch marketplace with seamless user flow.'
  },
  {
    id: '03',
    title: 'Expense Pro',
    category: 'SaaS Tool',
    img: './Expense.png',
    tech: ['React', 'ChartJS', 'Firebase'],
    desc: 'Financial tracking tool with advanced data visualization.'
  },
];

const ProjectItem = ({ project, index, onHover, onLeave }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(project.img)}
      onMouseLeave={onLeave}
      className='group relative border-b border-white/5 py-12 md:py-20 flex flex-col md:flex-row justify-between items-start md:items-center px-10 md:px-20 transition-colors hover:bg-white/[0.01] cursor-pointer'
    >
      <div className='flex items-center gap-10 md:gap-20 z-10'>
        <span className='font-mono text-xs md:text-sm text-[#444] group-hover:text-[#C9F31D] transition-colors'>
          {project.id}
        </span>
        <h3 className='text-[clamp(1.5rem,7vw,7rem)] font-bold text-[#F0EDE6] tracking-tighter uppercase leading-[0.8] transition-all duration-500 group-hover:scale-[1.02] group-hover:translate-x-4'>
          {project.title}
        </h3>
      </div>

      <div className='mt-8 md:mt-0 flex flex-col md:items-end z-10'>
        <p className='text-[clamp(0.7rem,1vw,1rem)] uppercase tracking-[0.3em] font-bold text-[#888] mb-4 group-hover:text-[#C9F31D] transition-colors'>
          {project.category}
        </p>
        <div className='flex gap-3 flex-wrap md:justify-end'>
          {project.tech.map(t => (
            <span key={t} className='text-[10px] md:text-xs uppercase tracking-widest text-[#444] border border-white/10 px-3 py-1.5 rounded-full group-hover:border-[#C9F31D]/40 group-hover:text-[#AAA] transition-all'>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeImage, setActiveImage] = useState(null);
  const imagePreviewRef = useRef(null);

  useEffect(() => {
    const preview = imagePreviewRef.current;
    if (!preview) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Fixed Offset: Keeps the image to the side of the cursor so it doesn't block text
      gsap.to(preview, {
        x: clientX + 50,
        y: clientY - 150,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [activeImage]);

  return (
    <section id='Works' className='bg-[#080808] py-40 min-h-screen relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/5 whitespace-nowrap tracking-tighter'>
          WORK • WORK • WORK
        </div>
      </div>

      <div className='px-10 md:px-20 mb-32 relative z-10'>
        <h2 className='text-[#888] text-xs uppercase tracking-[0.4em] font-medium mb-6'>Case Studies</h2>
        <h3 className='text-[clamp(2.5rem,8vw,7rem)] font-bold text-[#F0EDE6] tracking-tighter uppercase leading-[0.8]'>
          Selected <span className='text-[#C9F31D]'>Creations</span>
        </h3>
      </div>

      <div className='border-t border-white/5 relative z-10'>
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            index={index} 
            onHover={setActiveImage}
            onLeave={() => setActiveImage(null)}
          />
        ))}
      </div>

      {/* Floating Image Preview (Offset & Sharp) */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            ref={imagePreviewRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='fixed top-0 left-0 w-[400px] aspect-[4/3] pointer-events-none z-[100] overflow-hidden rounded-2xl shadow-2xl border border-white/10'
          >
            <motion.img 
              key={activeImage}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              src={activeImage} 
              className='w-full h-full object-cover'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
