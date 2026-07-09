import { motion } from 'motion/react';
import { Calendar, Clock, Mail, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Interview/Meeting Request from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProposed Date: ${formData.date}\nProposed Time: ${formData.time}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:pratikkumarjena04@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 px-6 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-teal-600 dark:text-teal-400 font-mono text-sm tracking-widest uppercase mb-4">
            07. What's Next?
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch & Schedule a Meeting
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I'm currently seeking internships, full-time Data Analyst / Frontend Developer roles, freelance opportunities, and open-source collaborations. Use the form below to schedule an interview or just say hi!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm dark:shadow-none space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-teal-500" />
                  Proposed Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-teal-500" />
                  Proposed Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-teal-500" />
                Message / Meeting Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white resize-none"
                placeholder="Please share any specific topics for our meeting, or link to a meeting invite..."
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 font-medium rounded-lg transition-colors shadow-lg shadow-teal-500/20"
              >
                <Send className="w-5 h-5" />
                Request Meeting
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
