import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PacsCase.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function PacsCase({ project }) {
  const { language } = useLanguage();
  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');

  // Refs for Horizontal Pan
  const panWrapRef = useRef(null);
  const panTrackRef = useRef(null);

  // Refs for Sticky Stack
  const stackWrapRef = useRef(null);

  useEffect(() => {
    // Media query to disable complex scroll animations on mobile for better UX
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      // 1. Horizontal Pan
      if (panWrapRef.current && panTrackRef.current) {
        const distance = panTrackRef.current.scrollWidth - window.innerWidth;
        gsap.to(panTrackRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: panWrapRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // 2. Sticky Stack
      if (stackWrapRef.current) {
        const cards = gsap.utils.toArray(stackWrapRef.current.querySelectorAll(`.${styles.stackCard}`));
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        });
      }
    });

    return () => mm.revert(); // cleanup
  }, []);

  const bentoImages = [
    '/Portfolio/images/pacs/generated/pacs_trace_1784477779066.jpg',
    '/Portfolio/images/pacs/generated/pacs_loop_1784477797633.jpg',
    '/Portfolio/images/pacs/generated/pacs_boundary_1784477816064.jpg'
  ];

  return (
    <main className={styles.page}>
      {/* ── Hero (Split Screen) ──────────────────────────── */}
      <section className={styles.hero} data-animate>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>
            <span className={styles.kickerIndex}>03</span> / PACS &amp; AI
          </p>
          <h1 className={styles.title}>{t(project.title)}</h1>
          <p className={styles.tag}>{t(project.tag)}</p>
        </div>

        <div className={styles.heroVisual} data-animate>
          <img 
            src="/Portfolio/images/pacs/generated/pacs_hero_1784477678972.jpg" 
            alt="PACS AI UI" 
            className={styles.heroVisualImg}
          />
          <div className={styles.heroMetricFloating}>
            <div className={styles.metricBlock}>
              <span className={styles.metricBefore}>1.43</span>
              <span className={styles.metricArrow}>→</span>
              <span className={styles.metricAfter}>3.46</span>
            </div>
            <p className={styles.metricLabel}>
              {language === 'zh'
                ? '平均每张小牙片龋齿发现数（+142%）'
                : 'Avg. cavities per X-ray (+142%)'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Background + Role ─────────────────────────────── */}
      <section className={styles.section} data-animate>
        <div className={styles.sectionGrid}>
          <div>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '项目背景与挑战' : 'Background & Challenge'}
            </p>
            <p className={styles.bodyText}>{t(project.background)}</p>
          </div>
          <div>
            <div className={styles.roleChip}>
              <span className={styles.roleChipLabel}>
                {language === 'zh' ? '我的角色' : 'My role'}
              </span>
              <span className={styles.roleChipValue}>{t(project.role)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Iterations (GSAP Horizontal Pan) ──────────────── */}
      {project.process && (
        <section ref={panWrapRef} className={styles.panWrapper}>
          <div className={styles.panHeader} data-animate>
            <p className={styles.kicker}>
              {language === 'zh' ? '迭代路径' : 'Iterations'}
            </p>
          </div>
          <div ref={panTrackRef} className={styles.panTrack}>
            {project.process.map((iter, i) => (
              <div key={i} className={styles.iterCard}>
                <div className={styles.iterationHeader}>
                  <span className={styles.iterationBadge}>{iter.version}</span>
                  <span className={styles.iterationLabel}>{t(iter.label)}</span>
                </div>
                <h3 className={styles.iterationTitle}>{t(iter.title)}</h3>
                <p className={styles.bodyText}>{t(iter.desc)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Solutions (Bento Grid) ────────────────────────── */}
      <section className={styles.section} data-animate>
        <p className={styles.kicker}>
          {language === 'zh' ? '关键方案' : 'Key Solutions'}
        </p>
        <div className={styles.bentoGrid}>
          {project.solution.map((sol, i) => (
            <div key={i} className={styles.bentoCell}>
              <img 
                src={bentoImages[i % bentoImages.length]} 
                alt="Solution graphic"
                className={styles.bentoImg}
                loading="lazy"
              />
              <div className={styles.bentoGradient} />
              <div className={styles.bentoContent}>
                <span className={styles.solutionIndex}>0{i + 1}</span>
                <h3 className={styles.solutionTitle}>{t(sol.title)}</h3>
                <p className={styles.bodyText} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  {t(sol.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Decisions (GSAP Sticky Stack) ──────────── */}
      {project.decisions && (
        <section className={styles.stackWrapper}>
          <div className={styles.stackHeader} data-animate>
            <p className={styles.sectionKicker} style={{ marginBottom: 0 }}>
              {language === 'zh' ? '关键设计判断' : 'Key Design Decisions'}
            </p>
            <p className={styles.decisionSubtitle}>
              {language === 'zh'
                ? '每一个看似微小的交互决策背后，都有具体的临床场景和数据质量考量'
                : 'Behind each interaction decision is a specific clinical context and data quality consideration'}
            </p>
          </div>
          
          <div ref={stackWrapRef} className={styles.stackContainer}>
            {project.decisions.map((d, i) => (
              <div key={i} className={styles.stackCard}>
                <div className={styles.stackCardInner}>
                  <span className={styles.decisionTabNum}>0{i + 1}</span>
                  <h3 className={styles.decisionQuestion}>{t(d.question)}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span className={styles.decisionAnswerLabel}>
                      {language === 'zh' ? '决策' : 'Decision'}
                    </span>
                    <p className={styles.decisionAnswerText}>{t(d.choice)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Results & Masonry ─────────────────────────────── */}
      {project.detailMetrics && (
        <section className={styles.section} data-animate>
          <p className={styles.resultHeadline}>{t(project.detailMetrics.headline)}</p>
          
          <div className={styles.metricRow}>
            <div className={styles.metricCell}>
              <span className={styles.metricCellValue}>{project.detailMetrics.before.value}</span>
              <span className={styles.metricCellLabel}>{t(project.detailMetrics.before.label)}</span>
            </div>
            <div className={`${styles.metricCell} ${styles.metricCellAccent}`}>
              <span className={styles.metricCellValue}>{project.detailMetrics.after.value}</span>
              <span className={styles.metricCellLabel}>{t(project.detailMetrics.after.label)}</span>
            </div>
            <div className={`${styles.metricCell} ${styles.metricCellDelta}`}>
              <span className={styles.metricCellValue}>{project.detailMetrics.delta.value}</span>
              <span className={styles.metricCellLabel}>{t(project.detailMetrics.delta.label)}</span>
            </div>
          </div>
        </section>
      )}

      {project.images && project.images.length > 0 && (
        <section className={styles.imageSection} data-animate>
          <p className={styles.kicker}>
            {language === 'zh' ? '流程展示' : 'Interface Flow'}
          </p>
          <div className={styles.masonryGrid}>
            {project.images.map((img, i) => (
              <figure key={i} className={styles.imageFigure}>
                <img
                  src={img.src}
                  alt={t(img.alt)}
                  className={styles.image}
                  loading="lazy"
                />
                <figcaption className={styles.imageCaption}>{t(img.alt)}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
