import React from "react";
import styles from "./Orthodontics.module.css";

export function WorkflowComparison({ zh }) {
  const rows = zh
    ? [
        ["筛查入口", "快筛与面评功能零散", "统一使用咬合筛查"],
        [
          "角色任务",
          "表单混合多个角色的任务",
          "按职责拆分，正畸医生填写专业结论",
        ],
        [
          "过程追踪",
          "快筛已有结果与看板，后续进展依赖较后置的收费记录",
          "关联筛查、专业结论与后续收费节点",
        ],
      ]
    : [
        [
          "Entry points",
          "Fragmented fast screening and assessment",
          "One occlusal screening entry",
        ],
        [
          "Responsibilities",
          "Tasks from several roles mixed in one form",
          "Split by responsibility; orthodontists complete specialist conclusions",
        ],
        [
          "Progress",
          "Fast screening already had results and dashboards; later charges indicated subsequent progress",
          "Link screening, specialist conclusions and later charges",
        ],
      ];
  return (
    <figure
      className={styles.figure}
      aria-label={
        zh ? "筛查机制旧新对照" : "Screening mechanisms before and after"
      }
    >
      <h4 className={styles.figureTitle}>
        {zh
          ? "从分散功能，到共同协作机制"
          : "From fragmented features to shared collaboration"}
      </h4>
      <div
        className={styles.comparisonTable}
        role="table"
        aria-label={zh ? "旧机制与新机制" : "Previous and current mechanisms"}
      >
        <div className={styles.comparisonHeader} role="row">
          {[
            zh ? "比较维度" : "Dimension",
            zh ? "原有机制" : "Before",
            zh ? "调整后" : "After",
          ].map((label) => (
            <span role="columnheader" key={label}>
              {label}
            </span>
          ))}
        </div>
        {rows.map(([label, before, after]) => (
          <div className={styles.comparisonRow} role="row" key={label}>
            <strong role="rowheader">{label}</strong>
            <p role="cell">{before}</p>
            <p role="cell">{after}</p>
          </div>
        ))}
      </div>
      <figcaption>
        {zh
          ? "按入口、任务与追踪三个维度对照；原有快筛已有数据与看板，变化在于整合入口、明确分工并连接后续进展。"
          : "Compared across entry points, responsibilities and tracking. Fast screening already had data and dashboards; the change consolidates entry points, clarifies responsibilities and connects subsequent progress."}
      </figcaption>
    </figure>
  );
}

export function RecommendationScope({ zh }) {
  return (
    <figure
      aria-label={
        zh
          ? "推荐候选与执行任务的区别"
          : "Candidate recommendations and execution tasks"
      }
      className={styles.figure}
      data-mechanism="recommendation-scope"
    >
      <h4 className={styles.figureTitle}>
        {zh
          ? "候选范围与执行任务，分开管理"
          : "Manage candidate scope and assigned work separately"}
      </h4>
      <div className={styles.scopeMap}>
        <div className={styles.scopeNode} data-meaning="candidate-pool">
          <span className={styles.diagramLabel}>
            {zh ? "候选范围" : "Candidate scope"}
          </span>
          <strong>{zh ? "推荐候选" : "Recommendation pool"}</strong>
          <p>
            {zh ? "按优先级分批推荐" : "Recommended in priority-based batches"}
          </p>
        </div>
        <div className={styles.assignmentRoutes}>
          <p className={styles.diagramLabel}>
            {zh ? "两种任务安排方式" : "Two ways to assign tasks"}
          </p>
          <div>
            <strong>
              {zh
                ? "系统安排高优先级患者"
                : "System assigns high-priority patients"}
            </strong>
            <p>
              {zh
                ? "原有预约中添加筛查项目"
                : "Add screening to an existing appointment"}
            </p>
            <span className={styles.routeArrow} aria-hidden="true">
              →
            </span>
          </div>
          <div>
            <strong>{zh ? "医生主动补充" : "Dentist adds candidates"}</strong>
            <p>
              {zh
                ? "需要补充时，从推荐池选择"
                : "Select from the pool when more are needed"}
            </p>
            <span className={styles.routeArrow} aria-hidden="true">
              →
            </span>
          </div>
        </div>
        <div className={styles.scopeNode} data-meaning="execution-tasks">
          <span className={styles.diagramLabel}>
            {zh ? "执行范围" : "Execution scope"}
          </span>
          <strong>{zh ? "实际筛查任务" : "Assigned screening tasks"}</strong>
          <p>
            {zh ? "需要执行和管控的工作" : "Work to be carried out and managed"}
          </p>
        </div>
      </div>
      <figcaption>
        {zh
          ? "推荐池是候选范围，不等同于当天执行任务；不是删除推荐后自动补齐固定数量。"
          : "The recommendation pool is a candidate scope, not the day's execution list. Removing a recommendation does not automatically refill a fixed quota."}
      </figcaption>
    </figure>
  );
}

