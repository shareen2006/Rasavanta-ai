import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Clock, 
  Flame, 
  ChevronRight, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  Utensils
} from 'lucide-react';
import { motion } from 'framer-motion';
import { speechService } from '../../services/speechService';
import toast from 'react-hot-toast';

/**
 * Parses inline markdown styling (bold, italic, code) into React elements
 */
const parseInline = (text, isUser, keyPrefix = '') => {
  if (!text) return null;
  // Tokenize bold (**...**), italic (*...* or _..._), inline code (`...`)
  const tokens = text.split(/(\*\*.*?\*\*|\*[^*\n]+?\*|`[^`\n]+?`)/g);
  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={key} className={isUser ? 'font-bold text-white' : 'font-semibold text-[#18261E]'}>
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={key}
          className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] ${
            isUser ? 'bg-white/20 text-white' : 'bg-[#F5F0E5] text-[#244B39] border border-[#E5E0D5]'
          }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
};

/**
 * Sanitizes and renders multi-line markdown text into structured elements
 */
const renderFormattedContent = (content, isUser) => {
  if (!content) return null;
  const sanitized = String(content)
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<\/?svg[^>]*>/gi, '')
    .trim();

  const lines = sanitized.split('\n');
  const elements = [];
  let currentList = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                  isUser ? 'bg-white/90' : 'bg-[#D99A38]'
                }`}
                aria-hidden="true"
              />
              <span className="flex-1 leading-relaxed text-sm">
                {parseInline(item, isUser, `ul-${elements.length}-${idx}`)}
              </span>
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === 'ol') {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-2 space-y-2 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5 ${
                  isUser
                    ? 'bg-white/20 text-white'
                    : 'bg-[#244B39]/10 text-[#244B39] border border-[#244B39]/20'
                }`}
              >
                {item.number}
              </span>
              <span className="flex-1 leading-relaxed text-sm">
                {parseInline(item.text, isUser, `ol-${elements.length}-${idx}`)}
              </span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((rawLine, lineIdx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Horizontal divider
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushList();
      elements.push(
        <hr
          key={`hr-${lineIdx}`}
          className={`my-3 border-t ${isUser ? 'border-white/20' : 'border-[#E8E2D2]'}`}
        />
      );
      return;
    }

    // Headings (###, ##, #)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const titleText = headingMatch[2];
      const headingClass =
        level <= 2
          ? `text-base sm:text-lg font-serif font-bold mt-3.5 mb-1.5 ${isUser ? 'text-white' : 'text-[#244B39]'}`
          : `text-sm sm:text-base font-serif font-semibold mt-3 mb-1 ${isUser ? 'text-white/95' : 'text-[#244B39]'}`;

      elements.push(
        <div key={`h-${lineIdx}`} className={headingClass}>
          {parseInline(titleText, isUser, `h-${lineIdx}`)}
        </div>
      );
      return;
    }

    // Bullet list item (- or *)
    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      return;
    }

    // Numbered list item (1. or 1))
    const numberMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push({ number: numberMatch[1], text: numberMatch[2] });
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${lineIdx}`} className="leading-relaxed text-sm">
        {parseInline(line, isUser, `p-${lineIdx}`)}
      </p>
    );
  });

  flushList();
  return elements;
};

