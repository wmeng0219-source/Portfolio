# 项目结构整理与背景资料归档实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 为当前作品集项目建立清晰的文档层级，将个人背景资料统一归档到 `docs/`，并补齐项目结构说明与内容映射文档，同时保留根目录原始资料文件不删除。

**架构：** 本次实现只调整文档层，不改动运行逻辑。通过在 `docs/` 下新增 `profile/` 与 `project/` 两个目录，将“个人背景资料”和“项目结构说明”分离，并通过 `sources/` 保留原始资料副本。`docs/superpowers/` 保持原有职责不变。

**技术栈：** Markdown、现有 Vite + React 项目目录

---

## 文件结构

### 新建文件

- `docs/profile/README.md`：个人资料文档入口与维护说明。
- `docs/profile/overview.md`：个人定位、核心标签与一句话简介。
- `docs/profile/career-timeline.md`：职业经历时间线。
- `docs/profile/domain-and-strengths.md`：行业背景、业务方向、能力标签与 AI 实践。
- `docs/profile/sources/chatgpt-memory.md`：`chatgpt记忆.md` 的归档副本。
- `docs/profile/sources/career-background.md`：`职业背景信息chatgpt.md` 的归档副本。
- `docs/project/README.md`：项目说明文档入口。
- `docs/project/structure.md`：当前项目目录结构说明。
- `docs/project/content-map.md`：背景资料与页面区块的映射关系。

### 保持不变

- `chatgpt记忆.md`：根目录原始资料文件，保留。
- `职业背景信息chatgpt.md`：根目录原始资料文件，保留。
- `src/**`：本次不修改源码逻辑。
- `package.json`、`vite.config.js`、`index.html`：本次不修改。

---

### 任务 1：建立 `docs/profile/` 文档结构

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/career-timeline.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/domain-and-strengths.md`

- [ ] **步骤 1：创建 `docs/profile/README.md`，定义资料分层规则**

```md
# 个人资料文档

本目录用于沉淀作品集网站相关的个人背景资料，分为两层：

- 正式文档：面向项目内容整理与后续页面撰写。
- 原始资料：保留来源内容的归档副本，不直接作为页面文案使用。

## 文件说明

- `overview.md`：个人定位、核心标签与一句话简介。
- `career-timeline.md`：职业经历时间线。
- `domain-and-strengths.md`：行业背景、业务方向、能力标签与方法论。
- `sources/`：原始资料副本。

## 维护规则

- 根目录原始资料文件保留，不删除。
- 后续新增背景信息时，优先更新正式文档。
- 若需保留来源内容，再补充到 `sources/`。
```

- [ ] **步骤 2：创建 `overview.md`，整理高层职业定位**

```md
# 个人概览

## 当前定位

Meng Wen，长期深耕儿童口腔医疗数字化领域，职业路径从 UI 设计师发展为产品经理与 ITBP 复合型角色。

## 一句话简介

从复杂 B 端产品设计出发，持续连接业务、产品、流程与数字化建设，并探索 AI 在产品与业务分析场景中的应用。

## 核心标签

- 医疗数字化产品经理
- ITBP
- 业务分析与流程设计
- UI / UX 背景
- AI 工作流实践

## 当前工作重心

- 业务调研与需求治理
- 门诊运营与会员体系数字化
- 医生工作流与正畸相关产品设计
- 数据分析与经营洞察
- AI 辅助分析与方案整理
```

- [ ] **步骤 3：创建 `career-timeline.md`，整理职业时间线**

```md
# 职业经历时间线

## 2019 - 2020｜致信信息｜UI 设计师

- 负责产品界面设计、设计资产管理与组件库建设。
- 能力积累集中在视觉设计、界面规范与组件化思维。

## 2020 - 2022｜华软互联｜UI 设计师

- 参与企业级产品设计、设计规范建设与组件体系建设。
- 从页面设计逐步转向信息架构、交互设计与复杂业务理解。

## 2022｜博彦科技｜UI / UX 设计师

- 参与投资研究管理平台相关设计工作。
- 覆盖需求分析、竞品研究、交互设计与复杂后台产品设计。
- 开始从设计执行角色转向参与产品决策。

## 2022 - 至今｜上海极橙医疗科技有限公司｜产品经理 / ITBP

- 深入儿童口腔医疗数字化场景，长期负责门诊运营、会员体系、正畸业务与医生工作流相关产品。
- 在业务部门、IT 部门与研发团队之间承担桥梁角色。
- 工作重点包括业务调研、需求收集、需求治理、项目推动与跨部门协同。
```

- [ ] **步骤 4：创建 `domain-and-strengths.md`，沉淀行业与能力资产**

```md
# 行业背景与核心优势

## 行业背景

- 聚焦儿童口腔医疗数字化与连锁诊所场景。
- 长期接触 SaaS 系统、会员系统、预约系统、医生工具与经营分析相关场景。

## 业务方向

- 会员管理与会员自动化流程
- 正畸筛查与状态管理
- 医生诊前预习
- 患者沟通数据库
- 回访与满意度评价
- 企业微信触达与服务流程
- 数据分析与经营指标洞察

## 工作方式

- 深入门店与一线岗位做业务调研。
- 从业务问题出发识别系统建设机会。
- 兼顾产品设计、流程设计与跨部门协同推动。

## 能力标签

