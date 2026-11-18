import React from "react";
import styles from "./Narrative.module.css";

function Context() {
  return (
    <div className={`${styles.story} ${styles.context}`}>
      <p>
        在连锁儿童齿科，家长常会把手里的一年或两年期短卡，补差价升级成更划算的五年长期卡。对家长来说，他们只关心“新卡多了哪些服务、还要补交多少钱”；但对柜台后身兼接待、挂号与收银的前台来说，这笔看似简单的补差价，背后却要同时摆平三处分散的记录。
      </p>
      <p>
        这是因为在原门诊系统里，会员卡、服务项目券和历史收费账单分属不同模块，彼此没有自动关联。前台得一边应付柜台前等待的家长，一边跨页面翻找旧记录、按计算器手算差价，再分别去退旧券、改账单、换新卡——不仅步骤繁琐，只要一步看走眼就会算错钱、漏改权益。
      </p>
      <h3 id="member-records-title">换一张卡，为什么前台得查三处记录？</h3>
      <figure
        className={styles.recordMap}
        aria-labelledby="member-records-title"
      >
        <figcaption className={styles.recordSource}>
          <strong>当前会员卡</strong>
          <span>先看旧卡还在不在有效期内，以及按规则允许升级成哪张新卡。</span>
        </figcaption>
        <dl className={styles.recordBranches}>
          <div>
            <dt>原卡对应的服务权益</dt>
            <dd>
              1–2 年短卡的涂氟等服务是拆开记在“卡内”和“项目券”里的（5
              年卡则全包在卡内）。升级时必须查清还剩多少次服务，并手动把旧项目券停用。
            </dd>
          </div>
          <div>
            <dt>原卡的收费账单</dt>
            <dd>
              用过的服务不折算扣钱，升级差价一律按“买旧卡时实际付了多少钱”来算。前台必须翻出当年的原始账单看清实付金额，算完差价后再分别处理新旧账单。
            </dd>
          </div>
        </dl>
      </figure>
      <p>项目券记录可用的服务，优惠券用于购卡时减价。</p>
      <h3>把分散的手工活，收拢到一次办理中</h3>
      <dl className={styles.comparison} aria-label="会员办理改造前后">
        <div>
          <dt>
            改造前<span>原系统</span>
          </dt>
          <dd>
            <ol className={styles.compareSteps} role="list">
              <li>
                <strong>查记录</strong>
                <span>前台跨多个模块翻找卡、券和历史账单。</span>
              </li>
              <li>
                <strong>算差价</strong>
                <span>靠人脑记规则，拿计算器手动算补差。</span>
              </li>
              <li>
                <strong>办理</strong>
                <span>在原系统里逐项退券、改单、换卡。</span>
              </li>
            </ol>
          </dd>
        </div>
        <div>
          <dt>
            改造后<span>新系统</span>
          </dt>
          <dd>
            <ol className={styles.compareSteps} role="list">
              <li>
                <strong>查记录</strong>
                <span>新系统在同一处直接带出所有核对信息。</span>
              </li>
              <li>
                <strong>算差价</strong>
                <span>系统按规则自动算出应付差价。</span>
              </li>
              <li>
                <strong>办理</strong>
                <span>
                  由新系统调取原系统接口，自动完成底层收费与会员变更。
                </span>
              </li>
            </ol>
          </dd>
        </div>
      </dl>
      <p>过去，前台得一边接待和收银，一边来回切换页面完成这几步。</p>
      <p>
        为什么不直接重做底层收费系统？因为原系统还挑着日常挂号、看牙诊疗等大梁，推倒重做牵涉太广。因此团队决定保留原系统底层能力，只在新系统里单独重构“会员办理流程”。
      </p>
    </div>
  );
}

function Handling({ evidence }) {
  return (
    <div className={`${styles.story} ${styles.handling}`}>
      <p className={styles.chapterLead}>
        当规则和历史账单都很明确时，新系统会自动算完并执行到底；但面对原系统里常有的“历史账单对不上”或“跨系统接口卡住”的意外，界面必须让前台看清依据、知道下一步该怎么接手。
      </p>
      <section aria-labelledby="member-check-title">
        <h3 id="member-check-title">先看清孩子现在有什么，再聊换哪张新卡</h3>
        <p>
          前台要算清升级账，得先摸清现状，再核对新购内容。我把核对过程顺着前台的说话节奏拆成了相连的两步：先在工作台看清患者身份、旧卡状态和剩余服务；点进升级窗口后，新卡权益、可用优惠和系统算好的应付差价直接同屏摆在一起，方便前台一边核对、一边指着屏幕向家长解释。
        </p>
        <div className={`${styles.evidenceSpread} ${styles.evidencePair}`}>
          {evidence("workspace")}
          {evidence("upgrade")}
        </div>
        <p className={styles.afterEvidence}>
          新系统记录会员卡、项目券和收费账单的对应关系。规则和原账单明确时，新系统算出差价，前台确认本次购买后，新系统通过原系统处理账单和会员变更。
        </p>
      </section>
      <section id="decisions" aria-labelledby="bill-choice-title" tabIndex={-1}>
        <h3 id="bill-choice-title">遇到多笔相似的历史账单，交由前台拍板确认</h3>
        <p>
          升级补差必须拿“买旧卡时的原始账单”当计算依据。但有些早期旧卡是在原系统里直接开的，新系统回头去查时，可能会抓出好几笔金额一样的账单，甚至一笔都查不到。原账单一旦选错，后面的差价和退费就会跟着全错。为了防止系统“乱猜”，我针对账单不明确的情况补齐了分流处理：
        </p>
        <dl className={styles.decisionList} aria-label="按原账单匹配结果处理">
          <div>
            <dt>能确定原账单</dt>
            <dd>新系统直接读取原卡实付金额，自动算出差价往下走。</dd>
          </div>
          <div>
            <dt>查到好几笔</dt>
            <dd>
              系统停下并弹窗列出每笔账单的收费时间、门店、实付、就诊信息和备注，由前台确认原账单后再继续。
            </dd>
          </div>
          <div>
            <dt>找不到原账单</dt>
            <dd>新系统明确阻断，提示前台回原系统查账并办理。</dd>
          </div>
        </dl>
        <div className={styles.evidenceSpread}>{evidence("orders")}</div>
      </section>
      <section aria-labelledby="member-recovery-title">
        <h3 id="member-recovery-title">中断后，前台知道从哪一步继续</h3>
        <p>
          底层的退费和改卡都要通过原系统接口一步步执行。如果中途遇到接口响应慢或操作失败，退费可能已经完成，新账单却还没建好。如果只弹一句笼统的“失败”，前台既不知道钱退了没有，也不敢贸然从头再点一次。因为底层不支持自动回滚，我让界面逐项列出处理结果：已经完成的操作会保留并标绿，前台只需按提示回原系统把标红的剩余事项补完即可。
        </p>
        <div className={`${styles.evidenceSpread} ${styles.evidencePair}`}>
          {evidence("failure")}
          {evidence("success")}
        </div>
      </section>
    </div>
  );
}

