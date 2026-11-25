import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Evidence } from "../Orthodontics/Evidence";
import styles from "./PacsAi.module.css";

export function Flow({ steps, kind }) {
  return (
    <ol
      className={styles.flow + " " + styles[kind]}
      aria-label={
        kind === "original"
          ? "原有业务流程"
          : kind === "new"
            ? "改造后的业务流程"
            : "医疗质控管理流程"
      }
    >
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <li
            className={
              kind === "new" && [2, 3].includes(i) ? styles.highlight : ""
            }
          >
            <strong>{Array.isArray(step) ? step[0] : step}</strong>
            {Array.isArray(step) && step[1] && <span>{step[1]}</span>}
          </li>
          {i < steps.length - 1 && (
            <li className={styles.flowArrow} aria-hidden="true">
              →
            </li>
          )}
        </React.Fragment>
      ))}
    </ol>
  );
}
export function WorkbenchAnnotations() {
  return (
    <svg
      className={styles.screenMarks}
      viewBox="0 0 1080 675"
      width="1080"
      height="675"
      aria-hidden="true"
    >
      <g fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 4">
        <rect x="187" y="115" width="705" height="495" rx="3" />
        <rect x="567" y="407" width="132" height="160" rx="3" />
        <rect x="893" y="115" width="168" height="543" rx="3" />
      </g>
      {[
        [187, 90, "①"],
        [565, 380, "②"],
        [893, 89, "③"],
      ].map(([x, y, t]) => (
        <g key={t}>
          <rect x={x} y={y} width="24" height="24" rx="4" fill="white" />
          <text
            x={x + 12}
            y={y + 12}
            dominantBaseline="central"
            textAnchor="middle"
            fill="#684a9e"
            fontSize="14"
            fontWeight="700"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}
export function ReuseMechanism({ copy }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context, observer;
    const reset = () => {
      observer?.disconnect();
      context?.revert();
    };
    const update = () => {
      reset();
      if (preference.matches) return;
      const values = element.querySelectorAll("[data-reuse-value]");
      context = gsap.context(() => gsap.set(values, { opacity: 0 }), element);
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();
          context.add(() =>
            gsap.to(values, {
              opacity: 1,
              duration: 0.4,
              stagger: 0.12,
              ease: "power2.out",
              clearProps: "opacity",
            }),
          );
        },
        { threshold: 0.15 },
      );
      observer.observe(element);
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      reset();
      preference.removeEventListener("change", update);
    };
  }, []);
  return (
    <figure className={styles.stack24} aria-label="诊断内容复用机制" ref={root}>
      <div className={styles.reuseGrid}>
        <div className={styles.stack16}>
          <h3>{copy.sourceTitle}</h3>
          <p className={styles.note}>{copy.sourceNote}</p>
          <div className={styles.fields}>
            {copy.sourceFields.map(([label, value], i) => (
              <div
                className={
                  styles.sourceRow + " " + (i === 4 ? styles.longRow : "")
                }
                key={label}
              >
                <span className={styles.fieldLabel}>{label}</span>
                <span
                  className={
                    styles.fieldValue + " " + (i > 1 ? styles.copied : "")
                  }
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stack16}>
          <h3>{copy.currentTitle}</h3>
          <div className={styles.currentRow + " " + styles.columnTitles}>
            <span />
            <span>{copy.columnTitles[0]}</span>
            <span />
            <strong>
              {copy.columnTitles[1].split(" · ")[0]} ·{" "}
              <span className={styles.mobileTitle}>
                {copy.columnTitles[1].split(" · ")[1]}
              </span>
            </strong>
          </div>
          <div className={styles.fields}>
            {copy.currentFields.map(([label, before, symbol, after], i) => (
              <div
                data-reuse-field={
                  [
                    "tooth",
                    "orientation",
                    "density",
                    "diagnosis",
                    "description",
                  ][i]
                }
                className={
                  styles.currentRow + " " + (i === 4 ? styles.longRow : "")
                }
                key={label}
              >
                <span className={styles.fieldLabel}>{label}</span>
                <span
                  className={
                    styles.fieldValue + " " + (i > 1 ? styles.pending : "")
                  }
                >
                  {before}
                </span>
                <span
                  className={
                    styles.stateSymbol + " " + (i > 1 ? styles.accent : "")
                  }
                >
                  {symbol}
                </span>
                <span
                  className={
                    styles.fieldValue + " " + (i > 1 ? styles.copied : "")
                  }
                >
                  <span {...(i > 1 ? { "data-reuse-value": "" } : {})}>
                    {after}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.accent}>
        <strong>{copy.gate}</strong>
      </p>
      <figcaption className={styles.note}>{copy.caption}</figcaption>
    </figure>
  );
}
export function AiWorkbench({ copy, image, onZoom }) {
  return (
    <div className={styles.aiScene}>
      <div className={styles.aiImage}>
        <Evidence
          image={image}
          slot="ai-workbench"
          title="AI 辅助读片工作台"
          alt="完整 AI 辅助读片工作台：影像中显示疑似异常，右侧为医生判断卡片及眼睛图标"
          onZoom={onZoom}
          caption={copy.caption}
        />
      </div>
      <aside className={styles.eyeNote}>
        <h3>{copy.eyeTitle}</h3>
        <p>{copy.eyeBody}</p>
      </aside>
      <div
        className={styles.eyeAnnotation}
        data-annotation="eye"
        aria-hidden="true"
      >
        <svg
          className={styles.eyeCircle}
          viewBox="0 0 832 520"
          width="832"
          height="520"
        >
          <rect
            x="794.285714"
            y="100.244898"
            width="16"
            height="16"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
        <svg
          className={styles.eyeLeader}
          viewBox="0 0 1080 558"
          width="1080"
          height="558"
        >
          <path
            d="M810.285714 108.244898 H848 V66 H872"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
    </div>
  );
}
export function DecisionTree({ copy }) {
  return (
    <figure
      className={styles.decisionFigure}
      aria-label="AI 识别与病历记录判断关系"
    >
      <div className={styles.decisionDesktop}>
        <svg
          className={styles.decisionPaths}
          viewBox="0 0 760 285"
          width="760"
          height="285"
          aria-hidden="true"
        >
          <path
            d="M380 50 V68 H248 V92 M380 68 H644 V216 M248 142 V174 H116 V216 M248 174 H380 V216"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
        <div className={styles.questionOne}>{copy.questions[0]}</div>
        <div className={styles.questionTwo}>{copy.questions[1]}</div>
        <span className={styles.correctBranch}>{copy.branches[0]}</span>
        <span className={styles.wrongBranch}>{copy.branches[1]}</span>
        <span className={styles.neededBranch}>{copy.branches[2]}</span>
        <span className={styles.unneededBranch}>{copy.branches[3]}</span>
        {copy.outcomes.map((t, i) => (
          <p
            className={styles.treeOutcome + " " + (!i ? styles.accent : "")}
            style={{ left: i * 264 }}
            key={t}
          >
            {t}
          </p>
        ))}
      </div>
      <div className={styles.decisionMobile}>
        <h4>{copy.questions[0]}</h4>
        <div className={styles.mobileBranch}>
          <strong className={styles.accent}>{copy.branches[0]}</strong>
          <h4>{copy.questions[1]}</h4>
          {[0, 1].map((i) => (
            <div className={styles.mobileOutcome} key={i}>
              <span>{copy.branches[i + 2]}</span>
              <strong>{copy.outcomes[i].replace("\n", "")}</strong>
            </div>
          ))}
        </div>
        <div className={styles.mobileBranch}>
          <span>{copy.branches[1]}</span>
          <strong>{copy.outcomes[2]}</strong>
        </div>
      </div>
      <figcaption className={styles.note}>{copy.caption}</figcaption>
    </figure>
  );
}
export function RecordDestinations({ copy }) {
  return (
    <figure aria-label="读片过程及记录的三种用途">
      <div className={styles.recordSource}>
        <strong>{copy.source}</strong>
      </div>
      <svg
        className={styles.destinationLines}
        viewBox="0 0 1080 28"
        width="1080"
        height="28"
        aria-hidden="true"
      >
        <path
          d="M540 0 V14 M164 28 V14 H916 V28 M540 14 V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <div className={styles.threeColumns + " " + styles.destinations}>
        {copy.services.map((item) => (
          <div key={item.title} className={styles.destination}>
            <h3>{item.title}</h3>
            {item.body.map((p, i) => (
              <p key={p} className={i === 2 ? styles.note : ""}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}
