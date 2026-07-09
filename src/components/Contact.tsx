import { motion } from 'motion/react';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-teal-600 dark:text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">
            05. What's Next?
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            I'm currently seeking internships, full-time Data Analyst / Frontend Developer roles, freelance opportunities, and open-source collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a 
            href="mailto:pratikkumarjena04@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-mono font-medium text-teal-600 dark:text-teal-400 bg-transparent border border-teal-600 dark:border-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-400/10 transition-colors"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}
