# 首页 GSAP 动效实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 为当前首页加入统一的 GSAP 动效语言，包括 `Hero` 首屏入场、其余区块滚入 reveal、按钮与卡片 hover、以及 reduced motion/移动端降级。

**架构：** 保留 `Hero` 的组件内定制动画，并新增一个页面级 `useHomepageMotion()` hook 负责 section reveal 与 hover 微交互。组件通过稳定的 `data-motion-*` 标记暴露动效挂钩，测试重点验证 GSAP 调用契约、标记存在性和 reduced motion 分支。

**技术栈：** React 18、Vite 5、Vitest、GSAP 3、ScrollTrigger、CSS Modules、全局 CSS 变量

---

## 文件结构

### 新建文件

- `src/motion/useHomepageMotion.js`
  - 页面级 GSAP hook。
  - 负责：
    - `ProofStrip / About / Experience / Portfolio / Contact` 的滚入 reveal
    - 全页按钮、卡片、项目项、导航链接的 hover tween
    - `prefers-reduced-motion` 和桌面/移动端降级

- `src/motion/useHomepageMotion.test.jsx`
  - 测试页面级 hook 的 GSAP 调用契约。
  - 重点覆盖：
    - reveal 目标收集
    - reduced motion 分支
    - hover 绑定仅在桌面端启用

### 修改文件

- `src/App.jsx`
  - 挂载页面级 `ref`
  - 调用 `useHomepageMotion()`
  - 保持首页区块顺序不变

- `src/components/Hero/index.jsx`
  - 强化首屏入场
  - 为 glow 增加独立 ref
  - 用 `gsap.matchMedia()` 统一 reduced motion / 视差降级
  - 给 CTA 按钮添加 hover 标记

- `src/components/Hero/Hero.module.css`
  - 补足 glow 呼吸需要的视觉细节
  - 微调按钮和 panel 的 hover/end-state 样式支撑

- `src/components/ProofStrip/index.jsx`
  - 增加 `data-motion-section`、`data-motion-group`、`data-motion-item`、`data-motion-hover`

- `src/components/About/index.jsx`
  - 增加 section reveal 与卡片 hover 标记

- `src/components/Experience/index.jsx`
  - 增加 section reveal 与阶段卡片标记

- `src/components/Portfolio/index.jsx`
  - 增加主项目与辅项目分层 reveal 标记
  - 给项目卡片和主卡片增加 hover 标记

- `src/components/Contact/index.jsx`
  - 增加 section reveal 标记
  - 给主 CTA 和回顶链接增加 hover 标记

- `src/components/Navbar/index.jsx`
  - 给导航链接和语言切换按钮增加 hover 标记
  - 保持现有焦点管理和可访问性逻辑不变

- `src/components/ProofStrip/ProofStrip.module.css`
  - 微调卡片 hover 的基准样式，避免 GSAP hover 与 CSS 冲突

- `src/styles/global.css`
  - 为通用卡片、项目项、按钮补足更统一的 transform/box-shadow 终态样式
  - 必要时加入 `will-change: transform`

- `src/components/Hero/index.test.jsx`
  - 从仅校验文案，扩展为校验首屏 GSAP 调用契约和 hover 标记

- `src/components/ProofStrip/index.test.jsx`
  - 校验 proof 区块的 motion 标记存在

- `src/components/Navbar/index.test.jsx`
  - 保持现有 a11y 回归
  - 增加 hover 标记存在性断言

- `src/App.test.jsx`
  - 扩展为校验主要 section 的 reveal 标记和主次项目分层标记

- `src/test/setup.js`
  - 如 `useHomepageMotion` 测试需要，补齐 `requestAnimationFrame` / `cancelAnimationFrame` shim

---

### 任务 1：建立页面级动效基础

**文件：**
- 创建：`src/motion/useHomepageMotion.js`
- 创建：`src/motion/useHomepageMotion.test.jsx`
- 修改：`src/test/setup.js`

- [ ] **步骤 1：编写失败的测试**

