import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>Meng Wen</div>
      <div className={styles.navLinks}>
        <a href="#about">{t('nav.about')}</a>
        <a href="#experience">{t('nav.experience')}</a>
        <a href="#portfolio">{t('nav.portfolio')}</a>
        <a href="#contact">{t('nav.contact')}</a>
        <button className={styles.langBtn} onClick={toggleLanguage}>
          {language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
