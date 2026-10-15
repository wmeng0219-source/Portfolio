import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HomeIcon from "../HomeIcon";

const scrollToSection = (event, id) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
};

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    let inView = true;
    const updateMotion = () => {
      hero.dataset.backgroundActive = String(inView && !document.hidden);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            updateMotion();
          })
        : null;
    observer?.observe(hero);
    document.addEventListener("visibilitychange", updateMotion);
    updateMotion();
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateMotion);
    };
  }, []);

  return (
    <section className="home-hero" id="hero" ref={heroRef}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="home-hero-copy">
        <h1 className="hero-display-title" tabIndex={-1} aria-label="WEN MENG">
          <span>WEN</span> <span>MENG</span>
        </h1>
        <p className="hero-lede">{t("hero.body")}</p>
      </div>
      <a
        className="home-scroll-cue"
        href="#experience"
        onClick={(event) => scrollToSection(event, "experience")}
      >
        <span>{t("hero.scrollHint")}</span>
        <HomeIcon name="down" />
      </a>
    </section>
  );
};

export default Hero;
