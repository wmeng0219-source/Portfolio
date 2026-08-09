import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './MemberAutomation.module.css';
import gsap from 'gsap';

export default function MemberAutomationCase({ project }) {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate]',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  if (!project) return null;
  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.backLink} data-animate>
            ← {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      <main className={styles.page}>
        {/* ── Hero (Split Screen) ──────────────────────────── */}
        <section className={styles.hero} data-animate>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>
              <span className={styles.kickerIndex}>01</span> / MEMBER AUTOMATION
            </p>
            <h1 className={styles.title}>{t(project.title)}</h1>
            <p className={styles.tag}>{t(project.tag)}</p>
            <p className={styles.heroSummary}>{t(project.background)}</p>
          </div>

          <div className={styles.heroVisual} data-animate>
            {project.images && project.images[0] && (
              <img
                src={project.images[0].src}
                alt={t(project.images[0].alt)}
                className={styles.heroVisualImg}
                width="1600"
                height="900"
                loading="eager"
              />
            )}
            {project.heroMetrics && (
              <div className={styles.heroMetricFloating}>
                <div className={styles.metricBlock}>
                  <span className={styles.metricBefore}>{project.heroMetrics.opTimeBefore}</span>
                  <span className={styles.metricArrow}>→</span>
                  <span className={styles.metricAfter}>{project.heroMetrics.opTimeAfter}</span>
                </div>
                <p className={styles.metricLabel}>
                  {language === 'zh' ? '典型会员升级 · 门店现场实测' : 'Typical member upgrade · on-site test'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Background & System Identity ─────────────────────── */}
        <section className={styles.section} data-animate>
          <div className={styles.sectionGrid}>
            <div>
              <p className={styles.sectionKicker}>
                {language === 'zh' ? '项目背景与定位' : 'Background & Scope'}
              </p>
              <p className={styles.bodyText}>{t(project.problem)}</p>
            </div>
            <div>
              <div className={styles.roleChip}>
                <span className={styles.roleChipLabel}>
                  {language === 'zh' ? '我的角色' : 'My Role'}
                </span>
                <span className={styles.roleChipValue}>{t(project.role)}</span>
                {project.sysVer && (
                  <code className={styles.sysCode}>{project.sysVer}</code>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Iteration Path ───────────────────────────────────── */}
        {project.process && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '迭代路径' : 'Iteration Path'}
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
            {language === 'zh' ? '关键系统架构方案' : 'Key Solutions'}
          </p>
          <div className={styles.solutionList}>
            {project.solution.map((sol, i) => (
              <article key={i} className={styles.solutionRow}>
                {project.images && project.images[i + 1] && (
                  <img
                    src={project.images[i + 1].src}
                    alt={t(sol.title)}
                    className={styles.solutionImage}
                    loading="lazy"
                    width="1024"
                    height="768"
                  />
                )}
                <div className={styles.solutionCopy}>
                  <span className={styles.solutionIndex}>0{i + 1}</span>
                  <h3 className={styles.solutionTitle}>{t(sol.title)}</h3>
                  <p className={styles.bodyText}>{t(sol.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {project.designCraft && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>{t(project.designCraft.title)}</p>
            <p className={styles.bodyText}>{t(project.designCraft.subtitle)}</p>
            <div className={styles.craftGrid}>
              {project.designCraft.pillars.map((pillar) => (
                <article key={t(pillar.title)} className={styles.craftCard}>
                  <span className={styles.craftTag}>{t(pillar.tag)}</span>
                  <h3 className={styles.craftTitle}>{t(pillar.title)}</h3>
                  <p className={styles.bodyText}>{t(pillar.desc)}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Design Decisions ─────────────────────────────── */}
        {project.decisions && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '关键设计决策' : 'Key Design Decisions'}
            </p>
            <div className={styles.decisionList}>
              {project.decisions.map((d, i) => (
                <article key={i} className={styles.decisionRow}>
                  <span className={styles.decisionIndex}>Q{i + 1}</span>
                  <div className={styles.decisionMain}>
                    <h3 className={styles.decisionQuestion}>{t(d.question)}</h3>
                    <span className={styles.decisionAnswerLabel}>
                      {language === 'zh' ? '决策推演' : 'Decision Rationale'}
                    </span>
                    <p className={styles.decisionAnswerText}>{t(d.choice)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Results & Interface Flow ─────────────────────────── */}
        <section className={styles.section} data-animate>
          <p className={styles.resultHeadline}>
            {language === 'zh' ? '项目落地成果' : 'Project Results'}
          </p>
          <div className={styles.resultCard}>
            <p className={styles.bodyText}>{t(project.result)}</p>
          </div>
        </section>

        {project.images && project.images.length > 0 && (
          <section className={styles.imageSection} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '界面流程与架构视图' : 'Interface Flow'}
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
