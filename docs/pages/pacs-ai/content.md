# 案例母稿 03：PACS 读片与 AI 辅助判断 (PACS & AI-Assisted Interpretation)

> **项目 Slug**：`pacs-ai`  
> **页面分类标签**：`专业流程 / AI 协作` (`Specialist Workflow / AI Collaboration`)  
> **当前状态**：线上主案例（第 3 顺位）

---

## 0. 元数据与个人定位 (Metadata & Scope)

### 中文
- **项目标题**：PACS 读片与 AI 辅助判断
- **个人职责**：V1 以设计为主，参与部分产品规则确认。V2 全权负责产品与设计，主导 AI 读片的交互逻辑、人机协作流程设计、AI 声明与免责边界定义。两版 PRD 均为我编写。
- **核心命题**：在专业医疗影像场景中，构建“影像结构化标注 (V1) ➔ AI 辅助识别与医生三选一复核 (V2) ➔ 差异数据回收与模型迭代”的完整人机协作闭环，并在产品设计中明确人机责任边界与非阻断兜底机制。

### English
- **Project Title**: PACS Interpretation and AI-Assisted Review
- **Role**: V1: Designer role, co-authored product rules. V2: Full product + design ownership — drove human-AI interaction loop, interface design, and liability boundaries. Authored both PRDs.
- **Mission**: In specialized clinical imaging, built a complete human-AI collaboration loop: structured annotation (V1) ➔ AI anomaly detection & 3-way doctor verification (V2) ➔ divergence data recovery & model iteration, establishing explicit liability boundaries and non-blocking fallbacks.

---

## 1. 首屏与核心指标 (Hero & Key Metrics)

### 1.1 一句话背景 (Hero Summary)
- **中文**：诊室中可能直接对着影像向家长解释，也可能把部分判断写入病例。记录方式不一致，影像、标注、诊断文本和病历之间缺少稳定关联。
- **English**: Clinicians might explain images directly to parents or record only part of the interpretation. Imaging, annotations, diagnostic text, and charts lacked a consistent link.

### 1.2 首屏悬浮指标卡 (Hero Floating Metrics)
- **指标序列**：`2024.06 · 1.43 颗` ➔ `2025.06 · 3.46 颗`（平均每张小牙片龋齿发现数，提升 `+142%`）
- **时间线锚点**：AI 辅助功能于 `2024.11` 正式上线。
- **严格口径说明**：2024.06 为上线前人工读片基线，2025.06 为 AI 辅助上线半年后的实际运营对比；指标为平均每张小牙片发现数，与医学金标准检出率（Sensitivity）作严格概念区分。

---

## 2. 现场与代价 (Context & Tension)

### 2.1 业务现场
- 传统门诊中，医生拍完 X 光牙片后，往往直接在显示器前口头向家长解释，或仅在病历中简短手写几句。
- 影像存储在本地 PACS 中，与电子病历（EMR）完全脱节。

### 2.2 现实代价
1. **拍了片没人读（读片不可见）**：管理层完全无法监控影像的阅片率与应检尽检执行情况，存在医疗纠纷隐患。
2. **重复录入与标准不一**：医生在 PACS 里看一遍，又要在病历里手动打字一遍，格式混乱且极易遗漏。
3. **AI 引入后的临床风险**：若 AI 模型直接给出“确定性结论”，容易引发医生盲从或产生抗拒；若 AI 响应缓慢或报错，容易阻断门诊接诊节奏。

---

## 3. 根因分析与设计命题 (Diagnosis & Mission)

### 3.1 表面痛点 vs 系统根因
- **表面痛点**：“读片容易漏、写病历麻烦、AI 识别不一定准”。
- **系统根因**：缺乏**影像与病历的结构化数据通道**，以及缺乏**针对 AI 算法置信度的“人机权责分工机制”**。

### 3.2 设计命题
> **先建立系统内读片留痕与病历一键同步通道 (V1)，再引入 AI 作为非阻断的辅助副驾驶（Copilot），通过强制复核动作构建数据飞轮与免责屏障 (V2)。**

---

## 4. 核心约束与范围 (Constraints & Scope)

1. **医疗法规与责任红线**：AI 算法绝对不能替代医生做临床确诊。界面必须常驻“AI 结果仅供参考，医生对最终诊断负责”的法律免责边界。
2. **临床时效不阻断原则**：门诊看病争分夺秒，AI 响应超时（如 >5 秒）绝不能卡死界面，必须无缝降级为手动读片。
3. **算法能力边界**：当前 AI 模型仅针对小牙片（根尖片/咬翼片）训练，严禁超范围应用于全景片（CBCT/曲断片）。

