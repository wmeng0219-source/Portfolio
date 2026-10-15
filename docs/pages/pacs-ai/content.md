# PACS 页面内容审核稿

> 修订日期：2026-10-04。内容审核：当前正文与七部分结构已通过（用户确认“现在这个文档没什么大问题了”）；项目周期仍待补充，短标题保持暂用，不补编缺失信息。
> 设计审核：[design.md](design.md) 的旧深色布局已通过并实现；2026-10-09用户选择V4高保真适配（深色封面、浅色阅读），具体样稿待审、运行页面尚未迁移。正文内容与七部分不变，截图继续占位。

**阅读说明：** 第 01–07 节是页面内容，先看中文。配图备注、项目周期待确认提示和第 8 节编辑备注不上页面。事实有误直接在本稿指出，不需要再审核另一份事实文档。

## 01｜项目概览 Project Overview

> **配图备注，不上页面：** 完整读片工作台截图，包含影像、标记和填写区域。真实截图准备好前保留占位，不只展示 AI 局部。
> **周期待确认，不上页面：** 整个项目的起止时间尚未确认。AI 上线节点不等于整个项目周期，暂不填写日期。

### 中文

**标题（暂用，待确认）**

> PACS 读片与 AI 辅助

**项目介绍**

> 原系统能推荐是否拍片，却没有记录拍完后医生是否读片。项目让医生在向家长讲片时标记、填写读片内容，完整内容随检查表同步到病历；管理人员能跟进读片完成情况，督促必要的读片工作落实，以保障医疗质量；AI 则提供异常线索，帮助医生查找和标记。

**我的职责与协作**

> **呈现备注，不上页面：** 2026-10-08 确认开场按标题、简介、职责纵向左对齐；本节“项目概览”仅用于章节目录，不另显示为职责的大标题。原正文与事实不变，字号见 DESIGN.md §3.4。

基础读片由我与产品经理共同推动，与医疗主任确认医疗规则。我负责流程交互和界面设计，设计确认后与产品经理共同整理 PRD。

AI 辅助读片由我独立负责产品方案、规则、交互、UI 和 PRD，算法同事负责模型、识别能力和训练。最终影像诊断由医生负责。项目已上线并使用。

### English

**Working title**

> PACS Reading with AI Assistance

**Project introduction**

The original system could recommend imaging but did not track whether doctors read the images afterward. This project lets doctors mark and document findings while explaining images to parents, and includes completed reading content in the chart when the checklist is synchronized. Managers can follow up on reading completion to ensure necessary reading work is carried out in support of clinical quality, while AI provides anomaly cues to help with initial searching and marking.

**My role and collaboration**

I worked with the product manager on structured reading and confirmed clinical rules with the medical director. I owned interaction and interface design, then co-authored the PRD after the design was agreed.

For AI-assisted reading, I independently owned the product solution, rules, interaction, UI, and PRD. The algorithm colleague owned the model, recognition capability, and training. Doctors remained responsible for final interpretation. The project is live in use.

## 02｜问题 Problem

> **配图备注，不上页面：** 原流程示意：预习推荐拍片 → 拍片 → 医生看图、向家长讲解。标出缺少读片记录和完成状态的位置。示意图须标明是根据真实流程整理，不冒充旧产品截图或访谈证据。

### 中文

#### 管理人员知道是否建议拍片，却不知道读片有没有完成

接诊前的预习功能已经能按规则推荐患者是否需要拍片。但拍完之后，医生有没有读片、内容有没有填完整，原系统无法记录和跟进。

需求最初由管理人员提出。他们需要区分哪些影像还没读、哪些内容没填完整、哪些已经完成，并按门店和医生查看。读片不直接产生经营业绩，但不能因为只关注业绩而忽略日常应该完成的医疗工作。

#### 医生完成了讲解，却缺少与影像位置对应的读片记录

医生看完影像，会直接在诊室电脑前向家长讲解。过去主要用手指着影像、口头描述，关注位置和相应判断没有形成可共同查看的影像标记与读片内容。

口头讲解能帮助当时沟通，但医生和其他医护再次查看时，缺少同一份带标记影像作为确认依据。

因此，这个项目需要解决两件事：让医生的读片内容留下来，让管理人员知道读片工作有没有完成。只记录“拍过片”不能回答这两个问题。

### English

#### Management could see imaging recommendations, not reading completion

