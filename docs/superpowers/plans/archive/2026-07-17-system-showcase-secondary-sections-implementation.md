# About / Experience / Contact 的 System Showcase 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页后半部分的 `About / Experience / Contact` 从旧作品集内容区重组为与当前 `GSAP Brand Stage` 首页一致的品牌化后半页系统。

**架构：** `About` 重组为 `Method Statement`，用三块方法模块代替旧的说明型介绍；`Experience` 重组为 `Phase Showcase`，用阶段面板代替线性履历列表；`Contact` 重组为 `Closing Panel`，用强 CTA 面板代替普通联系方式区。布局、文案密度、颜色和动效继续沿用首页已建立的深底 + 亮绿信号系统，但强度低于 `Hero`，以保证整页有层次而不失控。

**技术栈：** React、全局 CSS、GSAP、Vitest、React Testing Library

---

## 文件结构

### 修改文件

- `src/components/About/index.jsx`
  - 重写为 `Method Statement` 结构。
- `src/components/Experience/index.jsx`
  - 重写为 `Phase Showcase` 阶段面板结构。
- `src/components/Contact/index.jsx`
  - 重写为 `Closing Panel` 收尾 CTA 结构。
- `src/styles/global.css`
  - 新增后半页三大区块的新布局、配色、边框、模块与面板样式。
- `src/locales/zh.json`
  - 新增或替换后半页所需的短文案字段。
- `src/locales/en.json`
  - 同步新增英文短文案字段。
- `src/App.test.jsx`
  - 更新首页级断言，以覆盖新骨架。
- `src/motion/useHomepageMotion.js`
  - 调整后半页 reveal 节奏，使其与新的块面结构匹配。
- `src/motion/useHomepageMotion.test.jsx`
  - 同步更新 motion 参数断言。

### 不改文件

- `src/components/Hero/index.jsx`
- `src/components/Portfolio/index.jsx`
- `src/pages/ProjectDetail/index.jsx`
- `src/data/projects.js`

---

### 任务 1：把 About 重组为 Method Statement

**文件：**
- 修改：`src/components/About/index.jsx`
- 修改：`src/styles/global.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：先更新首页测试，把 About 的目标改成方法声明区**

断言目标示意：

```jsx
const aboutSection = screen.getByRole('heading', {
  level: 2,
  name: /Method System|方法系统|How I Build Operating Clarity/i,
}).closest('section');

expect(within(aboutSection).getByText(/Context/i)).toBeInTheDocument();
expect(within(aboutSection).getByText(/Structure/i)).toBeInTheDocument();
expect(within(aboutSection).getByText(/AI Workflow/i)).toBeInTheDocument();
```

- [ ] **步骤 2：运行首页测试，确认旧 About 结构与新断言不一致**

运行：`npm test -- src/App.test.jsx`
预期：FAIL，原因应为旧 `About` 仍是 `lead + body + three points` 的说明式结构。

- [ ] **步骤 3：先写新的 About 短文案 locale 字段**

在 `src/locales/zh.json` 和 `src/locales/en.json` 中新增类似字段：

```json
"about.stage.kicker": "METHOD SYSTEM",
"about.stage.title": "把复杂业务变成可执行系统",
"about.stage.intro": "我不是从页面开始，而是从规则、角色与真实执行条件开始。",
"about.stage.card.1.label": "Context",
"about.stage.card.1.title": "长期复杂场景",
"about.stage.card.1.body": "儿童口腔医疗、门诊经营与数字化系统持续交叉。",
"about.stage.card.2.label": "Structure",
"about.stage.card.2.title": "把问题拆成规则与流程",
"about.stage.card.2.body": "先整理角色关系，再重建系统承接方式。",
"about.stage.card.3.label": "AI Workflow",
"about.stage.card.3.title": "让 AI 真正进入工作流",
"about.stage.card.3.body": "让 AI 参与结构化分析与方案沉淀，而不是停留在表层功能。"
```

- [ ] **步骤 4：重写 About JSX，替换旧说明区结构**

结构示意：

```jsx
<section className="page-section page-section-dark about-stage-section" id="about" data-motion-section>
  <div className="section-shell">
    <div className="about-stage-head" data-motion-item>
      <p className="about-stage-kicker">{t('about.stage.kicker')}</p>
      <h2 className="about-stage-title">{t('about.stage.title')}</h2>
      <p className="about-stage-intro">{t('about.stage.intro')}</p>
    </div>

    <div className="about-stage-grid" data-motion-group="about-stage-grid">
      <article className="about-stage-card" data-motion-item>...</article>
      <article className="about-stage-card" data-motion-item>...</article>
      <article className="about-stage-card" data-motion-item>...</article>
    </div>
  </div>
