import { useState } from 'react';
import { site } from '../config/site.js';
import { Reveal } from '../motion.jsx';
const labels = { linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram' };
export default function Contact() {
  const [st, setSt] = useState('');
  const submit = e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const n = (d.get('n') || '').trim(), em = (d.get('e') || '').trim(), m = (d.get('m') || '').trim();
    if (!n || !m || !/^\S+@\S+\.\S+$/.test(em)) { setSt('Please fill in your name, a valid email and a message.'); return; }
    location.href = `mailto:${site.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + n)}&body=${encodeURIComponent(`${m}\n\n${n} (${em})`)}`;
    setSt('Opening your email app. The message is only sent once you press send there.');
  };
  return (
    <section id="contact"><div className="wrap cols">
      <Reveal>
        <p className="eyebrow">Contact</p><h2>Let’s<br />talk<em>.</em></h2>
        <p style={{ color: '#d6d2ce', maxWidth: '40ch' }}>Have a project, a collaboration or a role in mind? Write me a few lines.</p>
        <div className="links">
          <a className="btn" href={`mailto:${site.email}`}>{site.email}</a>
          {Object.entries(site.social).filter(([, v]) => v).map(([k, v]) => <a key={k} className="btn" target="_blank" rel="noopener noreferrer" href={v}>{labels[k]}</a>)}
        </div>
      </Reveal>
      <Reveal as="form" delay={0.1} onSubmit={submit} noValidate>
        <label>Name<input name="n" autoComplete="name" required /></label>
        <label>Email<input name="e" type="email" autoComplete="email" required /></label>
        <label>Message<textarea name="m" rows="5" required /></label>
        <button className="btn pri" type="submit">Open in my email app</button>
        <p id="st" role="status">{st}</p>
      </Reveal>
    </div></section>
  );
}
