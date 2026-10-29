// Five-chapter case narrative; page code derives section order and diagrams from this file.
export const caseContent = {
  hero: {
    title: {
      zh: "会员自动化与财务治理",
      en: "Member Automation & Financial Governance",
    },
    summary: {
      zh: "在一家连锁儿童牙科机构中，会员卡办理原本依赖前台人工硬记规则：多卡种、卡券分离与多维变动导致算账极慢且极易出错。项目在现有门诊系统之上构建规则自动化与治理层，将散在人脑中的规则转化为系统可自动校验、可执行、可追查的闭环流程。",
      en: "In a pediatric dental group, membership-card handling depended on front-desk staff memorizing rules: multi-tier cards, separated coupons, and complex variables led to slow, error-prone calculations. The project built an automation and governance layer atop the clinic system, turning scattered rules into an executable and traceable workflow.",
    },
    results: {
      zh: "典型升级 4—5 分钟 → 约 1 分钟（门店实测）；财务核对约 3 天 → 约 1 天（团队估算）；推广至全连锁 20 多家门店。",
      en: "Typical upgrade: 4–5 minutes → about 1 minute (on-site); finance reconciliation: about 3 days → about 1 day (team estimate); rolled out to 20+ clinics nationwide.",
    },
    roles: {
      zh: [
        "我负责调研前台运营场景，确认收银手册未覆盖或不合理的实操痛点；与财务共同从手册中提炼升级折算规则；负责产品方案与规则模型设计、流程交互与界面设计，并推进全门店落地。",
        "工作重点是：把标准且繁重的算账规则收归系统，把不确定的异常状态停下来交给人工确认；将优惠从口头确认与后补审批，转变为事前定额度的刚性治理。",
      ],
      en: [
        "I researched front-desk operations to identify gaps and edge cases in cashier handbooks; co-defined upgrade calculation rules with finance; and led product solution modeling, interaction, and UI design through rollout.",
        "The core focus: automate standard arithmetic, enforce explicit human stops for ambiguous exceptions, and shift discounts from verbal post-hoc approvals to upfront quota governance.",
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
          type: "paragraph",
          text: "在连锁儿童牙科机构中，会员卡是核心的预付费与锁客方式：家长预先支付费用，换取未来周期的预防保健（如涂氟、洁牙）、诊疗折扣与就诊权益。卡种覆盖单年卡、多年卡（如金橙卡）等十几种主流类型，并按儿童周岁分段。会员卡到期前后，前台主要承接续卡（到期新购）与升级（退旧卡残值、补差价开更长周期新卡）。",
        },
        {
          type: "paragraph",
          text: "立项前，所有会员操作都在原有门诊系统内进行。由于会员卡、卡券、收费账单分散在独立模块中且缺乏规则校验，前台办理升级时不仅心算负担极重，审批也脱离系统，导致对账黑洞与财务隐患。项目确立为在现有门诊系统之上构建规则自动化与治理层，将散在人脑中的规则转化为闭环流程。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "In a pediatric dental group, membership cards are the primary prepaid customer-retention mechanism. Families pay upfront for preventive care, treatment discounts, and benefits across a dozen active card types tiered by age. Around expiration, staff handle renewals (new purchases) or upgrades (refunding residual value to offset a longer card).",
        },
        {
          type: "paragraph",
          text: "Prior to the project, operations relied on manual staff calculations across disconnected modules without system validation. Disconnected approvals created audit blind spots. The project built an automation and governance layer atop the clinic system, turning scattered rules into an executable and traceable workflow.",
        },
      ],
    },
    {
      id: "problem",
      title: {
        zh: "问题与挑战",
        en: "Problem & Challenges",
      },
      zh: [
        {
          type: "heading",
          text: "高并发下的收银现场与心算负担",
          level: 3,
        },
        {
          type: "paragraph",
          text: "现场前台面临极高的并发压力：一个运营人员往往要同时处理挂号、开卡、打印账单、售卡等四五件事，面对排队带娃的家长，收银效率要求极高。门店虽然配有纸质收银手册，但现场根本来不及翻阅；而原有门诊系统在收银改价时没有任何规则校验与限制，全靠前台人脑硬记。",
        },
        {
          type: "oldFlow",
        },
        {
          type: "heading",
          text: "问题一：卡与券结构割裂，对应关系混乱",
          level: 3,
        },
        {
          type: "paragraph",
          text: "单年卡的权益一部分在会员卡内，另一部分以卡券形式发放；囤卡也是以发券形式存在；而多年卡的所有权益则集中在会员卡本身。原系统内卡与券各自独立、缺乏关联映射。升级退旧卡时，前台必须在不同模块人工翻找卡券、逐一比对核销，极易漏退、漏算。",
        },
        {
          type: "dataSiloDiagram",
        },
        {
          type: "heading",
          text: "问题二：多维变动叠加，开错单与对不上账频发",
          level: 3,
        },
        {
          type: "paragraph",
          text: "孩子从 5 岁跨入 6 岁面临卡种年龄跳档，历史优惠券能否计入折抵缺乏统一标准，跨门店升级更涉及两店账单退补。熟练老员工算一笔差价要 4—5 分钟，新手遇到复杂账单甚至可能耗费十来分钟。开错账单、录错信息、账目对不上的问题时常发生。",
        },
        {
          type: "heading",
          text: "问题三：审批与收银脱节，违规优惠无法追溯",
          level: 3,
        },
        {
          type: "paragraph",
          text: "特殊折扣原本走钉钉审批，但收银场景紧急、审批流程较长，现场往往通过电话向管理层口头确认后直接开卡改价，后续再补提审批。大量“先办后补”导致审批与账单完全脱节，财务月初核对上月账单时，频繁面临违规优惠与账实不符。",
        },
        {
          type: "paragraph",
          text: "三个问题交织在一起：前台在缺乏系统校验的情况下身兼规则计算、资产比对和改价审批三重压力。系统改造的核心不是单纯换个界面，而是从根本上重组这三项工作的系统边界。",
        },
      ],
      en: [
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
          type: "oldFlow",
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
          type: "dataSiloDiagram",
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
    },
    {
      id: "decisions",
      title: {
        zh: "核心产品决策",
        en: "Core Product Decisions",
      },
      zh: [
        {
          type: "paragraph",
          text: "面对多卡种、卡券分离与财务治理诉求，核心判断在于：把卡、券、账单建立强关联并收归系统自动化，把不确定的异常状态停下来交给人工确认；将优惠从口头确认与后补审批，转变为事前定额度的刚性治理。",
        },
        {
          type: "automationBoundaryDiagram",
        },
        {
          type: "quotaGovernanceDiagram",
        },
        {
          type: "failureProtectionDiagram",
        },
        {
          type: "paragraph",
          text: "三项决策的共同逻辑：在不确定处严格设限，在标准流程中全自动化；动钱和权益的边界绝不让系统替人盲猜，把合规与容灾从“事后补救”变为“事前机制”。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "Addressing multi-card chaos, coupon separation, and governance needs required clear boundaries: bind cards, coupons, and orders into automated pipelines; enforce explicit manual stops for ambiguities; and replace post-hoc verbal approvals with rigid upfront quota governance.",
        },
        {
          type: "automationBoundaryDiagram",
        },
        {
          type: "quotaGovernanceDiagram",
        },
        {
          type: "failureProtectionDiagram",
        },
        {
          type: "paragraph",
          text: "The underlying rationale: automate only when invariants hold; stop immediately upon ambiguity; never allow the system to guess on financial and entitlement data; and bake compliance and recovery into the core flow.",
        },
      ],
    },
    {
      id: "solution",
      title: {
        zh: "方案落地",
        en: "Solution in Practice",
      },
      zh: [
        {
          type: "paragraph",
          text: "系统在底层将零散在卡券包里的单年卡权益、囤卡凭证与会员卡建立强绑定映射，将提炼出的十几种卡种升级规则抽象为一条标准的决策流水线：系统判断升级还是续卡，带出现有卡、收费单、优惠券和剩余项目，自动测算差价与顺延有效期；标准情况一键确认执行，异常情况就地停下由人工确认，失败时先保留原卡和权益。",
        },
        {
          type: "decisionPipelineDiagram",
        },
        {
          type: "businessFlow",
        },
        {
          type: "paragraph",
          text: "前台收银面对高并发多任务的现场，界面设计的第一目标是“消除认知切换，让判断当场被看见并可被解释”。新设计将原先散在 4 个独立模块的信息，同屏结构化整合为原卡资产区、目标卡权益区与差价计算区，前台扫一眼即可对照屏幕向家长清晰解释。",
        },
        {
          type: "workspaceArchitectureDiagram",
        },
        {
          type: "evidenceGallery",
        },
        {
          type: "heading",
          text: "系统边界与协同分工",
          level: 3,
        },
        {
          type: "boundary",
        },
        {
          type: "heading",
          text: "关键取舍与工程妥协",
          level: 3,
        },
        {
          type: "paragraph",
          text: "为什么放弃重做门诊收费系统？门诊收费不仅涉及会员，还深度耦合了诊疗、预防、正畸等大量医疗项目的复杂收费规则。以最小成本在现有系统上搭建外挂自动化层（ODOS），能够以最快速度解决收银心算与优惠对账问题；代价是前台仍要在两个系统界面之间接续操作。",
        },
        {
          type: "paragraph",
          text: "为什么跨门店结算不承诺实时分账？卡在 A 店办、人在 B 店升级，新系统打通了两店的卡、券与账单流水映射，谁经手、何时办清晰可查。但资金结算依然沿用原底层系统的日终批处理。这是清晰的能力边界，不盲目承诺未经验证的技术方案。",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "The system creates robust underlying mappings between cards, coupon bundles, and orders, establishing a 4-step decision pipeline: verify card status, penetrate asset valuations, calculate target differences, and check quota rules. Standard flows run automatically with one-click execution; ambiguous exceptions stop for human verification; and failures preserve original entitlements first.",
        },
        {
          type: "decisionPipelineDiagram",
        },
        {
          type: "businessFlow",
        },
        {
          type: "paragraph",
          text: "Under high-pressure front-desk environments, interface design prioritized cognitive clarity. The new workspace consolidates 4 disconnected modules into a single three-zone view: existing assets, target benefits, and differential pricing, enabling desks to explain calculations transparently to parents.",
        },
        {
          type: "workspaceArchitectureDiagram",
        },
        {
          type: "evidenceGallery",
        },
        {
          type: "heading",
          text: "System boundary and division of duties",
          level: 3,
        },
        {
          type: "boundary",
        },
        {
          type: "heading",
          text: "Key trade-offs and engineering pragmatism",
          level: 3,
        },
        {
          type: "paragraph",
          text: "Why not replace the whole clinic billing system? Clinic billing is entangled with clinical treatments, prophylaxis, and orthodontics. An agile automation layer (ODOS) shipped rapidly to resolve calculation bottlenecks and discount leaks, at the deliberate operational cost of having operators bridge two screens.",
        },
        {
          type: "paragraph",
          text: "Why avoid real-time cross-clinic fund transfers? For cross-clinic upgrades, the system links cards, coupons, and differential bills into a traceable trail. However, inter-store financial reconciliation remains on the core system's batch settlement. Knowing where to stop technical ambition is key to delivery.",
        },
      ],
    },
    {
      id: "impact",
      title: {
        zh: "项目结果与边界",
        en: "Outcomes & Boundaries",
      },
      zh: [
        {
          type: "heading",
          text: "关键结果",
          level: 3,
        },
        {
          type: "table",
          headers: ["指标", "变化", "来源"],
          rows: [
            [
              "典型会员升级操作耗时",
              "4—5 分钟 → 约 1 分钟",
              "门店现场实测，典型升级结算场景（最熟练老员工平均时长，新手达十来分钟）",
            ],
            [
              "财务核对账目耗时",
              "约 3 天 → 约 1 天",
              "财务团队估算，未做精细统计",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "升级耗时是门店实测的典型场景，不是所有交易平均；财务数字是团队估算，两者不能混为同一种证据。",
        },
        {
          type: "heading",
          text: "上线与边界",
          level: 3,
        },
        {
          type: "paragraph",
          text: "方案先在 6 家门店试点，随后推广至全连锁 20 多家门店。",
        },
        {
          type: "list",
          items: [
            "双系统操作接续摩擦：新系统承担会员卡与优惠券自动化办理；患者就诊挂号与单项常规收费仍在原门诊系统，前台仍需在两个系统间切换接续。",
            "失败回退验证局限：系统在逻辑层设计了严格的失败原子回退与防悬空规则，上线稳定期间日常未发生端到端中断故障，故仅记录业务规则，不虚构实测回退数据。",
            "不把全连锁续卡率、现金流等宏观经营指标单独归因于本项目。",
          ],
        },
        {
          type: "paragraph",
          text: "这套方法可迁移到任何规则密集、资金与权益敏感、需要人工兜底的 B 端复杂系统：先分离标准与异常，再设计权限与额度边界，最后把失败回退与全链路审计放进主流程。",
        },
      ],
      en: [
        {
          type: "heading",
          text: "Key results",
          level: 3,
        },
        {
          type: "table",
          headers: ["Measure", "Change", "Source"],
          rows: [
            [
              "Typical membership upgrade",
              "4–5 minutes → about 1 minute",
              "On-site measurement of a typical upgrade (senior staff average; new staff exceeded 10m)",
            ],
            [
              "Finance reconciliation",
              "About 3 days → about 1 day",
              "Finance-team estimate, not a detailed measurement",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The upgrade number is a typical on-site case, not an average across all transactions; the finance number is a team estimate. They are not the same kind of evidence.",
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
        {
          type: "list",
          items: [
            "Dual-system bridging: The new layer automates memberships; visits and general billing stay in the core system, requiring desk operators to bridge between two systems.",
            "Failure recovery limits: Atomic rollback logic was implemented, but because operations ran stably without end-to-end network drops, we document the rule rather than invent fake failure logs.",
            "Macro retention rates and revenue changes are not attributed solely to this project.",
          ],
        },
        {
          type: "paragraph",
          text: "This approach applies to any rules-heavy, financially sensitive B2B workflow: automate invariants, halt explicitly on ambiguities, govern discounts upfront, and embed atomic recovery and auditability into the core flow.",
        },
      ],
    },
  ],
  diagrams: {
    old: {
      zh: [
        "查会员卡",
        "找收费单",
        "算差价与有效期",
        "退旧卡",
        "开新卡",
        "补差价",
        "核对剩余项目",
      ],
      en: [
        "Find card",
        "Find charge order",
        "Calculate difference and validity",
        "Refund old card",
        "Open new card",
        "Collect difference",
        "Check remaining items",
      ],
    },
    system: {
      zh: [
        {
          label: "01 卡状态与有效性校验",
          branches: ["已过期、冻结或信息不全 → 坚决阻断推测，转人工处理"],
        },
        {
          label: "02 穿透收费单，核算卡与券的资产残值",
          branches: ["多张关联账单或无账单 → 就地展开人工选择分支"],
        },
        {
          label: "03 匹配儿童年龄档位，测算新卡差价与顺延期",
        },
        {
          label: "04 校验门诊与岗位月度优惠额度",
          branches: ["额度超限 → 刚性拦截，当笔不予改价，全量留痕"],
        },
        {
          label: "05 同屏展示三区因果，前台确认执行",
        },
        {
          label: "06 执行办理",
          branches: ["异常中断 → 原子回退保留原卡与原权益，杜绝悬空状态"],
        },
        {
          label: "07 成功反馈，跨门店流水记账，底层资金批处理",
        },
      ],
      en: [
        {
          label: "01 Verify card validity and active status",
          branches: ["Expired, frozen, or incomplete → halt and prompt manual handling"],
        },
        {
          label: "02 Penetrate billing records to evaluate residual card & coupon assets",
          branches: ["Multiple or missing orders → expand manual selection options"],
        },
        {
          label: "03 Match child's age tier to calculate upgrade difference and validity",
        },
        {
          label: "04 Verify clinic and role monthly discount quotas",
          branches: ["Quota exceeded → rigid block without exceptions; audit logged"],
        },
        {
          label: "05 Display 3-zone consolidated summary for instant desk explanation",
        },
        {
          label: "06 Execute transaction",
          branches: ["Interruption → atomic rollback preserving old card/benefits"],
        },
        {
          label: "07 Success feedback; cross-clinic audit logged for batch settlement",
        },
      ],
    },
    decisions: {
      zh: [
        {
          label: "决策 A",
          title: "常规自动，异常人工",
          problem: "多卡种、卡券分离导致每笔升级都靠前台人脑硬记硬算，账单多义时极易开错单据。",
          judgment: "把已收敛的标准规则抽象为决策流水线；遇到无账单、多关联账单、卡异常坚决人工停机确认。",
          tradeoff: "异常分类必须前置；信息不明确时宁可让前台多点一次确认，绝不让系统替人盲猜。",
          rules: [
            "四步标准决策流水线",
            "卡券资产穿透核算",
            "异常场景刚性停机机制",
            "核对机制前移展示",
          ],
        },
        {
          label: "决策 B",
          title: "优惠上限 + 操作记录",
          problem: "钉钉审批流程长，现场紧急导致大量“电话口头确认+事后补提”，财务月底面临违规核对黑洞。",
          judgment: "重构为门诊与岗位月度额度池；额度内前台直接放权改价，超额系统刚性阻断，流程彻底取消审批。",
          tradeoff: "取消事中审批不等于放任不管；通过事前定额度池结合事后全链路审计，消灭监管盲区。",
          rules: [
            "门诊与岗位月度额度池",
            "额度超限刚性拦截（不设特批）",
            "全链路操作与账单审计留痕",
            "常规年龄卡免审批通道",
          ],
        },
        {
          label: "决策 C",
          title: "失败保护进入主流程",
          problem: "升级涉及退旧开新，若网络或系统中断导致新卡开通失败，旧卡已退会导致会员资产悬空。",
          judgment: "将失败与回退作为主流程核心状态；执行中断强制原子回退，保留原卡与原权益并记录日志。",
          tradeoff: "跨门店结算仍依赖底层系统日终批处理，新系统负责打通流水映射，不承诺未经验证的实时分账。",
          rules: [
            "执行前状态校验",
            "原子回退与防悬空机制",
            "保留原卡与原权益",
            "跨门店账目映射与批处理",
          ],
        },
      ],
      en: [
        {
          label: "Decision A",
          title: "Automate the standard path; stop for exceptions",
          problem: "Fragmented rules forced desks to recalculate manually; ambiguities led to frequent billing errors.",
          judgment: "Encode standard rules into a 4-step pipeline; halt immediately on missing/multiple orders or frozen cards.",
          tradeoff: "Exception paths must be explicit; ambiguous data should stop for confirmation, never be guessed.",
          rules: [
            "4-step decision pipeline",
            "Penetrative coupon & card valuation",
            "Rigid stops for ambiguous exceptions",
            "Pre-submission verification",
          ],
        },
        {
          label: "Decision B",
          title: "Discount limits plus records",
          problem: "DingTalk queues forced verbal phone sign-offs with delayed submissions, leaving audit blind spots.",
          judgment: "Allocate monthly quotas by clinic and role; grant autonomous desk discounts within quota; block strictly when exhausted.",
          tradeoff: "Removing approvals does not eliminate scrutiny; upfront quotas paired with full audit logs close the loophole.",
          rules: [
            "Monthly clinic/role quota pools",
            "Rigid block on quota exhaustion",
            "Full transaction and rule audit trails",
            "Standard age cards bypass approvals",
          ],
        },
        {
          label: "Decision C",
          title: "Failure protection in the core flow",
          problem: "Refunding an old card before a new card activates risks stranding member assets during network drops.",
          judgment: "Treat failure as a first-class state: enforce atomic rollbacks to preserve old card entitlements.",
          tradeoff: "Cross-clinic settlements stay on batch processing; the new layer links audit trails without promising unproven real-time splits.",
          rules: [
            "Pre-execution sanity check",
            "Atomic rollback against dangling states",
            "Preserve original cards and benefits",
            "Cross-clinic ledger mapping",
          ],
        },
      ],
    },
    boundary: {
      zh: {
        leftTitle: "新会员自动化层 (ODOS)",
        leftItems: [
          "会员卡、卡券与同屏收银台界面",
          "四步标准决策流水线与残值测算",
          "门诊/岗位优惠额度池与刚性阻断",
          "全链路审计记录与原子防悬空",
        ],
        rightTitle: "原门诊管理系统 (领健)",
        rightItems: [
          "患者挂号、排班预约与诊疗病历",
          "全院常规诊疗项目收费与开票",
          "跨门店资金结算与日终批处理",
          "历史收费、就诊与体量底账",
        ],
        caption:
          "架构取舍与职责分工，不是接口调用时序；跨门店资金结算仍沿用原门诊系统后台批处理。",
      },
      en: {
        leftTitle: "Membership Automation Layer (ODOS)",
        leftItems: [
          "Unified cards, coupons, and desk UI",
          "4-step decision pipeline & valuation",
          "Clinic/role quota pools & rigid block",
          "Full audit logging & atomic recovery",
        ],
        rightTitle: "Core Clinic System",
        rightItems: [
          "Check-ins, appointments, and EMR",
          "General clinical billing & invoicing",
          "Cross-clinic inter-store settlement",
          "Historical visit and billing archives",
        ],
        caption:
          "System boundary and division of responsibility; cross-clinic fund transfers remain on core system batch settlement.",
      },
    },
    visuals: {
      workspace: {
        title: {
          zh: "同屏收银台三区架构",
          en: "Three-zone unified workspace",
        },
        brief: {
          zh: "原卡资产区、目标卡权益区与差价计算区同屏聚合，前台扫一眼即可向家长清晰解释。",
          en: "Consolidates existing assets, target benefits, and differential pricing onto one screen for immediate explanation.",
        },
      },
      transaction: {
        title: {
          zh: "常规路径与异常停机分支",
          en: "Standard flow and exception branches",
        },
        brief: {
          zh: "标准升级全自动计算，遇到多张关联账单、无账单或卡冻结时坚决中断自动化、弹出人工选择卡。",
          en: "Automates standard calculations while halting explicitly on multiple orders or frozen cards for manual verification.",
        },
      },
      quota: {
        title: {
          zh: "优惠额度池与超额刚性拦截",
          en: "Quota pool and rigid block",
        },
        brief: {
          zh: "额度内前台自主放权即时改价；当月额度耗尽刚性阻断，流程中不设特批通道，操作全量留痕。",
          en: "Desks discount autonomously within monthly quota; transactions block upon exhaustion without exception paths.",
        },
      },
      recovery: {
        title: {
          zh: "原子回退与防悬空状态",
          en: "Atomic rollback & state safety",
        },
        brief: {
          zh: "升级中断时强制原子回退，保留原卡及全部权益，记录失败原因，杜绝旧卡已退新卡未开状态。",
          en: "Execution drops trigger atomic rollbacks, preserving original card rights to prevent dangling states.",
        },
      },
    },
  },
};
