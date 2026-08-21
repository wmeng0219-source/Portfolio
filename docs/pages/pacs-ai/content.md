# 案例母稿 03：PACS 读片与 AI 辅助判断 (PACS & AI-Assisted Interpretation)

> **项目 Slug**：`pacs-ai`  
> **页面分类标签**：`专业流程 / AI 协作` (`Specialist Workflow / AI Collaboration`)  
> **案例定位**：把高风险影像判断拆成可记录、可复核、可继续工作的产品流程。

## 先看懂这个项目

- **原来的问题**：读片依赖个人习惯，影像、标注和病历没有稳定关联。
- **我当时的角色**：V1 以设计为主并参与规则确认；V2 负责 AI 辅助读片的产品规则、交互和 UI 设计。
- **核心判断**：先把人工读片变成可记录流程，再让 AI 以辅助角色进入医生复核环节。
- **关键改变**：结构化标注与病历同步、医生三选一复核（确认并写入、确认但不写入、判错删除）、AI 超时后的手动降级。
- **已确认结果**：平均每张小牙片龋齿发现数从 1.43 颗变为 3.46 颗；该指标不等同于医学检出率。

### Read this first (English)

- **The original problem**: Reading depended on individual habits, with no stable link between images, annotations, and charts.
- **My role**: I focused on design and rule alignment in V1; in V2 I owned the product rules, interaction, and UI design for AI-assisted reading.
- **Core judgment**: Make manual reading recordable first, then bring AI into a doctor-review step as assistance.
- **Key changes**: Structured annotations with chart sync, three doctor review choices (confirm and write, confirm without writing, or reject and remove), and a manual fallback when AI times out.
- **Confirmed result**: Average cavities found per small dental X-ray changed from 1.43 to 3.46; this is not a medical detection-rate measure.

## 1. 为什么需要改变读片方式

### 中文

原始需求要解决的不是“再加一个 AI 按钮”，而是让影像读片在系统中留下可追踪记录。影像同步后，电子检查表显示“未读片”“读片不完整”或“已读片”，让状态可见。医生在影像上框选异常区域，填写牙位、方位、密度、影像诊断和描述所见，形成结构化记录。完成后的描述再按规则同步到领健病历的“辅助检查”。

这先解决了流程可见性和重复录入的产品问题。至于真实使用规模、读片完成率或临床效果，现有 PRD 没有提供验证数据。

### English

The first problem was not adding an AI button. It was making image interpretation traceable inside the system. After an image was synced, the checklist showed whether it was unread, incomplete, or complete, making its status visible. Doctors marked abnormal areas and filled in tooth position, location, density, diagnosis, and findings to create a structured record. The completed description was then synced to the chart’s auxiliary-exam field according to the defined rules.

This addressed workflow visibility and duplicate entry at the product-mechanism level. The PRDs do not provide evidence for adoption scale, completion rate, or clinical effectiveness.

## 2. 我的角色如何从 V1 变化到 V2

### 中文

- **V1**：以设计工作为主，参与产品规则确认并编写读片相关产品文档。重点是把读片动作、完成状态和病历同步规则定义清楚。
- **V2**：负责 AI 辅助读片的产品规则、交互与 UI 设计，并编写 V2 PRD。重点从“记录医生做了什么”扩展到“医生如何处理 AI 的每个提示”。

这里的“负责”指产品与设计范围，不延伸为算法开发、医学责任或上线运营结果的全权负责。

### English

- **V1**: I focused on design, aligned product rules, and wrote the reading-related product documentation. The work defined reading actions, completion states, and chart-sync rules.
- **V2**: I owned the product rules, interaction, and UI design for AI-assisted reading, and wrote the V2 PRD. The focus expanded from recording doctor actions to defining how doctors handle each AI prompt.

“Ownership” here refers to the product and design scope. It does not imply ownership of algorithm development, medical responsibility, or operating results.

## 3. 第一步：让人工读片可记录、可同步

### 中文

V1 把一次读片拆成几个可检查的动作：同步当前预约的影像；在影像上框选区域；填写结构化详情；点击完成读片。任一必填项缺失，状态保持为“读片不完整”，不能把未完成内容当作已完成。已完成的描述按 PRD 规则逐条写入或拼接到病历，未读片或不完整的影像不参与同步。

系统也保留了异常处理：影像分类错误时，可以改选小牙片或全景片后再进入读片；同步影像超时则提示重试。换句话说，先建立的是一条可核对的记录通道（未读、信息不完整、已完成三种状态），而不是宣称读片质量已经被证明提升。

### English

V1 broke a reading session into checkable actions: sync the current appointment’s images, mark an area, complete structured details, and finish reading. If a required field was missing, the status stayed incomplete. Completed descriptions were written or concatenated to the chart according to the PRD; unread or incomplete images were excluded.

The flow also handled exceptions: a misclassified image could be changed to an intraoral or panoramic image before reading, and an image-sync timeout exposed a retry path. The result was a checkable record channel (unread, incomplete, complete), not a claim that reading quality had been proven to improve.

## 4. 第二步：让 AI 提示进入医生复核流程

### 中文

