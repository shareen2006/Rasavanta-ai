import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bot, 
  Send, 
  Mic, 
  Plus, 
  Search, 
  Trash2, 
  MessageSquare, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Globe, 
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  ArrowDown,
  AlertTriangle,
  RotateCcw,
  ChefHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../components/rasabot/ChatMessage';
import { VoiceModeModal } from '../components/rasabot/VoiceModeModal';
import { rasabotService } from '../services/rasabotService';
import toast from 'react-hot-toast';

const CURATED_PROMPTS = [
  {
    icon: '🥘',
    category: 'Recipe Match',
    title: 'Cook with what you have',
    prompt: 'What can I cook with paneer, tomatoes & green chillies?'
  },
  {
    icon: '🆘',
    category: 'Kitchen Rescue',
    title: 'Fix sour tomato gravy',
    prompt: 'Why did my tomato gravy taste sour, and how do I fix it?'
  },
  {
    icon: '⚖️',
    category: 'Portion & Scaling',
    title: 'Paneer for 4 people',
    prompt: 'How much paneer is required to make curry for 4 people?'
  },
  {
    icon: '🌿',
    category: 'Smart Swaps',
    title: 'Gravy without cream',
    prompt: 'Can I make Paneer Butter Masala without heavy cream?'
  },
  {
    icon: '⚡',
    category: 'High Protein',
    title: 'High-protein dinner',
    prompt: 'Recommend a high-protein South Indian dinner under 450 kcal'
  },
  {
    icon: '🧂',
    category: 'Troubleshooting',
    title: 'Fix salty dal or curry',
    prompt: 'How to fix a dal or curry that has too much salt?'
  }
];

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
];

