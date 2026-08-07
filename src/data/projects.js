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
      zh: '产品经理 / 产品设计，负责门店与财务调研、规则梳理、流程与界面设计，以及全门店上线推进。',
      en: 'Product Manager / Product Designer, responsible for clinic and finance research, rule design, workflow and UI design, and rollout across all clinics.',
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
      title: { zh: '设计手艺与操作反馈', en: 'Design Craft & Operational Feedback' },
      subtitle: { zh: '让高频路径保持短，让异常只在需要时出现。', en: 'Keep the frequent path short and reveal exceptions only when needed.' },
      pillars: [
        {
          tag: { zh: '认知负荷', en: 'Cognitive load' },
          title: { zh: '先确认结果，再处理例外', en: 'Confirm the outcome before exceptions' },
          desc: { zh: '默认只展示原卡状态、升级差额、目标权益和生效结果；多账单、无账单或额度不足时才展开处理选项。', en: 'The default path shows current card status, upgrade difference, target benefits, and effective result. Multiple bills, missing bills, and insufficient allowance appear only when triggered.' },
        },
        {
          tag: { zh: '反馈与留痕', en: 'Feedback & traceability' },
          title: { zh: '每一步都有可解释的系统反馈', en: 'Explainable feedback at every step' },
          desc: { zh: '成功后明确新旧卡关系与账单归属；失败时保留原会员卡与原权益，并记录执行人、规则命中和失败原因。', en: 'Success states explain old-to-new card linkage and bill ownership. On failure, the original card and benefits remain intact, with operator, rule, and failure reason logged.' },
        },
        {
          tag: { zh: '边界保护', en: 'Edge protection' },
          title: { zh: '避免半完成与重复提交', en: 'Prevent partial completion and duplicates' },
          desc: { zh: '冻结、退卡、超额、跨店和升级失败均有明确状态与回退路径，避免旧卡失效而新卡未生效。', en: 'Frozen cards, refunds, excess discounts, cross-clinic upgrades, and failures have explicit states and rollback paths, preventing half-completed upgrades.' },
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
    images: [
      {
        src: withBasePath('images/member/member_cover.svg'),
        alt: { zh: '核心模块 01：中央规则配置与极速收银终端', en: 'Core Module 01: Central Rule Engine & Express Checkout POS' },
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
      zh: '产品与设计负责人：独立完成门诊调研、流程与规则设计、PRD/产品文档、交互与 UI，并管理开发与测试进度，协调业务、正畸总监和研发推进上线。',
      en: 'Product and design lead: independently conducted clinic research, workflow and rule design, PRDs, interaction and UI, while managing development and test progress and coordinating business, orthodontic leadership, and engineering.',
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
    images: [
      {
        src: withBasePath('images/ortho/ortho_cover.svg'),
        alt: { zh: '核心模块：正畸状态机与全链路转化漏斗', en: 'Core Module: Orthodontic State Machine & Full Conversion Funnel' },
      },
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
      zh: '诊室中可能直接对着影像向家长解释，也可能把部分判断写入病例。记录方式不一致，影像、标注、诊断文本和病历之间缺少稳定关联。',
      en: 'Clinicians might explain images directly to parents or record only part of the interpretation. Imaging, annotations, diagnostic text, and charts lacked a consistent link.',
    },
    role: {
      zh: 'V1 以设计为主，参与部分产品规则确认。V2 全权负责产品与设计，主导 AI 读片的交互逻辑、人机协作流程设计、AI 声明与免责边界定义。两版 PRD 均为我编写。',
      en: 'V1: designer role, co-authored product rules. V2: full product + design ownership — drove human-AI interaction loop, interface design, and liability boundaries. Authored both PRDs.',
    },
    problem: {
      zh: '需要让系统内读片可追踪、减少重复录入，并在 AI 约 2025 年 11 月上线后保证医生仍完成最终判断，超时不阻断临床流程。',
      en: 'The system needed traceable in-system reading, less duplicate entry, and a safe human decision boundary when AI launched around November 2025, without blocking care on timeout.',
    },
    challenge: {
      zh: '旧流程的记录方式不一致；引入 AI 后还需明确能力范围、医生复核责任和手动兜底。',
      en: 'The old process was inconsistently recorded; AI also required explicit capability limits, physician review responsibility, and manual fallback.',
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
      zh: '后台记录显示，平均每张小牙片龋齿发现数在 2024 年 6 月为 1.43 颗，2025 年 6 月为 3.46 颗。两者均早于 AI 约 2025 年 11 月上线，因此不能归因于 AI；目前暂无 AI 上线后结果数据。',
      en: 'Backend records show 1.43 findings per small X-ray in June 2024 and 3.46 in June 2025. Both predate the AI launch around November 2025, so the change cannot be attributed to AI; no post-launch outcome data is currently available.',
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
            zh: '在医疗辅助场景中，算法推断不能看起来像临床确诊。用不同色彩区分 AI 建议、医生确认、待处理和错误状态，并让文字标签承担同样的信息，避免只靠颜色判断。',
            en: 'Algorithmic inference must not look like clinical confirmation. Color and labels distinguish AI suggestions, physician confirmation, pending work, and rejection without relying on color alone.',
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
        zh: '后台同期记录与 AI 上线时间',
        en: 'Backend records and AI launch timing',
      },
      before: { value: '1.43', date: '2024.06', label: { zh: '后台历史记录', en: 'Historical backend record' } },
      after:  { value: '3.46', date: '2025.06', label: { zh: '后台同期记录', en: 'Comparable backend record' } },
      delta:  { value: 'AI', date: '2025.11', label: { zh: '功能约于此时上线', en: 'Feature launched around this date' } },
      context: {
        zh: '1.43 与 3.46 都早于 AI 上线，只能描述为后台记录变化，不能归因于 AI。目前暂无 AI 上线后的结果数据。',
        en: 'Both 1.43 and 3.46 predate the AI launch. They describe a change in backend records and cannot be attributed to AI. No post-launch AI outcome data is currently available.',
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
