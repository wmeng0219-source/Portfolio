import React, { useEffect, useRef, useState } from 'react';
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
  const visualStageRef = useRef(null);
  const glowRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

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
          const { isDesktop, reduceMotion } = context.conditions;

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

          if (visualStageRef.current) {
            gsap.fromTo(
              visualStageRef.current,
              reduceMotion ? { autoAlpha: 0 } : { y: 42, autoAlpha: 0.01, scale: 0.92, rotate: -4 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                rotate: 0,
                duration: reduceMotion ? 0.01 : 1.16,
                delay: reduceMotion ? 0 : 0.14,
                ease: 'power3.out',
              },
            );
          }

          if (glowRef.current && !reduceMotion) {
            gsap.to(glowRef.current, {
              scale: 1.14,
              autoAlpha: 0.92,
              duration: 4.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          if (visualStageRef.current && isDesktop && !reduceMotion) {
            gsap.to(visualStageRef.current, {
              yPercent: -10,
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

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const visualInnerStyle = {
    transform: `translate3d(${(mouse.x - 0.5) * -16}px, ${(mouse.y - 0.5) * -12}px, 0) rotateY(${
      (mouse.x - 0.5) * 6
    }deg) rotateX(${(mouse.y - 0.5) * -4}deg)`,
  };

  return (
    <section className={styles.hero} id="hero" ref={sectionRef} data-hero-stage>
      <div className={styles.stageBackdrop} aria-hidden="true">
        <div className={styles.stageGlow} ref={glowRef} />
        <div className={styles.stageNoise} />
        <div className={styles.stageGrid} />

        <div className={styles.visualStage} ref={visualStageRef}>
          <div className={styles.visualInner} style={visualInnerStyle}>
            <div className={styles.orbitalField}>
              <div className={styles.orbitalHalo} />
              <div className={styles.orbitalRingOuter} />
              <div className={styles.orbitalRingInner} />
              <div className={styles.orbitalTickOrbit}>
                <div className={styles.orbitalTick} />
              </div>
              <div className={styles.orbitalCore} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.shell}>
        <p className={styles.metaLine} data-hero-anim="support">
          {t('hero.stage.kicker')}
        </p>

        <div className={styles.copy} ref={copyRef}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleRow}>
              <span className={styles.titleInner} data-hero-anim="title">
                {t('hero.stage.title.1')}
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={styles.titleInner} data-hero-anim="title">
                {t('hero.stage.title.2')}
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={styles.titleInner} data-hero-anim="title">
                {t('hero.stage.title.3')}
              </span>
            </span>
            <span className={styles.titleRow}>
              <span className={styles.titleInner} data-hero-anim="title">
                <span className={styles.titleAccent}>{t('hero.stage.title.4')}</span>
              </span>
            </span>
          </h1>

          <p className={styles.body} data-hero-anim="support">
            {t('hero.stage.body')}
          </p>

          <div className={styles.actions} data-hero-anim="support">
            <a
              className={styles.btnPrimary}
              href="#portfolio"
              data-motion-hover="button"
              onClick={(event) => scrollToSection(event, 'portfolio')}
            >
              <span>{t('hero.stage.cta')}</span>
              <span className={styles.btnArrow} aria-hidden="true">
                ↘
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
