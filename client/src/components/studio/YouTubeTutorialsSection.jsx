import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Tv, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  ChefHat, 
  Clock, 
  CheckCircle2,
  Video
} from 'lucide-react';

export const YouTubeTutorialsSection = ({ recipe, tutorials = {} }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [activeVideoId, setActiveVideoId] = useState(null);

  const title = recipe?.title || 'Authentic Indian Recipe';

  // Fallback default videos if recipe has no embedded tutorials
  const defaultVideos = {
    en: [
      {
        id: '2a8S048QJv8',
        title: `${title} Masterclass | Chef Ranveer Brar`,
        channel: 'Chef Ranveer Brar',
        thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
        duration: '14:20',
        badge: 'Masterclass Guide',
        embedUrl: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(title + ' recipe')}`
      }
    ],
    hi: [
      {
        id: 'p7o01nBf8pU',
        title: `${title} रेसिपी हिंदी में | Master Chef Guide`,
        channel: 'bharatzkitchen HINDI',
        thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
        duration: '12:30',
        badge: 'हिंदी ट्यूटोरियल',
        embedUrl: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(title + ' recipe hindi')}`
      }
    ],
    te: [
      {
        id: 'uR4m69JjK00',
        title: `${title} తయారీ విధానం | Telugu Chef Video`,
        channel: 'Vismai Food',
        thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
        duration: '09:15',
        badge: 'తెలుగు వంటలు',
        embedUrl: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(title + ' recipe telugu')}`
      }
    ]
  };

  const videoPool = (tutorials && Object.keys(tutorials).length > 0) ? tutorials : defaultVideos;
  const currentVideos = videoPool[selectedLang] || videoPool['en'] || [];
  const activeVideo = currentVideos.find((v) => v.id === activeVideoId) || currentVideos[0];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  return (
    <div className="space-y-6">
      {/* ── HEADER & LANGUAGE SWITCHER ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A7B99A]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D97556] text-white shadow-sm">
              <Tv className="h-4 w-4" />
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#244B39]">
              Chef Video Masterclasses
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#566459] mt-1">
            Hand-curated step-by-step video tutorials from certified master chefs.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F2] border border-[#A7B99A]/30">
          {languages.map((lang) => {
            const isActive = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                  setActiveVideoId(null); // reset to top video of new language
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-[#244B39] text-white shadow-sm'
                    : 'text-[#566459] hover:text-[#244B39] hover:bg-white/60'
                }`}
              >
                <span>{lang.label}</span>
                <span className="text-[10px] opacity-75 font-normal">({lang.native})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN FEATURED VIDEO PLAYER ─────────────────────────────────── */}
      {activeVideo && (
        <div className="overflow-hidden rounded-3xl bg-black border border-[#D99A38]/30 shadow-card-hover">
          <div className="relative aspect-16/9 w-full bg-black">
            <iframe
              src={activeVideo.embedUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>

          {/* Active Video Info Bar */}
          <div className="p-4 sm:p-5 bg-[#18221C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-[#D97556] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {activeVideo.badge || 'Chef Guide'}
                </span>
                <span className="text-xs text-[#A7B99A]">
                  Channel: <strong className="text-white">{activeVideo.channel}</strong>
                </span>
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                {activeVideo.title}
              </h4>
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                title + ' ' + (selectedLang === 'te' ? 'telugu' : selectedLang === 'hi' ? 'hindi' : '') + ' recipe'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 px-3.5 py-2 text-xs font-semibold text-white/90 shrink-0 transition"
            >
              <span>More on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#D99A38]" />
            </a>
          </div>
        </div>
      )}

      {/* ── ADDITIONAL TUTORIAL CARDS (IF MULTIPLE AVAILABLE) ───────────── */}
      {currentVideos.length > 1 && (
        <div className="space-y-3 pt-2">
          <h4 className="font-serif text-sm font-bold text-[#244B39]">
            Alternative Video Demonstrations ({languages.find(l => l.code === selectedLang)?.label}):
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentVideos.map((vid, idx) => {
              const isSelected = vid.id === (activeVideoId || currentVideos[0]?.id);
              return (
                <button
                  key={vid.id || idx}
                  type="button"
                  onClick={() => setActiveVideoId(vid.id)}
                  className={`text-left rounded-2xl border p-3 flex gap-3 transition ${
                    isSelected
                      ? 'bg-white border-[#244B39] shadow-md ring-2 ring-[#244B39]/20'
                      : 'bg-white/70 border-[#A7B99A]/30 hover:bg-white hover:border-[#244B39]/40'
                  }`}
                >
                  <div className="relative aspect-16/10 w-24 shrink-0 overflow-hidden rounded-xl bg-black">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/rasavanta-recipe-placeholder.svg';
                      }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#D97556] uppercase tracking-wider block">
                      {vid.badge || 'Tutorial'}
                    </span>
                    <h5 className="font-serif font-bold text-xs text-[#244B39] line-clamp-2 mt-0.5">
                      {vid.title}
                    </h5>
                    <p className="text-[11px] text-[#566459] truncate mt-0.5">
                      {vid.channel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
