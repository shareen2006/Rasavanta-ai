import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUPPORTED_LANGUAGES } from '../../i18n';

export const LanguageSelector = ({ isMobile = false, isDark = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className={`inline-flex items-center justify-between gap-1.5 sm:gap-2 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
          isDark
            ? 'border border-white/15 bg-white/10 px-3 h-9 text-xs font-semibold text-white/90 hover:bg-white/15 hover:border-white/30 hover:text-white backdrop-blur-md shadow-xs'
            : 'border border-[#A7B99A]/50 bg-white/85 px-3.5 h-10 text-xs sm:text-sm font-semibold text-[#244B39] shadow-xs backdrop-blur-sm hover:border-[#244B39] hover:bg-white'
        } ${isMobile ? 'w-full py-2.5 px-4 text-base h-auto' : ''}`}
      >
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Globe className="h-3.5 w-3.5 text-[#D99A38]" />
          <span className="font-semibold tracking-wide">{currentLang.nativeName}</span>
          <span className={`text-[11px] hidden sm:inline ${isDark ? 'text-white/60' : 'text-[#566459]'}`}>({currentLang.name})</span>
        </span>
        <ChevronDown className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white/60' : 'text-[#566459]'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute right-0 z-50 mt-2 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 focus:outline-none backdrop-blur-md ${
              isMobile ? 'w-full left-0 right-0' : 'w-56'
            }`}
          >
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#566459] border-b border-[#F5F0E5]">
              Choose Language / భాష
            </div>
            <div className="py-1 max-h-72 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = i18n.language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#244B39] text-white font-semibold'
                        : 'text-[#303A32] hover:bg-[#F5F0E5] hover:text-[#244B39]'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-sm">{lang.nativeName}</span>
                      <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#566459]'}`}>
                        {lang.name}
                      </span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-[#D99A38]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
