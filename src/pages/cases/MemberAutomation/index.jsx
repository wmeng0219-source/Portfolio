import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { caseContent as copy } from "./content";
import { Evidence, Lightbox } from "../Orthodontics/Evidence";
import { useCaseMotion } from "../Orthodontics/motion";
import { CaseReaderHeader } from "../shared/CaseReaderHeader";
import styles from "./MemberAutomation.module.css";

const base = import.meta.env.BASE_URL + "images/member/approved/";
const media = Object.fromEntries(
  ["workspace", "membership", "discount", "bill", "success", "failure"].map(
    (name) => [name, { src: base + name + ".png", width: 3840, height: 2160 }],
  ),
);
const aliases = {
  overview: "background",
  problem: "background",
  system: "scope",
  solution: "experience",
  decisions: "exceptions",
  resilience: "exceptions",
  governance: "authorization",
  impact: "results",
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
function Columns({ items, three = false, accentLast = false, small = false }) {
  return (
    <div className={three ? styles.threeColumns : styles.twoColumns}>
      {items.map((item, index) => (
        <div className={styles.stack16} key={item.title}>
          <hr
            className={
              styles.rule +
              (accentLast && index === items.length - 1
                ? " " + styles.accentRule
                : "")
            }
          />
          <h3 className={small ? styles.smallHeading : undefined}>
            {item.title}
          </h3>
          {item.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
function Flow({ items, mapping = false }) {
  return (
    <ol className={styles.flow + (mapping ? " " + styles.mappingFlow : "")}>
      {items.map((item, index) => (
        <React.Fragment key={item.title}>
          {index > 0 && (
            <li className={styles.arrow} aria-hidden="true">
              →
            </li>
          )}
          <li className={styles.flowStep}>
            <h4>{item.title}</h4>
            {item.body?.map((text) => (
              <p className={styles.note} key={text}>
                {text}
              </p>
            ))}
          </li>
        </React.Fragment>
      ))}
    </ol>
  );
}
function Section({ index, children }) {
  const chapter = copy.chapters[index];
  const split =
    chapter.id === "experience" ? chapter.title.indexOf("买什么") : -1;
  return (
    <section
      id={chapter.id}
      data-member-chapter
      className={styles.section + (index % 2 ? " " + styles.alternate : "")}
      aria-labelledby={chapter.id + "-title"}
    >
      <div className={styles.container + " " + styles.stack40}>
        <header className={styles.chapterHead} data-case-motion="heading">
          <p className={styles.eyebrow}>{chapter.eyebrow}</p>
          <h2 id={chapter.id + "-title"} tabIndex={-1}>
            {split > 0 ? (
              <>
                {chapter.title.slice(0, split)}
                <span className={styles.mobileTitle}>
                  {chapter.title.slice(split)}
                </span>
              </>
            ) : (
              chapter.title
            )}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
function Amount({ text }) {
  const split = text.indexOf("¥");
  return (
    <p className={styles.amount}>
      <span>{text.slice(0, split)}</span>
      {text.slice(split)}
    </p>
  );
}
function Duration({ item, after = false }) {
  const parts = item.value.split(" ");
  return (
    <div className={styles.stack12}>
      <p className={styles.note}>{item.label}</p>
      <p className={after ? styles.timeAfter : styles.timeBefore}>
        <span>{parts[0]} </span>
        {parts[1]}
        <span> {parts[2]}</span>
      </p>
    </div>
  );
}
export default function MemberAutomationCase() {
  const root = useRef(null),
    close = useRef(null),
    trigger = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const location = useLocation();
  const previousHash = useRef(location.hash);
  useCaseMotion(root);
  const open = (item, element) => {
    trigger.current = element;
    setLightbox(item);
  };
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
    scope,
    rules,
    experience: ex,
    authorization: auth,
    exceptions: err,
    results,
  } = copy;
  const screenshot = (slot, title, caption = null) => (
    <Evidence
      image={media[slot]}
      slot={slot}
      title={title}
      alt={title}
      onZoom={open}
      caption={caption}
      imageClassName={styles.fullScreen}
    />
  );
  return (
    <article
      id="member-automation-page"
      className={styles.root}
      lang="zh-CN"
      ref={root}
    >
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
              <div className={styles.stack24} data-case-intro>
                <p className={styles.coverEyebrow}>{hero.eyebrow}</p>
                <h1 id="case-title" className={styles.title} tabIndex={-1}>
                  {hero.title}
                </h1>
                <p className={styles.coverLede}>{hero.intro}</p>
                <hr className={styles.coverDivider} />
                <dl className={styles.heroMetrics}>
                  {hero.metrics.map((item) => (
                    <div className={styles.stack16} key={item.value}>
                      <dt>{item.value}</dt>
                      <dd>{item.label}</dd>
                    </div>
                  ))}
                </dl>
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
            <div className={styles.stack40}>
              <Paragraphs items={bg.intro} />
              <div className={styles.stack24}>
                <h3 className={styles.scenario}>{bg.scenario}</h3>
                <Columns three items={bg.operations} />
              </div>
              <Columns items={bg.problems} />
              <div className={styles.stack12}>
                <h3 className={styles.opportunity}>{bg.opportunity.title}</h3>
                <p>{bg.opportunity.body}</p>
              </div>
            </div>
          </Section>
          <Section index={1}>
            <p>{scope.intro}</p>
            <Columns three items={scope.evaluation} accentLast />
            <figure
              className={styles.systems}
              aria-label="会员业务自动化的双系统关系"
            >
              {scope.systems.map((system, index) => (
                <React.Fragment key={system.title}>
                  {index > 0 && (
                    <div className={styles.interface}>
                      <p aria-hidden="true">⇄</p>
                      <p>{scope.interfaceLabel}</p>
                    </div>
                  )}
                  <div className={styles.system}>
                    <p className={styles.systemLabel}>{system.label}</p>
                    <h3>{system.title}</h3>
                    <p>{system.body}</p>
                    <p className={styles.note}>{system.note}</p>
                  </div>
                </React.Fragment>
              ))}
            </figure>
            <p className={styles.conclusion}>{scope.conclusion}</p>
          </Section>
          <Section index={2}>
            <p>{rules.intro}</p>
            <Flow items={rules.research} />
            <div className={styles.stack24}>
              <h3>{rules.judgmentTitle}</h3>
              <div className={styles.threeColumns}>
                {rules.dimensions.map((text) => (
                  <div className={styles.stack16} key={text}>
                    <h4 className={styles.smallHeading}>{text}</h4>
                    <hr className={styles.rule} />
                  </div>
                ))}
              </div>
              <p>{rules.judgmentBody}</p>
              <Columns items={rules.branches} />
              <p className={styles.note}>{rules.judgmentNote}</p>
            </div>
            <figure className={styles.stack24} aria-label={rules.moneyTitle}>
              <h3>{rules.moneyTitle}</h3>
              <p>{rules.moneyIntro}</p>
              <div className={styles.stack8}>
                <p className={styles.exampleLabel}>{rules.exampleLabel}</p>
                <p>{rules.example}</p>
              </div>
              <div className={styles.twoColumns}>
                {rules.comparison.map((item, index) => (
                  <div
                    className={
                      styles.stack16 + (index ? " " + styles.newAllocation : "")
                    }
                    key={item.title}
                  >
                    <hr
                      className={
                        styles.rule + (index ? " " + styles.accentRule : "")
                      }
                    />
                    <h4 className={styles.smallHeading}>{item.title}</h4>
                    {item.amounts.map((text) => (
                      <Amount text={text} key={text} />
                    ))}
                    <p>{item.note}</p>
                  </div>
                ))}
              </div>
              <p className={styles.conclusion}>{rules.parentPays}</p>
              <figcaption className={styles.note}>{rules.moneyNote}</figcaption>
            </figure>
            <p className={styles.conclusion}>{rules.conclusion}</p>
          </Section>
          <Section index={3}>
            <p>{ex.intro}</p>
            {screenshot("workspace", "会员管理工作台", ex.workspaceCaption)}
            <div className={styles.stack24}>
              <h3>{ex.handlingTitle}</h3>
              <p>{ex.handlingIntro}</p>
              <div className={styles.stack12}>
                {screenshot(
                  "membership",
                  "会员办理完整页面：背景工作台、遮罩与会员办理弹窗",
                )}
                <div className={styles.regions}>
                  {ex.regions.map((item) => (
                    <div className={styles.stack16} key={item.title}>
                      <h4>{item.title}</h4>
                      <Paragraphs items={item.body} />
                    </div>
                  ))}
                </div>
              </div>
              <p className={styles.conclusion}>{ex.conclusion}</p>
            </div>
          </Section>
          <Section index={4}>
            <p>{auth.intro}</p>
            <Columns items={auth.comparison} accentLast />
            <Columns items={auth.decisions} />
            <div className={styles.threeColumns}>
              {auth.mechanism.map((item) => (
                <div className={styles.stack8} key={item.title}>
                  <h4>{item.title}</h4>
                  {item.body.map((text) => (
                    <p className={styles.note} key={text}>
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.stack24}>
              <h3>{auth.manualTitle}</h3>
              <p>{auth.manualIntro}</p>
              {screenshot(
                "discount",
                "手动优惠完整页面：工作台、会员办理弹窗与优惠浮层",
                auth.caption,
              )}
              <p className={styles.equation}>{auth.equation}</p>
              <p>{auth.limit}</p>
            </div>
            <p className={styles.note}>{auth.boundary}</p>
          </Section>
          <Section index={5}>
            <p>{err.intro}</p>
            <div className={styles.stack24}>
              <h3>{err.matchingTitle}</h3>
              <p>{err.matchingIntro}</p>
              <Flow mapping items={err.mapping.map((title) => ({ title }))} />
              <Columns three items={err.matching} accentLast />
              <div className={styles.stack16}>
                {screenshot(
                  "bill",
                  "手动选择退费账单完整页面",
                  err.billCaption,
                )}
                <div className={styles.stack16}>
                  <h3>{err.basisTitle}</h3>
                  <p>{err.basis}</p>
                </div>
              </div>
            </div>
            <div className={styles.stack24}>
              <h3>{err.recoveryTitle}</h3>
              <p>{err.recoveryIntro}</p>
              <div className={styles.stack40}>
                {["success", "failure"].map((slot) => (
                  <div className={styles.stack12} key={slot}>
                    {screenshot(
                      slot,
                      slot === "success"
                        ? "会员升级成功完整页面"
                        : "会员升级失败完整页面",
                    )}
                    <div className={styles.stack4}>
                      <h4>{err[slot].title}</h4>
                      <p className={styles.note}>{err[slot].body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section index={6}>
            <p>{results.intro}</p>
            <div className={styles.twoColumns}>
              <div className={styles.stack24}>
                <h3>{results.efficiencyTitle}</h3>
                <div
                  className={
                    styles.twoColumns + " " + styles.durationComparison
                  }
                >
                  <Duration item={results.timeBefore} />
                  <Duration item={results.timeAfter} after />
                </div>
                <p className={styles.note}>{results.timeNote}</p>
              </div>
              <div className={styles.stack24}>
                <h3>{results.auditTitle}</h3>
                {results.audit.map((item, index) => (
                  <div className={styles.stack8} key={item.title}>
                    <h4
                      className={
                        styles.smallHeading +
                        (index ? " " + styles.auditAfter : "")
                      }
                    >
                      {item.title}
                    </h4>
                    <Paragraphs items={item.body} />
                  </div>
                ))}
                <p className={styles.note}>{results.auditNote}</p>
              </div>
            </div>
            <div className={styles.stack24}>
              <h3>{results.reflectionTitle}</h3>
              <p>{results.reflectionIntro}</p>
              <Columns items={results.iterations} />
            </div>
            <p className={styles.conclusion}>{results.conclusion}</p>
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
