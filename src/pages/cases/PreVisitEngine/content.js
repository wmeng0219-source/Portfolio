// Runtime copy follows docs/pages/pre-visit-engine/content.md.
// This candidate demonstrates mechanisms; rollout and adoption remain unverified.
const text = (zh, en) => ({ zh, en });

export const caseContent = {
  title: text('接诊全流程预习与任务编排引擎', 'Pre-visit orchestration & task engine'),
  tag: text('扩展案例 · 机制进行中', 'Extended case · mechanism in progress'),
  background: text(
    '网络电话、领健收费和 360 病史中的信息分散在不同系统，护士、医生和运营只能靠人工拼接和口头交接完成接诊前准备。',
    'Phone records, billing and clinical history are spread across different systems. Nurses, doctors and operations staff have to assemble information manually and hand it over verbally before a visit.',
  ),
  role: text(
    '从 Product Designer 逐步承担 Product Owner / Designer 责任，主导全链路交互、业务规则推演、PRD 和技术协作。',
    'Gradually took on Product Owner / Designer responsibilities from a Product Designer role, leading end-to-end interaction design, business-rule modeling, PRDs and technical collaboration.',
  ),
  evidence: [
    { value: text('机制证据', 'Mechanism evidence'), label: text('打通孤岛系统', 'Cross-system integration') },
    { value: text('原始需求', 'Source requirements'), label: text('任务包与推荐规则', 'Task bundles and recommendation rules') },
    { value: text('待补', 'Pending'), label: text('上线结果与采纳证据', 'Rollout and adoption evidence') },
    { value: text('候选案例', 'Candidate case'), label: text('当前展示定位', 'Current presentation status') },
  ],
  problem: text(
    '接诊前需要同时了解家长诉求、既往病史、影像、卡券和预约信息。旧流程要求一线在多个系统之间切换，任务靠经验判断；如果系统只给出推荐而不说明原因，一线也难以判断是否值得执行。',
    'Before a visit, staff need the parent’s concerns, medical history, images, membership benefits and appointment details. The old workflow requires switching between systems and judging tasks from experience. Recommendations without reasons are also difficult to evaluate.',
  ),
  solution: [
    { title: text('全景前置视图', 'Panoramic profile view'), desc: text('聚合电话、收费、病史、预约和会员信息，先让团队看到同一份患者上下文。', 'Bring phone, billing, history, appointment and membership information into a shared patient context.') },
    { title: text('分层任务包', 'Layered task bundles'), desc: text('将任务拆成必选、推荐和自定义扩展包，让标准化和现场灵活性共存。', 'Separate mandatory, recommended and custom bundles to combine standardization with flexibility at the point of care.') },
    { title: text('角色协同与校验', 'Role handoff and validation'), desc: text('护士确认资料，医生复核诊疗准备，运营跟进预约与权益；角色交接时校验必填项并定位首个缺口。', 'Nurses confirm records, doctors review clinical preparation, and operations staff follow up on appointments and benefits. Validate required fields and locate the first missing item at handoff.') },
    { title: text('病历同步', 'Clinical-record synchronization'), desc: text('把预习结果按约定格式回写领健备注，避免团队重复整理。', 'Write preparation results to the clinical-record notes in the agreed format to avoid repeated compilation.') },
  ],
  taskModel: [
    { type: text('必选任务包', 'Mandatory bundle'), desc: text('按任务展开必选信息。', 'Expand required information by task.') },
    { type: text('规则推荐包', 'Recommended bundle'), desc: text('推荐与必选分层，点击抽屉查看推荐条件和推导依据。', 'Keep recommendations separate from required tasks and open a drawer to inspect their conditions and reasoning.') },
    { type: text('自定义扩展包', 'Custom bundle'), desc: text('保留现场灵活性；任务包覆盖范围仍需样本和上线记录验证。', 'Retain flexibility in the clinical setting; coverage still requires samples and rollout records for verification.') },
  ],
  tooth: text(
    '支持全口、象限、连续牙段、单颗牙和多生牙选择，并处理互斥关系。控件规则有原始需求支持，但尚缺可公开的实际使用反馈。',
    'Support full-mouth, quadrant, consecutive-tooth, single-tooth and supernumerary-tooth selection with mutual-exclusion rules. Source requirements support the rules; public usage feedback is still missing.',
  ),
  decisions: [
    { question: text('推荐为什么要能解释？', 'Why should recommendations be explainable?'), choice: text('主流程保持简洁，点击抽屉查看推荐条件和推导依据，把隐性业务经验变成可检查的规则。可解释机制不等同于已证明推荐被采纳或提升效率。', 'Keep the main workflow simple and expose conditions and reasoning in a drawer, turning tacit experience into inspectable rules. Explainability does not establish adoption or efficiency gains.') },
    { question: text('为什么不用长表单，而用分层任务包？', 'Why use layered bundles instead of a long form?'), choice: text('必选、推荐、扩展分层折叠，按任务展开。不同预约类型和角色需要的信息不同；覆盖范围和减少漏项的效果仍需验证。', 'Collapse mandatory, recommended and custom bundles separately and expand them by task. Appointment types and roles need different information; coverage and reductions in missed items remain unverified.') },
    { question: text('为什么定制十字牙位控件？', 'Why customize a cross-quadrant tooth selector?'), choice: text('牙位是临床任务的关键输入，通用下拉框难以表达混合牙列和多生牙位置。按口腔场景定制选择与互斥规则，实际使用反馈仍待补齐。', 'Tooth position is a key clinical input. A generic dropdown struggles to express mixed dentition and supernumerary teeth. Customize selection and exclusion rules for the dental setting; usage feedback is still pending.') },
  ],
  mechanism: text(
    '电话 / 收费 / 病史 → 全景视图 → 规则推荐任务包 → 医护运协同 → 领健备注同步。预习可以提前 1—3 天完成，因此需求中保留了超过 7 天的重新确认弹窗；跨系统数据变化、退改签、资料缺失和同步失败需要继续补充验证。',
    'Phone / billing / clinical history → panoramic view → recommended task bundles → staff handoff → clinical-record notes. Preparation may happen one to three days before a visit; requirements retain a reconfirmation dialog after more than seven days. Data changes, appointment changes, missing records and synchronization failures still need further verification.',
  ),
  result: text(
    '有原始需求和规则机制，缺少可公开的上线结果与规模化采纳证据。目前能证明的是跨系统整合、任务模型、可解释推荐、角色校验和病历同步机制；任务包覆盖率、采纳率、减少漏项和效率提升仍待正式数据。',
    'Source requirements and rule mechanisms are available. Public rollout results and adoption evidence are still pending. Current evidence supports cross-system integration, task modeling, explainable recommendations, role validation and record synchronization; coverage, adoption, fewer missed items and efficiency gains still require formal data.',
  ),
  retrospective: {
    title: text('复盘反思与未解局限', 'Retrospective & limitations'),
    items: [
      { title: text('设计驱动产品建模', 'Design-led product modeling'), desc: text('当交互无法承载复杂业务时，先通过状态、任务包、牙位控件和解释抽屉把规则显性化，再反向收束 PRD 和系统边界。', 'When interactions cannot carry complex business logic, make rules explicit through states, task bundles, tooth controls and explanation drawers, then refine PRDs and system boundaries.') },
      { title: text('事实与待补', 'Evidence still needed'), desc: text('项目周期、参与团队、正式上线范围、任务包覆盖率、采纳率、减少漏项的统计、失效/同步失败案例和脱敏界面素材仍待补充。', 'Project dates, team involvement, rollout scope, bundle coverage, adoption, missed-item statistics, expiry and synchronization-failure cases, and de-identified interface materials remain to be supplied.') },
    ],
  },
};
