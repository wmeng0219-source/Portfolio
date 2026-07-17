# 参考 gsap.com 优化 Hero 与 Portfolio 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在不改变首页内容架构的前提下，参考 `gsap.com` 的品牌站气质，重做 `Hero + Portfolio` 的层级、节奏和交互表达。

**架构：** `Hero` 保留当前内容与锚点结构，但收敛装饰层、放大标题压强、弱化 ticker 与背景持续动画。`Portfolio` 保持三卡并列数据映射，但增强 section statement、卡片阅读顺序和精细 hover 联动，同时同步 `useHomepageMotion` 的 reveal 参数，使两个区块共享统一的品牌级动效语言。

**技术栈：** React、CSS Modules、全局 CSS、GSAP、Vitest、React Testing Library

---

## 文件结构

### 修改文件

- `src/components/Hero/index.jsx`
  - 调整 `Hero` 的 DOM 层级和入场时序挂点，必要时减少装饰层的独立存在感。
- `src/components/Hero/Hero.module.css`
  - 重做首屏的标题比例、阅读列宽、装饰层强弱、ticker 对比度与按钮反馈。
- `src/components/Portfolio/index.jsx`
  - 保持三卡数据映射，增强 section statement 和卡片内部的阅读顺序语义。
- `src/styles/global.css`
  - 调整 `Portfolio` 标题区、卡片节奏、hover 联动、整体对比度和 spacing。
- `src/motion/useHomepageMotion.js`
  - 把 `Hero + Portfolio` 的 reveal/hovers 收敛到更统一、更克制的节奏。
- `src/components/Hero/index.test.jsx`
  - 更新 `Hero` 结构与 ticker/CTA 的断言。
- `src/components/Portfolio/index.test.jsx`
  - 保持三卡断言，必要时补充 section statement 或卡片节奏相关结构断言。
- `src/App.test.jsx`
  - 校正首页级断言，使其反映新的 `Hero + Portfolio` 展示基线。
- `src/motion/useHomepageMotion.test.jsx`
  - 更新 reveal 与 hover 参数预期，覆盖新的节奏设计。

### 不改文件

- `src/pages/Home/index.jsx`
- `src/components/About/index.jsx`
- `src/components/Experience/index.jsx`
- `src/components/Contact/index.jsx`
- `src/pages/ProjectDetail/index.jsx`

---

### 任务 1：重做 Hero 的品牌舞台感

**文件：**
- 修改：`src/components/Hero/index.jsx`
- 修改：`src/components/Hero/Hero.module.css`
- 测试：`src/components/Hero/index.test.jsx`

- [ ] **步骤 1：先写或更新 Hero 测试，锁定新的主次层级**

```jsx
expect(screen.getByText('PRODUCT SYSTEMS / 2025')).toBeInTheDocument();
expect(
  screen.getByRole('heading', {
    level: 1,
    name: /让复杂业务.*变得.*清晰可行。/,
  }),
).toBeInTheDocument();
expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('href', '#portfolio');
expect(screen.getAllByText('Complexity Into Clarity').length).toBeGreaterThan(0);
```

- [ ] **步骤 2：运行 Hero 单测，确认当前基线可见**

运行：`npm test -- src/components/Hero/index.test.jsx`
预期：测试先通过或在结构调整后能快速定位失败点；本步骤用于拿到当前基线，不要求先制造失败。

- [ ] **步骤 3：调整 Hero JSX，弱化装饰层的结构权重**

```jsx
<div className={styles.topline} data-hero-anim>
  <p className={styles.toplineLeft}>...</p>
  <p className={styles.toplineRight}>{t('hero.topline.right')}</p>
</div>

<div className={styles.headlineBlock}>
  <h1 className={styles.mainTitle}>...</h1>
  <div className={styles.intro} data-hero-anim>
    <p className={styles.body}>{t('hero.body')}</p>
    <div className={styles.actions}>...</div>
  </div>
</div>
```

