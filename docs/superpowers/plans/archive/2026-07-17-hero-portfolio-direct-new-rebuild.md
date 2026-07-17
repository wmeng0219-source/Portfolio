# Hero 与 Portfolio 直接按 new 骨架重建实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 删除当前过渡版中不属于 `new` 的自拟视觉效果，在 `old` 中按 `PortfolioDesign-new` 的真实骨架重建 `Hero + Portfolio`。

**架构：** `Hero` 保留 `old` 的 locale 与锚点，但 DOM、数值比例、装饰层和滚动信息条直接向 `new` 靠齐。`Portfolio` 放弃当前 scene 列与自定义剧场结构，改为 `new` 的“左侧扫描装置 + 标题区 + 3 卡等语法”布局；卡片 tilt、spotlight、hover 与 CTA 用 GSAP/CSS 逼近 `new` 的交互结果。

**技术栈：** React、CSS Modules、全局 CSS、GSAP、Vitest、React Testing Library

---

### 任务 1：按 new 骨架重写 Hero

### 任务 2：按 new 骨架重写 Portfolio

### 任务 3：更新测试并运行 `npm test` 与 `npm run build`
