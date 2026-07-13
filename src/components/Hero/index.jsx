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
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const copyNodes = copyRef.current
        ? Array.from(copyRef.current.querySelectorAll('[data-hero-anim]'))
        : [];
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          if (copyNodes.length) {
            gsap.fromTo(
              copyNodes,
              reduceMotion ? { autoAlpha: 0 } : { y: 32, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0.01 : 0.82,
                stagger: reduceMotion ? 0 : 0.1,
                ease: 'power3.out',
              },
            );
          }

          if (visualRef.current) {
            gsap.fromTo(
              visualRef.current,
              reduceMotion ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0.01 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0.01 : 0.92,
                delay: reduceMotion ? 0 : 0.18,
                ease: 'power3.out',
              },
            );
          }

          if (glowRef.current && !reduceMotion) {
            gsap.to(glowRef.current, {
              scale: 1.06,
              autoAlpha: 0.88,
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          if (visualRef.current && isDesktop && !reduceMotion) {
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
        },
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={sectionRef}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} ref={glowRef} />
      </div>

      <div className={styles.shell}>
        <div className={styles.copy} ref={copyRef}>
          <p className={styles.kicker} data-hero-anim>
            {t('hero.meta.name')} — {t('hero.meta.role')}
          </p>
          <h1 className={styles.mainTitle} data-hero-anim>
            {t('hero.title')}
          </h1>
          <p className={styles.body} data-hero-anim>
            {t('hero.body')}
          </p>
          <div className={styles.actions} data-hero-anim>
            <a className={styles.btnPrimary} href="#portfolio" data-motion-hover="button">
              {t('hero.btn.work')}
            </a>
            <a className={styles.btnSecondary} href="#contact" data-motion-hover="button">
              {t('hero.btn.contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
