import React, { useEffect, useRef, useState } from "react";
import styles from "./Orthodontics.module.css";

export function Evidence({
  image,
  slot,
  title,
  alt,
  onZoom,
  className = "",
  imageClassName = "",
  caption,
  scrollPreview = false,
}) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef(null);
  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;
    // Start nearby high-resolution originals before they enter the reading
    // area. Distant screenshots keep native lazy loading and aren't all
    // decoded at page startup.
    if (typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.setAttribute("loading", "eager");
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [image.src]);
  const open = (event) => onZoom({ ...image, title, alt }, event.currentTarget);
  const screenshot = (
    <img
      ref={imageRef}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
  return (
    <figure
      className={`${styles.evidence} ${className}`}
      data-evidence={slot}
      aria-label={title}
    >
      <div
        className={`${styles.imageFrame} ${imageClassName}`}
        data-case-motion="image"
        role={scrollPreview ? "region" : undefined}
        tabIndex={scrollPreview ? 0 : undefined}
        aria-label={scrollPreview ? "家长报告预览，可上下滚动" : undefined}
      >
        {failed ? (
          <p className={styles.imageError} role="status">
            {title}暂时无法加载，请刷新页面重试。
          </p>
        ) : scrollPreview ? (
          screenshot
        ) : (
          <button
            type="button"
            className={styles.imageButton}
            onClick={open}
            aria-label={`放大查看：${title}`}
          >
            {screenshot}
          </button>
        )}
      </div>
      {caption !== null && (
        <figcaption className={styles.evidenceCaption}>
          <span>{caption || title}</span>
        </figcaption>
      )}
    </figure>
  );
}

export function ImageRegion({ image, alt, nearby = true, onError }) {
  const { region } = image;
  return (
    <svg
      viewBox={`${region.x} ${region.y} ${region.width} ${region.height}`}
      width={region.width}
      height={region.height}
      role="img"
      aria-label={alt}
    >
      <image
        href={nearby ? image.src : undefined}
        width={image.sourceWidth}
        height={image.sourceHeight}
        onError={onError}
      />
    </svg>
  );
}

export function Lightbox({ item, onClose, closeRef }) {
  const [failedSource, setFailedSource] = useState(null);
  if (!item) return null;
  function keepFocus(event) {
    if (event.key !== "Tab") return;
    const targets = [
      ...event.currentTarget.querySelectorAll('button, [tabindex="0"]'),
    ];
    const first = targets[0],
      last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || item.alt}
      onKeyDown={keepFocus}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.lightboxPanel}
        style={{ "--preview-width": `${Math.min(item.width, 1800)}px` }}
      >
        <div className={styles.lightboxBar}>
          <p>{item.title}</p>
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
          tabIndex={0}
          aria-label={
            item.long
              ? "完整报告图片，可滚动查看"
              : "完整界面图片，可滚动查看细节"
          }
        >
          {failedSource === item.src ? (
            <p role="status">{item.title}暂时无法加载，请刷新页面重试。</p>
          ) : item.region ? (
            <ImageRegion
              image={item}
              alt={item.alt}
              onError={() => setFailedSource(item.src)}
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
              onError={() => setFailedSource(item.src)}
            />
          )}
        </div>
        <p className={styles.lightboxNote}>
          {item.long
            ? "报告为长图，可上下滚动查看完整内容。"
            : "可滚动查看细节；点击空白处或按 Esc 关闭。"}
        </p>
      </div>
    </div>
  );
}
