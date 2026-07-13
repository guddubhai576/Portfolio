import { ScrollReveal } from './ScrollReveal';
import { Github, Linkedin, Facebook, Instagram, Twitter, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.061-.301-.15-1.265-.462-2.406-1.474-.889-.788-1.488-1.761-1.663-2.062-.175-.3-.019-.462.131-.611.135-.136.301-.351.452-.524.152-.175.204-.298.303-.5.1-.197.051-.373-.024-.522-.076-.15-.673-1.62-.924-2.22-.243-.585-.487-.506-.673-.515-.175-.008-.375-.011-.575-.011-.199 0-.522.074-.796.371-.274.298-1.049 1.02-1.049 2.485 0 1.465 1.073 2.88 1.223 3.078.15.197 2.095 3.197 5.077 4.482.71.306 1.264.488 1.696.626.711.226 1.357.194 1.868.118.571-.085 1.767-.721 2.016-1.42.248-.696.248-1.294.174-1.42-.075-.124-.275-.198-.576-.348z" />
      <path d="M12 21.996h-.006c-1.579 0-3.13-.424-4.492-1.227l-.321-.19-3.342.876.893-3.258-.209-.33A9.957 9.957 0 012.006 12C2.006 6.486 6.488 2 12.004 2c2.671 0 5.178 1.042 7.062 2.926A9.948 9.948 0 0122 11.996c0 5.516-4.48 9.998-10 10z" />
    </svg>
  );
}

export function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisitor() {
      try {
        const statRef = doc(db, 'siteStats', 'global');
        
        const hasVisited = localStorage.getItem('has_visited');
        
        if (!hasVisited) {
          await setDoc(statRef, { visits: increment(1) }, { merge: true });
          localStorage.setItem('has_visited', 'true');
        }
        
        // Fetch current count after possible update
        const updatedSnap = await getDoc(statRef);
        if (updatedSnap.exists()) {
          setVisitorCount(updatedSnap.data().visits);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    }
    
    trackVisitor();
  }, []);

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <ScrollReveal className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
          <a 
            href="https://github.com/pratik04032" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/pratik-kumar-jena-1823b3242/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/pratikkumarjena04" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="https://instagram.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="https://wa.me/918456053237" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
        </div>
        <p className="text-slate-600 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} Pratik Kumar Jena. Built with React & Tailwind.
        </p>
        
        {visitorCount !== null && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Users className="w-4 h-4" />
            <span><span className="font-semibold text-slate-900 dark:text-white">{visitorCount.toLocaleString()}</span> visitors</span>
          </div>
        )}
        </ScrollReveal>
      </div>
    </footer>
  );
}
