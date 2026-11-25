import React, { useEffect, useRef, useState } from "react";
import { ImageRegion } from "./Evidence";
import styles from "./Orthodontics.module.css";

const deviceBase = `${import.meta.env.BASE_URL}images/ortho/report-device/`;
const layers = [
  ["748-634.svg", styles.phoneButtons, 415, 669],
  ["748-667.svg", styles.phoneBody, 409, 843],
  ["748-678.svg", styles.phoneBorder, 401, 835],
];

export function ReportPreview({
  image,
  detail,
  onZoom,
  caption = "家长端筛查报告",
  detailCaption = "同源局部｜3D模型",
}) {
  const screen = useRef(null);
  const report = useRef(null);
  const positioned = useRef(false);
  const [failed, setFailed] = useState(false);
  const [nearby, setNearby] = useState(
    () => typeof IntersectionObserver !== "function",
  );

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        report.current?.setAttribute("loading", "eager");
        setNearby(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(screen.current);
    return () => observer.disconnect();
  }, []);

  function showDesignPosition() {
    if (positioned.current || !screen.current) return;
    positioned.current = true;
    // V7 789:3489 starts at y=0. Preserve the reader's position after first load.
    screen.current.scrollTop = 0;
  }
  const openReport = (event) =>
    onZoom(
      { ...image, title: "家长端咬合筛查报告", alt: "完整咬合筛查报告" },
      event.currentTarget,
    );
  const openDetail = (event) =>
    onZoom(
      { ...detail, title: "报告中的口腔3D模型", alt: "报告中的口腔3D模型局部" },
      event.currentTarget,
    );

  return (
    <div className={styles.reportComposition}>
      <figure
        className={styles.reportDeviceFigure}
        data-evidence="family-report"
        aria-label="家长端咬合筛查报告"
      >
        <div className={styles.phoneDevice} data-case-motion="image">
          {layers.map(([file, className, width, height]) => (
            <img
              key={file}
              className={`${styles.phoneLayer} ${className}`}
              src={`${deviceBase}${file}`}
              width={width}
              height={height}
              alt=""
              aria-hidden="true"
            />
          ))}
          <div className={styles.phoneScreen}>
            <div
              ref={screen}
              className={styles.reportScroller}
              role="region"
              tabIndex={0}
              aria-label="家长报告预览，可上下滚动"
            >
              {failed ? (
                <p className={styles.imageError} role="status">
                  家长端咬合筛查报告暂时无法加载，请刷新页面重试。
                </p>
              ) : (
                <img
                  ref={report}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt="家长端完整咬合筛查报告预览：专业结论、口腔模型与后续建议"
                  loading="lazy"
                  decoding="async"
                  onLoad={showDesignPosition}
                  onError={() => setFailed(true)}
                />
              )}
            </div>
          </div>
          <img
            className={`${styles.phoneLayer} ${styles.phoneIsland}`}
            src={`${deviceBase}748-684.svg`}
            width={111}
            height={31}
            alt=""
            aria-hidden="true"
          />
        </div>
        <figcaption className={styles.evidenceCaption}>
          <button
            type="button"
            className={styles.captionButton}
            onClick={openReport}
            aria-label="放大查看：家长端筛查报告"
          >
            {caption}
          </button>
        </figcaption>
      </figure>
      {detail && (
        <figure
          className={styles.reportMagnified}
          aria-label="报告局部放大：口腔3D模型"
        >
          <figcaption className={styles.note}>{detailCaption}</figcaption>
          <div className={styles.reportDetailFrame} data-case-motion="image">
            {failed ? (
              <p className={styles.imageError}>
                报告局部暂时无法加载，请刷新页面重试。
              </p>
            ) : (
              <button
                type="button"
                className={styles.imageButton}
                onClick={openDetail}
                aria-label="放大查看：报告中的口腔3D模型"
              >
                <ImageRegion
                  image={detail}
                  alt="与完整报告对应的口腔3D模型局部"
                  nearby={nearby}
                  onError={() => setFailed(true)}
                />
              </button>
            )}
          </div>
        </figure>
      )}
    </div>
  );
}
