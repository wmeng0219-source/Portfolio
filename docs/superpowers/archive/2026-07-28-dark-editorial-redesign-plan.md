> **已归档（2026-08-14）**：本计划方向已被 `DESIGN.md` v3（2026-08-14 参考站机制对齐改版）取代，未执行项不再单独推进。参见 `docs/superpowers/plans/2026-08-14-reference-alignment-redesign.md`。

# Dark Editorial Style Redesign 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将深色科技风的卡片式布局重构为基于大留白、去卡片化和紫灰/淡紫罗兰色系的 Dark Editorial 高级编辑风。

**架构：** 修改全局 CSS 变量重定义色彩基调；逐个清理 `Portfolio`, `Experience`, `Contact` 组件的冗余容器与卡片样式，转为依靠排版层级和隐形边框进行内容组织。

**技术栈：** React, CSS Modules

---

### 任务 1：更新全局色彩与排版变量

**文件：**
- 修改：`src/styles/variables.css`
- 修改：`src/styles/global.css`

- [ ] **步骤 1：修改 `variables.css` 中的核心色板**

```css
/* 修改 src/styles/variables.css 中的色板部分 */
:root {
  /* ── Core palette (Dark Editorial) ── */
  --color-bg-primary:    #0d0c11;
  --color-bg-secondary:  #16151c;
  --color-bg-elevated:   #1f1d26;
  --color-text-primary:  #ece9f1;
  --color-text-secondary: #a39fb0;
  --color-text-muted:    #75717f;
  --color-text-faint:    rgba(236, 233, 241, 0.25);
  
  /* Accent (淡紫罗兰) */
  --color-accent:        #d0bcff;
  --color-accent-dim:    rgba(208, 188, 255, 0.18);
  --color-accent-soft:   rgba(208, 188, 255, 0.08);
  --color-accent-dark:   #b89df5;
  
  /* Borders (极暗紫灰) */
  --color-border:        #2a2833;
  --color-border-strong: #3b3846;
  --color-border-accent: rgba(208, 188, 255, 0.35);
  --color-glass:         rgba(13, 12, 17, 0.75);

  /* 移除 Light section 相关变量，统一使用深色 */
  --surface-warm:    rgba(22, 21, 28, 0.5);
  --surface-neutral: rgba(31, 29, 38, 0.5);
  
  /* 调整排版变量以增加呼吸感 */
  /* 保留字体族定义，修改字号或行高相关的设定如果需要，这里保持不变，在 global.css 中调整 */
}
```
*注：其余未提及的变量（如字体、间距等）保持不变。*

- [ ] **步骤 2：调整 `global.css` 移除高亮光效与渐变底**

```css
/* 修改 src/styles/global.css 中的部分样式 */
/* 去除 page-section-dark 的强渐变，改用更平缓的过渡 */
.page-section-dark {
  background: var(--color-bg-primary);
}

/* 调整 section-title 和 section-copy 的颜色使用新变量 */
/* 确保 contact-stage-section 的背景干净 */
.contact-stage-section {
  padding-top: var(--section-pad-y);
  padding-bottom: calc(var(--section-pad-y) + 2rem);
  background: var(--color-bg-primary);
  border-top: 1px solid var(--color-border);
}

/* 将 primary-link 的文字颜色调暗以适应亮色背景的按钮，或者调整按钮样式 */
.primary-link {
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  box-shadow: none; /* 移除强发光 */
}

/* 移除原有的 grain-overlay 干扰（可选，若需要极致干净） */
.grain-overlay {
  opacity: 0.08; /* 降低噪点强度 */
}
```

- [ ] **步骤 3：验证应用在首页**

运行 `npm run dev` 确保项目编译通过且首页背景变为深紫黑色。

- [ ] **步骤 4：Commit**

```bash
git add src/styles/variables.css src/styles/global.css
git commit -m "style: update global color palette to dark editorial style"
```

---

### 任务 2：重构 Portfolio 组件去卡片化

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css` (包含 portfolio 的类)

- [ ] **步骤 1：清理 `global.css` 中 Portfolio 的卡片样式**

```css
/* 在 src/styles/global.css 中找到 Portfolio stage 部分并替换 */
.portfolio-stage-section {
  padding-top: calc(var(--section-pad-y) + 1.5rem);
  background: var(--color-bg-primary);
}

.portfolio-feature-card,
.portfolio-side-card {
  position: relative;
  overflow: hidden;
  border: none; /* 移除全包围边框 */
  border-top: 1px solid var(--color-border); /* 仅保留上边框 */
  border-radius: 0; /* 移除圆角 */
  background: transparent; /* 移除渐变底色 */
  box-shadow: none; /* 移除阴影 */
  transition: transform 0.3s ease, border-color 0.3s ease;
}

/* 移除卡片光泽 */
.portfolio-card-sheen {
  display: none;
}

.portfolio-card-shell {
  padding: 2.5rem 0; /* 移除左右内边距，靠齐容器 */
}

/* 调整标题悬浮态 */
.portfolio-link:hover {
  transform: translateY(-2px); /* 极弱的位移 */
  border-color: var(--color-border-strong);
  box-shadow: none;
}

.portfolio-link:hover .portfolio-card-title {
  color: var(--color-accent);
}

.portfolio-link:hover .portfolio-card-action-icon {
  transform: translateX(4px); /* 改为水平箭头平移，移除圆圈背景变色 */
  background: transparent;
  border-color: transparent;
  color: var(--color-accent);
}