The pre-visit feature could recommend imaging according to rules. After capture, however, the original system could not track whether the doctor had read the image or completed the reading record.

Clinical managers initiated the request. They needed to distinguish unread images, incomplete records, and completed readings, and view them by clinic and doctor. Reading does not directly generate revenue, but it is routine clinical work that should not be overlooked.

#### Explanations lacked a shared, location-linked reading record

Doctors reviewed images and explained them to parents at the clinic computer, mainly by pointing and speaking. Areas of concern and their interpretations did not form a shared record linking image marks to text.

The explanation supported the immediate conversation, but doctors and other clinical staff lacked the same annotated reference when reviewing the findings later.

The project therefore needed to retain reading content and show whether reading was complete. Recording that an image had been taken answered neither question.

## 03｜我的判断 Product Thinking

> **配图备注，不上页面：** 用三组“问题 → 判断 → 对应方案”表达下面的关系，可由 AI 绘制，不需要额外截图。快速选择和内容复用均归入讲片时的记录方案，不单独拆成一组。不要添加处置、任务推送等尚未确认的流程。

### 中文

基础读片方案是在我与产品经理的共同讨论中形成，并与医疗主任确认专业规则；AI 部分由我独立负责方案。整理这些需求时，我关注三个判断：

#### 判断 A：已经填写的读片内容，不应在病历里再录一遍

查看是否完成读片，是管理层提出的需求。在讨论方案时，我进一步提出：既然医生已经填写了读片内容，就应将这份内容同步到病历，减少重复录入。

这样，读片记录不仅用于查看完成情况，也能用于病历填写，避免同一份内容在两个地方重复记录。

#### 判断 B：记录要融入讲片过程，填写速度也要跟得上

医生原本就会在电脑前向家长讲片。标记和填写应顺着这个过程发生，而不是讲完后再要求医生录入一份内容。

文字需要对应具体影像位置，让家长和其他医护知道描述的是哪处异常。填写也要跟得上讲解，常用内容应减少层层选择。

不同牙位出现相同异常时，还会重复填写相同内容。因此，我提出读片页面的“复用模块”，让医生带入已有标记的密度、诊断和描述，再核对是否适用，减少逐项填写。

#### 判断 C：AI 提供线索，医生决定是否正确、是否需要记录

医生时间紧张，引入 AI 的目标是补充异常线索，并减少从零查找、标记和录入的基础操作。但“识别正确”与“需要写入本次病历”是两个判断，不能把二者合并。

AI 也不能成为读片的前提。即使加载过久或失败，医生仍应能完成当前工作。

### English

The structured-reading solution was developed with the product manager and its clinical rules were confirmed with the medical director. I independently owned the AI-assisted solution. Three judgments guided this work:

- **A — Reuse recorded findings instead of entering them again in the chart.** Management requested visibility into reading completion. I proposed synchronizing the findings doctors had already documented to the chart, so the same content could serve completion tracking and chart documentation without duplicate entry.
- **B — Document during the explanation, with input that keeps pace.** Marking and input should follow the existing parent conversation. Text needs to locate the finding on the image, and common choices should be quick to select. I also proposed an in-page reuse module: when different teeth have the same finding, doctors can bring density, diagnosis, and description from an existing mark into a new one, then review whether they apply.
- **C — Let AI provide cues while doctors decide correctness and chart relevance.** AI aims to assist with initial searching, marking, and input. A correct cue may not belong in this chart. Slow or failed AI must not prevent manual reading.

## 04｜方案 Solution

### 4.1 对应判断 A：将完整的读片内容随检查表同步到病历

> **配图备注，不上页面：** 检查表同步入口、已完成与未完成的影像状态，以及病历“辅助检查”中的读片内容。标明同步检查表时只带入已完成读片的内容，不把“完成读片”按钮画成病历同步入口。

医生已经在读片时填写了判断和描述，不需要在病历里再写一遍。同步检查表时，系统将已完成读片的内容带入病历“辅助检查”；未读或填写不完整的影像不参与同步。

护士拍片后上传影像并关联本次预约。医生从本次电子检查表进入读片，影像此时已经关联预约，不需要在读片页面重新关联。

系统根据读片内容判断完成情况。有异常标记时，牙位、密度、影像诊断和描述等必填内容填写完整，才满足完成条件。只打开影像或画一个框，不代表完成。

