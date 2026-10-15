import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { caseContent } from "./content";
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
          ? "会员办理与异常分支"
          : "Membership processing and exception paths"
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
          ? "业务处理关系示意，不代表接口调用顺序；跨店结算仍依赖底层系统和批处理。"
          : "Business-flow overview, not an interface-call sequence. Cross-clinic settlement still depends on the underlying platform and batch processing."}
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
                : "只说明典型升级结算场景，不代表全部交易的平均耗时。"
              : index
                ? "Finance feedback is an estimate, not the same evidence as on-site measurement."
                : "A typical upgrade task, not an average across all transactions."}
          </p>
        </div>
      ))}
    </div>
  );
}

function RenderBlocks({ section, language }) {
  const items = section[language];
  return items.map((block, index) => {
    let element;
    if (block.type === "heading") {
      const solution = block.text.match(/^4\.([123])/);
      element = (
        <h3
          id={solution ? "solution-" + solution[1] : undefined}
          tabIndex={solution ? -1 : undefined}
          className={styles.subheading}
        >
          {block.text}
        </h3>
      );
    } else if (block.type === "paragraph") {
      if (section.id === "system" && block.text.includes("→"))
        element = <BusinessFlow language={language} />;
      else
        element = (
          <p className={styles.paragraph}>
            <InlineText text={block.text} />
          </p>
        );
    } else if (block.type === "list") {
      element = (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    } else if (block.type === "table") {
      element =
        section.id === "impact" ? (
          <Metrics block={block} language={language} />
        ) : (
          <Table block={block} />
        );
    }
    const endGroup =
      section.id === "solution" &&
      (items[index + 1]?.type === "heading" || index === items.length - 1);
    const group = items
      .slice(0, index + 1)
      .filter(
        (item) => item.type === "heading" && /^4\.[123]/.test(item.text),
      ).length;
    const judgmentEnd =
      section.id === "thinking" &&
      block.type === "paragraph" &&
      (items[index + 1]?.type === "heading" || index === items.length - 1);
    const judgment = items
      .slice(0, index + 1)
      .filter((item) => item.type === "heading").length;
    return (
      <Fragment key={section.id + index}>
        {element}
        {judgmentEnd && (
          <Link to={"#solution-" + judgment} className={styles.solutionLink}>
            {language === "zh" ? "查看对应方案" : "See the solution"} 4.
            {judgment} →
          </Link>
        )}
        {endGroup && (
          <div
            data-mechanism={
              group === 2 ? "quota" : group === 3 ? "recovery" : undefined
            }
          >
            {group > 1 && (
              <Table
                block={{
                  rows: caseContent.diagrams.solutionRules[
                    group === 2 ? "quota" : "recovery"
                  ][language],
                }}
              />
            )}
            <Evidence
              slotId={["transaction", "quota", "recovery"][group - 1]}
              language={language}
            />
          </div>
        )}
      </Fragment>
    );
  });
}

export default function MemberAutomationCase() {
  const { language, toggleLanguage, englishEnabled } = useLanguage();
  const { hash, key: locationKey } = useLocation();
  const previousHash = useRef(hash);
  const [activeSection, setActiveSection] = useState("overview");
  const sections = caseContent.sections.slice(1);
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
    else if (previousHash.current) window.scrollTo(0, 0);
    previousHash.current = hash;
  }, [hash, locationKey]);

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
    <div className={styles.root} lang={language === "zh" ? "zh-CN" : "en"}>
      <header className={styles.topbar}>
        <Link to="/" state={{ scrollTo: "portfolio" }} className={styles.back}>
          ← {language === "zh" ? "返回首页" : "Back to Home"}
        </Link>
        {englishEnabled && (
          <button
            type="button"
            className={styles.language}
            onClick={toggleLanguage}
            aria-label={language === "zh" ? "Switch to English" : "切换至中文"}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
        )}
      </header>
      <main className={styles.page}>
        <section
          id="overview"
          tabIndex={-1}
          aria-labelledby="case-title"
          className={styles.overview}
        >
          <div className={styles.hero} data-case-intro>
            <h1 id="case-title" className={styles.title}>
              {caseContent.hero.title[language]}
            </h1>
            <p className={styles.summary}>
              {caseContent.hero.summary[language]}
            </p>
          </div>
          <div className={styles.roles} data-case-roles>
            <h2 id="overview-title" className={styles.overviewTitle}>
              {language === "zh" ? "我的职责与协作" : "My role & collaboration"}
            </h2>
            <div>
              {caseContent.hero.roles[language].map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>

          <Evidence slotId="workspace" language={language} />
        </section>
        <div className={styles.body}>
          <aside>
            <nav
              aria-label={language === "zh" ? "章节目录" : "Contents"}
              className={styles.contents}
            >
              {caseContent.sections.map((section, index) => (
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
          <div className={styles.articles}>
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                tabIndex={-1}
                aria-labelledby={section.id + "-title"}
                className={styles.section}
              >
                <h2 id={section.id + "-title"} className={styles.sectionTitle}>
                  {section.title[language]}
                </h2>
                {section.id === "problem" && (
                  <SimpleFlow
                    steps={caseContent.diagrams.old[language]}
                    caption={
                      language === "zh"
                        ? "旧业务流程示意，依据原流程整理"
                        : "Previous business workflow, based on the original process"
                    }
                  />
                )}
                <RenderBlocks section={section} language={language} />
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
