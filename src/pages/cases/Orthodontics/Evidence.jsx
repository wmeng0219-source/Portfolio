import React from "react";
import styles from "./Orthodontics.module.css";

export function Evidence({
  image,
  title,
  alt,
  note,
  annotations = [],
  boxes = [],
  pins = [],
  onZoom,
  zoomImage,
  className = "",
  imageClassName = "",
  scrollable = false,
}) {
  const zoom = zoomImage || image;
  return (
    <figure
      className={`${styles.evidence} ${scrollable ? styles.scrollable : ""} ${className}`}
      aria-label={title || alt}
    >
      {title && <p className={styles.evidenceTitle}>{title}</p>}
      <div className={`${styles.imageFrame} ${imageClassName}`}>
        <button
          type="button"
          className={styles.imageButton}
          onClick={(event) => onZoom({ ...zoom, title, alt }, event.currentTarget)}
          aria-label={`放大查看：${title || alt}`}
        >
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
          {pins.map((pin) => (
            <span
              key={`pin-${pin.n}`}
              className={styles.annotationPinOnly}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-hidden="true"
            >
              {pin.n}
            </span>
          ))}
          {boxes.map((box) => (
            <span
              key={box.n}
              className={styles.annotationBox}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.w}%`,
                height: `${box.h}%`,
              }}
              aria-hidden="true"
            >
              <span className={styles.annotationPin}>{box.n}</span>
            </span>
          ))}
          <span className={styles.zoomHint} aria-hidden="true">
            点击放大 ↗
          </span>
        </button>
      </div>
      {annotations.length > 0 && (
        <dl className={styles.annotationList}>
          {annotations.map((annotation) => (
            <div key={annotation.n}>
              <dt>
                <span className={styles.legendNumber}>{annotation.n}</span>
                {annotation.title}
              </dt>
              <dd>{annotation.body}</dd>
            </div>
          ))}
        </dl>
      )}
      {scrollable && (
        <p className={styles.panHint} aria-hidden="true">
          左右滑动查看细节
        </p>
      )}
      {note && <figcaption className={styles.evidenceNote}>{note}</figcaption>}
    </figure>
  );
}

export function Lightbox({ item, onClose, closeRef }) {
  if (!item) return null;
  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || item.alt}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.lightboxPanel}>
        <div className={styles.lightboxBar}>
          <p>{item.title || "界面预览"}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭图片预览"
          >
            关闭 ×
          </button>
        </div>
        <div
          className={`${styles.lightboxScroll} ${item.long ? styles.lightboxLong : ""}`}
          tabIndex={item.long ? 0 : undefined}
          aria-label={item.long ? "完整报告图片，可滚动查看" : undefined}
        >
          <img src={item.src} alt={item.alt} decoding="async" />
        </div>
        <p className={styles.lightboxNote}>
          {item.long
            ? "报告为长图，可上下滚动查看完整内容；已对患者与医生信息脱敏。"
            : "点击空白处或按 Esc 关闭。"}
        </p>
      </div>
    </div>
  );
}
