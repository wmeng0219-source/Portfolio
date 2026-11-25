import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { caseContent as copy } from "./content";
import { Evidence, Lightbox } from "../Orthodontics/Evidence";
import { useCaseMotion } from "../Orthodontics/motion";
import { CaseReaderHeader } from "../shared/CaseReaderHeader";
import {
  Flow,
  WorkbenchAnnotations,
  ReuseMechanism,
  AiWorkbench,
  DecisionTree,
  RecordDestinations,
} from "./visuals";
import styles from "./PacsAi.module.css";

const base = import.meta.env.BASE_URL;
const media = {
  reading: {
    src: base + "images/pacs/approved/reading-workbench.jpg",
    width: 2048,
    height: 1280,
  },
  ai: {
    src: base + "images/pacs/approved/ai-workbench.jpg",
    width: 2048,
    height: 1280,
  },
};
const aliases = {
  overview: "case-cover",
  problem: "background",
  thinking: "recording",
  solution: "ai",
  system: "value",
  impact: "results",
  "solution-1": "workflow",
  "solution-2": "ai",
  "solution-3": "value",
};
function Paragraphs({ items }) {
  return (
    <div className={styles.stack16}>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}
function Pairs({ items, small = false, balanced = false }) {
  return (
    <div
      className={styles.threeColumns + (balanced ? " " + styles.balanced : "")}
    >
      {items.map((item) => (
        <div className={styles.ruledItem} key={item.title}>
          {small ? (
            <h4 className={styles.accent}>{item.title}</h4>
          ) : (
            <h3>{item.title}</h3>
          )}
          <Paragraphs items={item.body} />
        </div>
      ))}
    </div>
  );
}
function Metrics({ items, hero = false }) {
  return (
    <dl className={hero ? styles.heroMetrics : styles.metrics}>
      {items.map((item) => (
        <div key={item.value}>
          <dt>{item.value}</dt>
          <dd>{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
function Section({ index, children }) {
  const c = copy.chapters[index];
  const boundary = {
    workflow: "融入",
    recording: "操作效率",
    ai: "保留医生",
    value: "产生多重",
    results: "到常态化",
    reflection: "重新审视",
  }[c.id];
  const split = boundary ? c.title.indexOf(boundary) : -1;
  return (
    <section
      id={c.id}
      data-pacs-chapter
      className={styles.section + " " + (index % 2 ? styles.alternate : "")}
      aria-labelledby={c.id + "-title"}
    >
      <div className={styles.container + " " + styles.stack40}>
        <header className={styles.chapterHead} data-case-motion="heading">
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h2 id={c.id + "-title"} tabIndex={-1}>
            {split > 0 ? (
              <>
                {c.title.slice(0, split)}
                <span className={styles.mobileTitle}>
                  {c.title.slice(split)}
                </span>
              </>
            ) : (
              c.title
            )}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
export default function PacsAiCase() {
  const root = useRef(null),
    close = useRef(null),
    trigger = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const location = useLocation();
  const previousHash = useRef(location.hash);
  useCaseMotion(root);
  function open(item, element) {
    trigger.current = element;
    setLightbox(item);
  }
  useEffect(() => {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) {
      if (previousHash.current) window.scrollTo(0, 0);
      previousHash.current = "";
      return;
    }
    previousHash.current = location.hash;
    const element = document.getElementById(aliases[hash] || hash);
    if (!element) return;
    element.scrollIntoView?.({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    (element.querySelector("h1,h2") || element).focus({ preventScroll: true });
  }, [location.hash, location.key]);
  useEffect(() => {
    if (!lightbox) return;
    const previous = document.body.style.overflow,
      button = trigger.current;
    const key = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    close.current?.focus();
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      button?.focus({ preventScroll: true });
    };
  }, [lightbox]);
  const {
    hero,
    background: bg,
    workflow: w,
    recording: r,
    ai,
    value: v,
    results,
    reflection,
  } = copy;
  return (
    <article id="pacs-page" className={styles.root} lang="zh-CN" ref={root}>
      <div
        inert={lightbox ? "" : undefined}
        aria-hidden={lightbox ? true : undefined}
      >
        <CaseReaderHeader title={hero.title} />
        <main>
          <section
            id="case-cover"
            className={styles.cover}
            aria-labelledby="case-title"
          >
            <div className={styles.container + " " + styles.stack40}>
              <div className={styles.stack16} data-case-intro>
                <h1 id="case-title" tabIndex={-1}>
                  {hero.title}
                </h1>
                <p className={styles.lede}>{hero.intro}</p>
              </div>
              <hr className={styles.coverDivider} />
              <div className={styles.stack20}>
                <Metrics hero items={hero.metrics} />
                <p className={styles.coverNote}>{hero.note}</p>
              </div>
              <div className={styles.roles} data-case-roles>
                <p>
                  <strong>{hero.role}</strong>
                </p>
                <p>{hero.responsibility}</p>
              </div>
            </div>
          </section>
          <Section index={0}>
            <p>{bg.intro}</p>
            <div className={styles.stack24}>
              <h3>{bg.flowTitle}</h3>
              <Flow steps={bg.steps} kind="original" />
              <div className={styles.boundaries}>
                <p>{bg.boundaries[0]}</p>
                <p>{bg.boundaries[1]}</p>
              </div>
            </div>
            <div className={styles.stack24}>
              <h3>{bg.problemTitle}</h3>
              <Pairs items={bg.problems} />
            </div>
            <div className={styles.stack12}>
              <h4 className={styles.accent}>{bg.goalTitle}</h4>
              <p>{bg.goal}</p>
            </div>
          </Section>
          <Section index={1}>
            <div className={styles.stack24}>
              <h3>{w.habitTitle}</h3>
              <Paragraphs items={w.habit} />
            </div>
            <div className={styles.stack24}>
              <h3>{w.flowTitle}</h3>
              <Flow steps={w.steps} kind="new" />
              <p className={styles.note}>{w.flowNote}</p>
            </div>
            <div className={styles.stack24}>
              <h3>{w.linkTitle}</h3>
              <p>{w.linkBody}</p>
              <div className={styles.annotatedScreen}>
                <Evidence
                  image={media.reading}
                  slot="reading-workbench"
                  title="影像标记与诊断记录工作台"
                  alt="完整读片工作台：左侧影像列表，中间影像与异常标记，右侧一一对应的诊断卡片"
                  onZoom={open}
                  caption={null}
                />
                <WorkbenchAnnotations />
              </div>
              <div className={styles.threeColumns}>
                {w.regions.map((item) => (
                  <div key={item.title} className={styles.stack8}>
                    <h4>{item.title}</h4>
                    <Paragraphs items={item.body} />
                  </div>
                ))}
              </div>
              <p className={styles.note}>{w.caption}</p>
            </div>
          </Section>
          <Section index={2}>
            <div className={styles.stack24}>
              <h3>{r.introTitle}</h3>
              <Paragraphs items={r.intro} />
            </div>
            <div className={styles.stack24}>
              <h3>{r.reuseTitle}</h3>
              <Pairs items={r.thinking} small balanced />
              <ReuseMechanism copy={r} />
            </div>
          </Section>
          <Section index={3}>
            <p>{ai.intro}</p>
            <AiWorkbench copy={ai} image={media.ai} onZoom={open} />
            <div className={styles.stack24}>
              <h3>{ai.decisionTitle}</h3>
              <p>{ai.decisionBody}</p>
              <DecisionTree copy={ai.tree} />
            </div>
            <div className={styles.stack24}>
              <h3>{ai.principleTitle}</h3>
              <div className={styles.twoColumns}>
                {ai.principles.map((item, i) => (
                  <div
                    key={item.title}
                    className={
                      styles.ruledItem + " " + (!i ? styles.accentRule : "")
                    }
                  >
                    <h4>{item.title}</h4>
                    <Paragraphs items={item.body} />
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section index={4}>
            <Paragraphs items={v.intro} />
            <RecordDestinations copy={v} />
            <p>{v.note}</p>
          </Section>
          <Section index={5}>
            <p>{results.intro}</p>
            <Metrics items={results.metrics} />
            <div className={styles.stack24}>
              <h3>{results.managementTitle}</h3>
              <p>{results.managementIntro}</p>
              <Flow steps={results.steps} kind="management" />
              <Paragraphs items={results.managementBody} />
              <p className={styles.note}>{results.note}</p>
            </div>
          </Section>
          <Section index={6}>
            <Pairs items={reflection.thinking} small />
            <div className={styles.stack16}>
              <h3>{reflection.title}</h3>
              <p>{reflection.body}</p>
            </div>
            <p className={styles.note}>{reflection.note}</p>
          </Section>
        </main>
      </div>
      <Lightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
        closeRef={close}
      />
    </article>
  );
}
