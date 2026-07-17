# 首页 Portfolio 项目文案重构 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页 `Portfolio` 三个项目卡从摘要式写法重构为“原有混乱 - 我重构了什么 - 结果”的系统重构型叙事，同时保持首页阅读节奏。

**架构：** 保持当前 `Portfolio` 组件结构不变，优先通过重写 `portfolio.item.*` 文案完成内容升级。先用测试锁定三段式表达，再修改中英文 locale；若新文案导致首页项目卡版式失衡，再对 `global.css` 做最小排版调整。

**技术栈：** React 18、Vite 5、Vitest、React Testing Library、i18n locale JSON、CSS

---

## 文件结构

### 需要修改

- `/Users/wen/Desktop/Portfolio/src/locales/zh.json`
  - 重写三个项目的标签、正文与结果文案，统一为系统重构型表达
- `/Users/wen/Desktop/Portfolio/src/locales/en.json`
  - 同步英文结构，保持与中文键值一致
- `/Users/wen/Desktop/Portfolio/src/App.test.jsx`
  - 锁定首页 `Portfolio` 的新文案结构与关键句

### 可能修改

- `/Users/wen/Desktop/Portfolio/src/styles/global.css`
  - 如果新文案长度造成项目卡节奏失衡，则做最小排版调整

### 参考文档

- `/Users/wen/Desktop/Portfolio/docs/project/正畸筛查与状态管理.md`
- `/Users/wen/Desktop/Portfolio/docs/project/会员自动化.md`
- `/Users/wen/Desktop/Portfolio/docs/project/PACS读片与AI辅助判断.md`

---

### 任务 1：先锁定首页项目区的新叙事结构测试

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：为主篇章写失败断言，锁定“问题 - 重构 - 结果”三段式表达**

```jsx
const featuredCard = within(portfolioSection).getByText('主篇章').closest('article');

expect(
  within(featuredCard).getByText('原有正畸前置管理依赖面评会与线下沟通，筛查、结论和后续推进缺少连续承接。'),
).toBeInTheDocument();
expect(
  within(featuredCard).getByText('我把推荐逻辑、再筛查机制、正畸状态与多角色协作整理进同一条系统流程。'),
).toBeInTheDocument();
expect(
  within(featuredCard).getByText('最终建立了从推荐到预约的可追踪漏斗，让前置管理第一次成为连续机制。'),
).toBeInTheDocument();
```

- [ ] **步骤 2：为两个侧篇章写失败断言，锁定统一句式**

```jsx
expect(
  within(portfolioSection).getByText('会员、卡券、收费和账单彼此独立，一线靠经验操作，财务靠人工核对。'),
).toBeInTheDocument();
expect(
  within(portfolioSection).getByText('我梳理会员卡、优惠、收费与对账关系，并把高频会员流程改成系统自动承接。'),
).toBeInTheDocument();
expect(
  within(portfolioSection).getByText('纯人工读片缺少系统留痕与质控，拍片利用率和诊断行为都无法追踪。'),
).toBeInTheDocument();
expect(
  within(portfolioSection).getByText('我先把读片变成结构化记录流程，再建立 AI 标记、医生复核、差异回收的人机协作机制。'),
).toBeInTheDocument();
```

- [ ] **步骤 3：运行整页测试验证失败**

运行：`npm test -- src/App.test.jsx`

预期：FAIL，当前首页项目区仍然使用旧的摘要式文案，无法匹配新的三段式表达。

- [ ] **步骤 4：Commit**

```bash
git add src/App.test.jsx
git commit -m "test: lock portfolio system-story copy contract"
```

### 任务 2：把三份项目主稿压缩成首页三段式中文文案

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：重写主篇章项目的标签、正文与结果**

```json
{
  "portfolio.item.2.tag": "主流程重构 / 筛查机制",
  "portfolio.item.2.body": "原有正畸前置管理依赖面评会与线下沟通，筛查、结论和后续推进缺少连续承接。",
  "portfolio.item.2.result": "最终建立了从推荐到预约的可追踪漏斗，让前置管理第一次成为连续机制。"
}
```

