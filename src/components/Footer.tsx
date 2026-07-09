import { Github, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/pratik04032" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/pratik-kumar-jena-1823b3242/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://facebook.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="https://instagram.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        <p className="text-slate-600 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} Pratik Kumar Jena. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}
