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
          zh: '取消快筛这一独立前置动作，将筛查从“当次是否做”转成“什么时候做、由谁做、何时再次进入流程”的推荐机制。',
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
      zh: '产品经理 & 设计师，主导 AI 读片的交互逻辑、人机协作流程设计、AI 声明与免责边界定义。',
      en: 'Product Manager & Designer, driving the human-AI interaction loop, interface design, and liability boundaries.',
    },
    problem: {
      zh: '读片行为无系统记录，漏检风险高，读片内容写入病历效率低。引入 AI 后需设计合理的人机协作边界。',
      en: 'Image reading left no system records, diagnostic omission risks were high, and AI required careful boundary design for safe clinical use.',
    },
    solution: [
      {
        title: { zh: '读片基础功能 (V1)', en: 'Core Image Reading (V1)' },
        desc: {
          zh: '让医生在系统内完成影像标注和结构化记录，并支持一键同步到病历，实现拍片读片的可追踪。',
          en: 'Enabled structured image annotation and one-click chart synchronization to ensure traceability.',
        },
      },
      {
        title: { zh: 'AI 辅助读片闭环 (V2)', en: 'AI-Assisted Loop (V2)' },
        desc: {
          zh: 'AI 自动识别异常区域，医生复核并判断。这使得医生的每个判断行为都转化为可收集的标注数据，形成数据飞轮。',
          en: 'AI highlights anomalies for doctor review. Doctors confirm or reject, turning clinical judgment into data for model iteration.',
        },
      },
      {
        title: { zh: '人机协作边界设计', en: 'Human-AI Boundary Design' },
        desc: {
          zh: '明确“AI 结果仅供参考，医生对诊断结果负责”原则，针对不同片种设计前置确认防错机制。',
          en: 'Established clear liability principles ("AI as reference") and pre-checks to prevent out-of-scope model application.',
        },
      },
    ],
    result: {
      zh: 'AI 小牙片读片功能使平均单张龋齿发现数从 1.43 颗提升至 3.46 颗，检出率提升超过 140%。读片完成状态可实时追踪。',
      en: 'After AI launch, average cavity findings per X-ray rose from 1.43 to 3.46, a detection rate improvement of over 140%. Reading status became fully trackable.',
    },
  },
];
