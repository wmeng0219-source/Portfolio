import React from "react";
import styles from "./MemberAutomation.module.css";

/**
 * Visual 1: 数据孤岛与前台并发压力 (Data Silos & Front-Desk Pressure)
 * 解释为什么前台容易开错单、算错账的结构性根因
 */
export function DataSiloDiagram({ language }) {
  const zh = language === "zh";
  return (
    <figure
      className={styles.diagramCard}
      aria-label={zh ? "数据结构割裂与前台并发压力" : "Data silos and front-desk concurrency pressure"}
    >
      <div className={styles.diagramHeader}>
        <span className={styles.diagramTag}>{zh ? "结构矛盾图解" : "Structural Friction"}</span>
        <h4 className={styles.diagramTitle}>
          {zh ? "卡券数据孤岛与前台高并发压力" : "Fragmented Card-Coupon Data & Multitasking Pressure"}
        </h4>
      </div>

      <div className={styles.siloGrid}>
        <div className={styles.siloItem}>
          <div className={styles.siloTop}>
            <strong>{zh ? "单年卡" : "Single-year Card"}</strong>
            <span className={styles.siloBadgeWarning}>{zh ? "卡券分离" : "Split Assets"}</span>
          </div>
          <div className={styles.siloDetail}>
            <p><strong>{zh ? "会员卡内：" : "In Card: "}</strong>{zh ? "基础诊疗折扣与卡籍" : "Basic discounts & status"}</p>
            <p><strong>{zh ? "卡券包内：" : "In Coupons: "}</strong>{zh ? "涂氟/洁牙以单券形式发放" : "Fluoride / cleanings as vouchers"}</p>
          </div>
          <div className={styles.siloFoot}>{zh ? "原系统无关联映射，退卡极易漏算券" : "No linkage; refunds easily miss coupons"}</div>
        </div>

        <div className={styles.siloItem}>
          <div className={styles.siloTop}>
            <strong>{zh ? "多年卡" : "Multi-year Card"}</strong>
            <span className={styles.siloBadgeNeutral}>{zh ? "卡内聚合" : "Unified"}</span>
          </div>
          <div className={styles.siloDetail}>
            <p><strong>{zh ? "会员卡内：" : "In Card: "}</strong>{zh ? "所有项目与折扣全打包在卡" : "All services bundled in card"}</p>
            <p><strong>{zh ? "卡券包内：" : "In Coupons: "}</strong>{zh ? "无关联卡券" : "No external coupons"}</p>
          </div>
          <div className={styles.siloFoot}>{zh ? "结构与单年卡完全不同，计算规则冲突" : "Structure conflicts with single-year cards"}</div>
        </div>

        <div className={styles.siloItem}>
          <div className={styles.siloTop}>
            <strong>{zh ? "囤卡/赠券" : "Pre-purchased Cards"}</strong>
            <span className={styles.siloBadgeWarning}>{zh ? "纯券形态" : "Voucher-only"}</span>
          </div>
          <div className={styles.siloDetail}>
            <p><strong>{zh ? "会员卡内：" : "In Card: "}</strong>{zh ? "未开通实体卡籍" : "No active card record"}</p>
            <p><strong>{zh ? "卡券包内：" : "In Coupons: "}</strong>{zh ? "仅存为单张开卡兑换券" : "Stored purely as redeemable vouchers"}</p>
          </div>
          <div className={styles.siloFoot}>{zh ? "容易与普通优惠券混淆并误核销" : "Easily confused with regular discount coupons"}</div>
        </div>
      </div>

      <div className={styles.pressureBar}>
        <span className={styles.pressureLabel}>{zh ? "现场前台并发负荷" : "Front-desk Multitasking"}:</span>
        <div className={styles.pressureTags}>
          <span>{zh ? "1. 患者挂号接诊" : "1. Patient check-in"}</span>
          <span>{zh ? "2. 算账退补开卡" : "2. Upgrade calculations"}</span>
          <span>{zh ? "3. 打印收费单据" : "3. Invoice printing"}</span>
          <span>{zh ? "4. 现场售卡答疑" : "4. Inquiries & sales"}</span>
        </div>
      </div>

      <figcaption>
        {zh
          ? "业务规则与数据结构割裂：领健系统内卡、券彼此独立；面对带娃家长排队催促，前台无暇翻手册，只能靠人脑硬记算账。"
          : "Structural data divide: cards and coupons were isolated. Under high front-desk pressure, operators had to calculate by heart."}
      </figcaption>
    </figure>
  );
}

