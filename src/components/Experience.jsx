import { experience } from '../data/experience.js';
import { Reveal } from '../motion.jsx';
export default function Experience() {
  return (
    <section id="experience"><div className="wrap">
      <p className="eyebrow">Experience &amp; education</p>
      <div className="head"><h2>Timeline<em>.</em></h2></div>
      <Reveal>{experience.map((e, i) => (
        <details key={e.t} open={i === 0}>
          <summary><span className="d">{e.d}</span><h3>{e.t}<small>{e.o}</small></h3></summary>
          <ul>{e.p.map(x => <li key={x}>{x}</li>)}</ul>
        </details>))}
      </Reveal>
    </div></section>
  );
}
