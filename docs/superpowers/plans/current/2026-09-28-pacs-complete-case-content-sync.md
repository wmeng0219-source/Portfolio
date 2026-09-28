# PACS 完整读片案例内容同步实施计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将已确认的 PACS 完整读片项目大纲同步到事实底稿、证据就绪表和正式页面母稿，同时保持职责、指标与医学效果的证据边界。

**架构：** 先在 `docs/project/` 固化项目事实，再在 `docs/pages/pacs-ai/content.md` 形成中英文页面母稿。对外页面采用七段式阅读结构，母稿继续遵守仓库统一的 `0–8` 九段式章节标准，并在章节内映射七段式页面内容。

**技术栈：** Markdown、`rg`、Git diff；本计划不修改 React、CSS、图片或页面设计。

---

## 文件结构

- 修改：`docs/project/PACS读片与AI辅助判断.md` —— 完整项目事实、职责协作、读片监控与动态目标。
- 修改：`docs/project/content-readiness.md` —— 新增已确认的管理机制证据和仍缺少的达成结果。
- 修改：`docs/pages/pacs-ai/content.md` —— 完整项目中英文页面内容母稿。
- 修改：`docs/superpowers/specs/current/2026-09-26-pacs-case-study-page-outline.md` —— 核对完成后更新状态，不再承担正式页面文案职责。
- 修改：`docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md` —— 实施过程中同步勾选完成状态。

### 任务 1：同步完整项目事实与证据状态

**文件：**

- 修改：`docs/project/PACS读片与AI辅助判断.md`
- 修改：`docs/project/content-readiness.md`

- [ ] **步骤 1：改写项目起点**

在事实底稿中明确：项目不是由单点事故触发，而是补齐拍片后医疗过程的数字化基础建设。原系统只能识别患者是否应该拍片，无法持续记录拍片后是否完成读片、记录是否完整，以及结果是否进入病历。

- [ ] **步骤 2：补充双端需求事实**

记录管理人员需要查看读片完成情况，医生需要将指图沟通转成影像标记、结构化内容和病历记录。避免将这两项写成已经证明改善医疗质量或沟通效果。

- [ ] **步骤 3：校正个人职责与协作方式**

写明基础读片阶段由作者与产品经理共同讨论流程和交互，并与医疗主任确认专业规则；作者负责流程交互与界面设计，设计确认后与产品经理共同整理 PRD。AI 辅助读片阶段由作者独立负责产品方案、规则、复核流程、异常降级、交互、UI 和 PRD，算法同事负责模型、识别能力和训练。

- [ ] **步骤 4：补充上线后形成的管理机制**

写明系统上线后才逐步形成读片完成率指标，可按门店和医生查看，用于医疗质量复盘、异常定位和责任跟进。指标口径为“推荐拍片记录中已经完成读片的比例”；当前动态管理目标为 60%，不是上线承诺，也没有材料证明已经达到 60%。

- [ ] **步骤 5：更新证据就绪表**

在 `content-readiness.md` 增加：

- 已具备：读片完成率指标、门店/医生拆分查看、当前动态目标 60% 的用户确认事实。
- 待补：明确周期的实际读片完成率、目标调整记录、医疗质量复盘材料。
- 谨慎表述：AI 可以减少从零查找、初始标记和录入等基础操作，但没有前后耗时或医生工时数据。

- [ ] **步骤 6：验证事实层没有越界结论**

运行：

```bash
rg -n "达到 60%|降低漏诊|避免误诊|提升医学检出率|提升诊断准确率|全权负责|直接用于.*训练" docs/project/PACS读片与AI辅助判断.md docs/project/content-readiness.md
```

预期：只在“不能证明”“谨慎表述”或待补说明中出现；不存在作为已实现成果的表述。

- [ ] **步骤 7：提交事实层更新**

```bash
git add docs/project/PACS读片与AI辅助判断.md docs/project/content-readiness.md docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md
git commit -m "docs: 完善 PACS 完整读片项目事实"
```

### 任务 2：重写正式页面内容母稿

**文件：**

- 修改：`docs/pages/pacs-ai/content.md`

- [ ] **步骤 1：按九段式标准建立章节骨架**

使用以下固定章节：

```markdown
## 0. 元数据与个人定位
## 1. 首屏与核心信息
## 2. 现场与代价
## 3. 根因分析与设计命题
## 4. 核心约束与边界
## 5. 关键机制与产品决策
## 6. 业务结果与指标口径
## 7. 复盘反思与未解局限
## 8. 视觉资产与代码映射
```

