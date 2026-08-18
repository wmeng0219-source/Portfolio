const baseUrl = import.meta.env.BASE_URL ?? '/';
const withBasePath = (path) => `${baseUrl}${path}`.replace(/\/{2,}/g, '/');

export const projects = [
  // ─────────────────────────────────────────────────────────────
  // 01. 会员自动化与服务衔接
  // ─────────────────────────────────────────────────────────────
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
      zh: '产品经理 / 产品设计，负责门店与财务调研、规则梳理、流程与界面设计，以及全门店上线推进。',
      en: 'Product Manager / Product Designer, responsible for clinic and finance research, rule design, workflow and UI design, and rollout across all clinics.',
    },
    sysVer: 'SYS_MA_VER_3.2_STABLE',
    problem: {
      zh: '会员收银流程不规范，高频操作步骤多易错，跨门店结算需大量人工介入。数据同步延迟导致资金合规隐患。',
      en: 'Frontline operations were slow and error-prone, while finance spent days manually reconciling disconnected records across stores.',
    },

    // ── 核心约束与范围 ──────────────────────────────────
    constraints: {
      title: { zh: '核心约束与边界', en: 'Core Constraints & Scope' },
      items: [
        {
          title: { zh: '业务连续性', en: 'Business Continuity' },
          desc: {
            zh: '20+ 门店全天候运营，升级过程不能停机，必须支持新旧会员卡体系平滑过渡。',
            en: '20+ clinics operate continuously; upgrade cannot interrupt checkout and must support smooth legacy transition.',
          },
        },
        {
          title: { zh: '资金安全红线', en: 'Fund Security Redline' },
          desc: {
            zh: '优惠叠加必须设置硬性额度保护上限，严禁任何形式的负毛利或无限叠加漏洞。',
            en: 'Discounts must enforce strict ceiling limits, preventing margin leakage or infinite stacking exploits.',
          },
        },
        {
          title: { zh: '一线认知负荷', en: 'Cognitive Ergonomics' },
          desc: {
            zh: '前台收银人员流动性较高，新系统学习成本必须控制在 15 分钟以内，支持键盘流极速操作。',
            en: 'Staff turnover is high; learning curve must stay under 15 minutes with keyboard-first navigation.',
          },
        },
      ],
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
      zh: '系统覆盖全门店。典型会员升级由 4—5 分钟缩短至约 1 分钟，数据来自门店现场实测。据财务团队估算，对账工作约由 3 天缩短至 1 天；该反馈未做精细统计，因此不作为首屏核心成果。',
      en: 'Rolled out across all clinics. A typical member upgrade fell from 4–5 minutes to about 1 minute in an on-site clinic test. Finance estimated reconciliation fell from roughly 3 days to 1; this was not a precise measurement and is not treated as a hero outcome.',
    },
    heroMetrics: {
      opTimeBefore: '4-5m',
      opTimeAfter: '1m',
      reconcileBefore: '3d',
      reconcileAfter: '1d',
      deployment: '20+ 家门店',
    },
    detailMetrics: {
      headline: {
        zh: '单笔高复杂度交易处理耗时',
        en: 'Single high-complexity checkout processing time',
      },
      before: { value: '4-5 min', label: { zh: '传统人工核对', en: 'Manual Checkout' } },
      after:  { value: '1 min', label: { zh: '系统极速收银', en: 'Automated POS' } },
      delta:  { value: '-75%', label: { zh: '效率提升', en: 'Time Saved' } },
      context: {
        zh: '高频会员收银环节由后台静默算价与审计日志承接，前台操作人员的角色从数据录入转变为异常处理。',
        en: 'Automated settlement engine replaces manual price computation, shifting staff focus to anomaly handling.',
      },
      secondary: [
        {
          label: { zh: '财务对账', en: 'Month-end Audit' },
          value: { zh: '月底对账由 3 天缩短至 1 天 (-66.7%)', en: 'Reconciliation cut from 3 days to 1 day' },
        },
        {
          label: { zh: '门店覆盖', en: 'Store Deployment' },
          value: { zh: '落地覆盖 20+ 高端零售与诊所门店', en: 'Deployed across 20+ retail clinics' },
        },
        {
          label: { zh: '合规治理', en: 'Compliance' },
          value: { zh: '不可篡改链式审计日志全局生效', en: 'Immutable audit logs active across network' },
        },
      ],
    },
    process: [
      {
        version: 'V1',
        label: { zh: '初版限制', en: 'Initial constraint' },
        title: { zh: '距离到期 3 个月内才可升级', en: 'Upgrade only within 3 months of expiry' },
        desc: {
          zh: '初版用剩余有效期控制升级，希望简化权益计算，但阻断了仍在有效期内、已有明确意愿的会员。',
          en: 'The initial rule constrained upgrades by remaining validity. It simplified calculation but blocked members with valid cards and clear intent.',
        },
      },
      {
        version: 'V2',
        label: { zh: '最终规则', en: 'Final rule' },
        title: { zh: '有效期内均可升级', en: 'Upgrade anytime while valid' },
        desc: {
          zh: '取消“距离到期 3 个月”的限制。只要会员卡仍在有效期内即可升级，系统继续校验卡状态、账单和权益。',
          en: 'Removed the three-month restriction. A member can upgrade whenever the card remains valid, while status, bills, and benefits are still validated.',
        },
      },
    ],
    designCraft: {
      title: { zh: '设计体系与交互策略', en: 'Design System & UX Craft' },
      subtitle: {
        zh: '从资金安全隐喻到高频收银场景下的认知负荷优化',
        en: 'From fund safety metaphors to cognitive load optimization in high-frequency POS environment',
      },
      pillars: [
        {
          tag: { zh: '色彩与卡券语义', en: 'Color & Coupon Semantics' },
          title: { zh: '交易状态与权益的层次化表达', en: 'Hierarchical Representation of Rights & Discounts' },
          desc: {
            zh: '在大宗会员结算与卡券叠加场景中，清晰直观的权益标识是防范错刷降损的关键。我们建立了高对比度颜色区分：',
            en: 'In high-volume checkout, clear coupon tiering prevents cashier errors and protects margin compliance:',
          },
          swatches: [
            {
              color: '#C8B6FF',
              name: { zh: '最优权益紫', en: 'Optimal Discount Purple' },
              role: { zh: '系统推荐最高折扣 / 主结算路径', en: 'Auto-matched best discount / Primary path' },
            },
            {
              color: '#B8E6D0',
              name: { zh: '合规校验绿', en: 'Verified Audit Green' },
              role: { zh: '风控校验通过 / 资金账户记账', en: 'Audit passed / Account ledger sync' },
            },
            {
              color: '#FFD6A5',
              name: { zh: '额度预警橙', en: 'Limit Alert Orange' },
              role: { zh: '优惠叠加临界值 / 触发二次确认', en: 'Threshold limit reached / Require secondary confirmation' },
            },
            {
              color: '#141922',
              name: { zh: '暗暗卡片基底', en: 'Dark Card Base' },
              role: { zh: '减轻前台全天候操作视觉疲劳', en: 'Reduces visual fatigue during long shifts' },
            },
          ],
        },
        {
          tag: { zh: '渐进式暴露与快捷操作', en: 'Progressive Disclosure & Keyboard Ergonomics' },
          title: { zh: '极速收银环境下的键盘流交互', en: 'Keyboard-first Navigation for Express Checkout' },
          desc: {
            zh: '收银人员长期保持极高操作频次。界面支持 Enter / Tab / Esc 快捷键全程无鼠标收银，高级规则配置收纳于二级面板，确保 95% 主流程 1 秒完成。',
            en: 'Cashiers require rapid keyboard interaction. Enter/Tab hotkeys allow mouse-free checkout, while advanced override options remain accessible via secondary drawer.',
          },
          specs: [
            { label: { zh: '快捷键覆盖', en: 'Shortcut Coverage' }, value: '100%' },
            { label: { zh: '默认路径层级', en: 'Primary Path Depth' }, value: '1 Screen' },
            { label: { zh: '认知响应', en: 'Cognitive Latency' }, value: '< 1s' },
          ],
        },
        {
          tag: { zh: '反馈与留痕', en: 'Feedback & Traceability' },
          title: { zh: '每一步都有可解释的系统反馈', en: 'Explainable feedback at every step' },
          desc: {
            zh: '成功后明确新旧卡关系与账单归属；失败时保留原会员卡与原权益，并记录执行人、规则命中和失败原因。',
            en: 'Success states explain old-to-new card linkage and bill ownership. On failure, the original card and benefits remain intact, with operator, rule, and failure reason logged.',
          },
        },
      ],
    },
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

    // ── 复盘反思与未解局限 ──────────────────────────────
    retrospective: {
      title: { zh: '复盘反思与未解局限', en: 'Retrospective & Limitations' },
      items: [
        {
          title: { zh: '反思过度限制规则', en: 'Rethinking Over-Constrained Rules' },
          desc: {
            zh: '初版以为“限制规则越多越安全”（如 3 个月到期限制），但在真实商业中会扼杀业务弹性。最好的风控不是限制业务发生，而是在底层建立精确的折算公式与不可篡改的留痕机制。',
            en: 'Initially assumed more constraints meant safer margins (e.g. 3-month expiry block), but it hindered sales. Optimal governance balances flexibility with automated ledger calculation.',
          },
        },
        {
          title: { zh: '未解局限与后续演进', en: 'Current Limits & Next Steps' },
          desc: {
            zh: '跨组织主体的不同法人门店之间的结算清算，目前依赖夜间批处理任务完成；未来可进一步演进为实时分账引擎。',
            en: 'Cross-entity clearing currently relies on nightly batch jobs; future iterations will introduce a real-time ledger split engine.',
          },
        },
      ],
    },

    images: [
      {
        src: withBasePath('images/member/member_cover.svg'),
        alt: { zh: '核心模块 01：中央规则配置与极速收银终端', en: 'Core Module 01: Central Rule Engine & Express Checkout POS' },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 02. 正畸筛查与状态管理
  // ─────────────────────────────────────────────────────────────
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
      zh: '产品与设计负责人：独立完成门诊调研、流程与规则设计、PRD/产品文档、交互与 UI，并管理开发与测试进度，协调业务、正畸总监和研发推进上线。',
      en: 'Product and design lead: independently conducted clinic research, workflow and rule design, PRDs, interaction and UI, while managing development and test progress and coordinating business, orthodontic leadership, and engineering.',
    },
    problem: {
      zh: '筛查动作离散重复，临时患者易遗漏，儿牙医生参与度弱，多角色协作依赖线下沟通。',
      en: 'Screening actions were scattered, role boundaries were weak, and multi-role collaboration relied heavily on offline communication.',
    },

    // ── 核心约束与范围 ──────────────────────────────────
    constraints: {
      title: { zh: '核心约束与边界', en: 'Core Constraints & Scope' },
      items: [
        {
          title: { zh: '门诊接诊带宽', en: 'Clinical Bandwidth' },
          desc: {
            zh: '儿牙医生单次接诊时间仅 15–20 分钟，绝不能在接诊现场增加高负荷的复杂影像测量表单。',
            en: 'Pedodontist appointment slots are only 15-20 min; complex imaging forms cannot be pushed to frontline.',
          },
        },
        {
          title: { zh: '专业权责红线', en: 'Specialist Redline' },
          desc: {
            zh: '儿牙医生只负责“发现异常与前置推荐”，最终临床矫正方案与结论必须 100% 由正畸专科医生把关。',
            en: 'Pediatric dentists identify opportunities and refer; final orthodontic diagnosis remains 100% with specialists.',
          },
        },
        {
          title: { zh: '多店推广节奏', en: 'Rollout Phasing' },
          desc: {
            zh: '必须经过单店试点、正畸总监验收、多店验证，方可全网推开。',
            en: 'Required strict phasing: single clinic pilot, specialist director sign-off, multi-clinic test, then full rollout.',
          },
        },
      ],
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
      zh: '2026 年 2 月全门店正式上线。全门店正畸成交转化率由 2025 年 2—4 月约 30%—40%，提升至 2026 年 2—4 月约 50%—60%。',
      en: 'Rolled out to all clinics in February 2026. All-clinic orthodontic sales conversion moved from roughly 30–40% in Feb–Apr 2025 to roughly 50–60% in Feb–Apr 2026.',
    },
    heroMetrics: {
      title: { zh: '破除运营黑盒，建立全链路状态机追踪', en: 'From Operational Black Box to Full-Funnel Tracking' },
      conversionBefore: '30-40%',
      conversionAfter: '50-60%',
    },
    projectTimeline: [
      { date: '2025.04', title: { zh: '启动开发', en: 'Development started' }, desc: { zh: '完成调研、规则与首版方案，首轮开发约 1 个月。', en: 'Research, rules, and the first solution were completed in an approximately one-month build.' } },
      { date: '2025.05—08', title: { zh: '单店试点', en: 'Single-clinic pilot' }, desc: { zh: '正畸总监负责专业测试与验收，1 家门店完成约 2 轮优化。', en: 'The orthodontic director led professional testing and acceptance; one clinic completed about two optimization rounds.' } },
      { date: '2025.08—12', title: { zh: '持续迭代', en: 'Continued iteration' }, desc: { zh: '根据试点反馈增加功能，完成约 2—3 轮迭代。', en: 'Added features based on pilot feedback through roughly two to three iterations.' } },
      { date: '2026.01', title: { zh: '多店验证', en: 'Multi-clinic validation' }, desc: { zh: '扩大到 3—4 家门诊，进行约 1 个月测试验证。', en: 'Expanded to three or four clinics for approximately one month of validation.' } },
      { date: '2026.02', title: { zh: '全门店正式上线', en: 'Full rollout' }, desc: { zh: '完成验证后覆盖全门店。', en: 'Rolled out across all clinics after validation.' } },
    ],
    iterationDecision: {
      title: { zh: '试点后的产品减法', en: 'Product subtraction after the pilot' },
      before: { zh: '初版要求儿牙医生完成较多影像分析，希望一次收齐完整信息。', en: 'The first version asked pediatric dentists to complete substantial image analysis to capture complete information upfront.' },
      insight: { zh: '接诊现场繁忙，字段多、判断重，流程完整却难以持续执行。', en: 'Clinics were busy; too many fields and professional judgments made the flow complete on paper but difficult to sustain.' },
      after: { zh: '最终只保留基础筛查信息，把专业影像判断和最终结论交给正畸医生。', en: 'The final flow retained basic screening information and returned professional image judgment and conclusions to orthodontists.' },
    },
    detailMetrics: {
      headline: {
        zh: '正畸矫正全链路转化率',
        en: 'Full-funnel orthodontic conversion rate',
      },
      before: { value: '30-40%', label: { zh: '线下黑盒跟进', en: 'Offline Coordination' } },
      after:  { value: '50-60%', label: { zh: '状态机漏斗追踪', en: 'State-Machine Funnel' } },
      delta:  { value: '+20%', label: { zh: '转化提升', en: 'Conversion Uplift' } },
      context: {
        zh: '打破跨角色协作黑盒，精准留痕支撑儿牙医生"转诊费激励机制"，使每个筛查环节首次可观察。',
        en: 'System tracking accurately records pedodontist referral incentives, bringing visibility to each screening step.',
      },
      secondary: [
        {
          label: { zh: '推荐目标', en: 'Target Recommended' },
          value: { zh: '9,274 患儿全量覆盖', en: '9,274 patient pool mapped' },
        },
        {
          label: { zh: '筛查转交', en: 'Screening Handoff' },
          value: { zh: '4,579 例精准转交率 49.4%', en: '4,579 handoffs (49.4% rate)' },
        },
        {
          label: { zh: '签约锁定', en: 'Contract Booked' },
          value: { zh: '1,239 例跟进预约锁死', en: '1,239 contracts locked in funnel' },
        },
      ],
    },
    designCraft: {
      title: { zh: '设计体系与交互策略', en: 'Design System & UX Craft' },
      subtitle: {
        zh: '从状态机色彩定义到替牙期发育优先级的调度策略',
        en: 'From state machine visual language to dentition development priority scheduling',
      },
      pillars: [
        {
          tag: { zh: '状态机色彩语义', en: 'State Machine Color Semantics' },
          title: { zh: '漏斗节点与角色权责的视觉语言', en: 'Visual Language for Funnel Nodes & Role Duties' },
          desc: {
            zh: '在儿牙与正畸多角色转诊中，状态切换必须一目了然。我们建立了兼顾医学严谨性与转化动力的色彩体系：',
            en: 'In multi-role dental referrals, status transitions must be immediate. We established a color system balancing medical rigor with conversion energy:',
          },
          swatches: [
            {
              color: '#B8E6D0',
              name: { zh: '转化完成绿', en: 'Conversion Success Green' },
              role: { zh: '签约锁定 / 矫正计划成立', en: 'Contract locked / Ortho plan started' },
            },
            {
              color: '#C8B6FF',
              name: { zh: '会诊推进紫', en: 'Consultation Purple' },
              role: { zh: '正畸专家评估中 / 状态跟进中', en: 'Specialist evaluation / Active follow-up' },
            },
            {
              color: '#FFD6A5',
              name: { zh: '紧迫干预橙', en: 'Urgent Intervention Orange' },
              role: { zh: '发育关键窗口期 / 需优先复筛', en: 'Critical eruption window / Priority rescreening' },
            },
            {
              color: '#1C2330',
              name: { zh: '状态容器底色', en: 'State Container Surface' },
              role: { zh: '模块化卡片高亮与网格分割', en: 'Modular card surface & grid division' },
            },
          ],
        },
        {
          tag: { zh: '视线聚焦与带宽调度', en: 'Visual Hierarchy & Bandwidth Scheduling' },
          title: { zh: '发育优先级与任务看板分流', en: 'Eruption Priority & Task Dashboard Triage' },
          desc: {
            zh: '门诊接诊带宽有限，系统放弃无差别推流。设计了基于替牙发育阶段（恒牙列 ➔ 余4颗乳牙 ➔ 2-2萌出）的 5 级优先级调度轴，结合多角色切换 Tab 呈现。',
            en: 'Clinic capacity is finite. We designed a 5-tier eruption scheduling pipeline (Permanent ➔ 4 Primary ➔ 2-2 Erupted) with role-based tab views.',
          },
          specs: [
            { label: { zh: '优先级阶梯', en: 'Priority Tiers' }, value: '5 Stages' },
            { label: { zh: '角色看板', en: 'Role Dashboards' }, value: '4 Roles' },
            { label: { zh: '漏斗透明度', en: 'Funnel Visibility' }, value: '100%' },
          ],
        },
      ],
    },
    process: [
      {
        version: 'V1',
        label: { zh: '阶段 01: 规则与拆分', en: 'Phase 01: Rules & Roles' },
        title: { zh: '取消一次性快筛，建立持续跟进机制', en: 'Abolish One-off Screening, Establish Continuous Track' },
        desc: {
          zh: '将筛查从“当次是否做”转变为“什么时候做、由谁做、何时再次进入流程”的动态推荐机制。',
          en: 'Shifted screening from a one-time gate into a continuous recommendation algorithm.',
        },
      },
      {
        version: 'V2',
        label: { zh: '阶段 02: 状态机与激励', en: 'Phase 02: State Machine & Incentives' },
        title: { zh: '状态化漏斗与儿牙转诊激励留痕', en: 'State Machine Funnel & Pedodontist Incentive Log' },
        desc: {
          zh: '系统留痕记录儿牙医生的筛选贡献，为门诊“转诊费激励”提供不可篡改的数据依据，打通业务与系统激励。',
          en: 'System tracks pedodontist screening referrals to back business incentive payouts with reliable audit data.',
        },
      },
    ],
    decisions: [
      {
        question: { zh: '为什么放弃全量筛查推流？', en: 'Why drop bulk screening pushes?' },
        choice: {
          zh: '门诊医生和正畸专家的人力带宽有限。无差别推流会导致高质量高危患儿被埋没在低价值任务中。按发育优先级分流能够保障核心窗口期患儿获得 100% 专家覆盖。',
          en: 'Clinic expert bandwidth is limited. Bulk pushing drowns high-risk cases in noise. Eruption-stage triage ensures critical window cases get 100% expert attention.',
        },
      },
      {
        question: { zh: '儿牙医生的角色为什么需要从“信息传递”升级为“前置筛查”？', en: 'Why elevate pedodontist role to upstream screening?' },
        choice: {
          zh: '儿牙医生是患儿最高频接触的信任节点。赋予其初筛权责并辅以系统转诊激励，能够大幅提升早期筛查率和患者信任粘性。',
          en: 'Pedodontists build highest patient trust. Empowering them with screening plus system referral tracking boosts early detection and conversion.',
        },
      },
    ],
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
    resultNote: {
      zh: '内部业务统计，对比周期为 2025 年 2—4 月与 2026 年 2—4 月；指标为全门店正畸成交转化率。',
      en: 'Internal business statistics comparing Feb–Apr 2025 with Feb–Apr 2026; the metric is all-clinic orthodontic sales conversion.',
    },
    funnelData: [
      { stage: { zh: '系统推荐目标', en: 'System Recommended' }, value: 9274, percentage: 100 },
      { stage: { zh: '筛查转交', en: 'Screening Handoff' }, value: 4579, percentage: 49.37 },
      { stage: { zh: '识别需矫', en: 'Ortho Required' }, value: 2466, percentage: 26.59 },
      { stage: { zh: '矫正跟进预约', en: 'Follow-up Booked' }, value: 1239, percentage: 13.36 },
    ],

    // ── 复盘反思与未解局限 ──────────────────────────────
    retrospective: {
      title: { zh: '复盘反思与未解局限', en: 'Retrospective & Limitations' },
      items: [
        {
          title: { zh: '产品设计需要克制', en: 'Restraint in B2B Product Design' },
          desc: {
            zh: '做 B 端医疗系统最容易犯的错误是“试图在第一个环节收集全部完美数据”。通过单店试点的惨痛教训，我们学会了“初筛极简化、专业深度化”的权责分离。',
            en: 'Avoid trying to collect all data at the first touchpoint. The pilot taught us to keep screening lightweight while reserving deep analysis for specialists.',
          },
        },
        {
          title: { zh: '激励机制与系统结合的力量', en: 'Incentives Coupled with Systems' },
          desc: {
            zh: '单纯靠行政命令推不动跨科室转诊，系统必须为业务激励机制（转诊费留痕）提供绝对客观的技术保障，产品才能真正落地生根。',
            en: 'Administrative push fails without incentive alignment. Tracking pedodontist referral bonuses gave concrete motivation for adoption.',
          },
        },
      ],
    },

    images: [
      {
        src: withBasePath('images/ortho/ortho_cover.svg'),
        alt: { zh: '核心模块：正畸状态机与全链路转化漏斗', en: 'Core Module: Orthodontic State Machine & Full Conversion Funnel' },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 03. PACS 读片与 AI 辅助判断
  // ─────────────────────────────────────────────────────────────
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
      zh: '诊室中可能直接对着影像向家长解释，也可能把部分判断写入病例。记录方式不一致，影像、标注、诊断文本和病历之间缺少稳定关联。',
      en: 'Clinicians might explain images directly to parents or record only part of the interpretation. Imaging, annotations, diagnostic text, and charts lacked a consistent link.',
    },
    role: {
      zh: 'V1 以设计为主，参与部分产品规则确认。V2 全权负责产品与设计，主导 AI 读片的交互逻辑、人机协作流程设计、AI 声明与免责边界定义。两版 PRD 均为我编写。',
      en: 'V1: designer role, co-authored product rules. V2: full product + design ownership — drove human-AI interaction loop, interface design, and liability boundaries. Authored both PRDs.',
    },
    sysVer: 'PACS_AI_VER_2.4_PROD',
    problem: {
      zh: '需要让系统内读片可追踪、减少重复录入，并在 AI 于 2024 年 11 月上线后保证医生仍完成最终判断，超时不阻断临床流程。',
      en: 'The system needed traceable in-system reading, less duplicate entry, and a safe human decision boundary when AI launched around November 2024, without blocking care on timeout.',
    },
    challenge: {
      zh: '旧流程的记录方式不一致；引入 AI 后还需明确能力范围、医生复核责任和手动兜底。',
      en: 'The old process was inconsistently recorded; AI also required explicit capability limits, physician review responsibility, and manual fallback.',
    },

    // ── 核心约束与范围 ──────────────────────────────────
    constraints: {
      title: { zh: '核心约束与边界', en: 'Core Constraints & Scope' },
      items: [
        {
          title: { zh: '医疗法规与责任红线', en: 'Medical Liability Redline' },
          desc: {
            zh: 'AI 算法绝对不能替代医生做临床确诊。界面必须常驻“AI 结果仅供参考，医生对最终诊断负责”的免责边界。',
            en: 'AI cannot diagnose patients independently. UI must permanently display "AI for reference only; doctor retains final liability".',
          },
        },
        {
          title: { zh: '临床时效不阻断', en: 'Non-blocking Workflow' },
          desc: {
            zh: '门诊看病争分夺秒，AI 响应超时（如 >5 秒）绝不能卡死界面，必须无缝降级为手动读片。',
            en: 'Clinical appointments are fast-paced; AI timeouts (>5s) must seamlessly degrade to manual reading without blocking.',
          },
        },
        {
          title: { zh: '算法能力边界', en: 'Algorithmic Scope' },
          desc: {
            zh: '当前 AI 模型仅针对小牙片（根尖片/咬翼片）训练，严禁超范围应用于全景片（CBCT/曲断片）。',
            en: 'Model was trained strictly on periapical/bitewing X-rays; panoramic exposures are explicitly excluded to prevent hallucinations.',
          },
        },
      ],
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
      zh: '后台记录显示，平均每张小牙片龋齿发现数从 2024 年 6 月（AI 上线前基线）的 1.43 颗提升至 2025 年 6 月（AI 上线后运营对比）的 3.46 颗（提升 +142%），有效提升了早期邻面龋的发现效率。',
      en: 'Backend records show findings per small X-ray increased from 1.43 in June 2024 (pre-AI baseline) to 3.46 in June 2025 (post-AI, +142%), significantly improving early lesion detection.',
    },

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
            zh: '在医疗辅助场景中，算法推断不能看起来像临床确诊。用不同色彩区分 AI 建议、医生确认、待处理和错误状态，并让文字标签承担同样的信息，避免只靠颜色判断。',
            en: 'Algorithmic inference must not look like clinical confirmation. Color and labels distinguish AI suggestions, physician confirmation, pending work, and rejection without relying on color alone.',
          },
          swatches: [
            {
              color: '#C8B6FF',
              name: { zh: 'AI 推断紫', en: 'AI Inference Purple' },
              role: { zh: '算法初步病灶高亮 / 非阻断提示', en: 'Algorithm anomaly highlights / Non-blocking' },
            },
            {
              color: '#B8E6D0',
              name: { zh: '临床确诊绿', en: 'Doctor Confirmed Green' },
              role: { zh: '医生确认覆核 / 正式写入病历', en: 'Human verified / Chart sync' },
            },
            {
              color: '#FFD6A5',
              name: { zh: '标注纠偏橙', en: 'Label Override Orange' },
              role: { zh: '发现识别错误 / 收集飞轮训练数据', en: 'Diagnostic override / Training data feedback' },
            },
            {
              color: '#0B0F14',
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
            { label: { zh: '信息顺序', en: 'Information order' }, value: 'IMAGE → REVIEW' },
            { label: { zh: '展开方式', en: 'Disclosure' }, value: 'PROGRESSIVE' },
          ],
        },
        {
          tag: { zh: '交互细节与兜底机制', en: 'Interaction Craft & Edge Cases' },
          title: { zh: '一键同步与降级容错机制', en: 'One-click Charting & Graceful Degradation' },
          desc: {
            zh: '医生复核后的标记可转为结构化文字同步病历。原始需求约定 AI 超过 5 秒显示手动读片入口，技术异常不阻断临床工作；系统记录降级原因和后续人工操作。',
            en: 'Reviewed marks can be converted into structured chart text. The source requirement exposes manual reading after a five-second AI timeout, keeping clinical work unblocked and recording the fallback reason and manual action.',
          },
          specs: [
            { label: { zh: '手动入口提示', en: 'Manual entry prompt' }, value: '5s' },
            { label: { zh: '责任主体', en: 'Final responsibility' }, value: 'DOCTOR' },
          ],
        },
      ],
    },
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
    detailMetrics: {
      headline: {
        zh: 'AI 上线前后对比与关键时间线',
        en: 'Pre/Post AI Launch Comparison & Key Timeline',
      },
      before: { value: '1.43', date: '2024.06', label: { zh: 'AI 上线前基线', en: 'Pre-AI baseline' } },
      after:  { value: '3.46', date: '2025.06', label: { zh: 'AI 上线后成效', en: 'Post-AI outcome' } },
      delta:  { value: '+142%', date: '2024.11 上线', label: { zh: '平均发现数提升', en: 'Findings increase' } },
      context: {
        zh: '2024.06 为纯人工读片基线，AI 辅助功能于 2024.11 正式上线，2025.06 达到 3.46 颗/张。指标反映了 AI 辅助提示与人机复核工作流在门诊的实际成效。',
        en: 'June 2024 represents the pre-AI manual baseline. AI launched in Nov 2024, reaching 3.46 findings/film in June 2025 (+142%). Metrics reflect the impact of AI assistance and human verification.',
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

    // ── 复盘反思与未解局限 ──────────────────────────────
    retrospective: {
      title: { zh: '复盘反思与未解局限', en: 'Retrospective & Limitations' },
      items: [
        {
          title: { zh: '人机协作的核心是权责舒适感', en: 'Human-AI Comfort in Liability' },
          desc: {
            zh: 'AI 进临床，医生最大的顾虑是“被算法替代”或“为算法背锅”。通过常驻免责、非阻断超时降级、三选一复核机制，成功消除了医生的抵触情绪。',
            en: 'Doctors resist AI when fearing replacement or misplaced blame. Clear disclaimers, fallback degradation, and 3-way triage build true operational comfort.',
          },
        },
        {
          title: { zh: '数据质量依赖前端前置拦截', en: 'Data Quality via Frontend Gates' },
          desc: {
            zh: '垃圾进导致垃圾出。片型校验前置确认的细节，避免了后续几千张影像对训练数据集的污染。',
            en: 'Garbage in, garbage out. Front-loading image-type confirmation prevented misclassified panoramic films from corrupting model training datasets.',
          },
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

  // ─────────────────────────────────────────────────────────────
  // 04. 接诊全流程预习与任务编排引擎 (Pre-visit Orchestration)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'pre-visit-engine',
    title: {
      zh: '接诊全流程预习与任务编排引擎',
      en: 'Pre-visit orchestration & task engine',
    },
    tag: {
      zh: '跨系统整合 / 任务编排 / 设计驱动产品',
      en: 'Cross-System Integration / Task Engine / Design-Led Product',
    },
    background: {
      zh: '儿童口腔诊疗包含初诊、复诊、龋齿评估、多生牙追踪与续卡转化等多重诉求。接诊前准备信息散落在网络电话、ERP 财务和 360 病史三大系统中，团队全靠口头交接，信息脱节频发。',
      en: 'Pediatric dental care involves complex visits across new consults, caries risk, unerupted teeth tracking, and membership renewals. Pre-visit info was scattered across 3 isolated systems, relying entirely on fragile verbal handoffs.',
    },
    role: {
      zh: 'Product Designer ➔ Product Owner / Designer。主导全链路交互与体验设计，面对高密度业务规则直接进行产品逻辑推演，反向撰写完整需求文档与 PRD，驱动技术解耦与全量上线。',
      en: 'Product Designer ➔ Product Owner / Designer. Led end-to-end interaction and UX design; facing high-density business logic, directly synthesized product rules and authored full enterprise PRDs, driving technical decoupling and implementation.',
    },
    sysVer: 'PRE_VISIT_ORCHESTRATION_V2.1',
    problem: {
      zh: '跨系统信息孤岛严重，医护运协同缺乏线上承接机制，推荐规则黑盒引发一线抵触。',
      en: 'Severe cross-system data silos, lack of online collaboration anchors for clinic staff, and black-box recommendations causing frontline resistance.',
    },

    // ── 核心约束与范围 ──────────────────────────────────
    constraints: {
      title: { zh: '核心约束与边界', en: 'Core Constraints & Scope' },
      items: [
        {
          title: { zh: '底层系统不可颠覆', en: 'Legacy Decoupling' },
          desc: {
            zh: '领健 ERP 与第三方电话系统底层数据库无法重构，必须通过前端中间层与 API 聚合做数据解耦。',
            en: 'Legacy ERP and VoIP databases cannot be rewritten; cross-system aggregation requires frontend middleware decoupling.',
          },
        },
        {
          title: { zh: '口腔专业操作精度', en: 'Clinical Spatial Accuracy' },
          desc: {
            zh: '儿童牙位包括乳牙与恒牙混合列，空间位置复杂，通用表单无法支撑高精度的牙位交互。',
            en: 'Mixed dentition requires exact quadrant precision; standard dropdown forms fail clinical spatial accuracy.',
          },
        },
        {
          title: { zh: '预习方案时效性', en: 'Pre-visit Expiry Risk' },
          desc: {
            zh: '预习动作可能提前 1–3 天完成，必须考虑期间患者突发退改签或就诊变更的方案失效风险。',
            en: 'Pre-visit prep occurs 1–3 days early; system must validate freshness against sudden schedule or clinical changes.',
          },
        },
      ],
    },

    solution: [
      {
        title: { zh: '全景前置视图', en: 'Panoramic Profile View' },
        desc: {
          zh: '一屏聚合家长电话诉求、既往病史影像与卡券余额，打破 3 大系统孤岛。',
          en: 'Aggregates VoIP phone records, clinical EHR, and ERP balance into a unified pre-visit dashboard.',
        },
      },
      {
        title: { zh: '结构化任务包编排', en: 'Structured Task Bundles' },
        desc: {
          zh: '将经验驱动的口头交接转为标准化任务包（必选/推荐/扩展），辅以定制十字牙位选择控件。',
          en: 'Converts verbal handoffs into modular task bundles (Mandatory/Recommended/Custom) with custom cross-tooth selector.',
        },
      },
      {
        title: { zh: '抽屉式可解释推荐', en: 'Explainable Rule Drawer' },
        desc: {
          zh: '算法与规则推荐 100% 支持抽屉式溯源展示，消除一线抵触，倒逼产品规则透明化。',
          en: 'Algorithm recommendations feature 100% drawer-based trace explanations, eliminating resistance and enforcing rule transparency.',
        },
      },
    ],
    result: {
      zh: '全门诊接诊前准备 100% 纳入系统结构化流转，医护运协同阻断率降至最低，将原本依赖老员工个人经验的准备流程沉淀为标准化组织资产。',
      en: '100% of clinic pre-visit preparations transformed into structured system workflows, minimizing collaboration bottlenecks and turning veteran experience into repeatable organizational assets.',
    },
    heroMetrics: {
      systemCount: '3 大系统',
      taskStandard: '100%',
      explainable: '100%',
      deployment: '全门店覆盖',
    },
    detailMetrics: {
      headline: {
        zh: '跨系统信息整合与任务包结构化率',
        en: 'Cross-System Integration & Task Structuring Rate',
      },
      before: { value: '3 套系统', label: { zh: '孤岛手工拼接', en: 'Manual Silos' } },
      after:  { value: '1 屏聚合', label: { zh: '全景预习视图', en: 'Panoramic Dashboard' } },
      delta:  { value: '100%', label: { zh: '结构化流转', en: 'Structured Flow' } },
      context: {
        zh: '打破电话、ERP 收费和 360 病史系统壁垒，医护运三方首次在接诊前拥有统一的作战地图。',
        en: 'Bridges VoIP, ERP billing, and clinical EHR, providing doctors, nurses, and ops with a unified pre-visit action map.',
      },
      secondary: [
        {
          label: { zh: '系统整合', en: 'System Integration' },
          value: { zh: '打通电话录音、收费与 360 病历三大孤岛', en: 'Bridged VoIP, ERP billing, and 360 EHR' },
        },
        {
          label: { zh: '推荐透明度', en: 'Recommendation Transparency' },
          value: { zh: '100% 规则推荐支持抽屉式原因溯源', en: '100% trace explanations for algorithm rules' },
        },
        {
          label: { zh: '防呆机制', en: 'Validation Gate' },
          value: { zh: '角色流转必填校验与卡点自动定位', en: 'Mandatory role-handoff checks with auto-focus' },
        },
      ],
    },

    taskModel: [
      {
        type: { zh: '必选任务包 (Mandatory)', en: 'Mandatory Bundle' },
        desc: { zh: '核心就诊诉求、过敏史确认、基础拍片与挂号类型核对，缺一不可流转。', en: 'Chief complaint, allergies, baseline imaging, and visit type validation; mandatory for handoff.' },
      },
      {
        type: { zh: '规则推荐包 (Recommended)', en: 'Recommended Bundle' },
        desc: { zh: '系统根据历史周期自动推断（如替牙期正畸筛查、涂氟随访），支持抽屉溯源。', en: 'Algorithmic suggestions (e.g. orthodontic screening, fluoride follow-up) with full rationale trace.' },
      },
      {
        type: { zh: '自定义扩展包 (Custom)', en: 'Custom Bundle' },
        desc: { zh: '支持医护根据现场特殊情况自由追加特定牙位检查与个性化宣教任务。', en: 'Allows clinicians to append ad-hoc tooth-specific checks and tailored health education tasks.' },
      },
    ],

    roleChain: [
      { role: { zh: '护士', en: 'Nurse' }, duty: { zh: '电话诉求提取、既往病历核实、资料完整性确认。', en: 'Extracts call notes, verifies previous charts, confirms record completeness.' } },
      { role: { zh: '医生', en: 'Doctor' }, duty: { zh: '复核系统推荐任务包、确认牙位与诊断准备。', en: 'Reviews recommended task bundles, validates tooth positions, sets clinical plan.' } },
      { role: { zh: '运营', en: 'Ops' }, duty: { zh: '基于预习提示开展会员权益对接与预约安排。', en: 'Follows up on membership benefits and schedules appointments based on pre-visit signals.' } },
    ],

    designCraft: {
      title: { zh: '设计体系与交互策略', en: 'Design System & UX Craft' },
      subtitle: {
        zh: '从十字象限牙位空间控件到抽屉式算法可解释化',
        en: 'From cross-quadrant tooth selector ergonomics to drawer-based algorithm explainability',
      },
      pillars: [
        {
          tag: { zh: '医疗空间交互', en: 'Clinical Spatial Ergonomics' },
          title: { zh: '十字象限牙位选择定制控件', en: 'Cross-Quadrant Tooth Selector Component' },
          desc: {
            zh: '将复杂的 FDI/Palmer 牙位矩阵转译为符合医生空间直觉的十字象限控件，支持全口、象限、连续牙段与单颗牙齿的毫秒级框选。',
            en: 'Translated complex FDI dental notation into an intuitive cross-quadrant UI, enabling millisecond drag-selection across full arch, quadrants, and single teeth.',
          },
          specs: [
            { label: { zh: '选牙效率', en: 'Selection Speed' }, value: '< 2s' },
            { label: { zh: '象限支持', en: 'Quadrants' }, value: '4 Zones' },
          ],
        },
        {
          tag: { zh: '可解释性设计', en: 'Explainable AI/Rule UX' },
          title: { zh: '抽屉式规则推荐溯源机制', en: 'Drawer-based Rule Rationale Drawer' },
          desc: {
            zh: '主流程保持极简任务清单，点击推荐标签即可从右侧呼出推导抽屉，详细展示算法依据与历史就诊间隔，消除一线抵触。',
            en: 'Main flow remains an uncluttered checklist; clicking recommendation tags summons a right drawer detailing the exact rule path and visit intervals.',
          },
          specs: [
            { label: { zh: '解释覆盖', en: 'Explanation Coverage' }, value: '100%' },
            { label: { zh: '主屏干扰', en: 'Main Canvas Noise' }, value: '0' },
          ],
        },
      ],
    },

    decisions: [
      {
        question: { zh: '为什么设计抽屉式推荐理由可解释机制？', en: 'Why design drawer-based explainable rule drawers?' },
        choice: {
          zh: '算法推荐如果只给结论不给原因，一线人员会本能地产生防范和抵触。抽屉式溯源消除了黑盒感，同时倒逼业务方将隐性经验提炼为可被解释的结构化逻辑。',
          en: 'Black-box recommendations trigger frontline resistance. Drawer explanations demystify algorithm rules while forcing stakeholders to structure tacit knowledge.',
        },
      },
      {
        question: { zh: '为什么引入“预习时效失效校验”？', en: 'Why enforce pre-visit expiration validation?' },
        choice: {
          zh: '预习往往提前数天完成，过期的方案比没有方案更危险。当距离接诊时间跨度过长且患者有新的就诊动态时，系统强制二次确认，防止医疗错漏。',
          en: 'Pre-visit prep happens days early; outdated plans are more dangerous than none. System flags stale preps on schedule changes to prevent clinical errors.',
        },
      },
      {
        question: { zh: '如何体现“设计反向驱动产品 PRD”？', en: 'How did design reverse-drive enterprise PRDs?' },
        choice: {
          zh: '在面对多角色交接条件、牙位互斥与任务编排的高密度业务时，线框图已无法表达复杂逻辑。我直接推演底层状态机与分支逻辑，反向撰写完整 PRD，实现从 Designer 到 Product Owner 的升级。',
          en: 'Wireframes fell short of expressing dense tooth constraints and multi-role gates. I directly modeled state machines and authored enterprise PRDs, leveling up from Designer to Product Owner.',
        },
      },
    ],

    // ── 复盘反思与未解局限 ──────────────────────────────
    retrospective: {
      title: { zh: '复盘反思与未解局限', en: 'Retrospective & Limitations' },
      items: [
        {
          title: { zh: '交互设计就是业务建模', en: 'Interaction Design as Business Modeling' },
          desc: {
            zh: '当业务逻辑极其复杂时，“画原型”和“定规则”无法割裂。通过设计交互状态来反向收束产品规则，是解决复杂系统需求分歧的最有效手段。',
            en: 'In complex systems, UI states and business rules are inseparable. Synthesizing interaction states was the fastest way to align stakeholders on fuzzy logic.',
          },
        },
        {
          title: { zh: '可解释性是算法落地的生命线', en: 'Explainability is the Lifeline for Algorithms' },
          desc: {
            zh: '无论规则引擎多先进，如果不向一线工作者透明解释“为什么这样推荐”，系统就永远无法在真实业务中建立信任。',
            en: 'No matter how advanced the rule engine, without transparent rationale for frontline staff, algorithmic systems cannot earn real-world trust.',
          },
        },
      ],
    },
  },
];
