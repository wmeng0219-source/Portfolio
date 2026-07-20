# 首页与 PACS 详情页编辑式展陈改版实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页重构为内容优先、轻展陈感的编辑式作品集，并将 `PACS` 详情页从特效驱动改为可读性优先的案例阅读页。

**架构：** 首页继续使用已有的 React 组件结构，但将 `Hero`、`Portfolio`、`About`、`Experience`、`Contact` 的表达层重写为统一的编辑式版式，并同步收口 `useHomepageMotion()` 的动效策略。`PACS` 详情页保留 React + CSS Modules 结构，但移除大段滚动装置式布局，改为顺序化章节叙事和轻量入场动效。

**技术栈：** React 18、Vite 5、React Router、GSAP、Vitest、Testing Library、CSS Variables、全局样式 + CSS Modules

---

## 文件结构

### 需要修改
- `src/components/Hero/index.jsx`
  - 首页 Hero 结构与装饰图形语义
- `src/components/Hero/Hero.module.css`
  - Hero 排版、右侧构成图形、CTA 与微动效样式
- `src/components/Portfolio/index.jsx`
  - 精选案例条目结构，从“大主卡 + 侧堆栈”改成均衡编辑式案例编排
- `src/components/About/index.jsx`
  - Method 区块的章节结构和英文标签位置
- `src/components/Experience/index.jsx`
  - Path 区块从卡片改为编年展签结构
- `src/components/Contact/index.jsx`
  - Contact 区块信息层级与文案容器结构
- `src/styles/global.css`
  - 首页 4 个内容区块的全局样式重写与响应式收口
- `src/motion/useHomepageMotion.js`
  - 首页动效从舞台化段落进入改为微动效，减少 hover 误导
- `src/pages/ProjectDetail/PacsCase.jsx`
  - PACS 详情页章节结构、图文顺序和轻量数据呈现
- `src/pages/ProjectDetail/PacsCase.module.css`
  - PACS 详情页从强滚动结构改为可读章节排版
- `src/App.test.jsx`
  - 首页结构回归测试，校验关键区块语义与主要阅读点
- `src/pages/ProjectDetail/index.test.jsx`
  - PACS 详情页回归测试，校验结构、图片尺寸和弱化后的可读布局

### 用于验证但不一定修改
- `src/pages/Home/index.jsx`
  - 确认首页区块顺序不变
- `src/data/projects.js`
  - 仅在 PACS 文案或图片区块结构需要时调整，不主动扩展内容

---

### 任务 1：为首页与 PACS 改版补失败测试

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/pages/ProjectDetail/index.test.jsx`

- [ ] **步骤 1：编写首页失败测试**

```jsx
test('homepage path section renders timeline-style content without clickable card affordance text', () => {
  renderApp();

  const pathHeading = screen.getByRole('heading', { level: 2, name: '从设计执行到系统判断' });
  const pathSection = pathHeading.closest('section');

  expect(pathSection).toBeInTheDocument();
  expect(within(pathSection).getByText('2019 - 2020')).toBeInTheDocument();
  expect(within(pathSection).getByText('2023.04 - 至今')).toBeInTheDocument();
  expect(within(pathSection).queryByRole('link')).not.toBeInTheDocument();
});

test('homepage contact section prioritizes email as a prominent contact method', () => {
  renderApp();

  const contactHeading = screen.getByRole('heading', { level: 2, name: /联系我|推进复杂产品/i });
  const contactSection = contactHeading.closest('section');
  const emailLink = within(contactSection).getByRole('link', { name: /wmeng0219@gmail.com/i });

  expect(emailLink).toBeInTheDocument();
  expect(within(contactSection).getByText(/wechat|phone/i)).toBeInTheDocument();
});
```

- [ ] **步骤 2：编写 PACS 详情页失败测试**

```jsx
test('pacs detail renders sequential reading sections instead of pinned stack-only labels', () => {
  renderProjectDetail('/project/pacs-ai');

  expect(screen.getByText(/项目背景与挑战/)).toBeInTheDocument();
  expect(screen.getByText(/迭代路径/)).toBeInTheDocument();
  expect(screen.getByText(/关键方案/)).toBeInTheDocument();
  expect(screen.getByText(/关键设计判断/)).toBeInTheDocument();
});

