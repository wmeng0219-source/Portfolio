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

          const staggerAmount = section.querySelector('[data-motion-group="portfolio-secondary"]')
            ? 0.08
            : 0.12;

          gsap.fromTo(
            items,
            reduceMotion ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reduceMotion ? 0.01 : 0.8,
              stagger: reduceMotion ? 0 : staggerAmount,
              ease: 'power3.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                once: true,
              },
            },
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
