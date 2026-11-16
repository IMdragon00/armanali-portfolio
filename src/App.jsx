import { MotionProvider } from './motion.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectGrid from './components/ProjectGrid.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { experience } from './data/experience.js';
const sections = [
  { id: 'work', label: 'Work' }, { id: 'about', label: 'About' },
  ...(experience.length ? [{ id: 'experience', label: 'Journey' }] : []),
  { id: 'contact', label: 'Contact' },
];
export default function App() {
  return (
    <MotionProvider>
      <a href="#main" className="skip">Skip to content</a>
      <Header sections={sections} />
      <main id="main"><Hero /><ProjectGrid /><About />{experience.length > 0 && <Experience />}<Contact /></main>
      <Footer />
    </MotionProvider>
  );
}
