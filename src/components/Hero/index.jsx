import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useLanguage();
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(el.children, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content} ref={contentRef}>
        <div className={styles.greeting}>{t('hero.greeting')}</div>
        <h1 className={styles.title}>{t('hero.title')}</h1>
        <div className={styles.subtitle}>{t('hero.subtitle')}</div>
        <blockquote className={styles.quote}>{t('hero.quote')}</blockquote>
        <div className={styles.actions}>
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
