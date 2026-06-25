import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useLanguage();
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-anim="true"]', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content} ref={contentRef}>
        <div className={styles.greeting} data-anim="true">{t('hero.greeting')}</div>
        <h1 className={styles.title} data-anim="true">{t('hero.title')}</h1>
        <div className={styles.subtitle} data-anim="true">{t('hero.subtitle')}</div>
        <blockquote className={styles.quote} data-anim="true">{t('hero.quote')}</blockquote>
        <div className={styles.actions} data-anim="true">
          <button className={styles.btnPrimary}>{t('hero.btn.work')}</button>
          <button className={styles.btnSecondary}>{t('hero.btn.contact')}</button>
        </div>
      </div>
      <div className={styles.visual}>
        {/* Placeholder for photo or visual element */}
      </div>
    </section>
  );
};

export default Hero;
