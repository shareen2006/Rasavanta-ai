import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  ChefHat, 
  Utensils, 
  Flame,
  Check,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StepByStepCookingMode = ({ 
  recipe, 
  onClose,
  initialStep = 0 
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(initialStep);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [checkedStepIngredients, setCheckedStepIngredients] = useState({});

  const containerRef = useRef(null);

  const instructions = recipe?.instructions || [
    { step: 1, title: 'Preparation & Mise en Place', text: 'Wash, chop and arrange all ingredients neatly.', timerSeconds: 60 },
    { step: 2, title: 'Tempering & Blooming Spices', text: 'Heat oil in pan and sauté cumin seeds until fragrant.', timerSeconds: 30 }
  ];

  const currentStep = instructions[currentStepIdx] || instructions[0];
  const progressPercent = Math.round(((currentStepIdx + 1) / instructions.length) * 100);

  // Sync step timer
  useEffect(() => {
    setTimerSeconds(currentStep.timerSeconds || 30);
    setTimerRunning(false);
    setCheckedStepIngredients({});

    // Read step if speech synthesis is active
    if (isSpeaking && 'speechSynthesis' in window) {
      speakStepText();
    }
  }, [currentStepIdx]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            playTimerAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextStep();
      } else if (e.key === 'ArrowLeft') {
        goToPrevStep();
      } else if (e.key === ' ') {
        e.preventDefault();
        setTimerRunning((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIdx, instructions.length]);

  const goToNextStep = () => {
    if (currentStepIdx < instructions.length - 1) {
      setCurrentStepIdx((idx) => idx + 1);
    } else {
      triggerConfetti();
    }
  };

  const goToPrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((idx) => idx - 1);
    }
  };

  // Web Speech API Voice Assist
  const speakStepText = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak = `${currentStep.title}. ${currentStep.text}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Pleasant timer chime
  const playTimerAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // Audio fallback silent
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedStepIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Filter relevant ingredients for this step if mentioned, otherwise show all
  const stepText = (currentStep.text || '').toLowerCase();
  const relevantIngredients = (recipe?.ingredients || []).filter((ing) => {
    const name = (typeof ing === 'string' ? ing : ing.name).toLowerCase();
    return stepText.includes(name) || stepText.includes(name.split(' ')[0]);
  });
  const displayIngredients = relevantIngredients.length > 0 ? relevantIngredients : (recipe?.ingredients || []).slice(0, 5);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl bg-[#131A15] border-2 border-[#D99A38]/50 shadow-card-hover text-white transition-all duration-300 ${
        isFullScreen ? 'fixed inset-0 z-50 rounded-none border-0' : 'w-full'
      }`}
    >
      {/* ── TOP HEADER: PROGRESS & IMMERSIVE CONTROLS ─────────────────── */}
      <div className="bg-[#18221C] border-b border-white/10 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#244B39] text-[#D99A38] border border-[#D99A38]/30 shadow-sm">
            <ChefHat className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D99A38] uppercase tracking-wider">
                Immersive Cooking Mode
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70">
                Step {currentStepIdx + 1} of {instructions.length} ({progressPercent}%)
              </span>
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white">
              {recipe?.title || 'Artisanal Recipe'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Assist Button */}
          {'speechSynthesis' in window && (
            <button
              type="button"
              onClick={isSpeaking ? stopSpeaking : speakStepText}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                isSpeaking 
                  ? 'bg-[#D97556] text-white animate-pulse' 
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-[#D99A38]" />}
              <span>{isSpeaking ? 'Stop Reading' : 'Voice Assist'}</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D99A38] to-[#244B39]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── MAIN INSTRUCTION THEATER ─────────────────────────────────── */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
        {/* Left Column: Big Step Instructional Visual */}
        <div className="lg:col-span-5 relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-inner">
          <img
            src={recipe?.image || '/images/recipes/paneer-butter-masala.jpg'}
            alt={currentStep.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/rasavanta-recipe-placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Floating Technique Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-[#244B39]/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-[#D99A38]/30">
              <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
              <span>Step {currentStep.step || currentStepIdx + 1} Action</span>
            </span>

            <span className="text-[11px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
              {currentStep.timerSeconds ? `${currentStep.timerSeconds}s estimated` : 'Continuous'}
            </span>
          </div>
        </div>

        {/* Right Column: Step Text, Timer & Ingredients Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A38] flex items-center gap-1.5">
              <span>Instructional Technique</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Check ingredients as you add</span>
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {currentStep.title}
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans pt-1">
              {currentStep.text}
            </p>
          </div>

          {/* Cooking Timer Box */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#244B39] text-[#D99A38] border border-[#D99A38]/30 text-lg font-bold font-mono">
                {formatTimer(timerSeconds)}
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Step Cooking Timer
                </h4>
                <p className="text-[11px] text-[#A7B99A]">
                  {timerRunning ? 'Timer active — stay attentive' : 'Tap start when beginning this step'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                  timerRunning
                    ? 'bg-[#D97556] text-white hover:bg-[#c46447]'
                    : 'bg-[#D99A38] text-[#131A15] hover:bg-[#e0a94e]'
                }`}
              >
                {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                <span>{timerRunning ? 'Pause Timer' : 'Start Timer'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(currentStep.timerSeconds || 30);
                }}
                title="Reset Timer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active Step Ingredients Checklist */}
          {displayIngredients.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
                <Utensils className="h-3.5 w-3.5 text-[#D99A38]" />
                <span>Ingredients for this step:</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {displayIngredients.map((ing, idx) => {
                  const rawName = typeof ing === 'string' ? ing : ing.name;
                  const isChecked = checkedStepIngredients[idx];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleIngredientCheck(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                        isChecked
                          ? 'bg-[#244B39] border-[#D99A38]/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                        isChecked ? 'bg-[#D99A38] border-[#D99A38] text-[#131A15]' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                      <span>{ing.quantity ? `${ing.quantity} ${ing.unit || ''}` : ''} {rawName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM CONTROLS & STEP NAVIGATION BAR ───────────────────── */}
      <div className="bg-[#18221C] border-t border-white/10 p-5 flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={currentStepIdx === 0}
          onClick={goToPrevStep}
          className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Step</span>
        </button>

        <div className="text-center hidden sm:block">
          <span className="text-xs text-white/60">
            Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">→</kbd> keys • <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">Space</kbd> to toggle timer
          </span>
        </div>

        {currentStepIdx < instructions.length - 1 ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="flex items-center gap-1.5 rounded-xl bg-[#244B39] border border-[#D99A38]/40 px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1a382a] shadow-md transition"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={triggerConfetti}
            className="flex items-center gap-1.5 rounded-xl bg-[#D99A38] px-5 py-2.5 text-xs font-bold text-[#131A15] hover:bg-[#e0a94e] shadow-md transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>Finish Cooking 🎉</span>
          </button>
        )}
      </div>
    </div>
  );
};
