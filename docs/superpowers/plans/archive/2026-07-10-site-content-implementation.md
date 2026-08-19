# 网站页面内容落地 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按 `docs/superpowers/specs/2026-07-10-site-content-structure-design.md` 的内容结构要求，将首页 `Hero / About / Experience / Contact` 的页面表达对齐到现有文档口径，并保持当前 `Portfolio` 作为最成熟的能力证明区块。

**架构：** 保持现有 React 组件结构与动效实现不变，优先通过 `src/locales/zh.json` 与 `src/locales/en.json` 重写内容，再用测试锁定新的内容职责。只在文案长度导致布局明显失衡时，才对组件或全局样式做最小调整。

**技术栈：** React 18、Vite 5、Vitest、React Testing Library、i18n locale JSON、CSS Modules、全局 CSS

---

## 文件结构

### 需要修改

- `/Users/wen/Desktop/Portfolio/src/locales/zh.json`
  - 将 `Hero / About / Experience / Contact` 对齐到页面内容规格中的区块职责与表达边界
- `/Users/wen/Desktop/Portfolio/src/locales/en.json`
  - 同步英文结构与信息层级
- `/Users/wen/Desktop/Portfolio/src/App.test.jsx`
  - 锁定整页区块是否承载了新的内容结构
- `/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`
  - 锁定 `Hero` 的身份表述与辅助信息边界

### 可能修改

- `/Users/wen/Desktop/Portfolio/src/components/About/index.jsx`
  - 如果当前三卡结构不足以承载新的内容职责，再做最小标记调整
- `/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
  - 如果需要增加阶段时间信息或说明层级，再做最小结构调整
- `/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
  - 如果需要把联系方式从正文中收束为更明确的主次渠道，再做最小调整
- `/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
  - 如果新的 `Hero` 内容在中文下出现拥挤或不自然换行，再做最小排版调整
- `/Users/wen/Desktop/Portfolio/src/styles/global.css`
  - 如 `About / Experience / Contact` 因新文案长度导致节奏失衡，再做最小排版收束

### 参考文档

- `/Users/wen/Desktop/Portfolio/docs/superpowers/specs/2026-07-10-site-content-structure-design.md`
- `/Users/wen/Desktop/Portfolio/docs/site/content-map.md`
- `/Users/wen/Desktop/Portfolio/docs/site/README.md`

---

### 任务 1：先锁定整页内容职责测试

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`

- [ ] **步骤 1：先让 `Hero` 测试变红，锁定主身份与一句话定位**

```jsx
expect(
  screen.getByRole('heading', {
    level: 1,
    name: '产品经理与设计复合型实践者',
  }),
).toBeInTheDocument();
expect(
  screen.getByText('从复杂 B 端产品设计出发，连接业务、产品、流程与数字化建设。'),
).toBeInTheDocument();
expect(screen.queryByText('复杂问题')).not.toBeInTheDocument();
```

- [ ] **步骤 2：运行 `Hero` 测试验证失败**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：FAIL，当前 `Hero` 仍使用旧的主身份与正文表达，且还保留旧的辅助信号体系。

- [ ] **步骤 3：补整页失败断言，锁定 `About / Experience / Contact` 的职责变化**

```jsx
const aboutSection = screen.getByRole('heading', {
  level: 2,
  name: '把业务理解、流程设计与协作推进放进同一套产品方法里',
}).closest('section');
expect(within(aboutSection).getByText('长期场景')).toBeInTheDocument();
expect(within(aboutSection).getByText('工作方式')).toBeInTheDocument();
expect(within(aboutSection).getByText('能力结构')).toBeInTheDocument();

const experienceSection = screen.getByRole('heading', {
  level: 2,
  name: '跨设计、产品与业务现场。',
}).closest('section');
expect(within(experienceSection).getByText('2019 - 2020')).toBeInTheDocument();
expect(within(experienceSection).getByText('2023.04 - 至今')).toBeInTheDocument();

const contactSection = screen.getByRole('heading', {
  level: 2,
  name: '如果你希望一起推进复杂业务产品，欢迎联系我。',
}).closest('section');
expect(within(contactSection).getByText('主联系渠道')).toBeInTheDocument();
expect(within(contactSection).queryByText('回到顶部')).not.toBeInTheDocument();
```