没有标记也不一定代表没有读片：医生可能已经看过，但未见明显异常。这时点击“完成读片”，明确确认结果，避免正常影像一直显示为未读。成像问题导致无法判读时，则明确记录“无法读片”，不能当作未见异常。

“完成读片”还会检查已有标记的必填内容，但它不直接触发病历同步。病历写入跟随检查表的同步操作，按每张影像的读片状态筛选。

### 4.2 对应判断 B：边讲片、边标记、快速填写

> **配图备注，不上页面：** 用手动框选与结构化填写截图说明标记与卡片对应、直接选择和搜索；用同一界面的局部放大展示“复用模块”及带入的密度、诊断、描述。两部分共同证明填写如何跟上讲片节奏，不单独设置复用章节，不用病历同步截图替代。

医生向家长讲片时，在影像上框选异常区域，并填写牙位、方位、密度、影像诊断和描述。这里的“结构化填写”，就是把判断记到这些固定字段中，而不只留下一段自由文本。

#### 标记与文字对应，方便讲解和查看

每个标记对应一张文字卡片。选中标记时，展开对应卡片，弱化其他标记和卡片，让医生知道正在填写哪处异常。医生和其他医护都能查看同一份标记与文字。

#### 常用内容快速选择，减少操作层级

为了让填写跟得上讲片速度：

- 常用且选项较少的内容直接展示，尽量减少二级选择。
- 牙位、方位和诊断等长列表支持数字、中文或拼音搜索。
- 根据已选密度筛选诊断选项，不同时展示所有无关内容。
- 描述词条在填写区域附近展开，不跳到其他页面。
- 影像类型已知时默认选中，再次进入不重复确认。

#### 相同异常复用内容，减少重复填写

不同牙位出现相同异常时，重新选择密度、诊断和描述会打断讲解。因此，我提出“复用模块”：医生可以选择一条已完整填写的标记，将这三项内容带入新标记。

新标记保留自己的牙位和方位，带入内容仍需医生核对。复用只在这三项都未填写时提供，避免覆盖医生已经录入的内容。

### 4.3 对应判断 C：AI 先提示，医生复核后决定是否写入

> **配图备注，不上页面：** AI 提示与对应卡片、三种复核结果、超时后手动读片界面。图注明确操作后果，不用普通删除弹窗代替三种复核结果。

根尖片和咬翼片展示 AI 提示，全景片不展示。AI 先给出疑似异常区域和判断线索，医生可以选择：

| 医生判断 | 后续处理 |
| --- | --- |
| **判断正确，继续读片** | 补全详情，满足完成条件后随检查表同步到病历 |
| **判断正确，无需写入病历** | 认可提示，但本次不记录到病历 |
| **判断错误** | 删除对应标记和卡片 |

不能让 AI 提示未经医生选择就直接成为病历结论；也不应完全切断写入功能，让医生重复录入。因此 AI 与手动标记使用相同的详情字段、完成检查和病历同步规则。

医生仍需要复核，这是方案保留的必要操作。页面同时保留“AI 结果仅供参考，医生对影像诊断结果负责”的说明。

AI 加载超过 5 秒或调用失败时，提供手动读片入口，医生不必一直等待。失败后可以再次调用；成功后再次进入不重复调用。转为手动后仍执行相同的必填检查，不跳过完成要求。

### English

#### 4.1 For judgment A: include complete reading content when the checklist is synchronized

Doctors do not need to enter the same findings again in the chart. When the checklist is synchronized, completed reading content is included in the auxiliary-examination section; unread or incomplete images are excluded.

After imaging, nurses upload the images and associate them with the appointment. Doctors enter reading from that appointment's checklist, so the images are already linked.

The system evaluates completion from the recorded content. Marked findings need complete required fields. An unmarked image may have been read with no apparent abnormality, so Complete Reading lets the doctor explicitly confirm that result. Images that cannot be interpreted are recorded separately, not treated as normal.

Complete Reading also checks required fields for existing marks, but does not trigger chart synchronization. Chart entry follows checklist synchronization and filters each image by its reading status.

#### 4.2 For judgment B: mark during the explanation and keep input quick

Doctors box areas of concern and fill in tooth, location, density, interpretation, and description while explaining the image to parents. Structured input records findings in these defined fields.

**Link marks and text for explanation and review.** Each mark has a corresponding text card. Selecting it opens that card and dims other marks and cards. Doctors and other clinical staff can view the same content.

