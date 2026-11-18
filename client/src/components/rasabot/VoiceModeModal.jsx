import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Volume2, 
  VolumeX, 
  Square, 
  Sparkles, 
  Globe, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { speechService, SPEECH_LANG_MAP } from '../../services/speechService';
import { rasabotService } from '../../services/rasabotService';

const VOICE_LANGUAGES = [
  { code: 'en', label: 'English (India)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
];

export const VoiceModeModal = ({
  isOpen,
  onClose,
  currentLanguage = 'en',
  onMessageSent,
  history = [],
}) => {
  const [voiceState, setVoiceState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [selectedLang, setSelectedLang] = useState(currentLanguage);
  const [transcript, setTranscript] = useState('');
  const [aiSpeechCaption, setAiSpeechCaption] = useState('');
  const [permissionError, setPermissionError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      speechService.stopListening();
      speechService.cancelSpeech();
    };
  }, []);

  // Sync language with parent if updated
  useEffect(() => {
    setSelectedLang(currentLanguage);
  }, [currentLanguage]);

  // When modal opens, auto-start listening
  useEffect(() => {
    if (isOpen) {
      setPermissionError(null);
      startVoiceListening();
    } else {
      speechService.stopListening();
      speechService.cancelSpeech();
      setVoiceState('idle');
    }
  }, [isOpen, selectedLang]);

  const startVoiceListening = () => {
    if (isMuted) return;

    speechService.cancelSpeech();
    setTranscript('');
    setPermissionError(null);
    setVoiceState('listening');

    const started = speechService.startListening({
      lang: selectedLang,
      onPartial: (text) => {
        if (isMounted.current) setTranscript(text);
      },
      onResult: (finalText) => {
        if (!isMounted.current || !finalText.trim()) return;
        setTranscript(finalText);
        handleUserSpokenMessage(finalText);
      },
      onError: (err) => {
        if (!isMounted.current) return;
        console.warn('Speech Error:', err);
        if (err.error === 'not-allowed' || err.error === 'permission-denied') {
          setPermissionError('Microphone permission was denied. Please allow microphone access in your browser settings.');
        } else if (err.error === 'no-speech') {
          // Timeout, restart listening gently
          setVoiceState('idle');
        } else {
          setPermissionError('Could not capture audio. Tap the microphone to retry.');
          setVoiceState('idle');
        }
      },
      onEnd: () => {
        // Will transition via callbacks
      }
    });

    if (!started && !speechService.isRecognitionSupported()) {
      setPermissionError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      setVoiceState('idle');
    }
  };

  const handleUserSpokenMessage = async (userText) => {
    setVoiceState('thinking');

    // Notify parent to add user message to conversation thread
    if (onMessageSent) {
      onMessageSent({ role: 'user', content: userText, timestamp: new Date().toISOString() });
    }

    try {
      const response = await rasabotService.sendMessage(userText, {
        language: selectedLang,
        history
      });

      if (!isMounted.current) return;

      const aiReply = response.reply || 'I am ready to help you cook.';
      setAiSpeechCaption(aiReply);

      // Add to conversation thread
      if (onMessageSent) {
        onMessageSent({
          role: 'assistant',
          content: aiReply,
          recipeCard: response.recipeCard,
          timestamp: new Date().toISOString()
        });
      }

      // Speak response aloud
      setVoiceState('speaking');
      speechService.speak(aiReply, {
        lang: selectedLang,
        onEnd: () => {
          if (!isMounted.current) return;
          // After finishing speaking, automatically resume listening for continuous conversation
          setVoiceState('idle');
          setTimeout(() => {
            if (isMounted.current && !isMuted) {
              startVoiceListening();
            }
          }, 800);
        },
        onError: () => {
          if (isMounted.current) setVoiceState('idle');
        }
      });
    } catch {
      if (isMounted.current) setVoiceState('idle');
    }
  };

  const handleInterrupt = () => {
    speechService.cancelSpeech();
    setVoiceState('idle');
    startVoiceListening();
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      startVoiceListening();
    } else {
      setIsMuted(true);
      speechService.stopListening();
      speechService.cancelSpeech();
      setVoiceState('idle');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F5F0E5]/95 backdrop-blur-md p-6 sm:p-10 select-none">
        
        {/* Top Control Bar */}
        <div className="mx-auto w-full max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif text-lg font-bold text-[#244B39]">
              RasaBot Live Voice Assistant
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-[#A7B99A]/40 text-xs font-semibold text-[#244B39] shadow-xs">
              <Globe className="h-3.5 w-3.5 text-[#D99A38]" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                {VOICE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white p-2 text-[#566459] hover:text-[#303A32] shadow-xs hover:bg-[#FAF8F2] transition"
              aria-label="Exit Voice Mode"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Center Stage: Glowing Orb & Reactive Audio Waveform */}
        <div className="mx-auto flex flex-col items-center justify-center my-auto max-w-2xl text-center space-y-6">
          
          {/* Animated Central Glowing Orb */}
          <div className="relative flex items-center justify-center">
            {/* Outer Pulsing Waves */}
            {voiceState === 'listening' && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute h-52 w-52 rounded-full bg-[#244B39]/20"
                />
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute h-44 w-44 rounded-full bg-[#D99A38]/30"
                />
              </>
            )}

            {voiceState === 'speaking' && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute h-48 w-48 rounded-full bg-[#D99A38]/30"
              />
            )}

            {/* Core Interactive Mic Orb */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={voiceState === 'speaking' ? handleInterrupt : startVoiceListening}
              className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
                voiceState === 'listening'
                  ? 'bg-[#244B39] text-[#F5F0E5] ring-8 ring-[#244B39]/20 shadow-emerald-900/30'
                  : voiceState === 'thinking'
                  ? 'bg-[#D99A38] text-white ring-8 ring-[#D99A38]/30 shadow-amber-900/30'
                  : voiceState === 'speaking'
                  ? 'bg-[#D97556] text-white ring-8 ring-[#D97556]/30 shadow-orange-900/30'
                  : 'bg-white text-[#244B39] ring-4 ring-[#A7B99A]/30'
              }`}
            >
              {voiceState === 'thinking' ? (
                <Sparkles className="h-12 w-12 animate-spin text-white" />
              ) : voiceState === 'speaking' ? (
                <Volume2 className="h-12 w-12 text-white animate-pulse" />
              ) : isMuted ? (
                <MicOff className="h-12 w-12 text-[#D97556]" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </motion.button>
          </div>

          {/* Dynamic Audio Frequency Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-10">
            {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.9, 0.6, 0.4].map((height, i) => (
              <motion.div
                key={i}
                animate={
                  voiceState === 'listening' || voiceState === 'speaking'
                    ? {
                        scaleY: [height, 1.8 * height, height * 0.5, height],
                        opacity: [0.5, 1, 0.5],
                      }
                    : { scaleY: 0.3, opacity: 0.3 }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
                className={`w-1.5 rounded-full ${
                  voiceState === 'speaking'
                    ? 'bg-[#D97556]'
                    : voiceState === 'listening'
                    ? 'bg-[#244B39]'
                    : 'bg-[#A7B99A]'
                }`}
                style={{ height: '24px' }}
              />
            ))}
          </div>

          {/* State Status Text */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A38]">
              {voiceState === 'listening' && 'Listening to your kitchen query...'}
              {voiceState === 'thinking' && 'RasaBot is crafting culinary advice...'}
              {voiceState === 'speaking' && 'Speaking response aloud (Tap to interrupt)...'}
              {voiceState === 'idle' && (isMuted ? 'Microphone muted' : 'Tap microphone to speak')}
            </span>
          </div>

          {/* Live Transcription / Caption Box */}
          <div className="min-h-16 w-full max-w-lg rounded-2xl bg-white/80 p-4 border border-[#A7B99A]/30 text-xs sm:text-sm text-[#303A32] shadow-soft">
            {transcript ? (
              <p className="font-medium italic">"{transcript}"</p>
            ) : aiSpeechCaption ? (
              <p className="line-clamp-3 text-[#244B39] font-medium leading-relaxed">
                {aiSpeechCaption}
              </p>
            ) : (
              <p className="text-[#A7B99A]">
                Say something like: "What can I cook with paneer and tomatoes?" or "How to fix salty dal?"
              </p>
            )}
          </div>

          {/* Error Message */}
          {permissionError && (
            <div className="flex items-center gap-2 rounded-2xl bg-amber-50 p-3 border border-amber-300 text-xs text-amber-900 text-left">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>{permissionError}</span>
            </div>
          )}
        </div>

        {/* Bottom Action Controls */}
        <div className="mx-auto w-full max-w-md flex items-center justify-center gap-4">
          {/* Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold border transition shadow-xs ${
              isMuted
                ? 'bg-red-50 text-red-700 border-red-300'
                : 'bg-white text-[#303A32] border-[#A7B99A]/40 hover:bg-[#FAF8F2]'
            }`}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span>{isMuted ? 'Unmute' : 'Mute Mic'}</span>
          </button>

          {/* Interrupt Button (When Speaking) */}
          {voiceState === 'speaking' && (
            <button
              type="button"
              onClick={handleInterrupt}
              className="flex items-center gap-2 rounded-full bg-[#D97556] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#C26245] transition"
            >
              <Square className="h-4 w-4 fill-white" />
              <span>Interrupt AI</span>
            </button>
          )}

          {/* End Voice Mode */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#193527] transition"
          >
            <span>Back to Text Chat</span>
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};
