import { motion } from 'motion/react';
import { Calendar, Clock, Mail, Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { googleSignIn, getAccessToken, initAuth } from '../lib/firebase';
import { User } from 'firebase/auth';

export function Contact() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => setUser(user),
      () => setUser(null)
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');
    
    const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
    if (startDateTime < new Date()) {
      setStatusMsg('Please select a date and time in the future.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      let token = await getAccessToken();
      if (!token) {
        setStatusMsg('Please sign in with Google to schedule the meeting...');
        const result = await googleSignIn();
        if (result) {
          token = result.accessToken;
          setUser(result.user);
        } else {
          throw new Error('Authentication failed');
        }
      }

      const confirmed = window.confirm(
        `Are you sure you want to schedule this meeting on your Google Calendar and create a Google Sheet for notes?`
      );
      
      if (!confirmed) {
        setIsSubmitting(false);
        setStatusMsg('');
        return;
      }

      setStatusMsg('Creating Meeting Notes in Google Sheets...');
      
      // 1. Create a Google Sheet
      const sheetResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            title: `Interview/Meeting Notes: ${formData.name}`
          }
        })
      });
      
      if (!sheetResponse.ok) {
        throw new Error('Failed to create Google Sheet');
      }
      
      const sheetData = await sheetResponse.json();
      const sheetUrl = sheetData.spreadsheetUrl;

      setStatusMsg('Scheduling Google Meet in Calendar...');
      
      // 2. Create Calendar Event with Meet Link
      const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

      const event = {
        summary: `Interview/Meeting: ${formData.name} & Pratik Kumar Jena`,
        description: `${formData.message}\n\nMeeting Notes Sheet: ${sheetUrl}`,
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
        attendees: [
          { email: formData.email },
          { email: 'pratikkumarjena9@gmail.com' } // Portfolio Owner
        ],
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(7),
            conferenceSolutionKey: { type: "hangoutsMeet" }
          }
        }
      };

      const calResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!calResponse.ok) {
        throw new Error('Failed to create Calendar Event');
      }

      const calData = await calResponse.json();
      const meetLink = calData.hangoutLink;

      setStatusMsg(`Meeting successfully scheduled! Meet Link: ${meetLink}`);
      setFormData({ name: '', email: '', date: '', time: '', message: '' });
      
      setTimeout(() => setStatusMsg(''), 10000);
      
    } catch (error) {
      console.error(error);
      setStatusMsg('An error occurred while scheduling. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                <label htmlFor="date" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Proposed Date
                </label>
                <div className="relative">
                  <div 
                    className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer z-10"
                    onClick={() => {
                      try {
                        dateInputRef.current?.showPicker();
                      } catch (e) {
                        dateInputRef.current?.focus();
                      }
                    }}
                  >
                    <Calendar className="w-5 h-5 text-teal-500 hover:text-teal-600 transition-colors" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    ref={dateInputRef}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Proposed Time
                </label>
                <div className="relative">
                  <div 
                    className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer z-10"
                    onClick={() => {
                      try {
                        timeInputRef.current?.showPicker();
                      } catch (e) {
                        timeInputRef.current?.focus();
                      }
                    }}
                  >
                    <Clock className="w-5 h-5 text-teal-500 hover:text-teal-600 transition-colors" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    ref={timeInputRef}
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
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

            <div className="pt-4 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 dark:bg-teal-500 dark:hover:bg-teal-400 dark:disabled:bg-teal-500/50 text-white dark:text-slate-950 font-medium rounded-lg transition-colors shadow-lg shadow-teal-500/20"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? 'Processing...' : 'Schedule Meeting'}
              </button>
              
              {statusMsg && (
                <div className="text-sm font-medium text-teal-600 dark:text-teal-400 text-center animate-pulse">
                  {statusMsg}
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
