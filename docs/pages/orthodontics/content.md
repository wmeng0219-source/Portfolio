# 案例母稿 02：正畸筛查与状态管理 (Orthodontics Screening & Status Management)

> **项目 Slug**：`orthodontics`  
> **页面分类标签**：`主流程重构 / 筛查机制` (`Core Flow Redesign / Screening System`)  
> **当前状态**：线上主案例（第 2 顺位）

---

## 0. 元数据与个人定位 (Metadata & Scope)

### 中文
- **项目标题**：正畸筛查与状态管理
- **个人职责**：产品与设计负责人：独立完成门诊调研、流程与规则设计、PRD/产品文档、交互与 UI，并管理开发与测试进度，协调业务、正畸总监和研发推进上线。
- **核心命题**：打破离散低效的线下快筛与面评会模式，建立基于替牙发育优先级的“状态机转化漏斗”与“儿牙-正畸多角色线上协同链路”，实现全门店正畸转化率从 30-40% 提升至 50-60%。

### English
- **Project Title**: Orthodontic Screening and Status Management
- **Role**: Product and Design Lead: independently conducted clinic research, workflow and rule design, PRDs, interaction and UI, while managing development and test progress and coordinating business, orthodontic leadership, and engineering.
- **Mission**: Replaced disconnected offline review meetings with an eruption-priority-driven state machine funnel and pedodontist-orthodontist collaboration system, boosting all-clinic orthodontic sales conversion from 30–40% to 50–60%.

---

## 1. 首屏与核心指标 (Hero & Key Metrics)

### 1.1 一句话背景 (Hero Summary)
- **中文**：矫正前置管理长期缺少一套清晰、连续的流程。过去更多依赖各门店自行组织面评会，由正畸医生主导，儿牙医生主要承担患者信息传递的角色。流程不够清晰，也缺少对筛查、结论、报告和后续预约的连续管理。
- **English**: Orthodontic pre-management relied on review events and offline coordination, leaving screening, conclusions, and follow-up disconnected.

### 1.2 首屏悬浮指标卡 (Hero Floating Metrics)
- **主标题**：破除运营黑盒，建立全链路状态机追踪 (From Operational Black Box to Full-Funnel Tracking)
- **改版前全门店正畸成交转化率**：`30-40%`（线下黑盒跟进）
- **改版后全门店正畸成交转化率**：`50-60%`（状态机漏斗追踪）
- **转化净提升**：**+20%** 显著增长

---

## 2. 现场与代价 (Context & Tension)

### 2.1 业务现场
- 传统门诊通过线下“面评会”进行正畸筛查，正畸专家按周巡店，儿牙医生在日常接诊中仅承担口头带话和患者信息搬运的角色。
- 筛查属于“一次性动作”（当次看了就看了，未立项的患者直接沉没）。

### 2.2 现实代价
1. **高危患儿大量漏诊**：儿童牙齿发育迅速，错失 7–12 岁替牙黄金干预窗口期后，骨性畸形治疗代价成倍上升。
2. **多角色协作脱节与利益矛盾**：儿牙医生缺乏筛选动力（缺少留痕依据），正畸专家时间被低价值咨询挤占。
3. **转化漏斗处于完全黑盒**：管理层无法得知推荐了多少、流失在哪个环节、下一步由谁负责。

---

## 3. 根因分析与设计命题 (Diagnosis & Mission)

### 3.1 表面痛点 vs 系统根因
- **表面痛点**：“医生没时间做筛查、家长矫正意愿低、转诊跟进容易忘”。
- **系统根因**：缺乏**连续的状态机定义**与**跨角色的利益激励闭环**。筛查被设计成了孤立的“功能”，而非贯穿患者全生命周期的“动态推荐机制”。

### 3.2 设计命题
> **取消孤立的“一次性快筛”，重构为“基于替牙发育时钟的状态化推荐与多角色任务流转机制”，并用系统精准留痕打通转诊激励。**

---

## 4. 核心约束与范围 (Constraints & Scope)

1. **门诊接诊带宽约束**：儿牙医生单次接诊时间仅 15–20 分钟，绝不能在接诊现场增加高负荷的复杂影像测量表单。
2. **医学专业权责红线**：儿牙医生只负责“发现异常与前置推荐”，最终临床矫正方案与结论必须 100% 由正畸专科医生把关。
3. **多店推广节奏**：必须经过单店试点、正畸总监验收、多店验证，方可全网推开。

