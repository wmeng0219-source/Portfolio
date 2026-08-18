> **已归档（2026-08-14）**：本计划方向已被 `DESIGN.md` v3（2026-08-14 参考站机制对齐改版）取代，未执行项不再单独推进。参见 `docs/superpowers/plans/current/2026-08-14-reference-alignment-redesign.md`。

# Dark Editorial Style Redesign Spec

## 1. 背景与目标
当前作品集采用深色主题（#090909）及卡片式包裹布局，经历区使用了对比度极强的浅色卡片，整体视觉元素较多。
在抓取并分析了参考站 (harrisonwheeler.com) 真实的 CSS 变量后，本方案旨在将项目重构为**“高级深色编辑风 (Dark Editorial)”**。核心目标是通过调优深色底色（引入紫灰倾向）、去除冗余的卡片边框与强阴影、强化字体层级对比，来提升整体的专业度与资历感。

## 2. 核心架构与规范

### 2.1 全局色彩 (Color Palette)
参考站真实色系提取，并适配当前项目：
- **Background**: `#0d0c11` (极深的紫黑色，替代原本的 `#090909`)
- **Surface**: `#16151c` (次级深色表面，用于极弱的区分)
- **Text Primary**: `#ece9f1` (偏紫的亮白，替代原本的 `#f4f1e9`)
- **Text Secondary**: `#a39fb0` (紫灰色次级文字，替代原本的低透明度白)
- **Border/Divider**: `#2a2833` (极暗的紫灰色，用于隐形分割线)
- **Accent**: `#d0bcff` (淡紫罗兰色，用于 hover、眉题 Kicker 和强调标签)

### 2.2 排版策略 (Typography)
- **字号与层级**：增大 Title 与 Body 的字号反差，标题更粗，正文更清晰。
- **排版节奏**：增加正文行高，制造深色背景下的呼吸感。
- **信息引导**：大量使用字重（Font-weight）与全大写小字（Kicker/Label）配合淡紫罗兰强调色来区分层级，取代原本的卡片底色。

## 3. 核心区块 DOM 改造方案

### 3.1 作品区 (Portfolio)
- **DOM 拆壳**：移除 `.portfolio-feature-card`, `.portfolio-side-card` 的强渐变背景和 `.portfolio-card-sheen` 的发光层。
- **结构重组**：转为大留白的网格或列表排版。项目容器背景改为透明或极暗的 `#16151c`，边框改为极弱的 `#2a2833`，甚至仅保留上下分割线。
- **交互**：移除大范围的 translateY 和发光效果，改为标题颜色变淡紫罗兰色 (`#d0bcff`) 或细微的图片遮罩反馈。

### 3.2 经历区 (Experience)
- **色调反转与拆壳**：彻底废弃原本突兀的亮色背景 (`--color-light-bg`) 和玻璃态卡片。
- **结构重组**：融入深色背景，改为经典的编辑感时间线排版。左侧小字时间/公司，右侧大标题职位+描述。项目之间仅用 `#2a2833` 细线隔开。

### 3.3 联系区 (Contact)
- **DOM 拆壳**：移除原本的线框按钮。
- **结构重组**：用超大号字体直接作为交互热区，配合大面积留白。

## 4. 影响范围
- `src/styles/variables.css`
- `src/styles/global.css`
- `src/components/Portfolio/index.jsx`
- `src/components/Experience/index.jsx`
- `src/components/Contact/index.jsx`

## 5. 预期结果
整个站点将在保持深色科技感的同时，变得极其干净、温润。视觉焦点将完全转移到排版层级、文案内容和淡紫色的点缀上，呈现出高级个人顾问的质感。
