import React, { useEffect, useMemo, useState } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

const MOBILE_NAV_MEDIA_QUERY = '(max-width: 900px)';

const getIsMobileViewport = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_NAV_MEDIA_QUERY).matches;
};

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport);

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
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(MOBILE_NAV_MEDIA_QUERY);
    const handleViewportChange = (event) => {
      setIsMobileViewport(event.matches);

      if (!event.matches) {
        setMenuOpen(false);
      }
    };

    setIsMobileViewport(mediaQueryList.matches);

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleViewportChange);
      return () => mediaQueryList.removeEventListener('change', handleViewportChange);
    }

    mediaQueryList.addListener(handleViewportChange);
    return () => mediaQueryList.removeListener(handleViewportChange);
  }, []);

  const handleNavClick = () => setMenuOpen(false);
  const hideNavLinks = isMobileViewport && !menuOpen;

  return (
    <nav className={styles.navbar}>
      <a className={styles.logo} href="#hero" onClick={handleNavClick}>
        <span className={styles.logoName}>Meng Wen</span>
        <span className={styles.logoMeta}>{t('hero.subtitle')}</span>
      </a>

      <button
        className={styles.menuBtn}
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div
        id="primary-navigation"
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
        hidden={hideNavLinks}
        aria-hidden={hideNavLinks}
      >
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
