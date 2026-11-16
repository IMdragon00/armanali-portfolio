import { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { site } from './config/site.js';
export const EASE = [0.22, 1, 0.36, 1];
const Ctx = createContext({ on: true, toggle() {} });
export const useMotionPref = () => useContext(Ctx);
export function MotionProvider({ children }) {
  const [on, setOn] = useState(() => {
    try { const v = localStorage.getItem(site.storageKey); if (v !== null) return v === '1'; } catch {}
    return !matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    document.documentElement.dataset.motion = on ? 'on' : 'off';
    try { localStorage.setItem(site.storageKey, on ? '1' : '0'); } catch {}
  }, [on]);
  return <Ctx.Provider value={{ on, toggle: () => setOn(v => !v) }}>{children}</Ctx.Provider>;
}
export function Reveal({ as = 'div', delay = 0, y = 32, children, ...p }) {
  const { on } = useMotionPref();
  const M = motion[as];
  return (
    <M initial={on ? { opacity: 0, y } : false} whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: EASE }} {...p}>{children}</M>
  );
}
