import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Play, Menu, X, ArrowUpRight } from 'lucide-react';
import { useMotionPref } from '../motion.jsx';
import { startSwarm } from '../swarm.js';
export default function Header({ sections }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { on, toggle } = useMotionPref();
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  return (
    <header>
      <div className="wrap bar">
        <a className="logo" href="#top" aria-label="Arman Ali, back to top">ARMAN<b>.</b></a>
        <nav id="nav" className={open ? 'open' : ''} aria-label="Main">
          <ul>{sections.map(s => (
            <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'on' : ''} onClick={() => setOpen(false)}>{s.label}</a></li>
          ))}</ul>
        </nav>
        <div className="tools">
          <button className="btn sm" type="button" onClick={startSwarm} title="Watch a swarm of cursors build this page (Esc to exit)"><Play size={14} aria-hidden="true" />&nbsp;Motion</button>
          <button className="btn sm" type="button" aria-pressed={on} onClick={toggle} title="Turn page animations on or off">FX: {on ? 'on' : 'off'}</button>
          <a className="btn sm hide-s" href="#contact">Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button id="menu" className="btn sm" type="button" aria-expanded={open} aria-controls="nav" aria-label="Menu" onClick={() => setOpen(o => !o)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <motion.div id="prog" style={{ scaleX: sx }} />
    </header>
  );
}
