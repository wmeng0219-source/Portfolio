# 咬合筛查与正畸协作前期流程

## 01｜项目概览

正畸是公司的重要业务，但原有系统对矫正前患者筛选与跟进的支持较为有限。已有一批意愿明确的患者完成转化后，业务希望把矫正前筛查从依赖个人判断变成可持续的常规动作。已有的快筛和面型发育评估（下称面评）功能较为零散，也未充分贴合儿牙接诊与正畸协作的实际场景。

项目从矫正前的患者筛查入手，建设咬合筛查功能（原称正畸筛查），将患者推荐、资料采集、儿牙初筛、正畸专业确认与后续跟进连接起来，让门店、患者和家长了解评估结论与后续安排。

**统一筛查与协作规则 · 打通转化漏斗 · 2026 年 2 月全部门店上线**

### 我的职责与协作

我负责门诊调研、业务流程与协作规则梳理、PRD（产品需求文档）、交互与界面设计，并拆解任务、跟进开发排期，协调研发、测试、正畸总监专业验收和上线。

医疗专业结论由正畸医生负责，患者沟通与最终转化由门店和业务团队共同推进。

### 项目周期

2025 年 4 月启动开发，5—8 月单店试点，8—12 月持续调整；2026 年 1 月扩大到 3—4 家门店验证，2 月在全部门店上线。

## 02｜问题分析

流程难以持续执行，过程难以追踪。

此前，正畸医生用快筛做初步判断，结果回写到预约备注。面评会通常提前一周讨论下周患者：儿牙医生补充口腔情况、配合度和家长诉求，正畸医生说明判断，正畸顾问记录，再由儿牙医生在接诊时向家长传递。

存在明显咬合问题，且家长有进一步了解和干预意愿的患者，再建议转诊至正畸医生评估。

### 任务要求与执行角色不匹配

原有面评表由正畸方案清单简化而来，用于在快筛基础上补全面型、咬合等临床信息，进一步评估是否需要矫正并留下记录。

面评表与快筛存在部分判断重叠，又包含儿牙医生难以独立完成的专业内容。据现场反馈，实际接诊中几乎无人填写，只有少部分医生提前或事后补充；系统预填的历史信息也缺少现场复核与更新。

### 过程难以追踪，管理反馈滞后

各门店自行组织面评会，组织与协作方式不一，管理者往往要到现场确认。快筛虽已有结果和看板，后续沟通与跟进仍缺少过程监管，主要通过资料采集、方案沟通等偏后置的收费记录判断进展。

少数临时预约或当天来诊患者可能没有被提前纳入筛查，是否进入评估较依赖儿牙医生的主动识别与转诊。

## 03｜我的判断

### 识别功能重叠，整合筛查入口

业务提出新筛查需求后，我发现它与原有快筛都承担矫正前的患者筛选与判断，继续保留两个入口存在定位重叠。因此，我提出取消快筛，与业务讨论后，共同约定以所有患者为覆盖范围，待大部分患者完成一次筛查评估后，再退出旧功能。目前快筛已取消，统一使用新筛查。

### 按职责与专业权限拆分任务，让协作能够执行

我们调研医生后发现，原面评表混合了多个角色的任务，部分内容超出儿牙医生可独立判断的范围。我提出按角色和工作场景拆分，让各角色在同一份记录上接续完成，专业结论由正畸医生填写。

儿牙医生负责初步筛查填写及家长沟通；口扫模型用于向家长直观解释，系统对接用于减少手动下载再上传。单店试点后，又根据现场填写负担精简了内容。

### 区分推荐与执行任务，让工作安排更清晰

为减轻初期筛查负担，业务希望每天向每位医生推荐固定数量的患者，并在删除推荐后自动补齐。我认为，这需要持续计算和补充候选患者，也会让医生面对不断变化的名单，难以理解当天实际需要处理的工作。

