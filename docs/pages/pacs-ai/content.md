# 案例母稿 03：PACS 完整读片与 AI 辅助判断

> **English title**: PACS Structured Reading & AI-Assisted Review
> **项目 Slug**：`pacs-ai`
> **页面分类标签**：`专业流程 / 医疗过程数字化 / AI 协作` (`Specialist Workflow / Clinical Process Digitalization / Human-AI Collaboration`)
> **事实主来源**：[`docs/project/PACS读片与AI辅助判断.md`](../../project/PACS读片与AI辅助判断.md)

## 0. 元数据与个人定位

### 中文

- **项目定位**：补齐拍片后的读片、沟通、记录与病历同步链路，并让 AI 以医生可复核、可选择、可降级的方式进入工作流。
- **项目性质**：医疗过程数字化基础建设，不是由某个单点事故触发的修复项目。
- **基础读片职责**：与产品经理共同讨论流程和交互方案，与医疗主任确认专业规则；负责流程交互与界面设计，设计确认后共同整理 PRD。
- **AI 辅助读片职责**：独立负责产品方案、适用范围、医生复核、写入选择、异常降级、交互、UI 与 PRD。
- **协作边界**：算法同事负责模型、识别能力与训练；医生负责最终影像诊断。
- **核心命题**：先让拍片后的专业动作进入系统，再让 AI 进入医生的工作。

### English

- **Positioning**: Complete the post-imaging workflow across reading, communication, structured records, and chart synchronization, then bring AI into that workflow with doctor review, choice, and manual fallback.
- **Project type**: Foundational clinical-process digitalization rather than a reaction to a single incident.
- **Structured-reading scope**: Co-defined the workflow and interaction with the product manager, aligned clinical rules with the medical director, owned interaction and interface design, and co-authored the PRD after the design was agreed.
- **AI-assisted scope**: Independently owned the product solution, applicable image scope, doctor-review rules, chart-entry choices, exception handling, interaction, UI, and PRD.
- **Collaboration boundary**: The algorithm colleague owned the model, recognition capability, and training; doctors remained responsible for final interpretation.
- **Core proposition**: First make post-imaging clinical work part of the system; then bring AI into the clinician's workflow.

## 1. 首屏与核心信息

### 中文

**主标题**

> 让拍片后的读片、沟通和记录重新进入系统

**摘要**

> 原系统能够判断患者是否应该拍片，却没有继续记录拍片后的读片过程。我们通过影像同步、结构化读片、完成状态和病历写入补齐医疗过程数字化链路；系统上线后，组织开始持续监控读片完成率。在这条闭环上，AI 进一步提供医生可复核、可选择、可降级的辅助提示。

**首屏只表达**

- 完整项目范围：基础读片闭环 + AI 辅助读片。
- 作者在两个阶段不同的责任强度。
- 系统已上线并进入真实读片流程。

首屏不展示 `+142%` 或 `1.43 → 3.46`，避免把缺少正式报表和因果归因的运营观察包装成核心成果。

### English

**Headline**

> Bring post-imaging reading, communication, and records back into the system

**Summary**

> The original system could determine whether a patient should receive imaging, but it did not continue tracking what happened after the image was taken. We completed that clinical-process chain through image sync, structured reading, completion states, and chart entry. After launch, the organization began monitoring reading completion as an operating metric. AI was then added inside this workflow as an assistive layer that doctors could review, accept, reject, or bypass through a manual fallback.

**Hero scope**

- Full project: structured-reading foundation plus AI-assisted review.
- Different ownership levels across the foundational and AI stages.
- A live workflow used in real reading operations.

The hero does not use `+142%` or `1.43 → 3.46` because the formal report path and causal attribution are not yet available.

## 2. 现场与代价

### 中文

### 2.1 数字化链路停在拍片

原系统只覆盖“患者是否应该拍片”。影像拍摄完成后，系统无法继续确认医生是否完成读片、内容是否完整，以及结果是否进入病历。拍片已经数字化，拍片后的专业动作仍处于系统之外。

