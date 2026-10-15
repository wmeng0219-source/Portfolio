# 会员自动化页面内容审核稿

> 修订日期：2026-10-08。内容审核：用户同意以本稿开展页面设计；个人判断归属、周期及反思等事项仍见第 8 节，不因开始设计而视为事实确认。
> 设计审核：用户于 2026-10-08 确认设计方向；实现：本稿第 01–06 节已同步独立页面，图片仍为占位。第 07 节按用户要求暂不公开，等待真实反思；验收记录见 design.md 与当前计划。

**阅读说明：** 第 01–06 节用于当前页面，第 07 节等待本人补充真实反思，暂不上页面，也不显示目录入口。配图备注与第 8 节编辑备注不上页面。事实有误直接在本稿指出，不需要再审核一份事实文档。

## 01｜项目概览 Project Overview

> **配图备注，不上页面：** 会员升级操作界面，能看到原卡、目标卡、补差金额与权益。真实截图准备好前保留占位，不制作假产品截图。
> **周期待确认，不上页面：** 现有资料有调研和上线时间线索，尚未核对整个项目周期，暂不填写日期。

### 中文

**标题（暂用）**

> 会员自动化与财务治理

**项目介绍**

> 会员升级原本需要前台查卡、找账单、计算差额和处理权益，跨店与异常交易还要依赖人工判断。项目将常规升级、续卡和退卡规则交给系统处理，同时加入优惠额度校验、异常提示和失败回退，让门店更快完成操作，也让财务能追查卡、账单与权益的变化。

**我的职责与协作**

> **呈现备注，不上页面：** 2026-10-08 确认开场按标题、简介、职责纵向左对齐；本节“项目概览”仅用于章节目录，不另显示为职责的大标题。原正文与事实不变，字号见 DESIGN.md §3.4。

我负责门店与财务调研、业务规则梳理、产品方案、流程交互与界面设计，并推进全门店上线。工作同时涉及门店操作和财务核对，方案需要兼顾现场办理速度与账务可追查性。

### English

**Working title:** Member Automation & Financial Governance

Membership upgrades previously required staff to find cards and bills, calculate differences, and update benefits. Cross-clinic and exceptional transactions relied on manual judgment. The project moved standard upgrade, renewal, and cancellation rules into the system, with discount-limit checks, exception prompts, and failure recovery to support faster operation and traceable changes.

I was responsible for clinic and finance research, business rules, product solutions, interaction and interface design, and rollout coordination across clinics. The solution needed to balance front-desk speed with financial traceability.

## 02｜问题 Problem

> **配图备注，不上页面：** 旧升级流程示意：查卡 → 找账单 → 算差额与有效期 → 处理原卡 → 开新卡 → 核对权益。注明依据真实流程整理，不冒充旧界面或访谈记录。

### 中文

#### 一次升级，需要人工串起卡、账单和权益

会员卡、卡券和收费账单分散在不同模块。前台办理升级时，需要反复查找信息，手工计算差额和有效期，再处理原卡、新卡与权益。跨店升级还涉及账单归属，不能只把新卡开出来就算完成。

#### 异常交易不能靠同一条默认流程处理

多张可用账单、没有可用账单、卡被冻结或已经过期，都会影响能否办理及如何办理。原来的处理依赖工作人员理解规则，常规交易和异常情况没有清晰分开。

#### 优惠审批与月底核对没有解决同一个问题

逐笔人工审批会拖慢现场操作，但优惠仍缺少统一的系统边界。月底财务还需要人工比对卡、账单和权益变化，确认差异来自哪里。

因此，项目不仅要减少页面切换，还要明确：系统能自动处理哪些情况，哪些情况必须停下来，以及事后如何查清一次操作。

### English

An upgrade required staff to connect card, bill, and benefit information across modules, calculate differences and validity periods, and handle both the original and replacement cards. Cross-clinic upgrades also needed correct bill attribution.

Multiple bills, missing bills, frozen cards, and expired cards required different handling. These exceptions could not safely follow the same default path.

Per-transaction discount approval slowed the front desk without establishing a consistent system boundary. Finance still needed to reconcile changes manually. The challenge was to define what could be automated, when processing should stop, and how each transaction could be traced afterward.

## 03｜我的判断 Product Thinking

> **配图备注，不上页面：** 三组“问题 → 判断 → 方案”示意即可，由 AI 根据文字绘制。
> **归因待确认，不上页面：** 以下提炼自已有方案和旧稿；个人提出与业务、财务共同确认的边界仍待核对，见第 8 节。

### 中文

#### 判断 A：常规交易自动处理，异常交易才需要额外选择

让每笔升级都由前台重新选择和计算，会把已明确的规则继续留给人工。常规情况下，系统应匹配账单、计算差额与有效期；信息不足或存在多种可能时，再让工作人员处理，而不是强行选一个结果。

#### 判断 B：用优惠额度守住边界，而不是每一笔都等待审批

