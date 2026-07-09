import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "Data Analyst",
    company: "Bluestock.in",
    duration: "Present",
    description: "Real-world data analysis, reporting, and insight generation to drive business decisions."
  },
  {
    role: "Intern – Frontend Development",
    company: "Cognifyz Technologies",
    duration: "Past",
    description: "Frontend development using HTML/CSS/React, built Power BI dashboards, and developed C/C++ utilities."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4">
            <span className="text-teal-400 font-mono text-xl">03.</span> Experience
            <div className="h-px bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                  <div className="hidden md:block col-span-1 pt-1 text-slate-500 font-mono text-sm text-right">
                    {exp.duration}
                  </div>
                  
                  <div className="md:col-span-4 relative border-l-2 border-slate-800 pl-8 pb-8 md:border-l-0 md:pl-0 md:pb-0 md:border-l-2 md:border-slate-800 md:pl-8">
                    <div className="absolute -left-[9px] md:-left-[9px] top-1 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                    </div>
                    
                    <div className="md:hidden text-teal-400 font-mono text-sm mb-2">
                      {exp.duration}
                    </div>

                    <h3 className="text-xl font-display font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-slate-400 mb-4">{exp.company}</p>
                    <p className="text-slate-400 leading-relaxed">
                      {exp.description}
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