### 2.2 管理人员看不到执行情况

需求最初由管理人员提出。没有状态和记录时，管理人员无法区分已经完成、信息不完整和始终未处理的影像，也无法从门店和医生维度持续跟进。

### 2.3 医生的沟通没有形成记录

过去医生主要用手指着影像向家长口头说明，读片内容难以及时留在系统中。后续接诊人员无法稳定回看当时的影像标记和文字判断，管理人员也缺少可以检查的读片记录。

### 2.4 不监控会发生什么

不直接产生经营业绩、但影响诊疗完整性的专业动作，容易在繁忙接诊中失去持续反馈。若没有读片状态和记录，组织无法确认必要动作是否完成；出现异常时，也难以追溯当时是否读片、由谁处理以及内容是否进入病历。

这里描述的是过程风险和能力缺口，不宣称项目已经量化减少漏诊、误诊或医疗事故。

### English

### 2.1 The digital chain stopped at image capture

The original system covered only whether imaging was recommended. Once an image was taken, it could not consistently show whether reading had been completed, whether the record was complete, or whether the result entered the patient chart. Imaging was digital, but the professional work after imaging remained outside the system.

### 2.2 Management could not see execution status

The initial request came from clinical management. Without states and records, management could not distinguish completed readings, incomplete records, and images that remained unprocessed, nor follow them by clinic and doctor.

### 2.3 Doctor communication did not become a reusable record

Doctors mainly pointed at the image while explaining it to parents. The interpretation did not reliably become a structured system record that another clinician or manager could review later.

### 2.4 What remains at risk without monitoring

Necessary clinical actions that do not directly produce revenue can lose visibility in a busy operating environment. Without reading states and records, the organization cannot confirm whether the action was completed or trace who handled it and whether the content entered the chart.

This describes a process risk and capability gap. It does not claim a measured reduction in missed diagnoses, misdiagnoses, or adverse events.

## 3. 根因分析与设计命题

### 中文

表面问题是“系统里没有读片页面”，根因则是拍片后的专业动作没有被建模：没有稳定的状态、结构化内容、完成校验、病历去向和管理指标。

因此设计命题不是增加一个页面，而是：

> 如何把拍片后的专业动作变成可执行、可记录、可追踪的系统流程，并让医生、管理人员和后续 AI 能力共享同一套记录基础？

项目遵循两层建设顺序：

1. 先建立基础读片闭环，让每一次读片有状态、有内容、有去向。
2. 再让 AI 提供异常线索，但保留医生的复核、写入、否决和手动继续能力。

### English

The visible issue was the absence of a reading interface. The deeper issue was that the professional work after imaging had not been modeled: there was no stable state model, structured content, completion validation, chart destination, or management metric.

The mission was therefore not to add one screen, but to answer:

> How might we turn post-imaging professional work into an executable, recordable, and traceable system workflow, with a shared record foundation for doctors, management, and later AI capabilities?

The project followed two layers:

1. Establish a structured-reading workflow in which each reading has a state, content, and destination.
2. Add AI anomaly cues while preserving doctor review, chart-entry choice, rejection, and manual continuity.

## 4. 核心约束与边界

### 中文

1. **专业责任边界**：医疗规则需要与医疗主任确认；最终影像诊断由医生负责。
2. **个人职责边界**：基础读片阶段是共同讨论和共同整理 PRD，作者负责流程交互与界面；AI 阶段才是独立负责产品方案和 PRD。
3. **病历写入边界**：未读片或信息不完整的内容不得同步；AI 提示不能未经医生选择自动成为病历内容。
4. **流程连续性**：AI 是增强能力，超时或失败不能阻断医生完成读片。
5. **指标边界**：读片完成率衡量推荐拍片记录中已经完成读片的比例，不代表诊断准确率或整体医疗质量。
6. **证据边界**：当前动态目标 60% 不是已达成结果；AI 减负目标没有耗时或工时数据；`1.43 → 3.46` 缺正式报表路径。

