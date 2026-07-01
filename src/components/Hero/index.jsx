import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-anim="true"]',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );

      gsap.to(visualRef.current, {
        yPercent: -10,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={sectionRef}>
      <div className={styles.visual} ref={visualRef} />
      <div className={styles.overlay} />
      <div className={styles.content} ref={contentRef}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow} data-anim="true">
            {t('hero.eyebrow')}
          </p>
          <h1 className={styles.title} data-anim="true">
            {t('hero.title')}
          </h1>
          <p className={styles.subtitle} data-anim="true">
            {t('hero.subtitle')}
          </p>
          <p className={styles.description} data-anim="true">
            {t('hero.description')}
          </p>
          <div className={styles.actions} data-anim="true">
            <a className={styles.btnPrimary} href="#portfolio">
              {t('hero.btn.work')}
            </a>
            <a className={styles.btnSecondary} href="#contact">
              {t('hero.btn.contact')}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.facts}>
        <div className={styles.fact} data-anim="true">
          <span>{t('hero.fact.1.label')}</span>
          <p>{t('hero.fact.1.value')}</p>
        </div>
        <div className={styles.fact} data-anim="true">
          <span>{t('hero.fact.2.label')}</span>
          <p>{t('hero.fact.2.value')}</p>
        </div>
        <div className={styles.fact} data-anim="true">
          <span>{t('hero.fact.3.label')}</span>
          <p>{t('hero.fact.3.value')}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
