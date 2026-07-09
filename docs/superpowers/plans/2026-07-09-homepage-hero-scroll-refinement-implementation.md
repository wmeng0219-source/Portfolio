# 首页人物封面与章节滚动重构 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在保留当前首页叙事主线的前提下，减轻 `Hero` 首屏拥挤感、修正中文标题与正文换行，并把滚动动效重构为更明显的章节推进。

**架构：** 保持 React + CSS Modules + 全局样式 + GSAP 的现有实现方式，不引入新的滚动框架。通过重写 `Hero` 的内容承载方式、调整全局标题与正文宽度策略、重构 `useHomepageMotion()` 的区块强弱逻辑，并同步更新测试来完成本轮优化。

**技术栈：** React 18、Vite 5、Vitest、React Testing Library、GSAP、CSS Modules

---

## 文件结构

### 需要修改

- `/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
  - 压缩 `Hero` 文本层级，减轻右侧面板内容，重排首屏信息顺序
- `/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
  - 重做 `Hero` 版式宽度、行长、留白、右侧预告块与首屏层级
- `/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`
  - 锁定新的 `Hero` 文案承载、章节预告减重与动效触发
- `/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.js`
  - 将统一 reveal 改为按章节类型区分强弱
- `/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.test.jsx`
  - 锁定 `ProofStrip`、`Portfolio` 与普通章节的不同动效参数
- `/Users/wen/Desktop/Portfolio/src/styles/global.css`
  - 调整中文标题与正文的全局宽度、行高、区块标题节奏
- `/Users/wen/Desktop/Portfolio/src/components/ProofStrip/ProofStrip.module.css`
  - 调整第二幕标题与卡片的版式关系，配合更明确的章节进入
- `/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
  - 为主篇章与侧篇章补齐更清晰的动效分组标记
- `/Users/wen/Desktop/Portfolio/src/App.test.jsx`
  - 更新整页结构断言，覆盖新的主篇章优先与 `Hero` 封面状态

### 可能修改

- `/Users/wen/Desktop/Portfolio/src/locales/zh.json`
  - 如果 `Hero` 章节预告或说明文案需要进一步压缩，则同步调整中文 key 对应文案
- `/Users/wen/Desktop/Portfolio/src/locales/en.json`
  - 与中文结构保持一致

---

### 任务 1：先锁定新版 Hero 与滚动节奏的测试约束

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：先写 `Hero` 失败断言，约束“封面化减负”后的结构**

```jsx
test('renders hero as a lighter cover with a compact episode preview', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByText('Meng Wen')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: '产品设计师与数字化实践者',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('我把复杂业务整理成团队能理解、能协作、能推进的产品结构。')).toBeInTheDocument();
  expect(
    screen.queryByText('从这里开始，你看到的不是一组模块，而是一个设计师如何进入复杂问题、建立协作、推动落地。'),
  ).not.toBeInTheDocument();
  expect(screen.getByText('人物登场之后，再进入方法、能力与代表项目。')).toBeInTheDocument();
});
```

- [ ] **步骤 2：运行 `Hero` 测试确认失败**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：FAIL，当前 `Hero` 仍然渲染较长的右侧说明，无法通过“章节预告减重”断言。

- [ ] **步骤 3：为页面动效测试补上章节强弱断言**

```jsx
test('uses stronger reveal settings for proof chapter content', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<Harness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement)]),
    expect.objectContaining({ y: 36, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.16,
      scrollTrigger: expect.objectContaining({ start: 'top 78%' }),
    }),
  );
});

test('keeps lead episode ahead of side episodes in portfolio reveal', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<PortfolioHarness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement), expect.any(HTMLElement), expect.any(HTMLElement)]),
    expect.objectContaining({ y: 32, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.1,
      scrollTrigger: expect.objectContaining({ start: 'top 80%' }),
    }),
  );
});
```

- [ ] **步骤 4：运行动效测试确认失败**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`