### English

1. **Clinical responsibility**: Clinical rules required alignment with the medical director; doctors remained responsible for final interpretation.
2. **Personal ownership**: The foundational stage was co-defined and co-documented, with the author owning workflow interaction and interface design. Independent product ownership applied to the AI-assisted stage.
3. **Chart-entry boundary**: Unread or incomplete content could not be synchronized. AI cues could not become chart content without doctor choice.
4. **Workflow continuity**: AI was an enhancement, not a blocking dependency. Timeout or failure could not prevent manual reading.
5. **Metric boundary**: Reading completion rate measures the share of recommended imaging records with completed readings; it is not diagnostic accuracy or overall clinical quality.
6. **Evidence boundary**: The current 60% target is not an achieved result; workload reduction has no measured time or labor evidence; `1.43 → 3.46` lacks a formal report path.

## 5. 关键机制与产品决策

### 5.1 核心解决方案

#### 基础读片闭环

1. **影像同步**：把影像同步到对应预约；同日多个预约时保持归属关系；软删除影像仍可再次同步。
2. **结构化读片**：医生在影像上框选牙位和异常区域，填写方位、密度、影像诊断和描述所见。
3. **三态完成度**：用“未读片”“读片不完整”“已读片”反馈完成情况；必填信息缺失时保持不完整。
4. **病历同步**：只有已完成的读片内容才按规则写入或拼接到病历“辅助检查”。

#### AI 辅助读片

1. 根据影像类型决定是否展示 AI；根尖片和咬翼片适用，全景片不展示 AI 数据。
2. AI 先提供疑似异常区域和判断线索，减少医生从零查找、初始标记和录入等基础操作。
3. 医生处理 AI 提示后，系统继续沿用基础读片的结构化详情、完成校验和病历同步规则。
4. AI 加载超时或失败后开放手动读片，不阻断原有流程。

AI 的减负价值属于机制目标。当前没有前后读片耗时、操作次数或医生工时数据，不能写成已量化的效率提升。

### 5.2 核心决策与权衡

#### 判断一：先用状态管理完成度，而不是只记录“打开过页面”

- **矛盾**：仅记录访问行为无法判断读片内容是否完整。
- **选择**：用必填字段和完成校验区分未读片、读片不完整和已读片。
- **代价**：医生必须补齐必要信息，流程比自由文本更受约束。

#### 判断二：AI 可以连接病历，但必须先经过医生选择

- **矛盾**：自动写入会把模型输出当成医生结论；完全断开会造成重复录入。
- **选择**：保留 AI 与病历之间的连接，但任何内容进入病历前都必须经过医生选择并完成必要详情。
- **代价**：医生仍需执行复核，系统不追求完全自动化。

#### 判断三：把“识别正确”与“是否写入”拆开

医生获得三种处理结果：

1. **判断正确，继续读片**：认可提示并继续完善详情，完成后按规则写入。
2. **判断正确，无需写入病历**：认可 AI 判断，但本次不写入病历。
3. **判断错误**：否决 AI 判断，删除标记和卡片。

三种状态增加了规则和数据处理复杂度，但避免把“算法识别正确”直接等同于“本次病历必须记录”。

#### 判断四：AI 失败不能阻断读片

- **矛盾**：AI 接口可能延迟或失败，医生仍需完成当前工作。
- **选择**：达到等待阈值或调用失败后开放手动读片。
- **代价**：需要同时维护 AI 和手动两条路径，并保证完成校验和数据结构一致。

### 5.3 完整端到端流程

`应拍片判断 → 影像同步 → 读片状态 → 手动标记 / AI 提示 → 医生复核 → 结构化详情 → 完成校验 → 病历同步 → 管理追踪`

AI 是流程中的一种能力，不是与基础读片并列的另一套系统。

### 5.4 异常机制

