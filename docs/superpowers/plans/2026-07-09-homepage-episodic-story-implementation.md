# 首页章节式叙事重构实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页从模块式作品集重构为“人物登场 + 专业章节推进”的叙事型首页，重点重排 `Hero`、增强 `ProofStrip` / `Portfolio` 的篇章感，并统一 section 标题与轻量 typography 动效。

**架构：** 保留当前首页信息架构和区块顺序，集中重构表达层。`Hero` 改为人物登场封面，`ProofStrip` 变成能力信号页，`Portfolio` 变成主线篇章；`useHomepageMotion()` 继续承载页面级 reveal / hover，`Hero` 组件内保留定制 GSAP 动画，但切换为 typography-first 的动效节奏。

**技术栈：** React 18、Vite 5、Vitest、GSAP 3、ScrollTrigger、CSS Modules、全局 CSS 变量、LanguageContext 中英文本地化

---

## 文件结构

### 修改文件

- `src/components/Hero/index.jsx`
  - 将 `Hero` 从价值主张优先改为人物登场优先
  - 重排 DOM 层级，使 `Meng Wen` 与角色身份成为主视觉
  - 弱化右侧 panel 的信息性，改成章节氛围层
  - 更新 `data-hero-anim` 节点分组，使 GSAP 动画适配新层级

- `src/components/Hero/Hero.module.css`
  - 重写 `Hero` 的版式与层级
  - 控制页面不拥挤：扩大留白，压缩右侧信息密度
  - 给名字、角色、旁白和章节视觉提供 typography-first 样式基础

- `src/components/Hero/index.test.jsx`
  - 从“价值主张 hero”改为“人物登场 hero”断言
  - 保留 GSAP 调用契约检查

- `src/components/ProofStrip/index.jsx`
  - 将能力证据条改成“第二幕能力信号页”
  - 补充章节型 heading 和 signal 容器语义

- `src/components/ProofStrip/ProofStrip.module.css`
  - 重做 `ProofStrip` 的排版，让它更像章节页而不是三张普通卡片

- `src/components/ProofStrip/index.test.jsx`
  - 校验新的章节 heading 和 3 条能力信号结构

- `src/components/Portfolio/index.jsx`
  - 把 `Portfolio` 改成“主线篇章 + 支线篇章”的结构表达
  - 为主案例与两个支线案例增加更明确的篇章文案节点

- `src/styles/global.css`
  - 新增统一的章节标题、旁白、episode kicker、section overline 等全局样式
  - 微调 `Portfolio`、`About`、`Experience`、`Contact` 的标题节奏和留白

- `src/App.test.jsx`
  - 更新 section 级回归测试，使其匹配新的章节化标题和 `Portfolio` 结构

- `src/locales/zh.json`
  - 改写 `hero.*`、`proof.*`、`portfolio.*` 相关文案
  - 必要时新增 `hero.intro.*`、`proof.chapter.*`、`portfolio.chapter.*` 等键

- `src/locales/en.json`
  - 与中文 contract 保持一致

- `src/motion/useHomepageMotion.js`
  - 如有必要，细化对新章节标题节点和 featured portfolio 节点的 reveal 节奏
  - 不扩展为重型滚动叙事

### 保持不变的边界

- `src/components/About/index.jsx`
- `src/components/Experience/index.jsx`
- `src/components/Contact/index.jsx`
- `src/components/Navbar/*`

这些文件最多只通过 `global.css` 的标题/节奏规则获得视觉变化，不在本轮改写结构与职责。

---

### 任务 1：重写 Hero 为人物登场封面

**文件：**
- 修改：`src/components/Hero/index.jsx`
- 修改：`src/components/Hero/Hero.module.css`
- 修改：`src/components/Hero/index.test.jsx`

- [ ] **步骤 1：编写失败的测试**

```jsx
test('renders hero as a character introduction with name-first hierarchy', () => {
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
  expect(
    screen.getByText('我把复杂业务整理成团队能理解、能协作、能推进的产品结构。'),
  ).toBeInTheDocument();
  expect(screen.queryByText('不是把页面做得更复杂，而是把复杂业务整理得更清楚。')).not.toBeInTheDocument();
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：FAIL，当前 `Hero` 仍然以旧标题与旧 panel 文案为主

- [ ] **步骤 3：编写最少实现代码**

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

  <p className={styles.intro} data-hero-anim>
    {t('hero.body')}
  </p>

  <div className={styles.actions} data-hero-anim>
    ...
  </div>
</div>

<aside className={styles.panel} ref={visualRef} aria-label={t('hero.panel.label')}>
  <p className={styles.panelEpisode}>{t('hero.panel.episode')}</p>
  <p className={styles.panelCaption}>{t('hero.panel.title')}</p>
  <div className={styles.panelTop}>
    ...
  </div>
</aside>
```

