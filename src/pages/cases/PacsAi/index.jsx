import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './PacsAi.module.css';

export default function PacsAiCase({ project }) {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');
  const withBasePath = (path) => `${import.meta.env.BASE_URL ?? '/'}${path}`.replace(/\/{2,}/g, '/');

  const bentoImages = [
    withBasePath('images/pacs/generated/pacs_trace_1784477779066.jpg'),
    withBasePath('images/pacs/generated/pacs_loop_1784477797633.jpg'),
    withBasePath('images/pacs/generated/pacs_boundary_1784477816064.jpg'),
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.backLink}>
            ← {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      <main className={styles.page}>
        {/* ── Hero (Split Screen) ──────────────────────────── */}
        <section className={styles.hero} data-animate>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>
              <span className={styles.kickerIndex}>03</span> / PACS &amp; AI
            </p>
            <h1 className={styles.title}>{t(project.title)}</h1>
            <p className={styles.tag}>{t(project.tag)}</p>
            <p className={styles.heroSummary}>{t(project.background)}</p>
          </div>

          <div className={styles.heroVisual} data-animate>
            <img
              src={withBasePath('images/pacs/generated/pacs_hero_1784477678972.jpg')}
              alt="PACS AI UI"
              className={styles.heroVisualImg}
              width="1600"
              height="900"
              loading="eager"
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
              <p className={styles.bodyText}>{t(project.challenge)}</p>
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

        {/* ── Iterations ───────────────────────────────────── */}
        {project.process && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '迭代路径' : 'Iterations'}
            </p>
            <div className={styles.iterationList}>
              {project.process.map((iter, i) => (
                <article key={i} className={styles.iterationRow}>
                  <div className={styles.iterationMeta}>
                    <span className={styles.iterationBadge}>{iter.version}</span>
                    <span className={styles.iterationLabel}>{t(iter.label)}</span>
                  </div>
                  <div className={styles.iterationBody}>
                    <h3 className={styles.iterationTitle}>{t(iter.title)}</h3>
                    <p className={styles.bodyText}>{t(iter.desc)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Solutions ────────────────────────────────────── */}
        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '关键方案' : 'Key Solutions'}
          </p>
          <div className={styles.solutionList}>
            {project.solution.map((sol, i) => (
              <article key={i} className={styles.solutionRow}>
                <img
                  src={bentoImages[i % bentoImages.length]}
                  alt={t(sol.title)}
                  className={styles.solutionImage}
                  loading="lazy"
                  width="1024"
                  height="768"
                />
                <div className={styles.solutionCopy}>
                  <span className={styles.solutionIndex}>0{i + 1}</span>
                  <h3 className={styles.solutionTitle}>{t(sol.title)}</h3>
                  <p className={styles.bodyText}>{t(sol.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Design System & UX Craft ─────────────────────── */}
        {project.designCraft && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>{t(project.designCraft.title)}</p>
            <p className={styles.decisionSubtitle}>{t(project.designCraft.subtitle)}</p>

            <div className={styles.craftGrid}>
              {project.designCraft.pillars.map((pillar, i) => (
                <article key={i} className={styles.craftCard}>
                  <div className={styles.craftHeader}>
                    <span className={styles.craftTag}>{t(pillar.tag)}</span>
                    <h3 className={styles.craftTitle}>{t(pillar.title)}</h3>
                  </div>
                  <p className={styles.bodyText}>{t(pillar.desc)}</p>

                  {/* Render Swatches if available */}
                  {pillar.swatches && (
                    <div className={styles.swatchGrid}>
                      {pillar.swatches.map((swatch, idx) => (
                        <div key={idx} className={styles.swatchCard}>
                          <div
                            className={styles.swatchChip}
                            style={{ backgroundColor: swatch.color }}
                          />
                          <div className={styles.swatchMeta}>
                            <div className={styles.swatchNameRow}>
                              <span className={styles.swatchName}>{t(swatch.name)}</span>
                              <span className={styles.swatchHex}>{swatch.color}</span>
                            </div>
                            <span className={styles.swatchRole}>{t(swatch.role)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Specs if available */}
                  {pillar.specs && (
                    <div className={styles.specRow}>
                      {pillar.specs.map((spec, idx) => (
                        <div key={idx} className={styles.specItem}>
                          <span className={styles.specValue}>{spec.value}</span>
                          <span className={styles.specLabel}>{t(spec.label)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Design Decisions ─────────────────────────────── */}
        {project.decisions && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '关键设计判断' : 'Key Design Decisions'}
            </p>
            <p className={styles.decisionSubtitle}>
              {language === 'zh'
                ? '每一个看似微小的交互决策背后，都有具体的临床场景和数据质量考量'
                : 'Each interaction decision reflects a clinical context and data-quality tradeoff'}
            </p>
            <div className={styles.decisionList}>
              {project.decisions.map((d, i) => (
                <article key={i} className={styles.decisionRow}>
                  <span className={styles.decisionIndex}>0{i + 1}</span>
                  <div className={styles.decisionMain}>
                    <h3 className={styles.decisionQuestion}>{t(d.question)}</h3>
                    <span className={styles.decisionAnswerLabel}>
                      {language === 'zh' ? '决策' : 'Decision'}
                    </span>
                    <p className={styles.decisionAnswerText}>{t(d.choice)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Results & Interface ─────────────────────────── */}
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
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '流程展示' : 'Interface Flow'}
            </p>
            <div className={styles.imageList}>
              {project.images.map((img, i) => (
                <figure key={i} className={styles.imageRow}>
                  <img
                    src={img.src}
                    alt={t(img.alt)}
                    className={styles.image}
                    loading="lazy"
                    width="1024"
                    height="768"
                  />
                  <figcaption className={styles.imageCaption}>{t(img.alt)}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
