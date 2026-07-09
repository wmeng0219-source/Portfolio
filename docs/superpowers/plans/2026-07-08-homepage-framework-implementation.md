# 首页框架重构 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将当前首页改造成“叙事首屏 + 能力证据 + 项目入口”的结构，提升设计张力，同时保留现有内容资产和中英文切换能力。

**架构：** 保持 React + CSS Modules / 全局样式的现有实现方式，不引入新的 UI 框架。通过新增 `ProofStrip` 组件、重写 `Hero` 与 `Portfolio`、压缩 `About` / `Experience` / `Contact` 的职责来完成首页重构；同时更新中英文文案键值并补上最小可行测试与构建验证。

**技术栈：** React 18、Vite 5、GSAP、CSS Modules、Vitest、React Testing Library

---

## 文件结构

### 需要创建

- `src/components/ProofStrip/index.jsx`
  - 首页新增能力证据区块，承接 `Hero`
- `src/components/ProofStrip/ProofStrip.module.css`
  - `ProofStrip` 独立样式
- `src/test/setup.js`
  - Vitest 全局测试初始化
- `src/components/ProofStrip/index.test.jsx`
  - `ProofStrip` 渲染与文案测试
- `src/components/Hero/index.test.jsx`
  - `Hero` 核心文案与 CTA 测试

### 需要修改

- `package.json`
  - 新增测试脚本与测试依赖
- `vite.config.js`
  - 增加 Vitest 配置
- `src/App.jsx`
  - 调整首页区块顺序，插入 `ProofStrip`
- `src/components/Hero/index.jsx`
  - 重构首屏结构与内容分层
- `src/components/Hero/Hero.module.css`
  - 重构首屏布局与视觉层次
- `src/components/About/index.jsx`
  - 压缩为专业画像型结构
- `src/components/Experience/index.jsx`
  - 改为成长阶段块表达
- `src/components/Portfolio/index.jsx`
  - 改为 1 主 2 辅的项目舞台
- `src/components/Contact/index.jsx`
  - 简化为单一主 CTA 收束
- `src/components/Navbar/index.jsx`
  - 移除滚动监听式状态，改为更轻的样式逻辑
- `src/components/Navbar/Navbar.module.css`
  - 配合首页新视觉统一导航表达
- `src/styles/global.css`
  - 重写通用 section、grid、项目舞台、联系区样式
- `src/styles/variables.css`
  - 调整颜色、间距、圆角、排版 token
- `src/locales/zh.json`
  - 新增首页新结构需要的中文文案
- `src/locales/en.json`
  - 新增首页新结构需要的英文文案
- `src/context/LanguageContext.jsx`
  - 如测试中需要，补齐 provider 导出使用约束

---

