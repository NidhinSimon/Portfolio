import { easeInOut, motion, useAnimation } from 'framer-motion';
import React from 'react';

const Projects = () => {
  const cards = [useAnimation(), useAnimation()];

  const handleHover = (index) => {
    cards[index].start({ y: '0' });
  };

  const HoverEnd = (index) => {
    cards[index].start({ y: '100%' });
  };

  return (
    <div id='Works' className='w-full bg-zinc-900'>
      <div>
        <h1 className='text-2xl font-medium uppercase text-center text-white pt-5'>My Projects</h1>
      </div>
      <div className='border-t-2 border-yellow-500 mt-10'></div>
      <div className='flex flex-col md:flex-row p-10 gap-10'>
        <motion.div
          onHoverStart={() => handleHover(0)}
          onHoverEnd={() => HoverEnd(0)}
          className='w-full md:w-1/2 relative h-[80vh] bg-slate-600 rounded-xl'
        >
          <motion.h1 className='absolute flex overflow-hidden text-white left-full -translate-x-1/2 top-1/2 -translate-y-1/2  z-[1000] uppercase text-5xl max-sm:hidden '>
            {'Fixxit'.split('').map((item, index) => (
              <motion.span
                initial={{ y: '100%' }}
                animate={cards[0]}
                transition={{ ease: [0.87, 0, 0.13, 1], delay: index * .1 }}
                className='inline-block '
                key={index}
              >
                {item}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ scale: 0.6 }}
            whileHover={{ scale: 0.7, transition: { duration: 0.3 } }}
            className='w-full h-full scale-50 bg-green-200 rounded-xl overflow-hidden '
          >
            <img src="./Fixxit.png" className='h-full w-full bg-cover bg-center' alt="" />
          </motion.div>
        </motion.div>
        <motion.div
          onHoverStart={() => handleHover(1)}
          onHoverEnd={() => HoverEnd(1)}
          className='w-full md:w-1/2 h-[80vh] relative bg-slate-600 rounded-xl'
        >
          <h1 className='absolute flex overflow-hidden  text-white right-full translate-x-1/2 top-1/2 -translate-y-1/2 uppercase text-5xl '>
            {'Watchify'.split('').map((item, index) => (
              <motion.span
                initial={{ y: '100%' }}
                animate={cards[1]}
                transition={{ ease: [0.87, 0, 0.13, 1], delay: index * 0.1 }}
                className='inline-block text-white '
                key={index}
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ scale: 0.5 }}
            whileHover={{ scale: 0.7, transition: { duration: 0.3 } }}
            className='w-full h-full bg-green-200 rounded-xl overflow-hidden '
          >
            <img src="./Watchifyy.png" className='h-full w-full ' alt="" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
