import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { caseContent } from "./content";
import { media } from "./media";
import { Evidence, Lightbox } from "./Evidence";
import {
  ConversionRange,
  OldFlow,
  RecommendationScope,
  RoleRelay,
  Timeline,
} from "./visuals";
import styles from "./Orthodontics.module.css";

function ChapterHeading({ chapter, index }) {
  return (
    <header className={styles.chapterHead}>
      <div className={styles.chapterNumberWrap} aria-hidden="true">
        <span className={styles.chapterNumber}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className={styles.chapterCopy}>
        <p className={styles.chapterEyebrow} lang="en">
          {chapter.eyebrow}
        </p>
        <h2 tabIndex={-1} id={`${chapter.id}-title`}>
          {chapter.title}
        </h2>
        {chapter.kicker && (
          <p className={styles.chapterKicker}>{chapter.kicker}</p>
        )}
      </div>
    </header>
  );
}

const hashAliases = {
  overview: "case-cover",
  "case-introduction": "case-cover",
  problem: "challenge",
  thinking: "decision-1",
  solution: "decision-2",
  system: "decision-2",
  impact: "results",
};

const screeningBoxes = [
  { n: 1, x: 1.5, y: 10.5, w: 97, h: 46 },
  { n: 2, x: 1.5, y: 61, w: 97, h: 38 },
];

const nurseBoxes = [{ n: 2, x: 47, y: 27.5, w: 49, h: 45.5 }];
const nursePins = [{ n: 1, x: 3, y: 26.5 }];

const pedoBoxes = [
  { n: 1, x: 5, y: 16.5, w: 90, h: 14 },
  { n: 2, x: 5, y: 34.5, w: 90, h: 14 },
  { n: 3, x: 5, y: 56, w: 90, h: 19 },
  { n: 4, x: 5, y: 78, w: 90, h: 10 },
];

const conclusionBoxes = [
  { n: 1, x: 5, y: 14, w: 90, h: 12.8 },
  { n: 2, x: 5, y: 26.8, w: 90, h: 12.7 },
  { n: 3, x: 5, y: 58.5, w: 90, h: 29.5 },
];

const scanBoxes = [
  { n: 1, x: 3, y: 1.5, w: 95, h: 8.5 },
  { n: 2, x: 69, y: 7, w: 29, h: 79 },
];