/**
 * Visual 2: 4 步标准决策流水线 (4-Step Standard Decision Pipeline)
 * 展现面对十几种卡时的标准化算法与收敛能力
 */
export function DecisionPipelineDiagram({ language }) {
  const zh = language === "zh";
  const steps = [
    {
      num: "01",
      title: zh ? "卡状态校验" : "Card Status Check",
      desc: zh ? "校验旧卡是否在有效期内、是否正常" : "Verify card is active and non-frozen",
      tag: zh ? "在期有效" : "Active Valid",
    },
    {
      num: "02",
      title: zh ? "卡券穿透核算" : "Asset Valuation",
      desc: zh ? "穿透收费单，合并卡内残值与卡券价值" : "Penetrate bills to sum residual card & coupon value",
      tag: zh ? "旧卡净残值" : "Net Residual",
    },
    {
      num: "03",
      title: zh ? "目标卡匹配补差" : "Target Card Matching",
      desc: zh ? "根据儿童当前周岁匹配新卡价格档位" : "Match child's age tier and calculate price delta",
      tag: zh ? "顺延有效期" : "Validity Extended",
    },
    {
      num: "04",
      title: zh ? "额度规则校验" : "Quota Verification",
      desc: zh ? "校验门诊/岗位月度优惠额度并抵扣" : "Check monthly clinic/role quota pool & deduct",
      tag: zh ? "最终实付差额" : "Final Payable",
    },
  ];

  return (
    <figure
      className={styles.diagramCard}
      aria-label={zh ? "四步标准决策流水线" : "4-step standard decision pipeline"}
    >
      <div className={styles.diagramHeader}>
        <span className={styles.diagramTag}>{zh ? "系统模型" : "System Model"}</span>
        <h4 className={styles.diagramTitle}>
          {zh ? "收银升级四步标准化决策流水线" : "4-Step Standard Decision Pipeline"}
        </h4>
      </div>

      <div className={styles.pipelineFlow}>
        {steps.map((step, idx) => (
          <div key={step.num} className={styles.pipelineStep}>
            <div className={styles.pipelineStepHeader}>
              <span className={styles.pipelineIndex}>{step.num}</span>
              <strong>{step.title}</strong>
            </div>
            <p className={styles.pipelineDesc}>{step.desc}</p>
            <span className={styles.pipelinePill}>{step.tag}</span>
            {idx < steps.length - 1 && <span className={styles.pipelineArrow} aria-hidden="true">→</span>}
          </div>
        ))}
      </div>

      <figcaption>
        {zh
          ? "标准决策流水线：将原先散在人脑中的离散规则转化为线性计算闭环，全过程系统自动测算并同屏呈现。"
          : "Standard decision pipeline: turns discrete mental calculations into an automated, auditable computational flow."}
      </figcaption>
    </figure>
  );
}

/**
 * Visual 3: 决策 A · 自动与人工的刚性边界对照 (Boundary Split View)
 * 遵循 DESIGN.md §4.5 规范：#f3f3f3 浅色底、var(--action) 1.5px 主路径、var(--muted) 1.5px 虚线异常路径
 * 严格对应 docs/pages/member-automation/design.md §2.2
 */
