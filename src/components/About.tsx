import { motion } from 'motion/react';
import { BookOpen, Code, TerminalSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">01.</span> {t('about.title', 'About Me')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-slate-700 dark:text-slate-400 leading-relaxed">
              <p>
                I am an aspiring <strong className="text-slate-900 dark:text-slate-200">Data Analyst & Frontend Developer</strong> with hands-on internship experience delivering operational efficiency through data and code.
              </p>
              <p>
                Currently, I'm pursuing my B.Tech in Computer Science and Engineering, specializing in <strong className="text-slate-900 dark:text-slate-200">AI & Machine Learning</strong> at Trident Academy of Technology (Class of 2026).
              </p>
              <p>
                I'm passionate about uncovering insights hidden in data and turning them into decisions that matter. I believe every dataset tells a story, and I enjoy being the one who tells it clearly. My current focus is sharpening SQL, Power BI, and Python skills, while closing gaps in CI/CD pipelines and RAG-based LLM workflows.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-4">Quick Facts</h3>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-teal-100 dark:bg-teal-500/10 rounded-lg text-teal-600 dark:text-teal-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-200 font-medium">Education</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">B.Tech CSE (AI & ML), Trident Academy of Technology (2026)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-200 font-medium">Frontend & Web</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Experience building UIs with React, HTML5, CSS3</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
                  <TerminalSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-200 font-medium">Data & AI</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Machine Learning models using Python, TensorFlow, Pandas</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
