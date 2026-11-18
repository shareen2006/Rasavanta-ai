import { useLocation, useNavigate } from 'react-router-dom';
import { Bot, Sparkles, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingRasaBotLauncher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on the dedicated RasaBot page itself and auth pages
  const isExcluded = 
    location.pathname === '/rasabot' || 
    location.pathname === '/login' || 
    location.pathname === '/register';

  if (isExcluded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => navigate('/rasabot')}
        aria-label="Open RasaBot AI Culinary Assistant"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#244B39] pl-4 pr-5 py-3 text-white shadow-xl shadow-[#244B39]/30 hover:bg-[#1B382B] transition-all duration-300 border border-[#D99A38]/40 cursor-pointer"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#D99A38]/20 animate-pulse -z-10" />

        {/* Bot Icon with glowing spark */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F2] text-[#244B39]">
          <Bot className="h-4 w-4" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-[#D99A38]" />
        </div>

        {/* Text Label */}
        <div className="text-left">
          <div className="text-xs font-bold leading-none flex items-center gap-1">
            <span>RasaBot AI</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] text-[#A7B99A] font-medium leading-none block mt-0.5">
            Text & Voice Chef
          </span>
        </div>

        {/* Quick Mic Icon */}
        <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#D99A38] text-white transition-colors">
          <Mic className="h-3 w-3" />
        </div>
      </motion.button>
    </div>
  );
};
