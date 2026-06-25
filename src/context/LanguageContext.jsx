import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

const LanguageContext = createContext();
const translations = { zh, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return translations[saved] ? saved : 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => setLanguage(lang => lang === 'zh' ? 'en' : 'zh'), []);

  const t = useCallback((key) => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`[i18n] Translation missing for key: "${key}" in language: "${language}"`);
      return key;
    }
    return translation;
  }, [language]);

  const value = useMemo(() => ({ language, t, toggleLanguage }), [language, t, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
