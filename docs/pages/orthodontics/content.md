# 案例母稿 02：正畸筛查与状态管理 (Orthodontics Screening & Status Management)

> **项目 Slug**：`orthodontics`  
> **页面定位**：深度案例 / 跨角色流程重构
> **阅读目标**：让读者在几分钟内看懂问题、我的责任、三个产品判断、流程改变和结果边界。

## 0. 先看懂这个项目 (One-minute Summary)

### 中文

- **问题**：正畸筛查依赖快筛、面评会和口头转交，临时患者容易漏掉，筛查、专业结论、报告和预约也彼此断开。
- **我的角色**：产品与设计负责人，负责门诊调研、流程与规则、PRD、交互/UI，以及开发、测试、专业验收和上线推进协作。
- **核心判断**：取消重复的独立快筛；按替牙发育窗口安排推荐和再筛查；让儿牙做轻量前置筛查，把专业结论交给正畸医生。
- **关键改变**：患者从一次性筛查对象变成有状态、有下一责任人和跟进时间的流程对象。
- **结果**：内部业务统计显示，全门店正畸成交转化率在 2025 年 2—4 月约 30%—40%，2026 年 2—4 月约 50%—60%；这是一组同期周期对比，不单独归因于本项目。上线至今累计漏斗为 `54,990 → 19,640 → 18,460 → 9,923 → 5,495`。
- **证据边界**：流程、角色、优先级、状态和资料有效期有原始材料支持；异常处理效果、分阶段采纳率、正式权限表和脱敏界面素材仍待补。

### English

- **Problem**: Orthodontic screening relied on one-off checks, review meetings, and verbal handoffs. Walk-in patients could be missed, while screening, specialist conclusions, reports, and bookings stayed disconnected.
- **Role**: Product and Design Lead responsible for clinic research, workflow and rule design, PRDs, interaction/UI, and coordination across engineering, QA, specialist review, and rollout.
- **Key judgments**: Remove duplicate fast screening; schedule recommendations and re-screening around eruption windows; keep pediatric screening lightweight while reserving specialist conclusions for orthodontists.
- **Change**: Patients became trackable workflow objects with a state, an owner, and a next follow-up date instead of one-off screening records.
- **Evidence**: Internal reporting compares all-clinic conversion at approximately 30–40% in Feb–Apr 2025 with 50–60% in Feb–Apr 2026. This is a period comparison, not a single-project causal claim. The cumulative funnel since rollout is `54,990 → 19,640 → 18,460 → 9,923 → 5,495`.

## 1. 为什么要改变筛查 (Context & Tension)

过去，门诊会提前按周安排面评会，再叠加快筛和儿牙面评。这样的流程有三个现场问题：

1. 同一患者可能被重复筛选，儿牙医生的结论还要再找正畸医生确认。
2. 面评会只看未来一周的排期，临时就诊患者可能没有进入筛查。
3. 管理者很难知道患者停在筛查、结论、报告还是预约环节，也无法清楚判断下一步由谁负责。

所以设计挑战不是“再做一个入口”，而是把一次性动作改成可持续跟进的跨角色流程。

**English**: The challenge was not to add another entry point, but to turn disconnected screening events into a trackable workflow with explicit handoffs.

## 2. 我的角色与推进方式 (Role & Delivery)

我承担产品与设计负责人及项目管理职责，具体包括：

- 走访门诊，梳理快筛、面评会、儿牙面评和转诊中的断点；
- 定义推荐条件、替牙优先级、患者状态、资料有效期和异常路径；
- 输出 PRD、交互与 UI，协调前端、后端、测试和正畸总监验收；
- 以单店试点、多店验证、全门店上线的节奏推进，而不是直接把首版规则推向所有门店。

成交结果由门店和业务团队共同承担。我的案例重点是：如何把业务判断转成可执行、可交接、可验证的产品规则。

## 3. 从一次性快筛到持续推荐 (Strategy Evolution)

### 初版：把更多判断放在前端

初版希望儿牙医生一次收集更多影像和判断信息，再交给正畸医生。单店试点发现，接诊高峰下字段多、判断重，流程难以持续执行。

### 迭代：做减法，再把专业判断放回专业角色

迭代后的链路是：系统推荐 → 护士采集资料 → 儿牙医生轻量筛查与沟通 → 正畸医生确认结论 → 运营推进报告和预约。取消独立快筛，是为了减少重复操作并接住临时患者，不是删除筛查能力。

**策略变化**：从“尽量一次收齐资料”转向“先让流程跑起来，再在正确的专业节点补足信息”。

## 4. 核心机制：让患者进入一条可跟进的链路 (Core Mechanism)

### 4.1 按发育窗口推荐，而不是无差别推送

系统结合年龄、牙列发育、历史结论、跟进时间和家长诉求推荐筛查。待处理量较大时，按以下五级顺序调度：

`恒牙列 → 剩余四颗乳牙 → 2-2 萌出完毕 → 上 1 萌出完毕 → 其余替牙期`

这是一套门诊承接量的调度优先级，不等同于医学风险等级或最终诊断。无结论患者按“未曾面评”重新进入推荐；到达指定再筛查时间的患者优先处理。

