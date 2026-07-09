import { motion } from 'motion/react';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Portfolio Analytics Dashboard",
    description: "Architect and deliver a production-grade, fully customisable portfolio analytics dashboard \u2013 replicating the sophistication of institutional platforms like Bloomberg Terminal.",
    tech: ["React", "Analytics", "Frontend"],
    github: "https://github.com/pratik04032/Project-1C-Front-End-Developer-Portfolio-Analytics-Dashboard",
    demo: "https://project-1-c-front-end-developer-por.vercel.app"
  },
  {
    title: "Real-Time Stock Screener",
    description: "Design, build, and deliver a production-grade real-time stock screener application \u2013 a direct competitor to Screener.in and Finviz.",
    tech: ["React", "Finance", "Frontend"],
    github: "https://github.com/pratik04032/Project-1A-Front-End-Developer-Real-Time-Stock-Screener",
    demo: "https://project-1-a-front-end-developer-rea-alpha.vercel.app"
  },
  {
    title: "Positive Quote Generator",
    description: "A positive quote is a short yet powerful statement that inspires optimism, boosts confidence, and uplifts the spirit.",
    tech: ["Web Tech", "API", "Frontend"],
    github: "https://github.com/pratik04032/positive-quote",
    demo: "https://positive-quote.vercel.app"
  },
  {
    title: "Multi-Step Loan Form",
    description: "Build a production-grade, 8+ step multi-step loan application form with real-time validation, conditional field rendering, and document upload.",
    tech: ["Frontend", "Forms", "Validation"],
    github: "https://github.com/pratik04032/Project-1B-Front-End-Developer-Multi-Step-Loan-Application-Form",
    demo: null
  },
  {
    title: "Deepfake Analysis using CNN",
    description: "Deep learning model utilizing MobileNetV2 and CNN architectures to accurately detect and classify manipulated media.",
    tech: ["Python", "TensorFlow", "CNN", "MobileNetV2"],
    github: "https://github.com/pratik04032/mobilenetv2-project",
    demo: null
  },
  {
    title: "AI Resume Analyzer",
    description: "Interactive application that parses resumes, analyzes skill sets, and generates custom portfolio dashboards.",
    tech: ["Python", "Streamlit", "HTML/CSS"],
    github: "https://github.com/pratik04032",
    demo: null
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative bg-slate-100/50 dark:bg-slate-900/20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">06.</span> Featured Projects
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full hover:-translate-y-2 hover:border-teal-400 dark:hover:border-teal-500/50 transition-all duration-300 group shadow-sm dark:shadow-none"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-slate-200 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs font-mono text-slate-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
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