- [ ] **步骤 4：运行整页测试验证失败**

运行：`npm test -- src/App.test.jsx`

预期：FAIL，当前 `About / Experience / Contact` 仍是旧的内容口径与展示方式。

- [ ] **步骤 5：Commit**

```bash
git add src/components/Hero/index.test.jsx src/App.test.jsx
git commit -m "test: lock homepage content structure contract"
```

### 任务 2：重写 `Hero / About` 的内容表达

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/components/Hero/Hero.module.css`
- 测试：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.test.jsx`

- [ ] **步骤 1：把 `Hero` 重写为“主身份 + 一句话定位 + 辅助标签”**

```json
{
  "hero.meta.role": "产品经理与设计复合型实践者",
  "hero.body": "从复杂 B 端产品设计出发，连接业务、产品、流程与数字化建设。",
  "hero.signal.1": "医疗数字化",
  "hero.signal.2": "流程设计",
  "hero.signal.3": "AI 工作流实践"
}
```

英文同步保持同一层级：

```json
{
  "hero.meta.role": "Product Manager with a Design Background",
  "hero.body": "Starting from complex B2B product design, I connect business, product thinking, workflow design, and digital delivery.",
  "hero.signal.1": "Healthcare digitization",
  "hero.signal.2": "Workflow design",
  "hero.signal.3": "AI workflow practice"
}
```

- [ ] **步骤 2：把 `About` 重写成“长期场景 / 工作方式 / 能力结构”**

```json
{
  "about.title": "把业务理解、流程设计与协作推进放进同一套产品方法里",
  "about.lead": "我长期处在儿童口腔医疗数字化与门诊经营场景里，处理的不是孤立页面，而是牵涉规则、角色和真实执行条件的系统问题。",
  "about.body": "我的工作通常从一线问题出发，把业务现象拆成可判断的结构，再组织成流程、系统与协作方案。",
  "about.point.1.label": "长期场景",
  "about.point.1.title": "儿童口腔医疗与门诊数字化",
  "about.point.1.body": "持续处理医生工作流、会员经营、收费流程与专业诊疗相关的复杂系统场景。",
  "about.point.2.label": "工作方式",
  "about.point.2.title": "从一线问题到系统方案",
  "about.point.2.body": "先看业务现场和角色关系，再把问题整理成流程、规则与系统承接方式。",
  "about.point.3.label": "能力结构",
  "about.point.3.title": "设计、产品、业务协同并进",
  "about.point.3.body": "既能判断表达质量，也能处理需求分析、结构设计与跨团队推进。"
}
```

- [ ] **步骤 3：如果 `Hero` 中文换行明显变差，再做最小样式调整**

```css
.roleTitle {
  max-width: 15ch;
}

.body {
  max-width: 34rem;
  line-height: 1.84;
}
```

只在实际渲染后确认必要时才修改样式。

- [ ] **步骤 4：运行 `Hero` 测试验证通过**

运行：`npm test -- src/components/Hero/index.test.jsx`

预期：PASS，`Hero` 的身份与正文已经切换到新的内容结构。

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json src/locales/en.json src/components/Hero/index.test.jsx src/components/Hero/Hero.module.css
git commit -m "feat: align hero and about copy with site content structure"
```

### 任务 3：重写 `Experience / Contact` 的内容层级

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：把 `Experience` 对齐到阶段式成长路径**

```json
{
  "experience.title": "跨设计、产品与业务现场。",
  "experience.intro": "我的成长不是岗位名称的变化，而是逐步从设计执行走向复杂业务理解、产品方案判断与落地推进。",
  "experience.item.1.period": "2019 - 2020",
  "experience.item.1.title": "设计基础",
  "experience.item.1.body": "从 UI 设计进入数字化项目，建立视觉表达、界面规范与组件化基础。",
  "experience.item.2.period": "2020 - 2022",
  "experience.item.2.title": "复杂产品",
  "experience.item.2.body": "从页面设计走向信息架构与复杂业务理解，产品思维逐步形成。",
  "experience.item.3.period": "2023.04 - 至今",
  "experience.item.3.title": "产品与落地",
  "experience.item.3.body": "在儿童口腔医疗数字化场景中承担产品经理 / ITBP 角色，让数字化方案真正发生。"
}
```

- [ ] **步骤 2：把 `Contact` 收束为主联系渠道，不再混入回顶链接**

如果保持组件最小改动，则改文案为：

```json
{
  "contact.title": "如果你希望一起推进复杂业务产品，欢迎联系我。",
  "contact.body": "适合交流复杂流程产品、服务协同、数字化落地，以及如何让团队对问题形成更清晰的一致理解。",
  "contact.primary": "发送邮件",
  "contact.secondary": "主联系渠道"
}
```

如果需要让“回到顶部”退出主区块表达，则最小调整组件为：

```jsx
<div className="contact-actions" data-motion-item>
  <a className="primary-link" href={`mailto:${t('contact.email')}`} data-motion-hover="button">
    {t('contact.primary')}
  </a>