我建议按优先级分批推荐，并进一步区分系统推荐池与已预约患者。系统在高优先级患者原有预约中自动添加筛查项目，作为需要执行和跟进的任务，不新增一次就诊；医生认为数量不足时，可以从推荐池主动补充。这样既保留了对工作量的安排，也让推荐候选与实际执行范围有清晰区别。

## 04｜整体方案

整体方案分三层：统一推荐规则、角色接续记录、报告承接沟通。

### 建立统一筛查机制，持续发现评估需求

统一推荐规则为各门店持续识别评估需求、安排筛查提供共同依据。系统结合牙齿发育阶段、家长诉求、既往结论和跟进时间识别评估时机，按优先级分批安排，目标是降低对个人主动性与门店习惯的依赖。

### 通过角色协作，形成专业评估依据

筛查随患者原有就诊开展，护士负责问诊与资料采集，儿牙医生完成初步筛查填写及家长沟通，正畸医生负责专业判断与结论填写。各角色接续完善同一份记录。

### 让专业沟通贯穿诊间与离店后

儿牙医生在现场结合影像和口扫模型，向家长讲解咬合情况与评估意义，并了解诉求和意愿。正畸医生确认结论后生成报告，由正畸顾问发送给家长。报告承接现场讲解，提炼专业结论与后续建议，供离店回顾和向未到场的家人转述。

## 05｜落地与业务结果

### 建立转化漏斗，让进展可追踪

关联筛查、专业结论与资料采集、方案沟通、成交等业务节点，使患者所处阶段可追踪；推荐条件、角色职责和后续行动也写进同一套规则，为门店跟进、工作交接和管理提供依据。

### 上线范围与实际运行

按上述试点路径，方案于 2026 年 2 月在全部门店上线。上线以来的内部累计统计记录了 **18,460 条**提交结论。

### 需矫成交率的同期变化

全部门店的需矫成交率（判定需矫后产生矫正收费的患者占比）从 2025 年 2—4 月的约 **30%—40%**，变为 2026 年 2—4 月的约 **50%—60%**（内部业务报表）。

## 06｜反思

### 信息要求要匹配现场执行能力

分工合理，不等于现场执行得完。前期调研后，表单已按角色职责拆分；单店试点后，又根据现场填写负担精简内容。但合理分工之外，还要看接诊时间能否支撑这些任务。

如果重新推进，我会更早确认现场真正需要的最小信息集，同时检查后续角色能否承接，平衡评估完整性与执行成本。

### 入口整合要以实际使用为前提

筛查名单最初嵌入诊前预习，但当时预习执行尚不完善，主要由儿牙医生使用。业务建议独立列表后，我权衡了诊前在多个功能间切换的成本，以及正畸与儿牙流程的差异，并通过医生调研确认方案可接受，最终选择拆分。

复用已有入口前，需要先确认它的实际使用情况，以及能否承接新增角色和任务。

### 流程变更需要与业务共同推进

初期，我倾向于将筛查使用不足归因于功能不够适合现场。后来意识到，筛查也改变了既有工作流程，适应新方式需要业务管理者共同推动。

今后推进类似项目，我会更早与业务管理者明确执行要求、协调资源，将系统优化与业务推进结合起来。

<details>
<summary>英文版</summary>

## 01｜Project Overview

**Project title:** Occlusal Screening & Pre-treatment Orthodontic Collaboration

Orthodontics was an important business for the company, but the existing system offered limited support for patient selection and follow-up before treatment. As a group of patients with a clear intention to proceed had already converted, the business needed more comprehensive screening, assessment, and ongoing follow-up. Existing fast-screening and facial-development assessment features were fragmented and did not fully fit pediatric consultations or collaboration with orthodontists.

Starting with patient screening before orthodontic treatment, the project developed an occlusal screening feature, originally called orthodontic screening. It connected patient recommendations, record collection, initial screening by pediatric dentists, specialist confirmation by orthodontists, and follow-up, supporting clinic collaboration and helping patients and families understand assessment conclusions and next steps.

**Shared screening and collaboration rules · A conversion funnel · Rolled out across all clinics in February 2026**

