import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollToSection = (event, id) => {
  event.preventDefault();
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleNodes = copyRef.current
        ? Array.from(copyRef.current.querySelectorAll('[data-hero-anim="title"]'))
        : [];
      const supportNodes = copyRef.current
        ? Array.from(copyRef.current.querySelectorAll('[data-hero-anim="support"]'))
        : [];
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (titleNodes.length) {
            gsap.fromTo(
              titleNodes,
              reduceMotion ? { autoAlpha: 0 } : { yPercent: 110, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0.01 : 1.08,
                stagger: reduceMotion ? 0 : 0.06,
                ease: 'power4.out',
              },
            );
          }

          if (supportNodes.length) {
            gsap.fromTo(
              supportNodes,
              reduceMotion ? { autoAlpha: 0 } : { y: 32, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0.01 : 0.84,
                stagger: reduceMotion ? 0 : 0.06,
                delay: reduceMotion ? 0 : 0.28,
                ease: 'power3.out',
              },
            );
          }
        },
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={sectionRef} data-hero-stage>
      <div className={styles.shell}>
        <div className={styles.copy} ref={copyRef}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleRow}>
              <span className={styles.titleInner} data-hero-anim="title">
                {t('hero.title.name')}
              </span>
            </span>
          </h1>

          <p className={styles.subtitle} data-hero-anim="support">
            {t('hero.body')}
          </p>

          <div className={styles.actions} data-hero-anim="support">
            <a
              className={styles.btnPrimary}
              href="#portfolio"
              data-motion-hover="button"
              onClick={(event) => scrollToSection(event, 'portfolio')}
            >
              <span>{t('hero.btn.work')}</span>
              <svg className={styles.btnIcon} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              className={styles.btnSecondary}
              href="#contact"
              data-motion-hover="button"
              onClick={(event) => scrollToSection(event, 'contact')}
            >
              <span>{t('hero.btn.contact')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