**Make common choices quick to select.** Frequent short lists are shown directly with fewer nested choices. Longer tooth, location, and diagnosis lists support numeric, Chinese, or pinyin search. Diagnosis options are filtered by the selected density. Description terms open near the input area, and known image types are preselected without repeated confirmation.

**Reuse matching findings instead of repeating input.** Choosing the same density, diagnosis, and description for different teeth can interrupt the explanation. I proposed a reuse module that brings these fields from an existing complete mark into a new one.

The new mark keeps its own tooth and location, and doctors review whether the imported content applies. Reuse is available only when all three fields are empty, avoiding overwriting existing input.

#### 4.3 For judgment C: have doctors review AI cues and choose chart entry

AI cues are shown for periapical and bitewing images, not panoramic images. Doctors can:

- Confirm a cue and complete the details for inclusion when the checklist is synchronized.
- Confirm it without including it in this chart.
- Reject it and delete the mark and card.

AI cues cannot become chart conclusions without doctor choice, but the connection to the chart is retained to avoid duplicate entry. AI and manual marks share the same fields, checks, and synchronization rules. Doctor review remains necessary, and the page states that AI is reference only and doctors are responsible for interpretation.

After a wait longer than 5 seconds or a failed call, doctors can enter manual reading. Failed calls can be retried; successful calls are not repeated on re-entry. Manual reading uses the same required-field checks.

## 05｜关键流程与系统机制 System

> **配图备注，不上页面：** 一张主流程图，加读片状态和病历同步关系。使用前文规则，不另外添加“处置 → 推送”等未确认环节。可以由 AI 绘制并标为流程整理示意。

### 中文

#### 从影像到病历

`预习推荐拍片 → 护士拍片、上传并关联预约 → 医生从检查表进入读片 → 手动标记或复核 AI 提示、填写内容，或明确确认未见明显异常 → 系统判断读片状态 → 同步检查表时，将已完成读片的内容带入病历`

AI 只是其中的辅助步骤，不使用 AI 也能完成读片。AI 提示如何处理见第 4.3 节。病历同步不是读片页面按钮直接触发的动作，而是检查表同步的一部分。

#### 完成状态如何影响同步

| 读片状态 | 系统处理 |
| --- | --- |
| 未读片 | 不参与病历同步，提示仍需处理 |
| 读片不完整 | 提示补齐必填内容，检查表同步时不带入该影像内容 |
| 已读片 | 同步检查表时，带入该影像的完整读片内容；明确确认未见明显异常的影像也不应误判为未读 |

读片状态用于跟进完成情况，并在上线后支持门店和医生维度的统计；它不判断诊断是否正确。

#### 特殊情况

- 影像类型未知或分类错误：先确认或纠正类型，再进入读片；不支持 AI 的类型继续手动读片。
- 影像无法读片：已有标记时需二次确认并清空标记，其中 AI 结果按“判断错误”处理，再设置“无法读片”。

### English

#### From image to chart

`Imaging recommendation → nurse capture, upload, and appointment association → reading from the checklist → marked findings or an explicit no-apparent-abnormality result → reading-status evaluation → completed content included when the checklist is synchronized`

AI is an optional assistance step. Chart entry is part of checklist synchronization, not triggered directly by the reading-page button.

#### How states affect synchronization

| Reading state | System behavior |
| --- | --- |
| Unread | No chart synchronization; remains to be processed |
| Incomplete | Required information must be filled in; this image's content is excluded during checklist synchronization |
| Complete | Completed reading content is included when the checklist is synchronized; an explicitly confirmed normal image is not treated as unread |

States support follow-up and reporting by clinic and doctor, not evaluation of diagnostic correctness.

Unknown or incorrect image types must be confirmed or corrected before reading. Unsupported AI types use manual reading. When an image cannot be read, existing marks require confirmation and clearing; AI results are treated as rejected before setting the unable-to-read status.

## 06｜结果 Impact

### 6.1 已上线的能力

> **配图备注，不上页面：** 目前只有管理数据，没有监控页面截图。用指标定义和门店、医生维度示意即可，不制作看起来像真实产品的假看板，不画没有数据支持的达成曲线。

### 中文

