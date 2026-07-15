import { motion } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('nav.About', 'About'), href: '#about' },
    { name: t('nav.Skills', 'Skills'), href: '#skills' },
    { name: t('nav.Experience', 'Experience'), href: '#experience' },
    { name: t('nav.Education', 'Education'), href: '#education' },
    { name: t('nav.Certificates', 'Certificates'), href: '#certificates' },
    { name: t('nav.Projects', 'Projects'), href: '#projects' },
    { name: t('nav.Contact', 'Contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const toggleLanguage = () => {
    const nextLang: Record<string, string> = {
      en: 'es',
      es: 'hi',
      hi: 'en'
    };
    const currentLang = i18n.language || 'en';
    i18n.changeLanguage(nextLang[currentLang] || 'en');
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 ${
        isScrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <a href="#home" className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">
          PKJ<span className="text-teal-500 dark:text-teal-400">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{i18n.language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center overflow-hidden"
              aria-label="Toggle theme"
            >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 90 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="w-5 h-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="w-5 h-5" />
            </motion.div>
            <div className="w-5 h-5 opacity-0" />
          </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            aria-label="Toggle language"
          >
            <Languages className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">{i18n.language}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 90 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="w-5 h-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="w-5 h-5" />
            </motion.div>
            <div className="w-5 h-5 opacity-0" />
          </button>
          <button 
            className="text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 py-4 px-6 flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
