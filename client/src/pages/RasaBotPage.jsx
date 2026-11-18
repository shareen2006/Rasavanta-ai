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
  Volume2, 
  RefreshCw,
  Globe,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../components/rasabot/ChatMessage';
import { VoiceModeModal } from '../components/rasabot/VoiceModeModal';
import { rasabotService } from '../services/rasabotService';
import { speechService } from '../services/speechService';
import toast from 'react-hot-toast';

const SUGGESTED_PROMPTS = [
  "What can I cook with paneer, tomatoes & green chillies?",
  "How to fix a dal that is too salty?",
  "Recommend a high-protein South Indian dinner",
  "Substitute for tamarind in South Indian rasam?",
  "What is the secret to crispy golden masala dosa?",
  "Low-calorie sweet or dessert under 150 kcal"
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
  const { t, i18n } = useTranslation();
  
  // Conversations State
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active Chat State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  const messagesEndRef = useRef(null);

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

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Sync language with i18n
  useEffect(() => {
    if (i18n.language) {
      setSelectedLanguage(i18n.language);
    }
  }, [i18n.language]);

  // Create a new conversation session
  const startNewConversation = () => {
    const newId = 'conv-' + Date.now();
    const initialMessage = {
      id: 'msg-init-' + Date.now(),
      role: 'assistant',
      content: `Namaste! I am **RasaBot**, your AI culinary and cooking companion.\n\nWhether you need an authentic recipe idea with whatever ingredients you have, precision ingredient swaps, kitchen troubleshooting, or Ayurvedic nutritional insights, I'm here to assist you.\n\nYou can **type** your question or tap **Start Voice Chat** for hands-free cooking guidance!`,
      timestamp: new Date().toISOString()
    };

    const newConv = {
      id: newId,
      title: 'New Culinary Inquiry',
      createdAt: new Date().toISOString(),
      messages: [initialMessage]
    };

    const updated = rasabotService.saveConversation(newConv);
    setConversations(updated);
    setActiveConvId(newId);
    setMessages(newConv.messages);
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
    startNewConversation();
    toast.success('Chat history cleared');
  };

  // Send message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');

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
      const title = currentConv && currentConv.title !== 'New Culinary Inquiry' 
        ? currentConv.title 
        : text.slice(0, 32) + (text.length > 32 ? '...' : '');

      const updatedConv = {
        id: activeConvId,
        title,
        updatedAt: new Date().toISOString(),
        messages: finalMessages
      };

      const savedList = rasabotService.saveConversation(updatedConv);
      setConversations(savedList);

    } catch (err) {
      toast.error('Could not get response from RasaBot');
    } finally {
      setIsLoading(false);
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
    <div className="flex h-[calc(100vh-80px)] min-h-[550px] bg-[#9cdc85] overflow-hidden">
      
      {/* 1. CHAT HISTORY SIDEBAR (Desktop permanent / Mobile drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 lg:static lg:w-80 bg-white border-r border-[#A7B99A]/30 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-4 flex-1 flex flex-col overflow-hidden">
          
          {/* Header & New Chat Button */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={startNewConversation}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#244B39] py-3 px-4 text-xs font-bold text-white shadow-md hover:bg-[#1B382B] transition cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#D99A38]" />
              <span>New Conversation</span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-[#566459] hover:bg-[#FAF8F2]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Conversation History */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-[#566459]" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-[#A7B99A]/30 bg-[#FAF8F2] py-2 pl-9 pr-3 text-xs text-[#303A32] placeholder-[#A7B99A] focus:outline-none focus:ring-1 focus:ring-[#244B39]"
            />
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B99A] block mb-2 px-2">
              Recent Inquiries
            </span>

            {filteredConversations.length > 0 ? (
              filteredConversations.map((c) => {
                const isActive = c.id === activeConvId;
                return (
                  <div
                    key={c.id}
                    onClick={() => selectConversation(c.id)}
                    className={`group flex items-center justify-between p-3 rounded-2xl text-xs cursor-pointer transition ${
                      isActive
                        ? 'bg-[#244B39] text-white font-bold shadow-xs'
                        : 'text-[#303A32] hover:bg-[#FAF8F2]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <MessageSquare className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#D99A38]' : 'text-[#A7B99A]'}`} />
                      <span className="truncate">{c.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteConversation(e, c.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition ${
                        isActive ? 'text-white/80' : 'text-[#A7B99A]'
                      }`}
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-[#A7B99A]">
                No conversations found.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F5F0E5] flex items-center justify-between text-xs text-[#566459]">
          <button
            type="button"
            onClick={handleClearAllHistory}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D97556] hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear All History
          </button>
          <span className="text-[10px] text-[#A7B99A]">RasaBot v2.4</span>
        </div>
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* 2. MAIN CHAT STAGE */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Chat Header */}
        <header className="h-16 px-4 sm:px-6 bg-white border-b border-[#A7B99A]/30 flex items-center justify-between shadow-xs">
          
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#244B39] hover:bg-[#FAF8F2]"
              aria-label="Toggle Conversations"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>

            {/* Assistant Details */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244B39] text-[#F5F0E5] shadow-sm">
                <Bot className="h-5 w-5 text-[#D99A38]" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#244B39] leading-tight">
                  RasaBot AI
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-[#566459]">
                  <Sparkles className="h-3 w-3 text-[#D99A38]" />
                  <span>Master Culinary Intelligence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Actions: Voice Mode & Language Picker */}
          <div className="flex items-center gap-2.5">
            {/* Language Selection */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#FAF8F2] px-3 py-1.5 border border-[#A7B99A]/30 text-xs font-semibold text-[#244B39]">
              <Globe className="h-3.5 w-3.5 text-[#D99A38]" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Mode Launch Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVoiceModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#244B39] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#1B382B] transition cursor-pointer"
            >
              <Mic className="h-4 w-4 text-[#D99A38] animate-pulse" />
              <span>Voice Chat</span>
            </motion.button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="mx-auto max-w-3xl space-y-6">
            
            {/* Render Messages */}
            {messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                language={selectedLanguage} 
              />
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#244B39] text-[#D99A38]">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-3xl bg-white px-5 py-3 border border-[#A7B99A]/30 shadow-soft flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#D99A38] animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-[#244B39] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-[#A7B99A] animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}

            {/* Suggested Prompt Chips (When conversation is fresh) */}
            {messages.length <= 2 && (
              <div className="pt-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A7B99A] block">
                  Suggested Culinary Prompts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left p-3 rounded-2xl bg-white/80 border border-[#A7B99A]/30 text-xs text-[#244B39] font-medium hover:bg-white hover:border-[#244B39] transition shadow-xs flex items-center justify-between group cursor-pointer"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-[#D99A38] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 sm:p-6 bg-white/90 border-t border-[#A7B99A]/30 backdrop-blur-md">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center rounded-3xl border border-[#A7B99A]/50 bg-white p-2 shadow-soft focus-within:ring-2 focus-within:ring-[#244B39] focus-within:border-transparent transition"
            >
              {/* Mic Icon to Launch Voice Mode */}
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF8F2] text-[#244B39] hover:bg-[#F5F0E5] transition"
                title="Speak to RasaBot"
              >
                <Mic className="h-4 w-4 text-[#D99A38]" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask RasaBot about recipes, ingredients, substitutions, or cooking tips..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-3.5 text-xs sm:text-sm text-[#303A32] placeholder-[#A7B99A] focus:outline-none"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244B39] text-white disabled:opacity-40 hover:bg-[#1B382B] transition cursor-pointer"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-[#A7B99A] mt-2 px-2">
              <span>RasaBot AI conversational chef • Multilingual audio & text</span>
              <button
                type="button"
                onClick={() => setVoiceModalOpen(true)}
                className="text-[#244B39] font-bold hover:underline"
              >
                Open Hands-Free Voice Mode →
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
