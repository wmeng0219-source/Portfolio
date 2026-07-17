# old 非页面内容迁移到 PortfolioDesign-new 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 `old` 中除页面实现本身外的内容、事实文档、图片资产与结构化数据迁移到 `PortfolioDesign-new`，让 `PortfolioDesign-new` 成为 Figma 驱动的页面壳，而网站内容继续通过独立内容层维护。

**架构：** `PortfolioDesign-new` 只负责页面结构、视觉样式、动效和路由，不再在 `App.tsx` 中内联业务内容。`old` 中已有的 `docs/origin -> docs/project -> docs/site` 内容链路整体迁入 `PortfolioDesign-new/docs/`，并新增 `src/content/` 作为运行时消费层。第一阶段不迁移 `old/src/components/**`、`old/src/pages/**`、`old/src/styles/**`、`old/src/motion/**`，避免把旧页面实现和新页面壳混在一起。

**技术栈：** React、TypeScript、React Router、Tailwind v4、motion/react、Markdown 文档

---

## 文件结构

### 新建文件

- `PortfolioDesign-new/docs/README.md`：说明新版仓内 `docs/` 的职责边界。
- `PortfolioDesign-new/src/content/types.ts`：定义项目卡片、详情页、首页文案的内容模型。
- `PortfolioDesign-new/src/content/projects.ts`：承接 `old/src/data/projects.js` 的项目内容数据。
- `PortfolioDesign-new/src/content/site.ts`：承接首页 Method、Path、Contact 等非项目型内容。
- `PortfolioDesign-new/src/content/index.ts`：统一导出内容层。
- `old/docs/superpowers/plans/2026-07-17-old-to-new-content-migration.md`：本计划文档。

### 修改文件

- `PortfolioDesign-new/src/app/App.tsx`：移除内联 `projects` 数组，改为消费 `src/content/`。

### 迁移目录

- `old/docs/origin/` -> `PortfolioDesign-new/docs/origin/`
- `old/docs/project/` -> `PortfolioDesign-new/docs/project/`
- `old/docs/profile/` -> `PortfolioDesign-new/docs/profile/`
- `old/docs/site/` -> `PortfolioDesign-new/docs/site/`
- `old/docs/design/` -> `PortfolioDesign-new/docs/design/`
- `old/public/images/pacs/` -> `PortfolioDesign-new/public/images/pacs/`

### 保持不变

- `old/src/components/**`：旧页面组件，第一阶段不迁移。
- `old/src/pages/**`：旧详情页实现，第一阶段不迁移。
- `old/src/styles/**`：旧 CSS Modules 与全局样式，第一阶段不迁移。
- `old/src/motion/**`：旧 GSAP 页面实现，第一阶段不迁移。
- `PortfolioDesign-new/src/styles/**`：继续作为新版视觉样式体系。

---