为保证“三段式”完整，新增一条专门承载“我重构了什么”的 key：

```json
{
  "portfolio.item.2.reframe": "我把推荐逻辑、再筛查机制、正畸状态与多角色协作整理进同一条系统流程。"
}
```

- [ ] **步骤 2：重写会员自动化项目的中文表达**

```json
{
  "portfolio.item.1.tag": "规则系统 / 会员自动化",
  "portfolio.item.1.body": "会员、卡券、收费和账单彼此独立，一线靠经验操作，财务靠人工核对。",
  "portfolio.item.1.reframe": "我梳理会员卡、优惠、收费与对账关系，并把高频会员流程改成系统自动承接。",
  "portfolio.item.1.result": "最终让一线处理显著提效，对账从全量人工核对转向异常抽检。"
}
```

- [ ] **步骤 3：重写 PACS 项目的中文表达**

```json
{
  "portfolio.item.3.tag": "专业流程 / AI 协作",
  "portfolio.item.3.body": "纯人工读片缺少系统留痕与质控，拍片利用率和诊断行为都无法追踪。",
  "portfolio.item.3.reframe": "我先把读片变成结构化记录流程，再建立 AI 标记、医生复核、差异回收的人机协作机制。",
  "portfolio.item.3.result": "最终让检出率提升，同时把读片、病历同步与管理追踪纳入同一闭环。"
}
```

- [ ] **步骤 4：运行整页测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，首页项目区能匹配新的系统重构型中文表达。

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json src/App.test.jsx
git commit -m "feat: rewrite portfolio copy around system-level stories"
```

### 任务 3：同步英文结构并接入新的 reframe 文案入口

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：在 `Portfolio` 组件中补上新的 `reframe` 段落渲染**

```jsx
<article className="portfolio-primary" data-motion-item="featured" data-motion-hover="card">
  <p className="portfolio-chapter-label">{t('portfolio.featured')}</p>
  <p className="portfolio-tag">{t(`portfolio.item.${featuredItem}.tag`)}</p>
  <h3 className="portfolio-primary-title">{t(`portfolio.item.${featuredItem}.title`)}</h3>
  <p className="portfolio-primary-body">{t(`portfolio.item.${featuredItem}.body`)}</p>
  <p className="portfolio-primary-body">{t(`portfolio.item.${featuredItem}.reframe`)}</p>
  <p className="portfolio-result">{t(`portfolio.item.${featuredItem}.result`)}</p>
</article>
```

侧篇章同样接入：

```jsx
<article className="portfolio-card" key={item} data-motion-item data-motion-hover="card">
  <p className="portfolio-tag">{t(`portfolio.item.${item}.tag`)}</p>
  <h3 className="portfolio-card-title">{t(`portfolio.item.${item}.title`)}</h3>
  <p className="portfolio-card-body">{t(`portfolio.item.${item}.body`)}</p>
  <p className="portfolio-card-body">{t(`portfolio.item.${item}.reframe`)}</p>
  <p className="portfolio-result">{t(`portfolio.item.${item}.result`)}</p>
