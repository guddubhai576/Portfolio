import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const educationList = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    specialization: "AI & Machine Learning",
    institution: "Trident Academy of Technology, Bhubaneswar",
    duration: "Graduated 2026",
    description: "Graduated with a B.Tech in Computer Science and Engineering, specializing in Artificial Intelligence & Machine Learning. Built data-driven projects and actively participated in technical events to strengthen practical and problem-solving skills."
  }
];

export function Education() {
  const { t } = useTranslation();
  return (
    <section id="education" className="py-24 px-6 relative bg-slate-100/50 dark:bg-slate-900/20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">04.</span> {t('education.title', 'Education')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="space-y-12">
            {educationList.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                  <div className="hidden md:block col-span-1 pt-1 text-slate-400 dark:text-slate-500 font-mono text-sm text-right">
                    {edu.duration}
                  </div>
                  
                  <div className="md:col-span-4 relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 pb-8 md:border-l-0 md:pl-0 md:pb-0 md:border-l-2 md:border-slate-200 md:dark:border-slate-800 md:pl-8">
                    <div className="absolute -left-[9px] md:-left-[9px] top-1 w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-500/20 border border-teal-500 dark:border-teal-400 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-teal-500 dark:bg-teal-400 rounded-full" />
                    </div>
                    
                    <div className="md:hidden text-teal-600 dark:text-teal-400 font-mono text-sm mb-2">
                      {edu.duration}
                    </div>

                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    {edu.specialization && (
                      <p className="text-teal-600 dark:text-teal-400 font-medium mb-1">Specialization in {edu.specialization}</p>
                    )}
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{edu.institution}</p>
                    <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
