import React, { useEffect, useMemo, useRef } from 'react';
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

const TITLE_TEXT = 'WEN MENG';

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const copyRef = useRef(null);

  const titleChars = useMemo(() => TITLE_TEXT.split(''), []);

  // 入场编排（DESIGN.md 7.3：eyebrow → Display → 衬线 lede → actions，重叠推进）
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.fromTo(
              '[data-hero-part]',
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.01 },
            );
            return undefined;
          }

          gsap.fromTo(
            '.hero-char',
            { yPercent: 115 },
            { yPercent: 0, duration: 0.75, stagger: 0.04, ease: 'power3.out', delay: 0.28 },
          );
          gsap.fromTo(
            '[data-hero-part="lede"]',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.72 },
          );
          gsap.fromTo(
            '[data-hero-part="actions"]',
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.96 },
          );
          gsap.fromTo(
            '[data-hero-part="scrollhint"]',
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: 'power2.out', delay: 1.4 },
          );

          // 滚出联动：离开首屏时内容整体淡出上移（轻量，不锁定）
          gsap.to(copyRef.current, {
            y: -60,
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '75% top',
              scrub: true,
            },
          });

          return undefined;
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-between pt-24 pb-8 px-margin-mobile md:px-margin-desktop text-center overflow-hidden bg-[var(--color-bg-primary)]"
      id="hero"
      ref={sectionRef}
    >
      {/* 纯净深色背景：微环境光韵与极弱网格线（DESIGN.md 4.2） */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-ambient-glow" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-bg" aria-hidden="true" />

      {/* Hero Content - centered in viewport */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center my-auto py-6 space-y-4 md:space-y-6" ref={copyRef}>
        {/* Main H1 Title: Anton Display, Mint→White gradient, per-char mask reveal */}
        <div className="relative">
          <h1
            className="hero-display-title"
            aria-label={TITLE_TEXT}
          >
            <span aria-hidden="true" className="hero-title-chars">
              {titleChars.map((char, index) =>
                char === ' ' ? (
                  <span className="hero-char-space" key={`space-${index}`}>
                    &nbsp;
                  </span>
                ) : (
                  <span className="hero-char-mask" key={`char-${index}`}>
                    <span className="hero-char">{char}</span>
                  </span>
                ),
              )}
            </span>
          </h1>
        </div>

        {/* Narrative Lede */}
        <p
          className="hero-lede"
          data-hero-part="lede"
        >
          {t('hero.body') || '把复杂业务，拆解为清晰、可用、可落地的产品系统。'}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-5 pt-6 md:pt-10 flex-wrap" data-hero-part="actions">
          {/* Button 1: 查看精选项目 */}
          <a
            className="btn-hero-primary"
            href="#portfolio"
            data-motion-hover="button"
            onClick={(event) => scrollToSection(event, 'portfolio')}
          >
            <span>{t('hero.stage.cta') || '查看精选项目'}</span>
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              arrow_outward
            </span>
          </a>

          {/* Button 2: 联系我 */}
          <a
            className="btn-hero-secondary"
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
          >
            {t('hero.btn.contact') || '联系我'}
          </a>
        </div>
      </div>

      {/* Scroll hint - in natural flow below content, never overlaps */}
      <div className="relative z-10 hero-scroll-hint shrink-0 pt-4" data-hero-part="scrollhint" aria-hidden="true">
        <span className="hero-scroll-hint-label">{t('hero.scrollHint') || 'SCROLL'}</span>
        <span className="hero-scroll-line">
          <span className="hero-scroll-dot" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