export function AutomationBoundaryDiagram({ language }) {
  const zh = language === "zh";
  return (
    <figure
      className={styles.specFigure}
      data-decision="决策 A"
      aria-label={
        zh
          ? "决策 A · 常规自动，异常人工：自动与人工控制边界"
          : "Decision A: Automation vs Manual Boundary Split"
      }
    >
      <div className={styles.specFigureHeader}>
        <span className={styles.specFigureLabel}>
          {zh ? "决策 A · 控制边界" : "Decision A · Control Boundary"}
        </span>
        <h4 className={styles.specFigureTitle}>
          {zh
            ? "常规自动，异常人工：划清算法与人工的控制边界"
            : "Standard Automated Path vs. Rigid Exception Stops"}
        </h4>
      </div>

      <div className={styles.boundarySplitGrid}>
        {/* Left Column: Automated Path */}
        <div className={styles.boundaryColAuto}>
          <div className={styles.boundaryColHead}>
            <span className={styles.boundaryColBadge}>
              {zh ? "标准路径 · 全自动" : "Standard · Automated"}
            </span>
          </div>

          <div className={styles.boundaryConditionBlock}>
            <span className={styles.boundaryConditionLabel}>
              {zh ? "前置成立条件 (Invariants)" : "Invariants Met"}
            </span>
            <p>
              {zh
                ? "单张有效历史收费单 · 会员卡处于正常在期 · 优惠在月度额度内"
                : "Single valid invoice · Card active & in validity · Within quota pool"}
            </p>
          </div>

          <div className={styles.specRouteConnector}>
            <span className={styles.specRouteLineSolid} />
            <span className={styles.specRouteArrowSolid} aria-hidden="true">→</span>
            <span className={styles.specRouteTag}>
              {zh ? "系统自动穿透" : "System Automated"}
            </span>
          </div>

          <div className={styles.boundaryActionBlock}>
            <strong>{zh ? "系统闭环执行：" : "System Execution: "}</strong>
            <p>
              {zh
                ? "穿透原收费单核算卡券残值，按周岁匹配新卡档位自动补差，顺延有效期。前台一键确认出单，现场零心算，耗时收敛至约 1 分钟。"
                : "Auto-penetrates original bills, matches age tier, and calculates difference. One-click desk checkout with zero manual arithmetic."}
            </p>
          </div>
        </div>

        {/* Right Column: Rigid Manual Stop */}
        <div className={styles.boundaryColManual}>
          <div className={styles.boundaryColHead}>
            <span className={styles.boundaryColBadgeManual}>
              {zh ? "异常场景 · 坚决停机" : "Exceptions · Rigid Stop"}
            </span>
          </div>

          <div className={styles.boundaryConditionBlock}>
            <span className={styles.boundaryConditionLabel}>
              {zh ? "触发多义性场景 (Ambiguities)" : "Ambiguities Detected"}
            </span>
            <p>
              {zh
                ? "未检索到原开卡单据 · 存在多张历史关联账单 · 会员卡处于冻结或过期"
                : "No charge order found · Multiple matching bills · Card frozen or expired"}
            </p>
          </div>

          <div className={styles.specRouteConnector}>
            <span className={styles.specRouteLineDashed} />
            <span className={styles.specRouteArrowDashed} aria-hidden="true">→</span>
            <span className={styles.specRouteTagManual}>
              {zh ? "刚性阻断停机" : "Strict Stop"}
            </span>
          </div>

          <div className={styles.boundaryActionBlock}>
            <strong>{zh ? "人工确认推进：" : "Human Verification: "}</strong>
            <p>
              {zh
                ? "系统刚性阻断自动化推算，坚决禁止算法替人盲猜；同屏就地展开异常单据诊断卡片，由前台人工甄别票据归属或管理特许后推进。"
                : "Halts automation strictly to avoid guesswork. Renders diagnosis card inline; desk verifies paper slips before proceeding."}
            </p>
          </div>
        </div>
      </div>

      <figcaption>
        {zh
          ? "控制边界设计哲学：退卡补差动的是钱和权益，系统猜错的修复成本极高。宁可人工多点一次，也绝不让系统在不确定的边界上盲目自动化。"
          : "Control philosophy: funds and entitlements are sensitive. Halting for manual verification prevents costly ledger discrepancies."}
      </figcaption>
    </figure>
  );
}

