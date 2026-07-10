import { motion } from 'motion/react';
import { Calendar, Clock, Mail, Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { googleSignIn, getAccessToken, initAuth } from '../lib/firebase';
import { User } from 'firebase/auth';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import DatePicker from 'react-datepicker';

export function Contact() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  interface ScheduledInterview {
    id: string;
    type: 'custom' | 'calendly';
    date: string;
    time: string;
    name?: string;
    email?: string;
    meetLink?: string;
  }

  const [bookingMethod, setBookingMethod] = useState<'custom' | 'calendly' | 'gmail'>('custom');
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
  const [localInterviews, setLocalInterviews] = useState<ScheduledInterview[]>([]);
  
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => setUser(user),
      () => setUser(null)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('scheduled_interviews');
    if (saved) {
      try {
        setLocalInterviews(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log('Calendly Event Scheduled:', e);
      const today = new Date();
      const eventDetails: ScheduledInterview = {
        id: Date.now().toString(),
        type: 'calendly',
        date: today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: 'Interview via Calendly',
        email: 'Check your Calendly dashboard'
      };

      setLocalInterviews(prev => {
        const updated = [eventDetails, ...prev];
        localStorage.setItem('scheduled_interviews', JSON.stringify(updated));
        return updated;
      });

      setStatusMsg("🎉 Your interview has been successfully scheduled on Calendly! Pratik will be notified.");
      setTimeout(() => setStatusMsg(''), 15000);
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');
    
    const [day, month, year] = formData.date.split('/');
    const startDateTime = new Date(`${year}-${month}-${day}T${formData.time}:00`);
    if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
      setStatusMsg('Please select a valid date and time in the future (DD/MM/YYYY).');
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
      const [eventDay, eventMonth, eventYear] = formData.date.split('/');
      const eventStartDateTime = new Date(`${eventYear}-${eventMonth}-${eventDay}T${formData.time}:00`);
      const endDateTime = new Date(eventStartDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

      const event = {
        summary: `Interview/Meeting: ${formData.name} & Pratik Kumar Jena`,
        description: `${formData.message}\n\nMeeting Notes Sheet: ${sheetUrl}`,
        start: { dateTime: eventStartDateTime.toISOString() },
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

      const eventDetails: ScheduledInterview = {
        id: Date.now().toString(),
        type: 'custom',
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
        meetLink: meetLink || ''
      };

      setLocalInterviews(prev => {
        const updated = [eventDetails, ...prev];
        localStorage.setItem('scheduled_interviews', JSON.stringify(updated));
        return updated;
      });

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

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');

    try {
      let token = await getAccessToken();
      if (!token) {
        setStatusMsg('Please sign in with Google to send an email...');
        const result = await googleSignIn();
        if (result) {
          token = result.accessToken;
          setUser(result.user);
        } else {
          throw new Error('Authentication failed');
        }
      }

      setStatusMsg('Sending email...');

      const subject = `Message from ${formData.name} via Portfolio`;
      const emailContent = `To: pratikkumarjena9@gmail.com\r\n` +
        `Subject: ${subject}\r\n` +
        `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
        `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`;

      const encodedMessage = btoa(unescape(encodeURIComponent(emailContent))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodedMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatusMsg('Email sent successfully! Pratik will get back to you soon.');
      setFormData({ ...formData, message: '', name: '', email: '' });
      setTimeout(() => setStatusMsg(''), 10000);

    } catch (error) {
      console.error(error);
      setStatusMsg('An error occurred while sending the email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    
    if (name === 'date') {
      // Only allow digits and format as DD/MM/YYYY
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
      if (cleaned.length > 4) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
      }
      value = formatted;
    }

    setFormData({ ...formData, [name]: value });
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
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            I'm currently seeking internships, full-time Data Analyst / Frontend Developer roles, freelance opportunities, and open-source collaborations. Use the form below to schedule an interview or just say hi!
          </p>

          <div className="flex justify-center gap-4 mb-10">
            <a
              href="mailto:pratikkumarjena9@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-colors bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm"
            >
              <Mail className="w-5 h-5" />
              Email Me Directly
            </a>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-full sm:w-auto mb-2 sm:mb-0">
              Or schedule a meeting:
            </span>
            <button
              onClick={() => setBookingMethod('custom')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${bookingMethod === 'custom' ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              Custom Booking
            </button>
            <button
              onClick={() => setBookingMethod('calendly')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${bookingMethod === 'calendly' ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              Calendly
            </button>
            <button
              onClick={() => setBookingMethod('gmail')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${bookingMethod === 'gmail' ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              Send an Email
            </button>
          </div>
        </motion.div>

        {/* Scheduled Interviews Status Panel */}
        {localInterviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 p-6 rounded-2xl shadow-sm"
          >
            <div className="flex justify-between items-center mb-4 border-b border-teal-500/10 pb-3">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-teal-500" />
                Your Scheduled Interviews & Sessions
              </h4>
              <button
                onClick={() => {
                  setLocalInterviews([]);
                  localStorage.removeItem('scheduled_interviews');
                }}
                className="text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {localInterviews.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${item.type === 'calendly' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400'}`}>
                        {item.type === 'calendly' ? 'Calendly' : 'Custom Booking'}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {item.name || 'Interview Session'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 truncate">
                      {item.email}
                    </p>
                    <div className="space-y-1.5 border-t border-slate-50 dark:border-slate-900 pt-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Calendar className="w-4 h-4 text-teal-500 shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  {item.meetLink && (
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block text-center text-xs py-2 bg-teal-50 hover:bg-teal-100 dark:bg-teal-500/10 dark:hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 font-semibold rounded-lg transition-colors border border-teal-100 dark:border-teal-500/20"
                    >
                      Join Google Meet
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {bookingMethod === 'custom' ? (
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
                    <Calendar className="w-5 h-5 text-teal-500 transition-colors" />
                  </div>
                  <DatePicker
                    wrapperClassName="w-full"
                    selected={
                      formData.date.length === 10
                        ? new Date(
                            parseInt(formData.date.substring(6, 10)),
                            parseInt(formData.date.substring(3, 5)) - 1,
                            parseInt(formData.date.substring(0, 2))
                          )
                        : null
                    }
                    onChange={(date: Date | null) => {
                      if (date) {
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const year = date.getFullYear();
                        setFormData({ ...formData, date: `${day}/${month}/${year}` });
                      }
                    }}
                    minDate={new Date(2026, 0, 1)}
                    maxDate={new Date(2026, 11, 31)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <input
                        type="text"
                        id="date"
                        name="date"
                        required
                        pattern="\d{2}/\d{2}/\d{4}"
                        placeholder="DD/MM/YYYY"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                      />
                    }
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
          ) : bookingMethod === 'gmail' ? (
          <form onSubmit={handleSendEmail} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm dark:shadow-none space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <label htmlFor="gmail_name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
              <input
                type="text"
                id="gmail_name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gmail_email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Email</label>
              <input
                type="email"
                id="gmail_email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white"
                placeholder="john@company.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gmail_message" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-teal-500" />
                Message
              </label>
              <textarea
                id="gmail_message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white resize-none"
                placeholder="What would you like to discuss?"
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
                {isSubmitting ? 'Sending...' : 'Send via Gmail'}
              </button>
              
              {statusMsg && (
                <div className="text-sm font-medium text-teal-600 dark:text-teal-400 text-center animate-pulse">
                  {statusMsg}
                </div>
              )}
            </div>
          </form>
          ) : (
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-2 sm:p-4 rounded-2xl shadow-sm dark:shadow-none min-h-[700px]">
              <InlineWidget url="https://calendly.com/pratikkumarjena9/interview" styles={{ height: '700px' }} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