test('pacs detail hero image and flow images keep explicit dimensions', () => {
  renderProjectDetail('/project/pacs-ai');

  expect(screen.getByRole('img', { name: 'PACS AI UI' })).toHaveAttribute('width');
  expect(screen.getByRole('img', { name: 'PACS AI UI' })).toHaveAttribute('height');
  expect(screen.getByRole('img', { name: '读片状态与病历同步' })).toHaveAttribute('width');
  expect(screen.getByRole('img', { name: '读片状态与病历同步' })).toHaveAttribute('height');
});
```

- [ ] **步骤 3：运行测试验证失败**

运行：`npm test -- src/App.test.jsx src/pages/ProjectDetail/index.test.jsx`

预期：FAIL，首页与 PACS 结构断言至少有 1-2 条失败，原因是当前实现仍是旧版大卡片、强装置或旧文案层级。

- [ ] **步骤 4：保留最小测试修正能力，不修改产品代码**

```jsx
// 若失败原因是查询方式与新语义不匹配，可仅修正断言入口
const contactSection = screen.getByRole('heading', { level: 2, name: /联系/i }).closest('section');
```

- [ ] **步骤 5：再次运行测试，确认仍因功能未实现而失败**

运行：`npm test -- src/App.test.jsx src/pages/ProjectDetail/index.test.jsx`

预期：FAIL，但失败原因应指向实际结构未完成，而不是测试桩错误。

- [ ] **步骤 6：Commit**

```bash
git add src/App.test.jsx src/pages/ProjectDetail/index.test.jsx
git commit -m "test: add regression coverage for homepage and pacs redesign"
```

---

### 任务 2：重构 Hero 为轻展陈的系统碎片构图

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：为 Hero 右侧装饰引入新的语义容器**

```jsx
<div className={styles.visualStage} ref={visualStageRef} aria-hidden="true">
  <div className={styles.visualInner}>
    <div className={styles.diagramFrame}>
      <div className={styles.diagramPlanePrimary} />
      <div className={styles.diagramPlaneSecondary} />
      <div className={styles.diagramTrackA} />
      <div className={styles.diagramTrackB} />
      <span className={styles.diagramNode} />
      <span className={styles.diagramNodeAlt} />
      <span className={styles.diagramLabel}>FLOW</span>
      <span className={styles.diagramLabelAlt}>RULES</span>
    </div>
  </div>
</div>
```

- [ ] **步骤 2：删除中心球体与轨道核心实现**

```jsx
// 删除以下旧结构
<div className={styles.orbitalField}>
  <div className={styles.orbitalHalo} />
  <div className={styles.orbitalRingOuter} />
  <div className={styles.orbitalRingInner} />
  <div className={styles.orbitalTickOrbit}>
    <div className={styles.orbitalTick} />
  </div>
  <div className={styles.orbitalCore} />
</div>
```

- [ ] **步骤 3：将鼠标响应改为弱平移，而不是 3D 翻转**

```jsx
const visualInnerStyle = {
  transform: `translate3d(${(mouse.x - 0.5) * -10}px, ${(mouse.y - 0.5) * -8}px, 0)`,
};
```

- [ ] **步骤 4：为新 Hero 写最少样式**

```css
.diagramFrame {
  position: relative;
  width: 100%;
  height: 100%;
}

.diagramPlanePrimary,
.diagramPlaneSecondary {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
}

