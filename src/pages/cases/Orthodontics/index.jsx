import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { caseContent } from "./content";
import {
  RecommendationScope,
  RoleFlow,
  PeriodComparison,
  WorkflowComparison,
  TrackingStages,
  RolloutEvidence,
} from "./visuals";
import styles from "./Orthodontics.module.css";

function Text({ children }) {
  return children
    .split(/(\*\*.*?\*\*)/)
    .map((text, i) =>
      text.startsWith("**") ? (
        <strong key={i}>{text.slice(2, -2)}</strong>
      ) : (
        text
      ),
    );
}

const chapterLabels = {
  overview: ["PROJECT OVERVIEW", "CONTEXT & SCOPE"],
  problem: ["PROBLEM ANALYSIS", "CONTEXT & FRICTION"],
  thinking: ["DESIGN DECISIONS", "DESIGN DECISIONS"],
  solution: ["WORKFLOW DESIGN", "WORKFLOW DESIGN"],
  impact: ["BUSINESS OUTCOMES", "BUSINESS OUTCOMES"],
  reflection: ["LESSONS LEARNED", "LESSONS LEARNED"],
};

function ChapterHeading({ section, index, zh }) {
  return (
    <div className={styles.headingGroup}>
      <span className={styles.chapterIndex} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className={styles.headingCopy}>
        <p className={styles.chapterEyebrow} lang="en" aria-hidden="true">
          {chapterLabels[section.id][zh ? 0 : 1]}
        </p>
        <h2 tabIndex={-1} id={`${section.id}-title`}>
          {section.title}
        </h2>
      </div>
    </div>
  );
}

