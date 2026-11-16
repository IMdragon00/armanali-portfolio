import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, useMotionPref } from '../motion.jsx';
const ytId = u => (u || '').match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];
export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  const { on } = useMotionPref();
  useEffect(() => {
    if (!project) return;
    setPlay(false);
    const k = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = [...ref.current.querySelectorAll('a,button')];
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [project, onClose]);
  const id = project && ytId(project.videoUrl);
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal" onClick={e => e.target === e.currentTarget && onClose()}
          initial={on ? { opacity: 0 } : false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: on ? 0.25 : 0 }}>
          <motion.div className="mbox" ref={ref} role="dialog" aria-modal="true" aria-labelledby="dt"
            initial={on ? { y: 30, opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: on ? 0.4 : 0, ease: EASE }}>
            <p style={{ textAlign: 'right', margin: 0 }}><button className="btn sm" type="button" onClick={onClose}>Close</button></p>
            {id ? (play
              ? <iframe title={project.title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
              : <button className="btn" type="button" onClick={() => setPlay(true)}>Play video (loads YouTube)</button>)
              : project.coverImage && <img src={project.coverImage} alt="" />}
            <h3 id="dt" style={{ fontSize: '2.2rem', margin: '16px 0 8px' }}>{project.title}</h3>
            <p>{project.description || project.summary}</p>
            {project.role && <p><b>Role:</b> {project.role}</p>}
            {project.tools?.length > 0 && <ul className="tags">{project.tools.map(t => <li key={t}>{t}</li>)}</ul>}
            {project.liveUrl && <a className="btn pri" target="_blank" rel="noopener noreferrer" href={project.liveUrl}>Live site</a>}{' '}
            {project.sourceUrl && <a className="btn" target="_blank" rel="noopener noreferrer" href={project.sourceUrl}>Source</a>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
