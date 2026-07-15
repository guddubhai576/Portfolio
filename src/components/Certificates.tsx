import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';

const certificates = [
  {
    title: "Master Data Science Program",
    issuer: "GUVI",
    date: "April 2026",
  },
  {
    title: "Micro Python for Beginners",
    issuer: "NIELIT, CALICUT",
    date: "Completed",
  },
  {
    title: "Artificial Intelligence: Types of Artificial Intelligence",
    issuer: "Infosys Springboard",
    date: "Completed",
  },
  {
    title: "Artificial Intelligence Beginner's Guide",
    issuer: "Infosys Springboard",
    date: "Completed",
  },
  {
    title: "Prompt Engineering for Everyone",
    issuer: "Cognitive Classes",
    date: "Completed",
  },
  {
    title: "IBM SkillsNetwork AI0117EN",
    issuer: "Cognitive Class",
    date: "Completed",
  },
  {
    title: "Data Science Methodologies",
    issuer: "Cognitive Class",
    date: "Completed",
  },
  {
    title: "Full Stack Development Internship",
    issuer: "Edureka",
    date: "Completed",
  },
  {
    title: "Front-End Development Internship",
    issuer: "Cognifyz Technologies",
    date: "Completed",
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "TCS iON",
    date: "Completed",
  },
  {
    title: "Introduction to Soft Skills",
    issuer: "TCS iON",
    date: "Completed",
  },
  {
    title: "Master Data Management",
    issuer: "TCS iON",
    date: "Completed",
  },
  {
    title: "MongoDB Basics",
    issuer: "MongoDB University",
    date: "Completed",
  },
  {
    title: "Golang (Intermediate)",
    issuer: "HackerRank",
    date: "Completed",
  },
  {
    title: "Java (Basic)",
    issuer: "HackerRank",
    date: "Completed",
  },
  {
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "Completed",
  },
  {
    title: "CSS (Basic)",
    issuer: "HackerRank",
    date: "Completed",
  },
  {
    title: "Introduction to AI & ML",
    issuer: "Great Learning",
    date: "Completed",
  },
  {
    title: "Introduction to SQL",
    issuer: "Great Learning",
    date: "Completed",
  },
  {
    title: "Introduction to HTML",
    issuer: "Great Learning",
    date: "Completed",
  },
  {
    title: "Java Programming for Beginners",
    issuer: "Great Learning",
    date: "Completed",
  },
  {
    title: "Mobile App Development",
    issuer: "Great Learning",
    date: "Completed",
  },
  {
    title: "Maruti Suzuki Certification",
    issuer: "Maruti Suzuki",
    date: "Completed",
  },
  {
    title: "HP Life Certification",
    issuer: "HP Life",
    date: "Completed",
  },
  {
    title: "Machine Learning with Python",
    issuer: "Cognitive Class",
    date: "Completed",
  },
  {
    title: "Large Language Models",
    issuer: "Cognitive Class",
    date: "Completed",
  }
];

export function Certificates() {
  const { t } = useTranslation();
  const localizedCertificates = certificates.map((cert, i) => ({
    ...cert,
    title: t(`certificates.items.${i}.title`, cert.title),
    issuer: t(`certificates.items.${i}.issuer`, cert.issuer),
    date: t(`certificates.items.${i}.date`, cert.date)
  }));
  return (
    <section id="certificates" className="py-24 px-6 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-4">
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xl">05.</span> {t('certificates.title', 'Certificates')}
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4"></div>
          </h2>

          <div className="grid gap-6">
            {localizedCertificates.map((cert, idx) => (
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
        </ScrollReveal>
      </div>
    </section>
  );
}