- **影像类型未知**：医生先确认全景片、根尖片或咬翼片。
- **影像分类错误**：纠正类型后再进入读片。
- **AI 不适用**：不支持的类型不展示 AI 数据。
- **AI 加载或调用失败**：开放手动读片；失败后可再次调用，成功后再次进入不重复调用。
- **无法读片**：已有标记时需清空并二次确认，保留明确状态。
- **信息不完整**：阻断完成操作，不同步病历。

### 5.5 设计体系与 UX 手艺

- 影像标记与文字卡片建立对应关系，降低医生在影像和列表之间定位信息的负担。
- 完成状态直接反馈是否还存在缺失信息，避免把半完成记录当作完成。
- AI 与手动操作共用同一套结构化详情和病历去向，减少两套流程之间的不一致。
- “确认但不写入”保留了医生对算法正确性和病历相关性的两层判断。
- 页面常驻“AI 结果仅供参考，医生对影像诊断结果负责”的责任说明。

### English summary

The foundational structured reading workflow synchronized images to appointments, turned reading into structured annotations, modeled unread/incomplete/complete states, and allowed only completed content to enter the chart. AI was then embedded into that same workflow rather than built as a separate tool. The key product decisions were to require doctor choice before chart entry, separate recognition correctness from chart relevance, and preserve a manual fallback whenever AI timed out or failed.

## 6. 业务结果与指标口径

### 6.1 已确认的流程与组织结果

#### 中文

- 系统从只判断患者是否应拍片，扩展到记录拍片后是否完成读片、内容是否完整，以及结果是否进入病历。
- 医生可以标记异常区域、形成结构化读片内容，并将完成记录按规则同步病历。
- 上线后，组织逐步形成读片完成率指标，并可按门店和医生查看，用于医疗质量复盘、异常定位和责任跟进。
- 读片完成率口径为“推荐拍片记录中已经完成读片的比例”；当前动态管理目标为 60%。
- AI 提示进入真实读片流程，同时保留医生的复核、写入、否决和手动继续能力。

#### English

- The system expanded from deciding whether imaging was recommended to recording whether post-imaging reading was completed, whether the record was complete, and whether the result entered the chart.
- Doctors could mark abnormalities, create structured reading content, and synchronize completed records according to defined rules.
- After launch, the organization developed reading completion rate as an operating metric, viewable by clinic and doctor for clinical-quality review, exception identification, and follow-up.
- Reading completion rate is defined as the share of recommended imaging records with a completed reading. The current dynamic management target is 60%.
- AI cues entered the real reading workflow while preserving doctor review, chart-entry choice, rejection, and manual continuity.

`60%` 是上线后形成并动态调整的管理目标，不是立项承诺，也不能写成已经达到 60%。

### 6.2 已具备来源的使用规模

| 指标 | 可用表达 | 口径限制 |
| --- | --- | --- |
| `147,793 张` | 2024-10 至 2026-08 的累计读片规模；峰值月 18,075 张 | 不代表读片完成率、准确率或 AI 效果 |
| `约 96.3%` | 数据中有 AI 参与的影像占比 | 不代表 AI 准确率、成功率或医生采纳率；数据总量与累计读片相差 4 张 |
| `3,736 条` | AI 读出后被医生删除的记录数 | 记录数维度，不是医学误诊数量，也不能证明已进入模型训练 |

**English note**: These figures use different denominators and must not be combined into a single funnel. `147,793` is an image count, approximately `96.3%` describes AI participation among images in its dataset, and `3,736` is a record count for doctor deletions.

### 6.3 待谨慎解释的运营观察

2024 年 6 月，平均每张小牙片龋齿发现数被记录为 `1.43`；AI 辅助功能约于 2024 年 11 月上线；2025 年 6 月记录为 `3.46`，相对增加约 `142%`。

该数据只可作为上线前后的运营观察：

