import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { RadarChart } from './RadarChart';


const skillCategories = [
  {
    title: "Languages & Querying",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "C/C++", level: 75 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 85 }
    ]
  },
  {
    title: "Analytics & Machine Learning",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "TensorFlow", level: 70 },
      { name: "Power BI", level: 80 },
      { name: "Scikit-Learn", level: 75 }
    ]
  },
  {
    title: "Visualization & Frameworks",
    skills: [
      { name: "React", level: 80 },
      { name: "Streamlit", level: 85 },
      { name: "Matplotlib", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Git", level: 90 }
    ]
  }
];

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 px-6 relative bg-slate-100/50 dark:bg-slate-900/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">02.</span> {t('skills.title', 'Tech Stack')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none"
              >
                <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white mb-6 text-center">{category.title}</h3>
                <div className="flex items-center justify-center">
                  <RadarChart data={category.skills} size={250} />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
