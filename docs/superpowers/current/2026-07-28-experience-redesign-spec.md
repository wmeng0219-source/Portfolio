# Experience Section Editorial Redesign Spec

## 1. 背景与目标
当前作品集的 Experience 区块虽然去除了部分高亮背景，但整体结构仍带有卡片堆叠的遗留痕迹，未能完全展现出高级杂志编辑风 (Editorial Style) 的特质。
本方案旨在彻底重构 Experience 组件的 DOM 结构与 CSS 网格，采用**极端的非对称网格 (Asymmetric Grid)**与**顶线贯穿分割**，通过大幅度的留白与极简线条，营造出类似顶级设计机构介绍页的专业、克制感。

## 2. 核心架构与规范

### 2.1 不对称网格 (Asymmetric Grid)
- **桌面端比例**：采用 `1:3` 或精确的宽度（如左侧 `120px` - `160px`，右侧 `1fr`）的 CSS Grid 布局。
- **左侧列 (Metadata)**：极简，仅保留年份区间（如 `2021 — 2023`）。采用极小的字号、极宽的字距（`letter-spacing: 0.25em`）、全大写，颜色使用次级暗色（`var(--color-text-secondary)`）。这部分主要作用是提供极大的水平留白。
- **右侧列 (Content)**：承载核心信息。顶部为极大的公司与职位组合标题，紧接着是段落描述正文。

### 2.2 视觉分割与对齐 (Divider & Alignment)
- **顶线对齐 (Top Alignment)**：左侧的年份与右侧的大标题必须在同一条水平线上“起幅”（`align-items: start`），这是 Editorial 排版的核心原则。
- **横向贯穿线**：放弃所有卡片边框、垂直时间轴、圆点等装饰。每个项目组（甚至整个 Experience 区块的起始）仅使用一条贯穿容器宽度的横向顶边框 (`border-top: 1px solid var(--color-border)`) 进行物理分割。

## 3. 核心区块 DOM 改造方案

### 3.1 JSX 结构简化 (`src/components/Experience/index.jsx`)
需要重写映射渲染的逻辑，确保输出的 HTML 非常干净：
```html
<div class="experience-item">
  <div class="experience-meta">
    <span class="experience-period">2021 — 2023</span>
  </div>
  <div class="experience-content">
    <h3 class="experience-title">Company / Role</h3>
    <p class="experience-body">Description...</p>
  </div>
</div>
```

### 3.2 CSS 样式重写 (`src/styles/global.css`)
- 废除原有的 `.experience-stage-card-shell`, `.experience-stage-card-topline` 等复杂的内部 flex/grid 嵌套。
- 定义新的 `.experience-item` grid 结构。
- 增加项目的上下 `padding`（如 `padding: 4rem 0`），确保每段经历之间有足够的垂直呼吸空间。

## 4. 影响范围
- `src/components/Experience/index.jsx`
- `src/styles/global.css`

## 5. 预期结果
Experience 区域将完全脱离“卡片列表”或“常规时间轴”的俗套，变成一个由大量负空间（Negative Space）和精确排版支撑的高级信息流，完美契合 Dark Editorial 的深色温润感。
