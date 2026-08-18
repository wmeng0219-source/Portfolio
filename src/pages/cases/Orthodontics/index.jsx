import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './Orthodontics.module.css';
import pacsStyles from '../PacsAi/PacsAi.module.css';
import gsap from 'gsap';

export default function OrthodonticsCase({ project }) {
  const { language } = useLanguage();
  if (!project) return null;
  const [activeTab, setActiveTab] = useState(project?.roleTabs?.[0]?.id || 'pedo');
  const activeRoleData = project?.roleTabs?.find((t) => t.id === activeTab);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '[data-animate-hero]',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      // Section animations
      gsap.utils.toArray('[data-animate-section]').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });

    });

    return () => ctx.revert();
  }, []);

  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');

  return (
    <div className={styles.caseContainer}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" state={{ scrollTo: 'portfolio' }} className={styles.backLink}>
            ← {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      {/* ── Module 1: Hero & Role ────────────────────────────── */}
      <section className={styles.hero} data-animate-hero>
        <p className={styles.kicker}>
          <span className={styles.kickerIndex}>02</span> / ORTHODONTICS FUNNEL
        </p>
        <h1 className={styles.heroTitle}>{t(project.title)}</h1>
        <p className={styles.tag}>{t(project.tag)}</p>
        <p className={styles.heroSummary}>{t(project.background)}</p>

        <div className={styles.metricsContainer} style={{ marginTop: '2rem' }}>
          <div className={styles.metricBox}>
            <span className={styles.metricLabel}>{language === 'zh' ? '改版前转化' : 'Before'}</span>
            <span className={styles.metricValue}>{project.heroMetrics.conversionBefore}</span>
          </div>
          <div className={styles.metricArrow}>→</div>
          <div className={styles.metricBox}>
            <span className={styles.metricLabel}>{language === 'zh' ? '改版后转化' : 'After'}</span>
            <span className={styles.metricValue} style={{ color: 'var(--color-system-green)' }}>
              {project.heroMetrics.conversionAfter}
            </span>
          </div>
        </div>
        <p className={styles.metricNote}>{t(project.resultNote)}</p>
      </section>

      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '业务背景与我的职责' : 'Context & Ownership'}</h2>
        <div className={styles.contextGrid}>
          <p className={styles.sectionDesc}>{t(project.background)}</p>
          <aside className={styles.ownershipCard}>
            <span className={styles.cardLabel}>{language === 'zh' ? '我的角色' : 'My role'}</span>
            <p>{t(project.role)}</p>
          </aside>
        </div>
      </section>

      {/* ── Constraints & Scope ──────────────────────────────── */}
      {project.constraints && (
        <section className={styles.section} data-animate-section>
          <h2 className={styles.sectionTitle}>{t(project.constraints.title)}</h2>
          <div className={pacsStyles.retrospectiveGrid}>
            {project.constraints.items.map((item, i) => (
              <article key={i} className={pacsStyles.retrospectiveCard}>
                <span className={pacsStyles.retrospectiveIndex}>0{i + 1}</span>
                <h3 className={pacsStyles.retrospectiveTitle}>{t(item.title)}</h3>
                <p className={pacsStyles.retrospectiveDesc}>{t(item.desc)}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '从开发到全门店上线' : 'From Build to Full Rollout'}</h2>
        <div className={styles.projectTimeline}>
          {project.projectTimeline.map((item) => (
            <article key={item.date} className={styles.projectTimelineItem}>
              <span className={styles.projectDate}>{item.date}</span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.desc)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{t(project.iterationDecision.title)}</h2>
        <div className={styles.decisionFlow}>
          <article><span>01</span><h3>{language === 'zh' ? '初版假设' : 'Initial assumption'}</h3><p>{t(project.iterationDecision.before)}</p></article>
          <article><span>02</span><h3>{language === 'zh' ? '试点发现' : 'Pilot insight'}</h3><p>{t(project.iterationDecision.insight)}</p></article>
          <article><span>03</span><h3>{language === 'zh' ? '最终选择' : 'Final choice'}</h3><p>{t(project.iterationDecision.after)}</p></article>
        </div>
      </section>

      {/* ── Module 2: Context & Stakeholder Map ───────────────── */}
      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '业务背景与问题诊断' : 'Background & Problem'}</h2>
        <p className={styles.sectionDesc}>{t(project.problem)}</p>
        <div className={pacsStyles.roleChip}>
          <span className={pacsStyles.roleChipLabel}>{language === 'zh' ? '我的角色' : 'My Role'}</span>
          <span className={pacsStyles.roleChipValue}>{t(project.role)}</span>
        </div>
      </section>

      {/* ── Module 3: Product Strategy & Iteration ───────────── */}
      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '牙列发育优先级调度 (带宽策略)' : 'Eruption Priority Scheduling'}</h2>
        <p className={styles.sectionDesc}>
          {language === 'zh'
            ? '为应对门诊承接带宽有限，放弃全量推送。系统根据复杂的牙列发育阶段，优先筛选干预窗口紧迫的高危患儿。'
            : 'To manage limited clinic bandwidth, we prioritized patients based on critical tooth eruption stages rather than bulk recommending everyone.'}
        </p>
        <div className={styles.timeline}>
          {project.timelineSteps.map((step, idx) => (
            <div key={idx} className={styles.timelineStep}>
              <div className={styles.stepNumber}>0{step.step}</div>
              <h3 className={styles.stepTitle}>{t(step.title)}</h3>
              <p className={styles.stepDesc}>{t(step.desc)}</p>
            </div>
          ))}
        </div>

        {project.process && (
          <div className={pacsStyles.iterationList} style={{ marginTop: '2rem' }}>
            {project.process.map((iter, i) => (
              <article key={i} className={pacsStyles.iterationRow}>
                <div className={pacsStyles.iterationMeta}>
                  <span className={pacsStyles.iterationBadge}>{iter.version}</span>
                  <span className={pacsStyles.iterationLabel}>{t(iter.label)}</span>
                </div>
                <div className={pacsStyles.iterationBody}>
                  <h3 className={pacsStyles.iterationTitle}>{t(iter.title)}</h3>
                  <p className={pacsStyles.bodyText}>{t(iter.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Module 4: Key Solutions Bento Grid ───────────────── */}
      {project.solution && (
        <section className={styles.section} data-animate-section>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '核心解法与系统机制' : 'Key Solutions & Mechanism'}</h2>
          <div className={pacsStyles.solutionList}>
            {project.solution.map((sol, i) => (
              <article key={i} className={pacsStyles.solutionRow}>
                <div className={pacsStyles.solutionCopy}>
                  <span className={pacsStyles.solutionIndex}>0{i + 1}</span>
                  <h3 className={pacsStyles.solutionTitle}>{t(sol.title)}</h3>
                  <p className={pacsStyles.bodyText}>{t(sol.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Module 5: ⭐️ Design System & UX Craft ─────────────── */}
      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '系统数据承接业务激励' : 'System Data Supporting Business Incentives'}</h2>
        <p className={styles.sectionDesc}>
          {language === 'zh'
            ? '打破多角色协作黑盒，精准留痕支撑业务线新推行的“转诊费激励机制”。点击下方角色查看系统职责边界：'
            : 'Breaking the black box of multi-role collaboration to track referral fee incentives accurately. Click roles below:'}
        </p>
        <div className={styles.roleContainer}>
          <div className={styles.roleTabs} role="tablist" aria-label={language === 'zh' ? '角色职责切换' : 'Role duties'}>
            {project.roleTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.roleTab} ${activeTab === tab.id ? styles.activeTab : ''} ${tab.id === 'pedo' ? styles.specialTab : ''}`}
                role="tab"
                id={`role-tab-${tab.id}`}
                aria-controls={`role-panel-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-pressed={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {t(tab.role)}
              </button>
            ))}
          </div>
          {activeRoleData && (
            <div
              className={styles.roleContent}
              role="tabpanel"
              id={`role-panel-${activeRoleData.id}`}
              aria-labelledby={`role-tab-${activeRoleData.id}`}
              tabIndex={0}
            >
              <h3 className={styles.roleTitle}>
                {t(activeRoleData.role)}
                {activeRoleData.id === 'pedo' && (
                  <span className={styles.itbpBadge}>ITBP Core Value</span>
                )}
              </h3>
              <p className={`${styles.roleDuty} ${activeRoleData.id === 'pedo' ? styles.specialDuty : ''}`}>
                {t(activeRoleData.duty)}
              </p>
            </div>
          )}
        </div>

        {project.designCraft && (
          <div className={pacsStyles.craftGrid} style={{ marginTop: '3rem' }}>
            {project.designCraft.pillars.map((pillar, i) => (
              <article key={i} className={pacsStyles.craftCard}>
                <div className={pacsStyles.craftHeader}>
                  <span className={pacsStyles.craftTag}>{t(pillar.tag)}</span>
                  <h3 className={pacsStyles.craftTitle}>{t(pillar.title)}</h3>
                </div>
                <p className={pacsStyles.bodyText}>{t(pillar.desc)}</p>

                {pillar.swatches && (
                  <div className={pacsStyles.swatchGrid}>
                    {pillar.swatches.map((swatch, idx) => (
                      <div key={idx} className={pacsStyles.swatchCard}>
                        <div className={pacsStyles.swatchChip} style={{ backgroundColor: swatch.color }} />
                        <div className={pacsStyles.swatchMeta}>
                          <div className={pacsStyles.swatchNameRow}>
                            <span className={pacsStyles.swatchName}>{t(swatch.name)}</span>
                            <span className={pacsStyles.swatchHex}>{swatch.color}</span>
                          </div>
                          <span className={pacsStyles.swatchRole}>{t(swatch.role)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pillar.specs && (
                  <div className={pacsStyles.specRow}>
                    {pillar.specs.map((spec, idx) => (
                      <div key={idx} className={pacsStyles.specItem}>
                        <span className={pacsStyles.specValue}>{spec.value}</span>
                        <span className={pacsStyles.specLabel}>{t(spec.label)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Module 6: Design Decisions & Trade-offs ──────────── */}
      {project.decisions && (
        <section className={styles.section} data-animate-section>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '深度决策与方案权衡' : 'Design Decisions & Trade-offs'}</h2>
          <div className={pacsStyles.decisionList}>
            {project.decisions.map((d, i) => (
              <article key={i} className={pacsStyles.decisionRow}>
                <span className={pacsStyles.decisionIndex}>Q{i + 1}</span>
                <div className={pacsStyles.decisionMain}>
                  <h3 className={pacsStyles.decisionQuestion}>{t(d.question)}</h3>
                  <span className={pacsStyles.decisionAnswerLabel}>
                    {language === 'zh' ? '决策推演' : 'Decision Rationale'}
                  </span>
                  <p className={pacsStyles.decisionAnswerText}>{t(d.choice)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Module 7: Results & Interface Flow ───────────────── */}
      {project.detailMetrics && (
        <section className={styles.section} data-animate-section>
          <p className={pacsStyles.resultHeadline}>{t(project.detailMetrics.headline)}</p>
          <div className={pacsStyles.metricRow}>
            <div className={pacsStyles.metricCell}>
              <span className={pacsStyles.metricCellValue}>{project.detailMetrics.before.value}</span>
              <span className={pacsStyles.metricCellLabel}>{t(project.detailMetrics.before.label)}</span>
            </div>
            <div className={`${pacsStyles.metricCell} ${pacsStyles.metricCellAccent}`}>
              <span className={pacsStyles.metricCellValue}>{project.detailMetrics.after.value}</span>
              <span className={pacsStyles.metricCellLabel}>{t(project.detailMetrics.after.label)}</span>
            </div>
            <div className={`${pacsStyles.metricCell} ${pacsStyles.metricCellDelta}`}>
              <span className={pacsStyles.metricCellValue}>{project.detailMetrics.delta.value}</span>
              <span className={pacsStyles.metricCellLabel}>{t(project.detailMetrics.delta.label)}</span>
            </div>
          </div>
        </section>
      )}

      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '全链路可观测转化漏斗' : 'Fully Observable Funnel'}</h2>
        <p className={styles.sectionDesc}>
          {language === 'zh'
            ? '矫正率从改版前的 30-40% 提升至 50-60% 左右，漏斗链路的建立使团队第一次能够观察每个环节的转化情况，而不只是看最终结果。'
            : 'Conversion rate increased to 50-60%. The funnel tracking allowed the team to observe drop-offs at every step for the first time.'}
        </p>
        <div className={styles.funnelContainer}>
          {project.funnelData.map((item, idx) => (
            <div key={idx} className={`${styles.funnelRow} funnelBarTrigger`}>
              <div className={styles.funnelLabel}>{t(item.stage)}</div>
              <div className={styles.funnelBarTrack}>
                <div
                  className={styles.funnelBarFill}
                  data-percentage={item.percentage}
                  style={{ width: '0%' }}
                >
                  {item.percentage}%
                </div>
                <div className={styles.funnelValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      {project.resultNote && (
        <section className={styles.section} data-animate-section>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '同期结果与证据口径' : 'Comparable Results & Evidence'}</h2>
          <div className={pacsStyles.resultCard}><p>{t(project.result)}</p><small>{t(project.resultNote)}</small></div>
        </section>
      )}

      {/* ── Retrospective & Limitations ───────────────────── */}
      {project.retrospective && (
        <section className={styles.section} data-animate-section>
          <h2 className={styles.sectionTitle}>{t(project.retrospective.title)}</h2>
          <div className={pacsStyles.retrospectiveGrid}>
            {project.retrospective.items.map((item, i) => (
              <article key={i} className={pacsStyles.retrospectiveCard}>
                <span className={pacsStyles.retrospectiveIndex}>0{i + 1}</span>
                <h3 className={pacsStyles.retrospectiveTitle}>{t(item.title)}</h3>
                <p className={pacsStyles.retrospectiveDesc}>{t(item.desc)}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {project.images && project.images.length > 0 && (
        <section className={pacsStyles.imageSection} data-animate-section>
          <p className={pacsStyles.sectionKicker}>
            {language === 'zh' ? '界面流程与架构全景' : 'Interface Panorama'}
          </p>
          <div className={pacsStyles.imageList}>
            {project.images.map((img, i) => (
              <figure key={i} className={pacsStyles.imageRow}>
                <img
                  src={img.src}
                  alt={t(img.alt)}
                  className={pacsStyles.image}
                  loading="lazy"
                  width="1024"
                  height="768"
                />
                <figcaption className={pacsStyles.imageCaption}>{t(img.alt)}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
