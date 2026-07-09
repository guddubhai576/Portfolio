import { motion } from 'motion/react';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Deepfake Analysis using CNN",
    description: "Deep learning model utilizing MobileNetV2 and CNN architectures to accurately detect and classify manipulated media.",
    tech: ["Python", "TensorFlow", "CNN", "MobileNetV2"],
    github: "https://github.com/pratik04032"
  },
  {
    title: "AI Resume Analyzer",
    description: "Interactive application that parses resumes, analyzes skill sets, and generates custom portfolio dashboards.",
    tech: ["Python", "Streamlit", "HTML/CSS"],
    github: "https://github.com/pratik04032"
  },
  {
    title: "Blood Bank Management System",
    description: "Structured management system featuring dedicated modules for Donors, Inventory, and Admin controls.",
    tech: ["Web Tech", "DB Management", "SQL"],
    github: "https://github.com/pratik04032"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative bg-slate-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4">
            <span className="text-teal-400 font-mono text-xl">04.</span> Featured Projects
            <div className="h-px bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col h-full hover:-translate-y-2 hover:border-teal-500/50 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <div className="flex gap-3 text-slate-400">
                    <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold text-slate-200 mb-3 group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-800/50">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs font-mono text-slate-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
