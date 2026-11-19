import React from "react";
import styles from "./Narrative.module.css";

// Page-local composition: a complete interface and the decision it helps explain.
function EvidenceRow({ evidence, slot, points, recovery = false }) {
  return (
    <div
      className={`${styles.evidenceSpread} ${styles.evidenceRow} ${recovery ? styles.recoveryRow : ""}`}
    >
      {evidence(slot, { explained: true })}
      <ol className={styles.quotaSteps} aria-label="设计解析" role="list">
        {points.map(([title, text]) => (
          <li key={title}>
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Context() {
  return (
    <div className={`${styles.story} ${styles.context}`}>
      <p>
        在连锁儿童齿科，会员卡包含一定年限内的保健服务和看牙折扣。家长希望把一年或两年卡补差价换成五年卡时，最关心的是“新卡多了什么、还要付多少钱”。前台却要先把分散的会员记录对应起来，才能回答这两个问题。
      </p>
      <p>
        原系统中的会员卡、服务项目券和收费账单分属三个独立模块。短期卡的部分服务记在项目券中，升级时要同步停用；补差又以原卡实付金额为依据，不能只看卡面价格。项目券记录可用服务，优惠券用于购卡减价，两者不能混为一谈。
      </p>
      <figure
        className={`${styles.evidenceSpread} ${styles.architecture}`}
        aria-label="会员办理改造前后架构示意"
      >
        <div className={styles.architecturePanels}>
          <section
            className={styles.architectureBefore}
            aria-labelledby="before-architecture-title"
          >
            <h3 id="before-architecture-title">改造前：原系统数据分散</h3>
            <ul className={styles.dataSources} aria-label="原系统的独立模块">
              <li>当前会员卡</li>
              <li>服务项目券</li>
              <li>收费账单</li>
            </ul>
            <div className={styles.manualBridge}>
              <strong>前台人脑串联</strong>
              <p>
                翻查历史单据、手算补差，再依次退旧开新。一边接待家长一边切换页面，容易算错钱或漏改权益。
              </p>
            </div>
          </section>
          <section
            className={styles.architectureAfter}
            aria-labelledby="after-architecture-title"
          >
            <h3 id="after-architecture-title">改造后：新系统聚合工作流</h3>
            <div className={styles.unifiedEntry}>
              <strong>新系统统一入口</strong>
              <span>关联会员卡、项目券与收费账单</span>
            </div>
            <ol className={styles.systemFlow} aria-label="聚合工作流">
              <li>核对现状与目标卡</li>
              <li>计算补差、校验规则</li>
              <li>通过接口调用原系统</li>
            </ol>
            <p className={styles.systemResult}>
              原系统执行实际收退费与会员变更
            </p>
          </section>
        </div>
        <figcaption>
          业务分工示意：新系统组织办理与判断，原系统保留底层执行能力；不表示具体接口调用顺序。
        </figcaption>
      </figure>
      <h3 id="architecture-choice-title">为什么不推翻重写底层收费系统？</h3>
      <div className={`${styles.evidenceSpread} ${styles.architecture}`}>
        <div
          className={styles.architecturePanels}
          aria-labelledby="architecture-choice-title"
        >
          <section className={styles.architectureBefore}>
            <h4>曾考虑：整体重做收费系统</h4>
            <p>
              原系统还承载日常挂号、诊疗与正畸等复杂业务，整体重做会扩大开发范围与周期，也增加规则变更成本。
            </p>
          </section>
          <section className={styles.architectureAfter}>
            <h4>最终选择：增量封装会员流程</h4>
            <p>
              在新系统重构会员办理规则与交互，通过原系统接口完成实际收退费与卡券变更，缩小自建范围。
            </p>
          </section>
        </div>
      </div>
      <p>
        这一取舍保留两项约束：兼容历史数据，以及在跨系统处理中断后保留人工接手路径。下面的设计围绕这两项约束展开。
      </p>
    </div>
  );
}

function Handling({ evidence }) {
  return (
    <div className={`${styles.story} ${styles.handling}`}>
      <p className={styles.chapterLead}>
        前台需要的判断依据分散在不同页面。我按前台与家长的对话节奏，把它们重组为“确认现状
        → 对比选卡 → 核对补差”的单一决策流，让员工一边看屏核对，一边向家长解释。
      </p>
      <p className={styles.evidenceNote}>
        以下均为真实界面设计稿，展示数据为虚构示例。
      </p>
      <h3>先确认现状，让后续操作有同一份上下文</h3>
      <EvidenceRow
        evidence={evidence}
        slot="workspace"
        points={[
          [
            "现状一眼看清",
            "集中呈现患者身份、在用卡有效期及待开通卡状态，先确认这次为谁办理。",
          ],
          [
            "权益颗粒度透明",
            "直接列出剩余服务项目与次数，无需再切到项目券模块查找。",
          ],
          [
            "业务入口收口",
            "从患者现状发起升级、续卡等操作，让后续选卡带着当前数据继续。",
          ],
        ]}
      />
      <h3>再比较目标卡，把权益与本次报价放在一起</h3>
      <EvidenceRow
        evidence={evidence}
        slot="upgrade"
        points={[
          [
            "目标权益直观对比",
            "选定目标卡后，同步展示新权益与折扣，支持前台向家长解释变化。",
          ],
          [
            "自动溯源与补差",
            "原账单明确时，系统读取原卡实付金额计算补差；不把已用服务折算成旧卡残值。",
          ],
          [
            "全要素同屏确认",
            "优惠券、手动优惠与最终应付金额联动，支持现场核对和报价。",
          ],
        ]}
      />
    </div>
  );
}

function Resilience({ evidence }) {
  return (
    <div className={styles.story}>
      <p className={styles.chapterLead}>
        保留原系统接口，也意味着要接受历史数据不规范和执行中断的约束。我将人工介入安排在两个明确位置：办理前确认有歧义的依据，执行后看清中断状态。系统不替员工猜账单，也不让员工猜结果。
      </p>
      <section id="decisions" aria-labelledby="bill-choice-title" tabIndex={-1}>
        <h3 id="bill-choice-title">
          前置人工确认：遇到多笔相似历史账单，由前台判断
        </h3>
        <p>
          部分早期会员卡直接在原系统开通，回查时可能出现多笔同金额账单，也可能找不到对应收费。选错原账单，后续退费与补差都会出错，因此必须先判断计算依据是否确定。
        </p>
        <dl className={styles.decisionList} aria-label="按原账单匹配结果处理">
          <div>
            <dt>能确定唯一原账单</dt>
            <dd>读取原卡实付金额，自动算差价。</dd>
          </div>
          <div>
            <dt>查到好几笔候选</dt>
            <dd>暂停办理，展示账单明细，由前台确认后继续。</dd>
          </div>
          <div>
            <dt>找不到原账单</dt>
            <dd>明确阻断，提示前台回原系统查账并办理。</dd>
          </div>
        </dl>
        <EvidenceRow
          evidence={evidence}
          slot="orders"
          points={[
            [
              "有歧义就暂停",
              "不因金额相同就自动认定原账单，避免把不确定依据带入退费。",
            ],
            [
              "提供可识别的明细",
              "集中展示收费时间、门店、实付金额、就诊信息与备注，帮助现场人员辨认。",
            ],
            [
              "确认后才继续",
              "把最终确认权交给前台，再以选定账单作为后续退费和补差依据。",
            ],
          ]}
        />
      </section>
      <section aria-labelledby="member-recovery-title">
        <h3 id="member-recovery-title">
          后置断点反馈：接口中断后，从已完成的结果接手
        </h3>
        <p>
          退费与改卡需通过原系统接口分步执行。处理中断时，前面的退费可能已经完成，后续业务却尚未结束。系统没有将整笔业务自动恢复到操作前的机制；只提示“操作失败”，前台就无法判断是否已经退钱，也不敢从头重试。
        </p>
        <EvidenceRow
          evidence={evidence}
          slot="failure"
          recovery
          points={[
            [
              "已完成的结果保留",
              "示例中原账单已找到、退费已完成。已完成操作保留，并用绿色及文字状态说明，无需重复。",
            ],
            [
              "中断位置明确可见",
              "红色与状态文字共同指出尚未完成的事项，区分部分完成与整笔失败。",
            ],
            [
              "给出人工接手路径",
              "明确提示回原系统继续处理，让前台知道从哪里把这笔业务办完。",
            ],
          ]}
        />
        <div className={`${styles.evidenceSpread} ${styles.successComparison}`}>
          {evidence("success", { explained: true })}
          <div>
            <h4>同一份清单，也说明成功完成了什么</h4>
            <p>
              全部完成时逐项列出收费与会员变更；发生中断时沿用相同表达，让员工比较的是处理状态，而非重新理解一套反馈。
            </p>
            <p>
              两张界面支持反馈机制说明，不作为实际故障日志或接口执行顺序的证明。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Governance({ evidence }) {
  return (
    <div className={styles.story}>
      <p className={styles.chapterLead}>
        现场需要及时报价，逐笔审批却未必来得及。过去前台有时先电话确认、改价收款，再补提审批，授权与收费分开留在两处。我的设计重点是先明确可自主让价的范围，再让校验直接约束当前交易。
      </p>
      <h3>业务规则解耦：区分市场活动券与现场手动让价</h3>
      <div className={`${styles.evidenceSpread} ${styles.architecture}`}>
        <div
          className={styles.architecturePanels}
          aria-label="优惠券与手动优惠的规则对比"
        >
          <section className={styles.architectureBefore}>
            <h4>活动优惠券 · 公司统一安排</h4>
            <p>
              通用市场活动收口为优惠券，可限定门店、日期或卡种，不占员工个人额度。
            </p>
          </section>
          <section className={styles.architectureAfter}>
            <h4>手动优惠 · 员工现场决定</h4>
            <p>
              前台与家长沟通后额外给予的让价，受个人月度额度管控，超额不能提交。
            </p>
          </section>
        </div>
      </div>
      <h3>授权机制重构：用个人月度额度替代逐笔事后审批</h3>
      <p>
        与财务共同确认规则后，由店长录入员工当月的会员卡销售目标，系统据此生成个人可用额度。前台在额度内可当场决定额外优惠，无需逐笔审批；额度用完后，当月不能继续手动让价，也没有追加审批的办理路径。授权提前确定，报价才有明确边界。
      </p>
      <h3>交互阻断落地：报价当下实时校验</h3>
      <p>将规则放在确认费用这一步，让前台在向家长确定报价前就知道能否提交。</p>
      <div className={`${styles.evidenceSpread} ${styles.quotaEvidence}`}>
        {evidence("quota", { explained: true })}
        <ol className={styles.quotaSteps} aria-label="额度校验步骤" role="list">
          <li>
            <div>
              <strong>输入金额</strong>
              <span>直接填写想收取的最终金额，无需另用计算器倒算优惠。</span>
            </div>
          </li>
          <li>
            <div>
              <strong>校验额度</strong>
              <span>系统计算额外优惠，并即时对比个人剩余额度。</span>
            </div>
          </li>
          <li>
            <div>
              <strong>确认费用</strong>
              <span>超额时说明原因并禁用确认，调回允许范围后才能继续。</span>
            </div>
          </li>
        </ol>
      </div>
      <h3>财务追查：账单级优惠记录与会员变更日志</h3>
      <p>
        每笔手动优惠对应具体收费账单，财务可按员工和门店查看月度使用情况；会员操作日志则记录升级、冻结及有效期变更。前者回答“哪笔收费用了多少优惠”，后者回答“会员卡发生过什么变化”，共同支持后续核对。
      </p>
      <div className={`${styles.evidenceSpread} ${styles.auditEvidence}`}>
        {evidence("audit")}
      </div>
      <p className={styles.afterEvidence}>
        这张操作日志只展示会员变更，优惠使用看板尚缺对应界面证据。额度约束也仅覆盖从新入口发起的业务；绕过新入口直接在原系统改价，仍需财务结合日常核查管控。
      </p>
    </div>
  );
}

function Impact() {
  return (
    <div className={styles.story}>
      <h3>门店推广与一线采纳情况</h3>
      <dl className={styles.metricFlow} aria-label="落地范围">
        <div>
          <dt>首批试点</dt>
          <dd className={styles.metricValue}>
            <strong>6</strong> 家门店
          </dd>
        </div>
        <div>
          <dt>后续推广</dt>
          <dd className={styles.metricValue}>
            <strong>20+</strong> 门店
          </dd>
        </div>
      </dl>
      <p>
        新入口通过介绍与试用逐步推广，员工可以自行选择办理方式。首批试点多数反馈集中核对更方便，一些员工逐渐形成使用习惯；也有部分员工因操作习惯觉得流程繁琐、使用较少。这些是定性反馈，推广范围不代表全员采纳。
      </p>
      <h3>效率与治理能力验证</h3>
      <dl className={styles.metricFlow} aria-label="典型升级办理耗时">
        <div>
          <dt>改造前</dt>
          <dd className={styles.metricValue}>
            约 <strong>4–5</strong> 分钟
          </dd>
          <dd>前期调研中熟练员工的办理用时</dd>
        </div>
        <div>
          <dt>上线后</dt>
          <dd className={styles.metricValue}>
            约 <strong>1</strong> 分钟
          </dd>
          <dd>现场观察的典型办理用时</dd>
        </div>
      </dl>
      <p>
        本阶段已实现会员办理流程闭环，以及新入口中手动优惠的额度校验、超额拦截与账单级留痕。这些是已落地的能力，不等同于违规减少率或审批耗时的改善统计。
      </p>
      <p>
        原系统缺少操作埋点基线，当前耗时变化来自一线调研与现场观察，前后未做统一计时，不能外推为所有交易的平均提效。
      </p>
      <h3>当前保留的系统边界</h3>
      <p>
        日常挂号与其他诊疗收费仍在原系统办理。找不到原账单的历史卡、跨系统接口中断后的剩余操作，也需回原系统核对或接手。绕开新入口的私自改价，仍需财务日常核查。
      </p>
      <h3>后续度量与演进方向</h3>
      <p>
        下一步可在关键节点增加埋点，统计办理耗时、接口中断率与异常分布；同时探索原系统改价监控，补齐绕过新入口的监管缺口。以上是基于当前边界提出的后续建议，尚未实施，不作为已确定的二期计划或项目成果。
      </p>
    </div>
  );
}

export function Narrative({ kind, evidence }) {
  if (kind === "overview") return <Context />;
  if (kind === "solution") return <Handling evidence={evidence} />;
  if (kind === "resilience") return <Resilience evidence={evidence} />;
  if (kind === "governance") return <Governance evidence={evidence} />;
  return <Impact />;
}