</article>
```

- [ ] **步骤 2：同步英文 locale，保持相同结构**

```json
{
  "portfolio.item.2.tag": "Core Flow Redesign / Screening System",
  "portfolio.item.2.body": "Orthodontic pre-management relied on review events and offline coordination, leaving screening, conclusions, and follow-up disconnected.",
  "portfolio.item.2.reframe": "I turned recommendation rules, re-screening logic, orthodontic status, and multi-role collaboration into one continuous system flow.",
  "portfolio.item.2.result": "The result was a traceable funnel from recommendation to appointment, turning pre-management into a continuous mechanism."
}
```

```json
{
  "portfolio.item.1.tag": "Rule System / Member Automation",
  "portfolio.item.1.body": "Membership, coupons, payments, and billing were disconnected, leaving frontline teams to improvise and finance to reconcile manually.",
  "portfolio.item.1.reframe": "I reorganized card, discount, payment, and reconciliation rules, then moved frequent member workflows into system automation.",
  "portfolio.item.1.result": "The result was faster frontline handling and a shift from full manual reconciliation to exception-based checking."
}
```

```json
{
  "portfolio.item.3.tag": "Specialist Workflow / AI Collaboration",
  "portfolio.item.3.body": "Pure manual image reading lacked system traceability and quality control, making utilization and diagnostic behavior hard to track.",
  "portfolio.item.3.reframe": "I first turned image reading into a structured record flow, then built a human-AI loop around AI marks, doctor review, and feedback recovery.",
  "portfolio.item.3.result": "The result improved detection while bringing image reading, chart sync, and management tracking into one closed loop."
}
```

- [ ] **步骤 3：更新整页测试，使其断言新的 `reframe` 段也被渲染**

```jsx
expect(
  within(featuredCard).getByText('我把推荐逻辑、再筛查机制、正畸状态与多角色协作整理进同一条系统流程。'),
).toBeInTheDocument();
```

并保留两个侧篇章对应断言。

- [ ] **步骤 4：运行整页测试验证通过**

运行：`npm test -- src/App.test.jsx`

预期：PASS，确认 `Portfolio` 已经接入新的三段式文案结构。

- [ ] **步骤 5：Commit**

```bash
git add src/components/Portfolio/index.jsx src/locales/en.json src/App.test.jsx
git commit -m "feat: add structured portfolio story copy"
```

### 任务 4：检查项目卡排版并做最小样式收束

**文件：**
- 可能修改：`/Users/wen/Desktop/Portfolio/src/styles/global.css`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/en.json`

- [ ] **步骤 1：如果三段式文案让卡片显得过紧，先做最小样式调整**

```css
.portfolio-primary,
.portfolio-card {
  gap: 0.8rem;
}

.portfolio-primary-body,
.portfolio-card-body {
  line-height: 1.74;
}

.portfolio-result {
  margin-top: 0.25rem;
}
```

仅在实际渲染后确认有必要时才添加，避免无意义改样式。

- [ ] **步骤 2：运行完整测试套件**

运行：`npm test`

预期：PASS，现有首页测试全部通过。

- [ ] **步骤 3：运行生产构建**

运行：`npm run build`

预期：PASS，生产构建成功，无编译错误。

- [ ] **步骤 4：人工检查首页项目区**

运行：`npm run dev -- --host 0.0.0.0`

重点检查：

- 三张项目卡都能读出“原有混乱 - 我重构了什么 - 结果”
- 主篇章与侧篇章的信息量更完整，但首页节奏仍然轻
- 中文换行没有被新文案压坏
- 英文结构和中文保持一致，没有缺 key 或文案错位

- [ ] **步骤 5：Commit**

```bash
git add src/components/Portfolio/index.jsx src/locales/zh.json src/locales/en.json src/styles/global.css src/App.test.jsx
git commit -m "refactor: refine homepage portfolio story content"
```

## 自检

### 规格覆盖度

- 三项目统一改成系统重构型叙事：由任务 1、任务 2、任务 3 覆盖
- 三段式结构 `问题 - 重构 - 结果`：由任务 1、任务 3 覆盖
- 标签用于问题类型识别：由任务 2、任务 3 覆盖
- 保持首页节奏，不扩详情页：由任务 4 覆盖
- 中英文结构一致：由任务 3 覆盖

### 占位符扫描

- 未使用 `TODO`、`待定`、`后续补充`
- 每个任务包含明确文件、命令、预期结果与代码片段
- 未使用“类似任务 N”类的隐式引用

### 类型一致性

- 新增文案字段统一使用 `portfolio.item.N.reframe`
- `Portfolio` 组件中主篇章与侧篇章都按相同键名读取
- 中英文 locale 的 key 结构完全一致
- `App.test.jsx` 断言围绕渲染结果，而不是实现细节

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-10-homepage-portfolio-copy-refinement-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
