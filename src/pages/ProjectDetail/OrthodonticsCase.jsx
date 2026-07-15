import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './OrthodonticsCase.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OrthodonticsCase({ project }) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(project.roleTabs[0].id);

  useEffect(() => {
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

      // Funnel bars animation
      gsap.utils.toArray('.funnelBarTrigger').forEach((bar, i) => {
        const fill = bar.querySelector(`.${styles.funnelBarFill}`);
        const percentage = fill.getAttribute('data-percentage');
        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: `${percentage}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const activeRoleData = project.roleTabs.find((t) => t.id === activeTab);

  return (
    <div className={styles.caseContainer}>
      
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
            <span className={styles.metricValue} style={{ color: '#10b981' }}>
              {project.heroMetrics.conversionAfter}
            </span>
          </div>
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
          <div className={styles.roleTabs}>
            {project.roleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.roleTab} ${activeTab === tab.id ? styles.activeTab : ''} ${tab.id === 'pedo' ? styles.specialTab : ''}`}
              >
                {tab.role[language]}
              </button>
            ))}
          </div>
          <div className={styles.roleContent}>
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
        </div>
      </section>

      {/* Module C: Funnel Data */}
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
              <div className={styles.funnelLabel}>{item.stage[language]}</div>
              <div className={styles.funnelBarTrack}>
                <div 
                  className={styles.funnelBarFill} 
                  data-percentage={item.percentage}
                  style={{ width: '0%' }} // Initial state for GSAP
                >
                  {item.percentage}%
                </div>
                <div className={styles.funnelValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
