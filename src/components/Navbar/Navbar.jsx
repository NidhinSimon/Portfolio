import { easeIn, motion } from 'framer-motion';
import React, { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = ["Works", { label: "Resume", link: "https://drive.google.com/file/d/1GFZSukKttqWZb08UTnegw4V8__omzfLm/view?usp=sharing" }, "Skills", "Contact"];

  return (
    <div className='bg-zinc-900 fixed z-[999] text-white w-full py-5 flex justify-between'>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1,transition:easeIn}} className='h-screen w-60 bg-blue-100 fixed top-0 left-0 z-50'>
          
         
          <div className='p-4'>
          <button onClick={() => setOpen(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-black cursor-pointer'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
             
            </button>
           
          
          </div>
        
          <div className=''>
          {menuItems.map((item, index) => (
              <a className='uppercase text-black flex gap-10 ml-2 p-2' key={index} href={typeof item === 'string' ? `#${item}` : item.link}>
                {typeof item === 'string' ? item : item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
      <div>
        <h1 className='text-2xl px-4 sm:px-20 font-bold'>Nidhin Simon</h1>
      </div>
      <div className='flex gap-4 mx-4 sm:mx-10'>
       
        <div  className='hidden sm:flex'>
          {["Works", "Resume","Skills", "Contact"].map((item, index) => (
            <a className='uppercase flex gap-10 ml-2 ' key={index} href={`#${item}`}>
              {item}
            </a>
          ))}
        </div>
    
        <div onClick={() => setOpen(!open)} className='flex sm:hidden cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
