// Page-owned copy for the orthodontics case. The Chinese manuscript is the
// public source; the English object is a retained translation for the paused
// language switch. Facts stay aligned with docs/pages/orthodontics/content.md.
export const caseContent = {
  zh: {
    title: "咬合筛查与正畸协作前期流程",
    eyebrow: "CASE 01 / 医疗协作流程",
    lede:
      "将依赖个人判断和分散沟通的矫正前筛查，重构为覆盖患者推荐、资料采集、分角色评估与后续跟进的协作流程。",
    roleLabel: "我的职责",
    role:
      "门店调研 · 业务规则与流程 · PRD · 交互与界面设计 · 开发协调与上线",
    coverNote:
      "医疗专业结论由正畸医生负责；患者沟通与最终转化由门店和业务团队共同推进。",
    period: "2025.04 — 2026.02 / 开发至全部门店上线",
    facts: [
      {
        value: "2026.02",
        label: "全部门店上线",
        note: "从单店试点、持续迭代到扩大验证",
      },
      {
        value: "18,460",
        unit: "条",
        label: "累计提交筛查结论记录",
        note: "记录数，不是去重患者数",
      },
    ],
    chapters: [
      {
        id: "challenge",
        nav: "业务挑战",
        eyebrow: "PROBLEM",
        title: "业务挑战",
        kicker: "流程为什么难以持续执行",
      },
      {
        id: "decision-1",
        nav: "决策一：推荐与执行",
        eyebrow: "DECISION 01",
        title: "把推荐候选和需要执行的筛查任务分开",
        kicker: "让医生知道今天要做什么，也知道还能从哪里补充",
      },
      {
        id: "decision-2",
        nav: "决策二：分角色接续",
        eyebrow: "DECISION 02",
        title: "按专业边界拆分任务，让多角色能接续完成",
        kicker:
          "不是让一个人填完一张更完整的表，而是让每个人完成自己能可靠承担的部分",
      },
      {
        id: "experience",
        nav: "诊间解释与家长报告",
        eyebrow: "EXPERIENCE",
        title: "从医生的专业判断，到家长能理解的信息",
        kicker: "让诊间解释和离店后的报告使用同一套结论",
      },
      {
        id: "results",
        nav: "上线结果",
        eyebrow: "ROLLOUT & RESULTS",
        title: "在门店实际运行，并把结果说清楚",
        kicker: "哪些是记录，哪些是同期变化，分开看",
      },
      {
        id: "reflection",
        nav: "反思",
        eyebrow: "REFLECTION",
        title: "两次关于落地条件的反思",
        kicker: "系统里分得清楚，不等于接诊时间里做得完",
      },
    ],
    challenge: {
      lead:
        "过去，医生通过快筛进行初步判断，再在面评会中沟通，儿牙医生于接诊时向家长传达。表单、会议和预约备注分散存在，流程依赖个人推进。",
      flowTitle: "旧流程：信息分散在系统、会议和预约备注里",
      flow: [
        {
          step: "快筛初判",
          detail: "正畸医生查看资料并判断，结果回写预约备注",
          tag: "系统内",
        },
        {
          step: "面评会沟通",
          detail: "通常提前一周讨论下周患者，多角色口头补充",
          tag: "会议",
        },
        {
          step: "儿牙传达",
          detail: "儿牙医生在接诊时向家长转述判断",
          tag: "接诊",
        },
        {
          step: "必要时转诊",
          detail: "明显咬合问题且家长有意愿，再转正畸医生评估",
          tag: "人工判断",
        },
      ],
      flowNote:
        "简化示意，实际执行因门店而异；不表示每位患者都按同一顺序经过这些环节。",
      problems: [
        {
          title: "功能重叠",
          body:
            "快筛与面评表承担部分相同的筛查判断，增加了重复填写和理解成本。",
        },
        {
          title: "角色不匹配",
          body:
            "面评表包含儿牙医生难以独立完成的专业项目，现场很少完整填写。",
        },
        {
          title: "进展难追踪",
          body:
            "不同门店组织方式不一，后续沟通与转诊缺少连贯状态，管理者常依赖事后记录判断进展。",
        },
      ],
    },
    decision1: {
      lead:
        "业务最初希望每天向医生推荐固定数量的患者，删除后自动补齐。这个方案看似能安排工作量，但会把“可选择的候选”和“当天要完成的任务”混在一起。",
      arguments: [
        {
          label: "业务原诉求",
          body: "每天向医生推荐固定数量的患者，删除后自动补齐。",
        },
        {
          label: "我的判断",
          body:
            "不断补充的名单会模糊“推荐患者”和“当天需要处理的工作”之间的界限，还会增加持续计算与维护成本。",
        },
        {
          label: "最终规则",
          body:
            "按优先级分批推荐；高优先级患者在原有预约中增加筛查项目，成为明确的执行任务；医生需要补充工作量时，可主动从推荐池中选择。",
        },
      ],
      diagram: {
        candidateLabel: "候选范围",
        candidateTitle: "推荐池",
        candidateBody: "按优先级分批推荐；优先级参考牙齿发育阶段、家长诉求、既往结论和跟进时间",
        routesLabel: "两种进入执行任务的方式",
        routes: [
          {
            title: "系统安排高优先级患者",
            body: "在原有预约中添加筛查项目",
          },
          {
            title: "医生主动补充",
            body: "需要更多工作量时从推荐池选择",
          },
        ],
        executionLabel: "执行范围",
        executionTitle: "已预约筛查",
        executionBody: "需要执行、跟进和管理的任务",
        note: "推荐池不是待办清单；删除推荐不会自动补齐固定数量。",
      },
      evidenceTitle: "同一张列表里，两种范围",
      evidenceAlt:
        "儿牙筛查列表截图，上半部分为已预约筛查患者，下半部分为系统推荐筛查患者",
      evidenceNote:
        "真实系统界面；患者姓名、生日与医生姓名已做脱敏处理。",
      annotations: [
        {
          n: 1,
          title: "已预约筛查患者",
          body: "已进入当天预约，是需要执行和跟进的任务。",
        },
        {
          n: 2,
          title: "系统推荐筛查患者",
          body: "可主动补充的候选，按优先级分批推荐。",
        },
      ],
      asideTitle: "补充决策：入口整合",
      aside:
        "我也识别到旧快筛与新流程定位重叠，提出整合入口。与业务确定过渡方式后，先覆盖大部分患者完成一次筛查，再退出旧快筛；目前快筛已取消，统一使用新筛查。",
    },
    decision2: {
      lead:
        "原面评表把多个角色的任务放在一起，部分字段超出儿牙医生独立判断范围。即使设计了表单，现场也难以完成。",
      problemTitle: "旧表单为什么填不动",
      problemBody:
        "面评表由正畸方案清单简化而来，混合了护士、儿牙医生和正畸医生的任务；系统预填的历史信息也缺少现场复核。",
      judgmentTitle: "我的判断",
      judgmentBody:
        "先让每个角色完成自己能可靠承担的部分，再把信息与任务交接给下一位角色；专业结论由正畸医生填写。",
      roles: [
        {
          role: "护士",
          task: "问诊与资料采集",
          body: "带入历史影像，完成本次资料采集",
        },
        {
          role: "儿牙医生",
          task: "初筛与家长沟通",
          body: "确认意愿与特殊情况，转交正畸医生",
        },
        {
          role: "正畸医生",
          task: "专业判断与结论",
          body: "在待下结论队列中完成结论与行动计划",
        },
        {
          role: "正畸顾问",
          task: "向家长发送报告",
          body: "承接结论，支持离店后沟通",
        },
      ],
      recordLabel: "同一份筛查记录",
      relayNote:
        "箭头表示接续与交接，不表示所有病例必须按同一顺序一次完成；门店与业务团队共同推进患者沟通与后续转化。",
      nurse: {
        label: "护士 / 资料采集",
        title: "历史资料和口扫模型直接进入筛查",
        body:
          "系统默认带入 1 年内可查询的全景片和半年内的口扫；口扫数据与设备对接，减少人工下载再上传。",
        alt: "护士资料采集界面，显示全景片、口扫模型和历史影像复用说明",
        annotations: [
          {
            n: 1,
            title: "历史资料复用",
            body: "默认带入 1 年内全景片 / 半年内口扫，超过则重新拍摄。",
          },
          {
            n: 2,
            title: "口扫模型",
            body: "已获取模型可直接用于后续分析，不必手工传输。",
          },
        ],
      },
      pedo: {
        label: "儿牙医生 / 初筛与转交",
        title: "把家长意愿和特殊情况留在同一份记录里",
        body:
          "完成初筛后，儿牙医生确认家长矫正意愿、决策人和特殊情况，再把记录转交正畸医生下结论。",
        alt: "儿牙医生完成筛查确认弹窗，包含家长意愿、决策人、特殊情况与转交医生",
        annotations: [
          {
            n: 1,
            title: "家长矫正意愿",
            body: "强 / 中 / 弱 / 拒绝，作为后续沟通依据。",
          },
          {
            n: 2,
            title: "患者决策人",
            body: "记录谁来做决定，避免后续反复确认。",
          },
          {
            n: 3,
            title: "特殊情况",
            body: "补充影响沟通或治疗的现场信息。",
          },
          {
            n: 4,
            title: "转交正畸医生",
            body: "转交后记录不可修改，保证结论基于已确认的信息。",
          },
        ],
      },
      ortho: {
        label: "正畸医生 / 专业结论",
        title: "待下结论队列与右侧结论面板",
        body:
          "正畸医生从待下结论队列进入筛查表，在右侧面板完成结论、治疗必要性、行动目标和行动计划。",
        queueAlt: "正畸医生待下结论列表，显示筛查优先级与进入筛查表入口",
        conclusionAlt: "正畸医生筛查结论面板，包含结论、治疗必要性、行动目标与行动计划",
        annotations: [
          {
            n: 1,
            title: "待下结论队列",
            body: "把需要专业判断的记录集中到一个工作队列。",
          },
          {
            n: 2,
            title: "专业结论",
            body: "需矫正 / 后续再筛查，由正畸医生填写。",
          },
          {
            n: 3,
            title: "治疗必要性与行动",
            body: "记录必要性、目标和下一步安排，供顾问跟进。",
          },
        ],
      },
      iteration:
        "单店试点后，按接诊中的实际填写负担继续精简内容；口扫系统对接减少了重复操作。",
    },
    experience: {
      lead:
        "现场沟通不仅需要记录结论，也需要让家长理解咬合情况。儿牙医生可以结合影像、口扫模型与科普说明进行解释；正畸医生确认结论后，系统生成报告，由正畸顾问发送给家长。",
      scanTitle: "口扫模型：把专业判断变成可以指给家长看的东西",
      scanBody:
        "模型可以旋转查看不同视角，右侧同时显示咬合分类；医生可以用它指出问题位置，再用科普说明解释术语。",
      scanAlt: "影像分析页面口扫视图，包含可旋转三维模型、理想模型对比与右侧咬合分类",
      scanAnnotations: [
        {
          n: 1,
          title: "可旋转模型",
          body: "支持不同视角查看，用于诊间讲解。",
        },
        {
          n: 2,
          title: "咬合分类与科普",
          body: "把“反合”等术语与图示对应起来。",
        },
      ],
      scienceTitle: "科普说明：用家长听得懂的语言解释",
      scienceBody:
        "例如用“地包天”解释反覆颌，并说明可能的影响；它辅助沟通，不替代正畸医生的诊断。",
      scienceAlt: "反覆颌科普弹窗，用图示和日常语言解释地包天",
      reportTitle: "家长报告：把结论带到离店之后",
      reportBody:
        "正畸医生确认结论后，系统生成报告，由正畸顾问发送给家长。报告承接诊间讲解，包含问题说明、相关科普与后续建议；家长可以在家回顾，也可以转给未到场的家人。",
      reportPreviewAlt: "生成报告预览弹窗，展示报告封面与医生提醒",
      reportCoverAlt: "家长端咬合筛查报告封面，已对姓名与生日脱敏",
      reportAnnotations: [
        {
          n: 1,
          title: "医生确认后生成",
          body: "报告以正畸医生的结论为前提。",
        },
        {
          n: 2,
          title: "家长可读的说明",
          body: "把专业结论转成问题说明、科普和下一步建议。",
        },
        {
          n: 3,
          title: "顾问发送",
          body: "由正畸顾问完成发送与后续沟通。",
        },
      ],
      reportStructureLabel: "报告包含",
      reportStructure: ["问题说明", "相关科普", "后续建议"],
      reportDisclaimer:
        "报告样例已脱敏；最终诊断以正畸医生线下面诊结果为准。",
      supplementTitle: "查看更多真实界面",
      supplementNote:
        "以下界面用于补充同一流程的其他视角；不重复正文已展示的主图。",
      supplement: [
        {
          title: "口扫数据同步到设备",
          body: "系统提示患者信息已同步，减少手工下载再上传。",
          alt: "患者信息同步至先临设备的提示弹窗",
          image: "nurseScanSync",
        },
        {
          title: "全景片辅助判断",
          body: "全景影像用于查看牙齿与颌骨关系。",
          alt: "影像分析页面全景片视图",
          image: "panoramic",
        },
        {
          title: "影像分析页面",
          body: "同一分析工作台的完整视图。",
          alt: "影像分析页面完整工作台",
          image: "analysisPage",
        },
        {
          title: "历史影像复用",
          body: "按日期查看历史影像；患者肖像已做脱敏。",
          alt: "患者历史影像列表，肖像已脱敏",
          image: "nurseHistory",
        },
      ],
    },
    results: {
      lead:
        "从单店试点、持续迭代到扩大验证，方案于 2026 年 2 月在全部门店上线。筛查、专业结论与后续业务节点逐步建立关联，为工作交接和进展跟踪提供共同依据。",
      timeline: [
        { date: "2025.04", label: "开始开发" },
        { date: "2025.05–08", label: "单店试点" },
        { date: "2025.08–12", label: "持续迭代" },
        { date: "2026.01", label: "扩至 3–4 家门店验证" },
        { date: "2026.02", label: "全部门店上线" },
      ],
      tracking:
        "关联筛查、专业结论与资料采集、方案沟通、成交等业务节点，让患者所处阶段可追踪；推荐条件、角色职责和后续行动也写进同一套规则。",
      stats: [
        {
          value: "18,460",
          unit: "条",
          label: "累计提交筛查结论记录",
          note: "记录数，不是去重患者数；精确统计截止日待核实。",
        },
        {
          value: "2026.02",
          label: "全部门店上线",
          note: "范围描述，不代表每家门店的采纳率。",
        },
        {
          value: "30–40% → 50–60%",
          label: "需矫成交率同期变化",
          note: "2025 年 2–4 月 → 2026 年 2–4 月；内部业务报表。",
        },
      ],
      conversionTitle: "需矫成交率的同期变化",
      range: { before: [30, 40], after: [50, 60] },
      conversionDefinition:
        "口径：判定需矫后产生矫正收费的患者数 / 需矫患者数。",
      caveat:
        "这是同一指标在两年同期的业务报表变化，不能单独归因于本项目；也不能把累计记录与成交率串成同一漏斗。",
      source:
        "来源：内部累计统计与全部门店业务报表；精确截止日、去重方式与同期筛选条件仍待核实。",
    },
    reflection: {
      items: [
        {
          title: "信息要求要匹配现场执行能力",
          body:
            "分工合理，不等于现场执行得完。单店试点后，我们按填写负担精简了内容；如果重新推进，我会更早验证现场真正需要的最小信息集，并检查后续角色能否承接。",
        },
        {
          title: "流程变更需要与业务共同推进",
          body:
            "初期我倾向于把使用不足归因于功能不适合现场，后来意识到筛查也改变了既有工作流程。今后会更早与业务管理者明确执行要求、协调资源，把系统优化和业务推进放在一起。",
        },
      ],
      disclosureTitle: "补充：入口复用取舍",
      disclosure:
        "筛查名单最初嵌入诊前预习，但当时预习执行尚不完善，主要由儿牙医生使用。业务建议独立列表后，我权衡了在多个功能间切换的成本，以及正畸与儿牙流程的差异，并通过医生调研确认可接受，最终选择拆分。",
    },
  },
  en: {
    title: "Occlusal Screening & Pre-treatment Orthodontic Collaboration",
    eyebrow: "CASE 01 / CLINICAL WORKFLOW",
    lede:
      "Rebuilding pre-orthodontic screening — previously dependent on individual judgement and scattered conversations — as a shared workflow across patient recommendations, record collection, role-based assessment and follow-up.",
    roleLabel: "MY ROLE",
    role:
      "Clinic research · workflow and rules · PRD · interaction and interface design · delivery coordination",
    coverNote:
      "Clinical conclusions were owned by orthodontists; patient communication and conversion were advanced jointly by clinics and business teams.",
    period: "2025.04 — 2026.02 / development to all-clinic rollout",
    facts: [
      {
        value: "2026.02",
        label: "Rolled out across all clinics",
        note: "From a single-clinic pilot to validation and rollout",
      },
      {
        value: "18,460",
        unit: "records",
        label: "Cumulative submitted screening conclusions",
        note: "Records, not unique patients",
      },
    ],
    chapters: [
      {
        id: "challenge",
        nav: "The problem",
        eyebrow: "PROBLEM",
        title: "The problem",
        kicker: "Why the old workflow was hard to sustain",
      },
      {
        id: "decision-1",
        nav: "Decision 01: recommend vs. do",
        eyebrow: "DECISION 01",
        title: "Separate candidates from the work that must be done",
        kicker: "Know what to do today, and where more work can come from",
      },
      {
        id: "decision-2",
        nav: "Decision 02: role handoffs",
        eyebrow: "DECISION 02",
        title: "Split tasks along professional boundaries",
        kicker:
          "Not one person completing a more complete form, but each role completing what it can reliably own",
      },
      {
        id: "experience",
        nav: "In-visit explanation and report",
        eyebrow: "EXPERIENCE",
        title: "From specialist judgement to information families can use",
        kicker: "The same conclusion supports the visit and the report",
      },
      {
        id: "results",
        nav: "Rollout and results",
        eyebrow: "ROLLOUT & RESULTS",
        title: "Running in clinics, with results stated precisely",
        kicker: "Separate recorded use from same-season business changes",
      },
      {
        id: "reflection",
        nav: "Reflection",
        eyebrow: "REFLECTION",
        title: "Two lessons about making a workflow stick",
        kicker: "Clear in the system is not the same as doable in a visit",
      },
    ],
    challenge: {
      lead:
        "Orthodontists used fast screening for an initial judgement, discussed patients in review meetings, and pediatric dentists passed the conclusion to families during visits. Forms, meetings and appointment notes lived in different places, and progress depended on individuals.",
      flowTitle: "The old flow: information spread across system, meeting and notes",
      flow: [
        {
          step: "Fast screening",
          detail: "Orthodontists reviewed records and wrote the result into appointment notes",
          tag: "In system",
        },
        {
          step: "Review meeting",
          detail: "Usually held a week ahead; roles contributed verbally",
          tag: "Meeting",
        },
        {
          step: "Pediatric visit",
          detail: "Pediatric dentists relayed the judgement to families",
          tag: "Visit",
        },
        {
          step: "Referral if needed",
          detail: "Clear occlusal issues and family interest led to an orthodontist assessment",
          tag: "Manual",
        },
      ],
      flowNote:
        "Simplified illustration. Execution varied by clinic and does not imply every patient followed this sequence.",
      problems: [
        {
          title: "Overlapping functions",
          body:
            "Fast screening and the assessment form covered some of the same judgements, adding duplicate input and interpretation.",
        },
        {
          title: "Role mismatch",
          body:
            "The form included specialist items that pediatric dentists could not complete independently, so it was rarely completed during visits.",
        },
        {
          title: "Progress hard to track",
          body:
            "Clinics organised reviews differently; follow-up and referral lacked a continuous state, so managers relied on later records.",
        },
      ],
    },
    decision1: {
      lead:
        "The business first asked for a fixed number of patient recommendations per doctor per day, refilled automatically when removed. It looked like workload planning, but it blurred candidates with the work that had to be done that day.",
      arguments: [
        {
          label: "Original request",
          body: "Recommend a fixed number of patients per doctor per day and refill automatically when removed.",
        },
        {
          label: "My judgement",
          body:
            "A continuously refilled list blurs the line between recommended patients and the work expected that day, and adds ongoing calculation and maintenance.",
        },
        {
          label: "Final rule",
          body:
            "Recommend in priority-based batches. Add screening to high-priority patients' existing appointments as an assigned task. Doctors can add candidates from the pool when they need more work.",
        },
      ],
      diagram: {
        candidateLabel: "Candidate scope",
        candidateTitle: "Recommendation pool",
        candidateBody: "Recommended in priority-based batches; priority considers dental development stage, family concerns, previous conclusions and follow-up dates",
        routesLabel: "Two ways into assigned work",
        routes: [
          {
            title: "System assigns high-priority patients",
            body: "Add screening to an existing appointment",
          },
          {
            title: "Doctor adds candidates",
            body: "Select from the pool when more work is needed",
          },
        ],
        executionLabel: "Execution scope",
        executionTitle: "Booked screening",
        executionBody: "Work to carry out, follow up and manage",
        note: "The pool is not a to-do list; removing a recommendation does not refill a fixed quota.",
      },
      evidenceTitle: "Two scopes in one list",
      evidenceAlt:
        "Screening list showing booked screening patients above and system-recommended patients below",
      evidenceNote:
        "Real system interface; patient names, dates of birth and doctor names have been redacted.",
      annotations: [
        {
          n: 1,
          title: "Booked screening patients",
          body: "Already in today's schedule; work to carry out and follow up.",
        },
        {
          n: 2,
          title: "System recommendations",
          body: "Candidates that can be added, recommended in priority-based batches.",
        },
      ],
      asideTitle: "Supporting decision: consolidating the entry point",
      aside:
        "I also identified that fast screening overlapped with the new workflow and proposed consolidating the entry point. After agreeing a transition with the business, most patients were covered once before fast screening was retired. The new workflow is now the single entry.",
    },
    decision2: {
      lead:
        "The existing assessment form mixed tasks from several roles, with fields beyond pediatric dentists' independent scope. Even with a form, it was hard to complete during a visit.",
      problemTitle: "Why the old form could not be filled in",
      problemBody:
        "It was adapted from the orthodontic treatment-plan list and mixed tasks for nurses, pediatric dentists and orthodontists; pre-filled historical information also lacked review during the visit.",
      judgmentTitle: "My judgement",
      judgmentBody:
        "Let each role complete what it can reliably own, then hand the information and task to the next role. Specialist conclusions are completed by orthodontists.",
      roles: [
        {
          role: "Nurse",
          task: "Consultation and record collection",
          body: "Bring in historical images and collect this visit's records",
        },
        {
          role: "Pediatric dentist",
          task: "Initial screening and family communication",
          body: "Confirm intent and special notes, then hand over",
        },
        {
          role: "Orthodontist",
          task: "Specialist judgement and conclusion",
          body: "Complete conclusion and action plan from the queue",
        },
        {
          role: "Orthodontic consultant",
          task: "Send the report to families",
          body: "Carry the conclusion into post-visit communication",
        },
      ],
      recordLabel: "One shared screening record",
      relayNote:
        "Arrows show handoffs, not a mandatory sequence completed in one visit. Clinics and business teams jointly advance communication and conversion.",
      nurse: {
        label: "NURSE / RECORD COLLECTION",
        title: "Historical records and intraoral scans flow into screening",
        body:
          "The system brings in panoramic images from the past year and intraoral scans from the past six months. Device integration removes manual download and upload.",
        alt: "Nurse record-collection screen with panoramic image, intraoral scan and history reuse",
        annotations: [
          {
            n: 1,
            title: "History reuse",
            body: "Panoramic images within one year and scans within six months are brought in automatically.",
          },
          {
            n: 2,
            title: "Intraoral scan",
            body: "An available model can be used directly without manual transfer.",
          },
        ],
      },
      pedo: {
        label: "PEDIATRIC DENTIST / INITIAL SCREENING",
        title: "Family intent and special notes stay on the same record",
        body:
          "After initial screening, the pediatric dentist confirms family intent, decision-maker and special notes, then hands the record to an orthodontist.",
        alt: "Screening completion dialog with family intent, decision-maker, special notes and handoff",
        annotations: [
          {
            n: 1,
            title: "Family intent",
            body: "Strong / medium / weak / declined, used for follow-up.",
          },
          {
            n: 2,
            title: "Decision-maker",
            body: "Records who decides, avoiding repeated confirmation.",
          },
          {
            n: 3,
            title: "Special notes",
            body: "Captures context that affects communication or care.",
          },
          {
            n: 4,
            title: "Handoff to orthodontist",
            body: "The record becomes read-only after handoff so the conclusion rests on confirmed information.",
          },
        ],
      },
      ortho: {
        label: "ORTHODONTIST / CONCLUSION",
        title: "A conclusion queue and a dedicated conclusion panel",
        body:
          "Orthodontists enter the screening record from the waiting-for-conclusion queue and complete the conclusion, necessity, goal and action plan in the right panel.",
        queueAlt: "Orthodontist queue waiting for conclusions, showing priority and entry links",
        conclusionAlt: "Orthodontist conclusion panel with conclusion, necessity, goal and action plan",
        annotations: [
          {
            n: 1,
            title: "Conclusion queue",
            body: "Records needing specialist judgement are gathered in one queue.",
          },
          {
            n: 2,
            title: "Specialist conclusion",
            body: "Treatment needed or screen again later, completed by the orthodontist.",
          },
          {
            n: 3,
            title: "Necessity and action",
            body: "Necessity, goal and next step support consultant follow-up.",
          },
        ],
      },
      iteration:
        "After the single-clinic pilot, content was simplified further based on the input burden during visits; scan integration removed repeated manual work.",
    },
    experience: {
      lead:
        "Recording a conclusion is not enough; families also need to understand the occlusal situation. Pediatric dentists can explain it with images, an intraoral scan and plain-language material. After the orthodontist confirms the conclusion, the system generates a report that the orthodontic consultant sends to the family.",
      scanTitle: "An intraoral model makes the judgement something to point at",
      scanBody:
        "The model rotates across views while the right side shows occlusal classifications. The dentist can indicate the issue and use plain-language notes to explain the term.",
      scanAlt: "Intraoral analysis screen with rotatable 3D model, ideal-model comparison and occlusal classification",
      scanAnnotations: [
        {
          n: 1,
          title: "Rotatable model",
          body: "Different views support in-visit explanation.",
        },
        {
          n: 2,
          title: "Classification and explainer",
          body: "Connects terms such as reverse articulation to a visual.",
        },
      ],
      scienceTitle: "Plain-language explanation families can follow",
      scienceBody:
        "For example, 'underbite' explains reverse overjet and its possible impact. It supports communication; it does not replace the orthodontist's diagnosis.",
      scienceAlt: "Reverse overjet explainer using an illustration and everyday language",
      reportTitle: "The family report carries the conclusion beyond the visit",
      reportBody:
        "After the orthodontist confirms the conclusion, the system generates a report and the orthodontic consultant sends it to the family. It carries the in-visit explanation, findings, plain-language notes and next steps, so families can review it at home or share it with relatives who were not present.",
      reportPreviewAlt: "Report preview dialog with cover and doctor reminder",
      reportCoverAlt: "Family-facing screening report cover, with name and date of birth redacted",
      reportAnnotations: [
        {
          n: 1,
          title: "Generated after confirmation",
          body: "The report starts from the orthodontist's conclusion.",
        },
        {
          n: 2,
          title: "Written for families",
          body: "Findings, plain-language notes and next steps.",
        },
        {
          n: 3,
          title: "Sent by the consultant",
          body: "The orthodontic consultant sends it and follows up.",
        },
      ],
      reportStructureLabel: "Report contents",
      reportStructure: ["Findings", "Plain-language notes", "Next steps"],
      reportDisclaimer:
        "Sample report, redacted. Final diagnosis rests on the orthodontist's in-person assessment.",
      supplementTitle: "More real interfaces",
      supplementNote:
        "These views support other parts of the same workflow and do not repeat the main evidence above.",
      supplement: [
        {
          title: "Scan data synced to the device",
          body: "The system confirms the patient is synced, reducing manual download and upload.",
          alt: "Patient information synced to the intraoral scanner",
          image: "nurseScanSync",
        },
        {
          title: "Panoramic view",
          body: "Panoramic imaging supports assessment of teeth and jaws.",
          alt: "Panoramic view in the image-analysis screen",
          image: "panoramic",
        },
        {
          title: "Image-analysis workspace",
          body: "The complete view of the same analysis workspace.",
          alt: "Complete image-analysis workspace",
          image: "analysisPage",
        },
        {
          title: "Historical images",
          body: "Images are grouped by date; patient portraits are redacted.",
          alt: "Historical patient image list with portraits redacted",
          image: "nurseHistory",
        },
      ],
    },
    results: {
      lead:
        "From a single-clinic pilot through iteration and validation, the workflow rolled out across all clinics in February 2026. Screening, specialist conclusions and subsequent business stages became connected, giving handoffs and progress tracking a shared basis.",
      timeline: [
        { date: "2025.04", label: "Development started" },
        { date: "2025.05–08", label: "Single-clinic pilot" },
        { date: "2025.08–12", label: "Iteration" },
        { date: "2026.01", label: "Validated in 3–4 clinics" },
        { date: "2026.02", label: "All-clinic rollout" },
      ],
      tracking:
        "Screening, specialist conclusions and later stages such as record collection, plan communication and treatment charges were linked so patient progress could be tracked. Recommendation criteria, role responsibilities and next actions were written into the same set of rules.",
      stats: [
        {
          value: "18,460",
          unit: "records",
          label: "Cumulative submitted screening conclusions",
          note: "Records, not unique patients; the exact cut-off date is still to be verified.",
        },
        {
          value: "2026.02",
          label: "All-clinic rollout",
          note: "A scope statement, not an adoption rate for every clinic.",
        },
        {
          value: "30–40% → 50–60%",
          label: "Same-season conversion change",
          note: "February–April 2025 to February–April 2026; internal business report.",
        },
      ],
      conversionTitle: "Same-season change in conversion among patients assessed as needing treatment",
      range: { before: [30, 40], after: [50, 60] },
      conversionDefinition:
        "Definition: patients assessed as needing treatment who later incurred an orthodontic charge / patients assessed as needing treatment.",
      caveat:
        "This is a change in one internal business report across the same months in two years. It cannot be attributed to this project alone, and cumulative records must not be combined with conversion into one funnel.",
      source:
        "Sources: internal cumulative statistics and all-clinic business reports. Exact cut-off date, deduplication and same-season filters still need verification.",
    },
    reflection: {
      items: [
        {
          title: "Information requirements must match what the visit can absorb",
          body:
            "Clear responsibilities do not guarantee completion during a visit. After the pilot we simplified the content. If starting again, I would test the minimum information set earlier and check whether the next role can take it over.",
        },
        {
          title: "Workflow change needs to advance with the business",
          body:
            "At first I tended to attribute limited use to poor fit with the visit. I later recognised that screening also changed established routines. I would involve business managers earlier to clarify execution requirements and coordinate resources.",
        },
      ],
      disclosureTitle: "Supporting note: reusing an existing entry point",
      disclosure:
        "The screening list was initially embedded in pre-visit preparation, but that workflow was not yet consistently used and was mainly used by pediatric dentists. When the business proposed a separate list, I weighed the cost of switching between features and the differences between orthodontic and pediatric workflows, confirmed acceptability through doctor research, and chose to separate it.",
    },
  },
};
