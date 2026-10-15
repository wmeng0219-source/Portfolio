import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HomeIcon from "../HomeIcon";

const MOBILE_NAV_MEDIA_QUERY = "(max-width: 767px)";
const sectionIds = ["hero", "experience", "portfolio", "contact"];
const navItems = [
  { key: "nav.experience", href: "#experience" },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.contact", href: "#contact" },
];

const getIsMobileViewport = () =>
  window.matchMedia?.(MOBILE_NAV_MEDIA_QUERY).matches ?? false;

const scrollToHashTarget = (href) => {
  if (!href?.startsWith("#")) return;
  document.getElementById(href.slice(1))?.scrollIntoView({
    behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
};

const Navbar = () => {
  const { t, language, toggleLanguage, englishEnabled } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [heroTitleGone, setHeroTitleGone] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport);
  const menuButtonRef = useRef(null);
  const headerRef = useRef(null);
  const progressBarRef = useRef(null);
  const shouldRestoreFocusRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia?.(MOBILE_NAV_MEDIA_QUERY);
    if (!media) return undefined;
    const update = (event) => {
      setIsMobileViewport(event.matches);
      if (!event.matches) setMenuOpen(false);
    };
    update(media);
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isMobileViewport || !menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      shouldRestoreFocusRef.current = true;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileViewport, menuOpen]);

  // One reading line drives section state, scroll-cue visibility, and progress.
  useEffect(() => {
    let alive = true;
    let rafId = null;
    const update = () => {
      rafId = null;
      if (!alive) return;
      // Anchors stop at 96px; allow a small margin for fractional layout pixels.
      const readingLine = Math.max(
        100,
        (headerRef.current?.getBoundingClientRect().bottom ?? 70) + 24,
      );
      let current = "hero";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine)
          current = id;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (
        max > 0 &&
        window.scrollY >= max - 2 &&
        document.getElementById("contact")
      )
        current = "contact";
      const title = document.querySelector("#hero .hero-display-title");
      setActiveSection(current);
      setHeroTitleGone(
        Boolean(title && title.getBoundingClientRect().bottom <= 0),
      );
      const progress =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (progressBarRef.current)
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      if (headerRef.current)
        headerRef.current.dataset.scrolled = String(window.scrollY > 24);
    };
    const schedule = () => {
      if (alive && rafId === null) rafId = window.requestAnimationFrame(update);
    };
    const observer =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(schedule)
        : null;
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer?.observe(section);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    update();
    return () => {
      alive = false;
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [language]);

  const navigate = (event) => {
    event.preventDefault();
    scrollToHashTarget(event.currentTarget.getAttribute("href"));
    if (
      event.currentTarget.classList.contains("home-nav-brand") &&
      event.detail === 0
    ) {
      document
        .querySelector("#hero .hero-display-title")
        ?.focus({ preventScroll: true });
    }
    if (isMobileViewport && menuOpen) shouldRestoreFocusRef.current = true;
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
    <header
      ref={headerRef}
      className="home-nav-header"
      data-hero-title-gone={heroTitleGone}
    >
      <div className="nav-progress" aria-hidden="true">
        <div className="nav-progress-bar" ref={progressBarRef} />
      </div>
      <a
        href="#hero"
        onClick={navigate}
        className="home-nav-brand"
        hidden={!heroTitleGone}
      >
        WEN MENG
      </a>
      <div className="home-nav-shell">
        {isMobileViewport && (
          <button
            ref={menuButtonRef}
            className="home-nav-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            onClick={() => {
              shouldRestoreFocusRef.current = false;
              setMenuOpen((open) => !open);
            }}
          >
            <HomeIcon
              name={menuOpen ? "close" : "menu"}
              className="home-icon-control"
            />
          </button>
        )}
        <nav
          id="primary-navigation"
          className="home-nav-menu"
          hidden={hideNavLinks}
          aria-hidden={hideNavLinks}
        >
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={navigate}
              className="home-nav-link"
              aria-current={
                activeSection === item.href.slice(1) ? "location" : undefined
              }
            >
              {t(item.key)}
            </a>
          ))}
          {englishEnabled && (
            <button
              className="home-nav-language"
              type="button"
              onClick={toggleLanguage}
            >
              {language === "zh" ? "EN" : "中文"}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
