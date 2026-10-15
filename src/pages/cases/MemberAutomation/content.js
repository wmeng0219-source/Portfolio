// Page copy follows the reviewed content.md; editorial notes are not public content.
export const caseContent = {
  hero: {
    title: {
      zh: "会员自动化与财务治理",
      en: "Member Automation & Financial Governance",
    },
    summary: {
      zh: "会员升级原本需要前台查卡、找账单、计算差额和处理权益，跨店与异常交易还要依赖人工判断。项目将常规升级、续卡和退卡规则交给系统处理，同时加入优惠额度校验、异常提示和失败回退，让门店更快完成操作，也让财务能追查卡、账单与权益的变化。",
      en: "Membership upgrades previously required staff to find cards and bills, calculate differences, and update benefits. Cross-clinic and exceptional transactions relied on manual judgment. The project moved standard upgrade, renewal, and cancellation rules into the system, with discount-limit checks, exception prompts, and failure recovery to support faster operation and traceable changes.",
    },
    roles: {
      zh: [
        "我负责门店与财务调研、业务规则梳理、产品方案、流程交互与界面设计，并推进全门店上线。工作同时涉及门店操作和财务核对，方案需要兼顾现场办理速度与账务可追查性。",
      ],
      en: [
        "I was responsible for clinic and finance research, business rules, product solutions, interaction and interface design, and rollout coordination across clinics. The solution needed to balance front-desk speed with financial traceability.",
      ],
    },
  },
  sections: [
    {
      id: "overview",
      title: {
        zh: "项目概览",
        en: "Project Overview",
      },
      zh: [
        {
          type: "heading",
          text: "标题（暂用）",
          level: 3,
        },
        {
          type: "heading",
          text: "项目介绍",
          level: 3,
        },
        {
          type: "heading",
          text: "我的角色与协作",
          level: 3,
        },
        {
          type: "paragraph",
          text: "我负责门店与财务调研、业务规则梳理、产品方案、流程交互与界面设计，并推进全门店上线。工作同时涉及门店操作和财务核对，方案需要兼顾现场办理速度与账务可追查性。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "**Working title:** Member Automation & Financial Governance",
        },
        {
          type: "paragraph",
          text: "Membership upgrades previously required staff to find cards and bills, calculate differences, and update benefits. Cross-clinic and exceptional transactions relied on manual judgment. The project moved standard upgrade, renewal, and cancellation rules into the system, with discount-limit checks, exception prompts, and failure recovery to support faster operation and traceable changes.",
        },
        {
          type: "paragraph",
          text: "I was responsible for clinic and finance research, business rules, product solutions, interaction and interface design, and rollout coordination across clinics. The solution needed to balance front-desk speed with financial traceability.",
        },
      ],
    },
    {
      id: "problem",
      title: {
        zh: "问题",
        en: "Problem",
      },
      zh: [
        {
          type: "heading",
          text: "一次升级，需要人工串起卡、账单和权益",
          level: 3,
        },
        {
          type: "paragraph",
          text: "会员卡、卡券和收费账单分散在不同模块。前台办理升级时，需要反复查找信息，手工计算差额和有效期，再处理原卡、新卡与权益。跨店升级还涉及账单归属，不能只把新卡开出来就算完成。",
        },
        {
          type: "heading",
          text: "异常交易不能靠同一条默认流程处理",
          level: 3,
        },
        {
          type: "paragraph",
          text: "多张可用账单、没有可用账单、卡被冻结或已经过期，都会影响能否办理及如何办理。原来的处理依赖工作人员理解规则，常规交易和异常情况没有清晰分开。",
        },
        {
          type: "heading",
          text: "优惠审批与月底核对没有解决同一个问题",
          level: 3,
        },
        {
          type: "paragraph",
          text: "逐笔人工审批会拖慢现场操作，但优惠仍缺少统一的系统边界。月底财务还需要人工比对卡、账单和权益变化，确认差异来自哪里。",
        },
        {
          type: "paragraph",
          text: "因此，项目不仅要减少页面切换，还要明确：系统能自动处理哪些情况，哪些情况必须停下来，以及事后如何查清一次操作。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "An upgrade required staff to connect card, bill, and benefit information across modules, calculate differences and validity periods, and handle both the original and replacement cards. Cross-clinic upgrades also needed correct bill attribution.",
        },
        {
          type: "paragraph",
          text: "Multiple bills, missing bills, frozen cards, and expired cards required different handling. These exceptions could not safely follow the same default path.",
        },
        {
          type: "paragraph",
          text: "Per-transaction discount approval slowed the front desk without establishing a consistent system boundary. Finance still needed to reconcile changes manually. The challenge was to define what could be automated, when processing should stop, and how each transaction could be traced afterward.",
        },
      ],
    },
    {
      id: "thinking",
      title: {
        zh: "我的判断",
        en: "Product Thinking",
      },
      zh: [
        {
          type: "heading",
          text: "判断 A：常规交易自动处理，异常交易才需要额外选择",
          level: 3,
        },
        {
          type: "paragraph",
          text: "让每笔升级都由前台重新选择和计算，会把已明确的规则继续留给人工。常规情况下，系统应匹配账单、计算差额与有效期；信息不足或存在多种可能时，再让工作人员处理，而不是强行选一个结果。",
        },
        {
          type: "heading",
          text: "判断 B：用优惠额度守住边界，而不是每一笔都等待审批",
          level: 3,
        },
        {
          type: "paragraph",
          text: "门店需要及时办理业务，财务需要控制优惠范围。两者不必通过逐笔审批来平衡：把门诊与角色的可用额度写入系统，额度内允许执行，超额明确阻断，同时记录操作依据。",
        },
        {
          type: "heading",
          text: "判断 C：自动化失败不能让会员失去原有权益",
          level: 3,
        },
        {
          type: "paragraph",
          text: "升级同时改变卡、资金和权益。如果旧卡已经失效，新卡却没生效，现场操作就算少了，也会留下更难处理的问题。因此，失败回退与成功办理应一起设计，而不是只展示成功路径。",
        },
      ],
      en: [
        {
          type: "heading",
          text: "A — Automate standard transactions; reserve extra choices for exceptions.",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Known rules should handle bill matching, price differences, and validity periods. Missing or ambiguous information should not be forced into an automatic result.",
        },
        {
          type: "heading",
          text: "B — Enforce discount limits instead of waiting for approval on every transaction.",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Clinic and role limits allow staff to act within a defined boundary, while over-limit transactions are blocked and the decision is recorded.",
        },
        {
          type: "heading",
          text: "C — A failed upgrade must not remove existing benefits.",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Card, payment, and benefit changes must be considered together. Recovery belongs in the core solution, not only the success path.",
        },
      ],
    },
    {
      id: "solution",
      title: {
        zh: "方案",
        en: "Solution",
      },
      zh: [
        {
          type: "heading",
          text: "4.1 对应判断 A：将卡、账单与权益放进同一办理流程",
          level: 3,
        },
        {
          type: "paragraph",
          text: "常规办理中，系统判断升级还是续卡，匹配账单，计算差额与有效期，并衔接领健中的原卡处理、新卡开通和补差。单年卡、多年卡、长期卡、囤卡、优惠券和手动优惠按相应规则处理，不让前台每次从头计算。",
        },
        {
          type: "paragraph",
          text: "提交前展示原卡状态、差额、目标权益和限制原因；成功后展示新旧卡关系、权益生效时间与账单归属，方便前台核对并向会员解释。",
        },
        {
          type: "paragraph",
          text: "多账单、无账单或冻结等情况出现时，再展示对应异常选项。自动匹配依赖卡和账单信息准确，信息不足时不能强行办理。",
        },
        {
          type: "paragraph",
          text: "升级规则也从“距离到期 3 个月内才能升级”调整为“仍在有效期内即可升级”。这取消了剩余月份限制，不取消卡状态、账单和权益校验。",
        },
        {
          type: "heading",
          text: "4.2 对应判断 B：额度内办理，超额时明确阻断",
          level: 3,
        },
        {
          type: "paragraph",
          text: "优惠按门诊与角色额度校验。额度内允许现场执行，超额则阻断并说明原因，取代逐笔等待人工审批的方式。",
        },
        {
          type: "paragraph",
          text: "系统记录执行人、时间和规则命中情况，便于财务追查。额度控制约束的是优惠范围，不等于财务从此不需要核对。",
        },
        {
          type: "heading",
          text: "4.3 对应判断 C：失败时保留原卡与原权益",
          level: 3,
        },
        {
          type: "paragraph",
          text: "升级失败时保留原卡与原权益，并提示失败原因，避免留下“旧卡已失效、新卡未生效”的状态。操作记录包含失败原因和回退结果，便于后续查找。",
        },
        {
          type: "paragraph",
          text: "跨门店结算仍依赖底层系统和批处理，不能将这套自动化描述为实时分账。具体接口执行顺序与重复提交防护仍需核查，不在页面补写技术实现。",
        },
      ],
      en: [
        {
          type: "heading",
          text: "4.1 For A: connect cards, bills, and benefits in one transaction flow",
          level: 3,
        },
        {
          type: "paragraph",
          text: "The system distinguishes upgrades from renewals, matches bills, calculates differences and validity periods, and coordinates original-card handling, replacement-card activation, and payment adjustments with the underlying platform. Card types, stored cards, coupons, and manual discounts follow their applicable rules.",
        },
        {
          type: "paragraph",
          text: "Before submission, staff review the original card, price difference, target benefits, and restrictions. Success feedback shows the old–new card relationship, benefit start date, and bill attribution. Exception choices appear when needed; incomplete or ambiguous information is not forced through.",
        },
        {
          type: "paragraph",
          text: "The upgrade rule also changed from eligibility only within three months of expiry to eligibility while the card remains valid. Card, bill, and benefit checks still apply.",
        },
        {
          type: "heading",
          text: "4.2 For B: allow transactions within limits and block excess discounts",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Clinic and role discount limits replace per-transaction approval. Over-limit transactions are blocked with a reason. Operator, time, and rule records support financial review; limit enforcement does not eliminate reconciliation.",
        },
        {
          type: "heading",
          text: "4.3 For C: preserve the original card and benefits after failure",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Failure recovery preserves the original card and benefits, explains the failure, and records the recovery outcome. Cross-clinic settlement still relies on the underlying system and batch processing, rather than real-time fund allocation. Detailed interface sequencing and duplicate-submission handling remain to be checked.",
        },
      ],
    },
    {
      id: "system",
      title: {
        zh: "系统机制",
        en: "System",
      },
      zh: [
        {
          type: "heading",
          text: "主流程",
          level: 3,
        },
        {
          type: "paragraph",
          text: "读取会员卡与账单 → 判断办理类型与条件 → 匹配账单、计算差额和权益 → 校验优惠额度 → 展示待确认内容 → 执行办理 → 展示结果并留存记录。",
        },
        {
          type: "heading",
          text: "异常分支",
          level: 3,
        },
        {
          type: "table",
          headers: ["情况", "处理边界"],
          rows: [
            ["多张可用账单或无可用账单", "进入对应异常处理，不强行自动匹配"],
            ["卡被冻结、已过期等", "按卡状态限制办理，并说明原因"],
            ["优惠超额", "阻断本次操作，提示额度原因"],
            ["升级执行失败", "保留原卡与原权益，提示并记录失败原因与回退结果"],
            ["跨店办理", "保留账单归属与变更记录，结算仍按底层系统规则处理"],
          ],
        },
        {
          type: "paragraph",
          text: "卡、账单与权益需要一起核对。成功反馈说明当前结果，操作记录则用于追查这一结果是如何产生的。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "Read card and bill information → determine transaction type and eligibility → match bills and calculate differences and benefits → check discount limits → show information for confirmation → execute → display and record the result.",
        },
        {
          type: "paragraph",
          text: "Missing or multiple bills use exception handling. Card restrictions and excessive discounts stop processing with reasons. Upgrade failures preserve the original card and benefits and record recovery. Cross-clinic transactions retain attribution records while settlement follows the underlying platform. This is a business-flow overview, not an interface-call sequence.",
        },
      ],
    },
    {
      id: "impact",
      title: {
        zh: "结果",
        en: "Impact",
      },
      zh: [
        {
          type: "heading",
          text: "已上线的能力",
          level: 3,
        },
        {
          type: "list",
          items: [
            "门店在同一办理流程中完成规则校验、差额计算和卡权益处理，异常情况有对应提示与处理路径。",
            "优惠有额度边界，卡、账单与权益变更有操作记录，供财务核对和追查。",
            "项目已在全门店上线；本稿不另填未经核对的门店数量。",
          ],
        },
        {
          type: "heading",
          text: "操作耗时与财务反馈",
          level: 3,
        },
        {
          type: "table",
          headers: ["指标", "变化", "来源"],
          rows: [
            [
              "典型会员升级操作耗时",
              "4—5 分钟 → 约 1 分钟",
              "门店现场实测，典型升级结算场景",
            ],
            [
              "财务对账工作耗时",
              "约 3 天 → 约 1 天",
              "财务团队估算，未做精细统计",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "升级耗时只说明已实测的典型场景，不代表所有交易的平均耗时。对账变化作为财务反馈单独展示，不与现场实测混为同一种证据。",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Live capabilities",
          level: 3,
        },
        {
          type: "paragraph",
          text: "The project is live across clinics. It connects rule checks, calculations, and card-benefit handling, with exception paths, discount boundaries, and transaction records for review.",
        },
        {
          type: "heading",
          text: "Operation time and finance feedback",
          level: 3,
        },
        {
          type: "table",
          headers: ["Measure", "Change", "Source"],
          rows: [
            [
              "Typical membership upgrade",
              "4–5 minutes → approximately 1 minute",
              "On-site measurement of a typical upgrade and settlement task",
            ],
            [
              "Finance reconciliation work",
              "Approximately 3 days → approximately 1 day",
              "Finance-team estimate, not a detailed measurement",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The upgrade observation is not an average across all transactions. The reconciliation estimate is presented separately as finance feedback.",
        },
      ],
    },
  ],
  diagrams: {
    solutionRules: {
      quota: {
        zh: [
          ["额度内", "允许现场办理，保留操作记录"],
          ["超额", "阻断办理，并说明原因"],
        ],
        en: [
          ["Within quota", "Allow on-site processing and retain records"],
          ["Over quota", "Block processing and explain why"],
        ],
      },
      recovery: {
        zh: [
          ["执行成功", "展示新旧卡关系、权益生效时间与账单归属"],
          ["执行失败", "保留原卡与原权益，提示失败原因并记录回退结果"],
        ],
        en: [
          [
            "Success",
            "Show old/new card links, benefit start time and bill ownership",
          ],
          [
            "Failure",
            "Keep the original card and benefits, explain the failure and record recovery",
          ],
        ],
      },
    },
    old: {
      zh: [
        "查卡",
        "找账单",
        "算差额与有效期",
        "处理原卡",
        "开新卡",
        "核对权益",
      ],
      en: [
        "Find card",
        "Find bill",
        "Calculate difference and validity",
        "Handle original card",
        "Open replacement card",
        "Check benefits",
      ],
    },
    system: {
      zh: [
        {
          label: "读取会员卡与账单",
        },
        {
          label: "判断办理类型与条件",
          branches: ["冻结、过期等 → 按状态限制办理"],
        },
        {
          label: "匹配账单、计算差额与权益",
          branches: ["多账单、无账单 → 对应异常处理"],
        },
        {
          label: "校验优惠额度",
          branches: ["优惠超额 → 阻断并说明原因"],
        },
        {
          label: "展示待确认内容",
        },
        {
          label: "执行办理",
          branches: ["执行失败 → 保留原卡与原权益，提示并记录原因"],
        },
        {
          label: "展示结果并留存记录",
        },
      ],
      en: [
        {
          label: "Read card and bill information",
        },
        {
          label: "Check transaction type and eligibility",
          branches: ["Frozen or expired card → apply restrictions"],
        },
        {
          label: "Match bill; calculate difference and benefits",
          branches: ["Missing or multiple bills → exception handling"],
        },
        {
          label: "Check discount limit",
          branches: ["Over limit → block with a reason"],
        },
        {
          label: "Review information for confirmation",
        },
        {
          label: "Execute transaction",
          branches: [
            "Failure → preserve original card and benefits; record cause",
          ],
        },
        {
          label: "Display and record result",
        },
      ],
    },
    visuals: {
      workspace: {
        title: {
          zh: "会员升级操作界面",
          en: "Membership upgrade workspace",
        },
        brief: {
          zh: "原卡、目标卡、补差金额与权益放在同一办理流程中。",
          en: "Original and target cards, price difference and benefits in one transaction flow.",
        },
      },
      transaction: {
        title: {
          zh: "常规升级与账单异常",
          en: "Standard upgrade and bill exceptions",
        },
        brief: {
          zh: "区分自动带入、提交前确认与异常时需要选择的信息。",
          en: "Distinguish automatic inputs, confirmation and exception choices.",
        },
      },
      quota: {
        title: {
          zh: "优惠额度与操作记录",
          en: "Discount limit and transaction records",
        },
        brief: {
          zh: "额度内允许办理，超额明确阻断；记录用于财务核对。",
          en: "Allow transactions within limits, block excess discounts and retain records for review.",
        },
      },
      recovery: {
        title: {
          zh: "失败提示与原权益保留",
          en: "Failure feedback and benefit preservation",
        },
        brief: {
          zh: "展示失败原因与原卡、原权益的保留；不伪造回退日志。",
          en: "Failure reason and preservation of the original card and benefits. No invented recovery logs.",
        },
      },
    },
  },
};
