# 案例母稿 04：接诊全流程预习与任务编排引擎 (Pre-visit Orchestration & Task Engine)

> **项目 Slug**：`pre-visit-engine`  
> **页面分类标签**：`跨系统整合 / 任务编排 / 设计驱动产品` (`Cross-System Integration / Task Orchestration / Design-Led Product`)  
> **当前状态**：深度候选案例 / 扩展案例（第 4 顺位）

---

## 0. 元数据与个人定位 (Metadata & Scope)

### 中文
- **项目标题**：接诊全流程预习与任务编排引擎
- **个人职责**：Product Designer ➔ Product Owner / Designer。主导全链路交互与体验设计，面对高密度业务规则直接进行产品逻辑推演，反向撰写完整需求文档与 PRD，驱动技术解耦与全量上线。
- **核心命题**：打破网络电话、领健 ERP、360 病史三大系统孤岛，将原本高度依赖经验、信息散落多处的接诊前准备，重构为“全景视图 + 结构化任务包 + 算法可解释推荐 + 医护运线上协同”的预习编排引擎。

### English
- **Project Title**: Pre-visit Orchestration & Task Engine
- **Role**: Product Designer ➔ Product Owner / Designer. Led end-to-end interaction and UX design; facing high-density business logic, directly synthesized product rules and authored full enterprise PRDs, driving technical decoupling and implementation.
- **Mission**: Broken down silos across VoIP phone, ERP billing, and 360 EHR systems, transforming experience-dependent pre-visit preparation into an automated orchestration engine featuring panoramic profile views, structured task bundles, explainable algorithm suggestions, and multi-role online collaboration.

---

## 1. 首屏与核心指标 (Hero & Key Metrics)

### 1.1 一句话背景 (Hero Summary)
- **中文**：儿童口腔诊疗包含初诊、复诊、龋齿评估、多生牙追踪与续卡转化等多重诉求。接诊前准备信息散落在网络电话、ERP 财务和 360 病史三大系统中，团队全靠口头交接，信息脱节频发。
- **English**: Pediatric dental care involves complex visits across new consults, caries risk, unerupted teeth tracking, and membership renewals. Pre-visit info was scattered across 3 isolated systems, relying entirely on fragile verbal handoffs.

### 1.2 首屏关键能力指标 (Hero Capabilities)
- **系统孤岛消除**：打通 `3 套独立业务系统`（VoIP 电话 + 领健收费 + 360 电子病历）
- **准备流程标准化**：接诊准备实现 `100% 结构化任务包` 执行
- **推荐透明度**：算法与规则推荐实现 `100% 抽屉式可解释溯源`
- **协同防呆**：医护运多角色流转必填校验与自动卡点高亮定位

---

## 2. 现场与代价 (Context & Tension)

### 2.1 业务现场
- 门诊每天接待数十位患儿，每个患儿到店前需要了解：家长在电话里说了什么？上次消费了什么项目？卡里还有多少余额？既往有哪些过敏史或影像发现？
- 护士、儿牙医生、门店运营在各自的电脑前分别打开不同的软件系统查找碎片信息。

### 2.2 现实代价
1. **人工拼接耗时且极易遗漏**：单人接诊前查阅拼凑耗费大量时间，高峰期容易遗漏关键检查或病史。
2. **多角色协同口头化、无承接**：没有线上任务流转机制，医护运目标对不齐，错失最佳治疗或商业续卡窗口。
3. **一线对“算法推荐”产生抵触**：如果系统只给推荐任务而不说明原因，医生和护士往往觉得是“系统硬塞的额外工作”而拒绝执行。

---

## 3. 根因分析与设计命题 (Diagnosis & Mission)

### 3.1 表面痛点 vs 系统根因
- **表面痛点**：“系统太多切换麻烦、预习太费时间、推荐的任务不合心意”。
- **系统根因**：**跨系统数据缺乏聚合视图**，且**推荐规则处于黑盒状态**，缺少将隐性业务规则转化为显性任务包的编排系统。

### 3.2 设计命题
> **从“经验驱动与口头交接”，升级为“全景汇总、结构化任务编排与可解释的前置协同引擎”，并通过交互推演反向收束底层业务规则。**

---

## 4. 核心约束与范围 (Constraints & Scope)

1. **底层系统不可颠覆约束**：领健 ERP 与第三方电话系统底层数据库无法重构，必须通过前端中间层与 API 聚合做数据解耦。
2. **口腔专业操作精度约束**：儿童牙位包括乳牙与恒牙混合列，空间位置复杂，通用表单无法支撑高精度的牙位交互。
3. **时效性与数据一致性**：预习动作可能提前 1–3 天完成，必须考虑期间患者突发退改签或就诊变更的方案失效风险。

---

## 5. 关键机制与产品决策 (Mechanism & Product Decisions)

### 5.1 整体流程重构 (Before vs After)

```text
[Before 跨系统手工拼接模式]
查网络电话录音 ➔ 查领健 ERP 收费 ➔ 查 360 病历影像 ➔ 微信群/口头对齐 ➔ 现场临时应对
(代价：信息割裂、耗时长、遗漏率高、协同无记录)

       ↓ (预习编排引擎重构)

[After 任务编排引擎模式]
打开全景预习视图 ➔ 规则推荐结构化任务包 ➔ 抽屉一键溯源推荐理由 ➔ 医护运线上流转 ➔ 自动同步领健病历
(价值：全景汇总、任务清晰、推荐透明可信任、自动防呆阻断)
```