function Governance({ evidence }) {
  return (
    <div className={styles.story}>
      <p className={styles.chapterLead}>
        家长在柜台前谈价格时，前台常需要在公司活动之外再给点额外优惠。过去每笔额外优惠都要逐笔审批，但现场家长根本等不及，前台有时只能“先打电话口头确认、改价把钱收了，事后再补提审批”——结果就是批准的金额和实际收费分开记在了两处，事后很难对账。
      </p>
      <p>
        为了解决这个矛盾，我先将优惠一分为二：公司统一活动全部通过“优惠券”执行，不占个人额度；而前台与家长沟通后额外给出的让价，才计入个人月度额度来统一管控。
      </p>
      <h3>把逐笔审批改为个人月度额度</h3>
      <p>
        与财务敲定规则后，改为由店长按月录入销售目标，系统据此生成每位前台当月的可用优惠额度。前台在额度内可自行决定给多少，当场就能拍板；一旦当月额度用完，系统就会直接拦截当月的额外优惠。
      </p>
      <h3>确认报价前，就知道这笔优惠能不能给</h3>
      <p>
        我把额度检查直接放在确认费用这一步，让前台当场就能知道这笔报价能否提交：
      </p>
      <div className={`${styles.evidenceSpread} ${styles.quotaEvidence}`}>
        {evidence("quota")}
        <ol className={styles.quotaSteps} aria-label="额度校验步骤" role="list">
          <li>
            <div>
              <strong>输入金额</strong>
              <span>
                前台不用自己按计算器算减了多少钱，直接填入想收的最终金额。
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>校验额度</strong>
              <span>
                系统自动倒算出这笔优惠了多少，并立刻对比个人剩余额度。
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>确认费用</strong>
              <span>
                一旦超额，界面直接红字提示原因并置灰按钮，调回允许额度内才能确认。
              </span>
            </div>
          </li>
        </ol>
      </div>
      <h3>优惠留在账单上，方便财务查看</h3>
      <p>
        每笔额外优惠都会直接记在对应账单上，财务可以按员工和门店查看每月用了多少。不过，这套额度机制管的是从新系统入口发起的业务；如果前台绕开新入口、直接在原系统里手动改价，仍需财务在日常核查中跟进。
      </p>
    </div>
  );
}

function Impact() {
  return (
    <div className={styles.story}>
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
        新入口通过宣讲与试用逐步铺开，员工试用后可自行选择办理方式。从首批 6
        家试点到推广至 20
        多家门店，首批门店多数反馈新入口集中核对更方便，有人逐渐用顺手并养成习惯；也有少部分员工因为习惯了原系统操作，觉得新流程繁琐、用得较少（目前均为一线定性反馈，未做强制一刀切与逐店采纳率、留存数据统计）。
      </p>
      <h3>一次升级大约花多久</h3>
      <dl className={styles.metricFlow} aria-label="典型升级办理耗时">
        <div>
          <dt>改造前</dt>
          <dd className={styles.metricValue}>
            约 <strong>4–5</strong> 分钟
          </dd>
          <dd>前期调研中最熟练员工的办理用时</dd>
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
        改造前的“约 4–5
        分钟”来自调研中最熟练老员工的操作耗时，上线后典型升级办理约为“1
        分钟”（注：原流程无埋点基础，前后没有统一计时，此为典型场景现场观察对比）。
      </p>
      <h3>前台可以自主给优惠，财务能查记录</h3>
      <p>
        新系统已跑通“额度内可当场办理、超额不能确认、账单上可查到优惠记录”的完整闭环。至于等待耗时、事后补审批和违规改价具体减少了多少，目前没有量化统计。
      </p>
      <h3>哪些事还要回原系统办理</h3>
      <p>
        因为这次只改造了会员办理流程，日常挂号和其他诊疗收费仍在原系统进行；另外，当遇到极少数历史卡查不到原账单或跨系统处理中断时，前台也需按界面提示回原系统继续处理完剩余操作。
      </p>
    </div>
  );
}

export function Narrative({ kind, evidence }) {
  if (kind === "overview") return <Context />;
  if (kind === "solution") {
    return <Handling evidence={evidence} />;
  }
  if (kind === "governance") return <Governance evidence={evidence} />;
  return <Impact />;
}
