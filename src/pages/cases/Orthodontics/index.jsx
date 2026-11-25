import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { caseContent } from "./content";
import { media } from "./media";
import { Evidence, Lightbox } from "./Evidence";
import { ReportPreview } from "./ReportPreview";
import { useCaseMotion } from "./motion";
import {
  OldWorkflow,
  StrategyFlow,
  WorkloadComparison,
  RoleMatrix,
  PermissionTable,
  InteractionIteration,
  IntegrationFlow,
  RolloutTimeline,
  RecordChart,
} from "./CaseDiagrams";
import styles from "./Orthodontics.module.css";

const aliases = {
  overview: "case-cover",
  "case-introduction": "case-cover",
  problem: "challenge",
  thinking: "decision-1",
  solution: "decision-2",
  system: "decision-2",
  impact: "results",
};

function Heading({ copy, id }) {
  return (
    <header className={styles.chapterHead} data-case-motion="heading">
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 id={`${id}-title`} tabIndex={-1}>
        {copy.title}
      </h2>
    </header>
  );
}
function Section({ id, copy, children, alternate, dense = false }) {
  return (
    <section
      id={id}
      className={`${styles.section} ${alternate ? styles.alternate : ""} ${dense ? styles.executionSection : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={`${styles.container} ${styles.chapterStack}`}>
        <Heading copy={copy} id={id} />
        {children}
      </div>
    </section>
  );
}
function Paragraphs({ children }) {
  return (
    <div className={styles.stack16}>
      {children.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}
function PairColumns({ items, ruled = false, compact = false }) {
  return (
    <dl
      className={`${styles.pairGrid} ${ruled ? styles.ruledPairs : ""} ${compact ? styles.compactPairs : ""}`}
    >
      {items.map((item) => (
        <div key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
function BackLink() {
  return (
    <Link to="/" state={{ scrollTo: "portfolio" }}>
      返回作品{" "}
      <span className={styles.linkArrow} aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}

export default function Orthodontics() {
  const copy = caseContent.zh;
  const location = useLocation();
  const root = useRef(null);
  const closeButton = useRef(null);
  const imageTrigger = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  useCaseMotion(root);
  const openImage = (item, trigger) => {
    imageTrigger.current = trigger;
    setLightbox(item);
  };

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const target = document.getElementById(aliases[hash] || hash);
    if (!target) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView?.({
      behavior: reduce ? "instant" : "smooth",
      block: "start",
    });
    (target.querySelector("h1, h2") || target).focus({ preventScroll: true });
  }, [location.hash, location.key]);

  useEffect(() => {
    if (!lightbox) return;
    const trigger = imageTrigger.current;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [lightbox]);

  const {
    background: bg,
    strategy,
    tasks,
    roles,
    execution,
    service,
    delivery,
    reflection,
  } = copy;
  return (
    <article
      ref={root}
      id="orthodontics-page"
      className={styles.root}
      lang="zh-CN"
    >
      <div
        inert={lightbox ? "" : undefined}
        aria-hidden={lightbox ? true : undefined}
      >
        <nav className={styles.topbar} aria-label="返回作品">
          <BackLink />
        </nav>
        <main>
          <section
            id="case-cover"
            className={styles.cover}
            aria-labelledby="case-title"
          >
            <div className={`${styles.container} ${styles.stack40}`}>
              <div className={styles.stack16}>
                <p className={styles.coverEyebrow}>{copy.eyebrow}</p>
                <h1 id="case-title" tabIndex={-1}>
                  {copy.title.slice(0, 7)}
                  <span className={styles.titleTail}>{copy.title.slice(7)}</span>
                </h1>
                <p className={styles.coverLede}>{copy.lede}</p>
              </div>
              <hr className={styles.coverDivider} />
              <div className={styles.metricGroup}>
                <dl className={styles.coverFacts}>
                  {copy.metrics.map((item) => (
                    <div key={item.value}>
                      <dt>{item.value}</dt>
                      <dd>{item.label}</dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.coverNote}>{copy.metricNote}</p>
              </div>
              <div className={styles.coverRole}>
                <p>{copy.period}</p>
                <p>
                  <strong>{copy.role}</strong>
                </p>
                <p>{copy.duties}</p>
              </div>
            </div>
          </section>

          <Section id="challenge" copy={bg}>
            <Paragraphs>{bg.intro}</Paragraphs>
            <div className={styles.stack16}>
              <h3>{bg.flowTitle}</h3>
              <OldWorkflow steps={bg.flow} note={bg.flowNote} />
            </div>
            <div className={styles.stack20}>
              <h3>{bg.discoveryTitle}</h3>
              <ol className={styles.problemRows}>
                {bg.problems.map((item, i) => (
                  <li key={item.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.stack16}>
              <h3>{bg.judgment.title}</h3>
              <p>{bg.judgment.body}</p>
            </div>
          </Section>

          <Section id="strategy" copy={strategy} alternate>
            <p>{strategy.intro}</p>
            <StrategyFlow copy={strategy} />
            <div className={styles.stack16}>
              <h3>{strategy.judgment.title}</h3>
              <p>{strategy.judgment.body}</p>
            </div>
          </Section>

          <Section id="decision-1" copy={tasks}>
            <Paragraphs>{tasks.intro}</Paragraphs>
            <WorkloadComparison copy={tasks} />
            <div className={styles.stack24}>
              <h3>{tasks.evidenceTitle}</h3>
              <Evidence
                image={media.screeningList}
                slot="screening-list"
                title="儿牙筛查列表"
                alt="儿牙筛查列表：上方已预约筛查患者，下方系统推荐筛查患者"
                onZoom={openImage}
                caption={null}
              />
              <PairColumns items={tasks.annotations} compact />
            </div>
          </Section>

          <Section id="decision-2" copy={roles} alternate>
            <p>{roles.intro}</p>
            <div className={styles.stack24}>
              <h3>{roles.dutiesTitle}</h3>
              <RoleMatrix columns={roles.columns} rows={roles.rows} />
              <div className={styles.nurseEvidence}>
                <Evidence
                  image={media.nurseCollection}
                  slot="nurse-collection"
                  title="护士资料采集"
                  alt="护士资料采集工作台：历史影像与本次采集资料"
                  onZoom={openImage}
                  caption={roles.collectionCaption}
                />
                <p>{roles.sharedRecord}</p>
              </div>
            </div>
            <div className={styles.stack24}>
              <h3>{roles.permissionsTitle}</h3>
              <p>{roles.permissionsIntro}</p>
              <PermissionTable
                columns={roles.permissionColumns}
                rows={roles.permissions}
              />
              <p>{roles.permissionsNote}</p>
            </div>
            <div className={styles.stack24}>
              <h3>{roles.handoffTitle}</h3>
              <p>{roles.handoffIntro}</p>
              <PairColumns items={roles.handoff} ruled />
              <Evidence
                image={media.pedoConfirm}
                slot="pedo-confirm"
                title="儿牙完成筛查确认信息"
                alt="完整筛查确认弹窗：家长意愿、特殊情况与接收医生"
                onZoom={openImage}
                caption={roles.handoffCaption}
              />
              <p>{roles.handoffNote}</p>
            </div>
          </Section>

          <Section id="execution" copy={execution} dense>
            <p>{execution.intro}</p>
            <div className={styles.stack24}>
              <h3>{execution.a.title}</h3>
              {execution.a.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <Evidence
                image={media.analysisPage}
                slot="question-analysis"
                title="儿牙医生逐题检查"
                alt="儿牙医生逐题检查：影像、当前牙齿固连检查项与手动翻页控件同屏"
                onZoom={openImage}
                caption={execution.a.caption}
              />
              <InteractionIteration copy={execution.a} />
            </div>
            <div className={styles.stack24}>
              <h3>{execution.b.title}</h3>
              <p>{execution.b.intro}</p>
              <PairColumns items={execution.b.views} />
              <Evidence
                image={media.orthoConclusion}
                slot="ortho-conclusion"
                title="正畸医生筛查结论"
                alt="正畸医生工作台：异常检查结果、全部筛查内容入口与专业结论"
                onZoom={openImage}
                caption={null}
              />
            </div>
            <div className={styles.stack24}>
              <h3>{execution.c.title}</h3>
              <p>{execution.c.intro}</p>
              <IntegrationFlow copy={execution.c} />
              <h3>{execution.c.compatibilityTitle}</h3>
              <dl className={styles.compatibilityRows}>
                {execution.c.paths.map((path) => (
                  <div key={path.title}>
                    <dt>{path.title}</dt>
                    <dd>{path.body}</dd>
                  </div>
                ))}
              </dl>
              <p>{execution.c.outro}</p>
            </div>
          </Section>

          <Section id="experience" copy={service} alternate>
            <p>{service.intro}</p>
            <div className={styles.stack24}>
              <h3>{service.clinic.title}</h3>
              <p>{service.clinic.body}</p>
              <Evidence
                image={media.scanAnalysis}
                slot="scan-analysis"
                title="口扫模型辅助讲解"
                alt="口扫影像分析工作台：三维模型与咬合检查项辅助诊间沟通"
                onZoom={openImage}
                caption={null}
              />
            </div>
            <div className={styles.stack24}>
              <h3>{service.report.title}</h3>
              <p>{service.report.body}</p>
              <ReportPreview
                image={media.reportFull}
                detail={media.reportModel}
                onZoom={openImage}
                caption={service.reportCaption}
                detailCaption={service.detailCaption}
              />
              <dl className={styles.reportNotes}>
                {service.notes.map((note) => (
                  <div key={note.title}>
                    <dt>{note.title}</dt>
                    <dd>{note.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>

          <Section id="results" copy={delivery}>
            <div className={styles.stack20}>
              <h3>{delivery.launchTitle}</h3>
              {delivery.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className={styles.stack24}>
              <h3>{delivery.timelineTitle}</h3>
              <RolloutTimeline steps={delivery.timeline} />
              <p>
                <strong>{delivery.roles}</strong>
              </p>
            </div>
            <div className={styles.stack24}>
              <h3>{delivery.recordsTitle}</h3>
              <p>{delivery.asOf}</p>
              <RecordChart records={delivery.records} />
            </div>
            <div className={styles.stack24}>
              <h3>{delivery.outcomesTitle}</h3>
              <p>{delivery.conversionCaption}</p>
              <dl className={styles.conversions}>
                {delivery.conversions.map((item) => (
                  <div key={item.period}>
                    <dt>{item.period}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.note}>{delivery.note}</p>
            </div>
          </Section>

          <Section id="reflection" copy={reflection} alternate>
            {reflection.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <strong>{reflection.outro}</strong>
            </p>
          </Section>
        </main>
        <footer className={`${styles.container} ${styles.footer}`}>
          <BackLink />
        </footer>
      </div>
      <Lightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
        closeRef={closeButton}
      />
    </article>
  );
}