.diagramTrackA,
.diagramTrackB {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(168, 138, 223, 0.32), transparent);
}
```

- [ ] **步骤 5：保留极慢漂移，删除强装置动画**

```js
if (visualStageRef.current && !reduceMotion) {
  gsap.to(visualStageRef.current, {
    y: -10,
    duration: 5.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}
```

- [ ] **步骤 6：运行测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，首页仍可渲染，Hero 改动未破坏现有主流程。

- [ ] **步骤 7：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/App.test.jsx
git commit -m "feat: redesign homepage hero into editorial exhibition layout"
```

---

### 任务 3：将精选案例、Method、Path、Contact 收口为统一编辑式版式

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/About/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：将精选案例改为均衡的三列编辑式条目**

```jsx
<div className="portfolio-stage-grid" data-motion-group="portfolio-stage">
  {cards.map((card, index) => (
    <Link
      key={card.key}
      to={card.href}
      className={`portfolio-entry portfolio-entry-${index + 1}`}
      data-motion-item
      data-motion-hover="card"
    >
      <div className="portfolio-entry-meta">
        <span className="portfolio-entry-id">{card.id}</span>
        <span className="portfolio-entry-label">{card.label}</span>
      </div>
      <h3 className="portfolio-entry-title">{card.title}</h3>
      <p className="portfolio-entry-result">{card.metricLabel}</p>
      <div className="portfolio-entry-footer">
        <span>{card.metric}</span>
        <span>VIEW CASE ↗</span>
      </div>
    </Link>
  ))}
</div>
```

- [ ] **步骤 2：将 Method 改为三段方法声明，而非卡片**

```jsx
<div className="about-stage-list" data-motion-group="about-stage-list">
  {items.map((item) => (
    <article className="about-stage-row" key={item} data-motion-item>
      <p className="about-stage-row-label">{t(`about.stage.card.${item}.label`)}</p>
      <div className="about-stage-row-main">
        <h3 className="about-stage-row-title">{t(`about.stage.card.${item}.title`)}</h3>
        <p className="about-stage-row-body">{t(`about.stage.card.${item}.body`)}</p>
      </div>
    </article>
  ))}
</div>
```

- [ ] **步骤 3：将 Path 改为纵向编年展签**

```jsx
<div className="experience-timeline" data-motion-group="experience-timeline">
  {items.map((item) => (
    <article className="experience-timeline-row" key={item} data-motion-item>
      <div className="experience-timeline-meta">
        <p className="experience-timeline-index">0{item}</p>
        <p className="experience-timeline-period">{t(`experience.item.${item}.period`)}</p>
      </div>
      <div className="experience-timeline-content">
        <p className="experience-timeline-tag">{t(`experience.stage.item.${item}.short`)}</p>
        <h3 className="experience-timeline-title">{t(`experience.item.${item}.title`)}</h3>
        <p className="experience-timeline-body">{t(`experience.item.${item}.body`)}</p>
      </div>
    </article>
  ))}
</div>
```

- [ ] **步骤 4：将 Contact 改为短结尾 + 联系信息主导**

```jsx
<div className="contact-stage-grid" data-motion-item>
  <div className="contact-stage-headline">
    <p className="contact-stage-kicker-new">04 / Contact</p>
    <h2 className="contact-stage-title-new">{t('contact.stage.title')}</h2>
    <p className="contact-stage-role">{t('hero.stage.kicker')}</p>
  </div>
  <div className="contact-stage-right">
    <p className="contact-stage-intro-new">{t('contact.stage.body')}</p>
    <div className="contact-stage-methods">...</div>
  </div>
</div>
```

- [ ] **步骤 5：用最少样式替换旧卡片化布局**

```css
.portfolio-stage-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr 0.95fr;
  gap: 1.5rem;
}

.experience-timeline-row {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid var(--color-light-border);
}

.about-stage-row {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid var(--color-border);
}
```

- [ ] **步骤 6：删除误导性样式**

```css
/* 删除或禁用 */
.experience-stage-card,
.portfolio-feature-card,
.portfolio-side-card {
  box-shadow: none;
}

.experience-stage-card::before,
.portfolio-card-sheen,
.portfolio-card-grid {
  display: none;
}
```

- [ ] **步骤 7：运行测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，首页关键区块仍可被测试识别，且 Path 与 Contact 新结构满足断言。

- [ ] **步骤 8：Commit**

```bash
git add src/components/Portfolio/index.jsx src/components/About/index.jsx src/components/Experience/index.jsx src/components/Contact/index.jsx src/styles/global.css src/App.test.jsx
git commit -m "feat: redesign homepage sections into editorial exhibition layout"
```

---

### 任务 4：收口首页动效为微动效，并移除误导 hover

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.js`
- 修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：降低 section enter 动效幅度**

```js
const fromVars = reduceMotion
  ? { autoAlpha: 0 }
  : { y: isPortfolioSection ? 28 : 20, autoAlpha: 0 };

const toVars = {
  y: 0,
  autoAlpha: 1,
  duration: reduceMotion ? 0.01 : 0.62,
  stagger: reduceMotion ? 0 : 0.06,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: section,
    start: 'top 88%',
    once: true,
  },
};
```

- [ ] **步骤 2：删掉不再适用的舞台化逻辑**

```js
// 删除大数字视差逻辑
// const bigNumbers = Array.from(root.querySelectorAll('.about-number'));
// ...
```

- [ ] **步骤 3：只给真实可点击元素保留 hover 动效**

```js
const hoverTargets = Array.from(root.querySelectorAll('a[data-motion-hover], button[data-motion-hover]'));
```

- [ ] **步骤 4：将 hover 位移缩小**

```js
const enter = () => {
  gsap.to(node, {
    y: -2,
    scale: node.dataset.motionHover === 'button' ? 1.01 : 1.005,
    duration: 0.18,
    ease: 'power2.out',
    overwrite: 'auto',
  });
};
```

- [ ] **步骤 5：为 reduce motion 明确兜底**

```js
if (reduceMotion) {
  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
```

- [ ] **步骤 6：运行测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，动效收口不影响结构测试。

- [ ] **步骤 7：Commit**

```bash
git add src/motion/useHomepageMotion.js src/styles/global.css src/App.test.jsx
git commit -m "refactor: reduce homepage motion to subtle editorial transitions"
```

---

### 任务 5：将 PACS 详情页从特效驱动改为顺序化案例阅读页

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/pages/ProjectDetail/PacsCase.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/pages/ProjectDetail/PacsCase.module.css`
- 修改：`/Users/wen/Desktop/Portfolio/src/pages/ProjectDetail/index.test.jsx`

- [ ] **步骤 1：保留 Hero 基础信息，弱化浮层与舞台感**

```jsx
<section className={styles.hero}>
  <div className={styles.heroIntro}>
    <p className={styles.kicker}><span className={styles.kickerIndex}>03</span> / PACS &amp; AI</p>
    <h1 className={styles.title}>{t(project.title)}</h1>
    <p className={styles.tag}>{t(project.tag)}</p>
    <p className={styles.heroSummary}>{t(project.background)}</p>
  </div>
  <figure className={styles.heroVisual}>
    <img src={withBasePath('Portfolio/images/pacs/generated/pacs_hero_1784477678972.jpg')} alt="PACS AI UI" width="1600" height="900" />
    <figcaption className={styles.heroMetricCaption}>{language === 'zh' ? '平均每张小牙片龋齿发现数 +142%' : 'Average cavities per x-ray +142%'}</figcaption>
  </figure>
</section>
```

- [ ] **步骤 2：将横向滚动迭代路径改为顺序章节**

```jsx
<section className={styles.section}>
  <p className={styles.kicker}>{language === 'zh' ? '迭代路径' : 'Iterations'}</p>
  <div className={styles.iterationList}>
    {project.process.map((iter) => (
      <article key={iter.version} className={styles.iterationRow}>
        <div className={styles.iterationMeta}>
          <span className={styles.iterationBadge}>{iter.version}</span>
          <span className={styles.iterationLabel}>{t(iter.label)}</span>
        </div>
        <div className={styles.iterationBody}>
          <h3 className={styles.iterationTitle}>{t(iter.title)}</h3>
          <p className={styles.bodyText}>{t(iter.desc)}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **步骤 3：将关键方案从强视觉 bento 改为图文段**

```jsx
<section className={styles.section}>
  <p className={styles.kicker}>{language === 'zh' ? '关键方案' : 'Key Solutions'}</p>
  <div className={styles.solutionList}>
    {project.solution.map((sol, i) => (
      <article key={i} className={styles.solutionRow}>
        <img src={bentoImages[i % bentoImages.length]} alt={t(sol.title)} width="1024" height="768" className={styles.solutionImage} />
        <div className={styles.solutionCopy}>
          <span className={styles.solutionIndex}>0{i + 1}</span>
          <h3 className={styles.solutionTitle}>{t(sol.title)}</h3>
          <p className={styles.bodyText}>{t(sol.desc)}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **步骤 4：将设计判断改为顺序化决策块**

```jsx
<section className={styles.section}>
  <p className={styles.sectionKicker}>{language === 'zh' ? '关键设计判断' : 'Key Design Decisions'}</p>
  <div className={styles.decisionList}>
    {project.decisions.map((d, i) => (
      <article key={i} className={styles.decisionRow}>
        <span className={styles.decisionIndex}>0{i + 1}</span>
        <div className={styles.decisionMain}>
          <h3 className={styles.decisionQuestion}>{t(d.question)}</h3>
          <p className={styles.decisionAnswerText}>{t(d.choice)}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **步骤 5：删除不再需要的 ScrollTrigger 结构**

```js
// 删除
const panWrapRef = useRef(null);
const panTrackRef = useRef(null);
const stackWrapRef = useRef(null);

useEffect(() => {
  return undefined;
}, []);
```

- [ ] **步骤 6：写入最少可读样式**

```css
.iterationList,
.decisionList,
.solutionList {
  display: grid;
  gap: 1.5rem;
}

.iterationRow,
.decisionRow {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.solutionRow {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 1.5rem;
}
```

- [ ] **步骤 7：运行测试验证通过**

运行：`npm test -- src/pages/ProjectDetail/index.test.jsx`

预期：PASS，PACS 详情页的新阅读结构与图片尺寸断言全部通过。

- [ ] **步骤 8：Commit**

```bash
git add src/pages/ProjectDetail/PacsCase.jsx src/pages/ProjectDetail/PacsCase.module.css src/pages/ProjectDetail/index.test.jsx
git commit -m "feat: redesign pacs detail into editorial case reading flow"
```

---

### 任务 6：全量验证与人工页面检查

**文件：**
- 修改：无
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`
- 测试：`/Users/wen/Desktop/Portfolio/src/pages/ProjectDetail/index.test.jsx`

- [ ] **步骤 1：运行单元与集成测试**

运行：`npm test`

预期：PASS，所有测试文件通过，无新的快照或查询错误。

- [ ] **步骤 2：运行生产构建**

运行：`npm run build`

预期：PASS，Vite 构建成功，无 CSS 语法错误和 JSX 编译错误。

- [ ] **步骤 3：启动本地预览**

运行：`npm run dev -- --host 127.0.0.1 --port 4173`

预期：本地输出 `http://127.0.0.1:4173/Portfolio/`

- [ ] **步骤 4：人工核查首页**

检查项：

```text
1. Hero 右侧不再出现中心球体
2. 精选案例三项在同一视觉层级可读
3. Method 无突兀竖线和漂浮英文标签
4. Path 无卡片 hover 误导
5. Contact 中 Email 是最强联系信息
```

- [ ] **步骤 5：人工核查 PACS 详情页**

检查项：

```text
1. Hero 是图文阅读首屏，不是装置首屏
2. 迭代路径按顺序阅读，无横向滚动劫持
3. 关键设计判断无 sticky stack
4. 图片和说明关系清晰
5. 动效不打断阅读
```

- [ ] **步骤 6：Commit**

```bash
git add .
git commit -m "chore: verify homepage and pacs editorial redesign"
```

---

## 自检

### 规格覆盖度
- `Hero`：任务 2 覆盖
- `精选案例`：任务 3 覆盖
- `Method`：任务 3 覆盖
- `Path`：任务 3 覆盖
- `Contact`：任务 3 覆盖
- 首页微动效收口：任务 4 覆盖
- `PACS`：任务 5 覆盖
- 测试与构建验证：任务 1、任务 6 覆盖

### 占位符扫描
- 未使用 `TODO`、`待定`、`后续实现` 之类占位语。
- 每个代码修改步骤都包含了示例代码和具体命令。

### 类型一致性
- 首页仍沿用现有 React 组件划分，不新增跨组件共享状态。
- `PacsCase` 继续使用现有 `project` 数据结构，只改变呈现顺序和容器样式。

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/current/2026-07-20-homepage-and-pacs-editorial-exhibition-redesign.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

**选哪种方式？**