</section>
```

要求：
- 删除旧 `section-heading-block + about-points` 结构
- 保留 3 个方法事实，但表达压缩
- 标签使用英文短词或中英混合短标，风格与首页一致

- [ ] **步骤 5：在全局样式中为 About 新增方法卡布局**

样式方向示意：

```css
.about-stage-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.about-stage-card {
  border: 1px solid rgba(184, 255, 77, 0.14);
  border-radius: 1.75rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
}
```

要求：
- 视觉语言延续前半页，但强度低于 `Hero`
- About 更像方法论面板，而不是信息卡

- [ ] **步骤 6：运行首页测试确认 About 部分通过**

运行：`npm test -- src/App.test.jsx`
预期：About 相关断言通过，若其他 section 尚未同步可继续失败。

- [ ] **步骤 7：Commit**

```bash
git add src/components/About/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/App.test.jsx
git commit -m "feat: restage about as method statement"
```

---

### 任务 2：把 Experience 重组为 Phase Showcase

**文件：**
- 修改：`src/components/Experience/index.jsx`
- 修改：`src/styles/global.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：更新首页测试，把 Experience 目标改成阶段展示区**

断言目标示意：

```jsx
const experienceSection = screen.getByRole('heading', {
  level: 2,
  name: /Phase Showcase|阶段路径|How The Role Expanded/i,
}).closest('section');

expect(within(experienceSection).getByText('2019 - 2020')).toBeInTheDocument();
expect(within(experienceSection).getByText('2023.04 - 至今')).toBeInTheDocument();
expect(within(experienceSection).getByText(/Design Foundation|设计基础/)).toBeInTheDocument();
```

- [ ] **步骤 2：运行首页测试，确认旧 Experience 结构与新断言不一致**

运行：`npm test -- src/App.test.jsx`
预期：FAIL，原因应为旧 Experience 还是标准 `section-heading + phase-list` 线性结构。

- [ ] **步骤 3：新增 Experience 的 showcase 文案字段**

新增示意：

```json
"experience.stage.kicker": "PHASE SHOWCASE",
"experience.stage.title": "从设计执行到系统判断",
"experience.stage.intro": "四个阶段逐步把我的角色从界面执行者推向复杂系统产品的判断与落地。",
"experience.stage.item.1.short": "界面与系统基础",
"experience.stage.item.2.short": "复杂产品理解",
"experience.stage.item.3.short": "进入产品判断",
"experience.stage.item.4.short": "连接业务与交付"
```

- [ ] **步骤 4：重写 Experience JSX，改成阶段面板**

结构示意：

```jsx
<section className="page-section experience-stage-section" id="experience" data-motion-section>
  <div className="section-shell">
    <div className="experience-stage-head" data-motion-item>...</div>
    <div className="experience-stage-grid" data-motion-group="experience-stage-grid">
      {items.map((item) => (
        <article className="experience-stage-card" data-motion-item key={item}>...</article>
      ))}
    </div>
  </div>
</section>
```

要求：
- 不再使用旧的 `.phase-list`
- 每个阶段只保留时间、标题、短说明
- 至少通过尺寸、强调色或布局建立主次感

- [ ] **步骤 5：在全局样式中实现 Experience 的 showcase 布局**

样式方向示意：

```css
.experience-stage-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.experience-stage-card {
  min-height: 18rem;
  padding: 1.75rem;
}
```

要求：
- 四个阶段不能看起来像四个一模一样的列表项
- 保持与 About/Portfolio 的块面语言统一

- [ ] **步骤 6：运行首页测试确认 Experience 部分通过**

运行：`npm test -- src/App.test.jsx`
预期：Experience 相关断言通过。

- [ ] **步骤 7：Commit**

```bash
git add src/components/Experience/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/App.test.jsx
git commit -m "feat: rebuild experience as phase showcase"
```

---

### 任务 3：把 Contact 重组为 Closing Panel

**文件：**
- 修改：`src/components/Contact/index.jsx`
- 修改：`src/styles/global.css`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`
- 测试：`src/App.test.jsx`

- [ ] **步骤 1：更新首页测试，把 Contact 目标改成收尾 CTA 面板**

断言目标示意：

```jsx
const contactSection = screen.getByRole('heading', {
  level: 2,
  name: /Let’s Build What Complex Teams Can Actually Use|如果你要推进复杂产品，就来联系我/i,
}).closest('section');

