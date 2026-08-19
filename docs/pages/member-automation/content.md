# 案例母稿 01：会员自动化与服务衔接 (Member Automation)

> **项目 Slug**：`member-automation`  
> **系统版本号**：`SYS_MA_VER_3.2_STABLE`  
> **页面分类标签**：`规则系统 / 会员自动化` (`Rule System / Member Automation`)  
> **当前状态**：线上主案例（第 1 顺位）

---

## 0. 元数据与个人定位 (Metadata & Scope)

### 中文
- **项目标题**：会员自动化与服务衔接
- **个人职责**：产品经理 / 产品设计，负责门店与财务调研、升/续/退规则梳理、流程与界面设计，以及全门店上线推进。
- **核心命题**：把依赖人工拼凑的会员卡升级、续卡、退卡与优惠核销，重构为「系统自动判定升/续规则、自动处理账单与权益对应、优惠额度受控」的线上化流程，让前台从「数据录入」转变为「异常处理」。

### English
- **Project Title**: Member Automation and Service Continuity
- **Role**: Product Manager / Product Designer, responsible for clinic and finance research, upgrade/renewal/refund rule design, workflow and UI design, and rollout across all clinics.
- **Mission**: Replaced manual member-card upgrade, renewal, refund and discount workflows with an automated flow that judges upgrade-vs-renewal, maps bills and benefits automatically, and enforces discount quotas — shifting frontline staff from data entry to exception handling.

---

## 1. 首屏与核心指标 (Hero & Key Metrics)

### 1.1 一句话背景 (Hero Summary)
- **中文**：会员卡开卡、升级、续卡、退卡与优惠核销依赖前台手工查卡、算差额、核账单，跨店升级还涉及账单归属与资金划转；操作慢、易出错，财务月底靠人工逐笔平账。
- **English**: Membership-card opening, upgrade, renewal, refund and discount operations relied on manual lookups, calculations and bill reconciliation, including cross-clinic transfers — slow, error-prone, and a month-end audit burden for finance.

### 1.2 首屏悬浮指标卡 (Hero Floating Metrics)
- **核心指标**：典型会员升级操作耗时 `4-5 min`（人工核对）→ `约 1 min`（系统自动处理），门店现场实测。
- **落地范围**：全门店。

> **口径说明**：对账周期 3 天 → 1 天为财务团队估算、未做精细统计，按底稿约定不作为首屏核心成果，仅作次级说明（见 §6.2）。

---

## 2. 现场与代价 (Context & Tension)

### 2.1 业务现场
- 门诊前台每天面对会员卡开卡、升级、续卡、退卡、囤卡开卡、发券、冻结/解冻、有效期调整等高频操作。
- 旧系统各模块割裂：前台需手工查询会员卡有效状态、计算折扣差额、校验优惠券互斥规则；跨店升级需联系原门店退费、补差。

### 2.2 现实代价
1. **操作慢**：单次会员升级耗时 4-5 分钟，高峰期前台拥堵，客户长时间等待。
2. **易出错**：手工算价容易算错差额与优惠，优惠金额缺乏系统边界，绕过审批的违规优惠难以追溯。
3. **财务黑盒**：月底对账靠人工逐笔核对，全量平账约需 3 天；缺乏操作留痕，异常难追责。

---

## 3. 根因分析与设计命题 (Diagnosis & Mission)

### 3.1 表面痛点 vs 系统根因
- **表面痛点**："升级/退卡操作太慢、优惠总得审批、月底对账麻烦"。
- **系统根因**：卡、券、账单、优惠分散在不同模块，规则靠人脑记忆与手工执行，缺少统一的「升/续判定 + 账单自动对应 + 优惠额度控制」逻辑层。

### 3.2 设计命题
> **将「前台手工拼接」重构为「系统自动判定与处理」：自动识别升级/续卡、自动计算差价与有效期、自动对应账单与权益，额度内放行、超额阻断，前台只处理必要选择与异常。**

---