---

## 5. 关键机制与产品决策 (Mechanism & Product Decisions)

### 5.1 三大核心解决方案 (Core Solutions)

```text
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│  1. 读片基础功能 (V1)    │   │  2. AI 辅助读片闭环 (V2)  │   │  3. 人机协作边界设计    │
│  结构化标注与三态质控留痕 │ ➔ │  医生三选一复核与数据飞轮 │ ➔ │  常驻免责/超时非阻断降级 │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

1. **读片基础功能 (Core Image Reading - V1)**
   - *中*：让医生在系统内完成影像标注和结构化记录，并支持一键同步到病历，实现拍片读片的可追踪。读片状态三分法（未读片 / 读片不完整 / 已读片）配合红色提示，让管理层第一次能实时看到应检尽检的完成情况。
   - *En*: Enabled structured image annotation and one-click chart synchronization. A three-state reading status (unread / incomplete / complete) with visual alerts gave management real-time visibility into compliance for the first time.
2. **AI 辅助读片闭环 (AI-Assisted Loop - V2)**
   - *中*：AI 自动识别异常区域，医生对每个标记做出三种判断之一：继续读片（确认并写入病历）、正确但无需写入、判断错误。每次操作都被转化为标注数据，形成“AI 识别 → 医生复核 → 差异数据回收 → 模型迭代”的完整数据飞轮。
   - *En*: AI highlights anomalies, and doctors make one of three judgments per mark: confirm and write to chart, confirm but skip, or reject. Each decision feeds back into training data, completing a flywheel: AI identifies → doctor reviews → divergence collected → model improves.
3. **人机协作边界设计 (Human-AI Boundary Design)**
   - *中*：明确“AI 结果仅供参考，医生对诊断结果负责”原则，常驻页面底部。全景片不展示 AI（模型仅支持小牙片/咬翼片），AI 超时不阻断操作——这些边界都是有意设计的，而非默认值。
   - *En*: Established "AI as reference only, doctor owns the diagnosis" as a permanent on-screen disclaimer. Panoramic X-rays intentionally excluded from AI. AI timeout does not block workflow — all intentional boundaries, not defaults.

---

### 5.2 核心产品决策与权衡 (Key Decisions & Trade-offs)

| 决策点 (Decision Question) | 最终选择与方案 (Choice) | 权衡考量与代价 (Trade-off & Rationale) |
| :--- | :--- | :--- |
| **全景片要不要展示 AI 结果？** | **坚决不展示**。严格限定仅在小牙片上运行。 | 宁可限制功能范围，也绝不因全景片误识别产生误导性标记，防止污染医生判断与训练集。 |
| **AI 超时时要不要阻断医生？** | **不阻断**。超过 5 秒自动提示手动入口。 | AI 是辅助工具，临床效率永远优先。系统记录降级原因，保证门诊流程绝对顺畅。 |
| **读片类型确认弹窗为什么要前置？** | **前置人工确认片型**（小牙片 vs 全景片）。 | 解决底层系统自动分类偶发错误，从源头杜绝“用错算法模型”带来的系统性污染。 |
| **为什么必须设计“正确但不写入病历”选项？** | **提供“三选一”细分判断选项**，而非非黑即白。 | 历史已知病灶无需重复写入当次病历，避免病历冗余；同时保留该标注行为用于模型飞轮训练。 |

---

### 5.3 机制演进历程 (Process: V1 ➔ V2)

```text
[V1 阶段：建立基础 · Make Reading Trackable]
目标：解决“拍了片没人读”在系统里完全不可见的问题。
机制：医生在系统内框选异常、填写结构化描述；建立“未读 / 不完整 / 已读”三态流转与病历同步。

       ↓ (完成数字化底座后引入 AI)

[V2 阶段：AI 引入 · Assist + Data Flywheel]
目标：解决“读得快不快、准不准”的问题。
机制：引入 AI 辅助病灶初筛；设计医生三选一覆核动作，形成“AI 推理 ➔ 人类把关 ➔ 样本沉淀 ➔ 算法迭代”的数据飞轮。
```

---

### 5.4 设计体系与 UX 手艺 (Design System & UX Craft)

#### 1. 色彩与人机权责语义 (Color & Role Semantics)
在医疗人机交互中，算法推断绝不能在视觉上被误认为临床确诊：
- `#C8B6FF`（AI 推断紫 / AI Inference Purple）：算法初步病灶高亮，非阻断建议提示。
- `#B8E6D0`（临床确诊绿 / Doctor Confirmed Green）：医生点击复核确认，数据正式同步写入电子病历。
- `#FFD6A5`（标注纠偏橙 / Label Override Orange）：医生修正或驳回 AI 标记，作为负样本回流飞轮。
- `#0B0F14`（诊室暗光基底 / Dark Slate Base）：深度适配放射科/暗光诊室全天候看片的视力保护底色。