- 不是医学金标准下的检出率、敏感度或诊断准确率；
- 不能证明变化由 AI 单独造成；
- 正式报表路径、筛选条件、样本量和统计明细仍未补齐；
- 基线曾出现 `1.34 / 1.43` 的口头差异；
- 不进入 Hero，也不作为案例唯一成果。

**English**: The `1.43 → 3.46` figure is a before-and-after operating observation only. It is not a medical detection rate and cannot be attributed to AI alone. The formal report path, filters, sample size, and statistical detail remain unavailable.

### 6.4 当前不能下的结论

- 已达到或超过 60% 的读片完成率。
- 上线使读片完成率提升了某个比例。
- 已量化减少医生工作量或读片耗时。
- 降低漏诊、误诊或医疗事故。
- 提升医学检出率、诊断准确率或整体医疗质量。
- 医生差异记录已经直接进入模型训练并改善模型效果。

## 7. 复盘反思与未解局限

### 中文

> 这个项目最重要的不是增加了多少功能，而是把拍片后的专业动作重新变成可执行、可记录、可追踪的系统流程。基础读片先连接影像、医生操作、完成状态和病历记录；AI 则在这条闭环中提供额外提示，但不替代医生作出最终判断。

这段经历也体现了职责的变化：基础阶段，我通过与产品经理和医疗主任协作，把管理目标与专业规则转成流程交互和界面；AI 阶段，我进一步独立定义产品规则、医生复核、写入选择和异常降级。高风险 AI 的价值不只取决于模型能识别什么，还取决于它如何进入人的工作，以及人在什么节点拥有选择和否决权。

仍需验证：

- 明确周期内的实际读片完成率，以及动态目标的调整记录；
- 三种医生复核结果的占比；
- AI 超时率与手动降级后的完成情况；
- 医生对记录、沟通、提示价值和操作负担的反馈；
- 差异记录是否实际进入模型分析或训练，以及对应版本效果。

### English

> The most important outcome was not the number of features added, but turning post-imaging professional work into an executable, recordable, and traceable system workflow. Structured reading connected images, doctor actions, completion states, and chart records; AI then added a second source of cues without replacing final doctor judgment.

The work also reflects a change in ownership. In the foundational stage, I worked with the product manager and medical director to translate management goals and clinical rules into interaction and interface design. In the AI stage, I independently defined the product rules, doctor review, chart-entry choices, and manual fallback. In high-risk AI products, value depends not only on what the model can recognize, but also on how it enters human work and where people retain choice and rejection rights.

Evidence still needed includes actual reading completion rates for defined periods, target-change records, the distribution of the three doctor-review outcomes, AI timeout and fallback completion, doctor feedback on workload, and proof of whether review differences entered model analysis or training.

## 8. 视觉资产与代码映射

### 原始与事实来源

- `docs/origin/读片/读片PRD.v1.md`
- `docs/origin/读片/读片新增AI判断PRD-v2.md`
- `docs/origin/读片总数据.md`
- `docs/origin/读片AI占比数据.md`
- `docs/origin/读片AI复核删除数据.md`
- `docs/project/PACS读片与AI辅助判断.md`
- `docs/project/content-readiness.md`

### 页面资产

- `docs/pages/pacs-ai/final-screens/`：真实系统关键界面。
- `public/images/pacs/`：当前前端使用的截图和封面资源。

截图最终公开前必须完成不可逆脱敏；脱敏不属于本轮内容母稿工作，但仍是发布阻断项。

### 代码映射

- `src/data/projects.js`：项目结构化数据与双语内容。
- `src/pages/cases/PacsAi/index.jsx`：PACS 详情页组件。
- `src/pages/cases/PacsAi/PacsAi.module.css`：PACS 页面样式。
- `src/pages/ProjectDetail/index.jsx`：项目详情路由分发。

### 后续同步规则

本母稿确认后，页面视觉设计与代码必须以本文件为内容来源。任何指标、职责或结论调整，应先更新事实底稿，再更新本母稿，最后同步到前端。
