import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CaseReaderHeader.module.css";

// Match the membership reader: switch when the cover leaves the 64px topbar.
export function CaseReaderHeader({ title }) {
  const [lightHeader, setLightHeader] = useState(false);

  useEffect(() => {
    const cover = document.getElementById("case-cover");
    if (!cover || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setLightHeader(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`${styles.topbar} ${lightHeader ? styles.lightHeader : ""}`}
      aria-label="返回主页"
    >
      <Link to="/" state={{ scrollTo: "portfolio" }} className={styles.back}>
        <span aria-hidden="true">←</span> 返回主页
      </Link>
      {lightHeader && <span className={styles.readerTitle}>{title}</span>}
    </nav>
  );
}
