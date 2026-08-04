# 通用作品集案例入库标准规范 (Universal Portfolio Case Study Spec)

> **适用范围**：本规范适用于作品集内**现有及未来新增的所有项目案例**（如 PACS AI、正畸筛查、会员自动化及后续新增的任何产品设计案例）。

---

## 📌 通用案例 7 大必填契约 (Universal Module Contract)

未来无论录入任何新项目，案例页面**必须完整包含**以下 7 个标准模块。缺一不可：

```
[1. 首屏与战果] ➔ [2. 业务背景与矛盾] ➔ [3. 策略演进路径] ➔ [4. 核心解法 Bento]
                                                                  ↓
[7. 战果与界面全景] ⇦ [6. 决策与权衡 (A vs B)] ⇦ [5. ⭐️ 设计体系与手艺 (Design Craft)]
```

### 1. 核心首屏与角色 (Hero & Role)
- **要求**：必须包含项目一句话定位、个人明确角色分工（PM/UX/ITBP）、首屏最强数字战果（如 `+142%` 或 `4min➔1min`）以及高保真视觉锚点图。

### 2. 业务背景与现场矛盾 (Context & Stakeholder Map)
- **要求**：清晰阐述一线（医生/前台）与管理层（财务/经营）面临的真实业务冲突与信息断层，定义一句话设计挑战。

### 3. 策略演进与思考升级 (Product Strategy & Iteration)
- **要求**：展现思考从“单点界面”向“机制/系统”升级的轨迹（统一采用 GSAP 横向滑轨或时间轴展示 V1 → V2）。

### 4. 核心解法与系统架构 (Key Solutions & Architecture)
- **要求**：3 大核心解法必须使用 **Bento Grid（便当盒网格）** 结合配图承接，配有系统流程图或状态机。

### 5. ⭐️ 设计体系与 UI/UX 手艺细节 (Design System & UX Craft)
- **要求**：**【通用强约束】任何新案例必须包含此模块！**
  - **色彩/组件语义系统**（例：AI色 vs 人工色、警示色 vs 正常色）。
  - **视线引导与认知负荷控制**（例：暗光诊室/高频收银环境下的对比度与 F 型扫描）。
  - **组件规范与渐进式暴露**（例：置信度层级、手势/快捷键支持）。

### 6. 深度决策与方案权衡 (Design Decisions & Trade-offs)
- **要求**：至少挑选 3-4 个关键设计决策，清晰阐述 **方案 A vs 方案 B** 的推演过程与最终选择理由，必须覆盖**异常状态与兜底机制（Edge Cases）**。

### 7. 战果矩阵与界面全景 (Results & Interface Flow)
- **要求**：包含 Before / After / Delta 改版对比矩阵、落地规模，以及非对称瀑布流（Masonry Gallery）展示的完整高保真 UI 走查图。

---

## 🗂 新项目数据结构契约 (`src/data/projects.js` Standard Schema)

未来新增任何新项目时，在 `projects.js` 中填写的 JSON 对象必须符合以下字段契约：

```javascript
{
  id: 'new-project-id',
  title: { zh: '...', en: '...' },
  tag: { zh: '...', en: '...' },
  heroMetric: { before: '...', after: '...', label: { zh: '...', en: '...' } },
  role: { zh: '...', en: '...' },
  background: { zh: '...', en: '...' },
  process: [ /* V1, V2 演进卡片 */ ],
  solution: [ /* Bento 3大解法 */ ],
  designCraft: {
    colorSemantics: [ /* 色彩与组件语义 */ ],
    visualHierarchy: { zh: '...', en: '...' },
    components: [ /* 组件规范 */ ]
  },
  decisions: [ /* 方案 A vs B 决策堆叠卡片 */ ],
  detailMetrics: { headline: {...}, before: {...}, after: {...}, delta: {...} },
  images: [ /* 高清界面瀑布流 */ ]
}
```

---

## 🚫 质量控制红线 (Redlines)

1. **严禁纯需求文档化 (No Pure PRD)**：任何案例若缺少 `5. Design System & UX Craft` 模块，直接判定为未达标作品集。
2. **严禁死板长图堆砌 (No Static Image Dumps)**：界面展示必须结合 Bento 网格、GSAP 吸顶堆叠或非对称瀑布流呈现。
3. **双语全覆盖 (Mandatory Bilingual)**：所有新增文本必须同时支持中文与英文。
