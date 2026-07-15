import { ScrollReveal } from './ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Code, Database, Brain, Terminal, BarChart as ChartIcon, Layout, GitBranch, TerminalSquare, Laptop, LineChart, Server } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages & Querying",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "Python", level: 90, desc: "Advanced | 3+ Years", icon: <TerminalSquare className="w-5 h-5" /> },
      { name: "SQL", level: 85, desc: "Advanced | 2+ Years", icon: <Database className="w-5 h-5" /> },
      { name: "C/C++", level: 75, desc: "Intermediate | 2 Years", icon: <Terminal className="w-5 h-5" /> },
      { name: "HTML5", level: 95, desc: "Expert | 3+ Years", icon: <Layout className="w-5 h-5" /> },
      { name: "CSS3", level: 90, desc: "Advanced | 3+ Years", icon: <Layout className="w-5 h-5" /> },
      { name: "JavaScript", level: 85, desc: "Advanced | 2+ Years", icon: <Code className="w-5 h-5" /> }
    ]
  },
  {
    title: "Analytics & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    skills: [
      { name: "Pandas", level: 90, desc: "Advanced | Data Manipulation", icon: <Database className="w-5 h-5" /> },
      { name: "NumPy", level: 85, desc: "Advanced | Scientific Computing", icon: <TerminalSquare className="w-5 h-5" /> },
      { name: "TensorFlow", level: 70, desc: "Intermediate | Deep Learning", icon: <Brain className="w-5 h-5" /> },
      { name: "Power BI", level: 80, desc: "Advanced | Dashboards & Reports", icon: <ChartIcon className="w-5 h-5" /> },
      { name: "Scikit-Learn", level: 75, desc: "Intermediate | Classic ML", icon: <Brain className="w-5 h-5" /> }
    ]
  },
  {
    title: "Visualization & Frameworks",
    icon: <Laptop className="w-6 h-6" />,
    skills: [
      { name: "React", level: 80, desc: "Advanced | UI Development", icon: <Layout className="w-5 h-5" /> },
      { name: "Streamlit", level: 85, desc: "Advanced | Data Apps", icon: <Layout className="w-5 h-5" /> },
      { name: "Matplotlib", level: 90, desc: "Advanced | Static Plots", icon: <LineChart className="w-5 h-5" /> },
      { name: "Tailwind CSS", level: 85, desc: "Advanced | Styling", icon: <Layout className="w-5 h-5" /> },
      { name: "Git", level: 90, desc: "Advanced | Version Control", icon: <GitBranch className="w-5 h-5" /> }
    ]
  }
];

export function Skills() {
  const { t } = useTranslation();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 relative bg-slate-100/50 dark:bg-slate-900/20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-16 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">02.</span> {t('skills.title', 'Tech Stack')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="relative"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                      onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                    >
                      <button className={`w-full flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                        activeSkill === skill.name 
                          ? 'border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/20 shadow-sm' 
                          : 'border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 bg-slate-50 dark:bg-slate-900/50'
                      }`}>
                        <div className={`transition-colors duration-300 ${activeSkill === skill.name ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400'}`}>
                          {skill.icon}
                        </div>
                        <span className={`font-medium text-sm transition-colors duration-300 ${activeSkill === skill.name ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-300'}`}>
                          {skill.name}
                        </span>
                      </button>

                      <AnimatePresence>
                        {activeSkill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 z-10"
                          >
                            <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-4 rounded-xl shadow-xl relative">
                              <div className="font-semibold text-sm mb-1">{skill.name}</div>
                              <div className="text-xs text-slate-300 dark:text-slate-600 mb-3">{skill.desc}</div>
                              
                              <div className="w-full h-1.5 bg-slate-700 dark:bg-slate-200 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                  className="h-full bg-teal-400 dark:bg-teal-500 rounded-full"
                                />
                              </div>
                              <div className="text-[10px] font-mono mt-1.5 text-right text-slate-400 dark:text-slate-500">
                                Proficiency: {skill.level}%
                              </div>
                              
                              {/* Triangle pointer */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900 dark:border-t-slate-100" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
