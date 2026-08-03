# Design System: Harrison Wheeler Portfolio

## 1. Visual Theme & Atmosphere

Harrison Wheeler's personal portfolio website presents a high-end, dark editorial design leader aesthetic. The overall mood is sophisticated, architectural, and deeply atmospheric—combining ultra-dark charcoal surfaces with crisp, fluid typography and soft pastel accent pops (lavender, mint green, and soft pink).

- Overall feeling: Architectural, editorial, dark, refined design leadership
- Visual density: Generous whitespace, slide-deck layout feel, uncluttered editorial blocks
- Brand posture: Experienced Product Design Executive / Design Director (ex-Base CRM, ex-Zendesk, LeadCraft)
- Signature motifs: Full-bleed deck slides, SVG architecture diagrams, fluid responsive clamps, pastel tag badges

### Key Characteristics

- Midnight Dark Base (`#0d0c11`) with layered obsidian surfaces (`#16151c`, `#1f1d26`) and hairline borders (`#2a2833`)
- Fluid Display Typography using `Neudron` display sans, paired with `GT America` body and `IBM Plex Mono` code/label specs
- Pastel Accent System introducing soft lavender (`#d0bcff`), mint green (`#b9f2c8`), and blush pink (`#ffd8e4`)
- Deck Slide Architecture utilizing presentation-style case study cards with phone mockups and custom SVG diagrams

## 2. Color Palette & Roles

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Primary action | Soft Lavender | `#d0bcff` | Primary CTA, focus state, active highlights |
| Accent | Pastel Mint Green | `#b9f2c8` | Status pills, highlight tags, secondary callouts |
| Accent | Soft Powder Pink | `#ffd8e4` | Decorative tags, subtle category badges |
| Surface | Midnight Base | `#0d0c11` | Main page background |
| Surface | Obsidian Card | `#16151c` | Primary container surface |
| Surface | Surface Elevated | `#1f1d26` | Secondary cards, dropdowns, code blocks |
| Text | Crisp Off-White | `#ece9f1` | Primary headings and body copy |
| Text | Lavender Grey | `#a39fb0` | Muted text, subtitles, meta labels |
| Text | Dim Grey | `#75717f` | Footers, captions, minor metadata |
| Border | Soft Charcoal | `#2a2833` | Card outlines, dividers, structural lines |

### Primary

- Base Background (`--bg`): `#0d0c11`
- Primary Text (`--text`): `#ece9f1`
- Accent Primary (`--primary`): `#d0bcff` (Hover: `#e3d6ff`)

### Interactive

- Links & CTAs: `#d0bcff` with `hover { transform: translateY(-1px); color: #e3d6ff; }`
- Focus Rings: `2px solid #d0bcff` with `rgba(208, 188, 255, 0.24)` glow shadow

### Neutral Scale

- Midnight Base: `#0d0c11`
- Dark Surface 1: `#16151c`
- Dark Surface 2: `#1f1d26`
- Muted Grey: `#a39fb0`
- Dimmed Grey: `#75717f`

### Surface & Overlay

- Card Surface: `#16151c` with 1px border `#2a2833`
- Diagram Node Background: `rgba(208, 188, 255, 0.12)` with border `rgba(208, 188, 255, 0.34)`

### Theme Modes

#### Dark Mode (Primary Default)

- Background: `#0d0c11`
- Surface: `#16151c`
- Text: `#ece9f1`
- Accent: `#d0bcff` / `#b9f2c8`
- Notes: Deep dark theme designed for high-contrast viewing of design portfolios and case studies.

### Shadows & Depth

- Soft Panel Shadow: `0 8px 32px rgba(0, 0, 0, 0.36)`
- Card Hover Elevation: `translateY(-2px)` with border color shift from `#2a2833` to `rgba(208, 188, 255, 0.4)`

## 3. Typography Rules

### Font Family

- Primary: `'Neudron', 'GT America', 'Helvetica Neue', Helvetica, Arial, sans-serif`
- Monospace: `'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`
- OpenType Features: `ss01`, `cv01`, tabular numbers for stat metrics

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline | Neudron | `clamp(2.6rem, 14.5vw, 13rem)` | 700 | 0.92 | `-0.03em` | Massive architectural display title |
| Section heading | Neudron | `clamp(2.8rem, 7.6vw, 6.4rem)` | 600 | 1.05 | `-0.01em` | H2 section titles |
| Body | GT America | `clamp(1rem, 1.6vw, 1.55rem)` | 400 | 1.6 | `normal` | Main narrative copy |
| Label / Eyebrow | IBM Plex Mono | `clamp(0.8rem, 1.1vw, 1.05rem)` | 500 | 1.2 | `0.08em` | Uppercase metadata pills & tags |
| Caption / Meta | IBM Plex Mono | `clamp(0.62rem, 0.88vw, 0.85rem)` | 500 | 1.2 | `0.05em` | Tech stack & metric tags |

### Principles

- Fluid CSS Clamp Sizing ensuring text scales seamlessly across screen widths from 320px to 2560px.
- Typographic Contrast between ultra-heavy custom display sans (`Neudron`) and technical monospace labels (`IBM Plex Mono`).
- Expressive Quote Treatment using serif italic (`Reckless`) for editorial weight.

## 4. Component Stylings

### Buttons and Links

- Primary CTA: Solid background `#d0bcff`, dark text `#381e72`, font weight 600, border radius `10px`.
- Secondary CTA: Ghost surface `#1f1d26` with hairline border `#2a2833`, light text `#ece9f1`.
- Text links: Lavender color `#d0bcff` with subtle underline hover animation.
- Hover and active feel: Smooth `transform: translateY(-2px)` with subtle color transition over 200ms.