```jsx
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { useRef } from 'react';
import { useHomepageMotion } from './useHomepageMotion';

const fromTo = vi.fn();
const to = vi.fn();
const matchMediaAdd = vi.fn();

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo,
    to,
    set: vi.fn(),
    matchMedia: () => ({
      add: matchMediaAdd,
      revert: vi.fn(),
    }),
  },
}));

const Harness = () => {
  const ref = useRef(null);
  useHomepageMotion(ref);

  return (
    <div ref={ref}>
      <section data-motion-section>
        <div data-motion-group>
          <article data-motion-item data-motion-hover="card">proof</article>
        </div>
      </section>
    </div>
  );
};

test('registers section reveal for marked motion items', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<Harness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement)]),
    expect.objectContaining({ y: 28, autoAlpha: 0 }),
    expect.objectContaining({
      duration: 0.8,
      scrollTrigger: expect.objectContaining({ start: 'top 82%' }),
    }),
  );
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`

预期：FAIL，报错 `Cannot find module './useHomepageMotion'`

- [ ] **步骤 3：编写最少实现代码**

```jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHomepageMotion = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 901px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        const sections = Array.from(root.querySelectorAll('[data-motion-section]'));
        const cleanups = [];

        sections.forEach((section, index) => {
          const items = Array.from(section.querySelectorAll('[data-motion-item]'));
          if (!items.length) return;

          gsap.fromTo(
            items,
            reduceMotion ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reduceMotion ? 0.01 : 0.8,
              stagger: reduceMotion ? 0 : 0.12,
              ease: 'power3.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                once: true,
              },
              delay: index === 0 ? 0.04 : 0,
            },
          );
        });

        if (isDesktop && !reduceMotion) {
          const hoverTargets = Array.from(root.querySelectorAll('[data-motion-hover]'));

          hoverTargets.forEach((node) => {
            const enter = () => {
              gsap.to(node, {
                y: -4,
                scale: node.dataset.motionHover === 'button' ? 1.01 : 1,
                duration: 0.26,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };

            const leave = () => {
              gsap.to(node, {
                y: 0,
                scale: 1,
                duration: 0.24,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            };

            node.addEventListener('pointerenter', enter);
            node.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              node.removeEventListener('pointerenter', enter);
              node.removeEventListener('pointerleave', leave);
            });
          });
        }

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    return () => mm.revert();
  }, [rootRef]);
};
```

```js
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => setTimeout(callback, 16);
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/motion/useHomepageMotion.js src/motion/useHomepageMotion.test.jsx src/test/setup.js
git commit -m "feat: add homepage motion primitives"
```

---

### 任务 2：增强 Hero 首屏动效

**文件：**
- 修改：`src/components/Hero/index.jsx`
- 修改：`src/components/Hero/Hero.module.css`
- 修改：`src/components/Hero/index.test.jsx`

- [ ] **步骤 1：编写失败的测试**

```jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Hero from './index';

const fromTo = vi.fn();
const to = vi.fn();
const matchMediaAdd = vi.fn();

vi.mock('gsap', () => ({
  default: {
    registerPlugin: () => {},
    context: (callback) => {
      callback();
      return { revert: () => {} };
    },
    fromTo,
    to,
    matchMedia: () => ({
      add: matchMediaAdd,
      revert: vi.fn(),
    }),
  },
}));

test('keeps hero content and registers glow + panel motion contracts', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('data-motion-hover', 'button');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('data-motion-hover', 'button');
  expect(fromTo).toHaveBeenCalled();
  expect(to).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({ yPercent: -8, scrollTrigger: expect.any(Object) }),
  );
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：FAIL，报错缺少 `data-motion-hover` 或 `gsap.matchMedia` 相关调用

- [ ] **步骤 3：编写最少实现代码**

```jsx
const glowRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const copyNodes = copyRef.current
      ? Array.from(copyRef.current.querySelectorAll('[data-hero-anim]'))
      : [];

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 901px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;

        if (copyNodes.length) {
          gsap.fromTo(
            copyNodes,
            reduceMotion ? { autoAlpha: 0 } : { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reduceMotion ? 0.01 : 0.82,
              stagger: reduceMotion ? 0 : 0.1,
              ease: 'power3.out',
            },
          );
        }

        if (visualRef.current) {
          gsap.fromTo(
            visualRef.current,
            reduceMotion ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0.01 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reduceMotion ? 0.01 : 0.92,
              delay: reduceMotion ? 0 : 0.18,
              ease: 'power3.out',
            },
          );
        }

        if (glowRef.current && !reduceMotion) {
          gsap.to(glowRef.current, {
            scale: 1.06,
            autoAlpha: 0.88,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (visualRef.current && isDesktop && !reduceMotion) {
          gsap.to(visualRef.current, {
            yPercent: -8,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        return () => mm.revert();
      },
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

```jsx
<div className={styles.glow} ref={glowRef} />
<a className={styles.btnPrimary} href="#portfolio" data-motion-hover="button">
  {t('hero.btn.work')}
</a>
<a className={styles.btnSecondary} href="#contact" data-motion-hover="button">
  {t('hero.btn.contact')}
</a>
```

```css
.glow {
  opacity: 0.72;
  transform-origin: center;
  will-change: transform, opacity;
}

.panel,
.btnPrimary,
.btnSecondary {
  will-change: transform;
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Hero/index.test.jsx
git commit -m "feat: refine hero motion choreography"
```

---

### 任务 3：接入首页其余区块的 reveal 标记与滚入动画

**文件：**
- 修改：`src/App.jsx`
- 修改：`src/components/ProofStrip/index.jsx`
- 修改：`src/components/About/index.jsx`
- 修改：`src/components/Experience/index.jsx`
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/components/Contact/index.jsx`
- 修改：`src/components/ProofStrip/index.test.jsx`
- 修改：`src/App.test.jsx`

- [ ] **步骤 1：编写失败的测试**

```jsx
test('marks homepage sections for reveal choreography and portfolio emphasis', () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

  const proofSection = screen.getByRole('region', { name: '能力证据' });
  expect(proofSection).toHaveAttribute('data-motion-section');
  expect(proofSection.querySelectorAll('[data-motion-item]')).toHaveLength(3);

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: '代表性项目，按问题类型展开。',
  }).closest('section');

  expect(portfolioSection).toHaveAttribute('data-motion-section');
  expect(within(portfolioSection).getByText('主案例').closest('article')).toHaveAttribute(
    'data-motion-item',
    'featured',
  );
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/App.test.jsx src/components/ProofStrip/index.test.jsx`

预期：FAIL，报错缺少 `data-motion-section` / `data-motion-item`

- [ ] **步骤 3：编写最少实现代码**

```jsx
import React, { useRef } from 'react';
import { useHomepageMotion } from './motion/useHomepageMotion';

function App() {
  const pageRef = useRef(null);
  useHomepageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}
```

```jsx
<section className={styles.section} aria-labelledby={headingId} data-motion-section>
  <div className={styles.shell} data-motion-group="proof">
    {items.map((item) => (
      <article className={styles.card} key={item} data-motion-item data-motion-hover="card">
```

```jsx
<section className="page-section page-section-dark" id="about" data-motion-section>
  <div className="section-shell about-grid">
    <div className="section-heading-block" data-motion-item>
    <div className="about-points" data-motion-group="cards">
      <article className="about-card" key={item} data-motion-item data-motion-hover="card">
```

```jsx
<section className="page-section" id="experience" data-motion-section>
  <div className="section-shell">
    <p className="section-kicker" data-motion-item>{t('experience.kicker')}</p>
    <div className="section-heading" data-motion-item>
    <div className="phase-grid" data-motion-group="phases">
      <article className="phase-card" key={item} data-motion-item data-motion-hover="card">
```

```jsx
<section className="page-section page-section-dark" id="portfolio" data-motion-section>
  <div className="section-shell">
    <div className="section-heading" data-motion-item>
    <div className="portfolio-stage">
      <article className="portfolio-primary" data-motion-item="featured" data-motion-hover="card">
      <div className="portfolio-secondary" data-motion-group="secondary">
        <article className="portfolio-card" key={item} data-motion-item data-motion-hover="card">
```

```jsx
<section className="page-section contact-section" id="contact" data-motion-section>
  <div className="section-shell contact-shell">
    <p className="section-kicker" data-motion-item>{t('contact.kicker')}</p>
    <h2 className="section-title" data-motion-item>{t('contact.title')}</h2>
    <p className="section-intro contact-intro" data-motion-item>{t('contact.body')}</p>
    <div className="contact-actions" data-motion-item>
      <a className="primary-link" href={`mailto:${t('contact.email')}`} data-motion-hover="button">
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/App.test.jsx src/components/ProofStrip/index.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/App.jsx src/components/ProofStrip/index.jsx src/components/About/index.jsx src/components/Experience/index.jsx src/components/Portfolio/index.jsx src/components/Contact/index.jsx src/components/ProofStrip/index.test.jsx src/App.test.jsx
git commit -m "feat: add section reveal hooks across homepage"
```

---

### 任务 4：完成微交互、导航反馈与最终回归

**文件：**
- 修改：`src/components/Navbar/index.jsx`
- 修改：`src/components/Navbar/index.test.jsx`
- 修改：`src/components/ProofStrip/ProofStrip.module.css`
- 修改：`src/styles/global.css`
- 如需微调：`src/components/Hero/Hero.module.css`

- [ ] **步骤 1：编写失败的测试**

```jsx
test('marks navbar links and language button for homepage hover motion', async () => {
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  await user.click(screen.getByRole('button', { name: '菜单' }));

  expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute('data-motion-hover', 'nav');
  expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('data-motion-hover', 'button');
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/Navbar/index.test.jsx`

预期：FAIL，报错缺少 `data-motion-hover`

- [ ] **步骤 3：编写最少实现代码**

```jsx
{navItems.map((item) => (
  <a key={item.key} href={item.href} onClick={handleMenuItemClick} data-motion-hover="nav">
    {t(item.key)}
  </a>
))}
<button
  className={styles.langBtn}
  type="button"
  onClick={toggleLanguage}
  data-motion-hover="button"
>
```

```css
.about-card,
.phase-card,
.portfolio-card,
.portfolio-primary,
.primary-link,
.secondary-link,
.contact-backlink {
  transform: translateY(0);
  transform-origin: center;
  will-change: transform, box-shadow;
}

.portfolio-primary,
.portfolio-card,
.about-card,
.phase-card,
.card {
  transition: box-shadow 0.24s ease, border-color 0.24s ease, background-color 0.24s ease;
}
```

```css
.card {
  will-change: transform, box-shadow;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.18);
}
```

- [ ] **步骤 4：运行全量验证**

运行：`npm test && npm run build`

预期：
- `4+` 个测试文件全部 PASS
- Vite 构建 PASS

- [ ] **步骤 5：Commit**

```bash
git add src/components/Navbar/index.jsx src/components/Navbar/index.test.jsx src/components/ProofStrip/ProofStrip.module.css src/styles/global.css src/components/Hero/Hero.module.css
git commit -m "feat: add homepage hover motion polish"
```

---

## 规格覆盖检查

- `Hero` 自动入场：由任务 2 覆盖
- 其余区块滚入 reveal：由任务 1 + 任务 3 覆盖
- 按钮、卡片、项目区块、导航 hover：由任务 1 + 任务 4 覆盖
- `prefers-reduced-motion`：由任务 1 和任务 2 覆盖
- 移动端降级：由任务 1 的 `matchMedia` 分支和任务 4 的回归验证覆盖
- 不改首页结构和职责边界：任务 3 只增加标记与 hook，不改顺序与 contract

## 占位符扫描结果

- 未保留 `TODO`、`待定`、`后续实现` 等占位描述
- 每个任务都包含了具体文件、测试、命令与 commit 建议

## 类型与命名一致性

- 页面级 reveal 标记统一使用：
  - `data-motion-section`
  - `data-motion-group`
  - `data-motion-item`
  - `data-motion-hover`
- 页面级 hook 名称统一为：`useHomepageMotion`

