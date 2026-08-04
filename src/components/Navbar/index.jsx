import React, { useEffect, useMemo, useRef, useState } from 'react';
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
      { key: 'nav.about', href: '#about', label: 'Work' },
      { key: 'nav.experience', href: '#experience', label: 'About' },
      { key: 'nav.portfolio', href: '#portfolio', label: 'Resume' },
      { key: 'nav.contact', href: '#contact', label: 'Contact' },
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
    scrollToHashTarget(event.currentTarget.getAttribute('href'));
    if (isMobileViewport) {
      shouldRestoreFocusRef.current = true;
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    scrollToHashTarget('#hero');
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
    <header className="fixed top-0 left-0 w-full z-50 px-margin-mobile md:px-margin-desktop py-8 pointer-events-none">
      <div className="max-w-container-max mx-auto flex items-center justify-center relative">
        {/* Left MW Badge */}
        <div className="absolute left-0 pointer-events-auto bg-[rgba(13,12,17,0.82)] backdrop-blur-[16px] border border-[#2a2833] px-4 py-2 rounded-full hidden md:block">
          <a href="#hero" onClick={handleLogoClick} className="font-label-caps text-[14px] tracking-widest text-[#ece9f1] no-underline">
            MW
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          ref={menuButtonRef}
          className="pointer-events-auto md:hidden absolute right-0 bg-[rgba(13,12,17,0.82)] backdrop-blur-[16px] border border-[#2a2833] p-2.5 rounded-full text-[#ece9f1]"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
          onClick={() => {
            shouldRestoreFocusRef.current = false;
            setMenuOpen((current) => !current);
          }}
        >
          <span className="material-symbols-outlined text-lg">{menuOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Centered Desktop Nav Pill / Mobile Nav Drawer */}
        <nav
          id="primary-navigation"
          className={`pointer-events-auto bg-[rgba(13,12,17,0.82)] backdrop-blur-[16px] border border-[#2a2833] rounded-full px-8 py-2.5 flex items-center gap-8 ${
            isMobileViewport
              ? `fixed top-24 right-6 flex-col items-start p-6 bg-[#16151c]/95 rounded-[16px] ${
                  menuOpen ? 'flex' : 'hidden'
                }`
              : 'flex'
          }`}
          hidden={hideNavLinks}
          aria-hidden={hideNavLinks}
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={handleMenuItemClick}
              data-motion-hover="nav"
              className="font-label-caps text-[14px] text-[#a39fb0] hover:text-[#d0bcff] transition-all duration-300 no-underline uppercase tracking-wider"
            >
              {t(item.key)}
            </a>
          ))}
          <button
            className="text-xs font-label-caps border border-[#2a2833] px-3.5 py-1 rounded-full text-[#a39fb0] hover:text-[#d0bcff] transition-all"
            type="button"
            onClick={toggleLanguage}
            data-motion-hover="button"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
