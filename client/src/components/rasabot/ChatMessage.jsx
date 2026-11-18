import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, User, Volume2, VolumeX, Clock, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { speechService } from '../../services/speechService';

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
        <strong key={key} className={isUser ? 'font-bold text-white' : 'font-semibold text-[#244B39]'}>
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
          className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
            isUser ? 'bg-white/20 text-white' : 'bg-[#FAF8F2] text-[#244B39] border border-[#A7B99A]/30'
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
  // Remove any stray raw SVG tags or unintended SVG serialization labels
  const sanitized = String(content)
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<\/?svg[^>]*>/gi, '')
    .replace(/\bsvg\b/gi, (match, offset, str) => {
      // Only remove if it's an isolated accidental tag/label artifact
      const prev = str[offset - 1];
      const next = str[offset + match.length];
      return (!prev || prev === '\n' || prev === ' ') && (!next || next === '\n' || next === ' ') ? '' : match;
    })
    .trim();

  const lines = sanitized.split('\n');
  const elements = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  isUser ? 'bg-white/80' : 'bg-[#D99A38]'
                }`}
                aria-hidden="true"
              />
              <span className="flex-1 leading-relaxed">
                {parseInline(item, isUser, `ul-${elements.length}-${idx}`)}
              </span>
            </li>
          ))}
        </ul>
      );
    } else if (currentList.type === 'ol') {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-1.5 space-y-1.5 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`shrink-0 font-semibold text-xs mt-0.5 ${
                  isUser ? 'text-white/90' : 'text-[#D99A38]'
                }`}
              >
                {item.number}.
              </span>
              <span className="flex-1 leading-relaxed">
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
          className={`my-2.5 border-t ${isUser ? 'border-white/20' : 'border-[#A7B99A]/20'}`}
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
          ? `text-sm sm:text-base font-serif font-bold mt-3 mb-1 ${isUser ? 'text-white' : 'text-[#244B39]'}`
          : `text-xs sm:text-sm font-sans font-bold mt-2.5 mb-1 ${isUser ? 'text-white/95' : 'text-[#244B39]'}`;

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
      <p key={`p-${lineIdx}`} className="leading-relaxed">
        {parseInline(line, isUser, `p-${lineIdx}`)}
      </p>
    );
  });

  flushList();
  return elements;
};

export const ChatMessage = ({ message, language = 'en' }) => {
  const isUser = message.role === 'user';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      speechService.cancelSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      // Clean speech text from markdown syntax
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
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-xs ${
          isUser
            ? 'bg-[#D99A38] text-white'
            : 'bg-[#244B39] text-[#F5F0E5] ring-2 ring-[#D99A38]/30'
        }`}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="h-4 w-4" aria-hidden="true" focusable="false" />
        ) : (
          <Bot className="h-4 w-4 text-[#D99A38]" aria-hidden="true" focusable="false" />
        )}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[75%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Message Card */}
        <div
          className={`rounded-3xl p-4 sm:p-5 shadow-xs transition-all ${
            isUser
              ? 'bg-[#244B39] text-white rounded-tr-xs'
              : 'bg-white text-[#303A32] border border-[#A7B99A]/30 rounded-tl-xs shadow-soft'
          }`}
        >
          {/* Header row: Speaker button for AI & timestamp */}
          <div className="flex items-center justify-between gap-4 mb-2 text-[10px] font-medium opacity-75">
            <span className="font-semibold uppercase tracking-wider">
              {isUser ? 'You' : 'RasaBot AI'}
            </span>
            <div className="flex items-center gap-2">
              <span>{formatTimestamp(message.timestamp)}</span>
              {!isUser && (
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  aria-label={isPlayingAudio ? 'Stop speaking' : 'Read message aloud'}
                  className="rounded-full p-1 hover:bg-[#F5F0E5] text-[#244B39] transition"
                >
                  {isPlayingAudio ? (
                    <VolumeX className="h-3.5 w-3.5 text-[#D97556] animate-pulse" aria-hidden="true" focusable="false" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 text-[#566459] hover:text-[#244B39]" aria-hidden="true" focusable="false" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Body Content with formatted Markdown rendering */}
          <div className="text-xs sm:text-sm leading-relaxed font-sans space-y-2">
            {renderFormattedContent(message.content, isUser)}
          </div>
        </div>

        {/* Embedded Recipe Card if provided */}
        {message.recipeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-3xl bg-white border border-[#A7B99A]/30 shadow-card-hover max-w-sm"
          >
            <div className="relative aspect-16/9 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src={message.recipeCard.image}
                alt={message.recipeCard.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2.5 left-2.5 rounded-full bg-[#244B39]/90 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white shadow-xs">
                {message.recipeCard.cuisine}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-serif text-base font-bold text-[#244B39] line-clamp-1">
                {message.recipeCard.title}
              </h4>

              <div className="flex items-center gap-4 text-[11px] text-[#566459]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#D99A38]" aria-hidden="true" focusable="false" />
                  {(message.recipeCard.prepTime || 0) + (message.recipeCard.cookTime || 0)} mins
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-[#D97556]" aria-hidden="true" focusable="false" />
                  {message.recipeCard.calories} kcal
                </span>
              </div>

              <Link
                to={`/recipes/${message.recipeCard.id}`}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#244B39] py-2 text-xs font-bold text-white hover:bg-[#193527] transition"
              >
                <span>View Full Recipe</span>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