export default function Orthodontics() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const zh = language === "zh";
  const copy = caseContent[language] || caseContent.zh;
  const location = useLocation();
  const trigger = useRef(null);
  const lightboxClose = useRef(null);
  const lightboxTrigger = useRef(null);
  const [active, setActive] = useState("challenge");
  const [lightHeader, setLightHeader] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 860px)").matches,
  );
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const chapters = copy.chapters;

  const chapter = (id) =>
    chapters.find((item) => item.id === id) || chapters[0];

  const openLightbox = (item, element) => {
    lightboxTrigger.current = element;
    setLightbox(item);
  };

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
    if (!lightbox) return;
    const previous = lightboxTrigger.current;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    lightboxClose.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [lightbox]);

  useEffect(() => {
    const requested = location.hash.slice(1);
    const id = hashAliases[requested] || requested;
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
    setActive(id === "case-cover" ? "challenge" : id);
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
        let id = "challenge";
        chapters.forEach((item) => {
          const node = document.getElementById(item.id);
          if (node && node.getBoundingClientRect().top <= top) id = item.id;
        });
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
      chapters.forEach(({ id }) => {
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
      const coverNode = document.getElementById("case-cover");
      if (coverNode) cover.observe(coverNode);

      const end = new IntersectionObserver(([entry]) => {
        if (disposed || revision !== currentRevision) return;
        atEnd = entry.isIntersecting;
        setActive(atEnd ? "reflection" : cursorId);
      });
      const endNode = document.getElementById("reader-end");
      if (endNode) end.observe(endNode);

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
  }, [language, mobile, chapters]);

  const navLabel = zh ? "章节目录" : "Contents";
  const links = (
    <nav aria-label={navLabel}>
      {chapters.map((item, index) => (
        <Link
          key={item.id}
          to={`/project/orthodontics#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
          onClick={() => {
            setOpen(false);
            setActive(item.id);
          }}
        >
          <span className={styles.navIndex}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{item.nav}</span>
        </Link>
      ))}
    </nav>
  );

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
          <p className={styles.coverEyebrow}>{copy.eyebrow}</p>
          <h1 tabIndex={-1} id="case-title" className={styles.title}>
            {copy.title}
          </h1>
          <p className={styles.coverLede}>{copy.lede}</p>
          <div className={styles.coverBottom}>
            <div className={styles.coverRole}>
              <span className={styles.coverLabel}>{copy.roleLabel}</span>
              <p>{copy.role}</p>
              <p className={styles.coverPeriod}>{copy.period}</p>
            </div>
            <dl className={styles.coverFacts}>
              {copy.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    <span className={styles.factValue}>{fact.value}</span>
                    {fact.unit && (
                      <span className={styles.factUnit}>{fact.unit}</span>
                    )}
                  </dt>
                  <dd>
                    <strong>{fact.label}</strong>
                    <span>{fact.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className={styles.coverNote}>{copy.coverNote}</p>
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
              {chapters.find((item) => item.id === active)?.nav}
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
            id="challenge"
            aria-labelledby="challenge-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("challenge")} index={0} />
            <p className={styles.lead}>{copy.challenge.lead}</p>
            <OldFlow
              flow={copy.challenge.flow}
              title={copy.challenge.flowTitle}
              note={copy.challenge.flowNote}
            />
            <div className={styles.problemGrid}>
              {copy.challenge.problems.map((problem, index) => (
                <div className={styles.problem} key={problem.title}>
                  <span className={styles.problemNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="decision-1"
            aria-labelledby="decision-1-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("decision-1")} index={1} />
            <p className={styles.lead}>{copy.decision1.lead}</p>
            <div className={styles.argumentBand}>
              {copy.decision1.arguments.map((argument, index) => (
                <div
                  className={styles.argument}
                  data-rule={index === 2 ? "true" : undefined}
                  key={argument.label}
                >
                  <span className={styles.argumentLabel}>{argument.label}</span>
                  <p>{argument.body}</p>
                </div>
              ))}
            </div>
            <RecommendationScope diagram={copy.decision1.diagram} />
            <Evidence
              image={media.screeningList}
              title={copy.decision1.evidenceTitle}
              alt={copy.decision1.evidenceAlt}
              note={copy.decision1.evidenceNote}
              annotations={copy.decision1.annotations}
              boxes={screeningBoxes}
              onZoom={openLightbox}
              scrollable
            />
            <aside className={styles.aside}>
              <span>{copy.decision1.asideTitle}</span>
              <p>{copy.decision1.aside}</p>
            </aside>
          </section>

          <section
            id="decision-2"
            aria-labelledby="decision-2-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("decision-2")} index={2} />
            <p className={styles.lead}>{copy.decision2.lead}</p>
            <div className={styles.judgmentBand}>
              <div>
                <span>{copy.decision2.problemTitle}</span>
                <p>{copy.decision2.problemBody}</p>
              </div>
              <div data-rule="true">
                <span>{copy.decision2.judgmentTitle}</span>
                <p>{copy.decision2.judgmentBody}</p>
              </div>
            </div>
            <RoleRelay
              roles={copy.decision2.roles}
              recordLabel={copy.decision2.recordLabel}
              note={copy.decision2.relayNote}
            />

            <div className={styles.roleBlock}>
              <div className={styles.roleRail}>
                <span className={styles.roleRailIndex} aria-hidden="true">
                  01
                </span>
                <span>{copy.decision2.nurse.label}</span>
              </div>
              <div className={styles.roleContent}>
                <h3>{copy.decision2.nurse.title}</h3>
                <p className={styles.prose}>{copy.decision2.nurse.body}</p>
                <Evidence
                  image={media.nurseCollection}
                  alt={copy.decision2.nurse.alt}
                  annotations={copy.decision2.nurse.annotations}
                  boxes={nurseBoxes}
                  pins={nursePins}
                  onZoom={openLightbox}
                  scrollable
                />
              </div>
            </div>

            <div className={styles.roleBlock}>
              <div className={styles.roleRail}>
                <span className={styles.roleRailIndex} aria-hidden="true">
                  02
                </span>
                <span>{copy.decision2.pedo.label}</span>
              </div>
              <div className={styles.roleContent}>
                <h3>{copy.decision2.pedo.title}</h3>
                <p className={styles.prose}>{copy.decision2.pedo.body}</p>
                <Evidence
                  image={media.pedoConfirm}
                  alt={copy.decision2.pedo.alt}
                  annotations={copy.decision2.pedo.annotations}
                  boxes={pedoBoxes}
                  onZoom={openLightbox}
                  className={styles.pedoEvidence}
                  scrollable
                />
              </div>
            </div>

            <div className={styles.roleBlock}>
              <div className={styles.roleRail}>
                <span className={styles.roleRailIndex} aria-hidden="true">
                  03
                </span>
                <span>{copy.decision2.ortho.label}</span>
              </div>
              <div className={styles.roleContent}>
                <h3>{copy.decision2.ortho.title}</h3>
                <p className={styles.prose}>{copy.decision2.ortho.body}</p>
                <Evidence
                  image={media.orthoQueue}
                  alt={copy.decision2.ortho.queueAlt}
                  note={copy.decision2.ortho.annotations[0].title}
                  onZoom={openLightbox}
                  scrollable
                />
                <div className={styles.conclusionRow}>
                  <Evidence
                    image={media.orthoConclusion}
                    alt={copy.decision2.ortho.conclusionAlt}
                    boxes={conclusionBoxes}
                    onZoom={openLightbox}
                    className={styles.conclusionFigure}
                  />
                  <dl className={styles.conclusionLegend}>
                    {copy.decision2.ortho.annotations.map((annotation) => (
                      <div key={annotation.n}>
                        <dt>
                          <span className={styles.legendNumber}>
                            {annotation.n}
                          </span>
                          {annotation.title}
                        </dt>
                        <dd>{annotation.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <p className={styles.iterationNote}>{copy.decision2.iteration}</p>
          </section>

          <section
            id="experience"
            aria-labelledby="experience-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("experience")} index={3} />
            <p className={styles.lead}>{copy.experience.lead}</p>

            <div className={styles.experienceBlock}>
              <h3>{copy.experience.scanTitle}</h3>
              <p className={styles.prose}>{copy.experience.scanBody}</p>
              <Evidence
                image={media.scanAnalysis}
                alt={copy.experience.scanAlt}
                annotations={copy.experience.scanAnnotations}
                boxes={scanBoxes}
                onZoom={openLightbox}
                scrollable
              />
            </div>

            <div className={styles.scienceRow}>
              <Evidence
                image={media.scienceModal}
                alt={copy.experience.scienceAlt}
                onZoom={openLightbox}
                className={styles.scienceFigure}
              />
              <div className={styles.scienceCopy}>
                <h3>{copy.experience.scienceTitle}</h3>
                <p className={styles.prose}>{copy.experience.scienceBody}</p>
              </div>
            </div>

            <div className={styles.reportBlock}>
              <h3>{copy.experience.reportTitle}</h3>
              <p className={styles.prose}>{copy.experience.reportBody}</p>
              <div className={styles.reportGrid}>
                <Evidence
                  image={media.reportPreview}
                  alt={copy.experience.reportPreviewAlt}
                  onZoom={openLightbox}
                  className={styles.reportPreviewFigure}
                />
                <div className={styles.reportPhones}>
                  <Evidence
                    image={media.reportCover}
                    alt={copy.experience.reportCoverAlt}
                    onZoom={openLightbox}
                    zoomImage={media.reportFull}
                    imageClassName={styles.phoneFrame}
                    className={styles.phoneFigure}
                  />
                  <div className={styles.reportStructure}>
                    <span>{copy.experience.reportStructureLabel}</span>
                    <ol>
                      {copy.experience.reportStructure.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <dl className={styles.reportLegend}>
                {copy.experience.reportAnnotations.map((annotation) => (
                  <div key={annotation.n}>
                    <dt>
                      <span className={styles.legendNumber}>{annotation.n}</span>
                      {annotation.title}
                    </dt>
                    <dd>{annotation.body}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.reportActions}>
                <p>{copy.experience.reportDisclaimer}</p>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={(event) =>
                    openLightbox(
                      {
                        ...media.reportFull,
                        title: copy.experience.reportTitle,
                        alt: copy.experience.reportCoverAlt,
                      },
                      event.currentTarget,
                    )
                  }
                >
                  {zh ? "查看完整报告 ↗" : "View the full report ↗"}
                </button>
              </div>
            </div>

            <details className={styles.supplement}>
              <summary>
                <span>{copy.experience.supplementTitle}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p className={styles.supplementNote}>
                {copy.experience.supplementNote}
              </p>
              <div className={styles.supplementGrid}>
                {copy.experience.supplement.map((item) => (
                  <Evidence
                    key={item.title}
                    image={media[item.image]}
                    alt={item.alt}
                    title={item.title}
                    note={item.body}
                    onZoom={openLightbox}
                    className={styles.supplementFigure}
                    scrollable
                  />
                ))}
              </div>
            </details>
          </section>

          <section
            id="results"
            aria-labelledby="results-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("results")} index={4} />
            <p className={styles.lead}>{copy.results.lead}</p>
            <Timeline items={copy.results.timeline} />
            <p className={styles.prose}>{copy.results.tracking}</p>
            <div className={styles.statBand}>
              {copy.results.stats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <p
                    className={
                      stat.value.length > 9
                        ? styles.statValueLong
                        : styles.statValue
                    }
                  >
                    {stat.value}
                    {stat.unit && <span>{stat.unit}</span>}
                  </p>
                  <h3>{stat.label}</h3>
                  <p>{stat.note}</p>
                </div>
              ))}
            </div>
            <ConversionRange
              before={copy.results.range.before}
              after={copy.results.range.after}
              title={copy.results.conversionTitle}
              definition={copy.results.conversionDefinition}
            />
            <p className={styles.caveat}>{copy.results.caveat}</p>
            <p className={styles.source}>{copy.results.source}</p>
          </section>

          <section
            id="reflection"
            aria-labelledby="reflection-title"
            tabIndex={-1}
            className={styles.chapter}
          >
            <ChapterHeading chapter={chapter("reflection")} index={5} />
            <div className={styles.reflectionGrid}>
              {copy.reflection.items.map((item, index) => (
                <div className={styles.reflectionItem} key={item.title}>
                  <span className={styles.problemNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <details className={styles.disclosure}>
              <summary>
                <span>{copy.reflection.disclosureTitle}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{copy.reflection.disclosure}</p>
            </details>
          </section>

          <footer id="reader-end" className={styles.footer}>
            <Link to="/" state={{ scrollTo: "portfolio" }}>
              {zh ? "返回作品" : "Back to work"}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </footer>
        </main>
      </div>

      <Lightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
        closeRef={lightboxClose}
      />
    </article>
  );
}
