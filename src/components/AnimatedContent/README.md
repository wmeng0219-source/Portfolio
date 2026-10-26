# React Bits Animated Content

Official JavaScript source, copied without modifications on 2026-10-26.

- Source: https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/AnimatedContent/AnimatedContent.jsx
- SHA-256: `f18acb24614948733f8351479f03a06d3052ddacfb291e4cbaccead58499bab2`
- License: [MIT + Commons Clause](LICENSE.md), copyright David Haz.
- Runtime dependencies: the project's existing GSAP and ScrollTrigger.

Homepage uses default animation props: 100px vertical movement, 0.8s, power3.out, viewport top 90%, once per mount. Layout classes are supplied at call sites. Semantic list items and sticky project links stay outside animated containers. No custom timing or extra stagger is applied.
