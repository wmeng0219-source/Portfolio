# 案例母稿 01：会员自动化与服务衔接 (Member Automation)

> **项目 Slug**：`member-automation`  
> **系统版本号**：`SYS_MA_VER_3.2_STABLE`  
> **页面分类标签**：`规则系统 / 会员自动化` (`Rule System / Member Automation`)  
> **当前状态**：线上主案例（第 1 顺位）

---

## 0. 元数据与个人定位 (Metadata & Scope)

### 中文
- **项目标题**：会员自动化与服务衔接
- **个人职责**：产品经理 / 产品设计，负责门店与财务调研、规则梳理、流程与界面设计，以及全门店上线推进。
- **核心命题**：将复杂的优惠叠加与跨店结算规则转化为层级清晰的逻辑判定树，通过后台静默算价与全链路链式审计日志，实现 20+ 门店快速收银与财务合规治理。

### English
- **Project Title**: Member Automation and Service Continuity
- **Role**: Product Manager / Product Designer, responsible for clinic and finance research, rule design, workflow and UI design, and rollout across all clinics.
- **Mission**: Converted complex stacking discount and cross-store settlement rules into a clear hierarchy logic tree, enabling rapid POS checkout and finance audit compliance across 20+ stores via background price computation and immutable audit ledgers.

---

## 1. 首屏与核心指标 (Hero & Key Metrics)

### 1.1 一句话背景 (Hero Summary)
- **中文**：旧有的会员系统由于数据结构碎片化，导致会员卡、优惠券与结算流程之间缺乏有效联动。由于 20 多家门店每天产生数千笔交易，高昂的人工核对成本导致财务差异显著，同时也严重拖慢了前台的收银效率。
- **English**: Membership, coupons, payments, and billing were disconnected across 20+ stores, creating heavy manual audit costs for finance and slowing frontline checkout.

### 1.2 首屏悬浮指标卡 (Hero Floating Metrics)
| 测量维度 | 改版前 (Before) | 改版后 (After) | 变化幅度 / 状态 |
| :--- | :--- | :--- | :--- |
| **单笔升级操作耗时** | `4-5 min` (人工核对) | `1 min` (自动化 POS) | **-75% 耗时大幅缩短** |
| **月底财务对账周期** | `3 天` (逐笔人工核账) | `1 天` (异常抽样核对) | **-66.7% 效率显著提升** |
| **网络覆盖规模** | - | - | **20+ 高端连锁门店** |

---

## 2. 现场与代价 (Context & Tension)

### 2.1 业务现场
- 门诊与零售前台每天面临大量会员升级、卡券叠加、多账单组合支付场景。
- 原系统各模块割裂：收银人员需在系统内手动查询会员卡有效状态、手动计算剩余折扣差额、手动校验优惠券互斥规则。

### 2.2 现实代价
1. **前台拥堵与客户流失**：单笔复杂结算耗时长达 4–5 分钟，高峰期造成顾客长时间排队等待。
2. **错刷降损与财务黑盒**：人工算价容易算错折扣，出现超额让利或违规叠加；跨门店结算时资金流向不清晰，月底财务需全量人工平账，平均耗时 3 天。
3. **资金合规隐患**：缺乏不可篡改的操作留痕，大宗会员资产变动存在合规审计风险。

---

## 3. 根因分析与设计命题 (Diagnosis & Mission)

### 3.1 表面痛点 vs 系统根因
- **表面痛点**：“前台收银太慢，经常算错优惠券，财务对账麻烦”。
- **系统根因**：系统缺乏统一的**卡券规则引擎**与**确定性的状态机流转**，将原本应由算法判定的规则校验完全推给了人工肉眼核对。

### 3.2 设计命题
> **将“前台人工手动拼接与算价”重构为“后台规则引擎自动匹配与链式审计留痕”，使前台操作人员的角色从“数据录入员”彻底转变为“异常处理器”。**

---

## 4. 核心约束与边界 (Constraints & Scope)

1. **业务连续性约束**：20+ 门店全天候运营，升级过程不能停机，必须支持新旧会员卡体系平滑过渡。
2. **资金安全红线**：优惠叠加必须设置硬性额度保护上限，严禁任何形式的负毛利或无限叠加漏洞。
3. **一线认知负荷约束**：前台收银人员流动性较高，新系统学习成本必须控制在 15 分钟以内，主流程必须具备键盘流极速操作能力。

---

## 5. 关键机制与产品决策 (Mechanism & Product Decisions)

### 5.1 三大核心解决方案 (Core Solutions)

