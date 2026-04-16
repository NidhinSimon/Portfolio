import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: '#Works' },
    { name: 'Skills', href: '#Skills' },
    { name: 'Contact', href: '#Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] px-10 md:px-20 py-6 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <a href="#landing" className='group'>
          <h1 className='text-xl md:text-2xl font-bold text-[#F0EDE6] tracking-tighter uppercase'>
            Nidhin <span className='text-[#C9F31D] group-hover:text-white transition-colors'>Simon</span>
          </h1>
        </a>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-12'>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className='text-[10px] uppercase tracking-[0.2em] font-bold text-[#888] hover:text-[#C9F31D] transition-colors'
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1GFZSukKttqWZb08UTnegw4V8__omzfLm/view?usp=sharing" 
            target="_blank" 
            className='px-6 py-2.5 bg-[#F0EDE6] text-[#080808] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#C9F31D] transition-all active:scale-95'
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden flex flex-col gap-1.5'
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed top-0 left-0 w-full h-screen bg-[#080808] flex flex-col justify-center items-center gap-10 z-[-1]'
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className='text-4xl font-bold text-[#F0EDE6] tracking-tighter uppercase hover:text-[#C9F31D]'
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://drive.google.com/file/d/1GFZSukKttqWZb08UTnegw4V8__omzfLm/view?usp=sharing" 
              target="_blank"
              className='text-2xl font-bold text-[#C9F31D] border-b-2 border-[#C9F31D]'
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
