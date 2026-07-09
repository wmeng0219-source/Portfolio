import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-anim="true"]',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
      );

      if (visualRef.current) {
        gsap.to(visualRef.current, {
          yPercent: -8,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={sectionRef}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} />
      </div>

      <div className={styles.shell}>
        <div className={styles.copy}>
          <p className={styles.kicker} data-anim="true">
            {t('hero.kicker')}
          </p>
          <h1 className={styles.title} data-anim="true">
            {t('hero.title')}
          </h1>
          <p className={styles.body} data-anim="true">
            {t('hero.body')}
          </p>
          <div className={styles.actions} data-anim="true">
            <a className={styles.btnPrimary} href="#portfolio">
              {t('hero.btn.work')}
            </a>
            <a className={styles.btnSecondary} href="#contact">
              {t('hero.btn.contact')}
            </a>
          </div>
          <div className={styles.meta} data-anim="true">
            <span className={styles.metaName}>{t('hero.meta.name')}</span>
            <span className={styles.metaRole}>{t('hero.meta.role')}</span>
          </div>
        </div>

        <aside className={styles.panel} ref={visualRef} data-anim="true">
          <div className={styles.panelTop}>
            <span className={styles.panelChip}>{t('hero.panel.1.label')}</span>
            <span className={styles.panelChip}>{t('hero.panel.2.label')}</span>
            <span className={styles.panelChip}>{t('hero.panel.3.label')}</span>
          </div>

          <div className={styles.panelLead}>
            <p className={styles.panelLeadLabel}>{t('hero.kicker')}</p>
            <p className={styles.panelLeadValue}>{t('hero.meta.role')}</p>
          </div>

          <div className={styles.panelGrid}>
            <article className={styles.panelCard} data-anim="true">
              <span>{t('hero.panel.1.label')}</span>
              <p>{t('hero.panel.1.value')}</p>
            </article>
            <article className={styles.panelCard} data-anim="true">
              <span>{t('hero.panel.2.label')}</span>
              <p>{t('hero.panel.2.value')}</p>
            </article>
            <article className={styles.panelCard} data-anim="true">
              <span>{t('hero.panel.3.label')}</span>
              <p>{t('hero.panel.3.value')}</p>
            </article>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
