import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';

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
    const handleMouseMove = (e) => {
      const amount = 15;
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      const y = (e.clientY / window.innerHeight - 0.5) * amount;
      if (sectionRef.current) {
        sectionRef.current.style.backgroundPosition = `${x}px ${y}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;
          if (copyRef.current) {
            gsap.fromTo(
              copyRef.current.children,
              reduceMotion ? { autoAlpha: 0 } : { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0.01 : 1,
                stagger: 0.1,
                ease: 'power3.out',
              },
            );
          }
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg px-margin-mobile md:px-margin-desktop text-center overflow-hidden bg-[#06070B]"
      id="hero"
      ref={sectionRef}
    >
      {/* Background Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="font-display-hero text-[20vw] uppercase opacity-[0.03] leading-none whitespace-nowrap text-on-surface tracking-tighter">
          MENG WEN
        </h2>
      </div>

      {/* Hero Content - Matches Figma Node 272:178 */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center pt-20 space-y-10" ref={copyRef}>
        {/* Main H1 Title: Anton font with Linear Gradient Fill */}
        <div className="relative">
          <h1
            className="font-display-hero text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] leading-none uppercase tracking-[-0.03em] font-normal bg-gradient-to-b from-[#D0BDFF] via-[#C8B6FF] to-[#EADEFF] bg-clip-text text-transparent"
            data-hero-anim="title"
          >
            MENG WEN
          </h1>
        </div>

        {/* Bio Copy Paragraph: Figma Node 272:193 */}
        <p className="font-body text-lg md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto font-light tracking-wide px-4" data-hero-anim="support">
          产品经理与设计复合型实践者。聚焦医疗数字化、流程重构与AI协作，在混乱的真实业务现场中，建立可执行、可观察的系统闭环。
        </p>

        {/* CTA Buttons Container: Figma Node 272:194 */}
        <div className="flex items-center justify-center gap-8 pt-2" data-hero-anim="support">
          {/* Button 1: 查看项目 */}
          <a
            className="px-9 py-3.5 bg-[#C8B6FF] text-[#352564] rounded-full font-medium text-lg hover:bg-[#b8a2ff] hover:shadow-[0_0_35px_rgba(200,182,255,0.4)] transition-all flex items-center gap-2.5 no-underline cursor-pointer"
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
            className="px-9 py-3.5 bg-white/5 border border-white/10 rounded-full font-medium text-lg hover:bg-white/10 backdrop-blur-md transition-all text-[#E5E2E1] no-underline cursor-pointer"
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
          >
            {t('hero.btn.contact') || '联系我'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
