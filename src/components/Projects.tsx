import { motion } from 'motion/react';
import { FolderGit2, ExternalLink, Github, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { useMemo } from 'react';

const projects = [
  {
    title: "Portfolio Analytics Dashboard",
    description: "Architect and deliver a production-grade, fully customisable portfolio analytics dashboard – replicating the sophistication of institutional platforms like Bloomberg Terminal.",
    tech: ["React", "Analytics", "Frontend"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032/Project-1C-Front-End-Developer-Portfolio-Analytics-Dashboard",
    demo: "https://project-1-c-front-end-developer-por.vercel.app"
  },
  {
    title: "Real-Time Stock Screener",
    description: "Design, build, and deliver a production-grade real-time stock screener application – a direct competitor to Screener.in and Finviz.",
    tech: ["React", "Finance", "Frontend"],
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032/Project-1A-Front-End-Developer-Real-Time-Stock-Screener",
    demo: "https://project-1-a-front-end-developer-rea-alpha.vercel.app"
  },
  {
    title: "Positive Quote Generator",
    description: "A positive quote is a short yet powerful statement that inspires optimism, boosts confidence, and uplifts the spirit.",
    tech: ["Web Tech", "API", "Frontend"],
    image: "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032/positive-quote",
    demo: "https://positive-quote.vercel.app"
  },
  {
    title: "Multi-Step Loan Form",
    description: "Build a production-grade, 8+ step multi-step loan application form with real-time validation, conditional field rendering, and document upload.",
    tech: ["Frontend", "Forms", "Validation"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032/Project-1B-Front-End-Developer-Multi-Step-Loan-Application-Form",
    demo: null
  },
  {
    title: "Deepfake Analysis using CNN",
    description: "Deep learning model utilizing MobileNetV2 and CNN architectures to accurately detect and classify manipulated media.",
    tech: ["Python", "TensorFlow", "CNN", "MobileNetV2"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032/mobilenetv2-project",
    demo: null
  },
  {
    title: "AI Resume Analyzer",
    description: "Interactive application that parses resumes, analyzes skill sets, and generates custom portfolio dashboards.",
    tech: ["Python", "Streamlit", "HTML/CSS"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    github: "https://github.com/pratik04032",
    demo: null
  }
];

export function Projects() {
  const techData = useMemo(() => {
    const techDistribution: Record<string, number> = {};
    projects.forEach(project => {
      project.tech.forEach(tech => {
        techDistribution[tech] = (techDistribution[tech] || 0) + 1;
      });
    });
    return Object.entries(techDistribution)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const COLORS = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'];

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:border-teal-400 dark:hover:border-teal-500/50 transition-all duration-300 group shadow-sm dark:shadow-none"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-700/50 text-teal-600 dark:text-teal-400 rounded-xl">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-slate-200 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/50 text-xs font-mono text-slate-600 dark:text-slate-400">
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
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white">
                Tech Stack Distribution
              </h3>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={techData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={{ stroke: '#cbd5e1', opacity: 0.2 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickCount={5}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#f8fafc',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: '#2dd4bf' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {techData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