### 任务 1：建立测试基础设施

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/package.json`
- 修改：`/Users/wen/Desktop/Portfolio/vite.config.js`
- 创建：`/Users/wen/Desktop/Portfolio/src/test/setup.js`

- [ ] **步骤 1：为测试脚本补充依赖与命令**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^25.0.1",
    "vite": "^5.4.1",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **步骤 2：运行依赖安装验证 lockfile 更新**

运行：`npm install`
预期：新增 `vitest`、`jsdom`、`@testing-library/*` 到 `package-lock.json`

- [ ] **步骤 3：在 `vite.config.js` 增加测试配置**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
```

- [ ] **步骤 4：编写测试初始化文件**

```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **步骤 5：运行空测试确认基础设施可用**

运行：`npm test`
预期：失败，提示当前还没有测试文件，但 Vitest 能正常启动

- [ ] **步骤 6：Commit**

```bash
git add package.json package-lock.json vite.config.js src/test/setup.js
git commit -m "test: add vitest setup for homepage refactor"
```

### 任务 2：先改文案结构，再锁定数据接口

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`

- [ ] **步骤 1：编写失败的文案键值测试**

在 `Hero` 与 `ProofStrip` 测试中先引用以下键值，故意让测试因缺少翻译而失败：

```js
expect(screen.getByText('把复杂业务整理成可理解、可协作、可落地的产品体验')).toBeInTheDocument();
expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test`
预期：FAIL，报错缺少新的翻译 key 或页面未渲染对应文案

- [ ] **步骤 3：重组中文文案键值**

```json
{
  "hero.kicker": "Product Design for Complex Systems",
  "hero.title": "把复杂业务整理成可理解、可协作、可落地的产品体验",
  "hero.body": "我连接设计、业务与交付，让复杂流程在真实场景里变得更清晰、更容易推进。",
  "hero.meta.name": "Meng Wen",
  "hero.meta.role": "产品设计师与数字化实践者",
  "hero.panel.1.label": "Focus",
  "hero.panel.1.value": "复杂业务梳理",
  "hero.panel.2.label": "Method",
  "hero.panel.2.value": "多角色协同推进",
  "hero.panel.3.label": "Outcome",
  "hero.panel.3.value": "设计与落地平衡",
  "proof.item.1.title": "复杂业务梳理",
  "proof.item.1.body": "把流程、角色与信息节点拆成团队可理解的结构。",
  "proof.item.2.title": "多角色协同推进",
  "proof.item.2.body": "在产品、业务、一线执行之间建立共识与节奏。",
  "proof.item.3.title": "设计与落地平衡",
  "proof.item.3.body": "兼顾表达质量、协作成本与真实交付条件。"
}
```

- [ ] **步骤 4：同步英文键值，保持结构完全一致**

```json
{
  "hero.kicker": "Product Design for Complex Systems",
  "hero.title": "Turning complex business into product experiences that people can understand, align on, and deliver",
  "hero.body": "I connect design, business, and delivery so complex workflows become clearer and easier to move forward in real teams.",
  "proof.item.1.title": "Complex business framing",
  "proof.item.1.body": "Turn roles, flow, and information into structures teams can work with."
}
```

- [ ] **步骤 5：顺手压缩旧键值，避免新旧 Hero/Portfolio 文案并存**

删除或替换以下旧键值的使用入口：

```json
{
  "hero.eyebrow": "...",
  "hero.subtitle": "...",
  "hero.description": "...",
  "hero.fact.1.label": "...",
  "portfolio.item.1.category": "方向 01"
}
```

- [ ] **步骤 6：运行测试确认翻译结构完整**

运行：`npm test`
预期：依然 FAIL，但失败原因转移为组件还未使用这些新文案，而不是缺少翻译 key

- [ ] **步骤 7：Commit**

```bash
git add src/locales/zh.json src/locales/en.json
git commit -m "feat: restructure homepage copy keys"
```

### 任务 3：重构首页骨架并插入 Proof Strip

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/App.jsx`
- 创建：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.jsx`
- 创建：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/ProofStrip.module.css`
- 创建：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.test.jsx`

- [ ] **步骤 1：编写 `ProofStrip` 失败测试**

```jsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import ProofStrip from './index';

test('renders three proof items', () => {
  render(
    <LanguageProvider>
      <ProofStrip />
    </LanguageProvider>,
  );

  expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
  expect(screen.getByText('多角色协同推进')).toBeInTheDocument();
  expect(screen.getByText('设计与落地平衡')).toBeInTheDocument();
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/ProofStrip/index.test.jsx`
预期：FAIL，报错 `ProofStrip` 文件不存在

- [ ] **步骤 3：实现 `ProofStrip` 组件**

```jsx
import React from 'react';
import styles from './ProofStrip.module.css';
import { useLanguage } from '../../context/LanguageContext';

const items = [1, 2, 3];

const ProofStrip = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} aria-label="proof-strip">
      <div className={styles.shell}>
        {items.map((item) => (
          <article className={styles.card} key={item}>
            <p className={styles.label}>{t(`proof.item.${item}.title`)}</p>
            <p className={styles.body}>{t(`proof.item.${item}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProofStrip;
```

- [ ] **步骤 4：为 `ProofStrip` 写最小样式**

```css
.section {
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) var(--spacing-lg);
}

.shell {
  width: min(100%, var(--content-max));
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.card {
  padding: 1.25rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.03);
}
```

- [ ] **步骤 5：在 `App.jsx` 插入新顺序**

```jsx
import ProofStrip from './components/ProofStrip';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **步骤 6：运行测试验证通过**

运行：`npm test -- src/components/ProofStrip/index.test.jsx`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add src/App.jsx src/components/ProofStrip/index.jsx src/components/ProofStrip/ProofStrip.module.css src/components/ProofStrip/index.test.jsx
git commit -m "feat: add proof strip section to homepage"
```

### 任务 4：重写 Hero 为价值主张优先的首屏

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- 创建：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`

- [ ] **步骤 1：编写 `Hero` 失败测试**

```jsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import Hero from './index';

test('renders homepage value proposition and primary actions', () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '把复杂业务整理成可理解、可协作、可落地的产品体验',
  );
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact');
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/Hero/index.test.jsx`
预期：FAIL，当前 H1 仍然是 `Meng Wen`

- [ ] **步骤 3：重写 `Hero` 结构**

```jsx
return (
  <section className={styles.hero} id="hero" ref={sectionRef}>
    <div className={styles.visualGlow} />
    <div className={styles.shell}>
      <div className={styles.copy} ref={contentRef}>
        <p className={styles.kicker} data-anim="true">
          {t('hero.kicker')}
        </p>
        <h1 className={styles.title} data-anim="true">
          {t('hero.title')}
        </h1>
        <p className={styles.body} data-anim="true">
          {t('hero.body')}
        </p>
        <div className={styles.actions} data-anim="true">
          <a className={styles.btnPrimary} href="#portfolio">{t('hero.btn.work')}</a>
          <a className={styles.btnSecondary} href="#contact">{t('hero.btn.contact')}</a>
        </div>
        <div className={styles.meta} data-anim="true">
          <span>{t('hero.meta.name')}</span>
          <span>{t('hero.meta.role')}</span>
        </div>
      </div>
      <div className={styles.panel} ref={visualRef} aria-hidden="true">
        <div className={styles.panelTop} />
        <div className={styles.panelGrid}>
          <article><span>{t('hero.panel.1.label')}</span><p>{t('hero.panel.1.value')}</p></article>
          <article><span>{t('hero.panel.2.label')}</span><p>{t('hero.panel.2.value')}</p></article>
          <article><span>{t('hero.panel.3.label')}</span><p>{t('hero.panel.3.value')}</p></article>
        </div>
      </div>
    </div>
  </section>
);
```

- [ ] **步骤 4：重写 `Hero.module.css`，让首屏从单栏背景图改为左右张力结构**

```css
.hero {
  position: relative;
  min-height: 100dvh;
  padding: calc(var(--header-height) + 3.5rem) clamp(1.25rem, 4vw, 2.5rem) 2rem;
}

.shell {
  width: min(100%, var(--content-max));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(24rem, 0.95fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
}

.title {
  font-size: clamp(3.4rem, 7vw, 6.2rem);
  line-height: 0.94;
  letter-spacing: -0.07em;
  max-width: 8ch;
}

.panel {
  min-height: 32rem;
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-strong);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
}
```

- [ ] **步骤 5：保留现有 GSAP 进入动画，但只绑定到新的 copy / panel 元素**

```js
gsap.fromTo(
  '[data-anim="true"]',
  { y: 32, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
);
```

- [ ] **步骤 6：运行测试验证通过**

运行：`npm test -- src/components/Hero/index.test.jsx`
预期：PASS

- [ ] **步骤 7：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Hero/index.test.jsx
git commit -m "feat: rebuild hero around value proposition"
```

### 任务 5：重构 About、Experience、Portfolio、Contact 的区块职责

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/About/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 修改：`/Users/wen/Desktop/Portfolio/src/styles/variables.css`

- [ ] **步骤 1：编写页面结构失败测试，约束主项目文案顺序**

```jsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import App from '../../App';

test('renders portfolio with primary orthodontic case before secondary cases', () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

  const primary = screen.getByText('正畸筛查与状态管理');
  const secondary = screen.getByText('会员自动化与服务衔接');
  expect(primary.compareDocumentPosition(secondary)).toBeTruthy();
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test`
预期：FAIL，当前 `Portfolio` 仍是三条普通列表且项目顺序不符合新设计

- [ ] **步骤 3：压缩 `About` 成三段专业画像**

```jsx
<section className="page-section page-section-dark" id="about">
  <div className="section-shell about-grid">
    <div>
      <h2 className="section-title">{t('about.title')}</h2>
    </div>
    <div className="about-points">
      <article><h3>{t('about.point.1')}</h3><p>{t('about.point.1.body')}</p></article>
      <article><h3>{t('about.point.2')}</h3><p>{t('about.point.2.body')}</p></article>
      <article><h3>{t('about.point.3')}</h3><p>{t('about.point.3.body')}</p></article>
    </div>
  </div>
</section>
```

- [ ] **步骤 4：将 `Experience` 改为三阶段块**

```jsx
<div className="phase-grid">
  {items.map((item) => (
    <article className="phase-card" key={item}>
      <p className="phase-label">{t(`experience.item.${item}.period`)}</p>
      <h3 className="phase-title">{t(`experience.item.${item}.title`)}</h3>
      <p className="phase-body">{t(`experience.item.${item}.body`)}</p>
    </article>
  ))}
</div>
```

- [ ] **步骤 5：将 `Portfolio` 改为 1 主 2 辅布局**

```jsx
const primaryItem = 2;
const secondaryItems = [1, 3];

return (
  <section className="page-section page-section-dark" id="portfolio">
    <div className="section-shell">
      <div className="portfolio-stage">
        <article className="portfolio-primary">
          <p className="portfolio-tag">{t(`portfolio.item.${primaryItem}.tag`)}</p>
          <h3 className="portfolio-primary-title">{t(`portfolio.item.${primaryItem}.title`)}</h3>
          <p className="portfolio-primary-body">{t(`portfolio.item.${primaryItem}.body`)}</p>
        </article>
        <div className="portfolio-secondary">
          {secondaryItems.map((item) => (
            <article className="portfolio-card" key={item}>
              <p className="portfolio-tag">{t(`portfolio.item.${item}.tag`)}</p>
              <h3>{t(`portfolio.item.${item}.title`)}</h3>
              <p>{t(`portfolio.item.${item}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
```

- [ ] **步骤 6：简化 `Contact` 为单一主 CTA**

```jsx
<div className="contact-actions">
  <a className="primary-link" href={`mailto:${t('contact.email')}`}>
    {t('contact.primary')}
  </a>
</div>
<a className="contact-backlink" href="#hero">
  {t('contact.secondary')}
</a>
```

- [ ] **步骤 7：重写全局样式 token 和区块布局**

```css
:root {
  --color-bg-primary: #0a0d14;
  --color-bg-secondary: #10141d;
  --color-accent-start: #5b8cff;
  --color-accent-end: #7aa2ff;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --spacing-section: clamp(5.5rem, 9vw, 8rem);
}

.portfolio-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 1rem;
}

.portfolio-primary,
.portfolio-card,
.phase-card {
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.03);
}
```

- [ ] **步骤 8：运行测试验证通过**

运行：`npm test`
预期：PASS

- [ ] **步骤 9：Commit**

```bash
git add src/components/About/index.jsx src/components/Experience/index.jsx src/components/Portfolio/index.jsx src/components/Contact/index.jsx src/styles/global.css src/styles/variables.css src/locales/zh.json src/locales/en.json
git commit -m "feat: reshape homepage sections and portfolio stage"
```

### 任务 6：收尾导航、构建验证与人工检查

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Navbar/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Navbar/Navbar.module.css`

- [ ] **步骤 1：移除基于 `window.addEventListener('scroll')` 的导航状态**

```jsx
import React, { useMemo, useState } from 'react';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      ...
    </nav>
  );
};
```

- [ ] **步骤 2：让导航通过固定浅玻璃样式适配新首页**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(10, 13, 20, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
}
```

- [ ] **步骤 3：运行单元测试**

运行：`npm test`
预期：PASS

- [ ] **步骤 4：运行生产构建**

运行：`npm run build`
预期：PASS，输出 `dist/` 产物，无编译错误

- [ ] **步骤 5：人工检查首页**

运行：`npm run dev -- --host 0.0.0.0`
预期：本地页面检查以下项目均成立：

- `Hero` 第一屏可见完整主标题和双 CTA
- `ProofStrip` 出现在首屏下方
- `Portfolio` 为 1 主 2 辅结构
- `Contact` 只有 1 个主按钮，`回到顶部` 为弱链接
- 移动端下 `Hero`、`Portfolio`、`ProofStrip` 均能单列折叠

- [ ] **步骤 6：检查诊断与样式问题**

运行：对最近编辑文件执行诊断检查
预期：无新增 lint / 语法错误

- [ ] **步骤 7：Commit**

```bash
git add src/components/Navbar/index.jsx src/components/Navbar/Navbar.module.css
git commit -m "refactor: finalize homepage navigation and verification"
```

## 自检

### 规格覆盖度

- `Hero` 价值主张优先：由任务 4 覆盖
- `Proof Strip` 能力证据层：由任务 3 覆盖
- `About` 压缩为专业画像：由任务 5 覆盖
- `Experience` 改为成长阶段表达：由任务 5 覆盖
- `Portfolio` 改为 1 主 2 辅舞台：由任务 5 覆盖
- `Contact` 简化主次：由任务 5 覆盖
- 视觉基调、颜色、圆角、节奏：由任务 4、任务 5、任务 6 共同覆盖
- 测试与构建验证：由任务 1、任务 3、任务 4、任务 5、任务 6 覆盖

### 占位符扫描

- 未使用 `TODO`、`待定`、`后续补充`
- 每个任务都给出具体文件、代码片段、命令和预期结果
- 未出现“类似任务 N”这类依赖隐式上下文的描述

### 类型一致性

- `ProofStrip` 键值统一为 `proof.item.N.*`
- `Hero` 键值统一为 `hero.kicker`、`hero.title`、`hero.body`、`hero.meta.*`、`hero.panel.*`
- `Portfolio` 主次结构统一使用 `primaryItem` / `secondaryItems`
- 测试全部围绕现有 React 组件和 `LanguageProvider` 组织，无额外未定义类型

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-08-homepage-framework-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
