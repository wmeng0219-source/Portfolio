// 2026-11-18 按用户指定的五章叙事与图文方案重组；证据边界见案例底稿。
export const caseContent = {
  hero: {
    title: {
      zh: "会员自动化与财务治理",
      en: "Member Automation & Financial Governance",
    },
    summary: {
      zh: "为连锁儿童齿科重构会员办理流程。在保留原系统底层收费能力的前提下，将割裂的卡、券、账单数据聚合为单一决策流，并把现场额外让价从事后补批改为月度额度前置校验，让办理提效与优惠授权同时落地。",
      en: "",
    },
    role: "负责一线调研、业务规则梳理、产品方案、流程交互与界面设计，并参与推进门店落地。",
    roleTags: [
      "一线调研",
      "业务规则梳理",
      "产品方案",
      "流程交互与界面设计",
      "参与门店落地",
    ],
    roles: {
      zh: [
        "我负责跟前台核对实际操作痛点，与财务敲定计费、账单及优惠授权规则，并将其转化为产品方案与界面交互；整体改造范围由团队共同拍板，研发完成系统开发。",
      ],
      en: [],
    },
  },
  sections: [
    {
      id: "overview",
      navTitle: "业务背景与架构取舍",
      title: {
        zh: "业务痛点与系统边界取舍",
        en: "Context & Constraints",
      },
      zh: [{ type: "narrative", kind: "overview" }],
    },
    {
      id: "solution",
      navTitle: "策略一：信息架构重构",
      title: {
        zh: "信息架构重构：将跨模块数据聚合成单一决策流",
        en: "Membership Handling",
      },
      zh: [{ type: "narrative", kind: "solution" }],
    },
    {
      id: "resilience",
      navTitle: "策略二：跨系统容错设计",
      title: {
        zh: "跨系统容错设计：数据歧义识别与断点人工接手",
        en: "Cross-system Recovery",
      },
      zh: [{ type: "narrative", kind: "resilience" }],
    },
    {
      id: "governance",
      navTitle: "策略三：风控前置治理",
      title: {
        zh: "规则解耦与权限前置：让合规校验发生在报价当下",
        en: "Discount Authorization",
      },
      zh: [{ type: "narrative", kind: "governance" }],
    },
    {
      id: "impact",
      navTitle: "落地验证与演进",
      title: {
        zh: "落地验证、系统边界与演进规划",
        en: "Outcomes & Boundaries",
      },
      zh: [{ type: "narrative", kind: "impact" }],
    },
  ],
};

export const screenshots = {
  workspace: {
    title: "会员办理工作台",
    width: 2400,
    height: 1350,
    caption: "左侧看患者身份，中间看旧卡状态，右侧直接查剩余服务次数。",
  },
  upgrade: {
    title: "会员升级选卡界面",
    width: 2400,
    height: 1350,
    caption:
      "弹窗内直接选新卡，同屏核对新旧权益变化与系统算出的应付金额（图中金额为示例）。",
  },
  orders: {
    title: "手动选择退费账单",
    width: 2400,
    height: 1350,
    caption:
      "浮层中三笔示例账单均实付 ¥1,000，前台可结合具体的收费时间和备注认出真正的原账单。",
  },
  failure: {
    title: "升级中断提示",
    width: 2400,
    height: 1350,
    caption: "原账单已找到、退费已完成，标红事项仍需回原系统处理。",
  },
  quota: {
    title: "手动优惠超额提示",
    width: 2400,
    height: 1350,
    caption:
      "右侧浮层中，示例优惠 ¥99 超过剩余额度 ¥80，确认按钮直接置灰锁死。",
  },
  success: {
    title: "升级成功反馈",
    width: 2400,
    height: 1350,
    caption: "全部顺利走完时，成功反馈逐项列出系统已完成的收费和会员变更。",
  },
  audit: {
    title: "会员操作日志界面",
    width: 2400,
    height: 1350,
    caption:
      "记录升级、冻结与有效期等会员变更；这张图支持卡状态追查，不展示优惠使用记录。",
  },
};

