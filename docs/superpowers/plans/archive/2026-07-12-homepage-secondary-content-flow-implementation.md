# 首页剩余内容章节推进 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将首页剩余内容层按“克制的章节推进”方案落到页面表达层，重点统一 `ProofStrip`、导航标签与各区块章节标签的语言系统。

**架构：** 保持现有首页组件结构与动效逻辑不变，优先通过 `src/locales/zh.json` 与 `src/locales/en.json` 调整章节命名和 `ProofStrip` 文案。先用测试锁定新 contract，再最小修改 locale，最后做整页回归与人工检查。

**技术栈：** React 18、Vite 5、Vitest、React Testing Library、i18n locale JSON、CSS Modules、全局 CSS

---

## 文件结构

### 需要修改

- `/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.test.jsx`
  - 锁定 `ProofStrip` 新的章节职责与三张证据卡文案
- `/Users/wen/Desktop/Portfolio/src/components/Navbar/index.test.jsx`
  - 锁定导航从传统简历式命名切换为目录式命名
- `/Users/wen/Desktop/Portfolio/src/App.test.jsx`
  - 锁定首页整体章节链条与区块标签的一致性
- `/Users/wen/Desktop/Portfolio/src/locales/zh.json`
  - 落地中文导航、章节标签与 `ProofStrip` 新文案
- `/Users/wen/Desktop/Portfolio/src/locales/en.json`
  - 同步英文结构与语义层级

### 主要验证

- `/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.jsx`
  - 现有结构应可直接消费新的 `proof.*` 文案键，无需改组件
- `/Users/wen/Desktop/Portfolio/src/components/Navbar/index.jsx`
  - 现有结构应可直接消费新的 `nav.*` 文案键，无需改组件
- `/Users/wen/Desktop/Portfolio/src/components/About/index.jsx`
  - `about.kicker` 应直接映射新的章节标签
- `/Users/wen/Desktop/Portfolio/src/components/Experience/index.jsx`
  - `experience.kicker` 应直接映射新的章节标签
- `/Users/wen/Desktop/Portfolio/src/components/Portfolio/index.jsx`
  - `portfolio.kicker` 与 `portfolio.title` 需要形成新的主线篇章表达
- `/Users/wen/Desktop/Portfolio/src/components/Contact/index.jsx`
  - `contact.kicker` 应收束为尾声标签

### 参考文档

- `/Users/wen/Desktop/Portfolio/docs/superpowers/specs/2026-07-12-homepage-secondary-content-flow-design.md`
- `/Users/wen/Desktop/Portfolio/docs/superpowers/specs/2026-07-10-site-content-structure-design.md`
- `/Users/wen/Desktop/Portfolio/docs/site/content-map.md`

---

### 任务 1：先锁定首页剩余内容层的新 contract

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/components/Navbar/index.test.jsx`
- 修改：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：把 `ProofStrip` 测试改成新的章节推进表达**

```jsx
expect(
  screen.getByRole('heading', {
    level: 2,
    name: '继续往下看的三个理由',
  }),
).toBeInTheDocument();
expect(screen.getByText('第二幕 / 能力信号')).toBeInTheDocument();
expect(screen.getByText('先把复杂问题看清')).toBeInTheDocument();
expect(screen.getByText('让多角色协作真正推进')).toBeInTheDocument();
expect(screen.getByText('兼顾表达质量与真实交付')).toBeInTheDocument();
```

- [ ] **步骤 2：运行 `ProofStrip` 测试验证失败**

运行：`npm test -- src/components/ProofStrip/index.test.jsx`

预期：FAIL，当前 `proof.title` 和三张卡标题仍是旧文案。

- [ ] **步骤 3：把 `Navbar` 与整页测试改成新的目录式命名与章节标签**

```jsx
expect(screen.queryByRole('link', { name: '方法' })).not.toBeInTheDocument();

await user.click(screen.getByRole('button', { name: '菜单' }));

