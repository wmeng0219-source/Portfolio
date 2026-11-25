import React from "react";
import styles from "./Orthodontics.module.css";

export function OldWorkflow({ steps, note }) {
  return (
    <figure aria-label="原有业务协作流程" className={styles.stack16}>
      <ol className={styles.oldFlow}>
        {steps.map((step, i) => (
          <li key={step.title}>
            <div className={styles.flowStepTitle}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
            </div>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <figcaption className={styles.note}>{note}</figcaption>
    </figure>
  );
}

export function StrategyFlow({ copy }) {
  return (
    <div className={styles.stack24}>
      <h3>{copy.flowTitle}</h3>
      <figure
        aria-label="整体业务流程及首期建设范围"
        className={styles.stack24}
      >
        <ol className={styles.strategyFlow}>
          {copy.flow.map((step, i) => (
            <li className={i < 4 ? styles.coreStep : ""} key={step}>
              {step}
            </li>
          ))}
        </ol>
        <div className={styles.phaseGrid}>
          {copy.phases.map((phase, i) => (
            <div key={phase.title} className={i === 0 ? styles.corePhase : ""}>
              <h4>{phase.title}</h4>
              <p>{phase.body}</p>
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
}

export function WorkloadComparison({ copy }) {
  return (
    <figure
      className={styles.stack24}
      aria-label="固定任务量与患者优先级方案对比"
    >
      <h3>{copy.comparisonTitle}</h3>
      <div className={styles.choiceGrid}>
        {copy.choices.map((choice, index) => (
          <div
            key={choice.title}
            className={`${styles.choice} ${index ? styles.chosen : ""}`}
          >
            <h3>{choice.title}</h3>
            <p className={styles.choiceBody}>{choice.body}</p>
            <div className={styles.workloads} aria-hidden="true">
              {choice.counts.map((count, i) => (
                <div key={copy.doctors[i]} className={styles.workload}>
                  <span>{copy.doctors[i]}</span>
                  <div className={styles.taskBlocks}>
                    {Array.from({ length: 5 }, (_, block) => (
                      <i
                        key={block}
                        className={block < count ? styles.filledBlock : ""}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <figcaption className={styles.note}>{copy.comparisonNote}</figcaption>
    </figure>
  );
}

export function RoleMatrix({ columns, rows }) {
  return (
    <figure aria-label="角色接续示意" className={styles.roleFigure}>
      <div
        className={styles.tableScroll}
        tabIndex={0}
        role="region"
        aria-label="角色协作职责矩阵"
      >
        <table className={styles.roleMatrix} aria-label="四步筛查与角色协作">
          <colgroup>
            <col className={styles.roleColumn} />
            {columns.slice(1).map((c) => (
              <col key={c} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((c) => (
                <th scope="col" key={c}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-case-motion="roles">
            {rows.map((row, r) => (
              <tr key={row[0]}>
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th scope="row" key={c}>
                      {cell}
                    </th>
                  ) : (
                    <td
                      data-step={columns[c]}
                      className={
                        (r === 0 && c <= 2) ||
                        (r === 1 && c >= 3) ||
                        (r === 2 && c === 4)
                          ? styles.primaryCell
                          : ""
                      }
                      key={c}
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function PermissionTable({ columns, rows }) {
  return (
    <table className={styles.permissions} aria-label="岗位角色与专业等级权限">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          {columns.map((c) => (
            <th scope="col" key={c}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([role, task]) => (
          <tr key={role}>
            <th scope="row">{role}</th>
            <td>{task}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InteractionIteration({ copy }) {
  return (
    <figure className={styles.stack24} aria-label="逐题交互的真实迭代">
      <h3>{copy.iterationTitle}</h3>
      <div className={styles.iterationGrid}>
        {copy.versions.map((version, i) => (
          <div
            key={version.title}
            className={`${styles.version} ${i ? styles.currentVersion : ""}`}
          >
            <h4>{version.title}</h4>
            <ul className={styles.interactionRows}>
              {version.rows.map(([question, action]) => (
                <li key={question}>
                  <span>{question}</span>
                  <span aria-hidden="true">→</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
            {version.note && <p>{version.note}</p>}
          </div>
        ))}
      </div>
      <div className={styles.feedback}>
        <h4>{copy.feedback.title}</h4>
        <p>{copy.feedback.body}</p>
        <h3>{copy.reflection}</h3>
      </div>
      <figcaption className={styles.note}>{copy.diagramNote}</figcaption>
    </figure>
  );
}

export function IntegrationFlow({ copy }) {
  return (
    <figure className={styles.stack24} aria-label="口扫设备集成前后操作流程">
      <div className={styles.integrationGrid}>
        {[
          [copy.beforeTitle, copy.before],
          [copy.afterTitle, copy.after],
        ].map(([title, steps], index) => (
          <div key={title} className={index ? styles.integrated : ""}>
            <h3>{title}</h3>
            <ol className={styles.verticalFlow}>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p>{copy.benefit}</p>
      <figcaption className={styles.note}>{copy.note}</figcaption>
    </figure>
  );
}

export function RolloutTimeline({ steps }) {
  return (
    <ol className={styles.timeline} aria-label="项目推广时间线">
      {steps.map(({ date, label }, i) => (
        <li
          key={label}
          className={i === steps.length - 1 ? styles.lastMilestone : ""}
        >
          <p>{date}</p>
          <strong>{label}</strong>
        </li>
      ))}
    </ol>
  );
}

export function RecordChart({ records }) {
  const largest = Math.max(
    ...records.map((r) => Number(r.value.replaceAll(",", ""))),
  );
  return (
    <dl
      className={styles.recordChart}
      aria-label="累计业务记录数，各环节独立累计，非同批患者转化漏斗"
    >
      {records.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <div className={styles.recordTrack} aria-hidden="true">
            <i
              style={{
                width: `${(Number(value.replaceAll(",", "")) / largest) * 100}%`,
              }}
            />
          </div>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