V2 先确认影像类型，再决定是否展示 AI。AI 适用于根尖片和咬翼片；全景片不展示 AI 数据。AI 加载超过约 5 秒或超时后，页面提供“手动读片”入口，医生可以继续工作。AI 成功调用后再次进入不重复调用；失败时可在读片阶段再次调用。

每个 AI 标记都进入医生复核，而不是直接成为诊断：医生可以选择“判断正确，继续读片”，进入详情填写并按规则决定是否同步；也可以选择“判断正确，无需写入病历”；如果判断错误，则删除该 AI 标记和卡片。医生仍可手动框选，页面常驻声明“AI 影像分析结果仅供参考，医生对影像诊断结果负责”。复核差异会被记录，供后续模型分析使用；现有材料没有差异样本量或模型效果报表。

### English

V2 confirmed the image type before deciding whether to show AI. AI applied to periapical and bitewing images; panoramic images showed no AI data. If loading took about five seconds or timed out, a manual-reading entry let the doctor continue. A successful call was not repeated on re-entry; a failed call could be attempted again during reading.

Each AI mark went through doctor review instead of becoming a diagnosis. The doctor could confirm and continue to details, confirm but skip chart writing, or mark it as wrong and remove it. Manual marking remained available, with a persistent notice that AI analysis was for reference and the doctor was responsible for the diagnosis. Review differences were recorded for later model analysis; no sample count or model-performance report is available.

## 5. 三个关键产品判断

### 判断一：AI 不直接写病历

AI 只提供提示，医生必须完成复核和详情填写后，内容才按规则进入病历。这个选择增加了一次医生复核操作，换取模型输出与医生最终诊断分离，并让记录与责任边界更清晰。

**Decision 1: AI does not write directly to the chart.** AI provides a prompt only. A doctor must review it and complete the details before anything is synced. This adds one doctor-review action in exchange for separating model output from the final diagnosis and making the record and responsibility boundary clearer.

### 判断二：需要“确认但无需写入”

真实读片不只有“对”或“错”：提示可能被医生认可，但不适合写入本次病历。因此保留“判断正确、无需写入病历”，记录复核动作，同时不制造不必要的病历内容。

**Decision 2: Keep “confirmed, no chart entry.”** A prompt can be accepted without belonging in the current chart. This option records the review without forcing redundant text into the medical record.

### 判断三：AI 超时仍可手动读片

这里的取舍是为超时状态增加明确的手动入口，让医生不必等待 AI 即可继续读片。它保留了医生工作的连续性，但只能证明降级路径被设计，不代表 AI 可用率或兜底成功率。

**Decision 3: Manual reading remains available on AI timeout.** The tradeoff was to add an explicit manual entry for timeout states so doctors could continue without waiting for AI. This preserved workflow continuity, but proves only that a fallback path was designed, not AI availability or fallback success.

**异常边界：影像类型校验。** 若影像类型未知，医生必须在进入读片前确认全景片、根尖片或咬翼片中的一种；不支持的类型不展示 AI 数据，分类错误需纠正后再继续流程。

**异常边界 / Exception boundary — image type validation.** If the type is unknown, the doctor must confirm one of panoramic, periapical, or bitewing before entering reading. An unsupported type does not show AI data; a classification error is corrected before the workflow continues.

## 6. 结果、证据与不能下的结论

### 中文

已确认的运营对比是：2024 年 6 月平均每张小牙片龋齿发现数为 **1.43 颗**；AI 辅助功能约于 2024 年 11 月上线；2025 年 6 月为 **3.46 颗**，相对增加 **142%**。现有材料把它定义为平均每张小牙片的发现数。

这个数字可以作为上线前后对比，不能单凭它证明医学检出率提升、归因于 AI、病历录入效率提升，或代表全量留痕。正式报表路径、筛选条件、样本量和统计明细仍待补充。

### English

The confirmed operating comparison is 1.43 average cavities found per small dental X-ray in June 2024, AI-assisted functionality launching around November 2024, and 3.46 in June 2025, a relative increase of 142%. The metric is defined as average findings per small dental X-ray.

It supports a before-and-after comparison only. By itself it cannot prove higher medical detection, attribute the change to AI, demonstrate faster chart entry, or represent complete traceability. The formal report path, filters, sample size, and statistical detail are still missing.

## 7. 这段经历证明了什么

### 中文

这段经历证明我能在专业且有责任边界的场景里，把模糊的“读片体验”拆成可执行规则：先让人工动作可记录、可校验、可同步，再把 AI 放进医生能复核、能拒绝、能继续工作的流程。我的工作价值不在于替模型或医生下结论，而在于把产品机制、异常边界和证据口径一起定义清楚。

### English

This project shows that I can turn an ambiguous reading experience into executable rules in a specialized, responsibility-sensitive setting. I made manual actions recordable, checkable, and syncable before placing AI inside a flow that doctors can review, reject, and continue. The value of my work was not making a diagnosis for the model or the doctor, but defining the product mechanism, exception boundaries, and evidence language together.

### Sources

- `docs/origin/读片/读片PRD.v1.md`
- `docs/origin/读片/读片新增AI判断PRD-v2.md`
- `docs/project/PACS读片与AI辅助判断.md`
