import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';

const experiences = [
  {
    role: "Data Analyst",
    company: "BLUESTOCK.in",
    duration: "April 2026 - May 2026",
    description: [
      "Real-world data analysis, reporting, and insight generation to drive business decisions."
    ]
  },
  {
    role: "Power BI Developer",
    company: "Cognifyz Technologies",
    duration: "Jun 2025 - August 2025",
    description: [
      "Performed data exploration and statistical analysis using Power BI to derive key insights from investment datasets.",
      "Developed interactive dashboards incorporating KPIs, charts, and filters for enhanced data visualization.",
      "Conducted gender-based and objective-driven analysis to identify investment trends and user behavior patterns.",
      "Analyzed investment duration, frequency, and decision factors to uncover actionable insights.",
      "Visualized sources of financial information and investment motivations using dynamic reports.",
      "Designed a comprehensive Power BI dashboard integrating all analytical findings with user-friendly interactivity.",
      "Documented insights and presented results through professional reports and LinkedIn project showcases."
    ]
  },
  {
    role: "Front-end Developer",
    company: "Cognifyz Technologies",
    duration: "August 2024 - September 2024",
    description: [
      "Developed a responsive and interactive website using HTML, CSS, and JavaScript as part of structured internship tasks.",
      "Built foundational web pages with proper HTML structure, including semantic elements, images, and content layout.",
      "Applied styling techniques using inline CSS, external stylesheets, and media queries for responsive design across devices.",
      "Implemented interactive UI features such as dynamic buttons and DOM manipulation using JavaScript.",
      "Integrated external APIs to fetch and display real-time data dynamically on web pages.",
      "Designed and validated user-friendly forms with client-side validation to enhance user experience and data integrity.",
      "Utilized Bootstrap framework for component-based design and improved UI consistency.",
      "Explored CSS preprocessing using Sass to improve code maintainability and styling efficiency.",
      "Showcased project outcomes through LinkedIn posts and professional project demonstrations."
    ]
  },
  {
    role: "C/C++ Developer",
    company: "Cognifyz Technologies",
    duration: "Jan 2024 - Feb 2024",
    description: [
      "Developed multiple console-based applications using C/C++ to strengthen programming fundamentals and problem-solving skills.",
      "Implemented string manipulation programs including string reversal and palindrome checker.",
      "Built logic-based applications such as Fibonacci series generator and number guessing game using loops and conditionals.",
      "Designed a calculator program supporting arithmetic operations with user input handling.",
      "Performed file handling operations by creating a file copy utility program.",
      "Developed array-based solutions including sorting algorithms (bubble/selection sort) and grade calculator systems.",
      "Created interactive programs like Rock-Paper-Scissors and simple inventory management system using structured programming concepts.",
      "Applied concepts of arrays, pointers, functions, and control structures to write efficient and modular code.",
      "Documented and demonstrated project outputs through structured submissions and LinkedIn showcases."
    ]
  }
];

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
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
                    <ul className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg list-disc pl-5 space-y-2">
                      {experiences[activeIdx].description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