```text
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│     1. 规则系统化       │   │      2. 流程自动化       │   │    3. 合规与财务治理     │
│  优惠叠加判定树与层级消除歧义 │ ➔ │  一键式极速收银与静默匹配最优解 │ ➔ │  不可篡改链式审计与额度边界控制 │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

1. **规则系统化 (Systematizing Rules)**
   - *中*：将复杂的优惠叠加规则转化为层级清晰的逻辑判定树，消除歧义，统一管理卡券与权益资产。
   - *En*: Converted complex stacking discount rules into a clear hierarchy logic tree, eliminating ambiguity.
2. **流程自动化 (Workflow Automation)**
   - *中*：一键式极速收银，后台自动匹配会员身份与最优卡券组合，大幅减少前台人工干预。
   - *En*: Single-click rapid checkout; backend automatically matches member identities and optimal coupon combinations.
3. **合规与财务治理 (Compliance & Governance)**
   - *中*：每笔交易生成不可篡改的链式审计记录，引入优惠额度边界，保障大宗会员交易资金安全。
   - *En*: Generates immutable audit logs for every transaction, establishing clear discount limits for security.

---

### 5.2 核心产品决策与权衡 (Key Decisions & Trade-offs)

| 决策点 (Decision Question) | 最终选择与方案 (Choice) | 权衡考量与代价 (Trade-off & Rationale) |
| :--- | :--- | :--- |
| **自动匹配还是手动选择？** | **强制自动匹配（覆盖 95% 高频场景）**，仅验证过的异常情况开放手动干预。 | 剥夺前台随意改动折扣的自由度，换取 100% 的规则合规性与零错刷率；收银员从“数据输入员”变为“异常处理器”。 |
| **状态机驱动的界面设计？** | **动态自适应 UI**：基于会员画像与规则命中动态显隐选项。 | 消除认知负荷，保证默认黄金路径（Happy Path）一屏直达。 |
| **异常审计抽样逻辑？** | **基于离群值的智能审计标记**，取代全量流水核对。 | 财务不再逐笔人肉对账，将精力集中于系统自动高亮的“离群交易”，对账周期缩短 66.7%。 |

---

### 5.3 规则迭代演进 (Process & Rule Evolution)

```text
[V1 初版限制]
规则：距离到期 3 个月内才可升级
原因：希望通过剩余有效期简化权益折算公式
代价：阻断了仍在有效期内、但已有明确高额消费意愿的高净值会员，造成一线销售阻力

       ↓ (现场反馈与规则重构)

[V2 最终规则]
规则：有效期内均可无缝升级
机制：取消 3 个月限制，由系统底层自动折算原卡残值、新卡权益差额并校验账单归属
价值：释放高价值客户转化潜力，流程顺畅无卡点
```

---

### 5.4 设计体系与 UX 手艺 (Design System & UX Craft)

#### 1. 色彩与卡券业务语义 (Color & Coupon Semantics)
在大宗会员结算与卡券叠加场景中，建立高对比度色彩业务映射：
- `#C8B6FF`（最优权益紫 / Optimal Discount Purple）：系统推荐最高折扣，标识主结算路径。
- `#B8E6D0`（合规校验绿 / Verified Audit Green）：风控校验通过，资金账户记账成功。
- `#FFD6A5`（额度预警橙 / Limit Alert Orange）：优惠叠加达到临界阈值，触发二次确认。
- `#141922`（暗暗卡片基底 / Dark Card Base）：模块化卡片容器，减轻前台全天候操作的视觉疲劳。

#### 2. 渐进式暴露与键盘流极速操作 (Progressive Disclosure & Keyboard Ergonomics)
- **快捷键流**：支持 `Enter`（确认/下一步）、`Tab`（焦点切换）、`Esc`（取消/回退），实现 100% 全程无鼠标极速收银。
- **渐进暴露**：默认路径深度为 1 屏，多账单、无账单或额度不足等复杂异常收纳于二级抽屉。
- **认知响应**：主流程交互认知延迟控制在 `< 1s`。

#### 3. 边界保护与容错机制 (Edge Protection)
- 冻结卡、退卡、超额、跨店、网络超时等异常均有明确状态机定义与回退机制，彻底杜绝“旧卡已扣减、新卡未生效”的半完成断裂状态。

---

## 6. 业务结果与指标口径 (Business Impact & Rigor)

### 6.1 核心指标对比 (Core Metric)
- **单笔高复杂度交易处理耗时**：
  - 改版前：`4-5 min`（传统人工核对）
  - 改版后：`1 min`（系统极速收银）
  - 变化：**-75%** 耗时下降。
  - **口径说明**：数据来自门店现场实测，抽取复杂卡券叠加与会员升级结算场景。

### 6.2 次级指标与组织价值 (Secondary Metrics)
1. **财务对账效率**：月底对账由 `3 天` 缩短至 `1 天`（-66.7%）。*说明：据财务团队估算，未做精细埋点统计，因此作为次级说明，不作为首页夸大宣传。*
2. **门店网络落地**：成功覆盖 20+ 高端零售与连锁门诊，系统稳定性达到 99.9% 以上。
3. **合规治理**：不可篡改链式审计日志全局生效，错刷让利与违规叠加降为零。

---

## 7. 复盘反思与未解局限 (Retrospective)

1. **反直觉发现**：初版以为“限制规则越多越安全”（如 3 个月到期限制），但在真实商业世界中，过度限制会扼杀业务弹性。最好的风控不是限制业务发生，而是**在底层建立精确的折算公式与不可篡改的留痕机制**。
2. **未解局限与后续演进**：跨组织主体的不同法人门店之间的结算清算，目前依赖夜间批处理任务完成；未来可进一步演进为实时分账引擎。

---

## 8. 视觉资产与代码映射 (Assets & Code Mapping)

| 资产类型 | 路径 / 标识 | 页面对应位置 |
| :--- | :--- | :--- |
| **首屏封面视觉** | [`public/images/member/member_cover.svg`](file:///Users/wen/Desktop/Portfolio/public/images/member/member_cover.svg) | Hero 右侧卡片与主视觉展示 |
| **数据源文件** | [`src/data/projects.js`](file:///Users/wen/Desktop/Portfolio/src/data/projects.js) (`id: 'member-automation'`) | 注入页面 React 数据 |
| **页面组件** | [`src/pages/cases/MemberAutomation/index.jsx`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/MemberAutomation/index.jsx) | 独立案例路由页面渲染 |
| **样式模块** | [`src/pages/cases/MemberAutomation/MemberAutomation.module.css`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/MemberAutomation/MemberAutomation.module.css) | 独立 CSS 模块 |