export default function Orthodontics() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const zh = language === "zh";
  const content = caseContent[language];
  const location = useLocation();
  const trigger = useRef(null);
  const [active, setActive] = useState("overview");
  const [lightHeader, setLightHeader] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 860px)").matches,
  );
  const [open, setOpen] = useState(false);
  const sections = content.sections;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 860px)");
    const update = () => {
      setMobile(query.matches);
      setOpen(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const requested = location.hash.slice(1);
    const id =
      requested === "system"
        ? "solution"
        : requested === "case-introduction"
          ? "overview"
          : requested;
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView?.({
      behavior: reduce ? "instant" : "smooth",
      block: "start",
    });
    (target.querySelector("h1, h2") || target).focus({ preventScroll: true });
    setActive(id);
    setOpen(false);
  }, [location.hash, location.key]);

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return;
    let observers = [];
    let disposed = false;
    let revision = 0;
    const observe = () => {
      if (disposed) return;
      observers.forEach((observer) => observer.disconnect());
      const top = mobile ? 132 : 100;
      const currentRevision = ++revision;
      const currentChapter = () => {
        let id = "overview";
        for (const section of sections) {
          const node = document.getElementById(section.id);
          if (node && node.getBoundingClientRect().top <= top) id = section.id;
        }
        return id;
      };
      let cursorId = currentChapter();
      setActive(cursorId);
      let atEnd = false;
      const cursor = new IntersectionObserver(
        (entries) => {
          if (disposed || revision !== currentRevision) return;
          const entry = entries.find((item) => item.isIntersecting);
          cursorId = entry
            ? entry.target.dataset.chapter || entry.target.id
            : currentChapter();
          if (!atEnd) setActive(cursorId);
        },
        {
          rootMargin: `-${top}px 0px -${Math.max(0, window.innerHeight - top - 1)}px 0px`,
        },
      );
      sections.forEach(({ id }) => {
        const node = document.getElementById(id);
        if (node) cursor.observe(node);
      });
      const cover = new IntersectionObserver(
        ([entry]) => {
          if (!disposed && revision === currentRevision)
            setLightHeader(!entry.isIntersecting);
        },
        { rootMargin: "-64px 0px 0px 0px" },
      );
      cover.observe(document.getElementById("case-cover"));
      const end = new IntersectionObserver(([entry]) => {
        if (disposed || revision !== currentRevision) return;
        atEnd = entry.isIntersecting;
        setActive(atEnd ? "reflection" : cursorId);
      });
      end.observe(document.getElementById("reader-end"));
      observers = [cursor, cover, end];
    };
    observe();
    window.addEventListener("resize", observe);
    document.fonts?.ready.then(observe);
    return () => {
      disposed = true;
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("resize", observe);
    };
  }, [language, mobile, sections]);

  const navLabel = zh ? "章节目录" : "Contents";
  const links = (
    <nav aria-label={navLabel}>
      {sections.map((section, i) => (
        <Link
          key={section.id}
          to={`/project/orthodontics#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
          onClick={() => {
            setOpen(false);
            setActive(section.id);
          }}
        >
          <span className={styles.navIndex}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{section.title}</span>
        </Link>
      ))}
    </nav>
  );
  const visuals = {
    "thinking-2": <RecommendationScope zh={zh} />,
    "solution-2": <RoleFlow zh={zh} />,
    "impact-2": <PeriodComparison zh={zh} />,
    "impact-0": <TrackingStages zh={zh} />,
    "impact-1": <RolloutEvidence zh={zh} />,
  };
  const overview = sections[0];

  return (
    <article
      id="orthodontics-page"
      className={`${styles.root} ${!zh ? styles.english : ""}`}
    >
      <header
        className={`${styles.topbar} ${lightHeader ? styles.lightHeader : ""}`}
      >
        <Link to="/" state={{ scrollTo: "portfolio" }} className={styles.back}>
          <span aria-hidden="true">←</span>
          {zh ? "返回作品" : "Back to work"}
        </Link>
        {englishEnabled && (
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={zh ? "Switch to English" : "切换到中文"}
          >
            {zh ? "EN" : "中文"}
          </button>
        )}
      </header>
      <section
        id="case-cover"
        aria-labelledby="case-title"
        tabIndex={-1}
        className={styles.cover}
      >
        <div className={styles.coverInner}>
          <p className={styles.eyebrow}>
            {zh ? "项目概览" : "Project Overview"}
          </p>
          <h1 tabIndex={-1} id="case-title" className={styles.title}>
            {content.title}
          </h1>
          <p className={styles.lede}>
            {zh
              ? sections[3].lead[0]
              : sections[3].lead[0]
                  .replace(/^\*\*Overall solution: |\*\*$/g, "")
                  .replace(/^connect/, "Connect")}
          </p>
          <div className={styles.metadata}>
            <span>
              {zh
                ? "门诊调研 / 产品规则 / 交互与界面设计"
                : "Clinic research / Product rules / Interaction & interface design"}
            </span>
            <span>
              {zh
                ? "2025.04 - 2026.02 / 开发至推广"
                : "2025.04 - 2026.02 / Development to rollout"}
            </span>
          </div>
          <p className={styles.summary}>
            <Text>{overview.lead[2]}</Text>
          </p>
        </div>
      </section>
      {mobile && (
        <div
          className={styles.mobileToc}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-contents"
            onClick={() => setOpen(!open)}
          >
            <span>{navLabel}</span>
            <span>
              {sections.find((s) => s.id === active)?.title}
              <span aria-hidden="true">{open ? " −" : " +"}</span>
            </span>
          </button>
          <div id="mobile-contents" hidden={!open}>
            {links}
          </div>
        </div>
      )}
      <div className={styles.readerLayout}>
        {!mobile && <aside className={styles.toc}>{links}</aside>}
        <main className={styles.reading}>
          <section
            id="overview"
            aria-labelledby="overview-title"
            tabIndex={-1}
            className={styles.introduction}
          >
            <ChapterHeading section={overview} index={0} zh={zh} />
            <div data-case-intro>
              {overview.lead.slice(0, 2).map((p, i) => (
                <p key={i} className={styles.prose}>
                  <Text>{p}</Text>
                </p>
              ))}
            </div>
            <div data-case-roles>
              <h3 id="roles-title" className={styles.roleTitle}>
                {overview.groups[0].title}
              </h3>
              {overview.groups[0].paragraphs.map((p, i) => (
                <p key={i} className={styles.prose}>
                  <Text>{p}</Text>
                </p>
              ))}
            </div>
            <h3 className={styles.roleTitle}>{overview.groups[1].title}</h3>
            {overview.groups[1].paragraphs.map((p, i) => (
              <p key={i} className={styles.prose}>
                <Text>{p}</Text>
              </p>
            ))}
          </section>
          {sections.slice(1).map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
              tabIndex={-1}
              className={styles.chapter}
            >
              <ChapterHeading section={section} index={index + 1} zh={zh} />
              {section.lead.map((p, i) => (
                <p
                  className={`${styles.prose} ${i === 0 ? styles.chapterLead : ""}`}
                  key={i}
                >
                  <Text>{p}</Text>
                </p>
              ))}

              {section.id === "problem" && <WorkflowComparison zh={zh} />}

              {section.groups.map((group, i) => (
                <div
                  className={styles.narrativeGroup}
                  key={group.title}
                  data-evidence={
                    section.id === "impact" && i === 1
                      ? "cumulative"
                      : undefined
                  }
                >
                  <h3>{group.title}</h3>
                  {group.paragraphs.map((p, j) => (
                    <p className={styles.prose} key={j}>
                      <Text>{p}</Text>
                    </p>
                  ))}
                  {section.id === "impact" && i === 1 && (
                    <p className={styles.source}>
                      {zh
                        ? "来源：内部累计统计。18,460 条为提交结论记录，不等同于独立患者人数；汇总量不能证明每家门店均已采纳。"
                        : "Source: internal cumulative statistics. The 18,460 submitted conclusion records are not a count of unique patients; the total does not prove adoption in every clinic."}
                    </p>
                  )}
                  {visuals[`${section.id}-${i}`]}
                </div>
              ))}
            </section>
          ))}
          <footer id="reader-end" className={styles.footer}>
            <Link to="/" state={{ scrollTo: "portfolio" }}>
              {zh ? "返回作品" : "Back to work"}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </footer>
        </main>
      </div>
    </article>
  );
}
