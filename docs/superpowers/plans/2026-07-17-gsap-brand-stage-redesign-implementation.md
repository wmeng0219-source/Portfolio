# 参考 gsap.com 的 Hero 与 Portfolio 大改版实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页的 `Hero + Portfolio` 重做为具有 `gsap.com` 品牌舞台感的高强度版本，在保留现有数据来源与路由的前提下，让首页第一眼就明显换风格。

**架构：** `Hero` 直接重写为“超大标题 + 一句主张 + 单 CTA + 大尺度舞台装置”的品牌开场结构；`Portfolio` 重写为“强 statement + 1 强 2 弱 showcase 布局”的精选案例入口。数据继续读取 `src/locales/*.json` 与 `src/data/projects.js`，动效仍统一由 GSAP 驱动，但 reveal 与 hover 节奏会配合新骨架整体改写。

**技术栈：** React、CSS Modules、全局 CSS、GSAP、Vitest、React Testing Library

---

## 文件结构

### 修改文件

- `src/components/Hero/index.jsx`
  - 重写 Hero DOM 骨架，移除当前 ticker 主体地位与说明型内容结构。
- `src/components/Hero/Hero.module.css`
  - 重写首屏版式、舞台装置、配色、层级和 CTA 交互。
- `src/components/Portfolio/index.jsx`
  - 重写案例区骨架，将当前三等分卡片改为更强主次的 showcase 布局。
- `src/styles/global.css`
  - 新增或替换 Portfolio 大改版布局、色彩和交互样式。
- `src/motion/useHomepageMotion.js`
  - 重写首页动效策略，使其适配新的 Hero 开场与 Portfolio showcase 节奏。
- `src/locales/zh.json`
  - 新增 Hero 短文案和 Portfolio 精简卡面文案。
- `src/locales/en.json`
  - 同步新增英文短文案。
- `src/components/Hero/index.test.jsx`
  - 用新 Hero 骨架替换旧断言。
- `src/components/Portfolio/index.test.jsx`
  - 用新 showcase 骨架替换旧三等分卡片断言。
- `src/App.test.jsx`
  - 更新首页级断言，覆盖新的强视觉 Hero 与 showcase Portfolio。
- `src/motion/useHomepageMotion.test.jsx`
  - 更新 reveal / hover / section 进入顺序断言。

### 不改文件

- `src/pages/Home/index.jsx`
- `src/components/About/index.jsx`
- `src/components/Experience/index.jsx`
- `src/components/Contact/index.jsx`
- `src/pages/ProjectDetail/index.jsx`
- `src/data/projects.js`

---

### 任务 1：重写 Hero 为 GSAP Brand Stage 首屏

**文件：**
- 修改：`src/components/Hero/index.jsx`
- 修改：`src/components/Hero/Hero.module.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 测试：`src/components/Hero/index.test.jsx`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：先更新 Hero 与首页断言，锁定新的骨架目标**

```jsx
expect(
  screen.getByRole('heading', {
    level: 1,
    name: /Complex Systems/i,
  }),
).toBeInTheDocument();
expect(screen.getByText(/复杂系统.*清晰体验|Complex Systems Into Clear Experiences/i)).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Explore Selected Work|查看精选案例/i })).toHaveAttribute('href', '#portfolio');
```

以及首页断言：

```jsx
expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Explore Selected Work|查看精选案例/i })).toBeInTheDocument();
```

- [ ] **步骤 2：运行 Hero 与首页测试，确认旧结构与新断言不一致**

运行：`npm test -- src/components/Hero/index.test.jsx src/App.test.jsx`
预期：FAIL，原因应为旧 Hero 仍然使用当前双行说明型标题与旧文案结构。

- [ ] **步骤 3：先写新的 locale 字段，压缩 Hero 文案**

在 `src/locales/zh.json` 和 `src/locales/en.json` 中新增类似字段：

```json
"hero.stage.kicker": "Digital Product Systems",
"hero.stage.title.1": "Complex",
"hero.stage.title.2": "Systems",
"hero.stage.title.3": "Into Clear",
"hero.stage.title.4": "Experiences",
"hero.stage.body": "为复杂业务构建清晰、可执行、可扩展的产品系统。",
"hero.stage.cta": "查看精选案例"
```

英文同步：

```json
"hero.stage.kicker": "Digital Product Systems",
"hero.stage.title.1": "Complex",
"hero.stage.title.2": "Systems",
"hero.stage.title.3": "Into Clear",
"hero.stage.title.4": "Experiences",
"hero.stage.body": "Building clear, executable product systems for complex operational reality.",
"hero.stage.cta": "Explore Selected Work"
```

- [ ] **步骤 4：重写 Hero JSX，替换为大舞台骨架**

目标结构示意：

```jsx
<section className={styles.hero} id="hero" ref={sectionRef}>
  <div className={styles.stageBackdrop} aria-hidden="true">
    <div className={styles.stageGlow} />
    <div className={styles.stageGrid} />
    <div className={styles.stageOrbital} ref={visualStageRef} />
  </div>

  <div className={styles.shell}>
    <div className={styles.metaLine} data-hero-anim="support">
      <span>{t('hero.stage.kicker')}</span>
    </div>

    <div className={styles.copy} ref={copyRef}>
      <h1 className={styles.mainTitle}>
        <span data-hero-anim="title">{t('hero.stage.title.1')}</span>
        <span data-hero-anim="title">{t('hero.stage.title.2')}</span>
        <span data-hero-anim="title">{t('hero.stage.title.3')}</span>
        <span data-hero-anim="title">{t('hero.stage.title.4')}</span>
      </h1>

      <p className={styles.body} data-hero-anim="support">{t('hero.stage.body')}</p>

      <a className={styles.cta} href="#portfolio" data-motion-hover="button">
        {t('hero.stage.cta')}
      </a>
    </div>
  </div>
