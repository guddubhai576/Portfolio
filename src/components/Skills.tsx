import { motion } from 'motion/react';

const skillCategories = [
  {
    title: "Languages & Querying",
    skills: ["Python", "SQL", "C/C++", "HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Analytics & Machine Learning",
    skills: ["Pandas", "NumPy", "TensorFlow", "Power BI", "Scikit-Learn"]
  },
  {
    title: "Visualization & Frameworks",
    skills: ["React", "Streamlit", "Matplotlib", "Tailwind CSS", "Git"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative bg-slate-900/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4">
            <span className="text-teal-400 font-mono text-xl">02.</span> Tech Stack
            <div className="h-px bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors"
              >
                <h3 className="text-lg font-display font-semibold text-white mb-6 text-center">{category.title}</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 bg-slate-800/50 text-slate-300 text-sm font-medium rounded-md border border-slate-700/50"
                    >
                      {skill}
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