export function RoleFlow({ zh }) {
  const roles = zh
    ? [
        ["护士", "问诊与资料采集"],
        ["儿牙医生", "初步筛查填写"],
        ["正畸医生", "专业判断与结论填写"],
      ]
    : [
        ["Nurse", "Consultation information & record collection"],
        ["Pediatric dentist", "Initial screening"],
        ["Orthodontist", "Specialist judgment & conclusions"],
      ];
  return (
    <figure
      aria-label={zh ? "角色协作示意" : "Role collaboration illustration"}
      className={styles.figure}
    >
      <h4 className={styles.figureTitle}>
        {zh
          ? "职责分开，记录共同完善"
          : "Separate responsibilities, one shared record"}
      </h4>
      <div className={styles.recordMap} data-meaning="shared-record">
        <p className={styles.diagramLabel}>
          {zh
            ? "评估依据 · 同一份筛查记录"
            : "Assessment · One shared screening record"}
        </p>
        <dl className={styles.contributions}>
          {roles.map(([role, task]) => (
            <div key={role}>
              <dt>{role}</dt>
              <dd>{task}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.communication} data-meaning="family-communication">
        <p className={styles.diagramLabel}>
          {zh
            ? "家长沟通 · 从诊间延续到离店后"
            : "Family communication · During and after the visit"}
        </p>
        <div className={styles.communicationBridge}>
          <div>
            <strong>{zh ? "诊间" : "During the visit"}</strong>
            <p>
              {zh
                ? "儿牙医生结合影像与口扫模型"
                : "Pediatric dentist uses images and oral scans"}
            </p>
            <p>
              {zh
                ? "解释咬合情况，了解家长诉求"
                : "Explain findings and understand family concerns"}
            </p>
          </div>
          <span className={styles.reportBridge}>
            {zh ? "报告承接" : "Report carries the explanation"}
          </span>
          <div>
            <strong>{zh ? "离店后" : "After the visit"}</strong>
            <p>
              {zh
                ? "报告提炼讲解、专业结论与后续建议"
                : "Report distills the explanation, specialist conclusions and next steps"}
            </p>
            <p>
              {zh
                ? "供家长回顾、家人转述与后续沟通"
                : "For family review, sharing and follow-up"}
            </p>
          </div>
        </div>
      </div>
      <figcaption>
        <p>
          {zh
            ? "各角色接续完善同一记录；不表示每个病例必须固定顺序一次完成。"
            : "Each role builds on the same record; handoffs do not require a fixed sequence completed in one visit."}
        </p>
        <p>
          {zh
            ? "门店与业务团队共同推进患者沟通与后续转化。"
            : "Clinic and business teams jointly advance patient communication and subsequent conversion."}
        </p>
      </figcaption>
    </figure>
  );
}

export function PeriodComparison({ zh }) {
  return (
    <figure
      aria-label={zh ? "同期需矫成交率区间" : "Same-season conversion ranges"}
      className={styles.figure}
      data-evidence="period-comparison"
    >
      <h4 className={styles.figureTitle}>
        {zh ? "同一指标，同期区间对照" : "One metric, same-season ranges"}
      </h4>
      <div className={styles.rangeChart}>
        {[
          ["2025", 30, 40],
          ["2026", 50, 60],
        ].map(([year, start, end]) => (
          <div className={styles.rangeRow} key={year}>
            <span>{zh ? `${year} 年 2—4 月` : `Feb-Apr ${year}`}</span>
            <div className={styles.rangeTrack}>
              <span
                className={`${styles.range} ${year === "2026" ? styles.currentRange : ""}`}
                style={{ left: `${start}%`, width: `${end - start}%` }}
              >
                <strong>
                  {zh ? "约 " : "~"}
                  {start}-{end}%
                </strong>
              </span>
            </div>
          </div>
        ))}
        <div className={styles.axis}>
          <span />
          <div>
            {[0, 25, 50, 75, 100].map((v) => (
              <span key={v} style={{ left: `${v}%` }}>
                {v}%
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption>
        <p>
          {zh
            ? "口径：判定需矫后产生矫正收费的患者数 / 需矫患者数。来源：内部全门店业务报表。"
            : "Definition: patients assessed as needing treatment who subsequently incurred an orthodontic charge / patients assessed as needing treatment. Source: internal business reports across clinics."}
        </p>
        <p>
          {zh
            ? "这一业务变化不能全部归因于本项目。"
            : "This business change cannot be attributed entirely to this project."}
        </p>
      </figcaption>
    </figure>
  );
}

export function TrackingStages({ zh }) {
  const stages = zh
    ? [
        ["筛查", "随原有就诊开展", "筛查任务与记录"],
        ["专业结论", "正畸医生判断并填写", "专业评估依据"],
        ["后续业务", "关联资料采集、方案沟通及成交收费", "实际收费记录"],
      ]
    : [
        [
          "Screening",
          "During an existing visit",
          "Screening tasks and records",
        ],
        [
          "Specialist conclusions",
          "Assessed and completed by orthodontists",
          "Specialist assessment basis",
        ],
        [
          "Subsequent business",
          "Link record collection, plan communication and treatment charges",
          "Actual charge records",
        ],
      ];
  return (
    <figure
      className={styles.figure}
      aria-label={
        zh ? "业务节点与追踪依据" : "Business nodes and tracking evidence"
      }
    >
      <h4 className={styles.figureTitle}>
        {zh
          ? "让业务节点与记录依据对应"
          : "Connect business nodes with their records"}
      </h4>
      <dl className={styles.trackingStages}>
        {stages.map(([stage, task, evidence]) => (
          <div key={stage}>
            <dt>{stage}</dt>
            <dd>{task}</dd>
            <dd>{evidence}</dd>
          </div>
        ))}
      </dl>
      <figcaption>
        {zh
          ? "按业务节点说明追踪依据，不代表人数或每位患者必经的固定顺序；筛查时资料采集与后续按收费识别的资料节点口径不同。"
          : "Shows the records used to track business nodes, not patient counts or a mandatory sequence. Record collection during screening differs from the later stage identified through charges."}
      </figcaption>
    </figure>
  );
}

export function RolloutEvidence({ zh }) {
  return (
    <figure
      className={styles.figure}
      aria-label={zh ? "实际使用与上线范围" : "Actual use and rollout scope"}
    >
      <div className={styles.evidenceSummary}>
        <div>
          <p className={styles.diagramLabel}>
            {zh ? "实际使用记录" : "Recorded use"}
          </p>
          <p className={styles.evidenceValue}>
            18,460 <span>{zh ? "条" : "records"}</span>
          </p>
          <h4>{zh ? "提交筛查结论记录" : "Submitted screening conclusions"}</h4>
          <p>
            {zh
              ? "累计记录量，不是去重患者数。"
              : "Cumulative records, not unique patients."}
          </p>
        </div>
        <div>
          <p className={styles.diagramLabel}>
            {zh ? "上线范围" : "Rollout scope"}
          </p>
          <p className={styles.evidenceValue}>2026.02</p>
          <h4>{zh ? "全门店上线" : "Rolled out across clinics"}</h4>
          <p>
            {zh
              ? "试点与验证后推广，不等于每家门店的采纳率。"
              : "Rollout after pilots and validation; not a measure of adoption in each clinic."}
          </p>
        </div>
      </div>
      <figcaption>
        {zh
          ? "来源：内部累计统计与已确认项目时间线；同期成交率另列，不与累计记录混用。"
          : "Sources: internal cumulative statistics and the confirmed project timeline. Same-season conversion is presented separately from cumulative records."}
      </figcaption>
    </figure>
  );
}
