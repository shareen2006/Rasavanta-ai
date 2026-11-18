import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import te from '../locales/te/translation.json';
import hi from '../locales/hi/translation.json';
import ta from '../locales/ta/translation.json';
import kn from '../locales/kn/translation.json';
import ml from '../locales/ml/translation.json';
import bn from '../locales/bn/translation.json';
import gu from '../locales/gu/translation.json';
import mr from '../locales/mr/translation.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'TE' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'HI' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'TA' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: 'ML' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: 'BN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: 'GU' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: 'MR' }
];

const savedLanguage = localStorage.getItem('rasavanta_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi },
      ta: { translation: ta },
      kn: { translation: kn },
      ml: { translation: ml },
      bn: { translation: bn },
      gu: { translation: gu },
      mr: { translation: mr }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Update html lang attribute whenever language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('rasavanta_lang', lng);
});

// Set initial html lang
if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage;
}

export default i18n;
