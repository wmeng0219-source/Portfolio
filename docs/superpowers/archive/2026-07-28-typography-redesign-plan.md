> **已归档（2026-08-14）**：本计划方向已被 `DESIGN.md` v3（2026-08-14 参考站机制对齐改版）取代，未执行项不再单独推进。参见 `docs/superpowers/plans/2026-08-14-reference-alignment-redesign.md`。

# Typography & Editorial Layout Redesign 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 通过引入 `Inter` 字体，调整字距（Tracking）与字号比例，实现具有强烈对比和张力的 Dark Editorial 排版风格。

**架构：** 在 `index.html` 中引入 Google Fonts，修改 `variables.css` 更新字体族和字号变量，并在 `global.css` 中针对特定的标题和标签类应用极端的 `letter-spacing` 和 `line-height`。

**技术栈：** HTML, CSS

---

### 任务 1：引入强力字体 (Inter)

**文件：**
- 修改：`index.html`

- [ ] **步骤 1：在 `index.html` 的 `<head>` 中添加 Google Fonts 链接**

```html
<!-- 在 index.html 的 <head> 中插入以下代码 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap" rel="stylesheet">
```

- [ ] **步骤 2：Commit**

```bash
git add index.html
git commit -m "chore: add Inter font from Google Fonts"
```

---

### 任务 2：更新 CSS 变量 (字体族与字号)

**文件：**
- 修改：`src/styles/variables.css`

- [ ] **步骤 1：修改 `variables.css` 中的 Typography 和 Text scale 变量**

```css
/* 修改 src/styles/variables.css 中的对应部分 */

  /* ── Typography ── */
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --font-mono:    'DM Mono', monospace;

  /* ── Text scale ── */
  /* 放大 Hero 和 H1，拉大反差 */
  --text-hero: clamp(4.5rem, 10vw, 9rem);
  --text-h1:   clamp(2.8rem, 5vw, 4.8rem);
  --text-h2:   clamp(1.5rem, 2.5vw, 2.2rem);
  --text-body: 1.1rem;
  --text-small: 0.85rem;
```

- [ ] **步骤 2：Commit**

```bash
git add src/styles/variables.css
git commit -m "style: update typography variables for extreme scale contrast"
```

---

### 任务 3：应用极端的排版对比 (字距与行高)

**文件：**
- 修改：`src/styles/global.css`

- [ ] **步骤 1：修改 `global.css` 中的基础行高和标题/标签字距**

```css
/* 修改 src/styles/global.css */

/* 1. 基础正文调整：增加行高，降低字重视觉感 */
body {
  /* 保持原有背景和颜色等属性 */
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.8; /* 增大行高 */
  font-weight: 400;
  letter-spacing: -0.01em; /* 正文微收 */
  /* ...其余保持不变 */
}

/* 2. 标签/辅助文本 (Kicker / Eyebrow / Tags)：极度松散，全大写 */
.section-kicker,
.eyebrow-label,
.portfolio-stage-kicker,
.portfolio-card-tag,
.about-stage-kicker,
.about-stage-card-label,
.experience-stage-kicker,
.experience-stage-card-period,
.experience-stage-card-tag,
.contact-stage-kicker-new,
.contact-method-label,
.contact-stage-link-label {
  font-weight: 600;
  letter-spacing: 0.25em; /* 极端松散 */
  text-transform: uppercase;
}

/* 3. 大标题 (Headings)：极度紧凑，行高收紧 */
.section-title,
.portfolio-stage-title,
.portfolio-card-title,
.about-stage-title,
.about-stage-card-title,
.experience-stage-title,
.experience-stage-card-title,
.contact-stage-title-new,
.contact-method-value,
.contact-stage-link-value {
  font-weight: 800; /* 或 900，如果有的话 */
  line-height: 1.0; /* 行高压紧 */
  letter-spacing: -0.05em; /* 极端紧凑 */
}

/* 可选：特定超大标题行高更紧 */
.portfolio-card-metric-value {
  letter-spacing: -0.05em;
}
```
*(注意：在实际应用时，使用 SearchReplace 工具查找上述类名并修改其 `letter-spacing` 和 `line-height`。)*

- [ ] **步骤 2：运行并验证排版效果**

运行 `npm run dev`，检查浏览器中的字体是否成功切换为 `Inter`，以及标题是否足够紧凑、标签是否足够松散。

- [ ] **步骤 3：Commit**

```bash
git add src/styles/global.css
git commit -m "style: apply extreme kerning and tracking for editorial look"
```
