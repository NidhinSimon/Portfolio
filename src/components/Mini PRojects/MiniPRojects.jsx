import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// ── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, num: '01', title: 'SidGolf', year: '2024', category: 'Golf Simulation',
    desc: 'Immersive golf simulation with physics-based ball trajectory, real-time score tracking, and silky GSAP animations.',
    img: './SidGolf.png', tech: ['GSAP', 'React'], stack: 'React + GSAP', type: 'Interactive', accent: '#C9F31D',
  },
  {
    id: 2, num: '02', title: 'Task Manager', year: '2023', category: 'Productivity',
    desc: 'Drag-and-drop task orchestration with real-time sync, team collaboration features, and Redux-powered state.',
    img: './Task.png', tech: ['Node', 'Redux'], stack: 'Node + Redux', type: 'SaaS', accent: '#FF6B6B',
  },
  {
    id: 3, num: '03', title: 'Expense Pro', year: '2024', category: 'Finance',
    desc: 'Visual expense intelligence with animated D3 charts, budget forecasting, and smart categorization.',
    img: './Expense.png', tech: ['React', 'Charts'], stack: 'React + D3', type: 'Dashboard', accent: '#6C63FF',
  },
  {
    id: 4, num: '04', title: 'Fixxit', year: '2024', category: 'Utility',
    desc: 'Geo-located home repair service platform with live technician tracking, booking flows, and MERN stack.',
    img: './Fixxit.png', tech: ['MERN', 'Maps'], stack: 'MERN + Maps', type: 'Marketplace', accent: '#00F3FF',
  },
  {
    id: 5, num: '05', title: 'Design Vault', year: '2023', category: 'Creative Tool',
    desc: 'A browser-based design archive with Canvas-powered rendering, CSS animations, and curated visual inspiration.',
    img: './99.png', tech: ['Canvas', 'CSS'], stack: 'Canvas + CSS', type: 'Tool', accent: '#FFB347',
  },
  {
    id: 6, num: '06', title: 'Watchifyy', year: '2024', category: 'Entertainment',
    desc: 'Curated streaming discovery app with TMDB integration, mood-based filtering, and beautiful watchlist UX.',
    img: './Watchifyy.png', tech: ['API', 'React'], stack: 'React + API', type: 'Consumer', accent: '#C9F31D',
  },
];

// ── Custom Cursor ────────────────────────────────────────────────────────────
const Cursor = ({ hovering, active }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(lerp);
    };
    lerp();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div style={{ opacity: active ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999, mixBlendMode: 'difference' }}>
      <div ref={dotRef} style={{
        position: 'fixed', width: hovering ? 0 : 8, height: hovering ? 0 : 8,
        background: '#fff', borderRadius: '50%', transform: 'translate(-50%,-50%)',
        transition: 'width .3s, height .3s', pointerEvents: 'none',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        width: hovering ? 80 : 40, height: hovering ? 80 : 40,
        border: `1px solid ${hovering ? 'rgba(200,240,37,0.9)' : 'rgba(255,255,255,0.4)'}`,
        borderRadius: '50%', transform: 'translate(-50%,-50%)',
        transition: 'width .35s, height .35s, border-color .3s, opacity .3s',
        opacity: hovering ? 1 : 0.7, pointerEvents: 'none',
      }} />
    </div>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{
    position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column',
    justifyContent: 'flex-end', padding: '60px', overflow: 'hidden', background: '#080808',
  }}>
    {/* Grid texture */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 1, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
      backgroundSize: '80px 80px',
    }} />
    {/* Orbs */}
    <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,240,37,.06) 0%,transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(108,99,255,.05) 0%,transparent 70%)', bottom: -50, left: 200, pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 32, height: 1, background: '#C9F31D' }} />
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)', fontWeight: 300 }}>
          Experimental Lab — 2023/24
        </span>
      </div>

      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(64px,11vw,160px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#e8e4dc', margin: 0 }}>
        Mini<br />
        <em style={{ fontStyle: 'italic', color: '#C9F31D' }}>Works</em><br />
        <span style={{ WebkitTextStroke: '1px rgba(232,228,220,0.2)', color: 'transparent' }}>Studio</span>
      </h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 48 }}>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, lineHeight: 1.8, color: 'rgba(232,228,220,0.35)', maxWidth: 280, fontWeight: 300, margin: 0 }}>
          Interaction prototypes & creative experiments at the edge of the MERN stack.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)' }}>
          <div style={{
            width: 40, height: 40, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'float 2.5s ease-in-out infinite',
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          Scroll to explore
        </div>
      </div>
    </div>
  </section>
);

// ── Count Bar ────────────────────────────────────────────────────────────────
const CountBar = ({ current, total, name }) => (
  <div style={{
    position: 'relative', background: '#0a0a0c',
    borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '14px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden',
    flexShrink: 0,
  }}>
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0,
      width: `${(current / (total - 1)) * 100}%`,
      background: 'rgba(200,240,37,0.04)', transition: 'width 0.3s ease-out',
    }} />
    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9F31D', position: 'relative' }}>{name}</span>
    <div style={{ display: 'flex', gap: 40, position: 'relative' }}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: i === current ? '#fff' : 'rgba(255,255,255,0.15)', transition: 'color 0.3s', fontWeight: 700 }}>
          {String(i + 1).padStart(2, '0')}
        </span>
      ))}
    </div>
    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)', position: 'relative' }}>
      {total} Projects
    </span>
  </div>
);

