const baseUrl = import.meta.env.BASE_URL ?? '/';
const withBasePath = (path) => `${baseUrl}${path}`.replace(/\/{2,}/g, '/');

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
      zh: '旧有的会员系统由于数据结构碎片化，导致会员卡、优惠券与结算流程之间缺乏有效联动。由于 20 多家门店每天产生数千笔交易，高昂的人工核对成本导致财务差异显著，同时也严重拖慢了前台的收银效率。',
      en: 'Membership, coupons, payments, and billing were disconnected across 20+ stores, creating heavy manual audit costs for finance and slowing frontline checkout.',
    },
    role: {
      zh: '产品经理 / 系统架构师，负责规则逻辑解耦、结算引擎方案设计与全量落地推进。',
      en: 'Product Manager / System Architect, responsible for rule decoupling, settlement engine design, and clinic rollout.',
    },
    sysVer: 'SYS_MA_VER_3.2_STABLE',
    problem: {
      zh: '会员收银流程不规范，高频操作步骤多易错，跨门店结算需大量人工介入。数据同步延迟导致资金合规隐患。',
      en: 'Frontline operations were slow and error-prone, while finance spent days manually reconciling disconnected records across stores.',
    },
    solution: [
      {
        title: { zh: '规则系统化', en: 'Systematizing Rules' },
        desc: {
          zh: '将复杂的优惠叠加规则转化为层级清晰的逻辑判定树，消除歧义，统一管理卡券与权益资产。',
          en: 'Converted complex stacking discount rules into a clear hierarchy logic tree, eliminating ambiguity.',
        },
      },
      {
        title: { zh: '流程自动化', en: 'Workflow Automation' },
        desc: {
          zh: '一键式极速收银，后台自动匹配会员身份与最优卡券组合，大幅减少前台人工干预。',
          en: 'Single-click rapid checkout; backend automatically matches member identities and optimal coupon combinations.',
        },
      },
      {
        title: { zh: '合规与财务治理', en: 'Compliance & Governance' },
        desc: {
          zh: '每笔交易生成不可篡改的链式审计记录，引入优惠额度边界，保障大宗会员交易资金安全。',
          en: 'Generates immutable audit logs for every transaction, establishing clear discount limits for security.',
        },
      },
    ],
    result: {
      zh: '系统已成功覆盖品牌旗下 20+ 高端零售与医疗门店。单笔高复杂度交易时间降低 75%（4-5 分钟 ➔ 1 分钟）；财务月底对账周期缩短 66.7%（3 天 ➔ 1 天）。',
      en: 'Deployed across 20+ clinics. Transaction processing time reduced by 75% (4-5 min to 1 min). Month-end reconciliation cut by 66.7% (3 days to 1 day).',
    },
    heroMetrics: {
      opTimeBefore: '4-5m',
      opTimeAfter: '1m',
      reconcileBefore: '3d',
      reconcileAfter: '1d',
      deployment: '20+ 家门店',
    },
    process: [
      {
        version: 'V1',
        label: { zh: '阶段 01: 规则统一', en: 'Phase 01: Rule Unification' },
        title: { zh: '逻辑解耦与中心化管理', en: 'Logic Decoupling & Central Management' },
        desc: {
          zh: '建立统一的规则配置引擎，将卡券逻辑与业务实体解耦，实现跨 20 多家实体的会员逻辑全局一致应用。',
          en: 'Built a unified rule engine decoupling coupon logic from entities, establishing global consistency.',
        },
      },
      {
        version: 'V2',
        label: { zh: '阶段 02: 流程自动化', en: 'Phase 02: Flow Automation' },
        title: { zh: '极速收银与合规审计', en: 'Express Checkout & Compliance Audit' },
        desc: {
          zh: '部署“极速收银”流程，通过后台静默验证和详尽的审计日志，确保财务治理的透明度与交易安全。',
          en: 'Deployed express checkout with silent validation and detailed audit logs for financial security.',
        },
      },
    ],
    decisions: [
      {
        question: { zh: '自动匹配还是手动选择？', en: 'Automatic matching or manual choice?' },
        choice: {
          zh: '优先采用“强制自动匹配”覆盖 95% 的高频场景，仅针对验证过的异常情况开放手动干预。这让收银员的角色从“数据输入员”转变为“异常处理器”。',
          en: 'Prioritized forced auto-matching for 95% of cases, reserving manual overrides only for verified anomalies.',
        },
      },
      {
        question: { zh: '状态机驱动的界面设计？', en: 'State-machine driven interface?' },
        choice: {
          zh: '基于状态的 UI 转换。界面根据会员画像和规则命中情况动态调整，隐藏无关选项，降低前台人员的认知负担。',
          en: 'State-based UI transitions dynamically show relevant options, eliminating cognitive load.',
        },
      },
      {
        question: { zh: '异常审计抽样逻辑？', en: 'Exception-based audit logic?' },
        choice: {
          zh: '基于异常的审计机制。系统自动标记异常差异，使财务部门能够专注于处理“离群交易”，而非逐一核对全量流水。',
          en: 'System flags anomalies automatically so finance focuses on outliers rather than line-by-line checks.',
        },
      },
    ],
    images: [
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvF_aIq_oQrmAGS0GNHu0ZE0jMYLfEN29hDX_zfO6jRFHQUkcIJKZ_T3QW7l7QtVFMzvKeHQb9Oaq8G7kigfaFBPJtU67CkBt59pXr1JqPbRf0MRSZG6f8aK4l1hhoY4bJoX9qlGouzNr55llLitRZrPiggcOt5_LB_sWMWPeOKjrabb9ZAjuY2ZQPZzzfZvhNqocDQkidTP1XvLgHcStgqVOrLtB3vQHNlg7a75IFA0fDEo7ZDI6l8g',
        alt: { zh: '核心模块 01：中央规则配置引擎', en: 'Core Module 01: Central Rule Configuration Engine' },
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYZhP-F0BgUJt5DeX_l-aLKYiKQf2wbanzTEElRMY4KIGjMqK9PmfEIId34gY7XQAMG3GoUkb_e4fq7Qb-0Y13bZ2qq8s2VPSXhx3AFwA5VNMxy-djlRKlQxgML9XC5ofNvDtuz_qT9OAg-qRg22Ny_APDHrM3O4ZDHQOb1Yf4EUKOYBpypP9b0Uf0eTmLfyl2IIUydx6_YdW2tDM9dysHxeILniiyICGbmbmyA89hdYD0Y-TY5sBYPg',
        alt: { zh: '核心模块 02：前台极速收银终端', en: 'Core Module 02: Frontline Express POS Terminal' },
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS-o4y-NAz5XbhC24xJ8dRgnllJm7yJyf5V9x8IamHhiXKK2EpNF6D0FO1q9lQhOpfXwLd04KVFc4bYH9AufC0eyBmYTOK5KtJvHT75kLof8xES2iP-FqY8R5oH2pXcB62f0j4QDQ9zl2aKwjaPj-sRxqqDXEv6dR-S9tfqJRRtcZhmGXxZBITrtVvrMqP0Z7UxDVTdhbuDqI_bEHYyUu1As9gCDcXBcrwtjm2lvdha-3hxslsE4QzxA',
        alt: { zh: '核心模块 03：全渠道会员数据流转', en: 'Core Module 03: Omni-channel Member Data Stream' },
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBCkvjhQCnNNV1KBwSpKEfjCU-T8xPZJtUhMWUVRERKKm-i31_EYk8uPZEjOW6Pq5yuoBflzld4pBqK3S3lZmYo-R568qiZNQzFAL25-Se7Z3bb7nm3b-3N8Hwrkjsm54OXFrWjiIc7vXLSIeoLWJCmwcR9AHMceRDdb46mTq5z_OerARCI2FlcVqFMzbCd8OW4OEeh0NxgnJ2qVp_bd7tM5nBbfXmf2rajrxlJ4yi7_QNd6XMYmSo3Q',
        alt: { zh: '核心模块 04：合规治理与财务看板', en: 'Core Module 04: Compliance & Financial Audit Dashboard' },
      },
    ],
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

    // ── 设计体系与 UI/UX 手艺 ────────────────────────────
    designCraft: {
      title: { zh: '设计体系与交互策略', en: 'Design System & UX Craft' },
      subtitle: {
        zh: '从人机权责色彩系统到诊室环境下的视线聚焦设计',
        en: 'From human-AI role semantics to clinical visual hierarchy design',
      },
      pillars: [
        {
          tag: { zh: '色彩与权责语义', en: 'Color & Role Semantics' },
          title: { zh: '人机权责的视觉隐喻系统', en: 'Visual Metaphor for Human-AI Liability' },
          desc: {
            zh: '在医疗辅助场景中，混淆算法推断与临床确诊是危险的。我们建立了一套清晰的色彩与权责暗示体系，符合 WCAG 4.5:1 / 7:1 暗光诊室对比度标准：',
            en: 'In clinical AI assist, confusing algorithmic inference with human diagnosis is hazardous. We established a color semantic hierarchy compliant with WCAG AAA darkroom standards:',
          },
          swatches: [
            {
              color: '#A88ADF',
              name: { zh: 'AI 推断紫', en: 'AI Inference Purple' },
              role: { zh: '算法初步病灶高亮 / 非阻断提示', en: 'Algorithm anomaly highlights / Non-blocking' },
            },
            {
              color: '#34D399',
              name: { zh: '临床确诊绿', en: 'Doctor Confirmed Green' },
              role: { zh: '医生确认覆核 / 正式写入病历', en: 'Human verified / Chart sync' },
            },
            {
              color: '#F87171',
              name: { zh: '标注纠偏红', en: 'Label Rejection Red' },
              role: { zh: '发现识别错误 / 收集飞轮训练数据', en: 'Diagnostic override / Training data feedback' },
            },
            {
              color: '#121318',
              name: { zh: '诊室暗光基底', en: 'Dark Slate Base' },
              role: { zh: '降低放射科/暗光诊室看片视觉疲劳', en: 'Minimizes eye fatigue in dark room' },
            },
          ],
        },
        {
          tag: { zh: '视线引导与认知负荷', en: 'Visual Hierarchy & Cognitive Load' },
          title: { zh: '暗光诊室环境下的 F 型高效扫描', en: 'F-Pattern Efficient Scanning for Clinical Rooms' },
          desc: {
            zh: '医生看片需要在几秒内做出精准判断。采用左侧 X 光大图画布 + 右侧 AI 诊断卡片的双栏固定布局。卡片默认按置信度与病灶严重程度降序排列，并通过渐进式暴露（Progressive Disclosure）隐藏复杂的 DICOM 切片数据，确保核心信息一眼即达。',
            en: 'Doctors require accurate decisions within seconds. We implemented a fixed two-pane layout (left image canvas + right AI cards sorted by confidence). Advanced DICOM metrics are hidden behind progressive disclosure to reduce cognitive fatigue.',
          },
          specs: [
            { label: { zh: '扫视响应', en: 'Scan Speed' }, value: '< 2.5s' },
            { label: { zh: '展开级数', en: 'Disclosure Depth' }, value: '2 Levels' },
            { label: { zh: '对比度级别', en: 'Contrast Level' }, value: 'WCAG AAA' },
          ],
        },
        {
          tag: { zh: '交互细节与兜底机制', en: 'Interaction Craft & Edge Cases' },
          title: { zh: '一键同步与降级容错机制', en: 'One-click Charting & Graceful Degradation' },
          desc: {
            zh: '设计了结构化病历一键同步机制，将医生复核后的标记秒级转化为标准化文字规整录入。当 AI 网关出现网络波动或超时（>3s）时，界面自动切入手动读片兜底模式，手动标注工具始终可直达，确保诊疗流程绝不被技术不确定性卡顿。',
            en: 'Single-click EHR synchronization converts reviewed marks into structured text instantly. If AI gateway times out (>3s), the interface gracefully degrades to manual reading mode, guaranteeing uninterrupted clinical care.',
          },
          specs: [
            { label: { zh: '超时阈值', en: 'Timeout Threshold' }, value: '3.0s' },
            { label: { zh: '同步效率', en: 'Sync Latency' }, value: '< 100ms' },
            { label: { zh: '兜底可用率', en: 'Fallback Availability' }, value: '100%' },
          ],
        },
      ],
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
        src: withBasePath('images/pacs/entry-synced.jpg'),
        alt: { zh: '读片状态与病历同步', en: 'Reading status and chart sync' }
      },
      {
        src: withBasePath('images/pacs/manual-annotation.jpg'),
        alt: { zh: '医生手动框选与结构化标注', en: 'Manual annotation and structured marking' }
      },
      {
        src: withBasePath('images/pacs/ai-recognition.jpg'),
        alt: { zh: 'AI 自动识别异常区域', en: 'AI automatic anomaly recognition' }
      },
      {
        src: withBasePath('images/pacs/ai-confirm.jpg'),
        alt: { zh: '人机协作：医生复核 AI 结果', en: 'Human-AI Collaboration: Doctor reviews AI results' }
      }
    ]
  },
];
