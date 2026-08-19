# Experience Section Editorial Redesign 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 彻底重构 Experience 组件，采用 1:3 极端的非对称网格和顶线贯穿分割，打造高级杂志编辑风。

**架构：** 修改 `Experience/index.jsx` 移除冗余的内部包裹节点，精简输出结构；修改 `global.css` 重写 `.experience-stage-card-shell` 的 Grid 布局，强制左侧定宽、顶线对齐。

**技术栈：** React, CSS Modules

---

### 任务 1：重写 Experience CSS 布局

**文件：**
- 修改：`src/styles/global.css`

- [ ] **步骤 1：在 `global.css` 中重定义 `.experience-stage-card-shell` 和相关类**

```css
/* 修改 src/styles/global.css 中 Experience 相关样式 */

/* 重构网格：左侧极小定宽，右侧自适应 */
.experience-stage-card-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 140px 1fr; /* 左侧年份固定小宽度，制造留白 */
  gap: clamp(2rem, 5vw, 4rem); /* 调整间距 */
  align-items: start; /* 必须顶线对齐 */
  min-height: auto;
  padding: 3.5rem 0; /* 增加上下呼吸空间 */
}

/* 左侧栏包裹 */
.experience-stage-card-topline {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  margin-bottom: 0;
}

/* 隐藏不必要的序号和标签，只留年份 */
.experience-stage-card-index,
.experience-stage-card-tag {
  display: none;
}

/* 左侧年份样式强化 */
.experience-stage-card-period {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-align: left;
}

/* 右侧内容包裹 */
.experience-stage-card-copy {
  display: grid;
  gap: 1.25rem; /* 增大标题与正文间距 */
  padding-top: 0;
}

/* 右侧大标题（公司+职位） */
.experience-stage-card-title {
  max-width: 24ch; /* 稍微放宽一点 */
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem); /* 放大标题，形成反差 */
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.05em;
  color: var(--color-text-primary);
}

/* 右侧正文 */
.experience-stage-card-body {
  max-width: 36rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.8;
}

/* 响应式：手机端变单列 */
@media (max-width: 768px) {
  .experience-stage-card-shell {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2.5rem 0;
  }
}
```

- [ ] **步骤 2：Commit**

```bash
git add src/styles/global.css
git commit -m "style: rebuild Experience grid to 1:3 asymmetric layout"
```

---

### 任务 2：精简 Experience JSX 结构

**文件：**
- 修改：`src/components/Experience/index.jsx`

- [ ] **步骤 1：简化 `Experience/index.jsx` 的渲染输出**

为了迎合上述 CSS，我们将合并原本拆分的 `title` 和 `tag`（职位和公司），统一放到右侧大标题中。左边只留年份。

```jsx
// 检查 src/components/Experience/index.jsx 中的 ExperienceCard 渲染部分
// 将其修改为：

        <div className="experience-stage-card-shell">
          {/* 左侧：仅保留年份 */}
          <div className="experience-stage-card-topline">
            <span className="experience-stage-card-period">{card.period}</span>
          </div>

          {/* 右侧：合并职位和公司作为大标题，下面跟描述 */}
          <div className="experience-stage-card-copy">
            <h3 className="experience-stage-card-title">
              {card.title}
              {card.tag && <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}> at {card.tag}</span>}
            </h3>
            <p className="experience-stage-card-body">{card.body}</p>
          </div>
        </div>
```
*注：具体实现时需查看该组件中如何传入 `card.title` 和 `card.tag`，通常 `title` 是职位，`tag` 是公司名。*

- [ ] **步骤 2：运行并验证排版效果**

运行 `npm run dev`，检查浏览器中的 Experience 区域：
- 是否去掉了所有卡片背景？
- 是否形成了左边只有极小的年份，右边是巨大的“职位 at 公司”标题及描述的不对称布局？
- 上下是否有细线贯穿分割？

- [ ] **步骤 3：Commit**

```bash
git add src/components/Experience/index.jsx
git commit -m "refactor: simplify Experience DOM structure for editorial layout"
```
