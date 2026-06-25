import React, { createContext, useContext, useState, useEffect } from 'react';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

const LanguageContext = createContext();
const translations = { zh, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => translations[language][key] || key;
  const toggleLanguage = () => setLanguage(lang => lang === 'zh' ? 'en' : 'zh');

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
