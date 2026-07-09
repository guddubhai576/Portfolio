import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi there! I am Pratik's AI Assistant. Ask me anything about his skills, experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg shadow-teal-500/20 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-500/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Pratik's AI</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-100 dark:bg-slate-800' : 'bg-teal-100 dark:bg-teal-500/20'}`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-tr-sm' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-teal-100 dark:bg-teal-500/20">
                    <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills or experience..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-colors text-slate-900 dark:text-white text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-teal-500 hover:text-teal-600 disabled:opacity-50 disabled:hover:text-teal-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
