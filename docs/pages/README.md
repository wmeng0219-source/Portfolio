# 页面内容与设计层 (Pages · Single Source of Page Copy & Design)

> **定位**：本目录按"页面对象"组织作品集所有页面的**内容结构（content）** 与**设计规范（design）**，是页面文案与视觉呈现的唯一母稿层。<br>
> **适用范围**：首页、会员自动化、正畸筛查、PACS 读片、接诊预习引擎及后续所有新增页面。

---

## 一、 目录结构（每个对象 = 内容 + 设计两态）

```text
pages/
├── README.md             页面注册表与分层规范（本文档）
├── homepage/
│   ├── content.md        首页内容结构：逐字文案、信息层级、区块叙事
│   └── design.md         首页设计规范：视觉样貌、交互形态、动效、布局
├── member-automation/
│   ├── content.md        会员自动化项目内容母稿（7 步证据链双语）
│   └── design.md         会员自动化设计规范 + 素材说明
├── orthodontics/
│   ├── content.md        正畸筛查项目内容母稿
│   └── design.md         正畸筛查设计规范 + 素材说明
├── pacs-ai/
│   ├── content.md        PACS 项目内容母稿
│   ├── design.md         PACS 设计规范 + 素材说明
│   └── final-screens/    已导出的关键界面图
└── pre-visit-engine/
    ├── content.md        预习引擎项目内容母稿
    └── design.md         预习引擎设计规范 + 素材说明
```

每个对象目录内部职责固定：

| 文件 | 内容 | 维护时改什么 |
| --- | --- | --- |
| `content.md` | 逐字文案、叙事结构、指标表述、双语 | 改页面说什么 |
| `design.md` | 视觉规范、交互形态、布局、动效、素材链接 | 改页面长什么样 |

> **隔离红线**：`content.md` 不写视觉，`design.md` 不写文案。文案需要视觉时用引用指向 `content.md` 对应区块。

---

## 二、 页面注册表（Project Master Registry）

| 序号 | 页面 Slug | 对象目录 | 内容母稿 | 设计规范 | 事实来源 (`docs/project/`) | 页面定位 |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **00** | `homepage` | `homepage/` | `homepage/content.md` | `homepage/design.md` | — | 首页（Hero / Selected Work / Career / Contact） |
| **01** | `member-automation` | `member-automation/` | `content.md` | `design.md` | `会员自动化.md` | 首页主案例（规则系统） |
| **02** | `orthodontics` | `orthodontics/` | `content.md` | `design.md` | `正畸筛查与状态管理.md` | 首页主案例（流程协作） |
| **03** | `pacs-ai` | `pacs-ai/` | `content.md` | `design.md` | `PACS读片与AI辅助判断.md` | 首页主案例（AI 闭环） |
| **04** | `pre-visit-engine` | `pre-visit-engine/` | `content.md` | `design.md` | `接诊全流程预习与编排引擎.md` | 深度候选/扩展案例（设计驱动产品） |

### 新增页面接入流程

1. **事实沉淀**：涉及项目先建 `docs/project/<项目名>.md` 事实底稿。
2. **内容定稿**：在 `pages/<slug>/content.md` 编写 7 步证据链中英双语母稿。
3. **设计归档**：在 `pages/<slug>/design.md` 记录视觉与交互规范、设计稿链接与关键截图。
4. **全网注册**：在本文注册表与 `docs/site/content-map.md` 登记，并按需同步至 `src/data/projects.js`。

---

## 三、 7 步证据链内容标准（content.md）

每个 `content.md` 严格遵循以下结构（继承自原 `docs/cases/README.md` 规范）：

1. **Header 元数据**：页面 Slug、双语标题、标签、所属系统版本号、个人职责与交付边界。
2. **Hero & 核心指标**：首屏大图与瞬时识别指标卡片。
3. **Module 1: 现场与代价 (Context & Tension)**：多角色业务断点与未被系统承接的现实损失。
4. **Module 2: 根因与设计命题 (Diagnosis & Mission)**：穿透表面痛点，抽象系统缺陷并下达一句话设计命题。
5. **Module 3: 核心约束与范围 (Constraints & Boundaries)**：技术、组织、合规与时间边界。
6. **Module 4: 关键机制与产品决策 (Mechanism & UX Craft)**：方案对比 A vs B、状态流转、规则引擎、异常兜底与设计手艺。
7. **Module 5: 业务结果与指标口径 (Impact & Rigor)**：核心指标、统计周期、样本人群、数据来源、归因边界。
8. **Module 6: 复盘反思与未解局限 (Retrospective)**：真实意外收获、妥协代价与未来演进方向。
9. **视觉资产与交互映射 (Assets & UI Mapping)**：对应 SVG/图片路径与交互逻辑。

---

## 四、 设计规范标准（design.md）

`design.md` 记录"页面长什么样 + 怎么交互"，与全局视觉基础 `DESIGN.md` 分工：

- `DESIGN.md`（根目录）：全局设计系统——配色、字体、圆角、间距、组件风格，全站唯一规范层。
- `pages/<slug>/design.md`：该页面特有视觉与交互——布局结构、区块动效、组件变体、设计稿来源与关键截图。

### 设计素材归档规则（继承自原 `docs/design/README.md`）

- 每个对象建议结构：`design.md`（规范与说明）+ `final-screens/`（关键导出图）。
- 仅归档最终采用稿或已进入正式交付范围的方案。
- MasterGo 继续作为设计源头，仓库内优先保存"链接 + 关键导出图 + 简短说明"。
- 导出图片数量以"足够说明问题"为准，不追求全量留档。
- 命名建议：`序号-模块名`（如 `01-读片主界面.png`），避免 `最终版`、`最新版` 类命名。

---

## 五、 维护与同步工作流（Content-First 规则）

1. **文案先行（Content-First）**：所有文案修改、双语润色、新指标补充，必须先在本目录对应 `content.md` 定稿。
2. **设计分离（Design Separate）**：视觉与交互改动先改 `design.md`（或全局 `DESIGN.md`），不混入内容改动。
3. **代码同步（Sync to Code）**：文档定稿后，再同步提取更新至 `src/data/projects.js` 与 `src/pages/cases/`。
4. **反向回写（Bi-directional Consistency）**：前端调试中微调文案，必须同步回写 `content.md`，严禁文档与线上代码分叉。

### 数据口径纪律

- **指标唯一来源是 `docs/project/`**：改指标先在事实层改，再同步 `content.md` 与 `design.md` 中引用的数字。
- `content.md` 与 `design.md` 引用的结果数字必须与事实层一致，禁止在页面层"发明"口径。