expect(within(contactSection).getByRole('link', { name: 'wmeng0219@gmail.com' })).toHaveAttribute(
  'href',
  'mailto:wmeng0219@gmail.com',
);
```

- [ ] **步骤 2：运行首页测试，确认旧 Contact 结构与新断言不一致**

运行：`npm test -- src/App.test.jsx`
预期：FAIL

- [ ] **步骤 3：新增 Contact 的 closing panel 文案字段**

新增示意：

```json
"contact.stage.kicker": "LET'S BUILD",
"contact.stage.title": "如果你要推进复杂产品，就来联系我。",
"contact.stage.body": "适合讨论流程复杂、协作困难、需要系统化落地的产品问题。",
"contact.stage.emailLabel": "EMAIL",
"contact.stage.wechatLabel": "WECHAT / PHONE"
```

- [ ] **步骤 4：重写 Contact JSX，改成强收尾面板**

结构示意：

```jsx
<section className="page-section contact-stage-section" id="contact" data-motion-section>
  <div className="section-shell contact-stage-shell" data-motion-item>
    <p className="contact-stage-kicker">{t('contact.stage.kicker')}</p>
    <h2 className="contact-stage-title">{t('contact.stage.title')}</h2>
    <p className="contact-stage-intro">{t('contact.stage.body')}</p>

    <div className="contact-stage-actions" data-motion-group="contact-stage-actions">
      <a className="contact-stage-link" data-motion-item href={`mailto:${t('contact.email')}`}>...</a>
      <div className="contact-stage-link" data-motion-item>...</div>
    </div>
  </div>
</section>
```

要求：
- 联系方式仍然准确
- 视觉上更像“最后一步行动邀请”
- 至少一个联系入口可点击

- [ ] **步骤 5：在全局样式中实现 Contact 收尾面板**

样式方向示意：

```css
.contact-stage-shell {
  border: 1px solid rgba(184, 255, 77, 0.16);
  border-radius: 2rem;
  padding: clamp(2rem, 5vw, 4rem);
  background: linear-gradient(180deg, rgba(184, 255, 77, 0.06), rgba(255, 255, 255, 0.02));
}
```

要求：
- Contact 的视觉收束力高于当前版
- 但不要强过 `Hero`

- [ ] **步骤 6：运行首页测试确认 Contact 部分通过**

运行：`npm test -- src/App.test.jsx`
预期：Contact 相关断言通过。

- [ ] **步骤 7：Commit**

```bash
git add src/components/Contact/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/App.test.jsx
git commit -m "feat: reshape contact into closing panel"
```

---

### 任务 4：同步后半页动效并做总验证

**文件：**
- 修改：`src/motion/useHomepageMotion.js`
- 修改：`src/motion/useHomepageMotion.test.jsx`
- 验证：`src/components/About/index.jsx`
- 验证：`src/components/Experience/index.jsx`
- 验证：`src/components/Contact/index.jsx`
- 验证：`src/styles/global.css`

- [ ] **步骤 1：更新 motion 测试，覆盖 About / Experience / Contact 的新 reveal 节奏**

测试示意：

```jsx
expect(fromTo).toHaveBeenCalledWith(
  expect.arrayContaining([expect.any(HTMLElement)]),
  expect.objectContaining({ y: 48, autoAlpha: 0 }),
  expect.objectContaining({
    stagger: 0.1,
    scrollTrigger: expect.objectContaining({ start: 'top 84%' }),
  }),
);
```

如果 Experience 或 Contact 需要单独更强的 reveal，可为对应 section 添加特定断言。

- [ ] **步骤 2：运行 motion 单测，确认现有参数与新断言不一致**

运行：`npm test -- src/motion/useHomepageMotion.test.jsx`
预期：FAIL

- [ ] **步骤 3：调整 `useHomepageMotion.js`，让后半页更适配新块面结构**

方向示意：

```js
const isPortfolioSection = Boolean(section.querySelector('[data-motion-group="portfolio-stage"]'));
const isStageDenseSection = Boolean(
  section.querySelector('.about-stage-grid, .experience-stage-grid, .contact-stage-actions'),
);

const fromVars = reduceMotion
  ? { autoAlpha: 0 }
  : { y: isPortfolioSection ? 64 : isStageDenseSection ? 48 : 36, autoAlpha: 0 };
```

要求：
- 后半页 reveal 稍强于普通 section，但弱于 Hero 开场
- hover 继续沿用当前品牌站语言

- [ ] **步骤 4：运行单测与全量测试**

运行：
- `npm test -- src/motion/useHomepageMotion.test.jsx`
- `npm test`

预期：全部通过。

- [ ] **步骤 5：运行构建**

运行：`npm run build`
预期：构建成功。

- [ ] **步骤 6：本地预览核对**

运行：`npm run dev -- --host 0.0.0.0`

人工确认：
- About 看起来像方法声明
- Experience 看起来像阶段 showcase
- Contact 看起来像收尾 CTA 面板
- 整页风格连续，不像前半页和后半页来自两个系统

- [ ] **步骤 7：最终 Commit**

```bash
git add src/components/About/index.jsx src/components/Experience/index.jsx src/components/Contact/index.jsx src/styles/global.css src/locales/zh.json src/locales/en.json src/App.test.jsx src/motion/useHomepageMotion.js src/motion/useHomepageMotion.test.jsx
git commit -m "feat: restage secondary sections into system showcase"
```
