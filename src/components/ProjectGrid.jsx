import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects.js';
import ProjectDialog from './ProjectDialog.jsx';
import { Reveal, EASE, useMotionPref } from '../motion.jsx';
const PAGE = 6;
export default function ProjectGrid() {
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [n, setN] = useState(PAGE), [sel, setSel] = useState(null);
  const opener = useRef(null);
  const { on } = useMotionPref();
  const cats = useMemo(() => ['All', ...new Set(projects.map(p => p.category).filter(Boolean))], []);
  const list = useMemo(() => projects
    .filter(p => (cat === 'All' || p.category === cat) && `${p.title} ${p.summary} ${(p.tools || []).join(' ')}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured)), [cat, q]);
  const close = useCallback(() => { setSel(null); opener.current?.focus(); }, []);
  return (
    <section id="work">
      <div className="wrap">
        <p className="eyebrow">Selected work</p>
        <div className="head"><h2>Work<em>.</em></h2></div>
        {!projects.length ? (
          <Reveal className="empty">
            <h3 style={{ fontSize: '2rem', marginBottom: 12 }}>Projects coming soon</h3>
            <p>I’m preparing my first case studies. Rather than showing placeholder work, this space stays honest until real projects are ready. If you’d like to collaborate on one, get in touch.</p>
            <a className="btn pri" href="#contact">Start a conversation</a>
          </Reveal>
        ) : (<>
          <div className="filters" role="group" aria-label="Filter projects">
            {cats.map(c => (
              <button key={c} className="chip" type="button" aria-pressed={c === cat} onClick={() => { setCat(c); setN(PAGE); }}>
                {c}{c === cat && <motion.span layoutId="u" className="u" />}
              </button>))}
            <input id="q" type="search" placeholder="Search projects" aria-label="Search projects" value={q} onChange={e => { setQ(e.target.value); setN(PAGE); }} />
          </div>
          {list.length ? (
            <div className="grid">{list.slice(0, n).map((p, i) => (
              <motion.div key={p.id} initial={on ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}>
                <button className="card" type="button" onClick={e => { opener.current = e.currentTarget; setSel(p); }}>
                  {p.coverImage && <img src={p.coverImage} alt="" loading="lazy" width="640" height="400" />}
                  <div><small>{p.category}{p.year ? ` · ${p.year}` : ''}</small><h3>{p.title}</h3><p>{p.summary}</p></div>
                </button>
              </motion.div>))}
            </div>
          ) : <p>No projects match your search.</p>}
          {list.length > n && <p style={{ textAlign: 'center', marginTop: 28 }}><button className="btn" type="button" onClick={() => setN(n + PAGE)}>Load more</button></p>}
        </>)}
      </div>
      <ProjectDialog project={sel} onClose={close} />
    </section>
  );
}