- 设计能力：UI、UX、设计规范、组件体系
- 产品能力：需求分析、信息架构、交互设计、方案整理
- 业务能力：业务调研、流程设计、ITBP、数字化建设
- 分析能力：经营分析、数据指标理解、问题拆解
- AI 实践：ChatGPT、Claude、Cursor、Trae 在需求分析、PRD 生成与方案验证中的应用
```

- [ ] **步骤 5：检查文档是否满足中文文档规范**

运行检查：

```bash
grep -n "TODO\|待定\|后续" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/"*.md
```

预期：无输出，表示没有残留占位词。

- [ ] **步骤 6：Commit**

```bash
git add "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile"
git commit -m "docs: add profile documentation structure"
```

---

### 任务 2：归档原始资料副本

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources/chatgpt-memory.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources/career-background.md`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/chatgpt记忆.md`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/职业背景信息chatgpt.md`

- [ ] **步骤 1：复制 `chatgpt记忆.md` 到归档目录**

运行：

```bash
cp "/Users/wen/Desktop/myfisrt project/portfolio website/chatgpt记忆.md" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources/chatgpt-memory.md"
```

预期：生成归档副本，根目录原文件仍保留。

- [ ] **步骤 2：复制 `职业背景信息chatgpt.md` 到归档目录**

运行：

```bash
cp "/Users/wen/Desktop/myfisrt project/portfolio website/职业背景信息chatgpt.md" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources/career-background.md"
```

预期：生成归档副本，根目录原文件仍保留。

- [ ] **步骤 3：检查归档文件是否创建成功**

运行：

```bash
ls -R "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources"
```

预期输出包含：

```text
chatgpt-memory.md
career-background.md
```

- [ ] **步骤 4：Commit**

```bash
git add "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/sources"
git commit -m "docs: archive profile source materials"
```

---

### 任务 3：建立 `docs/project/` 项目说明文档

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/structure.md`
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/content-map.md`

- [ ] **步骤 1：创建 `docs/project/README.md`，定义项目说明文档入口**

```md
# 项目说明文档

本目录用于说明当前作品集项目的结构与内容组织方式。

## 文件说明

- `structure.md`：当前目录结构与职责说明。
- `content-map.md`：背景资料与页面区块的映射关系。

## 使用建议

- 需要了解项目目录时，先看 `structure.md`。
- 需要补充页面内容时，先看 `content-map.md` 与 `docs/profile/`。
```

- [ ] **步骤 2：创建 `structure.md`，说明当前项目结构**

```md
# 项目结构说明

## 根目录

- `src/`：前端源码目录。
- `docs/`：项目文档目录。
- `chatgpt记忆.md`：原始背景资料，保留。
- `职业背景信息chatgpt.md`：原始背景资料，保留。
- `package.json`：项目依赖与脚本配置。
- `vite.config.js`：Vite 配置。
- `index.html`：页面入口模板。

## `src/`

- `components/`：页面区块组件。
- `context/`：语言上下文。
- `locales/`：中英文文案。
- `styles/`：全局样式与变量。

## `docs/`

- `profile/`：个人背景资料与归档来源。
- `project/`：项目结构与内容映射说明。
- `superpowers/`：AI 协作过程中的规格与计划文档。
```

- [ ] **步骤 3：创建 `content-map.md`，建立资料到页面的映射**

```md
# 内容映射

## Hero

- 来源：`docs/profile/overview.md`
- 使用内容：姓名、职业定位、一句话简介、核心标签

## About

- 来源：`docs/profile/overview.md`、`docs/profile/domain-and-strengths.md`
- 使用内容：职业转型叙事、价值观、能力标签、工作方式

## Experience

- 来源：`docs/profile/career-timeline.md`
- 使用内容：时间线、公司、岗位、阶段成长

## Portfolio

- 来源：`docs/profile/domain-and-strengths.md`
- 使用内容：关键业务方向、代表性项目主题、行业场景

## Contact

- 来源：后续补充
- 使用内容：邮箱、社交链接、联系方式
```

- [ ] **步骤 4：检查目录结构是否符合设计**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs" -maxdepth 2 -type f | sort
```

预期输出至少包含：

```text
/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/career-timeline.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/domain-and-strengths.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/structure.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/content-map.md
```

- [ ] **步骤 5：Commit**

```bash
git add "/Users/wen/Desktop/myfisrt project/portfolio website/docs/project"
git commit -m "docs: add project structure documentation"
```

---

### 任务 4：执行后验证

**文件：**
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/**`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/**`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/chatgpt记忆.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/职业背景信息chatgpt.md`

- [ ] **步骤 1：确认根目录原始资料文件仍然存在**

运行：

```bash
ls "/Users/wen/Desktop/myfisrt project/portfolio website/chatgpt记忆.md" "/Users/wen/Desktop/myfisrt project/portfolio website/职业背景信息chatgpt.md"
```

预期：两个文件路径均被输出，没有报错。

- [ ] **步骤 2：检查整理后的文档树**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs" -maxdepth 3 -type f | sort
```

预期：同时包含 `docs/profile/`、`docs/project/` 与既有 `docs/superpowers/` 文件。

- [ ] **步骤 3：查看 Git 状态，确认只包含预期文档改动**

运行：

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" status --short
```

预期：仅出现新增的 `docs/profile/**`、`docs/project/**` 与计划 / 规格文档改动。

- [ ] **步骤 4：Commit**

```bash
git add "/Users/wen/Desktop/myfisrt project/portfolio website/docs/superpowers"
git commit -m "docs: add project organization plan and spec"
```