### Cards and Containers

- Surface style: `#16151c`
- Radius: `16px`
- Border: `1px solid #2a2833`
- Shadow or elevation: Inset border + drop shadow `0 8px 24px rgba(0, 0, 0, 0.4)`
- Internal spacing: `clamp(28px, 5vw, 64px)`

### Navigation

- Structure: Top header with fixed logo left, link items right.
- Background treatment: Glassmorphism blur `backdrop-filter: blur(16px)` on background `rgba(13, 12, 17, 0.82)`.
- Link style: `IBM Plex Mono` uppercase font size `14px`, text color `#a39fb0`.
- Sticky or scroll behavior: Fixed top with subtle background opacity shift on scroll.

### Image Treatment

- Screenshot treatment: Dark-framed phone mockups with rounded corners `12px`.
- Photography style: High-contrast product UI screenshots and vector architectural diagrams.
- Border and radius treatment: `1px solid #2a2833` with `16px` container radius.

### Distinctive Components

- Deck Slide Layout: Full-width presentation slide unit featuring side-by-side case study title, specs, and interactive media/mockups.
- Interactive Metric Callouts: Large `Neudron` stat numbers next to `IBM Plex Mono` descriptive captions.
- Architectural Process Diagrams: Custom SVG node-and-connector flowcharts using `#545260` stroke lines and `#d0bcff` nodes.

## 5. Layout Principles

### Spacing System

- Base unit: `8px`
- Repeated spacing values: `8px`, `16px`, `24px`, `32px`, `48px`, `80px`

### Grid & Container

- Grid logic: 2-column split layout, max-width `1320px`.
- Max content width: `1320px`
- Section spacing: `clamp(72px, 12vh, 160px)`

### Whitespace Philosophy

- Whitespace philosophy: Generous slide-by-slide vertical cadence giving every case study dedicated focal area.
- Alignment tendencies: Left-aligned titles and narrative copy with right-aligned process diagrams or phone mockups.
- Content width behavior: Max content width restricted to 1320px, centered horizontally.

### Border Radius Scale

- Micro: `4px`
- Standard: `10px`
- Large: `16px`
- Pill: `999px`

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | `#0d0c11` (No border) | Main canvas background |
| Ring | Hairline `1px solid #2a2833` | Component dividers and card outlines |
| Card | `#16151c` + shadow `0 8px 24px rgba(0,0,0,0.4)` | Presentation slide cards & case studies |
| Focus | Outline `2px solid #d0bcff` | Keyboard navigation & focus state |

## 7. Do's and Don'ts

### Do

- Use fluid `clamp()` sizing for all heading and body font rules.
- Maintain high contrast between dark background surfaces and bright pastel accent badges.
- Keep structural elements aligned to an 8px spatial grid.

### Don't

- Don't use harsh pure black (`#000000`) or pure white (`#ffffff`) for main background and text.
- Don't overcrowd cards—preserve slide-deck whitespace proportions.
- Don't mix more than 3 accent colors in a single card module.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | `< 768px` | Single-column stack, navigation collapses, clamp text scales down dynamically |
| Tablet | `768px - 1024px` | 2-column grid with reduced gap (`40px`), medium clamp sizes |
| Desktop | `> 1024px` | Full 2-column split deck view, gap 80px, max-width 1320px |

### Touch Targets

- Minimum touch target height: `44px` for interactive CTAs and navigation items.

### Collapsing Strategy

- Desktop behavior: Side-by-side 2-column split layout with full interactive deck slides.
- Tablet behavior: Grid gap reduces from 80px to 40px; typography scales down via fluid clamp.
- Mobile behavior: All multi-column cards collapse into a single vertical scroll stack.

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: `#d0bcff`
- Background: `#0d0c11`
- Heading text: `#ece9f1`
- Body text: `#a39fb0`
- Border or ring: `#2a2833`
- Accent: `#b9f2c8`

### Quick Summary

Harrison Wheeler's portfolio design system is built on a midnight obsidian base (`#0d0c11`) with layered surface cards (`#16151c`), crisp high-contrast display typography (`Neudron`), technical monospace labels (`IBM Plex Mono`), and pastel accent highlights (`#d0bcff`, `#b9f2c8`). Layouts feel like a polished executive slide deck with generous spacing, fluid text scaling, and architectural case study mockups.

### Example Component Prompts

- Hero: "Build a dark editorial portfolio hero with a massive Neudron display heading, IBM Plex Mono uppercase eyebrow tag in lavender (#d0bcff), and obsidian surface card."
- Card: "Create a case study card with background #16151c, border 1px solid #2a2833, border-radius 16px, featuring a mint green badge (#b9f2c8) and large stat metric."

### Ready-to-Use Prompt

"Design a high-end product design portfolio UI in Dark Mode. Use background #0d0c11, surface cards #16151c with 1px border #2a2833 and 16px radius. Set titles in bold display sans with off-white text #ece9f1, subtitles in muted lavender-grey #a39fb0, and tag pills in soft lavender #d0bcff or mint green #b9f2c8. Layout should feel like an executive presentation slide deck with fluid typography."

### Iteration Guide

1. Start with the midnight background `#0d0c11` and obsidian surface `#16151c`.
2. Apply `Neudron` for high-impact display titles and `IBM Plex Mono` for technical tags.
3. Accentuate key interactive elements with lavender `#d0bcff` and mint green `#b9f2c8`.

## Optional Appendix: Observed Pages

- https://www.harrisonwheeler.com/ : Homepage slide-deck portfolio showcasing Base CRM, LeadCraft, and Holiday case studies.