### 4.2 角色分工：每一步都有明确接力人

| 角色 | 负责什么 | 交接到哪里 |
| --- | --- | --- |
| 护士 | 采集面相、口扫、全景片等资料 | 进入儿牙筛查待办 |
| 儿牙医生 | 基础筛查、机会识别、家长沟通、发起会诊/转诊 | 进入正畸结论或会诊 |
| 正畸医生/总监 | 专业判断、结论确认和专业验收 | 进入报告、方案或后续预约 |
| 运营/业务 | 报告沟通、补充信息、预约和转化跟进 | 更新患者状态 |

### 4.3 状态和资料有效期：把“下一步”写进系统

患者状态覆盖“未筛查—筛查中—待结论—需矫—推进中—已预约—完成”等阶段，每个阶段显示下一责任人和跟进时间。推荐人、筛查人和结论确认人留痕，方便跨角色交接和后续业务核对。

面相照片有效期为 6 个月，口扫数据和全景 X 光片有效期为 1 年；资料超期进入重新采集待办。暂不干预、外院矫正、异常结束和早期矫正结束等状态保留再评估时间，允许患者按发育节点重新进入推荐。

## 5. 三个关键产品判断 (Key Decisions)

### 判断一：为什么取消独立快筛？

- **方案 A**：保留快筛，再把结果交给面评会。
- **方案 B**：取消重复快筛，系统推荐后直接进入儿牙面评。
- **选择 B 的理由**：原流程存在重复筛选，周排期还可能漏掉临时患者；直接进入儿牙面评能减少一次交接，同时保留后续正畸专业确认。
- **代价与边界**：推荐规则和状态管理必须更准确；取消快筛不代表所有患者都完成了筛查。

### 判断二：为什么按替牙发育窗口分流？

- **方案 A**：按年龄或全量患者无差别推送。
- **方案 B**：按恒牙列、剩余四颗乳牙、2-2、上 1 等发育节点排序，并结合指定再筛查时间。
- **选择 B 的理由**：在专家承接量有限时，先处理更接近关键干预窗口的患者，减少排期拥堵。
- **代价与边界**：优先级是运营调度规则，不是医学风险分级；实际误判量和处理效果仍需要独立统计。

### 判断三：为什么削减儿牙端字段？

- **方案 A**：让儿牙医生一次填完更多影像和专业判断。
- **方案 B**：儿牙端保留轻量初筛和沟通，复杂影像判断与最终结论交给正畸医生。
- **选择 B 的理由**：单店试点显示，前端字段过多会增加接诊负担；减法让关键角色更容易持续执行，也守住专业权责边界。
- **代价与边界**：后端必须承接补充资料、会诊、审核和超期重采集，不能把“完成初筛”写成“完成诊断”。

## 6. 结果与证据 (Results & Evidence)

### 同期成交转化率

| 周期 | 全门店正畸成交转化率 | 口径 |
| --- | --- | --- |
| 2025 年 2—4 月 | 约 30%—40% | 内部业务系统统计 |
| 2026 年 2—4 月 | 约 50%—60% | 内部业务系统统计 |

这组数据可描述为同期周期的区间变化，不能直接写成单一功能带来的因果提升。

### 上线至今累计漏斗

`推荐目标 54,990 → 筛查转交 19,640 → 提交结论 18,460 → 需矫 9,923 → 预约锁定 5,495`

- 需矫率：`9,923 / 18,460 = 53.75%`；
- 需矫预约率：`5,495 / 9,923 = 55.38%`；
- 周期为全门店上线至今累计，和上面的同期转化率不是同一统计口径。

### 仍待补的证据

正式权限矩阵、异常状态发生量、分阶段门店与样本量、试点采纳证据，以及脱敏流程图/状态图/看板/报表素材，补齐前只作为待验证项。

## 7. 能力迁移与复盘 (Transferable Learning)

这个项目让我把“流程优化”具体化为三种可迁移能力：

1. **把现场问题翻译成规则**：不是增加入口，而是定义推荐、状态、责任人和再进入条件。
2. **用角色边界降低系统负担**：让前端做能持续执行的轻量判断，把专业判断交给正确角色。
3. **用阶段性验证推进上线**：单店试点暴露负担，多店验证检验协作，全门店上线后再用报表观察漏斗。

**English**: The transferable lesson is to translate operational ambiguity into explicit rules, keep each role within a sustainable workload, and validate rollout in stages instead of treating a first release as a universal proof.

## 8. 事实来源与页面资产 (Sources & Assets)

- 事实底稿：[`docs/project/正畸筛查与状态管理.md`](../../project/正畸筛查与状态管理.md)
- 原始流程材料：`docs/origin/咬合筛查/面评拆分梳理.md`、`docs/origin/咬合筛查/250507-面评拆分.md`
- 流程结构核对：`docs/origin/咬合筛查/正畸全流程.pdf`
- 设计规范：[`design.md`](./design.md) 与根目录 [`DESIGN.md`](../../DESIGN.md)
- 页面视觉素材和代码映射：待补脱敏导出图后，再同步 `src/data/projects.js` 与 `src/pages/cases/Orthodontics/`。
