# Hero 与 Portfolio 对齐 `new` 样式实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 让 `old` 首页中的 `Hero + Portfolio` 在视觉、布局与动效气质上尽量对齐 `PortfolioDesign-new`，同时保留 `old` 的内容来源、路由和 GSAP 体系。

**架构：** `Hero` 保留 locale 驱动和现有锚点行为，但重组 DOM 与 CSS 结构，使其更接近 `new` 的单重心首屏。`Portfolio` 放弃当前 `1 主 2 次` 结构，改为由本地卡片映射驱动的 3 卡并列布局，并用现有 locale 与 `projects.js` 提供卡片内容。动效继续由 GSAP 负责，不引入新库。

**技术栈：** React、CSS Modules、全局 CSS、GSAP、Vitest、React Testing Library

---

## 文件结构

### 修改文件

- `old/src/components/Hero/index.jsx`：重组 `Hero` DOM，保留 locale、锚点和 GSAP 生命周期。
- `old/src/components/Hero/Hero.module.css`：重写 `Hero` 样式，使其靠近 `new` 的首屏节奏。
- `old/src/components/Portfolio/index.jsx`：改为 3 卡并列结构，并增加本地卡片映射。
- `old/src/styles/global.css`：重写 `Portfolio` 相关全局类。
- `old/src/components/Hero/index.test.jsx`：更新 `Hero` 断言以匹配新的结构。

### 保持不变

- `old/src/data/projects.js`：继续作为事实来源。
- `old/src/locales/zh.json`
- `old/src/locales/en.json`
- `old/src/pages/ProjectDetail/**`

---

### 任务 1：重构 Hero 结构与样式

### 任务 2：重构 Portfolio 为 3 卡并列布局

### 任务 3：更新测试并运行验证
