/**
 * Speech Service: Cross-Browser Speech-to-Text (STT) and Text-to-Speech (TTS)
 * Supports all 9 official languages of RASAVANTA AI with graceful fallbacks.
 */

// Mapping RASAVANTA AI language codes to BCP-47 speech tags
export const SPEECH_LANG_MAP = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
  mr: 'mr-IN',
};

// Check for Web Speech API recognition support
const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition || null
    : null;

class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  isRecognitionSupported() {
    return Boolean(SpeechRecognition);
  }

  isSynthesisSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Start microphone listening with real-time transcript streaming
   */
  startListening({
    lang = 'en',
    onResult,
    onPartial,
    onError,
    onEnd,
  } = {}) {
    if (!this.isRecognitionSupported()) {
      if (onError) onError(new Error('Speech recognition is not supported in this browser.'));
      return false;
    }

    // Cancel any active speech synthesis before listening so bot doesn't talk to itself
    this.cancelSpeech();

    try {
      if (this.recognition) {
        try { this.recognition.abort(); } catch {}
      }

      this.recognition = new SpeechRecognition();
      const locale = SPEECH_LANG_MAP[lang] || 'en-IN';
      this.recognition.lang = locale;
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript && onPartial) {
          onPartial(interimTranscript);
        }

        if (finalTranscript && onResult) {
          onResult(finalTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      this.isListening = false;
      if (onError) onError(err);
      return false;
    }
  }

  /**
   * Stop active speech recognition
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }

  /**
   * Read out text using text-to-speech synthesis
   */
  speak(text, {
    lang = 'en',
    rate = 1.0,
    pitch = 1.0,
    onStart,
    onEnd,
    onError,
  } = {}) {
    if (!this.isSynthesisSupported()) {
      if (onError) onError(new Error('Speech synthesis is not supported.'));
      return false;
    }

    // Cancel any existing utterance
    this.cancelSpeech();

    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/[*#_`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return false;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const targetLocale = SPEECH_LANG_MAP[lang] || 'en-IN';
      utterance.lang = targetLocale;
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find((v) => v.lang.startsWith(targetLocale.slice(0, 2)) || v.lang === targetLocale);
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      this.isSpeaking = false;
      if (onError) onError(err);
      return false;
    }
  }

  /**
   * Immediately cancel any active speech playback
   */
  cancelSpeech() {
    if (this.isSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechService();