// ── Slide ────────────────────────────────────────────────────────────────────
const Slide = ({ project, isActive, onHover }) => {
  const { accent } = project;

  return (
    <div style={{ flex: '0 0 100vw', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>

      {/* Media */}
      <div
        style={{ position: 'relative', overflow: 'hidden', background: '#111' }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 1s cubic-bezier(.16,1,.3,1), filter .8s',
            filter: isActive ? 'grayscale(0) brightness(.85)' : 'grayscale(.7) brightness(.6)',
            transform: isActive ? 'scale(1)' : 'scale(1.05)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(7,7,10,.5) 0%,transparent 50%)' }} />

        {/* Slide num */}
        <span style={{ position: 'absolute', top: 40, left: 40, fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', zIndex: 2 }}>
          {project.num} / {String(PROJECTS.length).padStart(2, '0')}
        </span>

        {/* Status */}
        <div style={{ position: 'absolute', top: 40, right: 40, display: 'flex', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)' }}>Live</span>
        </div>

        {/* Tags */}
        <div style={{ position: 'absolute', bottom: 40, left: 40, display: 'flex', gap: 8, zIndex: 2 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
              padding: '6px 12px', border: `1px solid ${accent}4D`, borderRadius: 2,
              color: accent, background: `${accent}0F`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', padding: '80px 70px', background: '#0a0a0c', position: 'relative', overflow: 'hidden' }}>
        {/* Ghost number */}
        <span style={{
          position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
          fontFamily: "'Playfair Display',serif", fontSize: 240, fontWeight: 700,
          color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>{project.num}</span>

        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)', marginBottom: 24 }}>
          {project.year} — {project.category}
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display',serif", fontSize: 'clamp(42px,5vw,72px)', lineHeight: 1.05,
          letterSpacing: '-0.02em', margin: '0 0 24px',
          transform: isActive ? 'translateY(0)' : 'translateY(30px)',
          opacity: isActive ? 1 : 0,
          transition: 'transform .8s cubic-bezier(.16,1,.3,1), opacity .8s',
          color: '#e8e4dc',
        }}>
          {project.title.split('').map((char, i) => {
            const isLast = i >= project.title.length - Math.floor(project.title.length / 3);
            return <span key={i} style={isLast ? { fontStyle: 'italic', color: accent } : {}}>{char}</span>;
          })}
        </h2>

        <div style={{
          width: 48, height: 1, background: accent, marginBottom: 28,
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform .6s .3s cubic-bezier(.16,1,.3,1)',
        }} />

        <p style={{
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, lineHeight: 1.8, color: 'rgba(232,228,220,0.35)',
          maxWidth: 360, marginBottom: 40,
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          opacity: isActive ? 1 : 0,
          transition: 'transform .8s .15s cubic-bezier(.16,1,.3,1), opacity .8s .15s',
        }}>{project.desc}</p>

        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#e8e4dc', textDecoration: 'none', padding: '16px 28px',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2,
          width: 'fit-content',
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          opacity: isActive ? 1 : 0,
          transition: 'transform .8s .25s cubic-bezier(.16,1,.3,1), opacity .8s .25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#e8e4dc'; }}
        >
          View Project
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        {/* Meta footer */}
        <div style={{ position: 'absolute', bottom: 40, left: 70, right: 70, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          {[['Stack', project.stack], ['Type', project.type], ['Status', 'Live']].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>{label}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// ── Nav Bar ──────────────────────────────────────────────────────────────────
const NavBar = ({ current, total }) => (
  <div style={{ background: '#0a0a0c', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 48 : 24, height: 2,
          background: i === current ? '#C9F31D' : 'rgba(255,255,255,0.12)',
          transition: 'width .3s, background .3s',
        }} />
      ))}
    </div>
    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'rgba(232,228,220,0.35)', letterSpacing: '0.2em' }}>
      {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
    <div style={{ display: 'flex', gap: 16 }}>
      {[{ d: 'M19 12H5M12 5l-7 7 7-7' }, { d: 'M5 12h14M12 5l7 7-7 7' }].map(({ d }, i) => (
        <div key={i} style={{
          width: 48, height: 48, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
          color: '#e8e4dc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .3s, border-color .3s, color .3s',
          opacity: 0.2
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d={d} /></svg>
        </div>
      ))}
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const MiniProjects = () => {
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(false);
  
  const targetRef = useRef(null);

  // Hook into vertical scrolling
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // "start start" means when the top of target hits the top of viewport
    // "end end" means when the bottom of target hits the bottom of viewport
  });

  // Calculate horizontal translation based on scroll progress
  // Move from 0 to -(total - 1) * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(PROJECTS.length - 1) * 100}vw`]);

  // Update current slide index based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = PROJECTS.length;
    // Calculate the index (0 to total - 1)
    const index = Math.min(Math.round(latest * (total - 1)), total - 1);
    if (index !== current) {
      setCurrent(index);
    }
  });

  return (
    <div 
      id="MiniProjects" 
      style={{ position: 'relative', background: '#080808' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;500&family=Space+Mono&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
      `}</style>

      <Cursor hovering={hovering} active={active} />
      
      {/* Intro section, scrolls normally */}
      <Hero />

      {/* Sticky Scroll Section. The taller it is, the longer it takes to scroll horizontally. */}
      {/* 100vh per slide makes it feel natural */}
      <section ref={targetRef} style={{ height: `${PROJECTS.length * 100}vh`, position: 'relative' }}>
        
        {/* The pinned container */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <CountBar current={current} total={PROJECTS.length} name={PROJECTS[current].title} />

          {/* Horizontal track */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <motion.div
              style={{ display: 'flex', x, height: '100%', willChange: 'transform' }}
            >
              {PROJECTS.map((p, i) => (
                <Slide
                  key={p.id}
                  project={p}
                  isActive={i === current}
                  onHover={setHovering}
                />
              ))}
            </motion.div>
          </div>

          <NavBar current={current} total={PROJECTS.length} />
          
        </div>
      </section>
    </div>
  );
};

export default MiniProjects;