I was responsible for clinic research, workflow and rule definition, PRDs, interaction and interface design, task breakdown, development scheduling follow-up, and coordination with engineering, QA, and the orthodontic director for specialist acceptance and rollout.

Orthodontists were responsible for clinical conclusions, while clinics and business teams jointly handled patient communication and final conversion.

Development started in April 2025, followed by a single-clinic pilot from May to August and further adjustments through December. Validation expanded to 3–4 clinics in January 2026, with rollout across clinics in February.

## 02｜Problem Analysis

**Workflows were hard to sustain and progress hard to track**

Orthodontists, responsible for specialist assessments, used H5 fast screening to review patient information and historical images, assess occlusion, and sync results to appointment notes. Review meetings were typically held one week ahead for the following week's appointments. Pediatric dentists, responsible for routine visits, contributed oral-health information, cooperation levels, and family concerns; orthodontists explained their assessments. Orthodontic consultants recorded the discussion for pediatric dentists to reference and convey to families during the visit.

Patients with apparent occlusal issues whose families wanted further information or intervention could then be referred to an orthodontist for assessment.

### Task requirements and role responsibilities were misaligned

The facial-development assessment form was adapted from the orthodontic treatment-plan form to supplement fast screening with more information, assess the need for treatment, and record the assessment.

It overlapped with fast screening in some judgments and required specialist input that pediatric dentists struggled to complete independently. Almost no one filled it in during consultations; only a small number completed it beforehand or afterward. Entries based on historical information also lacked review and updates during the visit.

### Progress was hard to track and management information arrived late

Clinics organized review meetings differently, and managers often needed to attend in person to verify execution. Although fast screening already had results and dashboards, subsequent communication and follow-up lacked effective process monitoring. Managers mainly inferred progress from later charges for record collection and treatment-plan communication.

A small number of short-notice and same-day patients could fall outside advance screening. Their entry into an assessment depended heavily on pediatric dentists proactively identifying issues and making referrals.

## 03｜Product Thinking

### Identify overlapping functions and consolidate screening entry points

When the business proposed a new screening workflow, I identified an overlap with fast screening: both selected and assessed patients before orthodontic treatment. I proposed removing fast screening and discussed the transition with the business. We agreed that the new workflow should first cover most patients with an assessment before retiring the old feature. Fast screening has now been removed, leaving the new screening workflow as the single entry point.

### Split tasks by responsibility and professional permissions to make collaboration workable

Research with doctors showed that the existing form mixed tasks across several roles, with some content beyond pediatric dentists' professional capabilities. I proposed splitting tasks by role and working context so that each role could build on the same record, with specialist conclusions completed by orthodontists.

Pediatric dentists complete the initial orthodontic screening content and communicate with families. Intraoral scan models support visual explanations, while system integration reduces manual downloading and uploading. After the single-clinic pilot, the content was further simplified in response to the input burden.

### Separate recommendations from assigned work to clarify workload

To reduce the initial screening burden, the business proposed a fixed number of recommendations per doctor per day, automatically replenishing the list when recommendations were removed. I identified the need for ongoing calculations and replacement candidates, as well as the confusion a continually changing list could cause about the work expected that day.

I recommended prioritizing patients and introducing recommendations in batches, then distinguishing the recommendation pool from booked patients. The system automatically adds a screening item to high-priority patients' existing appointments as a task to be carried out and managed. Doctors can add patients from the recommendation pool when they have capacity for more.

This preserves workload planning while making candidate recommendations distinct from the actual scope of work.

## 04｜Solution

**Overall solution: connect patient recommendations, specialist assessment, and family communication**

### Establish shared screening rules and continually identify assessment needs

Shared recommendation rules give clinics a common basis for identifying assessment needs and arranging screening. The system uses dental development stages, previous conclusions, and follow-up dates to identify assessment timing and arrange screening in prioritized batches, giving patients opportunities for professional screening and reducing reliance on individual initiative and clinic-specific practices.

### Build an assessment basis through role-based collaboration

