import { motion } from 'motion/react';
import { Award } from 'lucide-react';

const certificates = [
  {
    title: "Certified Data Science Professional",
    issuer: "Certification Provider",
    date: "Completed",
  }
];

export function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">05.</span> Certificates
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid gap-6">
            {certificates.map((cert, idx) => (
              <motion.div 
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-6 shadow-sm dark:shadow-none hover:border-teal-400 dark:hover:border-teal-500/50 transition-colors"
              >
                <div className="p-4 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{cert.issuer}</span>
                    <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <span className="font-mono">{cert.date}</span>
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
