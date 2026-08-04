---
name: portfolio-case-study-spec
description: Universal Portfolio Case Study Standard Architecture & Quality Redlines. Mandatory for creating, updating, or refactoring portfolio project case studies (PACS, Orthodontics, Member Automation, or new projects).
---

# 作品集通用案例标准规范技能 (Portfolio Case Study Spec Skill)

当用户要求创建、修改、新增或重构作品集项目案例（如 PACS AI、正畸筛查、会员自动化或任何新项目）时，**必须自动触发并严格遵循本规范**。

---

## 📌 通用案例 7 大必填契约 (Universal Module Contract)

未来的每一个项目案例页面，结构均**强制包含**以下 7 个模块：

```
[1. 首屏与战果] ➔ [2. 业务背景与矛盾] ➔ [3. 策略演进路径] ➔ [4. 核心解法 Bento]
                                                                  ↓
[7. 战果与界面全景] ⇦ [6. 决策与权衡 (A vs B)] ⇦ [5. ⭐️ 设计体系与手艺 (Design Craft)]
```

### 1. 核心首屏与角色 (Hero & Role)
- 一句话定位 + 个人明确角色分工 + 首屏最强数字战果 + 高保真视觉锚点图。

### 2. 业务背景与现场矛盾 (Context & Stakeholder Map)
- 真实业务冲突 + 角色信息断层图 + 一句话设计挑战定义。

### 3. 策略演进与思考升级 (Product Strategy & Iteration)
- 思考从“单点界面”向“机制/系统”升级的轨迹（采用 GSAP 横向滑轨展示 V1 → V2）。

### 4. 核心解法与系统架构 (Key Solutions & Architecture)
- 3 大核心解法必须使用 **Bento Grid（便当盒网格）** 结合配图承接，配有系统流程图/状态机。

### 5. ⭐️ 设计体系与 UI/UX 手艺细节 (Design System & UX Craft)
- **【全站强约束红线】未来新增或重构任何案例均必须包含此模块！**
  - **色彩/组件语义系统**（例：AI色 vs 人工色、警示色 vs 正常色）。
  - **视线引导与认知负荷控制**（例：暗光诊室/高频收银环境下的对比度与 F 型扫描）。
  - **组件规范与渐进式暴露**（例：置信度层级、手势/快捷键支持）。

### 6. 深度决策与方案权衡 (Design Decisions & Trade-offs)
- 3-4 个关键设计决策（GSAP 吸顶堆叠），清晰阐述 **方案 A vs 方案 B** 的推演过程与最终选择理由，必须覆盖**异常状态与兜底机制（Edge Cases）**。

### 7. 战果矩阵与界面全景 (Results & Interface Flow)
- Before / After / Delta 改版对比矩阵、落地规模，以及非对称瀑布流（Masonry Gallery）展示的完整高保真 UI 走走查图。

---

## 🗂 统一数据规范 (`src/data/projects.js`)

在 `src/data/projects.js` 中新增或修改数据时，必须符合以下结构：

```javascript
{
  id: 'project-id',
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
  decisions: [ /* 方案 A vs B 决策卡片 */ ],
  detailMetrics: { headline: {...}, before: {...}, after: {...}, delta: {...} },
  images: [ /* 高清界面瀑布流 */ ]
}
```

---

## 🚫 质量控制 3 大红线 (Redlines)

1. **红线 1：严禁纯需求文档化** —— 任何新项目如果只写业务逻辑不写 `5. Design System & UX Craft`，一律视为未达标。
2. **红线 2：严禁静态死板列表** —— 界面展示必须结合 Bento 网格、GSAP 堆叠或非对称瀑布流。
3. **红线 3：强约束中英双语** —— 所有新增字段必须同时支持中英文。
