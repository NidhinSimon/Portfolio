import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import gsap from 'gsap';

const MagneticSubmit = ({ isSending }) => {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const text = textRef.current;
    if (!circle || !text) return;

    const onMouseMove = (e) => {
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < 150) {
        gsap.to(circle, {
          x: dx * 0.4,
          y: dy * 0.4,
          scale: 1.1,
          duration: 0.5,
          ease: 'power3.out'
        });
        gsap.to(text, {
          x: dx * 0.2,
          y: dy * 0.2,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        gsap.to([circle, text], {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <button
      ref={circleRef}
      type="submit"
      disabled={isSending}
      className='w-[200px] h-[200px] rounded-full border border-white/10 flex items-center justify-center relative group bg-white/[0.02] backdrop-blur-md overflow-hidden transition-colors hover:border-[#C9F31D]'
    >
      {/* Liquid Ripple Effect */}
      <div className='absolute inset-0 bg-[#C9F31D] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0' />
      
      <span ref={textRef} className='relative z-10 text-[10px] font-black uppercase tracking-[0.6em] text-white group-hover:text-black transition-colors'>
        {isSending ? 'Sending' : 'Send'}
      </span>
    </button>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_URL,
        import.meta.env.VITE_TEMPLATE_KEY,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        toast.success("Design inquiry launched!", {
          style: { background: '#080808', color: '#C9F31D', border: '1px solid rgba(255,255,255,0.1)' }
        });
        formRef.current.reset();
        setIsSending(false);
      }, () => {
        toast.error('Something went wrong.');
        setIsSending(false);
      });
  };

  return (
    <section id='Contact' className='relative py-20 px-10 md:px-20 bg-[#080808] overflow-hidden min-h-screen flex flex-col items-center justify-center'>
      <Toaster position="bottom-center" />

      {/* Kinetic Watermark Backdrop */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.02] pointer-events-none select-none z-0'>
        <h2 className='text-[30vw] font-black tracking-[-0.05em] uppercase animate-watermark'>Talk</h2>
      </div>

      <div className='max-w-[1200px] w-full relative z-10 text-center'>
        <div className='mb-24 flex flex-col items-center'>
             <span className='text-[10px] uppercase font-black tracking-[0.8em] text-[#333] mb-10'>Get in Touch</span>
             <h3 className='text-[clamp(1.5rem,6vw,4.5rem)] font-bold text-[#F0EDE6] tracking-[0.2em] uppercase leading-none'>
                Start <span className='text-[#C9F31D]/40 italic'>New</span> <br /> Project
             </h3>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-start'>
          {/* Left Column: Direct info */}
          <div className='text-left space-y-16'>
            <div className='group cursor-pointer'>
              <p className='text-[9px] uppercase tracking-[0.5em] text-[#333] mb-4 font-bold'>Digital Home</p>
              <p className='text-xl md:text-2xl font-light text-[#888] tracking-widest leading-relaxed uppercase group-hover:text-white transition-colors'>
                Based in Bengaluru, India.<br />Working Globally.
              </p>
            </div>
            
            <div className='group cursor-pointer'>
              <p className='text-[9px] uppercase tracking-[0.5em] text-[#333] mb-4 font-bold'>The Reach</p>
              <a href="mailto:n758899@gmail.com" className='text-2xl md:text-3xl font-bold text-[#F0EDE6] block tracking-widest uppercase border-b border-white/5 pb-2 hover:border-[#C9F31D] transition-all'>
                n758899@gmail.com
              </a>
            </div>

            <div className='flex gap-8 pt-10'>
              {['LinkedIn', 'GitHub', 'Behance'].map(social => (
                <a key={social} href="#" className='text-[9px] uppercase tracking-[0.4em] font-black text-[#333] hover:text-[#C9F31D] transition-colors'>{social}</a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <form ref={formRef} onSubmit={sendEmail} className='space-y-12'>
            <div className='group relative border-b border-white/5 transition-colors focus-within:border-[#C9F31D]'>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="NAME"
                className='w-full bg-transparent py-6 text-lg md:text-xl font-medium text-[#F0EDE6] placeholder:text-[#333] outline-none tracking-widest uppercase transition-all focus:pl-4' 
              />
            </div>
            <div className='group relative border-b border-white/5 transition-colors focus-within:border-[#C9F31D]'>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="EMAIL"
                className='w-full bg-transparent py-6 text-lg md:text-xl font-medium text-[#F0EDE6] placeholder:text-[#333] outline-none tracking-widest uppercase transition-all focus:pl-4' 
              />
            </div>
            <div className='group relative border-b border-white/5 transition-colors focus-within:border-[#C9F31D]'>
              <textarea 
                name="message" 
                required 
                placeholder="TELL ME ABOUT THE PROJECT"
                rows={4}
                className='w-full bg-transparent py-6 text-lg md:text-xl font-medium text-[#F0EDE6] placeholder:text-[#333] outline-none tracking-widest uppercase resize-none transition-all focus:pl-4' 
              />
            </div>

            <div className='pt-10 flex justify-center lg:justify-end'>
              <MagneticSubmit isSending={isSending} />
            </div>
          </form>
        </div>

        <footer className='mt-60 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-10'>
          <p className='text-[8px] uppercase tracking-[0.5em] font-black'>Aesthetic Maturity Rooted in Code</p>
          <p className='text-[8px] uppercase tracking-[0.5em] font-black'>2024 • Crafting Excellence</p>
        </footer>
      </div>

      <style>{`
        @keyframes watermark {
          0% { transform: translateY(-5%) rotate(0deg); }
          50% { transform: translateY(5%) rotate(2deg); }
          100% { transform: translateY(-5%) rotate(0deg); }
        }
        .animate-watermark {
          animation: watermark 20s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;
