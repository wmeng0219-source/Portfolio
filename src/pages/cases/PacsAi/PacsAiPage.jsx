import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { pacsCaseSections, pacsVisualSlots } from "./content";
import styles from "./PacsAi.module.css";
import {
  ChapterHeading,
  RuleDiagram,
  ReviewDiagram,
  SystemFlow,
} from "./visuals";

function InlineText({ text }) {
  return text
    .split(/(\*\*.*?\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

function EvidencePlaceholder({ slotId, language, compact = false }) {
  if (
    [
      "record-sync",
      "reuse-module",
      "timeout-fallback",
      "image-classification",
    ].includes(slotId)
  ) {
    return <RuleDiagram slotId={slotId} language={language} />;
  }
  const slot = pacsVisualSlots[slotId];
  return (
    <figure
      className={[
        styles.readingEvidence,
        compact ? styles.readingEvidenceCompact : "",
      ].join(" ")}
      data-visual-slot={slotId}
    >
      <div
        className={styles.readingEvidenceFrame}
        role="img"
        aria-label={slot.title[language]}
      >
        <span>{language === "zh" ? "素材准备中" : "Image pending"}</span>
        <strong>{slot.title[language]}</strong>
      </div>
      <figcaption>{slot.brief[language]}</figcaption>
    </figure>
  );
}

function ReadingTable({ block, metrics = false }) {
  if (metrics) {
    return (
      <dl className={styles.readingMetrics}>
        {block.rows.map(([value, meaning]) => (
          <div key={value}>
            <dt>
              <InlineText text={value} />
            </dt>
            <dd>
              <InlineText text={meaning} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <div className={styles.readingTableWrap}>
      <table className={styles.readingTable}>
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map(([label, detail]) => (
            <tr key={label}>
              <th scope="row">
                <InlineText text={label} />
              </th>
              <td>
                <InlineText text={detail} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReadingBlocks({ section, language }) {
  return section[language].map((block, index) => {
    let element;
    const visualSlot = block.visualSlot;
    if (visualSlot === "doctor-review") {
      element = <ReviewDiagram block={block} language={language} />;
    } else if (block.type === "heading") {
      const Heading = block.level === 3 ? "h3" : "h4";
      element = (
        <Heading
          id={block.anchor}
          tabIndex={block.anchor ? -1 : undefined}
          className={styles.readingSubheading}
        >
          {block.text}
        </Heading>
      );
    } else if (block.type === "paragraph") {
      element = (
        <p
          className={
            block.variant === "target"
              ? styles.readingTarget
              : styles.readingParagraph
          }
        >
          <InlineText text={block.text} />
        </p>
      );
    } else if (block.type === "list") {
      element = (
        <ul
          className={[
            styles.readingList,
            section.id === "impact" ? styles.readingCapabilities : "",
          ].join(" ")}
        >
          {block.items.map((item, itemIndex) => (
            <li key={item}>
              <InlineText text={item} />
              {block.relatedSolutions?.[itemIndex] && (
                <Link
                  to={"#solution-" + block.relatedSolutions[itemIndex]}
                  className={styles.readingSolutionLink}
                >
                  4.{block.relatedSolutions[itemIndex]} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      );
    } else if (block.type === "table") {
      element = (
        <ReadingTable block={block} metrics={section.id === "impact"} />
      );
    } else if (block.type === "flow") {
      element = <SystemFlow steps={block.steps} language={language} />;
    }
    return (
      <Fragment key={section.id + "-" + index}>
        {element}
        {block.relatedSolution && (
          <Link
            to={"#solution-" + block.relatedSolution}
            className={styles.readingSolutionLink}
          >
            4.{block.relatedSolution} →
          </Link>
        )}
        {visualSlot && visualSlot !== "doctor-review" && (
          <EvidencePlaceholder
            slotId={visualSlot}
            language={language}
            compact={[
              "doctor-review",
              "timeout-fallback",
              "reuse-module",
            ].includes(visualSlot)}
          />
        )}
      </Fragment>
    );
  });
}

export default function PacsAiCase() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const { hash, key: locationKey } = useLocation();
  const previousHash = useRef(hash);
  const [activeSection, setActiveSection] = useState("overview");
  const [lightHeader, setLightHeader] = useState(false);
  const [overview, ...sections] = pacsCaseSections;
  const [title, summary, ...roles] = overview[language];

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      target?.scrollIntoView?.({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      (document.getElementById(id + "-title") || target)?.focus({
        preventScroll: true,
      });
    } else if (previousHash.current) window.scrollTo(0, 0);
    previousHash.current = hash;
  }, [hash, locationKey]);

  useEffect(() => {
    let frame;
    const update = () => {
      frame = undefined;
      const cover = document.getElementById("case-cover");
      setLightHeader(
        cover ? cover.getBoundingClientRect().bottom <= 64 : false,
      );
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const visible = new Set();
    let observer;
    const observeSections = () => {
      observer?.disconnect();
      visible.clear();
      // Percentage root margins use width, so use height-based pixels instead.
      const top = Math.min(96, Math.floor(window.innerHeight * 0.15));
      const bottom = Math.max(0, window.innerHeight - top - 128);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          });
          const current = [...pacsCaseSections]
            .reverse()
            .find((section) => visible.has(section.id));
          if (current) setActiveSection(current.id);
        },
        {
          rootMargin: "-" + top + "px 0px -" + bottom + "px 0px",
          threshold: 0,
        },
      );
      pacsCaseSections.forEach(({ id }) => {
        const node = document.getElementById(id);
        if (node) observer.observe(node);
      });
    };
    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, []);

  return (
    <article
      id="pacs-page"
      className={styles.readingRoot}
      lang={language === "zh" ? "zh-CN" : "en"}
    >
      <header
        className={`${styles.readingTopbar} ${lightHeader ? styles.lightHeader : ""}`}
      >
        <Link
          to="/"
          state={{ scrollTo: "portfolio" }}
          className={styles.readingBack}
        >
          ← {language === "zh" ? "返回首页" : "Back to Home"}
        </Link>
        {englishEnabled && (
          <button
            onClick={toggleLanguage}
            className={styles.readingLanguage}
            aria-label={language === "zh" ? "Switch to English" : "切换为中文"}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
        )}
      </header>
      <section
        id="case-cover"
        tabIndex={-1}
        aria-labelledby="case-title"
        className={styles.readingOverview}
      >
        <div className={styles.readingHero} data-case-intro>
          <p className={styles.coverEyebrow}>{overview.title[language]}</p>
          <h1 id="case-title" className={styles.readingTitle}>
            <span className={styles.readingLatin}>PACS</span>
            {title.text.slice(4)}
          </h1>
          <p className={styles.readingSummary}>{summary.text}</p>
        </div>
      </section>
      <main className={styles.readingPage} data-case-reader>
        <div className={styles.readingBody}>
          <aside className={styles.readingSidebar}>
            <nav
              aria-label={language === "zh" ? "章节目录" : "Contents"}
              className={styles.readingContents}
            >
              {pacsCaseSections.map((section, index) => (
                <Link
                  key={section.id}
                  to={"#" + section.id}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                  onClick={() => {
                    setActiveSection(section.id);
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title[language]}
                </Link>
              ))}
            </nav>
          </aside>
          <div className={styles.readingArticles}>
            <section
              id="overview"
              tabIndex={-1}
              aria-labelledby="overview-title"
              className={styles.readingSection}
            >
              <ChapterHeading
                index={1}
                id="overview-title"
                eyebrow="PROJECT OVERVIEW"
                title={
                  language === "zh"
                    ? "我的职责与协作"
                    : "My role & collaboration"
                }
              />
              <div className={styles.readingRoles} data-case-roles>
                {roles.map((role) => (
                  <p key={role.text}>{role.text}</p>
                ))}
              </div>
              <EvidencePlaceholder slotId="workspace" language={language} />
            </section>
            {sections.map((section, index) => (
              <section
                id={section.id}
                tabIndex={-1}
                key={section.id}
                aria-labelledby={section.id + "-title"}
                className={styles.readingSection}
              >
                <ChapterHeading
                  index={index + 2}
                  id={section.id + "-title"}
                  eyebrow={
                    [
                      "PROBLEM",
                      "PRODUCT THINKING",
                      "SOLUTION",
                      "SYSTEM",
                      "IMPACT",
                      "REFLECTION",
                    ][index]
                  }
                  title={section.title[language]}
                />
                {section.id === "problem" && (
                  <SystemFlow
                    original
                    language={language}
                    steps={
                      language === "zh"
                        ? ["预习推荐拍片", "拍片", "医生看图、向家长讲解"]
                        : [
                            "Pre-visit imaging recommendation",
                            "Image capture",
                            "Review and explanation to parents",
                          ]
                    }
                  />
                )}
                <ReadingBlocks section={section} language={language} />
                {section.id === "system" && (
                  <EvidencePlaceholder
                    slotId="image-classification"
                    language={language}
                    compact
                  />
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </article>
  );
}
