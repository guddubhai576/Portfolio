import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-teal-500/30 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
