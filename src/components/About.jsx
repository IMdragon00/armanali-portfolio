import { site } from '../config/site.js';
import { Reveal } from '../motion.jsx';
export default function About() {
  return (
    <section id="about"><div className="wrap cols">
      <Reveal><p className="eyebrow">About</p><h2>Who I<br />am<em>.</em></h2></Reveal>
      <Reveal delay={0.1}>
        {[...site.headline.split(/(?<=\.)\s/).slice(1), site.intro, ...site.about].map(p => <p key={p}>{p}</p>)}
        <h3 className="sub">Skills</h3><ul className="tags">{site.skills.map(s => <li key={s}>{s}</li>)}</ul>
        <h3 className="sub">Languages</h3><ul className="tags">{site.languages.map(s => <li key={s}>{s}</li>)}</ul>
      </Reveal>
    </div></section>
  );
}