## 4. 核心约束与边界 (Constraints & Scope)

1. **底层系统不可重构**：会员数据与收费能力由领健系统承载，本系统通过接口调用领健完成注销、开卡、收费、发券；接口失败时不能产生半完成状态。
2. **资金安全**：优惠（券 + 手动优惠）必须受额度控制，超额阻断并提示原因，防止违规优惠绕开审批。
3. **一线可用性**：全门店上线，高频场景默认路径只保留必要信息，复杂异常收纳到二级处理，前台操作门槛需足够低。

---

## 5. 关键机制与产品决策 (Mechanism & Product Decisions)

### 5.1 核心解决方案 (Core Solutions)

1. **升/续/退流程自动化 (Automated Upgrade / Renewal / Refund)**
   - *中*：系统自动判定升/续规则，自动计算差价与有效期，自动调用领健接口完成原卡注销/退费、新卡开通与欠费补充，前台只做必要选择。
   - *En*: The system judges upgrade-vs-renewal automatically, computes price differences and validity, and calls the backend to handle old-card cancellation/refund, new-card activation and balance settlement — leaving only necessary choices to the frontline.
2. **账单与权益自动对应 (Automated Bill & Benefit Mapping)**
   - *中*：系统统一处理单年卡、多年卡、长期卡、囤卡、优惠券、手动优惠与跨店账单的对应关系，记录每次变更前后的卡、账单与权益。
   - *En*: The system maps bills and benefits for all card types, stored cards, coupons and cross-clinic transactions, and logs every before/after change of card, bill and benefit.
3. **优惠额度治理 (Discount Quota Governance)**
   - *中*：用运营/门店优惠额度控制总边界，额度内现场执行无需审批，超额明确阻断并提示；额度每月重置，需提前录入卡标。
   - *En*: Discounts are governed by operator/store quotas: within-quota execution needs no approval, over-quota is blocked with a clear reason; quotas reset monthly and must be pre-registered.

---

### 5.2 核心决策与权衡 (Key Decisions & Trade-offs)

| 决策点 (Decision Question) | 最终选择与方案 (Choice) | 权衡考量与代价 (Trade-off & Rationale) |
| :--- | :--- | :--- |
| **自动匹配还是人工选择？** | 高频标准场景由系统自动匹配，仅定义的异常开放人工干预。 | 避免每笔业务都重新解释规则，前台从"数据录入"转为"异常处理"。 |
| **升级 vs 续卡怎么判定？** | 固化为确定性规则：现有卡为短期卡、购买新卡为长期卡、现有卡有效期逾期 6 个月内、卡内有剩余项目 → 升级；否则续卡。恒橙卡可升级金橙卡（特殊）。 | 把门店靠经验与口头执行的规则固化为系统逻辑，减少判断差异与培训成本。 |
| **失败如何兜底？** | 任一步骤失败时保留原卡与原权益，明确失败原因，禁止出现半完成状态。 | 防止"旧卡已注销、新卡未生效"的资金与权益断裂，保证业务连续性。 |

> **口径备注**：升级判定中「现有卡有效期逾期」期限，需求文档 250811 曾记为 3 个月，收银手册（ODOS 试行版）记为 6 个月；经与现行规则确认，以 **6 个月** 为准。

---

### 5.3 机制细节：升/续判定与账单对应 (Mechanism Detail: Upgrade/Renewal & Bill Mapping)

#### 升级与续卡的判定
- 升级需同时满足：现有卡为短期卡（一年/两年卡）、购买新卡为长期卡（有效期更长）、现有卡有效期逾期在 6 个月内、卡内还有剩余项目。
- 满足条件 → 按**升级**处理：退原卡账单、计算补差、开通新卡并沿用合理有效期。
- 不满足 → 按**续卡**处理：发放新卡券/开通新卡，不涉及原卡退费。

#### 同店与跨店升级
- **同门店**：系统用当前诊所账号退原卡账单项目、收欠费（补差），一次完成。
- **不同门店**：系统用原账单诊所的账号退原卡账单项目、收欠费，完成跨店账单归属与资金划转。