- **医生与医护**：医生讲片时可以标记、填写；其他医护可以查看同一份内容。同步检查表时，已完成读片的文字内容带入病历。
- **管理人员**：可以查看读片完成情况，按门店和医生跟进。公司上线后形成了“读片完成率”指标，并在医疗质量复盘和问责会上使用。
- **AI 辅助**：已经进入实际读片流程；医生仍决定提示是否正确、是否写入病历，并能在 AI 失败时手动继续。

**读片完成率**是推荐拍片记录中已完成读片的比例。当前管理目标为 **60%**，是在上线后形成、随实际情况调整的目标，不是已达到的结果。

### English

- **Doctors and clinical staff**: Doctors can mark and document during the explanation. Other clinical staff can view the same content. Completed reading content is included when the checklist is synchronized.
- **Management**: Reading completion can be viewed by clinic and doctor. After launch, the company established a reading-completion metric for clinical quality reviews and accountability meetings.
- **AI assistance**: AI is used in actual reading work. Doctors still decide whether cues are correct and belong in the chart, and can continue manually when AI fails.

**Reading completion rate** is the proportion of recommended imaging records with completed reading. **60%** is a post-launch management target that can change over time, not an achieved result.

### 6.2 真实使用数据

> **配图备注，不上页面：** 根据现有数据做三组数据卡或图表，不需要再准备图片。不同单位的数据分别展示，不拼成一个转化漏斗。

| 数据 | 表示什么 |
| --- | --- |
| **147,793 张** | 2024-10 至 2026-08 的累计读片量；峰值月为 18,075 张 |
| **约 96.3%** | 在 AI 占比数据中，AI 参与的影像比例，包括有识别结果和未识别出异常的情况 |
| **3,736 条** | AI 读出后被医生删除的记录数，单位是记录，不是影像 |

这些数字说明了使用量、AI 参与情况和医生删除操作的数量，不说明诊断准确率或实际读片完成率。删除也不一定代表 AI 判断错误，可能是医生认为无需写入病历。

### English

| Figure | Meaning |
| --- | --- |
| **147,793 images** | Cumulative reading volume from October 2024 to August 2026; the peak month had 18,075 images |
| **Approximately 96.3%** | Images involving AI in the AI-participation dataset, including cases with findings and cases with no detected anomaly |
| **3,736 records** | AI-generated records deleted by doctors; this counts records, not images |

These figures describe usage volume, AI participation, and deletion activity, not diagnostic accuracy or the actual reading-completion rate. Deletion does not necessarily mean the AI was wrong; a doctor may consider a finding unnecessary for the chart.

## 07｜反思 Reflection

### 中文

#### 少打字，不等于填写更快

我原本希望通过结构化选择，让医生少打字，并在向家长讲片时完成记录。但上线后调研中，医生反馈填写路径仍然偏长：选项较多时，逐项查找、判断和选择反而比直接打字更费时间。这是这次设计没有做好的地方。

这让我认识到，少打字不等于填写更快。结构化让记录更规范、便于统计，但也可能把输入负担变成查找负担。已有的搜索、筛选和内容复用，并没有完全解决这个问题。

如果重新设计，我会先找出最耗时的填写环节，再判断哪些内容适合直接选择、哪些更适合快捷输入，而不是默认用选项代替打字就能提高效率。

#### AI 判断正确，不等于需要记录

AI 识别正确不代表必须写入病历，医生删除提示也不一定代表识别错误。评估时需要区分这些原因，不能只看 AI 使用占比就判断是否减轻了医生的负担。

### English

#### Less typing does not necessarily mean faster documentation

I intended structured choices to reduce typing and let doctors document findings while explaining images to parents. However, post-launch research with doctors revealed that the input flow was still too long. When there were many options, doctors reported that finding, evaluating, and selecting them could take longer than typing directly. This was a shortcoming in my design.

I learned that reducing typing does not necessarily make documentation faster. Structured input makes records more consistent and easier to report on, but can shift the burden from typing to searching. Existing search, filtering, and content reuse did not fully resolve this problem.

If I redesigned the flow, I would first identify the most time-consuming input steps, then decide which fields suit direct selection and which suit quick text input, rather than assume that replacing typing with choices improves efficiency.

#### A correct AI cue does not necessarily belong in the chart

A correct AI cue may not need chart entry, and deletion does not necessarily mean the AI was wrong. Evaluation needs to distinguish these reasons; AI participation alone cannot establish whether doctors' workload has been reduced.

## 8. 编辑备注与资料来源（不上页面）

