import apiClient from './api';

const STORAGE_KEY = 'rasavanta_rasabot_conversations';

export const rasabotService = {
  /**
   * Send a prompt to RasaBot (live backend Gemini conversational API)
   * Multi-turn history is sent to ensure contextual conversational memory.
   */
  async sendMessage(prompt, { conversationId, history = [], language = 'en' } = {}) {
    const formattedHistory = (history || []).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    const response = await apiClient.post(
      '/rasabot/chat',
      {
        message: prompt,
        messages: formattedHistory,
        language
      },
      {
        timeout: 45000 // 45s timeout for Gemini LLM generation
      }
    );

    if (response?.data && response.data.reply) {
      return {
        reply: response.data.reply,
        recipeCard: response.data.recipeCard || null,
        suggestions: Array.isArray(response.data.suggestions) ? response.data.suggestions : [],
        source: response.data.source || 'gemini',
        model: response.data.model || 'gemini-3.5-flash-lite'
      };
    }

    throw new Error(response?.data?.message || 'Gemini AI did not return a valid response.');
  },

  /**
   * Local storage conversation session management
   */
  getStoredConversations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveConversation(conversation) {
    try {
      const list = this.getStoredConversations();
      const existingIdx = list.findIndex((c) => c.id === conversation.id);
      let updated;
      if (existingIdx > -1) {
        updated = [...list];
        updated[existingIdx] = conversation;
      } else {
        updated = [conversation, ...list];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
      return updated;
    } catch {
      return [];
    }
  },

  deleteConversation(id) {
    try {
      const list = this.getStoredConversations();
      const updated = list.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  clearAllConversations() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    } catch {
      return [];
    }
  }
};