门店需要及时办理业务，财务需要控制优惠范围。两者不必通过逐笔审批来平衡：把门诊与角色的可用额度写入系统，额度内允许执行，超额明确阻断，同时记录操作依据。

#### 判断 C：自动化失败不能让会员失去原有权益

升级同时改变卡、资金和权益。如果旧卡已经失效，新卡却没生效，现场操作就算少了，也会留下更难处理的问题。因此，失败回退与成功办理应一起设计，而不是只展示成功路径。

### English

- **A — Automate standard transactions; reserve extra choices for exceptions.** Known rules should handle bill matching, price differences, and validity periods. Missing or ambiguous information should not be forced into an automatic result.
- **B — Enforce discount limits instead of waiting for approval on every transaction.** Clinic and role limits allow staff to act within a defined boundary, while over-limit transactions are blocked and the decision is recorded.
- **C — A failed upgrade must not remove existing benefits.** Card, payment, and benefit changes must be considered together. Recovery belongs in the core solution, not only the success path.

## 04｜方案 Solution

### 4.1 对应判断 A：将卡、账单与权益放进同一办理流程

> **配图备注，不上页面：** 典型升级界面与多账单、无账单等异常提示。标出自动带入的信息、必须确认的信息，以及需要人工选择的位置。

常规办理中，系统判断升级还是续卡，匹配账单，计算差额与有效期，并衔接领健中的原卡处理、新卡开通和补差。单年卡、多年卡、长期卡、囤卡、优惠券和手动优惠按相应规则处理，不让前台每次从头计算。

提交前展示原卡状态、差额、目标权益和限制原因；成功后展示新旧卡关系、权益生效时间与账单归属，方便前台核对并向会员解释。

多账单、无账单或冻结等情况出现时，再展示对应异常选项。自动匹配依赖卡和账单信息准确，信息不足时不能强行办理。

升级规则也从“距离到期 3 个月内才能升级”调整为“仍在有效期内即可升级”。这取消了剩余月份限制，不取消卡状态、账单和权益校验。

### 4.2 对应判断 B：额度内办理，超额时明确阻断

> **配图备注，不上页面：** 优惠额度显示、额度不足或超额提示，以及操作记录。没有真实界面时用规则示意，不伪造审批记录。

优惠按门诊与角色额度校验。额度内允许现场执行，超额则阻断并说明原因，取代逐笔等待人工审批的方式。

系统记录执行人、时间和规则命中情况，便于财务追查。额度控制约束的是优惠范围，不等于财务从此不需要核对。

### 4.3 对应判断 C：失败时保留原卡与原权益

> **配图备注，不上页面：** 失败提示及回退规则示意，说明原卡和权益如何保留。没有真实失败案例时，不制作“已成功回退”的假日志。

升级失败时保留原卡与原权益，并提示失败原因，避免留下“旧卡已失效、新卡未生效”的状态。操作记录包含失败原因和回退结果，便于后续查找。

跨门店结算仍依赖底层系统和批处理，不能将这套自动化描述为实时分账。具体接口执行顺序与重复提交防护仍需核查，不在页面补写技术实现。

### English

#### 4.1 For A: connect cards, bills, and benefits in one transaction flow

The system distinguishes upgrades from renewals, matches bills, calculates differences and validity periods, and coordinates original-card handling, replacement-card activation, and payment adjustments with the underlying platform. Card types, stored cards, coupons, and manual discounts follow their applicable rules.

Before submission, staff review the original card, price difference, target benefits, and restrictions. Success feedback shows the old–new card relationship, benefit start date, and bill attribution. Exception choices appear when needed; incomplete or ambiguous information is not forced through.

The upgrade rule also changed from eligibility only within three months of expiry to eligibility while the card remains valid. Card, bill, and benefit checks still apply.

#### 4.2 For B: allow transactions within limits and block excess discounts

Clinic and role discount limits replace per-transaction approval. Over-limit transactions are blocked with a reason. Operator, time, and rule records support financial review; limit enforcement does not eliminate reconciliation.

#### 4.3 For C: preserve the original card and benefits after failure

Failure recovery preserves the original card and benefits, explains the failure, and records the recovery outcome. Cross-clinic settlement still relies on the underlying system and batch processing, rather than real-time fund allocation. Detailed interface sequencing and duplicate-submission handling remain to be checked.

## 05｜系统机制 System

> **配图备注，不上页面：** 主流程与异常分支，卡、账单、权益作为关联对象标在旁边。该图说明业务处理关系，不代表接口调用顺序。

### 中文

**主流程**

读取会员卡与账单 → 判断办理类型与条件 → 匹配账单、计算差额和权益 → 校验优惠额度 → 展示待确认内容 → 执行办理 → 展示结果并留存记录。

**异常分支**

