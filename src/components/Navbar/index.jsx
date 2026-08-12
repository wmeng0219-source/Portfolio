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
  const headerRef = useRef(null);
  const progressBarRef = useRef(null);
  const shouldRestoreFocusRef = useRef(false);

  const navItems = useMemo(
    () => [
      { key: 'nav.portfolio', href: '#portfolio', label: 'Work' },
      { key: 'nav.about', href: '#about', label: 'Method' },
      { key: 'nav.experience', href: '#experience', label: 'Path' },
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

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileViewport && menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileViewport, menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'portfolio', 'about', 'experience', 'contact'];
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

  // 顶部滚动进度条 + 滚动后加深导航玻璃底（仅 transform，无布局抖动）
  useEffect(() => {
    const bar = progressBarRef.current;
    const headerEl = headerRef.current;
    if (!bar || !headerEl) {
      return undefined;
    }

    let rafId = null;
    const update = () => {
      rafId = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
      headerEl.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false';
    };
    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
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
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-margin-mobile md:px-margin-desktop py-4 md:py-5 pointer-events-none">
      {/* Scroll progress */}
      <div className="nav-progress" aria-hidden="true">
        <div className="nav-progress-bar" ref={progressBarRef} />
      </div>
      <div className="max-w-container-max mx-auto flex items-center justify-center relative">
        {/* Left MW Badge */}
        <div className="nav-glass absolute left-0 pointer-events-auto bg-[var(--color-glass)] backdrop-blur-[16px] border border-[var(--color-border)] px-4 py-2 rounded-full hidden md:block">
          <a href="#hero" onClick={handleLogoClick} className="font-label-caps text-[14px] tracking-widest text-[var(--color-text-primary)] no-underline">
            MW
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          ref={menuButtonRef}
          className="nav-glass pointer-events-auto md:hidden absolute right-0 bg-[var(--color-glass)] backdrop-blur-[16px] border border-[var(--color-border)] p-2.5 rounded-full text-[var(--color-text-primary)]"
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
          className={`nav-glass pointer-events-auto bg-[var(--color-glass)] backdrop-blur-[16px] border border-[var(--color-border)] rounded-full px-8 py-2.5 flex items-center gap-8 ${
            isMobileViewport
              ? `fixed top-16 right-4 sm:right-6 flex-col items-start p-6 bg-[var(--color-bg-secondary)]/95 rounded-[16px] shadow-2xl ${
                  menuOpen ? 'flex' : 'hidden'
                }`
              : 'flex'
          }`}
          hidden={hideNavLinks}
          aria-hidden={hideNavLinks}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={handleMenuItemClick}
                data-motion-hover="nav"
                className={`font-label-caps text-[14px] transition-all duration-300 no-underline uppercase tracking-wider ${
                  isActive ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
          <button
            className="text-xs font-label-caps border border-[var(--color-border)] px-3.5 py-1 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-all"
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
