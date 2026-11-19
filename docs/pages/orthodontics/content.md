# 咬合筛查与正畸协作前期流程

> 页面内容稿。中文为当前上线内容；英文与维护资料在折叠区，不参与页面渲染。事实口径与截图脱敏状态见文末维护资料。

## 项目概览

**一句话定位：** 将依赖个人判断和分散沟通的矫正前筛查，重构为覆盖患者推荐、资料采集、分角色评估与后续跟进的协作流程。

**事实：** 2026.02 全部门店上线 · 累计 18,460 条提交筛查结论记录

**我的职责：** 门店调研 · 业务规则与流程 · PRD · 交互与界面设计 · 开发协调与上线

医疗专业结论由正畸医生负责；患者沟通与最终转化由门店和业务团队共同推进。

**项目周期：** 2025.04 启动开发 → 2025.05–08 单店试点 → 2025.08–12 持续迭代 → 2026.01 扩至 3–4 家门店验证 → 2026.02 全部门店上线。

## 01｜业务挑战

过去，医生通过快筛进行初步判断，再在面评会中沟通，儿牙医生于接诊时向家长传达。表单、会议和预约备注分散存在，流程依赖个人推进。

**旧流程：** 快筛初判 → 面评会沟通 → 儿牙传达 → 必要时转诊。简化示意，实际执行因门店而异；不表示每位患者都按同一顺序经过这些环节。

### 功能重叠
快筛与面评表承担部分相同的筛查判断，增加了重复填写和理解成本。

### 角色不匹配
面评表包含儿牙医生难以独立完成的专业项目，现场很少完整填写。

### 进展难追踪
不同门店组织方式不一，后续沟通与转诊缺少连贯状态，管理者常依赖事后记录判断进展。

## 02｜关键决策 01：把推荐候选和需要执行的筛查任务分开

业务最初希望每天向医生推荐固定数量的患者，删除后自动补齐。这个方案看似能安排工作量，但会把“可选择的候选”和“当天要完成的任务”混在一起。

**业务原诉求：** 每天向医生推荐固定数量的患者，删除后自动补齐。

**我的判断：** 不断补充的名单会模糊“推荐患者”和“当天需要处理的工作”之间的界限，还会增加持续计算与维护成本。

**最终规则：** 按优先级分批推荐；优先级参考牙齿发育阶段、家长诉求、既往结论和跟进时间；高优先级患者在原有预约中增加筛查项目，成为明确的执行任务；医生需要补充工作量时，可主动从推荐池中选择。

**关系图：** 推荐池是候选范围，已预约筛查是执行范围；系统安排高优先级患者和医生主动补充，是进入执行任务的两种方式。推荐池不是待办清单，删除推荐不会自动补齐固定数量。

**真实界面：** 儿牙筛查列表上半部分是“已预约筛查患者”，下半部分是“系统推荐筛查患者”。已预约患者需要执行和跟进；推荐患者是可主动补充的候选。截图已对患者姓名、生日和医生姓名做脱敏处理。

**补充决策：** 我也识别到旧快筛与新流程定位重叠，提出整合入口。与业务确定过渡方式后，先覆盖大部分患者完成一次筛查，再退出旧快筛；目前快筛已取消，统一使用新筛查。

## 03｜关键决策 02：按专业边界拆分任务，让多角色能接续完成

原面评表把多个角色的任务放在一起，部分字段超出儿牙医生独立判断范围。即使设计了表单，现场也难以完成。

**旧表单为什么填不动：** 面评表由正畸方案清单简化而来，混合了护士、儿牙医生和正畸医生的任务；系统预填的历史信息也缺少现场复核。

**我的判断：** 先让每个角色完成自己能可靠承担的部分，再把信息与任务交接给下一位角色；专业结论由正畸医生填写。

**角色接续：** 护士采集问诊和影像资料；儿牙医生完成初筛、家长沟通并转交；正畸医生填写专业结论；正畸顾问向家长发送报告。角色在同一份筛查记录上接续工作。箭头表示接续与交接，不表示所有病例必须按同一顺序一次完成；门店与业务团队共同推进患者沟通与后续转化。

**护士界面：** 系统默认带入 1 年内可查询的全景片和半年内的口扫；口扫数据与设备对接，减少人工下载再上传。截图突出历史资料复用和已获取的口扫模型。

**儿牙界面：** 完成初筛后，儿牙医生确认家长矫正意愿、决策人和特殊情况，再把记录转交正畸医生下结论。转交后记录不可修改，保证结论基于已确认的信息。

**正畸界面：** 正畸医生从待下结论队列进入筛查表，在右侧面板完成结论、治疗必要性、行动目标和行动计划。截图分别展示待结论队列与结论面板。

**迭代：** 单店试点后，按接诊中的实际填写负担继续精简内容；口扫系统对接减少了重复操作。