.portfolio-card-action-icon {
  border: none; /* 移除图标边框 */
}
```

- [ ] **步骤 2：简化 `src/components/Portfolio/index.jsx` 的 DOM**

由于我们在 CSS 中使用了 `display: none` 隐藏了发光层，且去除了卡片底色，JSX 结构本身如果只是用 `div` 包装的话无需大改。但为了代码整洁，移除不必要的伪元素节点（如果有）和追踪鼠标的 `onMouseMove` 逻辑（发光效果）。

```jsx
// src/components/Portfolio/index.jsx 中
// 移除 handleMouseMove 相关的发光追踪逻辑
// 将 
// <div className="portfolio-card-sheen" style={{ '--gx': `${mousePos.x}%`, '--gy': `${mousePos.y}%` }} />
// 删除或保留空标签（CSS已隐藏）。为了干净，建议直接从 JSX 中删除。

// 示例修改（针对每个 ProjectCard）：
// const ProjectCard = ({ project, isFeatured }) => {
//   ...
//   return (
//     <Link to={...} className={`portfolio-link ${cardClass}`}>
//        <div className="portfolio-card-shell">
//           {/* 移除 sheen div */}
//           <div className="portfolio-card-topline">...</div>
//           <div className="portfolio-card-copy">...</div>
//           <div className="portfolio-card-bottom">...</div>
//        </div>
//     </Link>
//   )
// }
```
*(通过查看 `src/components/Portfolio/index.jsx` 实际内容并修改，移除 `onMouseMove` 和 `sheen` div)*

- [ ] **步骤 3：验证 Portfolio 样式**

运行应用，鼠标悬停项目时，标题应变紫，无卡片边框和强光晕。

- [ ] **步骤 4：Commit**

```bash
git add src/components/Portfolio/index.jsx src/styles/global.css
git commit -m "refactor: decardify Portfolio section to editorial list"
```

---

### 任务 3：重构 Experience 组件为深色时间线

**文件：**
- 修改：`src/styles/global.css` (包含 experience 的类)

- [ ] **步骤 1：清理 `global.css` 中 Experience 的亮色卡片**

```css
/* 在 src/styles/global.css 中找到 Experience stage 部分并替换 */
.experience-stage-section {
  padding-top: var(--section-pad-y);
  padding-bottom: var(--section-pad-y);
  background: var(--color-bg-primary); /* 改为深色背景 */
  color: var(--color-text-primary);
}

.experience-stage-title {
  color: var(--color-text-primary); /* 使用主文本色 */
}

.experience-stage-intro,
.experience-stage-card-body {
  color: var(--color-text-muted); /* 使用次级暗文本 */
}

.experience-stage-card {
  position: relative;
  overflow: visible;
  border: none;
  border-top: 1px solid var(--color-border); /* 仅顶边框 */
  border-radius: 0;
  background: transparent; /* 移除亮色底 */
  box-shadow: none;
  min-height: auto;
  color: var(--color-text-primary);
  grid-column: 1 / -1 !important; /* 强制所有项目占满整行，不再做网格拼接 */
}

/* 移除光晕 */
.experience-stage-card::before {
  display: none;
}

.experience-stage-card-shell {
  padding: 2rem 0; /* 移除左右内边距 */
  display: grid;
  grid-template-columns: 200px 1fr; /* 左侧年份，右侧内容 */
  gap: 2rem;
  align-items: start;
}

.experience-stage-card-topline {
  flex-direction: column;
  margin-bottom: 0;
  gap: 0.5rem;
}

.experience-stage-card-index {
  display: none; /* 隐藏原本的大数字 01, 02 */
}

.experience-stage-card-period {
  color: var(--color-text-secondary);
  text-align: left; /* 年份靠左 */
}

.experience-stage-card-tag {
  color: var(--color-accent); /* 公司名称用强调色 */
}

.experience-stage-card-copy {
  padding-top: 0; /* 移除顶部多余边距 */
  display: grid;
  gap: 0.5rem;
}

.experience-stage-card-title {
  color: var(--color-text-primary);
  font-size: clamp(1.4rem, 2vw, 2rem); /* 缩小标题 */
}

/* 响应式调整 */
@media (max-width: 640px) {
  .experience-stage-card-shell {
    grid-template-columns: 1fr; /* 手机端单列排布 */
    gap: 1rem;
  }
}
```

- [ ] **步骤 2：验证 Experience 样式**

运行应用，确认经历区域变为深色底的列表，左侧为时间/公司，右侧为职位和详情。

- [ ] **步骤 3：Commit**

```bash
git add src/styles/global.css
git commit -m "refactor: redesign Experience section to dark timeline"
```

---

### 任务 4：重构 Contact 组件极简链接

**文件：**
- 修改：`src/styles/global.css` (包含 contact 的类)

- [ ] **步骤 1：清理 Contact 的卡片样式**

```css
/* 在 src/styles/global.css 中找到 Contact stage 部分 */
.contact-stage-link {
  border: none; /* 移除边框 */
  border-radius: 0;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border); /* 底部细线 */
  background: transparent;
}

a.contact-stage-link:hover {
  background: transparent;
  border-color: var(--color-border-strong);
}

a.contact-stage-link:hover::after {
  display: none; /* 移除底部延伸线特效 */
}

.contact-stage-link-value {
  font-size: clamp(1.5rem, 2.5vw, 2.5rem); /* 放大字体，形成气场 */
  font-weight: 500;
  letter-spacing: -0.02em;
}

/* 方法区块统一极简 */
.contact-method-block {
  border-top: 1px solid var(--color-border);
}

.contact-method-value {
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
}
```

- [ ] **步骤 2：验证 Contact 样式**

运行应用，确认联系区域没有容器边框，以超大文本链接为主。

- [ ] **步骤 3：Commit**

```bash
git add src/styles/global.css
git commit -m "refactor: simplify Contact section links"
```