expect(screen.getByRole('link', { name: '方法' })).toHaveAttribute('href', '#about');
expect(screen.getByRole('link', { name: '路径' })).toHaveAttribute('href', '#experience');
expect(screen.getByRole('link', { name: '案例' })).toHaveAttribute('href', '#portfolio');
expect(screen.getByRole('link', { name: '联系' })).toHaveAttribute('href', '#contact');
```

```jsx
expect(within(aboutSection).getByText('第三幕 / 方法')).toBeInTheDocument();
expect(within(experienceSection).getByText('第四幕 / 路径')).toBeInTheDocument();
expect(within(portfolioSection).getByText('主线篇章 / 案例')).toBeInTheDocument();
expect(within(contactSection).getByText('尾声 / 联系')).toBeInTheDocument();
expect(
  screen.getByRole('heading', {
    level: 2,
    name: '代表案例',
  }),
).toBeInTheDocument();
```

- [ ] **步骤 4：运行 `Navbar` 与整页测试验证失败**

运行：`npm test -- src/components/Navbar/index.test.jsx src/App.test.jsx`

预期：FAIL，当前导航仍是 `关于 / 经历 / 作品 / 联系`，区块标签仍是旧命名，`Portfolio` 标题也还是旧文案。

- [ ] **步骤 5：Commit**

```bash
git add src/components/ProofStrip/index.test.jsx src/components/Navbar/index.test.jsx src/App.test.jsx
git commit -m "test: lock homepage secondary content flow contract"
```

### 任务 2：落地中文章节命名与 `ProofStrip` 新文案

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 测试：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.test.jsx`
- 测试：`/Users/wen/Desktop/Portfolio/src/components/Navbar/index.test.jsx`
- 测试：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`

- [ ] **步骤 1：更新中文导航与章节标签**

```json
{
  "nav.about": "方法",
  "nav.experience": "路径",
  "nav.portfolio": "案例",
  "nav.contact": "联系",
  "about.kicker": "第三幕 / 方法",
  "experience.kicker": "第四幕 / 路径",
  "portfolio.kicker": "主线篇章 / 案例",
  "portfolio.title": "代表案例",
  "contact.kicker": "尾声 / 联系"
}
```

- [ ] **步骤 2：把 `ProofStrip` 改成“继续阅读的三个理由”**

```json
{
  "proof.chapter": "第二幕 / 能力信号",
  "proof.title": "继续往下看的三个理由",
  "proof.item.1.label": "看清问题",
  "proof.item.1.title": "先把复杂问题看清",
  "proof.item.1.body": "把业务、流程与角色关系拆成团队可以共同判断的结构。",
  "proof.item.2.label": "推动协作",
  "proof.item.2.title": "让多角色协作真正推进",
  "proof.item.2.body": "在产品、业务与一线执行之间建立共识、节奏与承接。",
  "proof.item.3.label": "落地平衡",
  "proof.item.3.title": "兼顾表达质量与真实交付",
  "proof.item.3.body": "让方案既能成立于纸面，也能真正落进系统、流程与现场。"
}
```

- [ ] **步骤 3：运行目标测试验证通过**

运行：`npm test -- src/components/ProofStrip/index.test.jsx src/components/Navbar/index.test.jsx src/App.test.jsx`

预期：PASS，中文首页已体现新的章节推进关系。

- [ ] **步骤 4：检查是否需要改组件代码**

运行前先阅读：

```jsx
<p className={styles.chapterLabel}>{t('proof.chapter')}</p>
<p className="section-kicker">{t('about.kicker')}</p>
<p className="section-kicker">{t('experience.kicker')}</p>
<p className="section-kicker">{t('portfolio.kicker')}</p>
<p className="section-kicker">{t('contact.kicker')}</p>
```

预期：不需要修改组件结构，现有组件可直接消费新的 locale 文案。

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json
git commit -m "feat: align homepage chapter flow copy in zh locale"
```

### 任务 3：同步英文章节命名与 `ProofStrip` 语义