#### 2. 暗光诊室 F 型视线引导 (Visual Hierarchy & Cognitive Load)
- **左图右卡**：左侧为高保真 DICOM 影像画布，右侧为 AI 识别建议卡片（按置信度与严重度降序排列）。
- **渐进式暴露**：默认隐藏底层技术参数，仅在医生悬停或点击时展开深度切片指标。

#### 3. 容错与兜底指标 (Specs)
- 信息扫描顺序：`IMAGE ➔ REVIEW`（先看影像，再看建议）
- 降级阈值：`5s` 超时即显手动入口
- 最终责任主体：`DOCTOR`（医生终审负责制）

---

## 6. 业务结果与指标口径 (Business Impact & Rigor)

### 6.1 后台记录变化与时间线 (Headline Metrics)
- **2024.06**：平均每张小牙片龋齿发现数 **`1.43 颗`**（AI 上线前基线）
- **2024.11**：AI 辅助读片功能（V2）正式灰度上线。
- **2025.06**：平均每张小牙片龋齿发现数达到 **`3.46 颗`**（AI 上线后运营对比，提升 **`+142%`**）

### 6.2 严谨归因说明 (Rigor & Attribution Boundary)
> **重要说明**：`1.43 ➔ 3.46 颗`（+142%）的提升反映了 AI 异常辅助标记与医生三选一复核机制在儿童门诊中的落地成效。低龄儿童早期邻面龋在 X 光片上对比度低，AI 提示有效辅助了医生识别人眼易忽略的早期病灶。在医学严谨定义中，该指标为“单片平均发现数”，需与严格金标准下的敏感度/检出率作区分。

### 6.3 组织与系统价值 (System Capabilities)
1. **读片全流程可追踪**：未读、不完整、已读状态实时呈现在门诊检查看板上，消除漏读隐患。
2. **病历录入提效**：结构化标记一键同步病历，消除二次打字，格式标准化程度达到 100%。

---

## 7. 复盘反思与未解局限 (Retrospective)

1. **人机协作的核心不是“替代”，而是“权责边界的舒适感”**：AI 进临床，医生最大的顾虑是“被算法替代”或“为算法背锅”。通过常驻免责、非阻断超时降级、三选一复核机制，成功消除了医生的抵触情绪。
2. **数据质量依赖前端前置拦截**：垃圾进导致垃圾出（Garbage in, garbage out）。片型校验前置确认的细节，避免了后续几千张影像对训练数据集的污染。

---

## 8. 视觉资产与代码映射 (Assets & Code Mapping)

| 资产类型 | 路径 / 标识 | 页面对应位置 |
| :--- | :--- | :--- |
| **首屏主视觉** | [`public/images/pacs/generated/pacs_hero_1784477678972.jpg`](file:///Users/wen/Desktop/Portfolio/public/images/pacs/generated/pacs_hero_1784477678972.jpg) | Hero 区域主图 |
| **Bento 卡片 1 (读片留痕)** | [`public/images/pacs/generated/pacs_trace_1784477779066.jpg`](file:///Users/wen/Desktop/Portfolio/public/images/pacs/generated/pacs_trace_1784477779066.jpg) | 解决方案 Bento 网格 1 |
| **Bento 卡片 2 (数据飞轮)** | [`public/images/pacs/generated/pacs_loop_1784477797633.jpg`](file:///Users/wen/Desktop/Portfolio/public/images/pacs/generated/pacs_loop_1784477797633.jpg) | 解决方案 Bento 网格 2 |
| **Bento 卡片 3 (权责边界)** | [`public/images/pacs/generated/pacs_boundary_1784477816064.jpg`](file:///Users/wen/Desktop/Portfolio/public/images/pacs/generated/pacs_boundary_1784477816064.jpg) | 解决方案 Bento 网格 3 |
| **数据源文件** | [`src/data/projects.js`](file:///Users/wen/Desktop/Portfolio/src/data/projects.js) (`id: 'pacs-ai'`) | 注入页面 React 数据 |
| **页面组件** | [`src/pages/cases/PacsAi/index.jsx`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/PacsAi/index.jsx) | 独立案例路由页面渲染 |
| **样式模块** | [`src/pages/cases/PacsAi/PacsAi.module.css`](file:///Users/wen/Desktop/Portfolio/src/pages/cases/PacsAi/PacsAi.module.css) | 独立 CSS 模块 |