export const RasaBotPage = () => {
  const { i18n } = useTranslation();
  
  // Conversations State
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile drawer
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true); // Desktop collapse
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Active Chat State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  // Scoped internal scroll container ref
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Load saved conversations on mount
  useEffect(() => {
    const stored = rasabotService.getStoredConversations();
    setConversations(stored);

    if (stored.length > 0) {
      setActiveConvId(stored[0].id);
      setMessages(stored[0].messages || []);
    } else {
      startNewConversation();
    }
  }, []);

  // Scoped internal container scrolling (Prevents entire window jumping)
  const scrollToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  // Scroll to bottom when messages change or loading starts
  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isLoading]);

  // Track scroll position to show/hide "jump to bottom" button
  const handleContainerScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 140;
    setShowScrollBottomBtn(!isNearBottom);
  };

  // Sync language with i18n
  useEffect(() => {
    if (i18n.language) {
      setSelectedLanguage(i18n.language);
    }
  }, [i18n.language]);

  // Auto-resize textarea
  const handleTextareaInput = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  // Create a new conversation session
  const startNewConversation = () => {
    const newId = 'conv-' + Date.now();
    const newConv = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: []
    };

    const updated = rasabotService.saveConversation(newConv);
    setConversations(updated);
    setActiveConvId(newId);
    setMessages([]);
    setSidebarOpen(false);
  };

  // Switch active conversation
  const selectConversation = (id) => {
    const found = conversations.find((c) => c.id === id);
    if (found) {
      setActiveConvId(id);
      setMessages(found.messages || []);
      setSidebarOpen(false);
    }
  };

  // Delete single conversation
  const handleDeleteConversation = (e, id) => {
    e.stopPropagation();
    const updated = rasabotService.deleteConversation(id);
    setConversations(updated);

    if (activeConvId === id) {
      if (updated.length > 0) {
        selectConversation(updated[0].id);
      } else {
        startNewConversation();
      }
    }
    toast.success('Conversation removed');
  };

  // Clear all conversations
  const handleClearAllHistory = () => {
    rasabotService.clearAllConversations();
    setConversations([]);
    setShowClearConfirm(false);
    startNewConversation();
    toast.success('Chat history cleared');
  };

  // Send message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await rasabotService.sendMessage(text, {
        conversationId: activeConvId,
        history: newMessages,
        language: selectedLanguage
      });

      const aiMessage = {
        id: 'msg-ai-' + Date.now(),
        role: 'assistant',
        content: response.reply,
        recipeCard: response.recipeCard,
        suggestions: response.suggestions,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);

      // Update conversation title and save
      const currentConv = conversations.find((c) => c.id === activeConvId);
      const title =
        currentConv && currentConv.title !== 'New Conversation'
          ? currentConv.title
          : text.slice(0, 36) + (text.length > 36 ? '...' : '');

      const updatedConv = {
        id: activeConvId,
        title,
        updatedAt: new Date().toISOString(),
        messages: finalMessages
      };

      const savedList = rasabotService.saveConversation(updatedConv);
      setConversations(savedList);
    } catch (err) {
      console.error('RasaBot Send Error:', err);
      const errorMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        isError: true,
        content: 'Gemini AI is currently processing high traffic or experiencing network latency. Please tap **Retry Message** below to resend.',
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('Gemini connection delay. Tap retry to resend.');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate or retry last prompt
  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  const handleRetryLast = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      const cleaned = messages.filter((m) => !m.isError && m.id !== lastUserMessage.id);
      setMessages(cleaned);
      handleSendMessage(lastUserMessage.content);
    }
  };

  // Callback when voice modal produces messages
  const handleVoiceMessageSent = (msg) => {
    setMessages((prev) => {
      const updated = [...prev, { ...msg, id: 'msg-v-' + Date.now() }];
      const currentConv = conversations.find((c) => c.id === activeConvId);
      if (currentConv) {
        rasabotService.saveConversation({
          ...currentConv,
          messages: updated
        });
      }
      return updated;
    });
  };

  // Filter conversations in sidebar
  const filteredConversations = conversations.filter((c) =>
    (c.title || '').toLowerCase().includes(searchHistoryQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-[#FAF8F2] overflow-hidden select-text">
      
      {/* 1. CHAT HISTORY SIDEBAR (Desktop collapsible / Mobile drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-white border-r border-[#E8E2D2] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } ${
          desktopSidebarVisible ? 'lg:static lg:translate-x-0' : 'lg:static lg:hidden'
        }`}
      >
        <div className="p-4 space-y-3.5 flex-1 flex flex-col overflow-hidden">
          
          {/* Header & New Chat Button */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={startNewConversation}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#244B39] py-3 px-4 text-xs font-bold text-white shadow-sm hover:bg-[#1B382B] transition cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#D99A38]" />
              <span>New Conversation</span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-[#5E6C61] hover:bg-[#FAF8F2]"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Conversation History */}
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-[#8A9A8E]" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-[#E8E2D2] bg-[#FAF8F2] py-2 pl-9 pr-3 text-xs text-[#18261E] placeholder-[#8A9A8E] focus:outline-none focus:ring-1 focus:ring-[#244B39]"
            />
            {searchHistoryQuery && (
              <button
                type="button"
                onClick={() => setSearchHistoryQuery('')}
                className="absolute right-2.5 top-2.5 text-[#8A9A8E] hover:text-[#18261E]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9A8E] block mb-2 px-2">
              Recent Inquiries
            </span>

            {filteredConversations.length > 0 ? (
              filteredConversations.map((c) => {
                const isActive = c.id === activeConvId;
                return (
                  <div
                    key={c.id}
                    onClick={() => selectConversation(c.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-2xl text-xs cursor-pointer transition ${
                      isActive
                        ? 'bg-[#244B39] text-white font-medium shadow-xs'
                        : 'text-[#303A32] hover:bg-[#FAF8F2] hover:text-[#18261E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <MessageSquare className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#D99A38]' : 'text-[#8A9A8E]'}`} />
                      <span className="truncate">{c.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteConversation(e, c.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition ${
                        isActive ? 'text-white/80' : 'text-[#8A9A8E]'
                      }`}
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-[#8A9A8E]">
                No conversations found.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#E8E2D2] bg-white flex items-center justify-between text-xs text-[#5E6C61]">
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D97556] hover:underline cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
          <span className="text-[10px] font-medium text-[#8A9A8E]">RasaBot v2.5</span>
        </div>
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-[#E8E2D2] space-y-4">
            <div className="flex items-center gap-3 text-[#D97556]">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-serif text-base font-bold text-[#18261E]">Clear all conversations?</h3>
            </div>
            <p className="text-xs text-[#5E6C61] leading-relaxed">
              This will permanently remove all previous conversation history from your browser. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-xl px-4 py-2 text-xs font-bold text-[#5E6C61] hover:bg-[#FAF8F2] transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAllHistory}
                className="rounded-xl bg-[#D97556] px-4 py-2 text-xs font-bold text-white hover:bg-[#C26245] transition"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN CHAT STAGE */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative bg-[#FAF8F2]">
        
        {/* Top Chat Header */}
        <header className="h-16 px-4 sm:px-6 bg-white border-b border-[#E8E2D2] flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] z-10">
          
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#244B39] hover:bg-[#FAF8F2] cursor-pointer"
              aria-label="Toggle Conversations"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>

            {/* Desktop Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setDesktopSidebarVisible(!desktopSidebarVisible)}
              className="hidden lg:flex p-2 rounded-xl text-[#5E6C61] hover:text-[#244B39] hover:bg-[#FAF8F2] cursor-pointer transition"
              title={desktopSidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
              aria-label="Toggle Sidebar"
            >
              {desktopSidebarVisible ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeft className="h-5 w-5" />
              )}
            </button>

            {/* Assistant Details */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244B39] text-[#F5F0E5] shadow-xs">
                <Bot className="h-5 w-5 text-[#D99A38]" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-[#244B39] leading-tight flex items-center gap-1.5">
                  <span>RasaBot AI</span>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Gemini AI Active
                  </span>
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-[#5E6C61]">
                  <Sparkles className="h-3 w-3 text-[#D99A38]" />
                  <span>Master Culinary Intelligence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Actions: Voice Mode & Language Picker */}
          <div className="flex items-center gap-2.5">
            {/* Language Selection */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#FAF8F2] px-3 py-1.5 border border-[#E8E2D2] text-xs font-semibold text-[#244B39]">
              <Globe className="h-3.5 w-3.5 text-[#D99A38]" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick New Chat Button */}
            <button
              type="button"
              onClick={startNewConversation}
              title="Start New Chat"
              className="p-2 rounded-full text-[#5E6C61] hover:text-[#244B39] hover:bg-[#FAF8F2] border border-[#E8E2D2] transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>

            {/* Voice Mode Launch Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setVoiceModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#244B39] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1B382B] transition cursor-pointer"
            >
              <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#D99A38] animate-pulse" />
              <span className="hidden sm:inline">Voice Chat</span>
              <span className="sm:hidden">Voice</span>
            </motion.button>
          </div>
        </header>

        {/* Message Stream Container (Strictly internal scroll) */}
        <div 
          ref={chatContainerRef}
          onScroll={handleContainerScroll}
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6"
        >
          <div className="mx-auto max-w-3xl space-y-6">
            
            {/* Render Messages */}
            {messages.map((msg, index) => (
              <ChatMessage 
                key={msg.id || index} 
                message={msg} 
                language={selectedLanguage}
                onSendPrompt={(prompt) => handleSendMessage(prompt)}
                onRegenerate={handleRegenerate}
                onRetry={handleRetryLast}
                isLatestAI={!isLoading && index === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-[#244B39] text-[#D99A38] ring-2 ring-[#244B39]/20">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="rounded-3xl bg-white px-5 py-3.5 border border-[#E8E2D2] shadow-sm flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#D99A38] animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-[#244B39] animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-[#A7B99A] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-[#5E6C61] font-medium pl-1">
                    RasaBot is crafting your culinary answer with Gemini...
                  </span>
                </div>
              </motion.div>
            )}

            {/* Suggested Curated Prompt Cards (Shown when conversation is fresh) */}
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="pt-6 sm:pt-8 space-y-4"
              >
                <div className="text-center space-y-2 py-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#244B39] text-[#D99A38] shadow-md ring-4 ring-[#244B39]/10">
                    <Bot className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#18261E]">
                    Namaste! How can I inspire your cooking today?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E6C61] max-w-lg mx-auto leading-relaxed">
                    I am RasaBot, your Master Culinary Intelligence powered dynamically by Google Gemini. Ask for recipes, ingredient ideas, substitutions, kitchen troubleshooting, or simply say hi!
                  </p>
                </div>

                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A8E] flex items-center gap-1.5">
                    <ChefHat className="h-3.5 w-3.5 text-[#D99A38]" />
                    <span>Popular Culinary Inquiries</span>
                  </span>
                  <span className="text-[10px] text-[#8A9A8E]">Tap to ask Gemini immediately</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CURATED_PROMPTS.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(item.prompt)}
                      className="group flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D2] text-left hover:border-[#244B39] hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-xl p-1.5 rounded-xl bg-[#FAF8F2] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A38]">
                            {item.category}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-[#8A9A8E] group-hover:text-[#244B39] group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <h4 className="text-xs font-bold text-[#18261E] group-hover:text-[#244B39] transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#5E6C61] line-clamp-1 mt-0.5">
                          "{item.prompt}"
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating Scroll to Bottom Jump Button */}
        <AnimatePresence>
          {showScrollBottomBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              type="button"
              onClick={() => scrollToBottom(true)}
              className="absolute bottom-24 right-6 sm:right-10 z-20 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#244B39] border border-[#E8E2D2] shadow-md hover:bg-[#FAF8F2] transition cursor-pointer"
            >
              <ArrowDown className="h-3.5 w-3.5 text-[#D99A38]" />
              <span>Latest</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Input Area */}
        <div className="p-3 sm:p-5 bg-white/95 border-t border-[#E8E2D2] backdrop-blur-md">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-end rounded-3xl border border-[#E8E2D2] bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-[#244B39] focus-within:border-transparent transition-all"
            >
              {/* Mic Icon to Launch Voice Mode */}
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FAF8F2] text-[#244B39] hover:bg-[#F5F0E5] transition cursor-pointer mb-0.5"
                title="Speak to RasaBot"
              >
                <Mic className="h-4 w-4 text-[#D99A38]" />
              </button>

              {/* Multi-line Auto-Expanding Text Input */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={handleTextareaInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask RasaBot about recipes, ingredients, substitutions, or cooking tips..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-[#18261E] placeholder-[#8A9A8E] focus:outline-none resize-none max-h-32 custom-scrollbar"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#244B39] text-white disabled:opacity-40 hover:bg-[#1B382B] transition cursor-pointer mb-0.5 shadow-xs"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-[#8A9A8E] mt-2 px-2">
              <span className="hidden sm:inline">Press Enter to send • Shift + Enter for new line</span>
              <span className="sm:hidden">Press Enter to send</span>
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="text-[#244B39] font-bold hover:underline cursor-pointer"
              >
                Start Voice Chat →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FULL-SCREEN INTERACTIVE VOICE CHAT MODAL */}
      <VoiceModeModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        currentLanguage={selectedLanguage}
        onMessageSent={handleVoiceMessageSent}
        history={messages}
      />
    </div>
  );
};

export default RasaBotPage;