---

### 5.2 核心产品决策与权衡 (Key Decisions & Trade-offs)

| 决策点 (Decision Question) | 最终选择与方案 (Choice) | 权衡考量与代价 (Trade-off & Rationale) |
| :--- | :--- | :--- |
| **决策 01：为什么设计“抽屉式推荐理由可解释化”？** | **抽屉式规则溯源展示**：主流程保持清爽，点击即可查看规则推导依据。 | 算法推荐如果黑盒给出一线会抗拒；抽屉式透明化消除了防范心理，且倒逼业务方将隐性经验整理为透明逻辑。 |
| **决策 02：为什么定制“分层折叠任务包 + 十字牙位选择器”？** | **拖拽折叠分层结构 + 定制十字牙位矩阵控件**。 | 避免在长页面上一股脑铺开所有表单导致认知过载；十字牙位控件完美适配全口、象限与单颗牙位的极速定位。 |
| **决策 03：为什么引入“预习时效失效校验”？** | **设置预习时效阈值与二次确认机制**。 | 预习可能提前数天完成，过期的方案比没有方案更危险；距离接诊超期自动提示复核，防止医疗错漏。 |

---

### 5.3 核心系统架构：任务编排与协同流转 (Task Architecture)

```text
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  全景档案汇总   │   │  规则引擎推荐   │   │  医护运协同流转 │   │  自动同步病历   │
│ 电话/收费/病史  │ ➔ │ 必选/推荐/扩展包 │ ➔ │ 必填校验/防卡点 │ ➔ │ 同步领健备注回写 │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

1. **全景视图 (Panoramic View)**：一屏聚合家长核心诉求、既往过敏与病史、卡券余额与历史就诊周期。
2. **结构化任务包模型 (Task Bundles)**：分为【必选任务包】、【推荐任务包】、【自定义扩展包】，兼顾标准化与灵活性。
3. **医护运线上协作流 (Role Chain)**：
   - **护士**：确认资料完整性与前置影像。
   - **医生**：复核病史、确认预习任务与临床诊断准备。
   - **运营**：基于预习提示开展会员权益跟进与预约安排。
4. **流转防呆阻断 (Validation Gate)**：各角色交接时执行必填校验，缺失时一键滚动高亮至首个卡点。

---

### 5.4 设计体系与 UX 手艺 (Design System & UX Craft)

#### 1. 十字牙位选择控件设计 (Cross-Tooth Grid Ergonomics)
- 将复杂的 Palmer/FDI 牙位系统转译为符合医生直觉的“十字象限”界面：支持按【全口】、【单象限】、【连续牙段】、【单颗牙齿】进行点击与拖拽框选。
- 显著降低了传统下拉列表选牙位的繁琐程度。

#### 2. 设计反向驱动产品（Design-Led Product Design）
- 在面对伴随动作、牙位选择互斥、多角色交接条件等极高密度的业务场景时，线框图已无法表达复杂逻辑。
- 我直接跨越至产品底层逻辑推演，撰写完整需求文档，将交互推演转化为 Enterprise-grade 的 PRD 规则，实现了从单纯 UI 设计向 **Product Owner** 的能力跨越。

---

## 6. 业务结果与系统能力 (Impact & Rigor)

1. **跨系统协同全线上化**：打破 3 大系统孤岛，全门诊接诊前准备 100% 纳入系统结构化流转。
2. **推荐采纳率提升**：由于引入了抽屉式可解释推荐机制，一线人员对系统任务包的抵触情绪消除，协同流转阻断率降至最低。
3. **团队规范建立**：将原本依赖老员工个人经验的接诊准备，沉淀为标准化、可复制的组织资产。

---

## 7. 复盘反思与未解局限 (Retrospective)

1. **复杂业务中，交互设计就是业务建模**：当业务逻辑极其复杂时，“画原型”和“定规则”无法割裂。通过设计交互状态来反向收束产品规则，是解决复杂系统需求分歧的最有效手段。
2. **可解释性是 AI/算法落地的生命线**：无论算法多先进，如果不向一线工作者解释“为什么这样推荐”，系统就永远无法在真实业务中建立信任。

---

## 8. 视觉资产与代码映射 (Assets & Code Mapping)

| 资产类型 | 路径 / 标识 | 页面对应位置 |
| :--- | :--- | :--- |
| **底层事实文档** | [`docs/project/接诊全流程预习与编排引擎.md`](file:///Users/wen/Desktop/Portfolio/docs/project/接诊全流程预习与编排引擎.md) | 业务事实知识库 |
| **原始材料归档** | [`docs/origin/共同预习/`](file:///Users/wen/Desktop/Portfolio/docs/origin/共同预习) | 历史调研与原型材料 |
| **案例母稿** | [`docs/cases/04-pre-visit-engine.md`](file:///Users/wen/Desktop/Portfolio/docs/cases/04-pre-visit-engine.md) | 本文档（单篇 Case Study 呈现母稿） |
