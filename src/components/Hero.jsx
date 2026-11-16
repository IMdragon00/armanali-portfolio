import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '../config/site.js';
import { Reveal, useMotionPref, EASE } from '../motion.jsx';
export default function Hero() {
  const { on } = useMotionPref();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, on ? 70 : 0]);
  return (
    <section id="top">
      <svg className="bgword" viewBox="0 0 7836 1760" aria-hidden="true" focusable="false">
        <defs><linearGradient id="bgw" x1="0" y1="0" x2="0" y2="1"><stop offset=".15" stopColor="#c3121f" /><stop offset="1" stopColor="#c3121f" stopOpacity=".12" /></linearGradient></defs>
        <text x="0" y="1760" fontFamily="Anton, Impact, sans-serif" fontSize="2048" textLength="7836" lengthAdjust="spacingAndGlyphs" fill="url(#bgw)">PORTFOLIO</text>
      </svg>
      <div className="topline">
        <span><b>{site.roleTop[0]}</b><br />{site.roleTop[1]}</span>
        <span><i className="dot" style={{ width: 6, height: 6, marginRight: 8 }} />{site.availability}</span>
      </div>
      <div className="hero">
        <div className="copy">
          <Reveal><p className="hello">Hello, I’m</p></Reveal>
          <Reveal as="h1" className="name" delay={0.08}><i id="nm">{site.first}</i><span id="ln2">{site.last}</span></Reveal>
          <Reveal delay={0.14}><p className="role">{site.profession}</p></Reveal>
          <Reveal delay={0.2}>
            <p className="lead">{site.headline.split(/(?<=\.)\s/)[0]}</p>
            <div className="cta"><a className="btn pri" href="#work">See my work ↓</a></div>
            <p className="loc">⌖ {site.location}</p>
          </Reveal>
        </div>
        <Reveal as="aside" className="stats" delay={0.3} aria-label="Highlights">
          <p className="tag">Every detail.<br />A purpose.</p>
          <div id="met">{site.metrics.map(m => <div key={m.l}><b>{m.v}</b><span>{m.l}</span></div>)}</div>
        </Reveal>
        <div className="portrait">
          <motion.img src={site.portrait} width="720" height="720" alt={site.portraitAlt} fetchPriority="high"
            style={{ y }} initial={on ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1, ease: EASE }} />
        </div>
      </div>
      <div className="bot"><div className="wrap">
        <a href="#work"><b>View featured build</b></a><a href="#work">Scroll to discover ↓</a><span>Selected work / 2025–2026</span>
      </div></div>
    </section>
  );
}