#### 多账单 / 无账单的兜底
- 查询到多个原账单时，提示并允许前台选择退费账单（按收费时间、收费诊所、实付金额、就诊时间等），并在优惠明细中支持切换。
- 查询不到原账单时，给出明确提示并引导在领健核对，避免错误退费。

#### 边界状态
- 冻结：每张卡仅可冻结一次、最长一年、冻结期间有效期自动延后；使用权益后自动解冻。
- 退卡：按账单退费并注销卡券；已使用权益可查看使用记录。
- 有效期调整：根据患者年龄可自动切换对应年龄的金橙卡（生日当天生效）；长期卡修改有效期需填理由，且不能早于当前截止日。

---

### 5.4 设计体系与 UX 手艺 (Design System & UX Craft)

#### 1. 高频场景聚焦 (High-frequency Focus)
- 默认路径只展示完成典型升级/续卡所需的信息，减少前台在页面间的往返。

#### 2. 即时校验 (Inline Validation)
- 提交前显示原卡状态、差价、目标权益与限制原因，降低收银员心算与记忆负担。

#### 3. 渐进式暴露 (Progressive Disclosure)
- 只有出现多账单、无账单、额度不足或冻结等异常时，才展开二级处理选项。

#### 4. 结果反馈 (Outcome Feedback)
- 成功后明确展示新旧卡关系、权益生效时间与账单归属，便于现场向会员解释。

#### 5. 操作留痕 (Audit Log)
- 记录执行人、时间、操作类型（升级/开通/囤卡/冻结/解冻/变更/注销/权益升级）、规则命中、失败原因与回退结果，供追查与对账。

---

## 6. 业务结果与指标口径 (Business Impact & Rigor)

### 6.1 核心指标 (Core Metric)
- **典型会员升级操作耗时**：
  - 改版前：`4-5 min`（人工核对）
  - 改版后：`约 1 min`（系统自动处理）
  - **变化**：耗时缩短约 75%。
  - **口径说明**：门店现场实测，抽取典型会员升级结算场景。

### 6.2 次级指标与组织价值 (Secondary Metrics)
1. **财务对账**：据财务团队估算，月底对账由约 `3 天` 缩短至约 `1 天`。*未做精细统计，仅作辅助反馈。*
2. **门店覆盖**：全门店落地，会员业务全流程线上化操作。
3. **合规治理**：优惠额度受控、超额阻断，违规操作有据可查并配套处罚机制（工资扣款 + 双倍扣额）。

---

## 7. 复盘反思与未解局限 (Retrospective)

1. **规则固化比"限制更多"更重要**：早期倾向用更多限制保障安全，但真实商业中过度限制会扼杀业务弹性。最好的风控不是阻止业务发生，而是把规则固化为系统逻辑、用自动计算与留痕守住边界。
2. **未解局限与后续演进**：跨组织主体的不同法人门店之间的结算清算，目前依赖夜间批处理任务完成；未来可进一步演进为实时分账引擎。

---

## 8. 视觉资产与代码映射 (Assets & Code Mapping)

| 资产类型 | 路径 / 标识 | 页面对应位置 |
| :--- | :--- | :--- |
| **首屏封面视觉** | [`public/images/member/member_cover.svg`](file:///Users/wen/Desktop/Portfolio/public/images/member/member_cover.svg) | Hero 右侧卡片与主视觉展示 |
| **数据源文件** | [`src/data/projects.js`](file:///Users/wen/Desktop/Portfolio/src/data/projects.js) (`id: 'member-automation'`) | 注入页面 React 数据 |
| **页面组件** | [`src/pages/cases/MemberAutomation/index.jsx`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/MemberAutomation/index.jsx) | 独立案例路由页面渲染 |
| **样式模块** | [`src/pages/cases/MemberAutomation/MemberAutomation.module.css`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/MemberAutomation/MemberAutomation.module.css) | 独立 CSS 模块 |