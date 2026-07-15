import { motion } from 'motion/react';

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
  
  const { t } = useTranslation();
  const localizedExperiences = experiences.map((exp, i) => ({
    ...exp,
    role: t(`experience.items.${i}.role`, exp.role),
    company: t(`experience.items.${i}.company`, exp.company),
    duration: t(`experience.items.${i}.duration`, exp.duration),
    description: exp.description.map((desc, j) => t(`experience.items.${i}.description.${j}`, desc))
  }));

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">03.</span> {t('experience.title', 'Experience')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 mt-8 space-y-12">
            {localizedExperiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-10"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-teal-500 dark:border-teal-400"></div>
                
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-teal-400 dark:hover:border-teal-500/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <div className="text-lg text-teal-600 dark:text-teal-400 font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <span className="font-mono text-sm text-slate-500 flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-full w-fit">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Briefcase className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <ul className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg list-disc pl-5 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
