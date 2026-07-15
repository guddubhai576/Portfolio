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
import { BackToTop } from './components/BackToTop';
import { SectionReveal } from './components/SectionReveal';

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const handleBeforePrint = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.dataset.wasDark = 'true';
        document.documentElement.classList.remove('dark');
      }
    };
    
    const handleAfterPrint = () => {
      if (document.documentElement.dataset.wasDark === 'true') {
        document.documentElement.classList.add('dark');
        delete document.documentElement.dataset.wasDark;
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-teal-500/30">
      <Navbar />
      <main>
        <SectionReveal><Hero /></SectionReveal>
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Education /></SectionReveal>
        <SectionReveal><Certificates /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <Footer />
      <AIAssistant />
      <BackToTop />
    </div>
  );
}