**文件：**
- 修改：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`

- [ ] **步骤 1：同步英文导航与章节标签**

```json
{
  "nav.about": "Method",
  "nav.experience": "Path",
  "nav.portfolio": "Cases",
  "nav.contact": "Contact",
  "about.kicker": "Act Three / Method",
  "experience.kicker": "Act Four / Path",
  "portfolio.kicker": "Main Episode / Cases",
  "portfolio.title": "Featured Cases",
  "contact.kicker": "Epilogue / Contact"
}
```

- [ ] **步骤 2：同步英文 `ProofStrip` 的三条理由**

```json
{
  "proof.chapter": "Act Two / Capability Signals",
  "proof.title": "Three reasons to keep reading",
  "proof.item.1.label": "See the Problem",
  "proof.item.1.title": "Make complex problems legible",
  "proof.item.1.body": "Break business, workflow, and role relationships into structures teams can judge together.",
  "proof.item.2.label": "Move Alignment",
  "proof.item.2.title": "Turn multi-role collaboration into progress",
  "proof.item.2.body": "Build alignment, pace, and handoff across product, business, and frontline execution.",
  "proof.item.3.label": "Land the Work",
  "proof.item.3.title": "Balance expression with real delivery",
  "proof.item.3.body": "Make solutions work not only on the page, but also in systems, workflows, and real operations."
}
```

- [ ] **步骤 3：人工比对中英文语义层级是否一致**

重点检查：

- `nav.*` 是否都是目录式命名
- `proof.*` 是否都表达“三条继续阅读理由”
- `about / experience / portfolio / contact` 的 kicker 是否保持相同幕次关系

- [ ] **步骤 4：Commit**

```bash
git add src/locales/en.json
git commit -m "feat: sync homepage chapter flow copy in en locale"
```

### 任务 4：整页回归与章节节奏检查

**文件：**
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/zh.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/locales/en.json`
- 验证：`/Users/wen/Desktop/Portfolio/src/App.test.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/ProofStrip/index.test.jsx`
- 验证：`/Users/wen/Desktop/Portfolio/src/components/Navbar/index.test.jsx`

- [ ] **步骤 1：运行完整测试套件**

运行：`npm test`

预期：PASS，首页章节命名调整没有破坏既有内容结构与动效测试。

- [ ] **步骤 2：运行生产构建**

运行：`npm run build`

预期：PASS，构建成功，无编译错误。

- [ ] **步骤 3：启动本地开发服务做人工检查**

运行：`npm run dev -- --host 0.0.0.0`

重点检查：

- 导航是否呈现 `方法 / 路径 / 案例 / 联系`
- `ProofStrip` 是否像“继续往下看的三个理由”
- `About / Experience / Portfolio / Contact` 的 kicker 是否形成连续幕次
- `Portfolio` 是否仍保持首页最强证明区，而没有被新命名稀释
- 页面整体是否仍然克制，没有变成过度表演化的章节秀

- [ ] **步骤 4：确认无需额外样式修正**

重点查看：

```css
.section-kicker
.section-title
.chapterLabel
.chapterTitle
```

预期：新文案长度不会破坏当前版式；若中文或英文出现明显拥挤，再单独开一轮最小排版修正，不在本计划内混入。

- [ ] **步骤 5：Commit**

```bash
git add src/locales/zh.json src/locales/en.json src/components/ProofStrip/index.test.jsx src/components/Navbar/index.test.jsx src/App.test.jsx
git commit -m "refactor: align homepage secondary content flow"
```

## 自检

### 规格覆盖度

- `ProofStrip` 从并列能力卡转为继续阅读理由：由任务 1、任务 2、任务 4 覆盖
- 导航从简历式命名转为目录式命名：由任务 1、任务 2、任务 3 覆盖
- `About / Experience / Portfolio / Contact` kicker 形成章节链条：由任务 1、任务 2、任务 3 覆盖
- 保持 `Portfolio` 为首页证明重心：由任务 1 和任务 4 覆盖
- 控制章节感强度不过度表演化：由任务 4 的人工检查覆盖

### 占位符扫描

- 未使用 `TODO`、`待定`、`后续补充`
- 每个任务都给出明确文件、命令、预期结果与代码片段
- 未使用“类似任务 N”的隐式写法

### 类型一致性

- 继续沿用现有 `nav.*`、`proof.*`、`*.kicker`、`portfolio.title` 的 key 体系
- 不引入新的组件 props 或新数据层
- 测试断言以最终渲染文本为准，不依赖组件内部实现细节

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-07-12-homepage-secondary-content-flow-implementation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
