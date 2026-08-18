# 文档总览

本目录用于管理作品集网站的资料、整理结果和过程文档。

当前站点内容已经完成一轮整合，因此文档层的职责不再是"替页面写文案"，而是分清以下 4 类信息：

- **事实资料**：项目事实、个人背景、原始来源。
- **页面母稿**：每个页面的内容结构（content）与设计规范（design）。
- **站点映射**：当前页面结构、区块定位、后续维护边界。
- **过程归档**：设计讨论、实现计划、阶段性决策。

## 目录分层

```text
docs/
├── origin/      原始材料层（PRD、表格、PPT、过程稿，只追溯，不直接上页面）
├── profile/     个人资料层（overview / career-timeline / resume.pdf + sources/ 归档副本）
├── project/     项目事实层（4 个项目主文档 + content-readiness.md 证据缺口清单）
├── pages/       页面母稿层 ★ 每个对象 = content.md + design.md（详见 pages/README.md）
├── site/        站点映射层（structure.md / content-map.md）
└── superpowers/ 过程归档层（plans/ + specs/，各含 current/ + archive/）
```

- `origin/`：原始材料层。保存 PRD、表格、PPT、会议整理稿和过程材料，只用于追溯，不直接给页面使用。
- `profile/`：个人资料层。保存个人定位、职业时间线、能力结构、简历等正式整理内容。
- `project/`：项目事实层。保存每个项目的整理版事实主文档，是项目内容的主要事实来源；`project/content-readiness.md` 记录进入案例页前仍需回填的证据。
- `pages/`：页面母稿层（Master Copy）。每个页面对象一个目录，内含 `content.md`（逐字文案与 7 步证据链）与 `design.md`（视觉与交互规范）；是页面文案与设计的黄金样板。
- `site/`：站点映射层。说明当前页面结构、区块职责和内容映射，反映"页面现在长什么样、后续怎么维护"。
- `superpowers/`：过程归档层。保存 AI 协作中的规格、计划和阶段性方案，用于回看决策过程，不作为当前页面内容的事实来源。

## 当前建议阅读顺序

### 想了解当前页面怎么维护

按以下顺序查看：

1. `site/README.md`
2. `site/structure.md`
3. `site/content-map.md`
4. `pages/README.md`

### 想补充或修改页面内容

先阅读 `CASE_STUDY_SPEC.md`，再按以下顺序取材与定稿：

1. `profile/`（个人背景）
2. `project/`（项目事实，指标唯一来源）
3. `pages/<slug>/content.md`（在内容母稿中定稿文案与 7 步证据链）
4. `pages/<slug>/design.md`（视觉与交互规范，或全局 `DESIGN.md`）

不要直接从 `origin/` 或 `superpowers/` 抽网页文案。

补充项目材料时，再执行以下顺序：

1. 查看 `project/content-readiness.md`，确认缺的是事实、口径、素材还是验证证据。
2. 回填 `origin/` 和对应项目主文档中的已确认材料。
3. 在 `pages/<slug>/content.md` 中更新对应母稿，并更新 `site/content-map.md`。
4. 最后同步至 `src/data/projects.js` 与前端页面组件。

### 想回看方案是怎么形成的

前往 `superpowers/` 查看对应日期的 `specs/` 和 `plans/`（`current/` 为当前有效，`archive/` 为已归档）。

## 当前维护原则

- 页面表达以当前已上线实现为准。
- 文档负责解释来源、结构和边界，不重复堆叠页面文案。
- 若页面内容已整合上线，优先更新 `site/` 文档，而不是继续堆新的设计说明。
- 若新增项目或补充个人资料，先更新 `project/` 或 `profile/`，再决定是否需要同步到页面。
- 改指标数字先去 `project/`（唯一事实源），再同步 `pages/` 母稿；调视觉交互去 `pages/<slug>/design.md` 或 `DESIGN.md`；改文案去 `pages/<slug>/content.md`。
- `CASE_STUDY_SPEC.md` 定义案例质量，`project/content-readiness.md` 记录资料缺口；两者都不替代项目事实。