// 既有英文暂存；恢复入口前需按本轮中文结构重新审核。
const retainedEnglish = {
  hero: {
    title: "Member Automation & Financial Governance",
    summary:
      "In a pediatric dental group, membership-card handling depended on front-desk staff memorizing rules: multi-tier cards, separated coupons, and complex variables led to slow, error-prone calculations. The project built an automation and governance layer atop the clinic system, turning scattered rules into an executable and traceable workflow.",
    roles: [
      "I researched front-desk operations to identify gaps and edge cases in cashier handbooks; co-defined upgrade calculation rules with finance; and led product solution modeling, interaction, and UI design through rollout.",
      "The core focus: automate standard arithmetic, enforce explicit human stops for ambiguous exceptions, and shift discounts from verbal post-hoc approvals to upfront quota governance.",
    ],
  },
  sections: {
    overview: [
      {
        type: "paragraph",
        text: "In a pediatric dental group, membership cards are the primary prepaid customer-retention mechanism. Families pay upfront for preventive care, treatment discounts, and benefits across a dozen active card types tiered by age. Around expiration, staff handle renewals (new purchases) or upgrades (refunding residual value to offset a longer card).",
      },
      {
        type: "paragraph",
        text: "Prior to the project, operations relied on manual staff calculations across disconnected modules without system validation. Disconnected approvals created audit blind spots. The project built an automation and governance layer atop the clinic system, turning scattered rules into an executable and traceable workflow.",
      },
      {
        type: "heading",
        text: "Front-desk multitasking and mental arithmetic under pressure",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Front-desk operators juggle multiple tasks concurrently: check-ins, card setups, billing printouts, and sales inquiries with restless kids waiting in line. Though a printed handbook existed, nobody had time to consult it mid-checkout, and the legacy clinic system enforced zero rule checks on pricing.",
      },
      {
        type: "heading",
        text: "Problem 1: Cards and coupons were isolated data silos",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Single-year card benefits were split between the card record and separate coupon packs; pre-purchased cards were issued purely as coupons; multi-year cards bundled benefits inside the card. Lacking unified mapping, refunds required manual coupon searching across disconnected screens, causing frequent omissions.",
      },
      {
        type: "heading",
        text: "Problem 2: Compounding variables caused constant billing discrepancies",
        level: 3,
      },
      {
        type: "paragraph",
        text: "A child turning 6 triggered age-tier shifts; historical coupon deductibility lacked standards; cross-clinic upgrades required coordinating refunds and additions across two sites. Seasoned staff took 4–5 minutes while new hires could take over 10 minutes, generating recurring billing errors and reconciliation friction.",
      },
      {
        type: "heading",
        text: "Problem 3: Disconnected approvals left regulatory blind spots",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Discounts formally ran through DingTalk, but long approval queues forced desks to seek verbal phone sign-offs before applying manual discounts, submitting paperwork post-hoc. This created unlinked audit gaps where finance struggled to verify compliance during monthly reconciliations.",
      },
      {
        type: "paragraph",
        text: "These issues forced operators to act as calculators, reconcilers, and compliance judges all at once. The transformation needed to redraw systemic boundaries rather than simply restyle screens.",
      },
    ],
    solution: [
      {
        type: "paragraph",
        text: "The system creates reliable underlying mappings between cards, coupon bundles, and orders, establishing a 4-step decision pipeline: verify card status, penetrate asset valuations, calculate target differences, and check quota rules. Standard flows run automatically with one-click execution; ambiguous exceptions stop for human verification; and failures identify the steps requiring manual handling in the clinic system.",
      },
      {
        type: "paragraph",
        text: "Under high-pressure front-desk environments, interface design prioritized cognitive clarity. The selection dialog brings target cards, benefits, coupons, and the payable amount together for front-desk confirmation.",
      },
      {
        type: "heading",
        text: "System boundary and division of duties",
        level: 3,
      },
      {
        type: "heading",
        text: "Key trade-offs and engineering pragmatism",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Why not replace the whole clinic billing system? Clinic billing is entangled with clinical treatments, prophylaxis, and orthodontics. The new system shipped rapidly to resolve calculation bottlenecks and discount leaks, at the deliberate operational cost of having operators bridge two screens.",
      },
      {
        type: "paragraph",
        text: "Why avoid real-time cross-clinic fund transfers? For cross-clinic upgrades, the system links cards, coupons, and differential bills into a traceable trail. However, inter-store financial reconciliation remains on the core system's batch settlement. Knowing where to stop technical ambition is key to delivery.",
      },
    ],
    decisions: [
      {
        type: "paragraph",
        text: "Fragmented rules forced desks to recalculate manually; ambiguities led to frequent billing errors.",
      },
      {
        type: "paragraph",
        text: "Encode standard rules into a 4-step pipeline; halt immediately on missing/multiple orders or frozen cards.",
      },
      {
        type: "paragraph",
        text: "Exception paths must be explicit; ambiguous data should stop for confirmation, never be guessed.",
      },
      {
        type: "screenshot",
        slotId: "orders",
      },
      {
        type: "screenshot",
        slotId: "failure",
      },
    ],
    governance: [
      {
        type: "paragraph",
        text: "DingTalk queues forced verbal phone sign-offs with delayed submissions, leaving audit blind spots.",
      },
      {
        type: "paragraph",
        text: "Allocate monthly quotas by clinic and role; grant autonomous desk discounts within quota; block strictly when exhausted.",
      },
      {
        type: "paragraph",
        text: "Removing approvals does not eliminate scrutiny; upfront quotas paired with full audit logs close the loophole.",
      },
      {
        type: "screenshot",
        slotId: "quota",
      },
      {
        type: "screenshot",
        slotId: "audit",
      },
    ],
    impact: [
      {
        type: "heading",
        text: "Key results",
        level: 3,
      },
      {
        type: "heading",
        text: "Rollout and boundaries",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Piloted in 6 clinics before rolling out to over 20 clinics nationwide.",
      },
    ],
  },
};
caseContent.hero.summary.en = retainedEnglish.hero.summary;
caseContent.hero.roles.en = retainedEnglish.hero.roles;
caseContent.legacySections = [
  {
    id: "overview",
    navTitle: "Project Overview",
    title: { en: "Project Overview" },
  },
  {
    id: "solution",
    navTitle: "Solution in Practice",
    title: { en: "Solution in Practice" },
  },
  {
    id: "decisions",
    navTitle: "Automation Boundaries",
    title: { en: "Automation Boundaries" },
  },
  {
    id: "governance",
    navTitle: "Discount Governance",
    title: { en: "Discount Governance" },
  },
  {
    id: "impact",
    navTitle: "Outcomes & Boundaries",
    title: { en: "Outcomes & Boundaries" },
  },
].map((section) => ({ ...section, en: retainedEnglish.sections[section.id] }));