---

## 5. 关键机制与产品决策 (Mechanism & Product Decisions)

### 5.1 核心解决方案 (Core Solutions)

1. **流程机制改版 (Workflow Mechanism Redesign)**
   - *中*：取消快筛这一独立前置动作，将筛查从“当次是否做”转成“什么时候做、由谁做、何时再次进入流程”的推荐机制。
   - *En*: Transitioned screening from a one-off action to a continuous recommendation and re-screening mechanism.
2. **状态化管理 (Status Management)**
   - *中*：通过正畸状态设计，把患者放入可持续跟进的流程中，让团队知道患者当前处在什么阶段、下一步由谁推进。
   - *En*: Used orthodontic status to place patients in a trackable flow, clarifying the current stage and next steps for the team.
3. **角色协作重构 (Role Collaboration Restructuring)**
   - *中*：让儿牙医生前置参与筛查，正畸医生负责专业结论，建立清晰的角色协作路径，并辅以系统任务看板。
   - *En*: Moved pediatric dentists forward in the screening process, clarifying boundaries and building systemic task handoffs.

---

### 5.2 核心决策与权衡 (Key Decisions & Trade-offs)

| 决策点 (Decision Question) | 最终选择与方案 (Choice) | 权衡考量与代价 (Trade-off & Rationale) |
| :--- | :--- | :--- |
| **为什么放弃全量筛查推流？** | **按 5 级替牙发育阶段分流调度**，放弃无差别全量推流。 | 门诊专家带宽有限。无差别推流会导致高危患儿被淹没；按发育时钟推流确保核心窗口期患儿获得 100% 专家覆盖。 |
| **儿牙医生角色为何升级为“前置筛查”？** | **赋权儿牙医生初筛 + 系统记录转诊费激励**。 | 儿牙医生与患儿家庭粘性最高；系统留痕为门诊发放转诊激励提供不可篡改依据，彻底激活前端积极性。 |
| **试点后的关键产品减法** | **大幅削减儿牙端的影像填报字段**。 | 初版试图一次收齐影像数据，导致门诊阻力巨大；果断做减法，儿牙仅做轻量初筛，复杂分析归还正畸专科。 |

---

### 5.3 机制细节：替牙期发育优先级调度 (Mechanism Detail: Eruption Priority Pipeline)

系统根据患儿年龄与牙位档案，动态计算推荐干预优先级：

```text
[Step 1] 恒牙列 (Permanent)         ➔ 最高优：骨骼发育定型关键期，必须立即干预
[Step 2] 余四颗乳牙 (4 Primary Left) ➔ 次高优：即将完成换牙，制定前期矫正方案
[Step 3] 2-2 萌出 (2-2 Erupted)     ➔ 中优：前牙区萌出评估，排查反颌与拥挤
[Step 4] 上 1 萌出 (Upper 1 Erupted) ➔ 中低优：初期替牙阶段，建立基线档案
[Step 5] 其余替牙期 (Other Mixed)   ➔ 常规跟进：定期随访与口腔健康宣教
```

---

### 5.4 机制细节：医护运角色权责矩阵 (Mechanism Detail: Role Matrix & Tab System)

```text
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│     1. 护士      │   │   2. 儿牙医生    │   │   3. 正畸医生    │   │     4. 运营      │
│  资料采集/基础影像 │ ➔ │  前置筛查/激励留痕 │ ➔ │  专业诊断/方案把关 │ ➔ │  看板跟进/预约转化 │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

1. **护士 (Nurse)**：负责资料采集与前置准备，为后续筛查提供基础影像与信息。
2. **儿牙医生 (Pedodontist)**：前置筛查链路的核心。通过系统的精准留痕，系统为儿牙医生的“转诊费激励”提供确凿的财务结算依据。
3. **正畸医生 (Orthodontist)**：负责专业结论确认与最终把关，承接进一步的矫正判断和治疗计划。
4. **运营 (Operations)**：负责推动流程并建立后续预约，通过系统看板实时跟进转化漏斗。

---

### 5.5 设计体系与 UX 手艺 (Design System & UX Craft)

#### 1. 状态机色彩语义 (State Machine Color Semantics)
- `#B8E6D0`（转化完成绿 / Conversion Success Green）：签约锁定，矫正治疗计划正式成立。
- `#C8B6FF`（会诊推进紫 / Consultation Purple）：正畸专家评估中，状态持续跟进。
- `#FFD6A5`（紧迫干预橙 / Urgent Intervention Orange）：处于发育关键窗口期，需优先复筛或转诊。
- `#1C2330`（状态容器底色 / State Container Surface）：网格化分块与卡片高亮。

