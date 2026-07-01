import React, { useEffect, useMemo, useState } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { key: 'nav.about', href: '#about' },
      { key: 'nav.experience', href: '#experience' },
      { key: 'nav.portfolio', href: '#portfolio' },
      { key: 'nav.contact', href: '#contact' },
    ],
    [],
  );

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

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <a className={styles.logo} href="#hero" onClick={handleNavClick}>
        <span className={styles.logoName}>Meng Wen</span>
        <span className={styles.logoMeta}>{t('hero.subtitle')}</span>
      </a>

      <button
        className={styles.menuBtn}
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <a key={item.key} href={item.href} onClick={handleNavClick}>
            {t(item.key)}
          </a>
        ))}
        <button className={styles.langBtn} type="button" onClick={toggleLanguage}>
          {language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