export const ChatMessage = ({ 
  message, 
  language = 'en', 
  onSendPrompt, 
  onRegenerate, 
  onRetry,
  isLatestAI = false 
}) => {
  const isUser = message.role === 'user';
  const isError = Boolean(message.isError);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content || '');
      setIsCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      speechService.cancelSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const cleanSpeech = (message.content || '')
        .replace(/[*#`_~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      speechService.speak(cleanSpeech, {
        lang: language,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`group flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-105 ${
          isUser
            ? 'bg-[#D99A38] text-white ring-2 ring-[#D99A38]/30'
            : 'bg-[#244B39] text-[#F5F0E5] ring-2 ring-[#244B39]/20'
        }`}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-[#D99A38]" />
        )}
      </div>

      {/* Message Content Container */}
      <div className={`max-w-[88%] sm:max-w-[78%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Main Message Bubble */}
        <div
          className={`relative rounded-3xl p-4 sm:p-5 shadow-sm transition-all ${
            isUser
              ? 'bg-[#244B39] text-white rounded-tr-md shadow-emerald-950/5'
              : isError
              ? 'bg-amber-50/90 text-[#18261E] border border-amber-300 rounded-tl-md shadow-xs'
              : 'bg-white text-[#18261E] border border-[#E8E2D2] rounded-tl-md shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          }`}
        >
          {/* Header row: Sender name, role badge, timestamp, and quick action toolbar */}
          <div className="flex items-center justify-between gap-3 mb-2.5 pb-1.5 border-b border-black/5 dark:border-white/10 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className={`font-semibold tracking-wide ${isUser ? 'text-white' : isError ? 'text-amber-800' : 'text-[#244B39]'}`}>
                {isUser ? 'You' : 'RasaBot AI'}
              </span>
              {!isUser && (
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold border flex items-center gap-1 ${
                  isError 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-[#FAF8F2] text-[#D99A38] border-[#E8E2D2]'
                }`}>
                  <Sparkles className="h-2.5 w-2.5" />
                  <span>{isError ? 'Notice' : 'Culinary Intelligence'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] ${isUser ? 'text-white/70' : 'text-[#8A9A8E]'}`}>
                {formatTimestamp(message.timestamp)}
              </span>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1 ml-1">
                {/* Copy Button */}
                {!isError && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    title="Copy message"
                    className={`p-1 rounded-lg transition ${
                      isUser
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#8A9A8E] hover:text-[#244B39] hover:bg-[#FAF8F2]'
                    }`}
                    aria-label="Copy text"
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}

                {/* Audio Read-Aloud Button */}
                {!isUser && !isError && (
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    title={isPlayingAudio ? 'Stop speaking' : 'Read aloud'}
                    className={`p-1 rounded-lg transition ${
                      isPlayingAudio
                        ? 'text-[#D97556] bg-amber-50'
                        : 'text-[#8A9A8E] hover:text-[#244B39] hover:bg-[#FAF8F2]'
                    }`}
                    aria-label={isPlayingAudio ? 'Stop speaking' : 'Read aloud'}
                  >
                    {isPlayingAudio ? (
                      <VolumeX className="h-3.5 w-3.5 text-[#D97556] animate-pulse" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}

                {/* Regenerate Button (if latest AI message and not error) */}
                {!isUser && !isError && isLatestAI && onRegenerate && (
                  <button
                    type="button"
                    onClick={onRegenerate}
                    title="Regenerate response"
                    className="p-1 rounded-lg text-[#8A9A8E] hover:text-[#244B39] hover:bg-[#FAF8F2] transition"
                    aria-label="Regenerate response"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Formatted Message Body */}
          <div className="space-y-2 leading-relaxed">
            {renderFormattedContent(message.content, isUser)}
          </div>

          {/* Retry Action for Error Messages */}
          {isError && onRetry && (
            <div className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[11px] text-amber-800 font-medium">Temporary network/model latency</span>
              <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 px-3 py-1.5 text-xs font-bold text-white transition shadow-xs cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Retry Message</span>
              </button>
            </div>
          )}
        </div>

        {/* Embedded Interactive Recipe Card */}
        {message.recipeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-3xl bg-white border border-[#E8E2D2] shadow-sm hover:shadow-md transition-all duration-300 max-w-sm"
          >
            <div className="relative aspect-16/9 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src={message.recipeCard.image}
                alt={message.recipeCard.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2.5 left-2.5 rounded-full bg-[#244B39]/90 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white shadow-xs">
                {message.recipeCard.cuisine}
              </div>
              {message.recipeCard.diet && (
                <div className="absolute top-2.5 right-2.5 rounded-full bg-emerald-700/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  {message.recipeCard.diet}
                </div>
              )}
            </div>

            <div className="p-4 space-y-2.5">
              <h4 className="font-serif text-base font-bold text-[#244B39] line-clamp-1">
                {message.recipeCard.title}
              </h4>

              <div className="flex items-center gap-4 text-[11px] text-[#5E6C61]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#D99A38]" />
                  {message.recipeCard.totalTime || ((message.recipeCard.prepTime || 0) + (message.recipeCard.cookTime || 0)) || 25} mins
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Flame className="h-3.5 w-3.5 text-[#D97556]" />
                  {message.recipeCard.calories || 250} kcal
                </span>
              </div>

              <Link
                to={`/recipes/${message.recipeCard.id}`}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#244B39] py-2 text-xs font-bold text-white hover:bg-[#1B382B] transition-colors cursor-pointer shadow-xs"
              >
                <Utensils className="h-3.5 w-3.5 text-[#D99A38]" />
                <span>View Full Recipe</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Clickable Follow-up Suggestions */}
        {!isUser && Array.isArray(message.suggestions) && message.suggestions.length > 0 && onSendPrompt && (
          <div className="pt-1.5 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9A8E] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#D99A38]" />
              <span>Suggested Follow-ups:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.suggestions.map((suggestion, idx) => {
                const cleanSuggestion = String(suggestion || '').replace(/<[^>]*>/g, '').replace(/\bsvg\b/gi, '').trim();
                if (!cleanSuggestion) return null;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSendPrompt(cleanSuggestion)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs text-[#244B39] font-medium border border-[#E8E2D2] hover:border-[#244B39] hover:bg-[#FAF8F2] transition-all shadow-xs cursor-pointer text-left"
                  >
                    {cleanSuggestion}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