要求：
- 保留当前 `topline / title / intro / CTA / rail` 语义
- 不新增第二个 CTA
- 不新增新的内容来源
- 如需减少装饰层节点，可以合并非必要包裹层，但不要破坏 `visualStageRef`、`glowRef`、`railTrackRef`

- [ ] **步骤 4：重写 Hero CSS，让标题成为唯一主角**

```css
.mainTitle {
  max-width: 78rem;
  margin-top: 6rem;
  font-size: clamp(4.2rem, 9vw, 9.6rem);
  line-height: 0.98;
  letter-spacing: -0.07em;
}

.intro {
  margin-top: 2.75rem;
  max-width: 30rem;
}

.toplineLeft,
.toplineRight {
  color: rgba(243, 242, 239, 0.42);
}
```

要求：
- 放大标题，占屏更满
- 缩窄正文列宽
- 下调 `topline` 对比度
- 让右侧装置更远、更淡
- ticker 更薄、更低对比度
- CTA hover 改成更线性的轻位移，不要增强弹跳感

- [ ] **步骤 5：运行 Hero 单测确认通过**

运行：`npm test -- src/components/Hero/index.test.jsx`
预期：PASS

- [ ] **步骤 6：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Hero/index.test.jsx
git commit -m "feat: refine hero into brand-stage layout"
```

---

### 任务 2：重做 Portfolio 的精选陈列感

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`
- 测试：`src/components/Portfolio/index.test.jsx`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：更新 Portfolio 相关测试，锁定 section statement 与三卡结构**

```jsx
const section = screen.getByRole('heading', { level: 2, name: '实践案例' }).closest('section');
expect(within(section).getByText('02 / Selected Cases')).toBeInTheDocument();
expect(within(section).getAllByRole('link')).toHaveLength(3);
expect(within(section).getByText('MEMBER AUTOMATION')).toBeInTheDocument();
expect(within(section).getAllByText('VIEW CASE STUDY')).toHaveLength(3);
```

- [ ] **步骤 2：运行 Portfolio 与首页相关测试，确认当前基线**

运行：`npm test -- src/components/Portfolio/index.test.jsx src/App.test.jsx`
预期：测试先通过或在后续修改中暴露精确断言差异。

- [ ] **步骤 3：微调 Portfolio JSX，强化 section statement 与阅读顺序**

```jsx
<div className="section-heading" data-motion-item>
  <div>
    <p className="section-kicker">{t('portfolio.kicker')}</p>
    <h2 className="section-title">{t('portfolio.title')}</h2>
  </div>
  <p className="section-intro">{t('portfolio.intro')}</p>
</div>

<div className="portfolio-stage" data-motion-group="portfolio-stage">
  {cards.map((card) => (
    <PortfolioCard card={card} key={card.key} />
  ))}
</div>
```

要求：
- 保持三卡数据映射
- 不改详情页链接逻辑
- 如需在 `PortfolioCard` 内增加更明确的结构钩子类名，可以增加，但不要新增复杂状态

- [ ] **步骤 4：调整全局样式，让 Portfolio 更像品牌陈列**

```css
.section-heading {
  margin-bottom: clamp(3.5rem, 6vw, 5rem);
}

.portfolio-stage {
  gap: 1.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.portfolio-link:hover {
  transform: translateY(-8px);
  border-color: rgba(168, 138, 223, 0.22);
}
```

要求：
- 拉开标题区与卡片区呼吸
- 卡片视觉更像精选陈列
- hover 更克制：轻位移、边框提亮、箭头位移、标题提亮
- 保留当前紫色系光感，但进一步压低“组件感”

- [ ] **步骤 5：更新首页测试，确认新的 Portfolio 基线**

运行：`npm test -- src/components/Portfolio/index.test.jsx src/App.test.jsx`
预期：PASS

- [ ] **步骤 6：Commit**

```bash
git add src/components/Portfolio/index.jsx src/styles/global.css src/components/Portfolio/index.test.jsx src/App.test.jsx
git commit -m "feat: elevate portfolio into curated showcase grid"
```