Screening takes place during the patient's existing visit. Nurses collect consultation information and records, pediatric dentists complete initial screening content and communicate with families, and orthodontists make specialist judgments and complete conclusions. Each role builds on the same record.

### Continue professional communication during and after the visit

Pediatric dentists use images and intraoral scan models to explain occlusal conditions and the purpose of assessment, while learning about family concerns and intentions. The report distills the consultation, specialist conclusions, and next steps. It is sent to families for review after the visit, explanation to family members who were not present, and a shared basis for subsequent communication.

## 05｜Rollout and Business Results

**Rollout and business results**

### Establish a conversion funnel with traceable progress

Screening, specialist conclusions, and subsequent payment stages are linked, making patient progress traceable and providing a basis for clinic follow-up and management. Recommendation criteria, role responsibilities, and subsequent actions form a shared framework, providing clinics with a common basis for screening and work handoffs.

### Rollout scope and actual use

Following the pilot path above, the solution was rolled out across all clinics in February 2026. Internal cumulative statistics since launch contain **18,460 submitted screening conclusions**.

### Same-season changes in conversion among patients assessed as needing treatment

Across clinics, the proportion of patients assessed as needing orthodontic treatment who subsequently incurred an orthodontic charge changed from approximately **30–40%** in February–April 2025 to **50–60%** in February–April 2026.

## 06｜Reflection

### Match information requirements to what teams can complete during consultations

Following initial research, the form was split by role responsibilities. After the single-clinic pilot, its content was further simplified in response to the input burden during consultations. Clear responsibilities also need to be supported by enough time to complete the work.

If starting again, I would test the minimum necessary information requirements earlier and check whether subsequent roles can take over, balancing assessment completeness with the effort required to carry it out.

### Integrate entry points based on actual use

The screening list was initially embedded in pre-visit preparation, but that workflow was not yet consistently carried out and was mainly used by pediatric dentists. When the business proposed a separate list, I weighed the cost of switching between features against differences in orthodontic workflows. Doctor research indicated that a separate list was acceptable, and we chose to separate it.

Before reusing an existing entry point, I need to understand how it is actually used and whether it can support additional roles and tasks.

### Advance workflow changes together with the business

Initially, I tended to attribute limited use to features that did not fit consultations well enough. I later recognized that screening also changed established workflows, and adapting to a new way of working required support from business managers.

For similar projects, I would involve business managers earlier to clarify execution requirements and coordinate resources, combining system improvements with efforts to put the workflow into practice.

</details>

<details>
<summary>维护资料（不上页面）</summary>

### 当前状态

- 中文六部分及精简已确认；英文未单独审核。
- 2026-10-14 用户选择参考布局/图形＋浅色正文，并直接修改项目页面；六章稿已同步实际运行页，具体视觉待查看。英文与真实素材仍保留审核/缺口，实施记录见设计说明和当前计划。2026-10-13 的阅读内容与维护资料分离继续保留。

### 配图与制作

章节图文关系、真实素材位置和绘制边界统一见[设计说明](design.md)。六部分的对应配图安排见设计说明 §2，不在正文显示制作提示或审核解释。

### 事实与证据

- [项目事实底稿](../../project/正畸筛查与状态管理.md)：业务背景、旧流程、个人职责、方案取舍、原始来源、完整累计漏斗及指标口径。
- [履历时间线](../../profile/career-timeline.md)：正式岗位与履历依据。
- [证据清单](../../project/content-readiness.md)：统计、真实素材、试点采纳与权限版本的现存缺口。
- [当前计划](../../superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md)：确认、修改及后续设计/实施任务，不在本稿重复历史日志。

同期需矫成交率分子为判定需矫后产生矫正收费的患者数，分母为需矫患者数，用户已确认。累计18,460为提交结论记录量；精确截止日、去重方式、同期筛选条件及退费处理仍待核查。指标不能跨周期混用，业务变化不能全部归因于本项目；核查细节见上述事实底稿和证据清单。

</details>
