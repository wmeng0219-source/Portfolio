import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  chapter,
  closing,
  imageUrl,
  judgementOne,
  judgementThree,
  judgementTwo,
  SOURCE_HEIGHT,
  SOURCE_WIDTH,
} from "./content";
import styles from "./MembershipExperiment.module.css";

function PinLayer({ pins, active }) {
  return (
    <span className={styles.pinLayer} aria-hidden="true">
      {pins.map((pin, index) => {
        const [x, y, width, height] = pin.rect;
        return (
          <span
            key={pin.label}
            className={
              active === index ? `${styles.pin} ${styles.pinActive}` : styles.pin
            }
            style={{
              left: `${(x / SOURCE_WIDTH) * 100}%`,
              top: `${(y / SOURCE_HEIGHT) * 100}%`,
              width: `${(width / SOURCE_WIDTH) * 100}%`,
              height: `${(height / SOURCE_HEIGHT) * 100}%`,
            }}
          >
            <span className={styles.pinIndex}>{index + 1}</span>
          </span>
        );
      })}
    </span>
  );
}

function FullFrame({ name, alt }) {
  return (
    <span className={styles.media}>
      <img
        src={imageUrl(name)}
        alt={alt}
        width={SOURCE_WIDTH}
        height={SOURCE_HEIGHT}
      />
    </span>
  );
}

function CropFrame({ name, crop, alt, displayWidth }) {
  const [x, y, width, height] = crop;
  return (
    <span
      className={styles.cropFrame}
      style={{
        aspectRatio: `${width} / ${height}`,
        maxWidth: displayWidth ? `${displayWidth}px` : undefined,
      }}
    >
      <img
        src={imageUrl(name)}
        alt={alt}
        width={SOURCE_WIDTH}
        height={SOURCE_HEIGHT}
        style={{
          width: `${(SOURCE_WIDTH / width) * 100}%`,
          left: `${(-x / width) * 100}%`,
          top: `${(-y / height) * 100}%`,
        }}
      />
    </span>
  );
}

function FullCaption({ caption, name }) {
  return (
    <figcaption className={styles.captionRow}>
      <span className={styles.captionText}>{caption}</span>
      <a
        className={styles.fullLink}
        href={imageUrl(name)}
        target="_blank"
        rel="noreferrer"
      >
        完整界面 <span aria-hidden="true">↗</span>
      </a>
    </figcaption>
  );
}

