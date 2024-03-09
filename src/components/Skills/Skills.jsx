import { motion } from 'framer-motion';
import React from 'react';

const Skills = () => {
  const skillsList = [
    'MongoDB',
    'Express.js',
    'React',
    'Node.js',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Framer Motion',
    'RESTful APIs',
    'Git',
    'Redux Toolkit',
    'Responsive Web Design',
    'Authentication and Authorization',
    'Deployment (Render, AWS)',
    'Version Control (Git/GitHub)',
    'JWT',
    'Payment Integration (Stripe,Razerpay)',
    'Cloudinary',
    'Material UI'
   
  ];

  return (
    <section id='Skills' className='h-full  w-full bg-zinc-900'>
      <div className='container mx-auto py-10'>
        <h2 className='text-4xl font-bold text-white mb-8 text-center uppercase'> MY Skills</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10'>
          {skillsList.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
            
              whileInView={{opacity:1,y:0,transition:{delay:index*0.1}}}
             
              className={`bg-gray-800 p-4 rounded-md text-white text-center `}
            >
              {skill}
      
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
