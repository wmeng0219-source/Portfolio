import React from "react";
import { pacsVisualSlots } from "./content";
import styles from "./PacsAi.module.css";

export function ChapterHeading({ index, title, eyebrow, id }) {
  return (
    <div className={styles.headingGroup} data-chapter-heading>
      <span className={styles.chapterIndex} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <p className={styles.chapterEyebrow}>{eyebrow}</p>
        <h2 id={id} tabIndex={-1}>
          {title}
        </h2>
      </div>
    </div>
  );
}

function Diagram({ slotId, language, children }) {
  const slot = pacsVisualSlots[slotId];
  return (
    <figure
      className={styles.diagram}
      data-diagram={slotId}
      data-visual-slot={slotId}
      role="group"
      aria-label={slot.title[language]}
    >
      <p className={styles.diagramTitle}>{slot.title[language]}</p>
      {children}
      <figcaption>
        {slot.brief[language]} ·{" "}
        {language === "zh"
          ? "根据已确认规则整理的示意"
          : "Diagram based on confirmed rules"}
      </figcaption>
    </figure>
  );
}

export function ReviewDiagram({ block, language }) {
  const rows =
    block.rows ||
    block.items.map((item, index) => [
      ["Confirm and continue", "Correct, not for this chart", "Reject"][index],
      item,
    ]);
  return (
    <Diagram slotId="doctor-review" language={language}>
      <div className={styles.reviewSource}>
        {language === "zh" ? "AI 提示 → 医生复核" : "AI cue → Doctor review"}
      </div>
      <dl className={styles.reviewRoutes}>
        {rows.map(([choice, outcome], index) => (
          <div key={choice}>
            <dt>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {choice.replaceAll("**", "")}
            </dt>
            <dd>{outcome}</dd>
          </div>
        ))}
      </dl>
    </Diagram>
  );
}

export function RuleDiagram({ slotId, language }) {
  const zh = language === "zh";
  if (slotId === "record-sync") {
    return (
      <Diagram slotId={slotId} language={language}>
        <ol className={styles.syncPath}>
          <li>
            {zh ? "已完成读片" : "Complete reading"}
            <small>
              {zh
                ? "完整内容 / 明确确认未见明显异常"
                : "Complete findings / Explicit normal result"}
            </small>
          </li>
          <li>
            {zh ? "检查表同步" : "Checklist synchronization"}
            <small>
              {zh
                ? "按影像的读片状态筛选"
                : "Filter by each image’s reading status"}
            </small>
          </li>
          <li>
            {zh ? "病历 · 辅助检查" : "Chart · Auxiliary examination"}
            <small>
              {zh ? "带入完整读片内容" : "Include completed reading content"}
            </small>
          </li>
        </ol>
      </Diagram>
    );
  }
  if (slotId === "reuse-module") {
    return (
      <Diagram slotId={slotId} language={language}>
        <div className={styles.reuseGrid}>
          <div>
            <strong>{zh ? "已有完整标记" : "Existing complete mark"}</strong>
            <p>
              {zh ? "密度 · 诊断 · 描述" : "Density · Diagnosis · Description"}
            </p>
          </div>
          <span className={styles.reuseArrow} aria-hidden="true">
            →
          </span>
          <div>
            <strong>{zh ? "新标记" : "New mark"}</strong>
            <p>
              {zh
                ? "带入三项内容，医生确认适用性"
                : "Import three fields; doctor checks applicability"}
            </p>
          </div>
        </div>
        <p className={styles.diagramNote}>
          {zh
            ? "保留新标记的牙位与方位；三项字段均为空时才可复用，不覆盖已有填写。"
            : "Keep the new mark’s tooth and location. Reuse only when all three fields are empty, without overwriting existing input."}
        </p>
      </Diagram>
    );
  }
  if (slotId === "timeout-fallback") {
    return (
      <Diagram slotId={slotId} language={language}>
        <ol className={styles.syncPath}>
          {(zh
            ? ["超过 5 秒或调用失败", "可选择手动读片", "执行相同的必填检查"]
            : [
                "Wait > 5 seconds or failed call",
                "Manual reading available",
                "Same required-field checks",
              ]
          ).map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
      </Diagram>
    );
  }
  if (slotId === "image-classification") {
    return (
      <Diagram slotId={slotId} language={language}>
        <div className={styles.typeRoutes}>
          <strong>
            {zh ? "确认或纠正影像类型" : "Confirm or correct image type"}
          </strong>
          <dl>
            <div>
              <dt>{zh ? "根尖片 / 咬翼片" : "Periapical / Bitewing"}</dt>
              <dd>
                {zh
                  ? "支持 AI 辅助，也可手动读片"
                  : "AI-assisted or manual reading"}
              </dd>
            </div>
            <div>
              <dt>{zh ? "全景片" : "Panoramic"}</dt>
              <dd>
                {zh
                  ? "手动读片，不展示 AI 数据"
                  : "Manual reading, without AI data"}
              </dd>
            </div>
          </dl>
        </div>
      </Diagram>
    );
  }
  return null;
}

export function SystemFlow({ steps, language, original = false }) {
  return (
    <figure
      className={styles.readingFlow}
      data-diagram={original ? "original-flow" : "system-flow"}
    >
      <ol
        className={
          original ? styles.readingOriginalFlow : styles.readingSystemFlow
        }
      >
        {steps.map((step, index) => (
          <li key={step}>
            <span
              aria-hidden="true"
              data-step={String(index + 1).padStart(2, "0")}
            />
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <figcaption>
        {language === "zh"
          ? "根据真实流程整理的示意"
          : "Diagram based on the actual workflow"}
      </figcaption>
    </figure>
  );
}
