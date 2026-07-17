# Hero 与 Portfolio 对齐 `new` 样式设计

## 概述

本次设计只处理 `old` 首页中的两个区块：

- `Hero`
- `Portfolio`

目标是让这两个区块在**视觉、布局和动效气质上尽量与 `PortfolioDesign-new` 一致**，同时继续保留 `old` 现有的内容来源、路由结构、多语言机制和 GSAP 动画体系。

这不是一次“局部美化”，而是一次**区块级重构**：

- `Hero` 从当前偏传统作品集首屏，调整为更接近 `new` 的单重心首页首屏
- `Portfolio` 从当前的“1 主 2 次”叙事结构，改成 `new` 的“3 张并列案例卡片”

## 设计目标

### 目标 1：Hero 视觉气质对齐 `new`

`Hero` 需要尽量接近 `new` 的观感特征：

- 更强的大标题比例
- 更克制的正文宽度
- 更弱的装饰背景
- 更明显的深色舞台感
- 更轻、更稳的入场节奏

但不复制 `new` 的 React 结构和 `motion/react` 实现方式。

### 目标 2：Portfolio 结构与样式对齐 `new`

`Portfolio` 必须不再保留当前的主次叙事结构，而改成和 `new` 一致的 3 张并列卡片。

每张卡片都应具备统一结构：

- 项目编号
- 英文 label
- 中文标题
- 项目摘要
- metric 数值
- metric 标签
- phase 标签
- 进入详情的动作提示

### 目标 3：保持 `old` 的内容与工程边界

本次改造只调整表达层，不重写内容体系：

- 继续使用 `old/src/locales/*.json` 作为文案来源
- 继续使用 `old/src/data/projects.js` 作为项目事实来源
- 继续使用 `react-router-dom` 的现有详情路由
- 继续使用 GSAP，不引入 `motion/react`

## 当前问题

### Hero 当前问题

当前 `Hero` 已有较好的暗色氛围和轻量动效，但与 `new` 相比仍有明显差异：

- 标题和正文的比例关系仍偏传统
- 视觉重心过于平均，缺少 `new` 那种单舞台式压强
- CTA 更接近传统双按钮 hero，不够像案例首页
- 背景层次偏“氛围化”，而不是 `new` 的“弱结构 + 深场景”

### Portfolio 当前问题

当前 `Portfolio` 与 `new` 的差异更大：

- 结构上仍是 `1 主 + 2 次`
- 内容组织偏“说明性”，不像作品入口
- 卡片层级、编号系统、metric 呈现和进入动作都不够强
- 页面观感更像“内容模块”，而不是“案例剧场”

## 设计决定

### 决定 1：Hero 采用 `new` 的单重心首屏结构

`Hero` 仍保留现有的文案键：

- `hero.meta.*`
- `hero.title`
- `hero.body`
- `hero.btn.*`

但版式调整为更接近 `new`：

- 顶部为弱化 meta 信息
- 主标题成为绝对视觉中心
- 正文宽度收窄，作为辅助说明
- CTA 仍保留两个动作，但整体权重更克制

### 决定 2：Hero 背景只保留轻量装饰，不做复杂主视觉

为了接近 `new` 的观感，同时避免在 `old` 中引入额外结构成本：

- 保留深色背景基底
- 保留弱光晕和轻微层次变化
- 不增加复杂几何主视觉
- 不引入图片或插画

这意味着本次 `Hero` 更接近 `new` 的**排版气质和氛围组织**，而不是完整复制其装饰系统。

### 决定 3：Portfolio 完全改为 3 张并列卡片

这是本次最重要的结构变更。

`Portfolio` 将不再区分：

- `featuredItem`
- `secondaryItems`

而是统一用同一种案例卡片渲染 3 个项目。

卡片顺序继续使用当前 3 个项目，但展示结构完全向 `new` 对齐。

### 决定 4：Portfolio 的卡片信息来自现有内容，不重做事实模型

卡片展示所需字段优先从以下来源提取：

- 标题：`projects.js` 或现有 locale 文案
- tag：当前 `portfolio.item.*.tag`
- 摘要：优先取 `body` 或经组合后的短说明
- 结果：优先从 `projects.js` 的 `result` 提炼

如果现有 locale 无法直接支撑 `new` 卡片格式，可以在 locale 中做最小增补，但不重写整套数据层。

### 决定 5：动效观感对齐 `new`，技术实现仍使用 GSAP

本次不引入新的动画库。

需要复现的动效类型：

- `Hero` 文案分层进入
- `Portfolio` 卡片逐张上移淡入
- 卡片 hover 时轻微抬升
- 必要的弱背景呼吸或微位移

不做的内容：

- 不复刻 `new` 的 `motion/react` 组件结构
- 不做复杂鼠标追踪几何装饰
- 不让动效压过内容本身

## 组件级设计

### Hero 组件

涉及文件：

- `old/src/components/Hero/index.jsx`
- `old/src/components/Hero/Hero.module.css`

设计要求：

- DOM 结构允许重组，但保留 `id="hero"` 和 CTA 锚点行为
- `kicker / meta / title / body / actions` 结构保持清晰分层
- 标题字号、间距、宽度和段落节奏尽量向 `new` 靠齐
- 背景改为更干净的深底和单一光晕主层

### Portfolio 组件

涉及文件：

- `old/src/components/Portfolio/index.jsx`
- 若当前全局样式承接该区块，还需调整 `old/src/styles/global.css`

设计要求：

- 改为统一的 3 张卡片网格
- 每张卡片都具备统一高度和统一信息层级
- 卡片底部必须有 metric 区和进入动作区
- 保留跳转到详情页的现有链接逻辑
- 视觉上尽量接近 `new` 的深色卡片、弱发光、圆角、边框和悬停反馈

## 数据映射设计

### Hero 数据来源

继续使用：

- `zh.json`
- `en.json`

本次不新增独立 `Hero` 数据文件。

### Portfolio 数据来源

继续保留两层来源：

- 文案展示层：`src/locales/*.json`
- 项目事实层：`src/data/projects.js`

实现时允许新增一个本地 `projectCards` 映射数组，用于把：

- 路由 slug
- label
- phase
- metric
- 文案 key

整理成卡片配置，但该映射应只服务当前组件，不扩散为新的全局数据层。

## 非目标

本次明确不做以下内容：

- 不调整详情页结构
- 不调整 `About`、`Experience`、`Contact`
- 不迁移 `PortfolioDesign-new` 的工程结构
- 不引入新的动画库
- 不整体重写 `old` 首页框架

## 验证标准

### 视觉标准

- `Hero` 首屏观感应明显更接近 `new`，而不是当前 `old`
- `Portfolio` 必须从“主次结构”变成“3 卡并列”
- 两个区块的间距、深色层次、卡片语言要统一

### 交互标准

- CTA 和案例卡片跳转保持正常
- GSAP 动效在桌面端正常运行
- `prefers-reduced-motion` 下应保持可读和可用

### 工程标准

- 不引入新的动画依赖
- 不破坏当前多语言机制
- 构建和现有测试不应因为本次改造而报错

## 范围判断

本规格只覆盖 `Hero + Portfolio` 两个区块，范围足够聚焦，可以直接进入实现计划，不需要继续拆分为多个子项目。