```css
.nameplate {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 8.2rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.08em;
}

.roleTitle {
  max-width: 10ch;
  margin-top: 0.6rem;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.8vw, 2.7rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.intro {
  max-width: 26rem;
  margin-top: 1.6rem;
}

.panelEpisode {
  font-size: clamp(4rem, 8vw, 6.4rem);
  line-height: 0.9;
  letter-spacing: -0.08em;
}
```

```jsx
if (copyNodes.length) {
  gsap.fromTo(
    copyNodes,
    reduceMotion ? { autoAlpha: 0 } : { y: 36, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: reduceMotion ? 0.01 : 0.88,
      stagger: reduceMotion ? 0 : 0.12,
      ease: 'power3.out',
    },
  );
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/components/Hero/index.jsx src/components/Hero/Hero.module.css src/components/Hero/index.test.jsx
git commit -m "feat: turn hero into character introduction"
```

---

### 任务 2：把 ProofStrip 改成第二幕能力信号页

**文件：**
- 修改：`src/components/ProofStrip/index.jsx`
- 修改：`src/components/ProofStrip/ProofStrip.module.css`
- 修改：`src/components/ProofStrip/index.test.jsx`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`

- [ ] **步骤 1：编写失败的测试**

```jsx
test('renders proof strip as a chapter-like capability signal section', () => {
  render(
    <LanguageProvider>
      <ProofStrip />
    </LanguageProvider>,
  );

  expect(screen.getByRole('heading', { level: 2, name: '第二幕 / 能力信号' })).toBeInTheDocument();
  expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
  expect(screen.getByText('多角色协同推进')).toBeInTheDocument();
  expect(screen.getByText('设计与落地平衡')).toBeInTheDocument();
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/ProofStrip/index.test.jsx`

预期：FAIL，当前 heading 仍是旧的“能力证据”

- [ ] **步骤 3：编写最少实现代码**

```jsx
<section className={styles.section} aria-labelledby={headingId} data-motion-section>
  <div className={styles.chapter}>
    <p className={styles.chapterLabel}>{t('proof.chapter')}</p>
    <h2 className={styles.chapterTitle} id={headingId}>
      {t('proof.title')}
    </h2>
  </div>

  <div className={styles.shell} data-motion-group="proof">
    ...
  </div>
</section>
```

```json
"proof.chapter": "第二幕 / 能力信号",
"proof.title": "先给出你会继续往下看的理由"
```

```json
"proof.chapter": "Act Two / Capability Signals",
"proof.title": "Reasons to keep reading"
```

```css
.chapter {
  width: min(100%, var(--content-max));
  margin: 0 auto 1.5rem;
  display: grid;
  gap: 0.45rem;
}

.chapterLabel {
  color: rgba(229, 233, 255, 0.54);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.chapterTitle {
  max-width: 15ch;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  line-height: 1;
  letter-spacing: -0.05em;
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/components/ProofStrip/index.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/components/ProofStrip/index.jsx src/components/ProofStrip/ProofStrip.module.css src/components/ProofStrip/index.test.jsx src/locales/zh.json src/locales/en.json
git commit -m "feat: reshape proof strip as chapter signal"
```

---

### 任务 3：把 Portfolio 改成主线篇章

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 修改：`src/App.test.jsx`

- [ ] **步骤 1：编写失败的测试**

```jsx
const portfolioSection = screen.getByRole('heading', {
  level: 2,
  name: '主线篇章：代表作',
}).closest('section');

expect(within(portfolioSection).getByText('主篇章')).toBeInTheDocument();
expect(within(portfolioSection).getByText('侧篇章')).toBeInTheDocument();
expect(within(portfolioSection).getByRole('heading', { name: '正畸筛查与状态管理' })).toBeInTheDocument();
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/App.test.jsx`

预期：FAIL，当前 `Portfolio` 标题与标签仍是旧 contract

- [ ] **步骤 3：编写最少实现代码**

```jsx
<div className="section-heading section-heading-episodic" data-motion-item>
  <div>
    <p className="section-kicker">{t('portfolio.kicker')}</p>
    <h2 className="section-title">{t('portfolio.title')}</h2>
  </div>
  <p className="section-intro">{t('portfolio.intro')}</p>
</div>

<div className="portfolio-stage">
  <article className="portfolio-primary" data-motion-item="featured" data-motion-hover="card">
    <p className="portfolio-chapter-label">{t('portfolio.featured')}</p>
    ...
  </article>

  <div className="portfolio-secondary" data-motion-group="portfolio-secondary">
    <p className="portfolio-side-label">{t('portfolio.secondaryLabel')}</p>
    ...
  </div>
</div>
```

```json
"portfolio.title": "主线篇章：代表作",
"portfolio.featured": "主篇章",
"portfolio.secondaryLabel": "侧篇章"
```

```json
"portfolio.title": "Main Episode: Featured Work",
"portfolio.featured": "Lead Episode",
"portfolio.secondaryLabel": "Side Episodes"
```

```css
.section-heading-episodic {
  align-items: end;
}

.portfolio-chapter-label,
.portfolio-side-label {
  color: rgba(229, 233, 255, 0.54);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

- [ ] **步骤 4：运行测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS

- [ ] **步骤 5：Commit**

```bash
git add src/components/Portfolio/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/App.test.jsx
git commit -m "feat: reframe portfolio as main episode"
```

---

### 任务 4：统一章节标题系统与整页节奏

**文件：**
- 修改：`src/styles/global.css`
- 修改：`src/components/About/index.jsx`
- 修改：`src/components/Experience/index.jsx`
- 修改：`src/components/Contact/index.jsx`
- 修改：`src/motion/useHomepageMotion.js`
- 修改：`src/App.test.jsx`

- [ ] **步骤 1：编写失败的测试**

```jsx
test('keeps section order while introducing episodic title rhythm', () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

  expect(screen.getByText('第二幕 / 能力信号')).toBeInTheDocument();
  expect(screen.getByText('主线篇章：代表作')).toBeInTheDocument();
  expect(document.querySelectorAll('[data-motion-section]')).toHaveLength(5);
});
```

- [ ] **步骤 2：运行测试验证失败**

运行：`npm test -- src/App.test.jsx`

预期：FAIL，如果章节 heading 或动效标记数量与新节奏不匹配

- [ ] **步骤 3：编写最少实现代码**

```css
.section-kicker {
  margin-bottom: 0.85rem;
  color: var(--color-text-muted);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
}

.section-title {
  max-width: 12ch;
  line-height: 0.94;
}

.section-heading,
.section-heading-block {
  gap: 1.1rem;
}
```

```jsx
const items = Array.from(section.querySelectorAll('[data-motion-item]'));
const staggerAmount = section.querySelector('[data-motion-group="portfolio-secondary"]') ? 0.08 : 0.12;

gsap.fromTo(
  items,
  reduceMotion ? { autoAlpha: 0 } : { y: 28, autoAlpha: 0 },
  {
    y: 0,
    autoAlpha: 1,
    duration: reduceMotion ? 0.01 : 0.82,
    stagger: reduceMotion ? 0 : staggerAmount,
    ease: 'power3.out',
    ...
  },
);
```

如果 `About / Experience / Contact` 需要微调标题语气，则只调整现有 class 组合，不新增新的结构层级。

- [ ] **步骤 4：运行全量验证**

运行：`npm test && npm run build`

预期：
- `5+` 个测试文件全部 PASS
- Vite 构建 PASS

- [ ] **步骤 5：Commit**

```bash
git add src/styles/global.css src/components/About/index.jsx src/components/Experience/index.jsx src/components/Contact/index.jsx src/motion/useHomepageMotion.js src/App.test.jsx
git commit -m "feat: unify episodic section rhythm"
```

---

## 规格覆盖检查

- `Hero` 作为人物登场：任务 1 覆盖
- `ProofStrip` 作为第二幕能力信号：任务 2 覆盖
- `Portfolio` 作为主线篇章：任务 3 覆盖
- Typography-first + 适量 GSAP 动效：任务 1 和任务 4 覆盖
- section 章节节奏统一：任务 4 覆盖
- 保持作品集专业度、不做实验性长滚动：通过任务边界控制，不引入 pin/scroll hijack
- 保留首页信息架构和区块顺序：所有任务都只改表达层，不改顺序

## 占位符扫描结果

- 未保留 `TODO`、`待定`、`后续实现`、`补充细节` 等占位词
- 每个任务都包含明确文件、测试、命令和 commit 建议

## 类型与命名一致性

- 继续沿用当前动效标记：
  - `data-motion-section`
  - `data-motion-group`
  - `data-motion-item`
  - `data-motion-hover`
- 继续使用现有页面级 hook：`useHomepageMotion`
- 章节语义的新增文案键统一收敛在：
  - `proof.chapter`
  - `portfolio.secondaryLabel`
  - 如需新增 `hero.panel.episode`，中英 locale 必须同步

