import { useState } from 'react';
import { Map, MapPin, Loader2, Search } from 'lucide-react';
import Markdown from 'react-markdown';

export function MapAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    setPlaces([]);

    try {
      // Pass coordinates for Bhubaneswar
      const res = await fetch('/api/gemini/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: query,
          lat: 20.296059,
          lng: 85.824539
        })
      });

      const data = await res.json();
      if (data.response) {
        setResponse(data.response);
        setPlaces(data.places || []);
      } else {
        setResponse('Sorry, I could not find anything.');
      }
    } catch (error) {
      console.error(error);
      setResponse('Error connecting to the Maps AI assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20 transition-colors">
          <Map className="w-5 h-5" />
        </div>
        <h4 className="text-md font-semibold text-slate-900 dark:text-white flex-1">
          Explore Bhubaneswar with AI
        </h4>
      </div>
      
      {isOpen && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Ask for local recommendations, travel times, or places near my location!
          </p>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Best coffee shops nearby?"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1.5 p-1 rounded-md bg-indigo-500 text-white disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            </button>
          </form>

          {response && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-300">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{response}</Markdown>
              </div>
              
              {places.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">Locations Found:</h5>
                  <ul className="space-y-2">
                    {places.map((place, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <a 
                          href={place.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {place.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