## 04｜从医生的专业判断，到家长能理解的信息

现场沟通不仅需要记录结论，也需要让家长理解咬合情况。儿牙医生可以结合影像、口扫模型与科普说明进行解释；正畸医生确认结论后，系统生成报告，由正畸顾问发送给家长。

**口扫模型：** 模型可以旋转查看不同视角，右侧同时显示咬合分类；医生可以用它指出问题位置，再用科普说明解释术语。

**科普说明：** 例如用“地包天”解释反覆颌，并说明可能的影响；它辅助沟通，不替代正畸医生的诊断。

**家长报告：** 正畸医生确认结论后，系统生成报告，由正畸顾问发送给家长。报告承接诊间讲解，包含问题说明、相关科普与后续建议；家长可以在家回顾，也可以转给未到场的家人。报告样例已脱敏；最终诊断以正畸医生线下面诊结果为准。

**补充界面：** 口扫数据同步到设备、全景片辅助判断、影像分析完整工作台、历史影像复用。这些界面补充同一流程的其他视角，不重复正文主图；历史影像中的患者肖像已做脱敏。

## 05｜上线结果

从单店试点、持续迭代到扩大验证，方案于 2026 年 2 月在全部门店上线。筛查、专业结论与后续业务节点逐步建立关联，为工作交接和进展跟踪提供共同依据。

**时间线：** 2025.04 开始开发 → 2025.05–08 单店试点 → 2025.08–12 持续迭代 → 2026.01 扩至 3–4 家门店验证 → 2026.02 全部门店上线。

**进展可追踪：** 关联筛查、专业结论与资料采集、方案沟通、成交等业务节点，让患者所处阶段可追踪；推荐条件、角色职责和后续行动也写进同一套规则。

**指标一：** 累计提交筛查结论记录 18,460 条。记录数，不是去重患者数；精确统计截止日待核实。

**指标二：** 需矫成交率的同期变化。2025 年 2–4 月约 30%–40%，2026 年 2–4 月约 50%–60%（内部业务报表）。口径：判定需矫后产生矫正收费的患者数 / 需矫患者数。

**口径说明：** 这是同一指标在两年同期的业务报表变化，不能单独归因于本项目；也不能把累计记录与成交率串成同一漏斗。来源：内部累计统计与全部门店业务报表；精确截止日、去重方式与同期筛选条件仍待核实。

## 06｜反思

### 信息要求要匹配现场执行能力
分工合理，不等于现场执行得完。单店试点后，我们按填写负担精简了内容；如果重新推进，我会更早验证现场真正需要的最小信息集，并检查后续角色能否承接。

### 流程变更需要与业务共同推进
初期我倾向于把使用不足归因于功能不适合现场，后来意识到筛查也改变了既有工作流程。今后会更早与业务管理者明确执行要求、协调资源，把系统优化和业务推进放在一起。

<details>
<summary>补充：入口复用取舍</summary>

筛查名单最初嵌入诊前预习，但当时预习执行尚不完善，主要由儿牙医生使用。业务建议独立列表后，我权衡了在多个功能间切换的成本，以及正畸与儿牙流程的差异，并通过医生调研确认可接受，最终选择拆分。

</details>

<details>
<summary>历史英文稿（暂停，未同步本次中文重组，不上线）</summary>

The English version is paused and hidden. The previous English manuscript remains below for future retranslation; it reflects the earlier six-chapter structure and must not be treated as the approved copy for this page.

Orthodontics was an important business for the company, but the existing system offered limited support for patient selection and follow-up before treatment. Existing fast-screening and facial-development assessment features were fragmented and did not fully fit pediatric consultations or collaboration with orthodontists.

Starting with patient screening before orthodontic treatment, the project developed an occlusal screening feature, originally called orthodontic screening. It connected patient recommendations, record collection, initial screening by pediatric dentists, specialist confirmation by orthodontists, and follow-up.

I was responsible for clinic research, workflow and rule definition, PRDs, interaction and interface design, task breakdown, development scheduling follow-up, and coordination with engineering, QA, and the orthodontic director for specialist acceptance and rollout.

Orthodontists used fast screening for an initial judgement and wrote results into appointment notes. Review meetings were usually held a week ahead. Pediatric dentists contributed oral-health information, cooperation levels and family concerns; orthodontists explained their assessments; orthodontic consultants recorded the discussion for pediatric dentists to convey to families.

The facial-development assessment form overlapped with fast screening in some judgements and required specialist input that pediatric dentists struggled to complete independently. Almost no one filled it in during consultations; only a small number completed it beforehand or afterward.

Clinics organized review meetings differently, and managers often needed to attend in person to verify execution. Although fast screening already had results and dashboards, subsequent communication and follow-up lacked effective process monitoring.

