const geminiService = require('../services/geminiService');

/**
 * Controller for RasaBot AI Real-Time Conversational Chat
 * Powered directly by Google Gemini with multi-turn conversation memory,
 * dynamic model fallback, and zero hardcoded or simulated canned answers.
 */

exports.chat = async (req, res) => {
  try {
    const { 
      message, 
      messages = [], 
      language = 'en', 
      dietaryPreferences, 
      pantryIngredients = [] 
    } = req.body;

    const userPrompt = (message || (messages.length > 0 ? messages[messages.length - 1].content : '') || '').trim();

    if (!userPrompt) {
      return res.status(400).json({
        success: false,
        message: 'A message prompt is required.'
      });
    }

    if (!geminiService.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'Google Gemini API is not configured on the backend server. Please verify your GEMINI_API_KEY.'
      });
    }

    // Call Gemini with full conversation memory
    try {
      const geminiChatResult = await geminiService.chat({
        message: userPrompt,
        messages,
        language,
        pantryIngredients,
        dietaryPreferences
      });

      return res.status(200).json(geminiChatResult);
    } catch (geminiError) {
      console.error('[RasaBot Controller] Gemini Chat API Error:', geminiError.message || geminiError);
      
      const errMsg = String(geminiError.message || '');
      let userFacingMessage = 'Gemini AI is temporarily unavailable. Please tap Retry Message below to resend.';
      let statusCode = 503;

      if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
        userFacingMessage = 'Gemini AI rate limit reached. Please wait a few seconds and tap Retry Message.';
        statusCode = 429;
      } else if (errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('high demand')) {
        userFacingMessage = 'Gemini AI servers are currently experiencing high demand. Please tap Retry Message below.';
        statusCode = 503;
      } else if (geminiError.code === 'TIMEOUT' || errMsg.includes('timed out')) {
        userFacingMessage = 'Gemini AI generation request timed out. Please tap Retry Message below.';
        statusCode = 504;
      } else if (errMsg.includes('API key') || errMsg.includes('not configured')) {
        userFacingMessage = 'Gemini AI is not configured properly. Please check your GEMINI_API_KEY environment variable.';
        statusCode = 500;
      }

      return res.status(statusCode).json({
        success: false,
        message: userFacingMessage,
        error: geminiError.message
      });
    }
  } catch (error) {
    console.error('[RasaBot Controller] Unexpected Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process conversation with Gemini AI.',
      error: error.message
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const status = geminiService.getStatus();
    return res.status(200).json({
      success: true,
      gemini: status
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
