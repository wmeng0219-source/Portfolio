import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHomepageMotion = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 901px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        const sections = Array.from(root.querySelectorAll('[data-motion-section]'));
        const cleanups = [];

        sections.forEach((section) => {
          const items = Array.from(section.querySelectorAll('[data-motion-item]'));
          if (!items.length) {
            return;
          }

          const isPortfolioSection = Boolean(section.querySelector('[data-motion-group="portfolio-stage"]'));
          const isStageDenseSection = Boolean(
            section.querySelector('.about-stage-list, .experience-timeline, .contact-stage-methods'),
          );

          const fromVars = reduceMotion
            ? { autoAlpha: 0 }
            : { y: isPortfolioSection ? 28 : isStageDenseSection ? 20 : 18, autoAlpha: 0 };

          const toVars = {
            y: 0,
            autoAlpha: 1,
            duration: reduceMotion ? 0.01 : 0.62,
            stagger: reduceMotion ? 0 : isPortfolioSection ? 0.06 : 0.05,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: section,
              start: isPortfolioSection ? 'top 84%' : isStageDenseSection ? 'top 86%' : 'top 88%',
              once: true,
            },
          };

          gsap.fromTo(
            items,
            fromVars,
            toVars,
          );
        });

        if (reduceMotion) {
          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        }

        if (isDesktop) {
          const hoverTargets = Array.from(root.querySelectorAll('a[data-motion-hover], button[data-motion-hover]'));

          hoverTargets.forEach((node) => {
            const enter = () => {
              gsap.to(node, {
                y: -2,
                scale: node.dataset.motionHover === 'button' ? 1.01 : 1.005,
                duration: 0.18,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };

            const leave = () => {
              gsap.to(node, {
                y: 0,
                scale: 1,
                duration: 0.22,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };

            node.addEventListener('pointerenter', enter);
            node.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              node.removeEventListener('pointerenter', enter);
              node.removeEventListener('pointerleave', leave);
            });
          });
        }

        return () => {
          cleanups.forEach((cleanup) => cleanup());
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, [rootRef]);
};