function WorkspaceFigure() {
  const { workspace } = judgementOne;
  const [active, setActive] = useState(null);
  return (
    <figure className={styles.evidence}>
      <div className={styles.mediaWrap}>
        <div className={styles.mediaInner}>
          <FullFrame name={workspace.image} alt={workspace.alt} />
          <PinLayer pins={workspace.pins} active={active} />
        </div>
      </div>
      <FullCaption caption={workspace.caption} name={workspace.image} />
      <ol
        className={styles.legend}
        aria-label="工作台中三处需要同时核对的信息"
        onMouseLeave={() => setActive(null)}
      >
        {workspace.pins.map((pin, index) => (
          <li key={pin.label}>
            <button
              type="button"
              className={
                active === index
                  ? `${styles.legendItem} ${styles.legendItemActive}`
                  : styles.legendItem
              }
              aria-pressed={active === index}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span className={styles.legendIndex} aria-hidden="true">
                {index + 1}
              </span>
              <span>
                <span className={styles.legendLabel}>{pin.label}</span>
                <span className={styles.legendNote}>{pin.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function UpgradeFigure() {
  const { upgrade } = judgementOne;
  const [active, setActive] = useState(null);
  return (
    <figure className={styles.evidence}>
      <div className={styles.mediaWrap}>
        <div className={styles.mediaInner}>
          <FullFrame name={upgrade.image} alt={upgrade.alt} />
          <PinLayer pins={upgrade.pins} active={active} />
        </div>
      </div>
      <FullCaption caption={upgrade.caption} name={upgrade.image} />
      <div
        className={styles.cropStrip}
        onMouseLeave={() => setActive(null)}
        aria-label="升级界面中三处字段的局部近读"
      >
        {upgrade.pins.map((pin, index) => (
          <figure
            key={pin.label}
            className={`${styles.cropItem} ${styles[`cropSpan${index + 1}`]}`}
          >
            <a
              className={styles.cropLink}
              href={imageUrl(upgrade.image)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${pin.label}：打开完整升级界面`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              {active === index && (
                <span className={styles.cropActive} aria-hidden="true" />
              )}
              <CropFrame
                name={upgrade.image}
                crop={pin.crop}
                alt={pin.alt}
                displayWidth={pin.crop[2]}
              />
            </a>
            <figcaption className={styles.cropCaption}>
              <span className={styles.cropIndex} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.cropLabel}>{pin.label}</span>
              <span className={styles.cropNote}>{pin.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </figure>
  );
}

function OrdersFigure() {
  const { evidence } = judgementTwo;
  const [active, setActive] = useState(null);
  const [pin] = evidence.pins;
  return (
    <figure className={styles.evidence}>
      <div className={styles.mediaWrap}>
        <div className={styles.mediaInner}>
          <FullFrame name={evidence.image} alt={evidence.alt} />
          <PinLayer pins={evidence.pins} active={active} />
        </div>
      </div>
      <FullCaption caption={evidence.caption} name={evidence.image} />
      <div className={styles.loupeRow}>
        <div className={styles.loupeCopy}>
          <p className={styles.loupeLabel}>局部 ① · 2× 近读</p>
          <p className={styles.loupeText}>
            三笔候选的实付金额相同，仍可按收费时间、门店、就诊信息和备注区分。
          </p>
          <a
            className={styles.fullLink}
            href={imageUrl(evidence.image)}
            target="_blank"
            rel="noreferrer"
          >
            对照完整界面 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a
          className={styles.loupeLink}
          href={imageUrl(evidence.image)}
          target="_blank"
          rel="noreferrer"
          aria-label={`${pin.label}：打开完整手动选择退费账单界面`}
          onMouseEnter={() => setActive(0)}
          onFocus={() => setActive(0)}
          onBlur={() => setActive(null)}
        >
          <CropFrame name={evidence.image} crop={pin.crop} alt={pin.alt} />
        </a>
      </div>
    </figure>
  );
}

function FailureFigure() {
  const { evidence } = judgementThree;
  const [active, setActive] = useState(null);
  return (
    <figure className={styles.evidence}>
      <div className={styles.mediaWrap}>
        <div className={styles.mediaInner}>
          <FullFrame name={evidence.image} alt={evidence.alt} />
          <PinLayer pins={evidence.pins} active={active} />
        </div>
      </div>
      <FullCaption caption={evidence.caption} name={evidence.image} />
      <div className={styles.compare} onMouseLeave={() => setActive(null)}>
        {judgementThree.compare.map((item, index) => (
          <figure key={item.label} className={styles.compareItem}>
            <p className={styles.compareLabel}>{item.label}</p>
            <a
              className={styles.cropLink}
              href={imageUrl(item.image)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.label}：打开完整界面`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <CropFrame
                name={item.image}
                crop={item.crop}
                alt={item.alt}
                displayWidth={item.crop[2]}
              />
            </a>
            <figcaption className={styles.cropCaption}>
              <span className={styles.cropIndex} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.cropNote}>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </figure>
  );
}

export default function MembershipDesignExperiment() {
  const { workspace, upgrade } = judgementOne;
  return (
    <article id="design-experiment-page" className={styles.root} lang="zh-CN">
      <header className={styles.opener}>
        <div className={styles.inner}>
          <div className={styles.topRow}>
            <Link to="/" className={styles.topLink}>
              <span aria-hidden="true">←</span> 返回作品集
            </Link>
            <span className={styles.topMeta}>设计实验 · 仅重排本章</span>
            <Link to="/project/member-automation" className={styles.topLink}>
              完整案例 <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.openerBody}>
            <p className={styles.eyebrow /* taste-skill-ignore: 案例章节身份行，不是装饰性 kicker */}>
              <span>{chapter.case}</span>
              <span className={styles.eyebrowDivider} aria-hidden="true">
                /
              </span>
              <span>{chapter.chapter}</span>
            </p>
            <h1
              className={styles.display}
              aria-label="让办理有依据，让中断能继续"
            >
              {chapter.title.map((line) => (
                <span key={line} className={styles.displayLine} aria-hidden="true">
                  {line}
                </span>
              ))}
            </h1>
            <p className={styles.lede}>{chapter.lede}</p>
          </div>

          <nav className={styles.map} aria-label="本章的三项设计判断">
            {chapter.map.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.mapItem}
                onClick={() => {
                  const node = document.getElementById(item.id);
                  node?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                    block: "start",
                  });
                }}
              >
                <span className={styles.mapNumeral} aria-hidden="true">
                  {item.numeral}
                </span>
                <span className={styles.mapTitle}>{item.title}</span>
                <span className={styles.mapNote}>{item.note}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="judgement-1" className={styles.sectionLight}>
          <div className={styles.inner}>
            <div className={styles.headBlock}>
              <p className={styles.judgeLabel}>
                判断 <span className={styles.judgeNumeral}>一</span>
                <span className={styles.judgeTopicInline}>
                  {judgementOne.topic}
                </span>
              </p>
              <h2 className={styles.h2}>
                {judgementOne.title.map((line) => (
                  <span key={line} className={styles.headLine}>
                    {line}
                  </span>
                ))}
              </h2>
              <div className={styles.prose}>
                {judgementOne.prose.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <WorkspaceFigure />
            <UpgradeFigure />

            <p className={styles.asideNote}>{judgementOne.note}</p>
          </div>
        </section>

        <section id="judgement-2" className={styles.sectionDark}>
          <div className={styles.inner}>
            <p className={styles.judgeLabelDark}>
              判断 <span className={styles.judgeNumeral}>二</span>
              <span className={styles.judgeTopicDark}>
                {judgementTwo.topic}
              </span>
            </p>

            <div className={styles.headSplit}>
              <h2
                className={styles.h2Dark}
                aria-label="依据不唯一时，先解决是哪一笔"
              >
                {judgementTwo.title.map((line) => (
                  <span key={line} className={styles.headLine} aria-hidden="true">
                    {line}
                  </span>
                ))}
              </h2>
              <div className={styles.proseDark}>
                {judgementTwo.prose.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <ol className={styles.conditions} aria-label="原账单的三种匹配情况">
              {judgementTwo.conditions.map((condition) => (
                <li key={condition.label}>
                  <span className={styles.conditionLabel}>
                    {condition.label}
                  </span>
                  <span className={styles.conditionText}>
                    {condition.text}
                  </span>
                </li>
              ))}
            </ol>

            <OrdersFigure />

            <p className={styles.asideNoteDark}>{judgementTwo.note}</p>
          </div>
        </section>

        <section id="judgement-3" className={styles.sectionTint}>
          <div className={styles.inner}>
            <div className={styles.headBlock}>
              <p className={styles.judgeLabel}>
                判断 <span className={styles.judgeNumeral}>三</span>
                <span className={styles.judgeTopicInline}>
                  {judgementThree.topic}
                </span>
              </p>
              <h2 className={styles.h2}>{judgementThree.title}</h2>
            </div>

            <div className={styles.statementGrid}>
              <p className={styles.statement}>{judgementThree.statement}</p>
              <div className={styles.statementSide}>
                <div className={styles.prose}>
                  {judgementThree.prose.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
                <p className={styles.decision}>{judgementThree.decision}</p>
              </div>
            </div>

            <FailureFigure />

            <p className={styles.asideNote}>{judgementThree.note}</p>
          </div>
        </section>
      </main>

      <footer className={styles.closing}>
        <div className={styles.inner}>
          <p className={styles.closeLabel}>{closing.label}</p>
          <p className={styles.closeStatement}>{closing.statement}</p>
          <div className={styles.closeMeta}>
            <div className={styles.closeLinks}>
              <Link to="/project/member-automation" className={styles.closeLink}>
                返回完整案例 <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/" className={styles.closeLink}>
                返回作品集 <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className={styles.closeScope}>
              实验页面 · 仅重排「会员办理流程重构」一章，未改动其他章节与全局设计规范。
            </p>
          </div>
          <p className={styles.closeDisclaimer}>{closing.disclaimer}</p>
          <p className={styles.sourceNote}>
            截图取自 {workspace.image}-full.jpg、{upgrade.image}-full.jpg、
            orders-full.jpg、failure-full.jpg、success-full.jpg；裁切坐标对应 2400 ×
            1350 原图。
          </p>
        </div>
      </footer>
    </article>
  );
}
