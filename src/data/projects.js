export const projects = [
  {
    id: 'member-automation',
    title: {
      zh: '会员自动化与服务衔接',
      en: 'Member automation and service continuity',
    },
    tag: {
      zh: '规则系统 / 会员自动化',
      en: 'Rule System / Member Automation',
    },
    background: {
      zh: '在系统中，会员、卡券权益、收费彼此独立，缺少自动对应关系。对一线来说，这意味着收银流程繁琐、容易出错；对财务来说，这意味着月底核对收入、优惠和会员权益时需要大量人工比对，管理成本高。',
      en: 'Membership, coupons, payments, and billing were disconnected, leaving frontline teams to improvise and finance to reconcile manually.',
    },
    role: {
      zh: '产品经理，负责方案输出、规则确认、开发推进与上线跟进。',
      en: 'Product Manager, responsible for solution design, rule definition, and delivery.',
    },
    problem: {
      zh: '会员收银流程不规范，高频操作步骤多易错，跨门店升级处理成本高。财务需人工核对大量数据。',
      en: 'Frontline operations were slow and error-prone, while finance spent days manually reconciling disconnected records.',
    },
    solution: [
      {
        title: { zh: '规则系统化', en: 'Systematizing Rules' },
        desc: {
          zh: '重新梳理会员卡、卡券、收费、优惠、账单之间的关系与对应规则，让原本分散的对象被系统统一承接。',
          en: 'Reorganized the relationships between cards, discounts, payments, and reconciliation.',
        },
      },
      {
        title: { zh: '流程自动化', en: 'Workflow Automation' },
        desc: {
          zh: '把开卡、升续卡、退卡、冻结、囤卡等高频流程从多步人工操作改成系统自动承接，减少一线处理时间与误操作。',
          en: 'Automated high-frequency workflows to reduce frontline processing time and manual errors.',
        },
      },
      {
        title: { zh: '合规与财务治理', en: 'Compliance & Governance' },
        desc: {
          zh: '引入优惠额度建立更明确的优惠边界，通过系统留痕和自动对应关系减少违规操作。',
          en: 'Introduced discount limits and systemic traceability to reduce uncompliant operations.',
        },
      },
    ],
    result: {
      zh: '系统目前在 20+ 家门店落地使用。门店操作时间从平均 4-5 分钟缩短到 1 分钟左右。财务月底对账从全量人工核对 3 天缩短至异常抽检 1 天。',
      en: 'Deployed across 20+ clinics. Member upgrade time dropped from 4–5 min to 1 min. Month-end reconciliation cut from 3 days to 1 day.',
    },
  },
  {
    id: 'orthodontics',
    title: {
      zh: '正畸筛查与状态管理',
      en: 'Orthodontic screening and status management',
    },
    tag: {
      zh: '主流程重构 / 筛查机制',
      en: 'Core Flow Redesign / Screening System',
    },
    background: {
      zh: '矫正前置管理长期缺少一套清晰、连续的流程。过去更多依赖各门店自行组织面评会，由正畸医生主导，儿牙医生主要承担患者信息传递的角色。流程不够清晰，也缺少对筛查、结论、报告和后续预约的连续管理。',
      en: 'Orthodontic pre-management relied on review events and offline coordination, leaving screening, conclusions, and follow-up disconnected.',
    },
    role: {
      zh: '产品经理，主导流程梳理、逻辑设计、角色职责拆分与状态规则定义。',
      en: 'Product Manager, leading workflow redesign, logic design, and status rule definition.',
    },
    problem: {
      zh: '筛查动作离散重复，临时患者易遗漏，儿牙医生参与度弱，多角色协作依赖线下沟通。',
      en: 'Screening actions were scattered, role boundaries were weak, and multi-role collaboration relied heavily on offline communication.',
    },
    solution: [
      {
        title: { zh: '流程机制改版', en: 'Workflow Mechanism Redesign' },
        desc: {
          zh: '取消快筛这一独立前置动作，将筛查从"当次是否做"转成"什么时候做、由谁做、何时再次进入流程"的推荐机制。',
          en: 'Transitioned screening from a one-off action to a continuous recommendation and re-screening mechanism.',
        },
      },
      {
        title: { zh: '状态化管理', en: 'Status Management' },
        desc: {
          zh: '通过正畸状态设计，把患者放入可持续跟进的流程中，让团队知道患者当前处在什么阶段、下一步由谁推进。',
          en: 'Used orthodontic status to place patients in a trackable flow, clarifying the current stage and next steps for the team.',
        },
      },
      {
        title: { zh: '角色协作重构', en: 'Role Collaboration Restructuring' },
        desc: {
          zh: '让儿牙医生前置参与筛查，正畸医生负责专业结论，建立清晰的角色协作路径，并辅以系统任务看板。',
          en: 'Moved pediatric dentists forward in the screening process, clarifying boundaries and building systemic task handoffs.',
        },
      },
    ],
    result: {
      zh: '建立了从推荐到预约的可追踪漏斗。矫正率从改版前的 30-40% 提升至 50-60% 左右，漏斗链路的建立使团队第一次能够观察每个环节的转化情况。',
      en: 'Built a traceable funnel from recommendation to appointment. Orthodontic conversion rate rose from 30–40% to 50–60%, with each stage of the funnel now observable for the first time.',
    },
    heroMetrics: {
      title: { zh: '破除运营黑盒，建立全链路状态机追踪', en: 'From Operational Black Box to Full-Funnel Tracking' },
      conversionBefore: '30-40%',
      conversionAfter: '50-60%',
    },
    timelineSteps: [
      { step: 1, title: { zh: '恒牙列', en: 'Permanent' }, desc: { zh: '最高优：发育关键期', en: 'Highest Priority' } },
      { step: 2, title: { zh: '余四颗乳牙', en: '4 Primary Left' }, desc: { zh: '次高优：即将换牙', en: 'High Priority' } },
      { step: 3, title: { zh: '2-2 萌出', en: '2-2 Erupted' }, desc: { zh: '中优：前牙区评估', en: 'Medium Priority' } },
      { step: 4, title: { zh: '上 1 萌出', en: 'Upper 1 Erupted' }, desc: { zh: '中低优：初期替牙', en: 'Low Priority' } },
      { step: 5, title: { zh: '其余替牙期', en: 'Other Mixed' }, desc: { zh: '常规跟进', en: 'Standard Follow-up' } },
    ],
    roleTabs: [
      {
        id: 'nurse',
        role: { zh: '护士', en: 'Nurse' },
        duty: { zh: '负责资料采集与前置准备，为后续筛查提供基础影像与信息。', en: 'Collects imaging and foundational records for screening.' }
      },
      {
        id: 'pedo',
        role: { zh: '儿牙医生', en: 'Pedodontist' },
        duty: { zh: '前置筛查链路的核心。通过系统的精准留痕，系统为儿牙医生的"转诊费激励"提供确凿的财务结算依据。', en: 'Core of the upstream screening. System tracking guarantees their referral fee incentive is accurately recorded.' }
      },
      {
        id: 'ortho',
        role: { zh: '正畸医生', en: 'Orthodontist' },
        duty: { zh: '负责专业结论确认与最终把关，承接进一步的矫正判断和治疗计划。', en: 'Provides professional conclusions and takes over the long-term treatment plan.' }
      },
      {
        id: 'ops',
        role: { zh: '运营', en: 'Operations' },
        duty: { zh: '负责推动流程并建立后续预约，通过系统看板实时跟进转化漏斗。', en: 'Drives the workflow forward and manages follow-up appointments via real-time dashboard.' }
      }
    ],
    funnelData: [
      { stage: { zh: '系统推荐目标', en: 'System Recommended' }, value: 9274, percentage: 100 },
      { stage: { zh: '筛查转交', en: 'Screening Handoff' }, value: 4579, percentage: 49.37 },
      { stage: { zh: '提交结论', en: 'Conclusion Reached' }, value: 4110, percentage: 44.31 },
      { stage: { zh: '识别需矫', en: 'Ortho Required' }, value: 2466, percentage: 26.59 },
      { stage: { zh: '矫正跟进预约', en: 'Follow-up Booked' }, value: 1239, percentage: 13.36 },
    ],
  },
  {
    id: 'pacs-ai',
    title: {
      zh: 'PACS 读片与 AI 辅助判断',
      en: 'PACS interpretation and AI-assisted review',
    },
    tag: {
      zh: '专业流程 / AI 协作',
      en: 'Specialist Workflow / AI Collaboration',
    },
    background: {
      zh: '医生纯人工读片依赖个人习惯，没有系统留痕，缺乏质控手段。拍片没有被读、无法追踪，管理层无从管控拍片的实际利用率。',
      en: 'Pure manual image reading lacked system traceability and quality control, making utilization and diagnostic behavior hard to track.',
    },
    role: {
      zh: 'V1 以设计为主，参与部分产品规则确认。V2 全权负责产品与设计，主导 AI 读片的交互逻辑、人机协作流程设计、AI 声明与免责边界定义。两版 PRD 均为我编写。',
      en: 'V1: designer role, co-authored product rules. V2: full product + design ownership — drove human-AI interaction loop, interface design, and liability boundaries. Authored both PRDs.',
    },
    problem: {
      zh: '读片行为无系统记录，漏检风险高，读片内容写入病历效率低。引入 AI 后需设计合理的人机协作边界。',
      en: 'Image reading left no system records, diagnostic omission risks were high, and AI required careful boundary design for safe clinical use.',
    },
    solution: [
      {
        title: { zh: '读片基础功能 (V1)', en: 'Core Image Reading (V1)' },
        desc: {
          zh: '让医生在系统内完成影像标注和结构化记录，并支持一键同步到病历，实现拍片读片的可追踪。读片状态三分法（未读片 / 读片不完整 / 已读片）配合红色提示，让管理层第一次能实时看到应检尽检的完成情况。',
          en: 'Enabled structured image annotation and one-click chart synchronization. A three-state reading status (unread / incomplete / complete) with visual alerts gave management real-time visibility into compliance for the first time.',
        },
      },
      {
        title: { zh: 'AI 辅助读片闭环 (V2)', en: 'AI-Assisted Loop (V2)' },
        desc: {
          zh: 'AI 自动识别异常区域，医生对每个标记做出三种判断之一：继续读片（确认并写入病历）、正确但无需写入、判断错误。每次操作都被转化为标注数据，形成"AI 识别 → 医生复核 → 差异数据回收 → 模型迭代"的完整数据飞轮。',
          en: 'AI highlights anomalies, and doctors make one of three judgments per mark: confirm and write to chart, confirm but skip, or reject. Each decision feeds back into training data, completing a flywheel: AI identifies → doctor reviews → divergence collected → model improves.',
        },
      },
      {
        title: { zh: '人机协作边界设计', en: 'Human-AI Boundary Design' },
        desc: {
          zh: '明确"AI 结果仅供参考，医生对诊断结果负责"原则，常驻页面底部。全景片不展示 AI（模型仅支持小牙片/咬翼片），AI 超时不阻断操作——这些边界都是有意设计的，而非默认值。',
          en: 'Established "AI as reference only, doctor owns the diagnosis" as a permanent on-screen disclaimer. Panoramic X-rays intentionally excluded from AI. AI timeout does not block workflow — all intentional boundaries, not defaults.',
        },
      },
    ],
    result: {
      zh: 'AI 小牙片读片功能使平均单张龋齿发现数从 1.43 颗提升至 3.46 颗，检出率提升超过 140%。读片完成状态可实时追踪。',
      en: 'After AI launch, average cavity findings per X-ray rose from 1.43 to 3.46, a detection rate improvement of over 140%. Reading status became fully trackable.',
    },

    // ── 迭代过程 ─────────────────────────────────────────
    process: [
      {
        version: 'V1',
        label: { zh: '建立基础', en: 'Foundation' },
        title: { zh: '读片可追踪', en: 'Make reading trackable' },
        desc: {
          zh: '核心问题是"拍了片没人读"这件事在系统里完全不可见。V1 的目标不是功能丰富，而是建立最基础的留痕机制：医生在系统内框选异常区域、填写结构化描述，状态变成可追踪的"未读 / 不完整 / 已读"三态。',
          en: "The core problem — \"images taken but never read\" — was completely invisible in the system. V1's goal wasn't feature richness, but establishing the minimum traceability: annotation, structured recording, and a three-state status (unread / incomplete / done).",
        },
      },
      {
        version: 'V2',
        label: { zh: 'AI 引入', en: 'AI Integration' },
        title: { zh: '辅助 + 数据飞轮', en: 'Assist + data flywheel' },
        desc: {
          zh: 'V1 解决了"有没有读"，V2 的问题是"读得准不准"。AI 自动标记异常区域，但关键不在 AI 标记本身——而在于设计了三种强制判断动作（正确继续 / 正确不写入 / 错误），让医生每一次操作都变成标注数据，回收用于模型迭代。',
          en: "V1 solved \"was it read\". V2 tackled \"was it read accurately\". AI auto-marks anomalies, but the key was designing three mandatory judgment actions (correct+continue / correct+skip / wrong) so every doctor interaction becomes training data fed back into model iteration.",
        },
      },
    ],

    // ── 关键设计决策 ─────────────────────────────────────
    decisions: [
      {
        question: {
          zh: '全景片要不要展示 AI 结果？',
          en: 'Should panoramic X-rays show AI results?',
        },
        choice: {
          zh: '不展示。AI 模型当前仅支持小牙片（根尖片 / 咬翼片），强行展示全景片结果会产生误导性标记。宁可能力范围窄，不允许超范围误导医生。',
          en: "No. The model only supports periapical / bitewing X-rays. Showing results on panoramic films would produce misleading marks. Narrow scope beats misleading scope.",
        },
      },
      {
        question: {
          zh: 'AI 超时时要不要阻断医生操作？',
          en: 'Should AI timeout block the doctor?',
        },
        choice: {
          zh: '不阻断。AI 是辅助工具，医生的工作不能被 AI 的不稳定性劫持。超时后直接进入手动读片，手动入口始终可用。',
          en: "No. AI is an assistant. Doctor workflow cannot be held hostage by AI instability. On timeout, fall through to manual mode — always available.",
        },
      },
      {
        question: {
          zh: '读片类型确认弹窗为什么要前置？',
          en: 'Why was image type confirmation moved to before reading?',
        },
        choice: {
          zh: 'ODOS 自动分类会出错，把全景片误分成小牙片。如果错误分类进入 AI 读片，AI 会用小牙片模型处理全景片，产生大量错误标记，污染数据。前置确认是数据质量的第一道门。',
          en: "ODOS auto-classification can misfile panoramic films as periapical. If a wrong-type film enters AI reading, the model produces garbage marks that pollute training data. Pre-confirmation is the first quality gate.",
        },
      },
      {
        question: {
          zh: '"判断正确、无需写入病历"这个选项为什么要存在？',
          en: 'Why does "correct, skip charting" exist as a separate option?',
        },
        choice: {
          zh: 'AI 识别的异常不一定每个都需要写进当次病历（比如已知的历史问题）。强制写入会增加医生负担并产生冗余记录。但这个选项的选择行为本身仍然被记录，保证数据飞轮的完整性。',
          en: "Not every AI-flagged anomaly needs charting (e.g. known historical findings). Forcing all into records increases burden and creates noise. But the selection itself is still logged — keeping the data flywheel complete.",
        },
      },
    ],

    // ── 数据拆解 ─────────────────────────────────────────
    detailMetrics: {
      headline: {
        zh: '平均每张小牙片龋齿发现数',
        en: 'Average cavities found per periapical X-ray',
      },
      before: { value: '1.43', label: { zh: 'V1 人工读片', en: 'V1 Manual' } },
      after:  { value: '3.46', label: { zh: 'V2 AI 辅助后', en: 'V2 With AI' } },
      delta:  { value: '+142%', label: { zh: '检出率提升', en: 'Detection uplift' } },
      context: {
        zh: '低龄儿童龋齿在 X 光片上往往不够视觉显著，早期病变容易被人眼忽略。AI 的价值不是替代医生判断，而是提示那些人眼容易漏过的区域。',
        en: "Early-stage cavities in young children are often visually subtle on X-ray. AI's value isn't replacing clinical judgment — it's flagging what human eyes tend to miss.",
      },
      secondary: [
        {
          label: { zh: 'V1 上线后', en: 'After V1' },
          value: { zh: '读片行为首次在系统内完整留痕', en: 'Reading behavior logged for first time' },
        },
        {
          label: { zh: '状态可见性', en: 'Status visibility' },
          value: { zh: '未读 / 不完整 / 已读 实时显示在检查表', en: 'Unread / incomplete / done shown in real time' },
        },
        {
          label: { zh: '病历同步', en: 'Chart sync' },
          value: { zh: '一键同步，格式标准化，减少重复录入', en: 'One-click sync with standardized format' },
        },
      ],
    },

    images: [
      {
        src: '/Portfolio/images/pacs/entry-synced.jpg',
        alt: { zh: '读片状态与病历同步', en: 'Reading status and chart sync' }
      },
      {
        src: '/Portfolio/images/pacs/manual-annotation.jpg',
        alt: { zh: '医生手动框选与结构化标注', en: 'Manual annotation and structured marking' }
      },
      {
        src: '/Portfolio/images/pacs/ai-recognition.jpg',
        alt: { zh: 'AI 自动识别异常区域', en: 'AI automatic anomaly recognition' }
      },
      {
        src: '/Portfolio/images/pacs/ai-confirm.jpg',
        alt: { zh: '人机协作：医生复核 AI 结果', en: 'Human-AI Collaboration: Doctor reviews AI results' }
      }
    ]
  },
];
