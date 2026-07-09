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

          const isProofSection = Boolean(section.querySelector('[data-motion-group="proof"]'));
          const isPortfolioSection = Boolean(section.querySelector('[data-motion-group="portfolio-stage"]'));

          const fromVars = reduceMotion
            ? { autoAlpha: 0 }
            : { y: isProofSection ? 36 : isPortfolioSection ? 32 : 24, autoAlpha: 0 };

          const toVars = {
            y: 0,
            autoAlpha: 1,
            duration: reduceMotion ? 0.01 : isProofSection ? 0.95 : isPortfolioSection ? 0.88 : 0.74,
            stagger: reduceMotion ? 0 : isProofSection ? 0.16 : isPortfolioSection ? 0.1 : 0.08,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: section,
              start: isProofSection ? 'top 78%' : isPortfolioSection ? 'top 80%' : 'top 84%',
              once: true,
            },
          };

          gsap.fromTo(
            items,
            fromVars,
            toVars,
          );
        });

        if (isDesktop && !reduceMotion) {
          const hoverTargets = Array.from(root.querySelectorAll('[data-motion-hover]'));

          hoverTargets.forEach((node) => {
            const enter = () => {
              gsap.to(node, {
                y: -4,
                scale: node.dataset.motionHover === 'button' ? 1.01 : 1,
                duration: 0.26,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };

            const leave = () => {
              gsap.to(node, {
                y: 0,
                scale: 1,
                duration: 0.24,
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
