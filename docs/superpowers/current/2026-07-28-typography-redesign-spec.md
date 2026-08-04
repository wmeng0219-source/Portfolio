# Typography & Editorial Layout Redesign Spec

## 1. 背景与目标
为了进一步深化“高级深色编辑风 (Dark Editorial)”，目前的排版系统（基于 Manrope）在字重对比、字距收放上缺乏足够的张力。
本方案旨在通过引入更具力量感的无衬线字体（如 Inter）、建立极端的字距反差（紧凑的大标题 vs 疏散的全大写标签）、拉大字号与行高对比，从而在不改变现有 DOM 结构的前提下，从根本上改变站点的视觉气质。

## 2. 核心架构与规范

### 2.1 字体族 (Font Family)
- **引入强力字体**：在 `index.html` 或全局中引入 `Inter` 作为首选英文字体。
- **Font Display (标题)**: `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif`
- **Font Body (正文)**: 保持同上或保持现有以求稳妥，但主要通过 `Inter` 来提升英文部分的高级感。

### 2.2 字距反差 (Kerning & Tracking)
- **大标题 (Headings / Titles)**: 采用极度紧凑的字距，例如 `letter-spacing: -0.05em` 甚至更低，配合 `font-weight: 800` 或 `900`，让字母紧密咬合，形成强烈的块状力量感。
- **标签与辅助文本 (Kicker / Eyebrow / Tags)**: 采用极度松散的字距，例如 `letter-spacing: 0.25em` 或 `0.3em`，并强制全大写 (`text-transform: uppercase`)，配合 `font-weight: 500` 或 `600`，形成精致的呼吸感。

### 2.3 字号与行高比例 (Scale & Line-height)
- **正文 (Body)**: 字号调整为 `1.1rem` 左右，行高拉大至 `1.8`，字重降低至 `400`，营造大片留白与舒适的阅读体验。
- **巨型标题 (Hero/Stage Titles)**: 字号进一步放大，例如 `clamp(4rem, 8vw, 8rem)`，行高收紧至 `1.0` 甚至 `0.95`，确保多行标题紧凑。

## 3. 核心文件改造方案

### 3.1 引入外部字体
- 修改 `index.html`，通过 Google Fonts 引入 `Inter` 字体。

### 3.2 变量更新 (`src/styles/variables.css`)
- 修改 `--font-display` 和 `--font-body`。
- 调整 `--text-body`、`--text-hero` 等缩放比例变量。

### 3.3 全局排版类覆盖 (`src/styles/global.css`)
- 强制更新所有 `.section-title`, `.portfolio-stage-title`, `.experience-stage-title`, `.contact-stage-title-new` 的 `letter-spacing` 为 `-0.05em`。
- 强制更新所有 `.section-kicker`, `.eyebrow-label`, `.portfolio-card-tag`, `.experience-stage-card-period` 等标签类的 `letter-spacing` 为 `0.25em` 甚至更大。
- 调整 `body` 的 `line-height`。

## 4. 影响范围
- `index.html`
- `src/styles/variables.css`
- `src/styles/global.css`

## 5. 预期结果
全站文本将呈现出极其明显的“极紧凑的大标题”与“极疏松的小标签”的两极反差，配合先前改好的深紫黑底色，将直接带出欧美高级数字机构/个人顾问站的 Editorial 气质。
