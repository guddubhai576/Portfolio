import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const experiences = [
  {
    role: "Data Analyst",
    company: "Bluestock.in",
    duration: "Present",
    description: "Real-world data analysis, reporting, and insight generation to drive business decisions."
  },
  {
    role: "Intern – Frontend Development",
    company: "Cognifyz Technologies",
    duration: "Past",
    description: "Frontend development using HTML/CSS/React, built Power BI dashboards, and developed C/C++ utilities."
  }
];

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">03.</span> {t('experience.title', 'Experience')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Timeline Markers */}
            <div className="md:w-1/3 relative">
              <div className="absolute left-4 md:left-[0.95rem] top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800" />
              
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className="group relative flex items-start w-full text-left focus:outline-none"
                  >
                    <div className={`relative z-10 mt-1 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300 ${
                      activeIdx === idx 
                        ? 'border-teal-500 dark:border-teal-400' 
                        : 'border-slate-300 dark:border-slate-700 group-hover:border-teal-400 dark:group-hover:border-teal-500'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeIdx === idx ? 'bg-teal-500 dark:bg-teal-400 scale-100' : 'bg-transparent scale-0'
                      }`} />
                    </div>
                    <div className="ml-6 flex flex-col pt-1.5">
                      <span className={`font-display font-medium text-lg transition-colors duration-300 ${
                        activeIdx === idx ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}>
                        {exp.company}
                      </span>
                      <span className="font-mono text-sm text-slate-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Content */}
            <div className="md:w-2/3 relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                    {experiences[activeIdx].role}
                  </h3>
                  <div className="text-lg text-teal-600 dark:text-teal-400 mb-6 font-medium">
                    @ {experiences[activeIdx].company}
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Briefcase className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                      {experiences[activeIdx].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
