import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

const titles = [
  "Data Analyst",
  "Frontend Developer",
  "AI & ML Enthusiast"
];

function TypeWriter() {
  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentTitle.substring(0, text.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setText(currentTitle.substring(0, text.length + 1));
      }, 100);
    }

    if (!isDeleting && text === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex]);

  return (
    <span className="inline-block min-w-[20px] font-mono text-teal-600 dark:text-teal-400">
      {text}<span className="animate-[pulse_1s_ease-in-out_infinite] font-light">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-teal-900/20 dark:via-slate-950 dark:to-slate-950 -z-10 transition-colors duration-300" />
      
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-teal-600 dark:text-teal-400 font-mono tracking-wide"
            >
              Hi, I'm
            </motion.p>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Pratik Kumar <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500">
                Jena
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg font-light leading-relaxed">
              <TypeWriter />
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed">
            I craft data-driven applications by specializing in data analysis, visualization, and machine learning.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <a 
              href="/resume.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-medium rounded-lg transition-colors shadow-lg shadow-teal-500/20"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            
            <div className="flex gap-4">
              <a href="https://github.com/pratik04032" target="_blank" rel="noreferrer" 
                 className="p-3 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white transition-colors ring-1 ring-slate-200 dark:ring-white/10 hover:ring-slate-300 dark:hover:ring-white/30 shadow-sm">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/pratik-kumar-jena-1823b3242/" target="_blank" rel="noreferrer"
                 className="p-3 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white transition-colors ring-1 ring-slate-200 dark:ring-white/10 hover:ring-slate-300 dark:hover:ring-white/30 shadow-sm">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:pratikkumarjena04@gmail.com"
                 className="p-3 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-white transition-colors ring-1 ring-slate-200 dark:ring-white/10 hover:ring-slate-300 dark:hover:ring-white/30 shadow-sm">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="aspect-square rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-blue-500/5 dark:from-teal-500/10 dark:to-blue-500/10" />
            <div className="w-full h-full border border-slate-300 dark:border-slate-700/50 rounded-full animate-[spin_60s_linear_infinite] relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-400 rounded-full blur-[2px]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full blur-[2px]" />
            </div>
            <div className="absolute w-3/4 h-3/4 border border-slate-300 dark:border-slate-700/50 rounded-full animate-[spin_40s_linear_infinite_reverse] relative">
               <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-teal-300 rounded-full blur-[1px]" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <a href="#about" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-white transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}