#### 2. 推进里程碑 (Project Timeline)
- `2025.04` 启动开发：完成门诊调研、规则制定与首版方案构建（首轮开发约 1 个月）。
- `2025.05—08` 单店试点：正畸总监带队验收，1 家门诊完成 2 轮深度优化。
- `2025.08—12` 持续迭代：基于一线反馈做产品减法，完成 2–3 轮迭代。
- `2026.01` 多店验证：扩大至 3–4 家门诊进行为期 1 个月的验证。
- `2026.02` 全门店正式上线：覆盖全部连锁门诊。

---

## 6. 业务结果与指标口径 (Business Impact & Rigor)

### 6.1 核心转化率对比 (Core Metric)
- **全门店正畸成交转化率**：
  - 改版前：`30-40%`（2025 年 2—4 月）
  - 改版后：`50-60%`（2026 年 2—4 月）
  - **变化**：**+20% 净增幅**。
  - **口径说明**：内部业务系统统计，对比周期为 2025 年 2–4 月与 2026 年 2–4 月同比数据；指标为全门店正畸最终签约成交转化率。

### 6.2 漏斗全链路量化表现 (Funnel Volume Breakdown)
基于系统追踪的真实漏斗流转数据（样本：累计上线至今推荐目标 54,990 名患儿）：
1. **系统推荐目标 (System Recommended)**：`54,990` 例（100% 覆盖）
2. **筛查转交完成 (Screening Handoff)**：`19,640` 例（精准转交率 **35.72%**）
3. **提交结论 (Conclusion Submitted)**：`18,460` 例（三级医生结论率 **93.99%**，咬合筛查率 33.6%）
4. **识别需矫患者 (Ortho Required)**：`9,923` 例（需矫率 **53.75%**，占推荐目标 18.1%）
5. **矫正跟进预约锁定 (Follow-up Booked)**：`5,495` 例（需矫预约率 **55.38%**）

报告链补充：报告生成 `17,630` 例（生成率 95.49%）→ 报告发送 `14,150` 例（发送率 80.27%）→ 报告查看 `14,000` 例（查看率 98.95%）。
**口径说明**：内部业务系统追踪，周期为上线至今累计数据；人工取消筛查 `6,394` 例未计入转交；需矫率分母为提交结论数，需矫预约率分母为需矫数。

---

## 7. 复盘反思与未解局限 (Retrospective)

1. **产品设计需要克制**：做 B 端医疗系统最容易犯的错误是“试图在第一个环节收集全部完美数据”。通过单店试点的惨痛教训，我们学会了**“初筛极简化、专业深度化”**的权责分离。
2. **激励机制与系统结合的力量**：单纯靠行政命令推不动跨科室转诊，系统必须为业务激励机制（转诊费留痕）提供绝对客观的技术保障，产品才能真正落地生根。

---

## 8. 视觉资产与代码映射 (Assets & Code Mapping)

| 资产类型 | 路径 / 标识 | 页面对应位置 |
| :--- | :--- | :--- |
| **首屏状态机与漏斗插图** | [`public/images/ortho/ortho_cover.svg`](file:///Users/wen/Desktop/Portfolio/public/images/ortho/ortho_cover.svg) | Hero 区域与漏斗核心模块展示 |
| **数据源文件** | [`src/data/projects.js`](file:///Users/wen/Desktop/Portfolio/src/data/projects.js) (`id: 'orthodontics'`) | 注入页面 React 数据 |
| **页面组件** | [`src/pages/cases/Orthodontics/index.jsx`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/Orthodontics/index.jsx) | 独立案例路由页面渲染 |
| **样式模块** | [`src/pages/cases/Orthodontics/Orthodontics.module.css`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/Orthodontics/Orthodontics.module.css) | 独立 CSS 模块 |
