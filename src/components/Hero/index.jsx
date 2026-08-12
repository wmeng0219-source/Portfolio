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

const TITLE_TEXT = 'MENG WEN';

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const gridRef = useRef(null);
  const watermarkRef = useRef(null);

  const titleChars = useMemo(() => TITLE_TEXT.split(''), []);

  // Lagging spotlight: GSAP smoothly interpolates position toward cursor
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initialize spotlight at center
    const pos = { x: 50, y: 50 };
    section.style.setProperty('--mouse-x', '50%');
    section.style.setProperty('--mouse-y', '50%');

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const targetX = ((e.clientX - rect.left) / rect.width) * 100;
      const targetY = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.to(pos, {
        x: targetX,
        y: targetY,
        duration: 1.0,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          section.style.setProperty('--mouse-x', `${pos.x.toFixed(2)}%`);
          section.style.setProperty('--mouse-y', `${pos.y.toFixed(2)}%`);
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.fromTo(
              '[data-hero-part]',
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.01 },
            );
            return undefined;
          }

          // 入场编排（DESIGN.md 7.3：eyebrow → Display → summary → actions，重叠推进）
          gsap.fromTo(
            '[data-hero-part="eyebrow"]',
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 },
          );
          gsap.fromTo(
            '.hero-char',
            { yPercent: 115 },
            { yPercent: 0, duration: 0.75, stagger: 0.04, ease: 'power3.out', delay: 0.28 },
          );
          gsap.fromTo(
            '[data-hero-part="summary"]',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.72 },
          );
          gsap.fromTo(
            '[data-hero-part="actions"]',
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.92 },
          );
          gsap.fromTo(
            '[data-hero-part="scrollhint"]',
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: 'power2.out', delay: 1.4 },
          );

          // 滚出联动：离开首屏时内容淡出、水印加速上移（scrub 仅用于有语义的进度）
          gsap.to(copyRef.current, {
            y: -80,
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '80% top',
              scrub: true,
            },
          });
          gsap.to(watermarkRef.current, {
            yPercent: -30,
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '60% top',
              scrub: true,
            },
          });

          // 鼠标视差：transform 分层位移（替代失效的 backgroundPosition 方案）
          if (isDesktop) {
            const handlePointerMove = (e) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              gsap.to(watermarkRef.current, {
                x: nx * 28,
                y: ny * 18,
                duration: 0.9,
                ease: 'power2.out',
                overwrite: 'auto',
              });
              gsap.to(glowRef.current, {
                x: nx * -36,
                y: ny * -24,
                duration: 1.1,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };
            window.addEventListener('pointermove', handlePointerMove);
            return () => window.removeEventListener('pointermove', handlePointerMove);
          }

          return undefined;
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg px-margin-mobile md:px-margin-desktop text-center overflow-hidden bg-[var(--color-bg-primary)]"
      id="hero"
      ref={sectionRef}
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none z-0 hero-grid-bg"
      />

      {/* Spotlight overlay: dark everywhere except near cursor */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-spotlight" />

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-vignette" />

      {/* Background Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2
          className="font-display-hero text-[20vw] uppercase opacity-[0.03] leading-none whitespace-nowrap text-on-surface tracking-tighter"
          ref={watermarkRef}
        >
          MENG WEN
        </h2>
      </div>

      {/* Hero Content - Matches Figma Node 272:178 */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center pt-16 md:pt-20 space-y-6 md:space-y-8" ref={copyRef}>
        {/* Eyebrow kicker */}
        <p className="hero-eyebrow" data-hero-part="eyebrow">
          {t('hero.stage.kicker') || '数字化产品系统 / 2025'}
        </p>

        {/* Main H1 Title: Anton font, per-char mask reveal, gradient shimmer */}
        <div className="relative">
          <h1
            className="font-display-hero text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-none uppercase tracking-[-0.03em] font-normal"
            aria-label={TITLE_TEXT}
            data-hero-anim="title"
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

        <p className="font-body text-base md:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto font-light tracking-wide px-4" data-hero-part="summary" data-hero-anim="support">
          {t('hero.body') || '产品经理与设计复合型实践者。聚焦医疗数字化、流程重构与AI协作，在混乱的真实业务现场中，建立可执行、可观察的系统闭环。'}
        </p>

        {/* CTA Buttons Container: Figma Node 272:194 */}
        <div className="flex items-center justify-center gap-6 pt-2" data-hero-part="actions" data-hero-anim="support">
          {/* Button 1: 查看项目 */}
          <a
            className="px-8 py-3.5 bg-[var(--color-accent)] text-[#231745] rounded-full font-semibold text-base md:text-lg hover:opacity-95 hover:shadow-[0_0_35px_rgba(200,182,255,0.4)] transition-all flex items-center gap-2.5 no-underline cursor-pointer"
            href="#portfolio"
            data-motion-hover="button"
            onClick={(event) => scrollToSection(event, 'portfolio')}
          >
            <span>{t('hero.stage.cta') || '查看项目'}</span>
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              arrow_outward
            </span>
          </a>

          {/* Button 2: 联系我 */}
          <a
            className="px-8 py-3.5 bg-[#EADEFF]/90 border border-[#C8B6FF]/50 rounded-full font-semibold text-base md:text-lg hover:bg-[#EADEFF] transition-all text-[#231745] no-underline cursor-pointer"
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
          >
            {t('hero.btn.contact') || '联系我'}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" data-hero-part="scrollhint" aria-hidden="true">
        <span className="hero-scroll-hint-label">{t('hero.scrollHint') || 'SCROLL'}</span>
        <span className="hero-scroll-line">
          <span className="hero-scroll-dot" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
