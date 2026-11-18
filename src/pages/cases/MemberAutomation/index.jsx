import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { caseContent, screenshots } from "./content";
import { Narrative } from "./Narrative";
import styles from "./MemberAutomation.module.css";

const SECTION_ALIASES = { problem: "overview" };

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

function InterfaceImage({ slot, label, language, lazy = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={styles.imageWindow}
      style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
    >
      {failed ? (
        <span role="status" className={styles.imageFailure}>
          {language === "zh" ? `${slot.title}暂未加载。` : "Image unavailable."}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}images/member/${slot.id}-full.jpg`}
          alt={label}
          width={slot.width}
          height={slot.height}
          loading={lazy ? "lazy" : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

function ImageViewer({ view: { slot, label }, onClose, language }) {
  const dialog = useRef(null);
  const close = useRef(null);
  const imageArea = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = dialog.current;
    if (node.showModal) node.showModal();
    else node.setAttribute("open", "");
    close.current.focus();
    return () => {
      // Close before restoring focus so StrictMode's effect replay releases
      // the native modal's inert background before the next setup.
      if (node.open && node.showModal) node.close();
      else node.removeAttribute("open");
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      lang={language === "zh" ? "zh-CN" : "en"}
      aria-label={label}
      aria-modal="true"
      className={styles.imageDialog}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (
          event.target === event.currentTarget ||
          event.target === imageArea.current
        )
          onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
        if (event.key === "Tab") {
          event.preventDefault();
          close.current.focus();
        }
      }}
    >
      <button
        ref={close}
        type="button"
        className={styles.viewerClose}
        onClick={onClose}
        aria-label={language === "zh" ? "关闭大图" : "Close image"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="m6 6 12 12M18 6 6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div ref={imageArea} className={styles.viewerImage}>
        <div
          className={styles.viewerCanvas}
          style={{
            "--image-width": `${slot.width}px`,
            "--image-ratio": slot.width / slot.height,
          }}
        >
          <InterfaceImage slot={slot} label={label} language={language} />
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

function Screenshot({ slotId, language, onOpen, editorial = false }) {
  const slot = { ...screenshots[slotId], id: slotId };
  const zh = language === "zh";
  const label = zh ? slot.title : "Membership interface";
  const action = zh ? "放大截图" : "Enlarge screenshot";

  return (
    <figure
      className={
        editorial
          ? `${styles.evidence} ${styles.editorialEvidence}`
          : styles.evidence
      }
      data-visual-slot={slotId}
    >
      <button
        type="button"
        className={styles.imageButton}
        aria-label={`${action}：${label}`}
        title={action}
        onClick={() => onOpen({ slot, label })}
      >
        <InterfaceImage slot={slot} label={label} language={language} lazy />
      </button>
      <figcaption className={styles.imageCaption}>
        {zh ? (
          <>
            <strong>{label}</strong>
            <span>{slot.caption}</span>
          </>
        ) : (
          "Interface design; displayed data is fictional."
        )}
      </figcaption>
    </figure>
  );
}

function ChapterHeading({ section, index, language }) {
  if (language === "zh")
    return (
      <h2
        className={styles.caseHeading}
        id={`${section.id}-title`}
        tabIndex={-1}
      >
        {section.id === "solution"
          ? section.title.zh
          : section.title.zh
              .split(/(?<=，)/)
              .map((phrase) => <span key={phrase}>{phrase}</span>)}
      </h2>
    );

  return (
    <div className={styles.headingGroup}>
      <span className={styles.chapterIndex} aria-hidden="true">
        {index}
      </span>
      <div className={styles.headingCopy}>
        <p className={styles.chapterEyebrow} lang="en" aria-hidden="true">
          {section.title.en}
        </p>
        <h2 id={`${section.id}-title`} tabIndex={-1}>
          {section.title[language]}
        </h2>
      </div>
    </div>
  );
}

function RenderBlocks({ section, language, onOpen }) {
  return section[language].map((block, index) => {
    const key = `${section.id}-${index}`;
    if (block.type === "narrative")
      return (
        <Narrative
          key={key}
          kind={block.kind}
          evidence={(slotId) => (
            <Screenshot
              slotId={slotId}
              language={language}
              onOpen={onOpen}
              editorial
            />
          )}
        />
      );
    if (block.type === "paragraph")
      return (
        <p key={key} className={styles.paragraph}>
          <InlineText text={block.text} />
        </p>
      );
    if (block.type === "heading")
      return (
        <h3 key={key} className={styles.subheading}>
          {block.text}
        </h3>
      );
    if (block.type === "list")
      return (
        <ul key={key} className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    if (block.type === "roles")
      return (
        <div key={key} className={styles.roles} data-case-roles>
          <h3 className={styles.roleTitle}>
            {language === "zh" ? "我的职责与协作" : "My role & collaboration"}
          </h3>
          {caseContent.hero.roles[language].map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      );
    if (block.type === "screenshot")
      return (
        <Screenshot
          key={key}
          slotId={block.slotId}
          language={language}
          onOpen={onOpen}
        />
      );
    if (block.type === "pipeline")
      return (
        <ol
          key={key}
          className={styles.pipeline}
          aria-label="常规升级的规则判断链"
        >
          {block.items.map((step, i) => (
            <li key={step.title}>
              <span>{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      );
    if (block.type === "outcomes")
      return (
        <figure key={key} className={styles.outcomes} data-evidence="measured">
          <p className={styles.outcomeLabel}>{block.label}</p>
          <div className={styles.outcomeComparison}>
            <div>
              <span>改造前</span>
              <strong>{block.before}</strong>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <span>改造后</span>
              <strong>{block.after}</strong>
            </div>
          </div>
          <figcaption>{block.source}</figcaption>
        </figure>
      );
    // 仅用于保留的英文资料；中文采用上方已确认的实测口径。
    if (block.type === "table")
      return (
        <div key={key} className={styles.legacyTable}>
          {block.rows.map((row) => (
            <p key={row[0]}>{row.join(" · ")}</p>
          ))}
        </div>
      );
    return null;
  });
}
export default function MemberAutomationCase() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const { hash, key: locationKey } = useLocation();
  const previousHash = useRef(hash);
  const [activeSection, setActiveSection] = useState("overview");
  const [lightHeader, setLightHeader] = useState(false);
  const sections =
    language === "en" ? caseContent.legacySections : caseContent.sections;
  const focusSection = (id) => {
    const node = document.getElementById(SECTION_ALIASES[id] || id);
    node?.scrollIntoView?.({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    node?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (hash) focusSection(hash.slice(1));
    else if (previousHash.current) {
      window.scrollTo(0, 0);
      setActiveSection("overview");
    }
    previousHash.current = hash;
  }, [hash, locationKey]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 100) setActiveSection("overview");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cover = document.getElementById("case-cover");
    if (!cover || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setLightHeader(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const visible = new Set();
    let observer;
    const observe = () => {
      observer?.disconnect();
      visible.clear();
      const top = Math.min(96, Math.floor(window.innerHeight * 0.15));
      const bottom = Math.max(0, window.innerHeight - top - 128);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          });
          const current = [...sections]
            .reverse()
            .find((section) => visible.has(section.id));
          if (current) setActiveSection(current.id);
        },
        {
          rootMargin: "-" + top + "px 0px -" + bottom + "px 0px",
          threshold: 0,
        },
      );
      sections.forEach(({ id }) => {
        const node = document.getElementById(id);
        if (node) observer.observe(node);
      });
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [sections]);

  const [openImage, setOpenImage] = useState(null);
  const { pathname } = useLocation();
  const zh = language === "zh";
  const contentsClick = (event, id) => {
    if (
      hash === `#${id}` &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey &&
      event.button === 0
    ) {
      event.preventDefault();
      focusSection(id);
    }
    setActiveSection(id);
  };

  return (
    <article
      id="member-automation-page"
      className={zh ? `${styles.root} ${styles.caseStudy}` : styles.root}
      lang={zh ? "zh-CN" : "en"}
    >
      <header
        className={`${styles.topbar} ${lightHeader ? styles.lightHeader : ""}`}
      >
        <Link to="/" state={{ scrollTo: "portfolio" }} className={styles.back}>
          <span aria-hidden="true">←</span>{" "}
          {language === "zh" ? "返回作品" : "Back to work"}
        </Link>
        {zh && lightHeader && (
          <span className={styles.readerTitle}>
            {caseContent.hero.title.zh}
          </span>
        )}
        {englishEnabled && (
          <button
            type="button"
            className={styles.language}
            onClick={toggleLanguage}
            aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
        )}
      </header>
      <section
        id="case-cover"
        aria-labelledby="case-title"
        tabIndex={-1}
        className={styles.cover}
      >
        <div className={styles.coverInner} data-case-intro>
          <div className={styles.coverCopy}>
            <h1 id="case-title" tabIndex={-1} className={styles.title}>
              {caseContent.hero.title[language]}
            </h1>
            <p className={styles.summary}>
              {caseContent.hero.summary[language]}
            </p>
            {zh && (
              <>
                <dl className={styles.heroFacts}>
                  <div data-evidence="observed">
                    <dt>典型升级办理耗时</dt>
                    <dd>约 4–5 分钟 → 约 1 分钟</dd>
                    <dd className={styles.heroNote}>
                      对比调研中熟手老员工的耗时与上线后的典型场景观察（未做统一埋点计时）。
                    </dd>
                  </div>
                  <div>
                    <dt>推广范围</dt>
                    <dd>20+ 门店</dd>
                  </div>
                </dl>
                <p className={styles.heroRole}>
                  <strong>我的职责</strong> {caseContent.hero.role}
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <div className={styles.readerLayout}>
        <aside className={styles.toc}>
          <nav aria-label={language === "zh" ? "章节目录" : "Contents"}>
            {sections.map((section, index) => (
              <Link
                key={section.id}
                to={`${pathname}#${section.id}`}
                aria-current={
                  activeSection === section.id ? "location" : undefined
                }
                onClick={(event) => contentsClick(event, section.id)}
              >
                {!zh && <span>{index + 1}</span>}
                {language === "zh" ? section.navTitle : section.title.en}
              </Link>
            ))}
          </nav>
        </aside>
        <main className={styles.reading}>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              tabIndex={-1}
              className={styles.chapter}
            >
              <ChapterHeading
                section={section}
                index={index + 1}
                language={language}
              />
              <RenderBlocks
                section={section}
                language={language}
                onOpen={setOpenImage}
              />
              {language === "en" && index === 0 && (
                <div data-case-roles className={styles.roles}>
                  <h3 className={styles.roleTitle}>My role & collaboration</h3>
                  {caseContent.hero.roles.en.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              )}
            </section>
          ))}
          <footer id="reader-end" className={styles.footer}>
            <Link to="/" state={{ scrollTo: "portfolio" }}>
              {language === "zh" ? "返回作品" : "Back to work"}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </footer>
        </main>
      </div>
      {openImage && (
        <ImageViewer
          view={openImage}
          onClose={() => setOpenImage(null)}
          language={language}
        />
      )}
    </article>
  );
}
