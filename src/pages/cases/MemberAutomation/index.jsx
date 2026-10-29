import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { caseContent } from "./content";
import {
  DataSiloDiagram,
  DecisionPipelineDiagram,
  AutomationBoundaryDiagram,
  QuotaGovernanceDiagram,
  FailureProtectionDiagram,
  WorkspaceArchitectureDiagram,
} from "./visuals";
import styles from "./MemberAutomation.module.css";

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

function Evidence({ slotId, language }) {
  const slot = caseContent.diagrams.visuals[slotId];
  return (
    <figure className={styles.evidence} data-visual-slot={slotId}>
      <div
        className={styles.evidenceFrame}
        role="img"
        aria-label={
          (language === "zh" ? "素材准备中：" : "Image pending: ") +
          slot.title[language]
        }
      >
        <span>{language === "zh" ? "素材准备中" : "Image pending"}</span>
        <strong>{slot.title[language]}</strong>
      </div>
      <figcaption>{slot.brief[language]}</figcaption>
    </figure>
  );
}

function EvidenceGallery({ language }) {
  const slots = ["workspace", "transaction", "quota", "recovery"];
  return (
    <div className={styles.evidenceGallery}>
      {slots.map((slotId) => (
        <Evidence key={slotId} slotId={slotId} language={language} />
      ))}
    </div>
  );
}

