import React from "react";
import styles from "./Orthodontics.module.css";

export function OldFlow({ flow, title, note }) {
  return (
    <figure className={styles.flowFigure} aria-label="旧流程示意">
      <div className={styles.flowHead}>
        <h3>{title}</h3>
        <span className={styles.diagramLabel}>简化示意</span>
      </div>
      <ol className={styles.flowList}>
        {flow.map((item, index) => (
          <li key={item.step} className={styles.flowStep}>
            <div className={styles.flowTop}>
              <span className={styles.flowIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.flowTag}>{item.tag}</span>
            </div>
            <strong>{item.step}</strong>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

export function RecommendationScope({ diagram }) {
  return (
    <figure className={styles.scopeFigure} aria-label="推荐候选与执行任务的区别">
      <div className={styles.scopeGrid}>
        <div className={styles.scopeNode} data-node="candidate">
          <span className={styles.diagramLabel}>{diagram.candidateLabel}</span>
          <strong>{diagram.candidateTitle}</strong>
          <p>{diagram.candidateBody}</p>
        </div>
        <div className={styles.routeList}>
          <p className={styles.diagramLabel}>{diagram.routesLabel}</p>
          {diagram.routes.map((route) => (
            <div className={styles.route} key={route.title}>
              <div>
                <strong>{route.title}</strong>
                <p>{route.body}</p>
              </div>
              <span className={styles.routeArrow} aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className={styles.scopeNode} data-node="execution">
          <span className={styles.diagramLabel}>{diagram.executionLabel}</span>
          <strong>{diagram.executionTitle}</strong>
          <p>{diagram.executionBody}</p>
        </div>
      </div>
      <figcaption>{diagram.note}</figcaption>
    </figure>
  );
}

export function RoleRelay({ roles, recordLabel, note }) {
  return (
    <figure className={styles.relayFigure} aria-label="角色接续示意">
      <div className={styles.relayGrid}>
        {roles.map((role, index) => (
          <div className={styles.roleNode} key={role.role}>
            <span className={styles.roleIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{role.role}</strong>
            <p className={styles.roleTask}>{role.task}</p>
            <p className={styles.roleBody}>{role.body}</p>
          </div>
        ))}
      </div>
      <div className={styles.recordBar}>
        <span>{recordLabel}</span>
        <span className={styles.recordBarLine} aria-hidden="true" />
      </div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

export function Timeline({ items }) {
  return (
    <ol className={styles.timeline} aria-label="项目上线时间线">
      {items.map((item) => (
        <li key={item.date}>
          <span className={styles.timelineDot} aria-hidden="true" />
          <span className={styles.timelineDate}>{item.date}</span>
          <span className={styles.timelineLabel}>{item.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function ConversionRange({ before, after, title, definition }) {
  const rows = [
    { label: "2025 年 2—4 月", start: before[0], end: before[1], current: false },
    { label: "2026 年 2—4 月", start: after[0], end: after[1], current: true },
  ];
  return (
    <figure className={styles.rangeFigure} aria-label="需矫成交率同期变化">
      <h3>{title}</h3>
      <div className={styles.rangeChart}>
        {rows.map((row) => (
          <div className={styles.rangeRow} key={row.label}>
            <span>{row.label}</span>
            <div className={styles.rangeTrack}>
              <span
                className={`${styles.range} ${row.current ? styles.currentRange : ""}`}
                style={{
                  left: `${row.start}%`,
                  width: `${row.end - row.start}%`,
                }}
              >
                <strong>
                  约 {row.start}%–{row.end}%
                </strong>
              </span>
            </div>
          </div>
        ))}
        <div className={styles.axis}>
          <span />
          <div>
            {[0, 25, 50, 75, 100].map((value) => (
              <span key={value} style={{ left: `${value}%` }}>
                {value}%
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption>{definition}</figcaption>
    </figure>
  );
}
