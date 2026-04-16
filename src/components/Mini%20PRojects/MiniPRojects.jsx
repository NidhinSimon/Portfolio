import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const miniProjectsData = [
  {
    id: 1,
    title: 'Nexus Platform',
    category: 'Full Stack',
    img: './Task.png',
    size: 'hero'
  },
  {
    id: 2,
    title: 'SidGolf',
    category: 'Interaction',
    img: './SidGolf.png',
    size: 'vertical'
  },
  {
    id: 3,
    title: 'Orbit v1',
    category: 'Visual',
    img: './99.png',
    size: 'small'
  },
  {
    id: 4,
    title: 'Finans App',
    category: 'SaaS Tool',
    img: './Expense.png',
    size: 'wide'
  },
];

const BentoCard = ({ project, index }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const sizeClasses = {
    hero: 'md:col-span-2 md:row-span-2 h-[500px] md:h-full',
    vertical: 'md:col-span-1 md:row-span-2 h-[500px] md:h-full',
    small: 'md:col-span-1 md:row-span-1 h-[240px]',
    wide: 'md:col-span-1 md:row-span-1 h-[240px]'
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative group rounded-[2rem] overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/5 transition-all duration-700 hover:border-white/20 ${sizeClasses[project.size]}`}
    >
      <div className='absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000'>
        <motion.img 
          style={{ y }}
          src={project.img} 
          alt={project.title} 
          className='w-full h-[120%] object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-1000' 
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity' />
      
      <div className='absolute bottom-0 left-0 p-8 w-full'>
        <span className='inline-block text-[8px] uppercase tracking-[0.4em] text-[#555] mb-2 font-black group-hover:text-[#C9F31D] transition-colors'>
          {project.category}
        </span>
        <h3 className='text-xl md:text-2xl font-bold text-[#F0EDE6] tracking-[0.15em] uppercase leading-tight'>
          {project.title}
        </h3>
      </div>

      {/* Gloss Effect */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none' />
    </motion.div>
  );
};

const MiniProjects = () => {
  return (
    <section id='MiniProjects' className='py-40 px-10 md:px-20 bg-[#080808] border-t border-white/5'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-24 flex flex-col items-start'>
          <h2 className='text-[#333] text-[9px] uppercase tracking-[0.6em] font-black mb-6'>Selected Explorations</h2>
          <h3 className='text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#f0f0f0] tracking-[0.2em] uppercase leading-none'>
            The Bento <span className='text-white/20 italic'>Grid</span>
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]'>
          {miniProjectsData.map((project, index) => (
            <BentoCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className='mt-20 flex justify-between items-center opacity-10'>
          <p className='text-[8px] uppercase tracking-[0.5em] font-black'>Aesthetic Refinement Sequence</p>
          <div className='flex gap-4'>
            <div className='w-2 h-2 rounded-full bg-white' />
            <div className='w-2 h-2 rounded-full border border-white' />
            <div className='w-2 h-2 rounded-full border border-white opacity-50' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniProjects;