预期：FAIL，当前 `useHomepageMotion()` 仍然对多数区块使用 `y: 28`、`start: 'top 82%'` 与统一的 reveal 逻辑。

- [ ] **步骤 5：补一条整页结构失败断言，确保主篇章优先更清楚**

```jsx
test('renders homepage with a lighter hero and lead-first portfolio stage', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: '主线篇章：代表作',
  }).closest('section');

  const featuredCard = within(portfolioSection).getByText('主篇章').closest('article');
  expect(featuredCard).toHaveAttribute('data-motion-item', 'featured');
  expect(within(featuredCard).getByText('主流程重构 / 筛查闭环')).toBeInTheDocument();
});
```

- [ ] **步骤 6：运行整页测试确认失败**

运行：`npm test -- src/App.test.jsx`

预期：FAIL，当前实现尚未补齐新版动效分组或首屏减重后的整页结构约束。

- [ ] **步骤 7：Commit**

```bash
git add src/components/Hero/index.test.jsx src/motion/useHomepageMotion.test.jsx src/App.test.jsx
git commit -m "test: lock hero cover and chapter motion contract"
```

### 任务 2：把 Hero 收束成更安静的人物封面

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 测试：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`

- [ ] **步骤 1：先压缩 `Hero` 右侧章节预告的 JSX 承载**

```jsx
<aside className={styles.panel} ref={visualRef} aria-label={t('hero.panel.label')}>
  <p className={styles.panelEpisode}>{t('hero.panel.episode')}</p>

  <div className={styles.panelTop}>
    <p className={styles.panelLeadLabel}>{t('hero.panel.label')}</p>
    <p className={styles.panelCaption}>{t('hero.panel.title')}</p>
  </div>

  <div className={styles.panelLead}>
    <p className={styles.panelLeadValue}>{t('hero.title')}</p>
  </div>
</aside>
```

- [ ] **步骤 2：同步减轻左侧 copy 结构，只保留封面所需层级**

```jsx
<div className={styles.copy} ref={copyRef}>
  <p className={styles.kicker} data-hero-anim>
    {t('hero.kicker')}
  </p>
  <p className={styles.nameplate} data-hero-anim>
    {t('hero.meta.name')}
  </p>
  <h1 className={styles.roleTitle} data-hero-anim>
    {t('hero.meta.role')}
  </h1>
  <p className={styles.body} data-hero-anim>
    {t('hero.body')}
  </p>
  <div className={styles.actions} data-hero-anim>
    <a className={styles.btnPrimary} href="#portfolio" data-motion-hover="button">
      {t('hero.btn.work')}
    </a>
    <a className={styles.btnSecondary} href="#contact" data-motion-hover="button">
      {t('hero.btn.contact')}
    </a>
  </div>
</div>
```

- [ ] **步骤 3：重排 `Hero.module.css` 的桌面宽度和层级**

```css
.hero {
  min-height: 100dvh;
  padding: calc(var(--header-height) + 2.5rem) clamp(1.25rem, 4vw, 2.5rem) 2rem;
}

.shell {
  min-height: calc(100dvh - var(--header-height) - 4.5rem);
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.72fr);
  gap: clamp(2.5rem, 5vw, 5.5rem);
  align-items: end;
}

.copy {
  width: min(100%, 38rem);
  padding-bottom: 0.5rem;
}

