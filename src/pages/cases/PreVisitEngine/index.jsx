import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './PreVisitEngine.module.css';
import gsap from 'gsap';
import { caseContent as project } from './content';

export default function PreVisitEngineCase() {
  const { language } = useLanguage();
  const pageRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context;
    const update = () => {
      context?.revert();
      context = gsap.context(() => {
        if (reduce.matches) {
          gsap.set('[data-animate]', { y: 0, autoAlpha: 1 });
        } else {
          gsap.fromTo(
            '[data-animate]',
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }
      }, pageRef);
    };
    update();
    reduce.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      context.revert();
    };
  }, []);

  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');

  return (
    <div className={styles.container} ref={pageRef}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" state={{ scrollTo: 'portfolio' }} className={styles.backLink} data-animate>
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

          <div className={styles.heroMetricCard}>
            {[project.evidence.slice(0, 2), project.evidence.slice(2)].map((row, index) => (
              <div className={styles.heroMetricRow} key={index}>
                {row.map((item) => (
                  <div className={styles.heroMetricItem} key={item.label.en}>
                    <span className={styles.heroMetricValue}>{t(item.value)}</span>
                    <span className={styles.heroMetricLabel}>{t(item.label)}</span>
                  </div>
                ))}
              </div>
            ))}
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

              </div>
            </div>
          </div>
        </section>

        {/* ── Key Solutions ────────────────────────────────────── */}
        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '我的解法' : 'Solution'}
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
                {t(project.tooth)}
              </p>
            </div>
            <div className={styles.toothCross}>
              <div className={styles.toothQuadrant}>
                <span className={styles.quadrantTag}>{language === 'zh' ? 'UR (右上象限)' : 'UR (Upper right)'}</span>
                <span className={styles.quadrantName}>18 - 11 / 55 - 51</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={styles.quadrantTag}>{language === 'zh' ? 'UL (左上象限)' : 'UL (Upper left)'}</span>
                <span className={styles.quadrantName}>21 - 28 / 61 - 65</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={styles.quadrantTag}>{language === 'zh' ? 'LR (右下象限)' : 'LR (Lower right)'}</span>
                <span className={styles.quadrantName}>48 - 41 / 85 - 81</span>
              </div>
              <div className={styles.toothQuadrant}>
                <span className={styles.quadrantTag}>{language === 'zh' ? 'LL (左下象限)' : 'LL (Lower left)'}</span>
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

        <section className={styles.section} data-animate>
          <p className={styles.sectionKicker}>
            {language === 'zh' ? '机制证据与结果边界' : 'Mechanism evidence & outcome boundaries'}
          </p>
          <div className={styles.resultCard}>
            <p className={styles.bodyText}>{t(project.mechanism)}</p>
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
