import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const copyNodes = copyRef.current
        ? Array.from(copyRef.current.querySelectorAll('[data-hero-anim]'))
        : [];

      if (copyNodes.length) {
        gsap.fromTo(
          copyNodes,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
        );
      }

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { y: 28, opacity: 0.01 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.18, ease: 'power3.out' },
        );
      }

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
        <div className={styles.copy} ref={copyRef}>
          <p className={styles.kicker} data-hero-anim>
            {t('hero.kicker')}
          </p>
          <h1 className={styles.title} data-hero-anim>
            {t('hero.title')}
          </h1>
          <p className={styles.body} data-hero-anim>
            {t('hero.body')}
          </p>
          <div className={styles.actions} data-hero-anim>
            <a className={styles.btnPrimary} href="#portfolio">
              {t('hero.btn.work')}
            </a>
            <a className={styles.btnSecondary} href="#contact">
              {t('hero.btn.contact')}
            </a>
          </div>
          <div className={styles.meta} data-hero-anim>
            <span className={styles.metaName}>{t('hero.meta.name')}</span>
            <span className={styles.metaRole}>{t('hero.meta.role')}</span>
          </div>
        </div>

        <aside className={styles.panel} ref={visualRef}>
          <div className={styles.panelTop}>
            <span className={styles.panelChip}>{t('hero.signal.1')}</span>
            <span className={styles.panelChip}>{t('hero.signal.2')}</span>
            <span className={styles.panelChip}>{t('hero.signal.3')}</span>
          </div>

          <div className={styles.panelLead}>
            <p className={styles.panelLeadLabel}>{t('hero.panel.label')}</p>
            <p className={styles.panelLeadValue}>{t('hero.panel.title')}</p>
            <p className={styles.panelLeadBody}>{t('hero.panel.body')}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
