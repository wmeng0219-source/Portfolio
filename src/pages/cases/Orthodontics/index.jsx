import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './Orthodontics.module.css';
import gsap from 'gsap';

export default function OrthodonticsCase({ project }) {
  const { language } = useLanguage();
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

  if (!project) return null;
  const t = (obj) => (obj ? (obj[language] ?? obj.zh) : '');

  return (
    <div className={styles.caseContainer}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.backLink}>
            ← {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle} data-animate-hero>
          {project.heroMetrics.title[language]}
        </h1>
        <div className={styles.metricsContainer} data-animate-hero>
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

      {/* Module A: Priority Timeline */}
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
              <h3 className={styles.stepTitle}>{step.title[language]}</h3>
              <p className={styles.stepDesc}>{step.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module B: Role Tabs & ITBP Value */}
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
                {tab.role[language]}
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
                {activeRoleData.role[language]}
                {activeRoleData.id === 'pedo' && (
                  <span className={styles.itbpBadge}>ITBP Core Value</span>
                )}
              </h3>
              <p className={`${styles.roleDuty} ${activeRoleData.id === 'pedo' ? styles.specialDuty : ''}`}>
                {activeRoleData.duty[language]}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{t(project.designCraft.title)}</h2>
        <div className={styles.craftGrid}>
          {project.designCraft.pillars.map((item) => (
            <article key={t(item.title)} className={styles.craftCard}>
              <h3>{t(item.title)}</h3>
              <p>{t(item.desc)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className={styles.section} data-animate-section>
        <h2 className={styles.sectionTitle}>{language === 'zh' ? '同期结果与证据口径' : 'Comparable Results & Evidence'}</h2>
        <div className={styles.resultCard}><p>{t(project.result)}</p><small>{t(project.resultNote)}</small></div>
      </section>
    </div>
  );
}
