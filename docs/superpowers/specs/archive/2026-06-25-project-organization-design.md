# 项目结构整理与背景资料归档设计

## 概述

本次整理聚焦两个目标：

- 提升项目目录的可读性，让运行文件、源码、文档之间的边界更清晰。
- 将分散在根目录的个人背景资料汇总到 `docs/` 中，形成可维护、可复用的内容资产。

本次工作不以重构前端功能为目标，不调整现有页面逻辑、动画逻辑或国际化实现，仅进行文档归档与适度目录重组。

## 当前问题

### 根目录资料分散

当前项目根目录存在以下个人背景资料文件：

- `chatgpt记忆.md`
- `职业背景信息chatgpt.md`

这两份文件与项目运行文件混放在一起，缺少归档位置与用途说明，不利于后续补充和维护。

### `docs` 目录职责单一

当前 `docs/` 目录仅包含 `superpowers/plans/` 与 `superpowers/specs/`，主要承载 AI 协作过程中的规划文档，尚未承载项目本身的长期资料与内容资产。

### 源码结构仍处于早期阶段

当前 `src/` 已具备 `components/`、`context/`、`locales/`、`styles/` 等基础结构，但多个页面区块仍为占位实现。此阶段适合先整理文档与内容资产，不适合进行激进源码重构。

## 设计目标

### 目标 1：统一背景资料入口

将与个人职业背景、行业经验、能力标签相关的资料统一归档到 `docs/profile/`，并形成正式文档与原始资料副本两层结构。

### 目标 2：明确项目文档层级

在 `docs/` 下区分以下两类内容：

- `docs/profile/`：个人背景与内容素材。
- `docs/project/`：项目结构说明与内容映射。

`docs/superpowers/` 保持不变，继续承载 AI 设计与计划文件。

### 目标 3：控制整理边界

本次仅做适度目录重组，不进行以下改动：

- 不删除根目录原始资料文件。
- 不改动 `package.json`、`vite.config.js`、`index.html` 等运行入口。
- 不重命名现有页面组件。
- 不引入新的复杂源码分层。

## 目标目录结构

```text
portfolio website/
├── docs/
│   ├── profile/
│   │   ├── README.md
│   │   ├── overview.md
│   │   ├── career-timeline.md
│   │   ├── domain-and-strengths.md
│   │   └── sources/
│   │       ├── chatgpt-memory.md
│   │       └── career-background.md
│   ├── project/
│   │   ├── README.md
│   │   ├── structure.md
│   │   └── content-map.md
│   └── superpowers/
│       ├── plans/
│       └── specs/
├── src/
│   ├── components/
│   ├── context/
│   ├── locales/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── chatgpt记忆.md
├── 职业背景信息chatgpt.md
├── index.html
├── package.json
└── vite.config.js
```

## 文档职责设计

### `docs/profile/README.md`

作为个人资料文档入口，说明各文件用途、使用方式与维护建议。

### `docs/profile/overview.md`

用于概览个人职业定位，适合作为网站 `Hero` 和 `About` 内容的高层来源。建议包含：

- 当前身份与职业标签。
- 核心定位与一句话简介。
- 主要行业背景。
- 关键能力关键词。

### `docs/profile/career-timeline.md`

用于整理职业经历时间线，适合作为网站 `Experience` 区块的数据来源。建议包含：

- 时间段。
- 公司与岗位。
- 阶段职责。
- 能力成长与阶段变化。

### `docs/profile/domain-and-strengths.md`

用于沉淀行业背景、业务方向、核心优势与 AI 实践，适合作为 `About`、`Portfolio` 与后续案例叙事的素材池。建议包含：

- 行业领域。
- 业务方向。
- 能力标签。
- 方法论与工作模式。
- AI 应用实践。

### `docs/profile/sources/`

用于存放原始资料副本。原始文件保留在根目录，不做删除；此处新增归档版本，便于后续统一检索与引用。

### `docs/project/README.md`

作为项目文档入口，说明项目结构文档的用途与阅读顺序。

### `docs/project/structure.md`

用于说明当前项目目录结构与每个目录的职责，帮助后续整理时保持一致。

### `docs/project/content-map.md`

用于建立“背景资料 -> 页面区块”的映射关系。建议至少覆盖：

- `Hero`：一句话定位、姓名、核心标签。
- `About`：职业转型叙事、价值观、能力标签。
- `Experience`：职业经历时间线。
- `Portfolio`：关键项目与业务方向。
- `Contact`：联系方式与外部链接占位。

## 资料处理策略

### 内容口径

根据用户选择，本次整理采用“完整整合现有内容”的口径：

- 保留现有资料中的明确事实。
- 允许纳入已有的阶段性总结、职业标签和能力归纳。
- 在正式文档中尽量用更清晰、结构化的表达重写原始内容。

### 原始文件保留规则

根目录下的以下文件保留不删除：

- `chatgpt记忆.md`
- `职业背景信息chatgpt.md`

同时在 `docs/profile/sources/` 中新增归档副本，使用更统一、可维护的文件名：

- `chatgpt-memory.md`
- `career-background.md`

## 实施边界

### 本次会做的事

- 新建 `docs/profile/` 与 `docs/project/` 目录。
- 创建资料归档与结构说明文档。
- 将原始资料复制到 `docs/profile/sources/`。
- 输出正式整理后的背景资料文档。

### 本次不会做的事

- 不删除根目录原始资料。
- 不改动现有前端组件逻辑。
- 不对 `src/components/` 做大规模重命名或拆分。
- 不把整理工作扩展成完整的内容开发或 UI 重构。

## 验收标准

完成后应满足以下条件：

- `docs/profile/` 下可以完整找到个人背景的正式文档与原始来源副本。
- `docs/project/` 下可以快速看懂当前项目结构与内容映射。
- 根目录运行相关文件不受影响。
- 根目录原始资料文件仍然存在。
- 后续开发者可以明确知道背景资料应写入哪里、项目结构应参考哪里。

## 风险与规避

### 风险 1：整理过度，影响现有开发节奏

规避方式：限制范围在文档归档与轻量目录整理，不触及运行逻辑。

### 风险 2：资料重复导致后续维护混乱

规避方式：在 `docs/profile/README.md` 中明确“原始资料”和“正式文档”的关系，避免双向随意修改。

### 风险 3：背景信息与页面内容脱节

规避方式：通过 `docs/project/content-map.md` 建立资料到页面区块的映射，降低后续内容转译成本。