---

### 任务 3：统一首页动效语言

**文件：**
- 修改：`src/motion/useHomepageMotion.js`
- 测试：`src/motion/useHomepageMotion.test.jsx`

- [ ] **步骤 1：先更新 motion 测试，锁定新的 reveal 与 hover 节奏**

```jsx
expect(fromTo).toHaveBeenCalledWith(
  expect.arrayContaining([expect.any(HTMLElement)]),
  expect.objectContaining({ y: 36, autoAlpha: 0 }),
  expect.objectContaining({
    stagger: 0.08,
    scrollTrigger: expect.objectContaining({ start: 'top 88%' }),
  }),
);
```

以及：

```jsx
expect(to).toHaveBeenCalledWith(
  hoverTarget,
  expect.objectContaining({
    y: -3,
    duration: 0.22,
    ease: 'power2.out',
  }),
);
```

对于 Portfolio section：

```jsx
expect(fromTo).toHaveBeenCalledWith(
  expect.arrayContaining([expect.any(HTMLElement), expect.any(HTMLElement), expect.any(HTMLElement)]),
  expect.objectContaining({ y: 42, autoAlpha: 0 }),
  expect.objectContaining({
    stagger: 0.1,
    scrollTrigger: expect.objectContaining({ start: 'top 82%' }),
  }),
);
```

- [ ] **步骤 2：运行 motion 单测，确认断言当前会失败或需要同步**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`
预期：FAIL 或暴露当前参数与目标设计不一致。

- [ ] **步骤 3：调整 `useHomepageMotion.js` 的 reveal / hover 参数**

```js
const fromVars = reduceMotion
  ? { autoAlpha: 0 }
  : { y: isPortfolioSection ? 42 : 36, autoAlpha: 0 };

const toVars = {
  y: 0,
  autoAlpha: 1,
  duration: reduceMotion ? 0.01 : isPortfolioSection ? 1.05 : 0.8,
  stagger: reduceMotion ? 0 : isPortfolioSection ? 0.1 : 0.08,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: section,
    start: isPortfolioSection ? 'top 82%' : 'top 88%',
    once: true,
  },
};
```

hover 目标：

```js
gsap.to(node, {
  y: -3,
  scale: node.dataset.motionHover === 'button' ? 1.01 : 1,
  duration: 0.22,
  ease: 'power2.out',
});
```

要求：
- Hero 更“先发生”
- Portfolio reveal 更清晰但不夸张
- hover 更精确、更克制

- [ ] **步骤 4：运行 motion 单测确认通过**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`
预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/motion/useHomepageMotion.js src/motion/useHomepageMotion.test.jsx
git commit -m "feat: unify homepage motion timing for hero and portfolio"
```

---

### 任务 4：整体验证与收尾

**文件：**
- 验证：`src/components/Hero/index.jsx`
- 验证：`src/components/Portfolio/index.jsx`
- 验证：`src/styles/global.css`
- 验证：`src/motion/useHomepageMotion.js`

- [ ] **步骤 1：运行全量测试**

运行：`npm test`
预期：`5` 个测试文件全部通过。

- [ ] **步骤 2：运行构建**

运行：`npm run build`
预期：Vite 构建成功，无新增错误。

- [ ] **步骤 3：本地手动预览**

运行：`npm run dev -- --host 0.0.0.0`

手动确认：
- `Hero` 标题成为首屏唯一视觉主角
- `Hero` 的装饰层存在但不抢戏
- `Portfolio` 标题区与三卡之间有清晰呼吸
- 卡片 hover 更克制、更品牌化
- 页面整体节奏比当前更统一

- [ ] **步骤 4：最终 Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Portfolio/index.jsx src/styles/global.css src/motion/useHomepageMotion.js src/components/Hero/index.test.jsx src/components/Portfolio/index.test.jsx src/App.test.jsx src/motion/useHomepageMotion.test.jsx
git commit -m "feat: align hero and portfolio with gsap-inspired brand rhythm"
```