</section>
```

要求：
- 删除当前 ticker 主结构
- 删除当前说明型 `eyebrow + 长正文` 组合
- 主 CTA 保持锚点行为
- 保留必要的 ref，供 GSAP 动效接线

- [ ] **步骤 5：重写 Hero CSS，切换到深底 + 亮绿舞台配色**

核心样式方向：

```css
.hero {
  min-height: 100svh;
  background:
    radial-gradient(circle at 70% 30%, rgba(171, 255, 54, 0.16), transparent 0 32%),
    linear-gradient(180deg, #05070d 0%, #030406 100%);
}

.mainTitle {
  font-size: clamp(4.8rem, 11vw, 10.5rem);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.cta {
  background: #b8ff4d;
  color: #041009;
}
```

要求：
- 让首屏一眼形成新配色记忆
- 让标题成为唯一视觉核心
- 装置层比当前版明显更大、更亮、更有空间感
- CTA 明显换肤

- [ ] **步骤 6：运行 Hero 与首页测试确认通过**

运行：`npm test -- src/components/Hero/index.test.jsx src/App.test.jsx`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/locales/zh.json src/locales/en.json src/components/Hero/index.test.jsx src/App.test.jsx
git commit -m "feat: rebuild hero into gsap brand stage"
```

---

### 任务 2：重写 Portfolio 为 1 强 2 弱 showcase 布局

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 测试：`src/components/Portfolio/index.test.jsx`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：更新 Portfolio 测试，锁定新的 showcase 骨架**

```jsx
const section = screen.getByRole('heading', { level: 2, name: /Selected Work|精选案例/i }).closest('section');
expect(within(section).getByText(/System Cases|精选案例/)).toBeInTheDocument();
expect(within(section).getByRole('link', { name: /Member Automation/i })).toBeInTheDocument();
expect(within(section).getByRole('link', { name: /Ortho Funnel/i })).toBeInTheDocument();
expect(within(section).getByRole('link', { name: /AI Review Loop/i })).toBeInTheDocument();
```

- [ ] **步骤 2：运行 Portfolio 与首页测试，确认旧结构与新断言不一致**

运行：`npm test -- src/components/Portfolio/index.test.jsx src/App.test.jsx`
预期：FAIL，原因应为旧三等分信息卡结构与新 showcase 断言不一致。

- [ ] **步骤 3：在 locale 中新增更短的卡面文案**

新增字段示意：

```json
"portfolio.stage.kicker": "Selected Work",
"portfolio.stage.title": "System Cases",
"portfolio.stage.intro": "三个复杂系统案例，展示我如何把流程、规则与协作重组为可执行产品。",
"portfolio.stage.item.1.short": "规则系统重构",
"portfolio.stage.item.2.short": "漏斗与角色协作",
"portfolio.stage.item.3.short": "人机协作闭环"
```

- [ ] **步骤 4：重写 Portfolio JSX，改成 1 强 2 弱 showcase**

结构示意：

```jsx
<section className="portfolio-stage-section" id="portfolio" data-motion-section>
  <div className="portfolio-stage-head" data-motion-item>
    <p className="portfolio-stage-kicker">{t('portfolio.stage.kicker')}</p>
    <h2 className="portfolio-stage-title">{t('portfolio.stage.title')}</h2>
    <p className="portfolio-stage-intro">{t('portfolio.stage.intro')}</p>
  </div>

  <div className="portfolio-showcase" data-motion-group="portfolio-stage">
    <Link className="portfolio-feature-card" ... />
    <div className="portfolio-side-stack">
      <Link className="portfolio-side-card" ... />
      <Link className="portfolio-side-card" ... />
    </div>
  </div>
</section>
```

要求：
- 第一个项目成为默认主入口
- 其余两个项目作为辅入口堆叠或从属排布
- 每张卡片文案压缩，只保留标题、短标签、metric、进入动作
- 保持详情页链接与数据来源不变

- [ ] **步骤 5：重写 Portfolio 样式，形成明显新骨架**

样式目标：

```css
.portfolio-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
  gap: 1.5rem;
}

.portfolio-feature-card {
  min-height: 34rem;
  background: linear-gradient(180deg, rgba(184, 255, 77, 0.08), rgba(255, 255, 255, 0.02));
}

.portfolio-side-stack {
  display: grid;
  gap: 1.5rem;
}
```

要求：
- 第一眼看出主卡与辅卡差异
- 配色延续 Hero 的亮绿信号系统
- hover 联动更明显，但仍可控

- [ ] **步骤 6：运行 Portfolio 与首页测试确认通过**

运行：`npm test -- src/components/Portfolio/index.test.jsx src/App.test.jsx`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add src/components/Portfolio/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/components/Portfolio/index.test.jsx src/App.test.jsx
git commit -m "feat: rebuild portfolio into showcase stage"
```

---

### 任务 3：重写首页动效以匹配新舞台骨架

**文件：**
- 修改：`src/motion/useHomepageMotion.js`
- 测试：`src/motion/useHomepageMotion.test.jsx`

- [ ] **步骤 1：先更新 motion 测试，锁定新的开场节奏**

Hero 相关断言示意：

```jsx
expect(fromTo).toHaveBeenCalledWith(
  expect.arrayContaining([expect.any(HTMLElement)]),
  expect.objectContaining({ yPercent: 110, autoAlpha: 0 }),
  expect.objectContaining({
    stagger: 0.06,
    ease: 'power4.out',
  }),
);
```

Portfolio 相关断言示意：

```jsx
expect(fromTo).toHaveBeenCalledWith(
  expect.arrayContaining([expect.any(HTMLElement), expect.any(HTMLElement), expect.any(HTMLElement)]),
  expect.objectContaining({ y: 64, autoAlpha: 0 }),
  expect.objectContaining({
    stagger: 0.12,
    scrollTrigger: expect.objectContaining({ start: 'top 78%' }),
  }),
);
```

hover 断言示意：

```jsx
expect(to).toHaveBeenCalledWith(
  hoverTarget,
  expect.objectContaining({
    y: -6,
    duration: 0.24,
    ease: 'power2.out',
  }),
);
```

- [ ] **步骤 2：运行 motion 单测，确认旧参数与新断言不一致**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`
预期：FAIL

- [ ] **步骤 3：重写 `useHomepageMotion.js` 的时序逻辑**

目标方向：

```js
const isHeroStage = section.querySelector('[data-hero-stage]');
const isPortfolioStage = section.querySelector('[data-motion-group="portfolio-stage"]');

const fromVars = reduceMotion
  ? { autoAlpha: 0 }
  : isHeroStage
    ? { yPercent: 110, autoAlpha: 0 }
    : isPortfolioStage
      ? { y: 64, autoAlpha: 0 }
      : { y: 36, autoAlpha: 0 };
```

以及 hover：

```js
gsap.to(node, {
  y: -6,
  scale: node.dataset.motionHover === 'button' ? 1.015 : 1.01,
  duration: 0.24,
  ease: 'power2.out',
});
```

要求：
- Hero 出现更像开场
- Portfolio 被推入前台的感觉更明显
- 仍保留 reduced-motion 分支

- [ ] **步骤 4：运行 motion 单测确认通过**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`
预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/motion/useHomepageMotion.js src/motion/useHomepageMotion.test.jsx
git commit -m "feat: restage homepage motion for brand stage layout"
```

---

### 任务 4：全量验证与预览对照

**文件：**
- 验证：`src/components/Hero/index.jsx`
- 验证：`src/components/Portfolio/index.jsx`
- 验证：`src/components/Hero/Hero.module.css`
- 验证：`src/styles/global.css`
- 验证：`src/motion/useHomepageMotion.js`

- [ ] **步骤 1：运行全量测试**

运行：`npm test`
预期：所有测试文件通过。

- [ ] **步骤 2：运行构建**

运行：`npm run build`
预期：Vite 构建成功。

- [ ] **步骤 3：本地预览并对照目标**

运行：`npm run dev -- --host 0.0.0.0`

人工确认：
- 首屏第一眼明显换风格
- 配色已从紫黑切换到更强的深底 + 亮色信号
- Hero 具备品牌舞台感
- Portfolio 具备 1 强 2 弱 showcase 感
- CTA 和案例入口均可正常跳转

- [ ] **步骤 4：最终 Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Portfolio/index.jsx src/styles/global.css src/motion/useHomepageMotion.js src/locales/zh.json src/locales/en.json src/components/Hero/index.test.jsx src/components/Portfolio/index.test.jsx src/App.test.jsx src/motion/useHomepageMotion.test.jsx
git commit -m "feat: redesign homepage into gsap-inspired brand stage"
```