/**
 * Visual 4: 决策 B · 优惠额度管理模型 (Governance Flow)
 * 遵循 DESIGN.md §4.5 规范：对比旧机制与新机制，使用中性灰底与 Action ink 连线
 * 严格对应 docs/pages/member-automation/design.md §2.3
 */
export function QuotaGovernanceDiagram({ language }) {
  const zh = language === "zh";
  const oldSteps = [
    { seq: "01", title: zh ? "现场加急催促" : "Desk Pressure", desc: zh ? "带娃家长排队，前台收银时间极紧" : "Parents waiting; severe desk pressure" },
    { seq: "02", title: zh ? "电话口头特批" : "Verbal Sign-off", desc: zh ? "钉钉流长，改打电话特批（无系统凭据）" : "DingTalk too slow; verbal approval" },
    { seq: "03", title: zh ? "手动改价出单" : "Manual Override", desc: zh ? "前台直接改价开卡，事后闲时再补提" : "Price override applied; post-hoc filing" },
    { seq: "04", title: zh ? "月底对账黑洞" : "Audit Blackhole", desc: zh ? "账单与审批脱节，违规与账实不符" : "Orders detached; reconciliation blind spot" },
  ];

  const newSteps = [
    { seq: "01", title: zh ? "事前配置额度池" : "Upfront Quotas", desc: zh ? "月初划定门诊与岗位月度可用优惠池" : "Monthly quota pool allocated upfront" },
    { seq: "02", title: zh ? "实时校验与刚性阻断" : "Realtime Guard", desc: zh ? "额度内自动核算；超额刚性阻断取消特批" : "Auto-deducts in quota; halts strictly on limit" },
    { seq: "03", title: zh ? "额度内秒级出单" : "Instant Checkout", desc: zh ? "系统自动抵扣差额，前台免审批直接开卡" : "System applies discount; zero desk waiting" },
    { seq: "04", title: zh ? "全量流水闭环" : "Complete Audit", desc: zh ? "操作人、时间、账单全量留痕，一键对账" : "Every discount logged; instant reconciliation" },
  ];

  return (
    <figure
      className={styles.specFigure}
      data-decision="决策 B"
      aria-label={
        zh
          ? "决策 B · 优惠上限，额度闭环：优惠额度管理模型新旧流转对比"
          : "Decision B: Quota Governance Model Before and After"
      }
    >
      <div className={styles.specFigureHeader}>
        <span className={styles.specFigureLabel}>
          {zh ? "决策 B · 机制重塑" : "Decision B · Governance Mechanism"}
        </span>
        <h4 className={styles.specFigureTitle}>
          {zh
            ? "优惠上限，额度闭环：从口头同意后补审批走向事前额度池"
            : "Discount Governance: From Post-Hoc Leaks to Upfront Quota Pools"}
        </h4>
      </div>

      <div className={styles.govComparisonStack}>
        {/* Track 1: Old Flow */}
        <div className={styles.govTrackOld}>
          <div className={styles.govTrackHeader}>
            <strong>{zh ? "原有机制 · 事中审批流于形式（耗时失控、财务黑洞）" : "Previous Mechanism · Uncontrolled Approval Loop"}</strong>
            <span>{zh ? "先改价后补提，财务对账无真实依据" : "Post-hoc paperwork creates audit gaps"}</span>
          </div>
          <div className={styles.govStepsRow}>
            {oldSteps.map((step, idx) => (
              <div key={step.seq} className={styles.govStepItem}>
                <div className={styles.govStepNodeOld}>
                  <span className={styles.govStepSeq}>{step.seq}</span>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
                {idx < oldSteps.length - 1 && (
                  <div className={styles.govConnectorOld} aria-hidden="true">
                    <span className={styles.govLineDashed} />
                    <span className={styles.govArrowDashed}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: New Flow */}
        <div className={styles.govTrackNew}>
          <div className={styles.govTrackHeader}>
            <strong className={styles.govTitleActive}>{zh ? "调整后机制 · 事前定额与刚性阻断（极速放权、闭环审计）" : "Current Mechanism · Upfront Governance & Audit Trail"}</strong>
            <span>{zh ? "额度内秒级自主放权，超额刚性阻断杜绝人情通道" : "Instant quota pass; strict halt eliminates backdoors"}</span>
          </div>
          <div className={styles.govStepsRow}>
            {newSteps.map((step, idx) => (
              <div key={step.seq} className={styles.govStepItem}>
                <div className={styles.govStepNodeNew}>
                  <span className={styles.govStepSeqActive}>{step.seq}</span>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
                {idx < newSteps.length - 1 && (
                  <div className={styles.govConnectorNew} aria-hidden="true">
                    <span className={styles.govLineSolid} />
                    <span className={styles.govArrowSolid}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption>
        {zh
          ? "多角色机制重塑：把财务控制点从流于形式的“事中审批”挪到“事前定边界、事后全留痕”。前台在额度内极速自主放权，超额刚性阻断杜绝人情通道，彻底消灭审计盲区。"
          : "Governance re-engineered: shifting control from post-hoc approvals to upfront quotas and tamper-proof logs eliminates audit blind spots while accelerating desk checkout."}
      </figcaption>
    </figure>
  );
}

/**
 * Visual: 决策 C · 失败保护与原子回退容灾流
 * 遵循 DESIGN.md §4.5 规范：#f3f3f3 底色，1.5px 实线与虚线路径区分成功与回滚
 * 严格对应 docs/pages/member-automation/content.md §02
 */
export function FailureProtectionDiagram({ language }) {
  const zh = language === "zh";
  return (
    <figure
      className={styles.specFigure}
      data-decision="决策 C"
      aria-label={
        zh
          ? "决策 C · 失败保护，状态留存：断网超时原子回退容灾流"
          : "Decision C: Failure Protection & Atomic Rollback"
      }
    >
      <div className={styles.specFigureHeader}>
        <span className={styles.specFigureLabel}>
          {zh ? "决策 C · 容灾架构" : "Decision C · Fault Tolerance"}
        </span>
        <h4 className={styles.specFigureTitle}>
          {zh
            ? "失败保护，状态留存：断网超时原子回退，绝不制造悬空资产"
            : "Failure Protection: Atomic Rollback Under Network Drops"}
        </h4>
      </div>

      <div className={styles.failureFlowGrid}>
        {/* State 1 */}
        <div className={styles.failureStateCard}>
          <span className={styles.failureStateBadge}>01</span>
          <strong>{zh ? "待执行状态" : "Pending Execution"}</strong>
          <p>
            {zh
              ? "前台同屏确认差价，会员原卡在期正常，关联收费单已解析完成"
              : "Desk verifies delta; old card active, bills parsed"}
          </p>
        </div>

        {/* Transition Arrow 1 */}
        <div className={styles.failureRouteConnector}>
          <span className={styles.specRouteLineSolid} />
          <span className={styles.specRouteArrowSolid} aria-hidden="true">→</span>
          <span className={styles.failureRouteTag}>{zh ? "前台确认提交" : "Submit"}</span>
        </div>

        {/* State 2 */}
        <div className={styles.failureStateCard}>
          <span className={styles.failureStateBadge}>02</span>
          <strong>{zh ? "核心事务处理中" : "Atomic Transaction"}</strong>
          <p>
            {zh
              ? "锁定原卡资产 ➔ 调用底层系统退旧卡 ➔ 核销赠券 ➔ 写入新卡"
              : "Locks asset, calls API: refund card ➔ void vouchers ➔ open card"}
          </p>
        </div>

        {/* Transition Arrow 2 (Branches) */}
        <div className={styles.failureBranchConnector}>
          <span className={styles.specRouteLineSolid} />
          <span className={styles.specRouteArrowSolid} aria-hidden="true">→</span>
        </div>

        {/* Outcomes */}
        <div className={styles.failureOutcomesCol}>
          <div className={styles.failureOutcomeSuccess}>
            <strong>{zh ? "成功：新卡生效与流水记账" : "Success: New Card Active"}</strong>
            <p>
              {zh
                ? "新卡激活，有效期顺延写入，跨店结算流水自动生成"
                : "New card active; validity extended; cross-clinic log written."}
            </p>
          </div>

          <div className={styles.failureOutcomeRollback}>
            <div className={styles.failureRollbackHead}>
              <span className={styles.failureDottedRoute} />
              <strong>{zh ? "异常：原子回退保留原卡原权益" : "Failure: Atomic Rollback"}</strong>
            </div>
            <p>
              {zh
                ? "遇断网或接口超时立即回滚，释放锁并保留原卡，打印异常码转人工，坚决杜绝悬空资产"
                : "On timeout, rolls back atomically; retains old card/vouchers; zero orphan assets."}
            </p>
          </div>
        </div>
      </div>

      <figcaption>
        {zh
          ? "交易原子性保证：动卡和资金的操作必须闭环。遇不可控异常优先保护客户既有资产，绝不让系统留下无法自洽的悬空状态。"
          : "Transaction atomicity invariant: core operations must be atomic. Uncontrolled network drops revert to original state, preventing orphaned entitlements."}
      </figcaption>
    </figure>
  );
}

/**
 * Visual 5: 收银台同屏三区架构 (Three-Zone Workspace Architecture Map)
 */
export function WorkspaceArchitectureDiagram({ language }) {
  const zh = language === "zh";
  return (
    <figure
      className={styles.diagramCard}
      aria-label={zh ? "收银台同屏三区信息架构" : "Three-zone unified workspace architecture"}
    >
      <div className={styles.diagramHeader}>
        <span className={styles.diagramTag}>{zh ? "信息架构" : "Information Architecture"}</span>
        <h4 className={styles.diagramTitle}>
          {zh ? "同屏收银台三区信息架构与交互降噪" : "Three-Zone Unified Workspace & Cognitive De-cluttering"}
        </h4>
      </div>

      <div className={styles.workspaceMock}>
        <div className={styles.mockZone}>
          <div className={styles.mockZoneHeader}>
            <span className={styles.mockZoneBadge}>Zone 1</span>
            <strong>{zh ? "原卡资产核算区" : "Old Card Assets"}</strong>
          </div>
          <div className={styles.mockZoneContent}>
            <div className={styles.mockRow}><span>{zh ? "原卡种" : "Card"}</span><span>{zh ? "单年卡 (5岁档)" : "1-Year (Age 5)"}</span></div>
            <div className={styles.mockRow}><span>{zh ? "剩余项目" : "Remaining"}</span><span>{zh ? "涂氟 × 2 (折¥300)" : "Fluoride x2 (¥300)"}</span></div>
            <div className={styles.mockRow}><span>{zh ? "关联券" : "Coupons"}</span><span>{zh ? "100元券核销" : "¥100 Coupon Used"}</span></div>
            <div className={styles.mockDivider} />
            <div className={styles.mockTotal}><span>{zh ? "旧卡净残值" : "Net Residual"}</span><strong>¥ 450</strong></div>
          </div>
          <p className={styles.mockNote}>{zh ? "合并展示卡内项目与独立券包，解决算不清" : "Consolidates card items and coupon vouchers"}</p>
        </div>

        <div className={styles.mockZone}>
          <div className={styles.mockZoneHeader}>
            <span className={styles.mockZoneBadge}>Zone 2</span>
            <strong>{zh ? "目标卡权益区" : "Target Card Benefits"}</strong>
          </div>
          <div className={styles.mockZoneContent}>
            <div className={styles.mockRow}><span>{zh ? "目标卡种" : "Target"}</span><span>{zh ? "5年长期卡 (6岁档)" : "5-Year Card (Age 6)"}</span></div>
            <div className={styles.mockRow}><span>{zh ? "年龄顺延" : "Validity"}</span><span>{zh ? "自原卡到期日顺延5年" : "+5 Years from expiry"}</span></div>
            <div className={styles.mockRow}><span>{zh ? "新赠权益" : "Benefits"}</span><span>{zh ? "预防包+洁牙+8折就诊" : "Prophylaxis + Discounts"}</span></div>
            <div className={styles.mockDivider} />
            <div className={styles.mockTotal}><span>{zh ? "新卡标价" : "Target Price"}</span><strong>¥ 3,800</strong></div>
          </div>
          <p className={styles.mockNote}>{zh ? "权益与顺延规则直观罗列，方便当场向家长解释" : "Clearly displays extension rules for easy parent consultation"}</p>
        </div>

        <div className={styles.mockZoneActive}>
          <div className={styles.mockZoneHeader}>
            <span className={styles.mockZoneBadgeActive}>Zone 3</span>
            <strong>{zh ? "差价计算与核销区" : "Calculated Balance"}</strong>
          </div>
          <div className={styles.mockZoneContent}>
            <div className={styles.mockRow}><span>{zh ? "新卡标价" : "Target Price"}</span><span>¥ 3,800</span></div>
            <div className={styles.mockRow}><span>{zh ? "旧卡折抵" : "Card Residual"}</span><span className={styles.textGreen}>- ¥ 450</span></div>
            <div className={styles.mockRow}><span>{zh ? "优惠额度" : "Quota Applied"}</span><span className={styles.textGreen}>- ¥ 150</span></div>
            <div className={styles.mockDivider} />
            <div className={styles.mockTotalHighlight}><span>{zh ? "实付补差金额" : "Final Payable"}</span><strong>¥ 3,200</strong></div>
          </div>
          <p className={styles.mockNote}>{zh ? "推算因果一目了然，免除前台一切手工心算" : "All calculations visible; zero mental arithmetic required"}</p>
        </div>
      </div>

      <div className={styles.interactionTactics}>
        <div className={styles.tacticItem}>
          <strong>{zh ? "交互策略 ①：核对机制前移 (Submit-Prevention)" : "Tactic 1: Pre-Submit Realtime Validation"}</strong>
          <p>{zh ? "金额试算、额度扣减与卡状态校验在输入时即时联动，警示前置，杜绝前台录完全部信息点击提交后才报错。" : "All arithmetic and quota checks evaluate in real-time, preventing post-submit error screens."}</p>
        </div>
        <div className={styles.tacticItem}>
          <strong>{zh ? "交互策略 ②：异常渐进式暴露 (Progressive Disclosure)" : "Tactic 2: Progressive Exception Disclosure"}</strong>
          <p>{zh ? "常规升级保持极简三区主干；仅当检测到多张收费单或额度超限时，就地展开诊断卡片引导前台快速处置。" : "Keeps standard flows ultra-compact; unfolds diagnostic prompts inline only when edge cases occur."}</p>
        </div>
      </div>

      <figcaption>
        {zh
          ? "收银台同屏信息架构：告别在领健 4 个独立模块间反复跳转；信息按因果聚合，前台扫一眼即可对照屏幕向家长解释。"
          : "Three-zone unified workspace: replaces 4 disconnected modules with a single causal view for effortless front-desk operation."}
      </figcaption>
    </figure>
  );
}