- [ ] **步骤 2：将七段式阅读结构映射到九段式母稿**

映射关系：

- Hero → 章节 0–1。
- 数字化基础建设与双端需求 → 章节 2–3。
- 职责、专业边界和证据边界 → 章节 4。
- 基础读片闭环、AI 动因、三个 AI 判断、端到端流程 → 章节 5。
- 管理机制、动态目标 60%、使用规模和运营观察 → 章节 6。
- 能力沉淀与待验证问题 → 章节 7。
- 截图与代码映射 → 章节 8。

- [ ] **步骤 3：完成中文母稿**

中文必须包含：

- “医疗过程数字化基础建设”而非事故驱动。
- 管理人员与医生两类需求。
- 基础读片四个机制：影像同步、结构化读片、三态完成度、病历同步。
- 基础阶段共同协作与 AI 阶段独立负责的不同职责强度。
- AI 的减负目标和未量化边界。
- 三种医生复核结果与手动降级。
- 上线后形成读片完成率指标和当前动态目标 60%。
- `147,793`、约 `96.3%`、`3,736`、`1.43 → 3.46` 的独立口径和限制。

- [ ] **步骤 4：完成等强度英文母稿**

英文不得强化中文没有的因果或医学结论。统一使用：

- `reading completion rate` 表示读片完成率。
- `current dynamic management target` 表示当前动态管理目标。
- `structured reading workflow` 表示结构化读片流程。
- `doctor review` 表示医生复核。
- `manual fallback` 表示手动降级。

- [ ] **步骤 5：补齐来源与页面映射**

章节 8 至少列出：

- `docs/origin/读片/读片PRD.v1.md`
- `docs/origin/读片/读片新增AI判断PRD-v2.md`
- `docs/project/PACS读片与AI辅助判断.md`
- `docs/project/content-readiness.md`
- `src/data/projects.js`
- `src/pages/cases/PacsAi/index.jsx`
- `src/pages/cases/PacsAi/PacsAi.module.css`

- [ ] **步骤 6：验证章节、术语和证据边界**

运行：

```bash
rg -n "^## [0-8]\." docs/pages/pacs-ai/content.md
rg -n "读片完成率|60%|reading completion rate|dynamic management target" docs/pages/pacs-ai/content.md
rg -n "达到 60%|降低漏诊|避免误诊|提升医学检出率|全权负责|直接用于.*训练" docs/pages/pacs-ai/content.md
```

预期：章节 0–8 各出现一次；中英文均说明 60% 是当前目标而非达成结果；风险词只出现在限制性表述中。

- [ ] **步骤 7：提交页面母稿**

```bash
git add docs/pages/pacs-ai/content.md docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md
git commit -m "docs: 重写 PACS 完整读片页面母稿"
```

### 任务 3：完成文档一致性验证与状态同步

**文件：**

- 修改：`docs/superpowers/specs/current/2026-09-26-pacs-case-study-page-outline.md`
- 修改：`docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md`

- [ ] **步骤 1：检查三层文档的核心事实一致**

运行：

```bash
rg -n "数字化基础|读片完成率|60%|医疗主任|算法同事" docs/project/PACS读片与AI辅助判断.md docs/project/content-readiness.md docs/pages/pacs-ai/content.md docs/superpowers/specs/current/2026-09-26-pacs-case-study-page-outline.md
```

预期：四份文档均保持相同的项目起点、职责边界和指标属性。

- [ ] **步骤 2：检查 Markdown 格式**

运行：

```bash
git diff --check -- docs/project/PACS读片与AI辅助判断.md docs/project/content-readiness.md docs/pages/pacs-ai/content.md docs/superpowers/specs/current/2026-09-26-pacs-case-study-page-outline.md docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md
```

预期：没有尾随空格、冲突标记或格式错误。

- [ ] **步骤 3：更新评审稿状态**

将页面大纲状态更新为“已同步至正式母稿（2026-09-28）”，并注明后续文案维护以 `docs/pages/pacs-ai/content.md` 为准。

- [ ] **步骤 4：完成最终提交**

```bash
git add docs/superpowers/specs/current/2026-09-26-pacs-case-study-page-outline.md docs/superpowers/plans/current/2026-09-28-pacs-complete-case-content-sync.md
git commit -m "docs: 完成 PACS 内容文档同步"
```