### 任务 1：把文档层和图片资产迁入 `PortfolioDesign-new`

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/README.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/origin/**`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/project/**`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/profile/**`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/site/**`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/design/**`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/public/images/pacs/**`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/**`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/old/public/images/pacs/**`

- [ ] **步骤 1：创建新版 `docs/README.md`，锁定“Figma 页面壳 + 独立内容层”边界**

```md
# PortfolioDesign-new 文档说明

本目录用于维护 `PortfolioDesign-new` 的内容来源与事实档案，不承载页面实现代码。

## 分层职责

- `docs/origin/`：原始资料归档层。
- `docs/project/`：项目事实整理层，是案例内容的唯一入口。
- `docs/profile/`：个人背景与职业叙事来源。
- `docs/site/`：页面内容映射与表达边界。
- `docs/design/`：设计说明、关键导出图与设计证据。

## 使用原则

- 页面版式与视觉通过 Figma 推送到 `src/app/`。
- 页面展示内容优先从 `src/content/` 读取。
- `src/content/` 的事实来源必须能追溯到 `docs/`。
- 不把页面文案重新写死回 `App.tsx`。
```

- [ ] **步骤 2：复制 `old/docs/` 的五层内容目录到 `PortfolioDesign-new/docs/`**

运行：

```bash
mkdir -p "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/origin" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/project" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/profile" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/site" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/design" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/"
```

预期：`PortfolioDesign-new/docs/` 下出现 `origin/ project/ profile/ site/ design/` 五个目录。

- [ ] **步骤 3：复制 PACS 图片资产到新版公共资源目录**

运行：

```bash
mkdir -p "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/public/images"
cp -R "/Users/wen/Desktop/myfisrt project/portfolio website/old/public/images/pacs" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/public/images/"
```

预期：`PortfolioDesign-new/public/images/pacs/` 包含 `ai-confirm.jpg`、`ai-recognition.jpg`、`entry-synced.jpg`、`manual-annotation.jpg`。

- [ ] **步骤 4：检查迁移后的目录树**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs" -maxdepth 2 -type d | sort
find "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/public/images/pacs" -maxdepth 1 -type f | sort
```

预期：输出包含 `docs/origin`、`docs/project`、`docs/profile`、`docs/site`、`docs/design` 以及 4 张 PACS 图片。

- [ ] **步骤 5：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "PortfolioDesign-new/docs" "PortfolioDesign-new/public/images/pacs"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs: migrate old content archives into new"
```

---

### 任务 2：在 `PortfolioDesign-new` 建立运行时内容层

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/types.ts`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/projects.ts`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/site.ts`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/index.ts`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/old/src/data/projects.js`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/old/docs/site/content-map.md`

- [ ] **步骤 1：创建 `types.ts`，先定义新旧内容之间的稳定接口**

```ts
export type LocalizedText = {
  zh: string;
  en?: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectAction = {
  title: LocalizedText;
  desc: LocalizedText;
};

export type ProjectImage = {
  src: string;
  alt: LocalizedText;
};

export type ProjectEntry = {
  slug: string;
  id: string;
  label: string;
  title: LocalizedText;
  kicker: LocalizedText;
  description: LocalizedText;
  question: LocalizedText;
  metric: ProjectMetric;
  result: LocalizedText;
  role: LocalizedText;
  background: LocalizedText;
  problem: LocalizedText;
  actions: ProjectAction[];
  images?: ProjectImage[];
  tone: string;
};

export type SiteContent = {
  methodTitle: string;
  methodBody: string;
  pathTitle: string;
  pathIntro: string;
  contactTitle: string;
  contactBody: string;
};
```

- [ ] **步骤 2：创建 `projects.ts`，把 `old/src/data/projects.js` 重组为 `new` 可直接消费的结构**

```ts
import type { ProjectEntry } from "./types";

export const projects: ProjectEntry[] = [
  {
    slug: "member-automation",
    id: "01",
    label: "MEMBER AUTOMATION",
    title: { zh: "会员自动化与服务衔接", en: "Member automation and service continuity" },
    kicker: { zh: "规则系统 / 服务连续性", en: "Rule system / service continuity" },
    description: { zh: "梳理会员卡、优惠、收费与对账关系，让高频服务从依赖经验变成可重复的系统流程。", en: "Turned frontline member service into a repeatable system workflow." },
    question: { zh: "如何让一线会员服务从经验驱动，变成系统可承接的流程？", en: "How can frontline member service become system-supported instead of experience-driven?" },
    metric: { value: "20+", label: "门店落地" },
    result: { zh: "升级操作从 4-5 分钟缩短至 1 分钟左右，月底对账从 3 天缩短至 1 天。", en: "Upgrade flow dropped to around 1 minute and reconciliation dropped to 1 day." },
    role: { zh: "产品经理，负责方案输出、规则确认、开发推进与上线跟进。", en: "Product Manager leading rule definition and delivery." },
    background: { zh: "会员、卡券权益、收费彼此独立，缺少自动对应关系。", en: "Membership, benefits and billing were disconnected." },
    problem: { zh: "高频流程步骤多且易错，跨门店处理与财务核对成本高。", en: "High-frequency processes were long, error-prone and expensive to reconcile." },
    actions: [
      { title: { zh: "规则系统化", en: "Systematize rules" }, desc: { zh: "统一会员卡、卡券、收费、优惠和账单关系。", en: "Unified cards, discounts, payments and billing rules." } },
      { title: { zh: "流程自动化", en: "Automate workflows" }, desc: { zh: "将高频会员操作改成系统自动承接。", en: "Turned manual membership workflows into automated system flows." } },
      { title: { zh: "财务治理", en: "Improve governance" }, desc: { zh: "通过系统留痕和对应关系降低违规与核对成本。", en: "Reduced finance reconciliation and compliance risk with traceability." } }
    ],
    tone: "from-[#a88adf]/95 to-[#6d57a5]"
  }
];
```

- [ ] **步骤 3：创建 `site.ts`，把首页静态文案从页面实现中抽离**

```ts
import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  methodTitle: "Method",
  methodBody: "我习惯从业务现场、信息结构和系统边界同时切入，把复杂问题整理成可落地的产品路径。",
  pathTitle: "Path",
  pathIntro: "从设计执行到产品判断，再到业务现场协同，我的工作重心逐步转向复杂流程的梳理与落地。",
  contactTitle: "Contact",
  contactBody: "联系方式保持克制呈现，只保留确认过的正式渠道，不在页面中虚构任何社交入口。"
};
```

- [ ] **步骤 4：创建 `index.ts`，给页面层一个统一导出入口**

```ts
export { projects } from "./projects";
export { siteContent } from "./site";
export type { ProjectEntry, SiteContent, LocalizedText, ProjectAction, ProjectImage, ProjectMetric } from "./types";
```

- [ ] **步骤 5：运行 TypeScript 检查，确认内容层文件可被正确解析**

运行：

```bash
cd "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new" && npx tsc --noEmit
```

预期：不报 `Cannot find module './content'`、`Type '...' is not assignable` 之类错误。

- [ ] **步骤 6：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "PortfolioDesign-new/src/content"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "feat: add content layer for figma-driven site"
```

---

### 任务 3：让 `App.tsx` 从内容层读取数据，不再内联业务内容

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/app/App.tsx`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/index.ts`

- [ ] **步骤 1：替换文件头部 import，接入内容层**

将：

```ts
import { Link, Outlet, RouterProvider, createBrowserRouter, useParams } from "react-router";

// --- Data ---
const projects = [
  { slug: "member-automation", id: "01", label: "MEMBER AUTOMATION", title: "会员自动化与服务衔接", kicker: "规则系统 / 服务连续性", description: "梳理会员卡、优惠、收费与对账关系，让高频服务从依赖经验变成可重复的系统流程。", metric: "20+", metricLabel: "门店落地", result: "升级操作从 4–5 分钟缩短至 1 分钟", phase: "RULE SYSTEM", question: "如何让一线会员服务从经验驱动，变成系统可承接的流程？", actions: ["梳理会员卡、优惠、收费与账单的规则关系", "将高频升级操作转为系统自动承接", "建立面向财务的对账路径"], tone: "from-[#a88adf]/95 to-[#6d57a5]" },
];
```

改成：

```ts
import { Link, Outlet, RouterProvider, createBrowserRouter, useParams } from "react-router";
import { projects, siteContent } from "../content";
```

预期：`App.tsx` 不再声明本地 `projects` 常量。

- [ ] **步骤 2：把首页卡片使用点切到新 schema**

将：

```tsx
{projects.map((project, idx) => (
  <Link key={project.slug} to={`/project/${project.slug}`}>
    <span>{project.title}</span>
    <span>{project.description}</span>
    <span>{project.metric}</span>
    <span>{project.metricLabel}</span>
  </Link>
))}
```

改成：

```tsx
{projects.map((project, idx) => (
  <Link key={project.slug} to={`/project/${project.slug}`}>
    <span>{project.title.zh}</span>
    <span>{project.description.zh}</span>
    <span>{project.metric.value}</span>
    <span>{project.metric.label}</span>
  </Link>
))}
```

预期：首页项目卡片仍正常显示，数据来源变成 `src/content/projects.ts`。

- [ ] **步骤 3：把详情页取值改成 `LocalizedText` 与 `ProjectAction[]`**

将：

```tsx
const project = projects.find((item) => item.slug === slug) ?? projects[0];

<h1>{project.title}</h1>
<p>{project.question}</p>
{project.actions.map((action) => (
  <li key={action}>{action}</li>
))}
```

改成：

```tsx
const project = projects.find((item) => item.slug === slug) ?? projects[0];

<h1>{project.title.zh}</h1>
<p>{project.question.zh}</p>
{project.actions.map((action) => (
  <li key={action.title.zh}>
    <strong>{action.title.zh}</strong>
    <span>{action.desc.zh}</span>
  </li>
))}
```

预期：详情页支持读取更完整的项目事实，而不是只渲染首页级摘要。

- [ ] **步骤 4：把 Method / Path / Contact 的静态文案读取改为 `siteContent`**

将：

```tsx
<h2>Method</h2>
<p>这里直接写死首页方法论文案</p>
```

改成：

```tsx
<h2>{siteContent.methodTitle}</h2>
<p>{siteContent.methodBody}</p>
```

同样替换 `Path`、`Contact` 区块中的内联文案。

- [ ] **步骤 5：运行开发构建，确认页面功能不回退**

运行：

```bash
cd "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new" && npm run build
```

预期：构建成功，没有 `Property 'zh' does not exist`、`Cannot read properties of undefined` 等运行期或编译期错误。

- [ ] **步骤 6：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "PortfolioDesign-new/src/app/App.tsx"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "refactor: decouple app shell from inline content"
```

---

### 任务 4：验证迁移边界并保留 `old` 作为内容档案来源

**文件：**
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/**`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/**`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/app/App.tsx`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/old/src/components/**`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/old/src/pages/**`

- [ ] **步骤 1：确认旧页面实现没有被误迁入新版页面层**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src" -maxdepth 3 -type f | grep -E "components/.*/index.jsx|pages/|motion/"
```

预期：无输出或只出现新版已有的 `src/app/components/**`，不应出现 `old/src/pages/**` 风格文件。

- [ ] **步骤 2：确认新版内容层能追溯到文档事实来源**

运行：

```bash
grep -n "docs/project\|docs/site\|docs/profile" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/docs/README.md"
grep -n "会员自动化与服务衔接\|正畸筛查与状态管理\|PACS 读片与 AI 辅助判断" "/Users/wen/Desktop/myfisrt project/portfolio website/PortfolioDesign-new/src/content/projects.ts"
```

预期：能看到 `docs/` 分层职责说明，且 3 个核心项目已进入新版内容层。

- [ ] **步骤 3：检查 Git 状态，只保留本次预期改动**

运行：

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" status --short
```

预期：主要出现 `PortfolioDesign-new/docs/**`、`PortfolioDesign-new/public/images/pacs/**`、`PortfolioDesign-new/src/content/**`、`PortfolioDesign-new/src/app/App.tsx` 和本计划文档。

- [ ] **步骤 4：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "old/docs/superpowers/plans/2026-07-17-old-to-new-content-migration.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs: add old to new content migration plan"
```

---

## 自检结果

- 规格覆盖度：已覆盖文档迁移、图片迁移、内容层抽离、`App.tsx` 解耦和边界验证。
- 占位符扫描：计划中未使用“待定”“后续实现”“类似任务 N”等占位语句，所有步骤均给出明确文件、命令或代码。
- 类型一致性：统一使用 `LocalizedText`、`ProjectEntry`、`SiteContent` 作为新内容层模型，避免 `App.tsx` 和 `projects.ts` 出现字段名分裂。

## 执行交接

计划已完成并保存到 `old/docs/superpowers/plans/2026-07-17-old-to-new-content-migration.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
