import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

const LanguageContext = createContext();
const translations = { zh, en };

const getInitialLanguage = () => {
  try {
    const saved = window.localStorage.getItem('language');
    return translations[saved] ? saved : 'zh';
  } catch {
    return 'zh';
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'zh' ? 'en' : 'zh'));
  }, []);

  const t = useCallback(
    (key) => {
      const translation = translations[language][key];
      if (!translation) {
        console.warn(`[i18n] Translation missing for key: "${key}" in language: "${language}"`);
        return key;
      }
      return translation;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, t, toggleLanguage }),
    [language, t, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