.roleTitle {
  max-width: 14ch;
  margin-top: 0.8rem;
  font-size: clamp(1.9rem, 2.8vw, 2.7rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.body {
  max-width: 32rem;
  margin-top: 1.4rem;
  font-size: clamp(1.02rem, 1.35vw, 1.12rem);
  line-height: 1.8;
  letter-spacing: 0;
}
```

- [ ] **步骤 4：继续减轻右侧预告块的视觉占比**

```css
.panel {
  min-height: 24rem;
  padding: 1.35rem;
  align-self: end;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
    rgba(9, 10, 15, 0.56);
}

.panelEpisode {
  color: rgba(243, 242, 239, 0.12);
  font-size: clamp(3.8rem, 6vw, 5.4rem);
}

.panelCaption {
  max-width: 16ch;
  font-size: 0.95rem;
  line-height: 1.55;
}

.panelLead {
  min-height: auto;
  padding-top: 0.9rem;
}

.panelLeadValue {
  max-width: 12ch;
  font-size: clamp(1.45rem, 2vw, 1.9rem);
  line-height: 1.08;
}
```

- [ ] **步骤 5：如果右侧预告仍显得啰嗦，再压缩 locale 文案**

```json
{
  "hero.panel.title": "人物登场之后，进入方法、能力与代表项目。",
  "hero.panel.body": ""
}
```

如果 `hero.panel.body` 不再使用，则同步删除组件中的渲染入口，而不是保留空白占位。

- [ ] **步骤 6：运行 `Hero` 测试验证通过**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：PASS，确认 `Hero` 已经变成更轻的人物封面，并移除了过长的右侧说明承载。

- [ ] **步骤 7：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Hero/index.test.jsx src/locales/zh.json src/locales/en.json
git commit -m "refactor: lighten hero into a cleaner cover"
```

### 任务 3：校正中文换行并重建章节强弱动效

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/ProofStrip.module.css`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.js`
- 测试：`/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.test.jsx`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：先放宽全局中文标题与正文宽度**

```css
.section-title {
  max-width: 16ch;
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
}

.section-intro,
.section-copy p,
.contact-intro {
  max-width: 40rem;
  font-size: clamp(1rem, 1.28vw, 1.08rem);
  line-height: 1.82;
  letter-spacing: 0;
}

.portfolio-primary-title {
  max-width: 13ch;
  line-height: 1.06;
}

.portfolio-card-title {
  max-width: 16ch;
  line-height: 1.08;
}
```

- [ ] **步骤 2：重排 `ProofStrip` 的第二幕标题和卡片间距**

```css
.chapter {
  margin: 0 auto 2rem;
  gap: 0.6rem;
}

.chapterTitle {
  max-width: 18ch;
  font-size: clamp(2rem, 3.4vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

.shell {
  gap: 1.15rem;
}
```

- [ ] **步骤 3：给 `Portfolio` 明确补齐主篇章优先的动效分组**

```jsx
<div className="portfolio-stage" data-motion-group="portfolio-stage">
  <article className="portfolio-primary" data-motion-item="featured" data-motion-hover="card">
    ...
  </article>

  <div className="portfolio-secondary" data-motion-group="portfolio-secondary">
    ...
  </div>
</div>
```

- [ ] **步骤 4：把 `useHomepageMotion()` 改成按区块职责分配动效参数**

```js
sections.forEach((section) => {
  const items = Array.from(section.querySelectorAll('[data-motion-item]'));
  if (!items.length) {
    return;
  }

  const isProofSection = Boolean(section.querySelector('[data-motion-group="proof"]'));
  const isPortfolioSection = Boolean(section.querySelector('[data-motion-group="portfolio-stage"]'));

  const fromVars = reduceMotion
    ? { autoAlpha: 0 }
    : { y: isProofSection ? 36 : isPortfolioSection ? 32 : 24, autoAlpha: 0 };

  const toVars = {
    y: 0,
    autoAlpha: 1,
    duration: reduceMotion ? 0.01 : isProofSection ? 0.95 : isPortfolioSection ? 0.88 : 0.74,
    stagger: reduceMotion ? 0 : isProofSection ? 0.16 : isPortfolioSection ? 0.1 : 0.08,
    ease: 'power3.out',
    overwrite: 'auto',
    scrollTrigger: {
      trigger: section,
      start: isProofSection ? 'top 78%' : isPortfolioSection ? 'top 80%' : 'top 84%',
      once: true,
    },
  };

  gsap.fromTo(items, fromVars, toVars);
});
```

- [ ] **步骤 5：给 `Hero` 右侧预告块更轻的滚动视差**

```js
if (visualRef.current && isDesktop && !reduceMotion) {
  gsap.to(visualRef.current, {
    yPercent: -5,
    scale: 1.015,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}
```

- [ ] **步骤 6：运行动效与整页测试验证通过**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx src/App.test.jsx`

预期：PASS，确认章节强弱分化、主篇章优先分组和整页结构断言全部成立。

- [ ] **步骤 7：Commit**

```bash
git add src/styles/global.css src/components/ProofStrip/ProofStrip.module.css src/components/Portfolio/index.jsx src/motion/useHomepageMotion.js src/motion/useHomepageMotion.test.jsx src/App.test.jsx
git commit -m "feat: refine homepage reading rhythm and chapter motion"
```

### 任务 4：回归验证并检查诊断

**文件：**
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- 验证：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 验证：`/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.js`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/ProofStrip.module.css`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`

- [ ] **步骤 1：运行完整测试套件**

运行：`npm test`

预期：PASS，现有首页测试与新增章节强弱测试全部通过。

- [ ] **步骤 2：运行生产构建**

运行：`npm run build`

预期：PASS，`vite build` 输出成功，无编译错误。

- [ ] **步骤 3：对最近编辑文件执行诊断检查**

运行：对以下文件执行诊断检查：

- `/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- `/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- `/Users/wen/Desktop/Portfolio/src/styles/global.css`
- `/Users/wen/Desktop/Portfolio/src/motion/useHomepageMotion.js`
- `/Users/wen/Desktop/Portfolio/src/components/ProofStrip/ProofStrip.module.css`
- `/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`

预期：无新增语法错误、无明显样式拼写问题、无未使用符号报错。

- [ ] **步骤 4：人工检查首页是否满足规格**

运行：`npm run dev -- --host 0.0.0.0`

重点检查：

- 首屏一眼先识别到名字与角色，右侧不再像第二块正文
- `Hero` 正文换行更自然，按钮不再把首屏挤满
- `ProofStrip` 到达时有明确的第二幕感
- `Portfolio` 到达时主篇章先进入阅读中心
- 全页中文标题与正文不再出现明显窄栏硬切

- [ ] **步骤 5：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/styles/global.css src/motion/useHomepageMotion.js src/components/ProofStrip/ProofStrip.module.css src/components/Portfolio/index.jsx src/components/Hero/index.test.jsx src/motion/useHomepageMotion.test.jsx src/App.test.jsx src/locales/zh.json src/locales/en.json
git commit -m "refactor: refine homepage hero and chapter scroll rhythm"
```

## 自检

### 规格覆盖度

- `Hero` 首屏减负与封面化：由任务 1、任务 2 覆盖
- 中文标题与正文换行校正：由任务 3 覆盖
- `ProofStrip` 第二幕唤醒感：由任务 1、任务 3 覆盖
- `Portfolio` 主篇章优先到达：由任务 1、任务 3 覆盖
- 动效按章节职责区分强弱：由任务 1、任务 3 覆盖
- 全量验证与诊断检查：由任务 4 覆盖

### 占位符扫描

- 未使用 `TODO`、`待定`、`后续补充`
- 每个任务都给出了明确文件、命令、预期结果与代码示例
- 未使用“类似任务 N”之类的隐式引用

### 类型一致性

- `Hero` 仍使用 `data-hero-anim` 作为首屏入场标记，不引入第二套属性名
- 页面 reveal 统一使用 `data-motion-section`、`data-motion-item`、`data-motion-group`
- `portfolio-stage` 与 `portfolio-secondary` 的分组命名在 JSX 与 `useHomepageMotion()` 中保持一致
- 测试断言中的文案与当前 locale key 保持对齐

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-09-homepage-hero-scroll-refinement-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
