# React Bits Particle Text

Based on official JavaScript and CSS copied on 2026-10-26, with the local patches documented below.

- [Source](https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/ParticleText)
- [License](LICENSE.md): MIT + Commons Clause, David Haz.
- Original upstream JSX SHA-256: `0e22e4cd5e822aeeea69fc583c08336df709248a8960e9f4f218e4087ef6e0cb`
- CSS SHA-256: `305c4d3cf0d48bf2bdd86206d8d0a0389a5d78b122d8f31bea928ef785370d04`

Hero uses Anton 400, clamp(96px,20cqw,232px), white #ffffff base color and soft green #9edbb3 motion/hover highlight. Interaction and sampling match the linked official Ember preview: particleSize 2.2, density 4, scatter 340 (expanded by user request), pointerRepel 42, repelRadius 120, idleDrift 0.8. Local compatibility patch: optional maxParticles is passed into settings and the sampling key; target selection is extracted into sampling.js. Without an override the original area-based budget is retained. Hero sets maxParticles=10000 so the enlarged Anton glyph retains its full sampling grid instead of dropping every second or third point. Hover physics are unchanged. Hero/ParticleTitle.jsx keeps the h1 and solid fallback for reduced motion or unavailable Canvas/observers. Homepage-scoped CSS supplies the canvas height. No additional dependencies.

Intro color patch: optional introColor selects a separate highlight palette while gathering. Hero supplies #9edbb3, matching completed pointer interactions; settled text remains #ffffff. Unspecified introColor preserves upstream behavior.

Fullscreen intro patch: fullScreen uses the surrounding section as the canvas surface while layout.js preserves the original text target center and fitting width. Gather starts are distributed across that surface. A scoped CSS modifier permits the canvas to extend beyond the title box; the section is observed for resize and existing observer/frame cleanup is retained. Hero enables this mode.

Click burst strength: Hero sets burstStrength=1.8 to increase click force and radius; hover physics remain unchanged.

Scroll scatter patch: optional `scrollScatter` maps the hero's progress out of the viewport to a reversible outward offset, so the title disperses on scroll and gathers on return. The offset is biased upward to keep the lede readable, and a fullscreen-only canvas mask fades the cloud near the hero edge. Hero enables it; reduced motion keeps the settled text. The progress calculation lives in `layout.js` (`scrollScatterProgress`) and is covered by `layout.test.js`.
