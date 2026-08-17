import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './PreVisitEngine.module.css';
import gsap from 'gsap';

export default function PreVisitEngineCase({ project }) {
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
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className={styles.hero} data-animate>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>
              <span className={styles.kickerIndex}>04</span> / PRE-VISIT ENGINE
            </p>
            <h1 className={styles.title}>{t(project.title)}</h1>
            <p className={styles.tag}>{t(project.tag)}</p>
            <p className={styles.heroSummary}>{t(project.background)}</p>
          </div>

          <div className={styles.heroMetricCard} data-animate>
            <div className={styles.heroMetricRow}>
              <div className={styles.heroMetricItem}>
                <span className={styles.heroMetricValue}>{project.heroMetrics?.systemCount || '3 套'}</span>
                <span className={styles.heroMetricLabel}>{language === 'zh' ? '打通孤岛系统' : 'Systems Integrated'}</span>
              </div>
              <div className={styles.heroMetricItem}>
                <span className={styles.heroMetricValue}>{project.heroMetrics?.taskStandard || '100%'}</span>
                <span className={styles.heroMetricLabel}>{language === 'zh' ? '任务包结构化' : 'Task Structuring'}</span>
              </div>
            </div>
            <div className={styles.heroMetricRow}>
              <div className={styles.heroMetricItem}>
                <span className={styles.heroMetricValue}>{project.heroMetrics?.explainable || '100%'}</span>
                <span className={styles.heroMetricLabel}>{language === 'zh' ? '算法可解释溯源' : 'Rule Explainability'}</span>
              </div>
              <div className={styles.heroMetricItem}>
                <span className={styles.heroMetricValue} style={{ color: 'var(--color-accent)' }}>
                  {language === 'zh' ? '全门诊' : 'All Clinics'}
                </span>
                <span className={styles.heroMetricLabel}>{language === 'zh' ? '覆盖规模' : 'Deployment Scale'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Background & Role ─────────────────────────────── */}
        <section className={styles.section} data-animate>
          <div className={styles.sectionGrid}>
            <div>
              <p className={styles.sectionKicker}>
                {language === 'zh' ? '业务背景与核心命题' : 'Background & Mission'}
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

        {/* ── Constraints & Scope ──────────────────────────────── */}
        {project.constraints && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>{t(project.constraints.title)}</p>
            <div className={styles.constraintGrid}>
              {project.constraints.items.map((item, i) => (
                <article key={i} className={styles.constraintCard}>
                  <span className={styles.constraintIndex}>0{i + 1}</span>
                  <h3 className={styles.constraintTitle}>{t(item.title)}</h3>
                  <p className={styles.constraintDesc}>{t(item.desc)}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Key Solutions ────────────────────────────────────── */}
        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '三大核心解决方案' : 'Key Architectural Solutions'}
          </p>
          <div className={styles.solutionGrid}>
            {project.solution.map((sol, i) => (
              <article key={i} className={styles.solutionCard}>
                <span className={styles.solutionIndex}>0{i + 1}</span>
                <h3 className={styles.solutionTitle}>{t(sol.title)}</h3>
                <p className={styles.solutionDesc}>{t(sol.desc)}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Task Model & Role Handoff ────────────────────────── */}
        {project.taskModel && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '结构化任务包分层模型' : 'Structured Task Bundle Model'}
            </p>
            <div className={styles.taskModelGrid}>
              {project.taskModel.map((item, i) => (
                <article key={i} className={styles.taskModelCard}>
                  <span className={styles.taskModelIndex}>BUNDLE {i + 1}</span>
                  <h3 className={styles.taskModelTitle}>{t(item.type)}</h3>
                  <p className={styles.taskModelDesc}>{t(item.desc)}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Interactive Tooth Quadrant Component Preview ────── */}
        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '空间交互手艺：十字象限牙位选择控件' : 'Clinical Spatial UX: Cross-Tooth Selector'}
          </p>
          <div className={styles.toothWidget}>
            <div>
              <h3 className={styles.solutionTitle}>
                {language === 'zh' ? '符合临床直觉的十字象限映射' : 'Quadrant Mapping for Spatial Intuition'}
              </h3>
              <p className={styles.bodyText} style={{ marginTop: '0.75rem' }}>
                {language === 'zh'
                  ? '将 Palmer/FDI 复杂牙位矩阵解构为上左、上右、下左、下右 4 个交互象限，支持单牙、连续牙列与全口的毫秒级选择，大幅提升医生预习效率。'
                  : 'Translates dental Palmer/FDI notation into 4 interactive quadrants for instant arch and tooth selection.'}
              </p>
            </div>
            <div className={styles.toothCross}>
              <div className={styles.toothQuadrant}>
                <span className={quadrantTagStyle(styles)}>UR (右上象限)</span>
                <span className={styles.quadrantName}>18 - 11 / 55 - 51</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={quadrantTagStyle(styles)}>UL (左上象限)</span>
                <span className={styles.quadrantName}>21 - 28 / 61 - 65</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={quadrantTagStyle(styles)}>LR (右下象限)</span>
                <span className={styles.quadrantName}>48 - 41 / 85 - 81</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={quadrantTagStyle(styles)}>LL (左下象限)</span>
                <span className={styles.quadrantName}>31 - 38 / 71 - 75</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Decisions ────────────────────────────────────── */}
        {project.decisions && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '关键设计决策与 PRD 推演' : 'Key Decisions & PRD Logic'}
            </p>
            <div className={styles.decisionList}>
              {project.decisions.map((d, i) => (
                <article key={i} className={styles.decisionRow}>
                  <span className={styles.decisionIndex}>Q{i + 1}</span>
                  <div>
                    <h3 className={styles.decisionQuestion}>{t(d.question)}</h3>
                    <p className={styles.decisionAnswerText}>{t(d.choice)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Results & Evidence ──────────────────────────────── */}
        {project.detailMetrics && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>
              {language === 'zh' ? '业务结果与系统能力' : 'Business Results & Capabilities'}
            </p>
            <div className={styles.metricRow}>
              <div className={styles.metricCell}>
                <span className={styles.metricCellValue}>{project.detailMetrics.before.value}</span>
                <span className={styles.metricCellLabel}>{t(project.detailMetrics.before.label)}</span>
              </div>
              <div className={`${styles.metricCell} ${styles.metricCellAccent}`}>
                <span className={styles.metricCellValue}>{project.detailMetrics.after.value}</span>
                <span className={styles.metricCellLabel}>{t(project.detailMetrics.after.label)}</span>
              </div>
              <div className={`${styles.metricCell} ${styles.metricCellAccent}`}>
                <span className={styles.metricCellValue}>{project.detailMetrics.delta.value}</span>
                <span className={styles.metricCellLabel}>{t(project.detailMetrics.delta.label)}</span>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '落地成果' : 'Deployment Outcome'}
          </p>
          <div className={styles.resultCard}>
            <p className={styles.bodyText}>{t(project.result)}</p>
          </div>
        </section>

        {/* ── Retrospective & Limitations ───────────────────── */}
        {project.retrospective && (
          <section className={styles.section} data-animate>
            <p className={styles.sectionKicker}>{t(project.retrospective.title)}</p>
            <div className={styles.retrospectiveGrid}>
              {project.retrospective.items.map((item, i) => (
                <article key={i} className={styles.retrospectiveCard}>
                  <span className={styles.retrospectiveIndex}>0{i + 1}</span>
                  <h3 className={styles.retrospectiveTitle}>{t(item.title)}</h3>
                  <p className={styles.retrospectiveDesc}>{t(item.desc)}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function quadrantTagStyle(styles) {
  return styles.quadrantTag;
}
