import { site } from '../config/site.js';
export default function Footer() {
  return (
    <footer><div className="wrap">
      <span>© {new Date().getFullYear()} {site.fullName} · Swarm effect: <a href="https://github.com/imperfec-t/swarmline" target="_blank" rel="noopener noreferrer">Swarmline</a> (MIT)</span>
      <a href="#top" className="btn sm">Back to top</a>
    </div></footer>
  );
}