When the business proposed a new screening workflow, I identified an overlap with fast screening and proposed consolidating the entry point. After agreeing a transition with the business, the new workflow first covered most patients with an assessment before the old feature was retired.

Research with doctors showed that the existing form mixed tasks across several roles. I proposed splitting tasks by role and working context so that each role could build on the same record, with specialist conclusions completed by orthodontists. After the single-clinic pilot, the content was further simplified in response to the input burden.

To reduce the initial screening burden, the business proposed a fixed number of recommendations per doctor per day, automatically replenishing the list when recommendations were removed. I recommended prioritizing patients and introducing recommendations in batches, then distinguishing the recommendation pool from booked patients. The system adds a screening item to high-priority patients' existing appointments as a task; doctors can add patients from the recommendation pool when they have capacity.

Shared recommendation rules give clinics a common basis for identifying assessment needs and arranging screening. The system uses dental development stages, family concerns, previous conclusions and follow-up dates to identify assessment timing.

Screening takes place during the patient's existing visit. Nurses collect consultation information and records, pediatric dentists complete initial screening content and communicate with families, and orthodontists make specialist judgements and complete conclusions. Each role builds on the same record.

Pediatric dentists use images and intraoral scan models to explain occlusal conditions and the purpose of assessment. After the orthodontist confirms the conclusion, the system generates a report that the orthodontic consultant sends to the family.

Screening, specialist conclusions and later business stages are linked, making patient progress traceable. Recommendation criteria, role responsibilities and subsequent actions form a shared framework.

The solution was rolled out across all clinics in February 2026. Internal cumulative statistics since launch contain 18,460 submitted screening conclusions — records, not unique patients.

The proportion of patients assessed as needing orthodontic treatment who subsequently incurred an orthodontic charge changed from approximately 30–40% in February–April 2025 to 50–60% in February–April 2026 (internal business report). This is a same-season business observation, not a causal effect of this project alone.

Reflection: clear responsibilities do not guarantee completion during a visit. If starting again, I would test the minimum necessary information earlier and check whether subsequent roles can take it over. Workflow changes also need business managers to clarify execution requirements and coordinate resources; system improvements and operational adoption must advance together.

</details>

<details>
<summary>维护资料（不上页面）</summary>

### 当前状态

- 2026-11-18 按《咬合筛查作品集页面完整修改方案》重组为封面＋六个阅读章节：业务挑战、决策 01、决策 02、诊间解释与报告、上线结果、反思。
- 中文为当前上线内容；英文入口保持停用。`content.js` 中有按新结构整理的英文翻译，但未审核、未上线；本文件下方保留的旧英文稿仅作历史参考。
- 页面实现、截图裁切与脱敏状态见[设计说明](design.md)。

### 事实与证据

- [项目事实底稿](../../project/正畸筛查与状态管理.md)：业务背景、旧流程、个人职责、方案取舍、原始来源、完整累计漏斗及指标口径。
- 18,460 为提交结论记录量，不是去重患者数；精确截止日、去重方式、同期筛选条件及退费处理仍待核查。
- 同期需矫成交率分子为判定需矫后产生矫正收费的患者数，分母为需矫患者数。它是内部报表呈现的业务变化，不能单独归因于本项目。
- 页面截图来自真实系统界面；姓名、生日、病历字段、医生姓名与患者肖像已做脱敏。截图中的展示数据不作为真实患者记录或项目指标。

### 证据与素材待补（内部）

- 上述累计记录与同期成交率的精确截止日、去重、筛选与退费口径仍需核查；累计漏斗和同期指标分开。
- 分阶段验证的样本量、逐店采纳与规范执行效果、试点阻力和并行过渡材料仍缺；不重新询问正文已确认的上线时间线。
- 完整权限、批次例外与真实状态异常样本仍可补；调研样本量、入口变更日期和效率统计未提供，不将定性判断扩大为量化成效。
- 流程／状态图、看板和报表有旧来源线索，仍需核对当前版本与脱敏；现有 12 张详情截图已经处理，不重复列为缺图。原图公开授权与最终脱敏范围仍按现有待核实项处理。

2026-11-17 UI 精选 PDF 选用的四张正畸设计稿，展示数据已确认为虚构并要求整图展示、不打码；这不覆盖网页当前使用的裁切与脱敏派生图，也不扩展到其它旧截图。

### 素材去向

- 主图：儿牙筛查列表、护士资料采集、儿牙完成筛查确认、正畸待结论队列、正畸结论面板、口扫分析、科普说明、生成报告预览、家长报告封面与内页。
- 补充：口扫同步设备、全景片、影像分析完整工作台、历史影像复用，放在“查看更多真实界面”折叠区。
- 封面：首页使用 `public/images/ortho/orthodontics-cover.jpg`；详情页不把它当临床证据。

</details>
