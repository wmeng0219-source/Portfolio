import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../../context/LanguageContext';

const MOBILE_NAV_MEDIA_QUERY = '(max-width: 900px)';

const getIsMobileViewport = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(MOBILE_NAV_MEDIA_QUERY).matches;
};

const scrollToHashTarget = (href) => {
  if (!href || !href.startsWith('#')) {
    return;
  }
  const target = document.getElementById(href.slice(1));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport);
  const menuButtonRef = useRef(null);
  const shouldRestoreFocusRef = useRef(false);

  const navItems = useMemo(
    () => [
      { key: 'nav.home', href: '#hero', id: 'hero' },
      { key: 'nav.portfolio', href: '#portfolio', id: 'portfolio' },
      { key: 'nav.experience', href: '#experience', id: 'experience' },
      { key: 'nav.about', href: '#about', id: 'about' },
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'portfolio', 'experience', 'about'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = (event, href, id) => {
    event.preventDefault();
    scrollToHashTarget(href);
    setActiveSection(id);

    if (isMobileViewport) {
      shouldRestoreFocusRef.current = true;
    }

    setMenuOpen(false);
  };

  const hideNavLinks = isMobileViewport && !menuOpen;

  useEffect(() => {
    if (hideNavLinks && shouldRestoreFocusRef.current) {
      menuButtonRef.current?.focus();
      shouldRestoreFocusRef.current = false;
    }
  }, [hideNavLinks]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Main Navigation">
        <button
          ref={menuButtonRef}
          className={styles.menuBtn}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
          onClick={() => {
            shouldRestoreFocusRef.current = false;
            setMenuOpen((current) => !current);
          }}
        >
          <span />
          <span />
        </button>

        <div
          id="primary-navigation"
          className={`${styles.navPill} ${menuOpen ? styles.open : ''}`}
          hidden={hideNavLinks}
          aria-hidden={hideNavLinks}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.key}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={(e) => handleMenuItemClick(e, item.href, item.id)}
                data-motion-hover="nav"
              >
                {t(item.key)}
              </a>
            );
          })}
          <button className={styles.langBtn} type="button" onClick={toggleLanguage} data-motion-hover="button">
            {language === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