### 8.1 待补充信息与审核说明

- **项目周期**：请补充基础读片项目的起止时间；AI 辅助部分如有独立周期，也可以分别注明。暂不根据数据统计期或 AI 上线节点推定。
- **短标题**：本次继续暂用“PACS 读片与 AI 辅助”，未作为最终标题。原稿长标题和项目数据标题仍不同，确认后再同步页面。
- **本轮正文**：2026-10-04 用户确认当前文档没有大问题，正文与七部分结构作为页面设计依据；不再扩大内容范围。后续如新增事实或实质改写，只复核受影响部分。
- **项目概览**：本轮按你提出的新结构展示项目介绍、职责、协作和已上线状态，取代之前对概览是否展示的待决问题。不额外加入分类标签。
- **范围**：目前只讲影像、读片、病历同步与管理统计。处置关联、任务推送、修改后下游同步等示例尚未确认，不写为实际功能。
- **篇幅与设计**：当前内容已确认，下一步审核页面呈现。三分钟阅读是参考目标，不据此擅自省掉已确认的关键判断。

### 8.2 数据使用注意事项

- 累计读片量、AI 占比和删除记录来自不同数据表，不能直接合并计算；AI 占比表总张数与累计读片表相差 4 张。
- 约 96.3% 不是准确率、调用成功率或医生采纳率。
- 3,736 条删除记录不能全部当作识别错误，也不能据此说这些记录已经用于模型训练。
- 尚无证据支持“达到 60%”“读片完成率提升了多少”“节省了多少医生工时”“减少漏诊、误诊或医疗事故”“提高诊断准确率”等结论，不能写成上线成果。
- 如需进一步评估，可考虑实际完成率、医生操作耗时与反馈、三种复核结果的分布，以及 AI 失败后手动读片的完成情况。这些是本次整理案例时的评估建议，不是已确认的项目后续计划，不上页面；证据缺口仍以 content-readiness.md 为准。
- 系统会记录医生标记与 AI 判断的差异，但是否实际用于模型分析或训练、效果如何，仍需确认。

### 8.3 未核实的观察数据

曾有口头信息称：2024 年 6 月平均每张小牙片龋齿发现数为 1.43，AI 功能约在 2024 年 11 月上线，2025 年 6 月为 3.46，相对增加约 142%。

基线也曾出现 1.34 的说法。正式报表、筛选条件、样本量和统计明细尚未补齐，因此不进入公开页面，也不能写成医学检出率提升或归因于 AI。

English note: The reported 1.43-to-3.46 change is unverified, with a conflicting baseline of 1.34. Without a formal report and statistical details, it is not public case-study evidence or a measure of diagnostic performance.

### 8.4 事实与原始资料

事实核对入口：[PACS 项目事实底稿](../../project/PACS读片与AI辅助判断.md)。证据缺口记录在 [content-readiness.md](../../project/content-readiness.md)。

原始材料：

- `docs/origin/读片/读片PRD.v1.md`
- `docs/origin/读片/读片新增AI判断PRD-v2.md`
- `docs/origin/读片总数据.md`
- `docs/origin/读片AI占比数据.md`
- `docs/origin/读片AI复核删除数据.md`

### 8.5 图片与页面实现

- `docs/pages/pacs-ai/final-screens/`：待准备的真实系统截图。
- `public/images/pacs/`：现有图片资源。公开使用前必须不可逆脱敏；旧图不因存在于目录中就直接展示。
- `src/data/projects.js`：现有项目数据。
- `src/pages/cases/PacsAi/content.js`：现有页面内容数据，审核后由 AI 修改，不是另一份审核文档。
- `src/pages/cases/PacsAi/PacsAiPage.jsx`：详情页组件。
- `src/pages/cases/PacsAi/index.jsx`：PACS 页面入口。
- `src/pages/cases/PacsAi/PacsAi.module.css`：页面样式。
- `src/pages/ProjectDetail/index.jsx`：详情页路由分发。

2026-10-04：本版内容与设计已确认，并同步到 PACS 页面；保留七部分中英文、就近截图占位及数据口径说明。英文介绍仅修正一处语法，事实与含义不变。详情测试 16 项通过，构建通过；桌面、320px 手机、低高度窗口、目录跳转与英文已检查。全站测试仍有 3 项首页旧标题断言失败，与本次详情改动无关；没有修改首页或素材就绪状态。
