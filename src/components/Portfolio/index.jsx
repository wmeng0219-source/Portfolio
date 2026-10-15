import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import HomeIcon from "../HomeIcon";

const projects = [
  { id: "member-automation", item: 1 },
  { id: "orthodontics", item: 2 },
  { id: "pacs-ai", item: 3 },
];

const Portfolio = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);

  // Measure the group after fonts/layout changes; never mix sticky and long-flow cards.
  useEffect(() => {
    const section = sectionRef.current;
    const cards = Array.from(
      section.querySelectorAll(".portfolio-showcase-card"),
    );
    const grid = section.querySelector(".portfolio-stage-grid");
    const head = section.querySelector(".portfolio-showcase-head");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let frame = null;
    const updateCover = () => {
      frame = null;
      if (!active) return;
      let progress = 0;
      if (head.dataset.coverEnabled === "true") {
        const rect = head.getBoundingClientRect();
        progress = Math.min(
          1,
          Math.max(
            0,
            (rect.bottom - grid.getBoundingClientRect().top) /
              Math.max(1, rect.height),
          ),
        );
      }
      head.style.setProperty("--head-opacity", String(1 - progress));
      head.style.setProperty("--head-y", `${-36 * progress}px`);
    };
    const scheduleCover = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateCover);
    };
    const measure = () => {
      if (!active) return;
      const eligible =
        window.innerWidth >= 861 &&
        window.innerHeight >= 700 &&
        !reduce.matches;
      const highest = Math.max(...cards.map((card) => card.offsetHeight));
      const base = Math.min(96, window.innerHeight - highest - 16);
      const navBottom =
        document.querySelector(".home-nav-shell")?.getBoundingClientRect()
          .bottom ?? 70;
      const enabled =
        eligible &&
        base >= navBottom + 2 &&
        cards.every(
          (card, index) =>
            base + index * 8 + card.offsetHeight <= window.innerHeight,
        );
      grid.dataset.stackEnabled = String(enabled);
      head.dataset.coverEnabled = String(
        eligible && head.offsetHeight <= window.innerHeight - 96 - 16,
      );
      cards.forEach((card, index) => {
        if (enabled) {
          card.style.setProperty("--folder-top", `${base + index * 8}px`);
          card.style.setProperty("--folder-layer", String(index + 1));
        } else {
          card.style.removeProperty("--folder-top");
          card.style.removeProperty("--folder-layer");
        }
      });
      scheduleCover();
    };
    const observer =
      typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    cards.forEach((card) => observer?.observe(card));
    observer?.observe(head);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", scheduleCover, { passive: true });
    reduce.addEventListener?.("change", measure);
    document.fonts?.ready.then(measure);
    measure();
    return () => {
      active = false;
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", scheduleCover);
      reduce.removeEventListener?.("change", measure);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [language]);

  return (
    <section
      className="portfolio-showcase page-section"
      id="portfolio"
      ref={sectionRef}
    >
      <div className="section-shell">
        <div className="portfolio-showcase-head">
          <div className="portfolio-head-copy">
            <div>
              <span className="portfolio-showcase-kicker">
                {t("portfolio.stage.kicker")}
              </span>
              <h2 className="portfolio-showcase-title">
                {t("portfolio.stage.title")}
              </h2>
            </div>
            <p className="portfolio-showcase-intro">
              {t("portfolio.stage.intro")}
            </p>
          </div>
        </div>
        <div className="portfolio-stage-grid">
          {projects.map(({ id, item }) => (
            <Link
              to={`/project/${id}`}
              className="portfolio-showcase-card"
              key={id}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) {
                  event.currentTarget.scrollIntoView?.({
                    behavior: "instant",
                    block: "start",
                  });
                }
              }}
            >
              <div className="portfolio-showcase-visual">
                <div
                  className="home-image-placeholder"
                  role="img"
                  aria-label={t(`portfolio.item.${item}.imageLabel`)}
                >
                  <HomeIcon name="image" />
                  <span className="home-image-caption">
                    {t("portfolio.imagePending")}
                  </span>
                </div>
              </div>
              <div className="portfolio-showcase-body">
                <h3 className="portfolio-showcase-card-title">
                  {t(`portfolio.item.${item}.title`)}
                </h3>
                <p className="portfolio-showcase-problem">
                  {t(`portfolio.item.${item}.problem`)}
                </p>
                <span className="home-case-cta">
                  {t("portfolio.viewCase")}{" "}
                  <HomeIcon name="external" className="home-icon-external" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