function SimpleFlow({ steps, caption }) {
  return (
    <figure className={styles.flow} aria-label={caption}>
      <ol className={styles.flowSteps}>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function BusinessFlow({ language }) {
  return (
    <figure
      className={styles.businessFlow}
      aria-label={
        language === "zh"
          ? "会员办理的标准、异常与失败路径"
          : "Standard, exception, and failure paths in membership handling"
      }
    >
      <ol>
        {caseContent.diagrams.system[language].map((step) => (
          <li key={step.label}>
            <div className={styles.flowNode}>{step.label}</div>
            {step.branches?.map((branch) => (
              <p className={styles.branch} key={branch}>
                {branch}
              </p>
            ))}
          </li>
        ))}
      </ol>
      <figcaption>
        {language === "zh"
          ? "业务处理关系示意，不代表接口调用顺序；跨店结算仍依赖原门诊系统和批处理。"
          : "Business-flow overview, not an interface-call sequence. Cross-clinic settlement remains in the original clinic system and batch process."}
      </figcaption>
    </figure>
  );
}

function Table({ block }) {
  return (
    <dl className={styles.ruleRows}>
      {block.rows.map(([label, detail]) => (
        <div key={label}>
          <dt>
            <InlineText text={label} />
          </dt>
          <dd>
            <InlineText text={detail} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Metrics({ block, language }) {
  return (
    <div className={styles.metricRows}>
      {block.rows.map(([label, change, source], index) => (
        <div
          key={label}
          className={index ? styles.estimate : styles.measured}
          data-evidence={index ? "estimated" : "measured"}
        >
          <h4>{label}</h4>
          <p className={styles.metricChange}>
            {change.split(" → ").map((value, i) => (
              <Fragment key={value}>
                {i > 0 && (
                  <span className={styles.metricArrow} aria-hidden="true">
                    {" "}
                    →{" "}
                  </span>
                )}
                <span>{value}</span>
              </Fragment>
            ))}
          </p>
          <p className={styles.note}>{source}</p>
          <p className={styles.note}>
            {language === "zh"
              ? index
                ? "财务反馈估算，不与现场实测混为同一种证据。"
                : "只说明典型升级办理场景，不代表全部交易的平均耗时。"
              : index
                ? "Finance feedback is an estimate, not the same evidence as on-site measurement."
                : "A typical upgrade task, not an average across all transactions."}
          </p>
        </div>
      ))}
    </div>
  );
}

function DecisionGrid({ language }) {
  const decisions = caseContent.diagrams.decisions[language];
  return (
    <div className={styles.decisionGrid}>
      {decisions.map((decision) => (
        <section
          key={decision.label}
          className={styles.decisionRow}
          data-decision={decision.label}
        >
          <div className={styles.decisionLead}>
            <span>{decision.label}</span>
            <h3>{decision.title}</h3>
          </div>
          <div className={styles.decisionBody}>
            <div>
              <h4>{language === "zh" ? "问题" : "Problem"}</h4>
              <p>{decision.problem}</p>
            </div>
            <div>
              <h4>{language === "zh" ? "判断" : "Judgment"}</h4>
              <p>{decision.judgment}</p>
            </div>
            <div>
              <h4>{language === "zh" ? "取舍" : "Trade-off"}</h4>
              <p>{decision.tradeoff}</p>
            </div>
            <div>
              <h4>{language === "zh" ? "落到规则" : "Product rules"}</h4>
              <ul>
                {decision.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function BoundaryDiagram({ language }) {
  const boundary = caseContent.diagrams.boundary[language];
  return (
    <figure
      className={styles.boundary}
      aria-label={
        language === "zh"
          ? "新会员办理层与原门诊系统的职责边界"
          : "Boundary between the membership layer and the original clinic system"
      }
    >
      <div className={styles.boundaryColumns}>
        <div>
          <h3>{boundary.leftTitle}</h3>
          <ul>
            {boundary.leftItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <span className={styles.boundaryArrow} aria-hidden="true">
          ↔
        </span>
        <div>
          <h3>{boundary.rightTitle}</h3>
          <ul>
            {boundary.rightItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption>{boundary.caption}</figcaption>
    </figure>
  );
}

function ChapterHeading({ section, index, language }) {
  return (
    <div className={styles.headingGroup}>
      <span className={styles.chapterIndex} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div className={styles.headingCopy}>
        <p className={styles.chapterEyebrow} lang="en" aria-hidden="true">
          {section.title.en}
        </p>
        <h2 id={section.id + "-title"} tabIndex={-1}>
          {section.title[language]}
        </h2>
      </div>
    </div>
  );
}

function RenderBlocks({ section, language }) {
  return section[language].map((block, index) => {
    if (block.type === "heading") {
      return (
        <h3 key={section.id + index} className={styles.subheading}>
          {block.text}
        </h3>
      );
    }
    if (block.type === "paragraph") {
      return (
        <p
          key={section.id + index}
          className={`${styles.paragraph} ${
            index === 0 ? styles.chapterLead : ""
          }`}
        >
          <InlineText text={block.text} />
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul key={section.id + index} className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    }
    if (block.type === "table") {
      return section.id === "impact" ? (
        <Metrics key={section.id + index} block={block} language={language} />
      ) : (
        <Table key={section.id + index} block={block} />
      );
    }
    if (block.type === "oldFlow") {
      return (
        <SimpleFlow
          key={section.id + index}
          steps={caseContent.diagrams.old[language]}
          caption={
            language === "zh"
              ? "旧办理流程示意，依据原流程整理；每一步都可能出现额外核对。"
              : "Previous workflow, based on the original process; each step could require extra checking."
          }
        />
      );
    }
    if (block.type === "businessFlow") {
      return <BusinessFlow key={section.id + index} language={language} />;
    }
    if (block.type === "evidenceGallery") {
      return <EvidenceGallery key={section.id + index} language={language} />;
    }
    if (block.type === "evidence") {
      return (
        <Evidence
          key={section.id + index}
          slotId={block.slotId}
          language={language}
        />
      );
    }
    if (block.type === "decisionGrid") {
      return <DecisionGrid key={section.id + index} language={language} />;
    }
    if (block.type === "dataSiloDiagram") {
      return (
        <DataSiloDiagram key={section.id + index} language={language} />
      );
    }
    if (block.type === "decisionPipelineDiagram") {
      return (
        <DecisionPipelineDiagram key={section.id + index} language={language} />
      );
    }
    if (block.type === "automationBoundaryDiagram") {
      return (
        <AutomationBoundaryDiagram
          key={section.id + index}
          language={language}
        />
      );
    }
    if (block.type === "quotaGovernanceDiagram") {
      return (
        <QuotaGovernanceDiagram key={section.id + index} language={language} />
      );
    }
    if (block.type === "failureProtectionDiagram") {
      return (
        <FailureProtectionDiagram
          key={section.id + index}
          language={language}
        />
      );
    }
    if (block.type === "workspaceArchitectureDiagram") {
      return (
        <WorkspaceArchitectureDiagram
          key={section.id + index}
          language={language}
        />
      );
    }
    if (block.type === "boundary") {
      return <BoundaryDiagram key={section.id + index} language={language} />;
    }
    return null;
  });
}

export default function MemberAutomationCase() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const { hash, key: locationKey } = useLocation();
  const previousHash = useRef(hash);
  const [activeSection, setActiveSection] = useState("overview");
  const [lightHeader, setLightHeader] = useState(false);
  const sections = caseContent.sections;
  const focusSection = (id) => {
    const node = document.getElementById(id);
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
          const current = [...caseContent.sections]
            .reverse()
            .find((section) => visible.has(section.id));
          if (current) setActiveSection(current.id);
        },
        {
          rootMargin: "-" + top + "px 0px -" + bottom + "px 0px",
          threshold: 0,
        },
      );
      caseContent.sections.forEach(({ id }) => {
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
  }, []);

  return (
    <article id="member-automation-page" className={styles.root}>
      <header
        className={`${styles.topbar} ${lightHeader ? styles.lightHeader : ""}`}
      >
        <Link to="/" state={{ scrollTo: "portfolio" }} className={styles.back}>
          <span aria-hidden="true">←</span>
          {language === "zh" ? "返回作品" : "Back to work"}
        </Link>
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
          <h1 id="case-title" tabIndex={-1} className={styles.title}>
            {caseContent.hero.title[language]}
          </h1>
          <p className={styles.summary}>
            {caseContent.hero.summary[language]}
          </p>
          <p className={styles.heroResults}>
            {caseContent.hero.results[language]}
          </p>
        </div>
      </section>

      <div className={styles.readerLayout}>
        <aside className={styles.toc}>
          <nav aria-label={language === "zh" ? "章节目录" : "Contents"}>
            {sections.map((section, index) => (
              <Link
                key={section.id}
                to={"#" + section.id}
                aria-current={
                  activeSection === section.id ? "location" : undefined
                }
                onClick={() => setActiveSection(section.id)}
              >
                <span>{index < 9 ? "0" + (index + 1) : index + 1}</span>
                {section.title[language]}
              </Link>
            ))}
          </nav>
        </aside>

        <main className={styles.reading}>
          <section
            id="overview"
            aria-labelledby="overview-title"
            tabIndex={-1}
            className={styles.introduction}
          >
            <ChapterHeading
              section={sections[0]}
              index={1}
              language={language}
            />
            <RenderBlocks section={sections[0]} language={language} />
            <h3 id="roles-title" className={styles.roleTitle}>
              {language === "zh" ? "我的职责与协作" : "My role & collaboration"}
            </h3>
            <div className={styles.roles} data-case-roles>
              {caseContent.hero.roles[language].map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </section>

          {sections.slice(1).map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              tabIndex={-1}
              aria-labelledby={section.id + "-title"}
              className={styles.chapter}
            >
              <ChapterHeading
                section={section}
                index={index + 2}
                language={language}
              />
              <RenderBlocks section={section} language={language} />
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
    </article>
  );
}
