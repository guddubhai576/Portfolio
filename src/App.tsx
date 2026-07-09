import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-teal-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-800">
        <p>© {new Date().getFullYear()} Pratik Kumar Jena. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