</div>
<p className="contact-label" data-motion-item>{t('contact.secondary')}</p>
<span className="contact-email" data-motion-item>{t('contact.email')}</span>
```

- [ ] **步骤 3：同步英文结构**

```json
{
  "experience.title": "Across design, product, and the business floor.",
  "experience.intro": "My growth is less about job titles and more about moving from design execution into business understanding, product judgment, and delivery.",
  "experience.item.1.period": "2019 - 2020",
  "experience.item.3.period": "2023.04 - Present",
  "contact.title": "If you want to move a complex product forward together, feel free to reach out.",
  "contact.secondary": "Primary contact channel"
}
```

- [ ] **步骤 4：运行整页测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，`About / Experience / Contact` 已经与规格的内容职责对齐。

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json src/locales/en.json src/components/Experience/index.jsx src/components/Contact/index.jsx src/App.test.jsx
git commit -m "feat: align experience and contact content with site docs"
```

### 任务 4：整页回归与内容节奏检查

**文件：**
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Hero/index.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/About/index.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
- 可能修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`

- [ ] **步骤 1：如果新文案导致 `About / Experience / Contact` 节奏过紧，做最小全局收束**

```css
.section-intro,
.contact-intro,
.phase-body,
.about-card-body {
  line-height: 1.8;
}

.phase-card,
.about-card {
  gap: 0.7rem;
}
```

仅在实际页面节奏被明显压坏时才加入。

- [ ] **步骤 2：运行完整测试套件**

运行：`npm test`

预期：PASS，整站测试继续全部通过。

- [ ] **步骤 3：运行生产构建**

运行：`npm run build`

预期：PASS，生产构建成功，无编译错误。

- [ ] **步骤 4：人工检查首页内容是否满足规格**

运行：`npm run dev -- --host 0.0.0.0`

重点检查：

- `Hero` 是否先建立主身份，再补一句话定位
- `About` 是否不再像自我评价，而更像工作方式说明
- `Experience` 是否更像成长阶段，而不是岗位摘要
- `Contact` 是否只保留可信、清晰的主联系出口
- `Portfolio` 是否仍是首页最成熟、最有证明力的区块

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json src/locales/en.json src/components/Hero/Hero.module.css src/components/Contact/index.jsx src/components/Experience/index.jsx src/styles/global.css src/App.test.jsx src/components/Hero/index.test.jsx
git commit -m "refactor: align homepage copy with site content structure"
```

## 自检

### 规格覆盖度

- 各区块内容职责边界：由任务 1、任务 2、任务 3 覆盖
- 首页与文档层内容分层：由任务 2、任务 3、任务 4 覆盖
- `Hero / About / Experience / Contact` 的内容来源与表达边界：由任务 2、任务 3 覆盖
- 维持 `Portfolio` 作为最成熟能力证明区：由任务 4 的人工检查覆盖

### 占位符扫描

- 未使用 `TODO`、`待定`、`后续补充`
- 每个任务都包含明确文件、命令、预期结果与代码片段
- 未使用“类似任务 N”的隐式跳步写法

### 类型一致性

- 继续沿用现有 locale key 体系，不新增无必要的组件数据层
- `Hero / About / Experience / Contact` 的调整优先落在 `locales`，组件只做最小结构修正
- 测试断言以最终渲染文案为准，不依赖内部实现细节

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-10-site-content-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