| 情况 | 处理边界 |
| --- | --- |
| 多张可用账单或无可用账单 | 进入对应异常处理，不强行自动匹配 |
| 卡被冻结、已过期等 | 按卡状态限制办理，并说明原因 |
| 优惠超额 | 阻断本次操作，提示额度原因 |
| 升级执行失败 | 保留原卡与原权益，提示并记录失败原因与回退结果 |
| 跨店办理 | 保留账单归属与变更记录，结算仍按底层系统规则处理 |

卡、账单与权益需要一起核对。成功反馈说明当前结果，操作记录则用于追查这一结果是如何产生的。

### English

Read card and bill information → determine transaction type and eligibility → match bills and calculate differences and benefits → check discount limits → show information for confirmation → execute → display and record the result.

Missing or multiple bills use exception handling. Card restrictions and excessive discounts stop processing with reasons. Upgrade failures preserve the original card and benefits and record recovery. Cross-clinic transactions retain attribution records while settlement follows the underlying platform. This is a business-flow overview, not an interface-call sequence.

## 06｜结果 Impact

> **配图备注，不上页面：** 两组前后数据对比，分别标注操作耗时实测与财务估算。没有报表截图也可根据现有数据排版，不伪造时间趋势、样本量或财务看板。

### 中文

#### 已上线的能力

- 门店在同一办理流程中完成规则校验、差额计算和卡权益处理，异常情况有对应提示与处理路径。
- 优惠有额度边界，卡、账单与权益变更有操作记录，供财务核对和追查。
- 项目已在全门店上线；本稿不另填未经核对的门店数量。

#### 操作耗时与财务反馈

| 指标 | 变化 | 来源 |
| --- | --- | --- |
| 典型会员升级操作耗时 | 4—5 分钟 → 约 1 分钟 | 门店现场实测，典型升级结算场景 |
| 财务对账工作耗时 | 约 3 天 → 约 1 天 | 财务团队估算，未做精细统计 |

升级耗时只说明已实测的典型场景，不代表所有交易的平均耗时。对账变化作为财务反馈单独展示，不与现场实测混为同一种证据。

### English

The project is live across clinics. It connects rule checks, calculations, and card-benefit handling, with exception paths, discount boundaries, and transaction records for review.

| Measure | Change | Source |
| --- | --- | --- |
| Typical membership upgrade | 4–5 minutes → approximately 1 minute | On-site measurement of a typical upgrade and settlement task |
| Finance reconciliation work | Approximately 3 days → approximately 1 day | Finance-team estimate, not a detailed measurement |

The upgrade observation is not an average across all transactions. The reconciliation estimate is presented separately as finance feedback.

## 07｜反思 Reflection

> **编辑备注，不上页面：** 2026-10-08 用户明确暂不使用 AI 提炼的候选反思，将补充真实反思。候选已移除；此处只保留补充位置，确认后再整理中英文并加入页面与目录。

## 8. 编辑备注与资料来源（不上页面）

### 8.1 请在本稿核对

1. **个人判断归属**：自动匹配、优惠额度和失败回退，哪些由你提出，哪些由门店、财务或其他同事提出后共同确认？当前不写“独立负责全部决策”。
2. **角色表述**：最新履历确认正式岗位为 UI 设计师、兼产品职责；旧案例与事实底稿写“产品经理 / 产品设计”。正文改用具体工作，不将项目职责当作任职职称。与其他产品同事的分工仍待补。
3. **项目周期与上线推进**：请确认起止日期和实际试点、验收方式。就绪度清单已有来源线索，本轮未复核，不直接用线索补成已确认周期。
4. **反思**：等待本人补充上线后遇到的问题、实际修改或一线反馈。暂不根据规则推写个人思考。
5. **数据口径**：升级实测的时间、门店、样本和计时起止动作，财务估算对应的对账任务与周期仍待补；现有数字按原证据等级保留，不称平均提效或全场景效果。

### 8.2 整理边界

- 内容整理阶段只调整结构、表达和配图位置；随后用户同意开展设计并确认设计方向。页面实施状态见顶部，第 8 节未核实问题不因实施而关闭。
- 既有升、续、退范围保留；材料主要支撑升级场景，不补编退卡金额计算、退款到账或冻结解除的详细规则。
- 本稿未新增会员规模、续卡率或现金流数字。证据清单中的其他数据不是本项目改造前后对比，是否加入另行审核。
- 配图尚未就绪，按各节备注准备；证据缺口只在 [content-readiness.md](../../project/content-readiness.md) 维护，本轮不改变就绪状态。

### 8.3 来源

- [项目事实底稿](../../project/会员自动化.md)：规则、职责、结果与证据等级。
- [履历时间线](../../profile/career-timeline.md)：正式岗位与实际产品职责的区分。
- 原始材料：docs/origin/会员自动化/会员功能梳理.md、250811-会员系统-需求文档.md、收银补充手册（ODOS试行版）.md、ODOS 会员宣发.pptx。本轮以现有内容稿与事实底稿核对，不声称重新核查了这些原始文件。
