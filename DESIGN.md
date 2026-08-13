# Design System: Complex Systems Portfolio

> Version 3.0 · Product Manager for Complex Systems, with a Design Background
> 本文档是本项目唯一的视觉、布局、组件与动效规范。任何页面、组件、CSS 变量或动画实现都必须先遵守本文档。
>
> **V3 变更摘要**（2026-08-14）：对齐 Harrison Wheeler 参考站的视觉机制——字体真实落地（Anton Display + Merriweather 衬线叙事 + Hanken Grotesk 正文 + IBM Plex Mono 标签）、色彩角色重定义（薄荷绿用于大标题渐变、浅粉用于案例标题渐变、紫色只做主交互）、Portfolio 启用 sticky 黏性堆叠与超大渐变标题、Hero 简化为渐变巨标题 + 衬线 lede。V2 中"Neudron / GT America"为未加载的假字体声明，已删除。

---

## 1. Visual Theme & Atmosphere

这是一个为复杂业务系统产品经理建立的深色编辑型作品集系统。它用强排版、结构化证据与克制动效，把复杂项目组织成可以快速扫描、继续深读并验证判断的叙事，而不是把页面做成模板化的视觉作品陈列。

### 1.1 品牌定位

作品集的目标不是证明“会做漂亮界面”，而是证明：能够理解复杂业务、建立系统模型、推动跨团队决策，并用设计能力让复杂问题变得可理解、可执行、可验证。

核心定位：

- 中文：具有设计背景的复杂业务系统产品经理
- English: Product Manager for Complex Systems, with a Design Background
- 主要受众：招聘经理、产品负责人、设计负责人、业务决策者
- 第一印象：清晰、成熟、克制、有判断力
- 阅读结果：访客能快速理解“问题有多复杂、作者做了什么决策、为什么这样做、结果如何”

### 1.2 设计方向

视觉采用深色编辑型作品集语言：全视口开场、强烈但不喧闹的排版层级、演示文稿式章节节奏、结构化产品证据和克制的滚动动效。页面应像一场经过剪辑的产品评审，而不是卡片合集，也不是营销落地页。

本系统参考 Harrison Wheeler 网站的以下方法，但不复制其个人品牌：

- 借用：固定居中胶囊导航、全视口 Hero、超大渐变 Display 标题、衬线叙事层、留白节奏、黏性案例堆叠、文件夹式卡片描边、轻量进入动画、移动端重排。
- 保留：本项目深色底色（`#0d0c11`）、Lavender / Mint 主色与 Anton / Hanken Grotesk / IBM Plex Mono 字体体系；新增 Merriweather 衬线叙事层与浅粉标题渐变（见 §2、§3）。
- 改造：案例内容从视觉展示转为“背景 → 约束 → 决策 → 系统 → 结果 → 反思”的产品叙事。
- 拒绝：照搬参考网站的字体文件、文案、作品结构或个人识别元素；不引入未加载的假字体声明。

### 1.3 Key Characteristics

1. **Editorial, not decorative**：大标题用于建立章节与观点，不用于填满每个模块；标题可用同色系渐变填充制造编辑张力，但禁止光球、霓虹与玻璃拟态泛滥。
2. **Evidence over claims**：界面截图、流程图、数据和决策依据优先于抽象形容词。
3. **One focal point per viewport**：每个视口只建立一个主要视觉焦点；首屏焦点是渐变 Display 姓名，案例区焦点是超大渐变标题的黏性卡片。
4. **Quiet confidence**：动效、辉光和强调色都服务于阅读，不表演技术。
5. **System clarity**：用网格、编号、标签、连接线和对比结构表达复杂系统。

### 1.4 体验关键词

`Editorial` · `Systematic` · `Strategic` · `Precise` · `Calm` · `Human`

不使用以下方向：

- 通用 SaaS 落地页、模板化 Bento Grid、过量小卡片。
- 大面积霓虹光污染、装饰性玻璃拟态、装饰性 3D 球体。
- Dribbble 式只展示结果图、不解释约束与决策。
- 把所有标题都做成 Hero 尺寸，或用动效掩盖内容不足。
- 声明未加载的字体（如 `Neudron`、`GT America`）造成静默 fallback。

---

## 2. Color Palette & Roles

### 2.1 Semantic Tokens

```css
:root {
  color-scheme: dark;

  --color-bg: #0d0c11;              /* Midnight Base（页面底色） */
  --color-surface: #16151c;         /* Dark Surface（卡片/导航） */
  --color-surface-elevated: #1f1d26;/* Elevated Surface（浮层/悬浮） */
  --color-border: #2a2833;          /* Hairline Border */

  --color-text-primary: #ece9f1;
  --color-text-secondary: #a39fb0;
  --color-text-tertiary: #75717f;

  --color-accent: #d0bcff;          /* Digital Lavender（主交互） */
  --color-mint: #b9f2c8;            /* System Mint（大标题渐变/结果） */
  --color-pink: #ffd8e4;            /* Soft Pink（案例标题渐变/装饰） */

  --color-on-accent: #381e72;       /* 紫色按钮上的文字 */

  --color-focus: #d0bcff;
}
```

### 2.2 Primary & Surface Roles

| Role | Semantic name | Value | Usage |
| --- | --- | --- | --- |
| Page background | Midnight Base | `#0D0C11` | 页面背景、Hero、页脚 |
| Surface | Dark Surface | `#16151C` | 案例卡、内容区、导航背景 |
| Elevated surface | Elevated Surface | `#1F1D26` | 浮层、重点数据、悬浮状态 |
| Primary text | Soft White | `#ECE9F1` | 标题、关键结论 |
| Secondary text | Cool Grey | `#A39FB0` | 正文、说明 |
| Tertiary text | Dim Grey | `#75717F` | 元数据、禁用态 |
| Border | Hairline | `#2A2833` | 卡片、分隔线、导航描边 |

### 2.3 Accent Roles

| Token | Value | Role | 使用上限 |
| --- | --- | --- | --- |
| Digital Lavender | `#D0BCFF` | 主 CTA、链接、焦点环、关键路径 | 单屏可见面积约 8% |
| System Mint | `#B9F2C8` | 大标题渐变、成果、已验证状态 | 标题渐变与结果标记 |
| Soft Pink | `#FFD8E4` | 案例卡片标题渐变、小面积装饰 | 标题渐变与 hover 填充 |

规则：

- 三种强调色职责固定：**Lavender 负责行动，Mint 负责大标题与结果，Pink 负责案例标题与装饰**。不得互换职责。
- 标题渐变使用**同色系内部渐变**（Mint→浅 Mint、Pink→白），禁止紫绿、紫粉跨色相渐变。
- 禁止用渐变作为页面背景；禁止制造彩色光球或模糊色斑。允许低透明度装饰（如参考站的浅粉 badge 描边）。
- 文本与背景对比度：普通文本至少 `4.5:1`，大文本至少 `3:1`。
- 不引入第四种品牌强调色。错误、警告等系统状态优先使用图标、文案和边框模式。

### 2.4 Quick Color Reference

- 页面底色：`var(--color-bg)`
- 默认卡片：`var(--color-surface)` + `var(--color-border)`
- Hover 表面：`var(--color-surface-elevated)`
- 正文：`var(--color-text-secondary)`
- 主操作：`var(--color-accent)` + 文字 `var(--color-on-accent)`
- Hero 大标题渐变：`linear-gradient(to top, #b9f2c8 0%, #d9f8e3 42%, #ece9f1 100%)`（background-clip: text）
- 案例标题渐变：`linear-gradient(to bottom, #ffd8e4 0%, #ffffff 62%)`（background-clip: text）
- 结果数据：`var(--color-mint)`
- 键盘焦点：`2px solid var(--color-focus)`，外偏移 `3px`

---

## 3. Typography Rules

### 3.1 Font Family

```css
:root {
  --font-display: "Anton", "Hanken Grotesk", sans-serif;
  --font-body: "Hanken Grotesk", "Inter", -apple-system, "Segoe UI", sans-serif;
  --font-serif: "Merriweather", Georgia, serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;
}
```

- `Anton`：只用于拉丁字母的 Display（姓名、英文标题、章节编号），全大写、可配合 `scaleY(1.05–1.2)` 纵向拉伸与渐变填充。Anton 不含中文字形。
- `Merriweather`（weight 300/400）：衬线叙事层——Hero lede、卡片 meta、案例摘要等需要编辑感的长句。**这是参考站的关键视觉机制**。
- `Hanken Grotesk`：正文、按钮、中英文标题与所有高频阅读内容（Anton 不覆盖中文，中文大标题回退到 Hanken Grotesk 700/800）。
- `IBM Plex Mono` / `JetBrains Mono`：标签、年份、数据单位、系统字段和图表注释。
- 所有声明的字体必须真实加载（Google Fonts 或自托管），禁止声明未加载的字体名。

### 3.2 Fluid Type Scale

所有标题和正文必须使用 `clamp()`，不得只写固定字号。禁止用 `vw` 单独控制字号。

| Role | Font | Size | Weight | Line height | Letter spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Display XL | Anton | `clamp(4.5rem, 14.5vw, 11rem)` | 400 | `0.92` | `0` | 首页姓名，可 `scaleY(1.15)` 拉伸 + Mint 渐变 |
| Display L | Anton | `clamp(3.5rem, 8vw, 7.5rem)` | 400 | `0.92` | `0` | 案例大标题（拉丁） |
| Case Card Title | Hanken / Anton | `clamp(2.5rem, 6.5vw, 5.5rem)` | 700–800 | `0.92` | `-0.01em` | 案例卡超大标题，Pink→白渐变 |
| H1 | Hanken | `clamp(2.75rem, 6vw, 5.5rem)` | 700 | `1.0` | `-0.02em` | 页面主标题 |
| H2 | Hanken | `clamp(2rem, 4vw, 3.75rem)` | 700 | `1.08` | `-0.02em` | 一级章节标题 |
| H3 | Hanken | `clamp(1.5rem, 2.5vw, 2.25rem)` | 600 | `1.18` | `-0.01em` | 模块标题 |
| H4 | Hanken | `clamp(1.125rem, 1.5vw, 1.375rem)` | 600 | `1.3` | `0` | 卡片内标题 |
| Lede（衬线叙事） | Merriweather | `clamp(1.25rem, 2.2vw, 2rem)` | 300 | `1.4` | `0` | Hero 定位句、案例 meta |
| Lead | Hanken | `clamp(1.25rem, 2vw, 1.75rem)` | 400 | `1.5` | `0` | 核心摘要、观点 |
| Body L | Hanken | `clamp(1.0625rem, 1.3vw, 1.25rem)` | 400 | `1.7` | `0` | 案例叙事正文 |
| Body | Hanken | `clamp(1rem, 1vw, 1.125rem)` | 400 | `1.65` | `0` | 通用正文 |
| Small | Hanken | `clamp(0.875rem, 0.9vw, 1rem)` | 450 | `1.5` | `0` | 注释、辅助说明 |
| Label | IBM Plex Mono | `clamp(0.72rem, 0.8vw, 0.85rem)` | 500 | `1.4` | `0.18em` | 标签、编号、年份（大写） |

### 3.3 Typographic Principles

- 拉丁 Display 标题：全大写、每行建议 `6–10` 个词；中文大标题每行建议 `6–10` 个汉字。
- 正文最大行宽 `68ch`，核心摘要最大 `52ch`，元数据最大 `36ch`。
- 中文正文使用自然换行；英文标题使用 `text-wrap: balance`。
- 标题可适度负字距（`-0.01em` 至 `-0.04em`），正文字距为 `0`。
- 数字与单位不换行；数据数字可用 `font-variant-numeric: tabular-nums`。
- 每个段落只表达一个论点，正文段落建议 `2–5` 行。
- 衬线叙事层（Lede/Meta）是编辑感的来源，必须有别于正文的密度与字号，不能与正文混淆。

---

## 4. Component Stylings

### 4.1 Navigation

固定居中的胶囊导航是网站的主要识别组件：

```css
.site-nav {
  position: fixed;
  inset-block-start: 24px;
  inset-inline-start: 50%;
  z-index: 100;
  transform: translateX(-50%);
  min-height: 48px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: rgba(22, 21, 28, 0.82);
  backdrop-filter: blur(16px);
}
```

- Desktop：品牌标识 + 3–4 个主导航项 + 联系入口；不得超过 6 个可见入口。
- Mobile：保留品牌标识和菜单按钮，展开为全宽暗色面板。
- 当前项用文字高对比和轻微表面变化表示，不依赖下划线动画。
- 导航按钮最小触控区域 `44 × 44px`。
- 页面滚动后可轻微提升背景不透明度，但不可改变尺寸造成跳动。

### 4.2 Hero

Hero 是作品集定位，不是功能介绍卡片。

- 最小高度：Desktop `100svh`；Mobile `100svh`。
- 内容不放在卡片中，直接位于页面背景上。
- Desktop：姓名或定位占据主要画面；简介与 CTA 放在下部。
- Mobile：主标题保持强度，CTA 靠近视口底部纵向排列且全宽。
- 首屏必须露出下一章节的视觉提示：章节编号、标题上沿或滚动引导，不能形成封闭海报。
- Hero 最多一个主 CTA 和一个次 CTA。

推荐结构：

```text
[Fixed navigation]
[Mono eyebrow: ROLE / LOCATION / YEAR]
[Display 姓名（Anton 全大写，Mint→白渐变，可 scaleY 拉伸）]
[Merriweather 衬线定位句，max 2 行]
[Primary CTA] [Secondary CTA]          [Scroll cue / next section hint]
```

背景规则：

- 背景保持**纯净深色**：可以保留极弱网格线或单一水印字，但**移除聚光灯跟随、大范围光晕、霓虹渐变**——参考站 Hero 的冲击力来自标题本身，不来自背景特效。
- 允许标题逐字/整行入场（`opacity + y` 揭示，见 §7），不允许持续漂移、闪烁或滚动光效。

### 4.3 Buttons and Links

| Variant | Background | Text | Border | Use |
| --- | --- | --- | --- | --- |
| Primary | `#D0BCFF` | `#381E72` | transparent | 查看案例、联系 |
| Secondary | `#1F1D26` | `#ECE9F1` | `#2A2833` | 简历、补充路径 |
| Text link | transparent | `#D0BCFF` | none | 正文链接、次级跳转 |

按钮规范：

- 高度 `56px`（紧凑场景最低 `48px`），水平内边距 `28px`。
- 胶囊圆角 `9999px`；图标与文字间距 `8px`。
- Hover：`translateY(-1px)` 至 `-2px`；Active：`translateY(0) scale(0.99)`。
- 不使用 `-4px` 以上的悬浮位移，不使用持续辉光。
- `:focus-visible` 必须保留清晰焦点环。
- 主按钮文字使用 `var(--color-on-accent)`（深紫），保证对比度。

### 4.4 Cards and Containers

首页项目不是彼此独立的小卡片，而是一组按顺序展开的案例章节。

- Desktop 使用大幅双栏卡片：媒体约 `58%`，文本约 `42%`，相邻项目交替方向。
- 背景 `#16151C`，文件夹式描边：顶部圆角 `24px`，用 masked `::before` 绘制 1px 边框并向下渐隐（参考站机制）；不使用完整闭合矩形边框。
- 卡片标题为超大渐变文字（见 §3.2 Case Card Title），hover 时渐变填充为全 Pink。
- 内边距：`clamp(28px, 3.5vw, 52px)`。
- 媒体容器：16/10 或 16/9 比例、圆角 `16px`、真实产品图或系统蓝图、`object-fit: cover`、1px 边框 + 深色阴影。
- 每张卡只包含：编号、项目名、业务问题、角色、时间、1–2 个结果、明确 CTA。
- Hover 只改变边框、渐变填充和整体 `translateY(-2px)`；内容布局不位移。

**Card Tokens**

- Surface: `#16151C`
- 描边: `rgba(255, 255, 255, 0.16)`，顶部圆角 `24px`
- 标题渐变: `linear-gradient(to bottom, #ffd8e4 0%, #ffffff 62%)`（hover 填满为 `#ffd8e4`）
- Signature shadow: `0 16px 48px rgba(0, 0, 0, 0.4)`

### 4.5 Sticky Case Stack

这是从参考网站抽取并适配后的标志性模式，只用于首页 3–5 个重点案例。

```css
.project-card {
  position: sticky;
  top: clamp(80px, 10vh, 120px);
  min-height: min(76svh, 760px);
  border-radius: 24px 24px 0 0;
}

.project-card + .project-card {
  margin-top: clamp(64px, 10vh, 120px);
}
```

- 每张后续卡片的 `top` 可增加 `8px`，最多堆叠 4 层。
- 父容器不得设置会破坏 sticky 的 `overflow: hidden/auto`。
- 内容高度超过视口时取消 sticky，避免正文无法滚动。
- Mobile 低高度设备（`max-height: 700px`）和 reduced motion 模式取消 sticky。
- Sticky 本身优先用 CSS；只有需要精确 pin、进度联动时才使用 ScrollTrigger。

### 4.6 Metrics

- 每组 `1–3` 个指标，数字大、说明短、口径明确。
- 数字使用 H2/H3 级别，颜色为 Soft White 或 System Mint。
- 标签使用 Mono；说明必须写清基线、时间或样本，避免孤立百分比。
- 无可靠定量结果时使用可验证定性证据，不虚构数字。

### 4.7 Diagrams

- 节点背景用 Dark / Elevated Surface，主路径用 Lavender，验证结果用 Mint。
- 连接线 `1px rgba(255, 255, 255, 0.22)`，箭头方向清晰。
- 一个图只表达一个关系：流程、角色、信息或状态，不混合四种语义。
- 图中正文不低于 `14px`；移动端优先改为纵向流程或可横向滚动的完整图。
- 不用装饰性网络线、无意义节点或假数据制造“复杂感”。

### 4.8 Image Treatment

- 优先：真实产品界面、研究材料、流程图、决策记录、前后对比。
- 媒体必须带简短 caption，说明“看什么”和“为什么重要”。
- 截图保持清晰，不使用过暗遮罩或模糊背景影响检查。
- 容器：`16px` 圆角、hairline 边框、深色阴影（`0 16px 48px rgba(0,0,0,0.4)`）。
- 多图展示用无框网格或横向轨道；禁止卡片套卡片。
- 所有图片设置稳定 `aspect-ratio`，避免加载时布局跳动。

### 4.9 Case Detail Components

每个案例详情页统一位于 `src/pages/cases/<CaseName>/`，自包含 JSX 与 CSS 模块，由 `ProjectDetail/index.jsx` 路由分发。视觉规则仍只来自本文档。

案例页推荐组件：

- Case Hero：项目名、业务问题、角色、周期、团队、主结果。
- Context Strip：关键约束与范围，不使用一排装饰 badge。
- Decision Block：决策、依据、被放弃的方案、影响。
- Evidence Figure：图像 + caption + 来源或时间。
- Metric Row：结果与口径。
- Reflection：不足、后续验证、个人判断变化。
- Next Case：下一个项目的完整标题与一句差异化说明。

---

## 5. Layout Principles

### 5.1 Container & Grid

```css
:root {
  --page-gutter: clamp(20px, 3vw, 32px);
  --content-max: 1320px;
  --reading-max: 760px;
  --grid-gap: clamp(16px, 2vw, 32px);
}

.page-shell {
  width: min(100% - (2 * var(--page-gutter)), var(--content-max));
  margin-inline: auto;
}
```

- Desktop：12 列网格；Tablet：8 列；Mobile：4 列。
- 主要案例可使用 7/5 或 8/4 比例，不固定使用 60/40。
- 长正文限制在 `var(--reading-max)`，不要横跨整个桌面。
- 区块是无框的全宽章节；卡片只用于项目、浮层或真正需要边界的工具。

### 5.2 Spacing System

基础单位为 `8px`：

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | `4px` | 图标内部、细节修正 |
| `space-2` | `8px` | 标签间距 |
| `space-3` | `16px` | 紧凑组件 |
| `space-4` | `24px` | 卡片内容组 |
| `space-5` | `32px` | 标准内容间隔 |
| `space-6` | `48px` | 模块间隔 |
| `space-7` | `64px` | 大模块内部 |
| `space-8` | `80px` | 移动端章节 |
| `space-9` | `120px` | 桌面章节 |
| `space-10` | `160px` | 章节转场，谨慎使用 |

章节垂直间距：Desktop `clamp(96px, 10vw, 160px)`；Mobile `clamp(64px, 16vw, 96px)`。

### 5.3 Border Radius Scale

| Token | Value | Use |
| --- | --- | --- |
| Small | `4px` | 小标签、状态标记 |
| Standard | `12px` | 按钮以外的标准组件、媒体 |
| Large | `16px` | 媒体容器、次级卡片 |
| Folder Top | `24px` | 首页案例卡顶部（sticky 堆叠） |
| Pill | `9999px` | 导航、按钮、胶囊标签 |

不自行使用 `6px`、`8px`、`20px` 等新圆角。组件嵌套时，内层圆角必须小于外层。

### 5.4 Case Study Narrative

每个案例遵循同一逻辑，但不要求页面视觉完全相同：

1. **Signal**：一句话说明业务问题与结果，让访客决定是否继续。
2. **Context**：业务背景、用户、范围、角色与不可改变的约束。
3. **Diagnosis**：如何发现真正的问题，展示证据而非只给结论。
4. **Decision**：关键取舍、备选方案、判断依据和跨团队协作。
5. **System**：产品结构、流程、机制或策略如何工作。
6. **Validation**：结果、口径、反馈，以及哪些仍未被证明。
7. **Reflection**：如果重做会改变什么，体现判断成长。

章节标题应表达观点，例如“问题不在搜索，而在检查责任断裂”，不要只写“Research”或“Solution”。

### 5.5 Whitespace Philosophy

- 留白用于分隔论点，不是为了显得高级而稀释内容。
- 高密度证据区之后安排低密度总结区，形成阅读呼吸。
- 同一屏出现超过 3 个同等级焦点时，应合并、降级或拆分。
- 首页扫描优先；案例页深读优先。两者不能使用完全相同的信息密度。

---

## 6. Depth & Elevation

### 6.1 Elevation Scale

| Level | Treatment | Use |
| --- | --- | --- |
| 0 Canvas | `#0D0C11` | 页面背景 |
| 1 Surface | `#16151C` + subtle border | 静态内容与项目卡 |
| 2 Elevated | `#1F1D26` + default border | Hover、浮层、重点数据 |
| 3 Overlay | translucent surface + blur | 固定导航、菜单、模态框 |

```css
:root {
  --shadow-media: 0 16px 48px rgba(0, 0, 0, 0.4);
  --shadow-overlay: 0 20px 64px rgba(0, 0, 0, 0.5);
  --shadow-focus: 0 0 0 4px rgba(208, 188, 255, 0.18);
}
```

### 6.2 Depth Rules

- 深度主要通过表面亮度、hairline 边框和遮挡顺序表达，阴影只做辅助。
- 默认卡片不发光；Hover 可使用 `rgba(208,188,255,0.34)` 边框，但不做大范围紫色辉光。
- 固定导航可用 `backdrop-filter`，普通卡片禁止玻璃拟态。
- 同屏最多使用三层可感知深度，避免所有组件都浮起来。

---

## 7. Interaction Patterns

### 7.1 Motion Philosophy

动效的任务是建立阅读顺序、解释空间关系和确认交互结果。整体手感应平稳、克制、接近编辑剪辑。不存在业务意义的动画不应加入。

动效技术分层：

- **CSS transitions**：按钮、链接、卡片 Hover、Focus、菜单图标等局部状态。
- **GSAP Core / Timeline**：首屏进入、需要明确先后关系的章节编排。
- **ScrollTrigger**：只用于 pin、scrub、滚动进度或 sticky 无法表达的叙事。
- **CSS sticky**：普通黏性案例堆叠的首选，不为“用了 GSAP”而改成 JS。

### 7.2 Motion Tokens

```css
:root {
  --duration-instant: 120ms;
  --duration-fast: 200ms;
  --duration-base: 360ms;
  --duration-reveal: 750ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --reveal-distance: 30px;
}
```

| Pattern | Duration | Distance / scale | Ease | Notes |
| --- | --- | --- | --- | --- |
| Hover | `200ms` | `-1px` to `-3px` | standard | 不改变布局 |
| Press | `120ms` | `scale(0.99)` | exit | 立即反馈 |
| Reveal | `750ms` | `y: 30 → 0` | standard | `opacity: 0 → 1` |
| Stagger | `60–90ms` | — | standard | 一组最多 6 项 |
| Menu open | `360ms` | `y: -8 → 0` | standard | 背景同步淡入 |
| Media zoom | `360ms` | `1 → 1.015` | standard | 容器裁切 |
| Title gradient fill | `600ms` | `background-position` | standard | 卡片标题 hover 填满 |

### 7.3 Reveal Rules

- 首屏顺序：eyebrow → Display → 衬线 lede → actions，每步重叠而非逐个等待。
- 滚动 Reveal 默认 `once: true`，触发点约为元素顶部进入视口 `85%`。
- 一屏最多两组 Reveal；长文段落不逐行弹出。
- 不对导航、正文阅读核心或关键 CTA 设置长时间不可见初态。
- 不使用旋转、弹跳、随机位移或过度 stagger。

GSAP 示例：

```js
const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

timeline
  .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 16, duration: 0.5 })
  .from("[data-hero-title]", { autoAlpha: 0, y: 30, duration: 0.75 }, "-=0.25")
  .from("[data-hero-lede]", { autoAlpha: 0, y: 24, duration: 0.65 }, "-=0.42")
  .from("[data-hero-action]", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08 }, "-=0.35");
```

### 7.4 ScrollTrigger Rules

- 优先少量 section 级 Trigger，不为每个文字节点创建 Trigger。
- `scrub` 仅用于进度具有语义的动画，如流程推进、对比切换。
- Pin 区域必须提供足够滚动距离，且不能让用户误以为页面卡死。
- 响应式逻辑使用 `gsap.matchMedia()`；不同断点分别建立和清理 Trigger。
- 图像加载、字体加载或布局变化后再 `ScrollTrigger.refresh()`。
- 默认不使用 ScrollSmoother；原生滚动优先。

### 7.5 React + GSAP Lifecycle

React 页面优先使用 `@gsap/react` 的 `useGSAP()`；使用单一根 `ref` 和 scoped selector；依赖变化需要重建时使用 `revertOnUpdate: true`；事件回调产生的动画使用 `contextSafe()`；页面卸载后不得保留 timeline、listener 或 ScrollTrigger。

### 7.6 Performance Rules

- 动画只改变 `transform` 和 `opacity`（渐变填充例外：`background-position`）。
- `will-change` 只在动画即将发生时添加，结束后移除。
- 每页 ScrollTrigger 数量保持可解释且尽量少。
- 图片提供正确尺寸、响应式源和懒加载；首屏主图不懒加载。
- 动效不能造成 CLS；所有固定格式媒体和图表先定义尺寸或 `aspect-ratio`。

### 7.7 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }

  .project-card {
    position: relative;
    top: auto;
  }
}
```

- JS 在创建 timeline / ScrollTrigger 前检查媒体查询。
- Reduced motion 下直接呈现最终状态，禁止用极短动画伪装“支持”。

---

## 8. Responsive Behavior

### 8.1 Breakpoints

| Name | Width | Grid | Gutter | Key changes |
| --- | --- | --- | --- | --- |
| Mobile | `< 768px` | 4 columns | `20px` | 章节间距 `64–96px`，单栏重排 |
| Tablet | `768–1199px` | 8 columns | `24px` | 章节间距 `80–120px`，压缩双栏 |
| Desktop | `≥ 1200px` | 12 columns | `32px` | 章节间距 `96–160px`，完整叙事布局 |

### 8.2 Collapsing Strategy

Desktop → Mobile 的变化不是简单缩小：

- Hero：保持 `100svh`；简介缩短；按钮移至底部并纵向全宽排列。
- Navigation：完整链接收进菜单；保留 44px 触控目标。
- Project Card：双栏变单栏，媒体优先显示，文本随后；取消不适合低视口的 sticky。
- Case Detail：侧栏元数据移到正文前；多列指标变为 1–2 列。
- Diagrams：先改成纵向结构；无法重排时允许明确的横向滚动。
- Footer：多列导航变为分组列表。

### 8.3 Touch & Input

- 所有触控目标至少 `44 × 44px`，相邻目标间距至少 `8px`。
- Hover 效果不能承载唯一信息。
- 菜单打开时管理焦点、锁定背景滚动并支持 Escape 关闭。

---

## 9. Content & Messaging Patterns

### 9.1 Voice

语气专业、直接、具体，以判断和证据建立可信度。少说“赋能、创新、极致、全链路”等空泛词，避免把团队成果全部写成个人英雄叙事。

推荐句式：

- “在三种约束同时存在时，我把优先级从功能覆盖转向错误恢复。”
- “研究显示问题不是入口不可见，而是责任状态在交接后丢失。”
- “这个结果证明了流程可用，但尚不能证明长期留存。”

不推荐：

- “我打造了行业领先的创新体验。”
- “通过深入洞察赋能业务增长。”
- 只有过程名词，没有发现、判断与影响。

### 9.2 Density

- 首页项目摘要：`80–140` 个中文字符，回答问题、角色、结果。
- 案例开场摘要：`120–220` 个中文字符。
- 每个正文段落：`60–160` 个中文字符，超过则拆分观点。
- 图注：一句说明内容，一句说明意义。
- 每个案例至少展示 2 个关键决策和 1 个未解决问题。

### 9.3 Labels

标签使用事实而非评价：

- 推荐：`ROLE / PRODUCT STRATEGY`、`SCOPE / 3 WORKFLOWS`、`OUTCOME / -32% REVIEW TIME`
- 避免：`AMAZING WORK`、`BEST PROJECT`、`INNOVATIVE`

---

## 10. Do's and Don'ts

### Do

- 用一条强主线组织每个页面，让每屏只承担一个核心论点。
- 展示问题结构、取舍过程、产品机制与结果口径。
- 使用真实界面和清晰图表，让访客可以检查细节。
- 用渐变 Display 大标题与衬线叙事层建立编辑感。
- 保持 Lavender 负责行动、Mint 负责标题与结果、Pink 负责案例标题的稳定语义。
- 用 CSS sticky 和轻量 Reveal 建立节奏，并完整支持 reduced motion。
- 在桌面、移动端和低高度视口分别验证排版和 sticky 行为。

### Don't

- 不复制参考网站的个人姓名排版、文案、字体文件、配色比例或案例内容。
- 不声明未加载的字体（Neudron / GT America 等）。
- 不加入未定义的第四品牌色、大面积渐变背景、光球或纯装饰纹理。
- 不把每个区块包成卡片，不使用卡片套卡片。
- 不在 Hero 使用聚光灯跟随、大范围光晕或霓虹背景特效。
- 不逐字、逐行、逐元素播放进入动画。
- 不用 GSAP 替代简单 CSS transition，也不用 ScrollTrigger 替代原生 sticky。
- 不在没有测量依据时虚构指标或把团队结果归为个人成果。

---

## 11. Agent Prompt Guide

### Quick Color Reference

- Background: `#0D0C11`
- Elevated surface: `#1F1D26`
- Heading text: `#ECE9F1`
- Body text: `#A39FB0`
- Border: `#2A2833`
- Accent / focus: `#D0BCFF`
- Mint (title gradient / results): `#B9F2C8`
- Pink (case title gradient): `#FFD8E4`

### 11.1 Mandatory Context for Any AI Agent

```text
你正在为“具有设计背景的复杂业务系统产品经理”构建作品集。
DESIGN.md 是唯一视觉规范，不得引入未定义的颜色、字体、圆角或动效模式。

页面采用深色编辑型设计：#0D0C11 背景，#16151C / #1F1D26 表面，
#D0BCFF 只用于主交互，#B9F2C8 用于大标题渐变与结果，#FFD8E4 用于案例标题渐变。
Display 使用 Anton（仅拉丁，可 scaleY 拉伸 + 渐变），正文使用 Hanken Grotesk，
衬线叙事层使用 Merriweather（300/400），技术标签使用 IBM Plex Mono。
所有 Heading 与 Body 字号使用 clamp()；所有声明的字体必须真实加载。

Hero 为 100svh 无框开场：纯深色背景 + Anton 渐变姓名 + Merriweather 衬线定位句 + 双 CTA。
Portfolio 使用 sticky 黏性堆叠：超大渐变标题（Pink→白）、文件夹式顶部描边、真实产品图。
优先使用全宽无框章节、强排版、真实产品证据和清晰案例叙事。
避免模板化 Bento 卡片、卡片套卡片、渐变光球、聚光灯背景、装饰性插画和营销式 Hero。
动效克制：CSS 负责微交互；GSAP 负责序列；ScrollTrigger 只负责必要的 pin/scrub。
默认支持 prefers-reduced-motion，并在移动端重新组织内容而不是等比缩小。
```

### 11.2 Homepage Prompt

```text
设计作品集首页。首屏为 100svh 无框 Hero，固定居中胶囊导航，
以 Anton 超大渐变姓名（Mint→白，可 scaleY 拉伸）作为唯一视觉焦点，
Merriweather 衬线定位句置于其下，底部放主 CTA 与下一章节提示。
首屏需露出下一章节线索。随后用 3–5 张大型黏性项目卡形成连续案例堆叠，
桌面端媒体/文本交替双栏，卡片标题为 Pink→白渐变超大文字，hover 填满为 Pink。
移动端改为媒体在前的单栏。每张卡只展示业务问题、角色、时间、关键结果和查看案例入口。
不要添加能力介绍卡片墙、客户 Logo 墙、装饰性统计或聚光灯背景。
```

### 11.3 Case Study Prompt

```text
设计复杂系统产品案例详情页。按 Signal、Context、Diagnosis、Decision、System、
Validation、Reflection 组织叙事。章节标题必须表达观点，不使用空泛的 Research / Solution。
使用真实界面、决策对比、流程图和带口径的指标作为证据。
长正文限制 68ch，桌面用 12 列网格形成文字与证据的节奏，移动端单栏重排。
每个案例至少明确两个关键取舍、一个验证结果和一个尚未解决的问题。
```

### 11.4 Motion Prompt

```text
为页面添加克制的编辑型动效。Reveal 统一为 opacity 0→1、y 30→0、750ms、
cubic-bezier(0.22,1,0.36,1)，同组 stagger 60–90ms，默认只播放一次。
按钮与卡片 Hover 仅上移 1–3px，200ms。CSS 处理微交互，GSAP timeline 处理首屏编排，
ScrollTrigger 仅用于必要的 pin、scrub 或进度叙事。React 中优先 useGSAP，限制 selector scope，
卸载时清理 context 和 triggers。只动画 transform / opacity / background-position。
为 reduced motion 直接显示最终状态。
```

### 11.5 Review Checklist for Agents

1. 是否首先表达作品与定位，而非网站功能？
2. 是否只使用本文档定义的颜色、字体、间距和圆角？
3. 所有 Heading 和 Body 是否使用 `clamp()`？
4. 声明的字体是否真实加载（无 Neudron / GT America 假声明）？
5. 是否存在卡片套卡片、过多同级焦点或无意义强调色？
6. 案例是否展示问题、约束、决策、证据、结果与反思？
7. 动效是否有阅读或空间意义，并支持 reduced motion？
8. Mobile 是否完成内容重排，320px 宽度和低高度视口是否无重叠？
9. 键盘焦点、对比度、触控尺寸、语义顺序是否合格？

---

## 12. Evidence Notes

### 12.1 Observed from Harrison Wheeler (2026-08-14 re-extraction)

以下为通过实时页面 DOM、计算样式、CSS 变量与响应式规则观察到的参考特征：

- 深色页面背景 `#0d0c11` 与分层表面 `#16151c` / `#1f1d26`，边框 `#2a2833`。
- 强调色：浅紫 `#d0bcff`（主按钮 + 深紫文字 `#381e72`）、薄荷绿 `#b9f2c8`（Hero 大标题渐变）、浅粉 `#ffd8e4`（案例标题渐变、装饰 badge）。
- 字体：Display 用 Neudron（全大写、字重 800、`scaleY(1.5)` 拉伸、渐变 clip 文字）；正文 GT America；衬线 Merriweather（lede 32px / 卡片 meta 20px，字重 300）；标签 IBM Plex Mono（`.72rem`、字距 `.18em`）。
- 固定居中的胶囊导航、全视口 Hero、超大 Display 字体（`19cqw` 级）。
- Desktop 页面边距约 `32px`，Mobile 约 `20px`；章节间距约 `120px`。
- 大型案例卡采用黏性堆叠（`top: var(--stick-top)`）、媒体与文字交替布局、顶部圆角 `24px` + 文件夹式 masked 描边。
- 卡片标题为 Pink→白渐变文字，hover 通过 `background-position` 填满为 Pink。
- Reveal 约为 `opacity 0→1`、`translateY(30px)→0`、`0.75s`、`cubic-bezier(0.22,1,0.36,1)`。
- Hero 入场为内容整体上升（`hero-content-rise .7s`）。
- Mobile Hero 操作区靠近底部，按钮纵向全宽；案例卡变单栏且图片在前。

### 12.2 Adapted for This Portfolio

- 参考站商业字体（Neudron / GT America）不可自由使用，替换为 Anton（Display，拉丁）+ Hanken Grotesk（正文），两者均真实加载。
- 参考站衬线层 Merriweather 为 Google Fonts 免费字体，直接引入作为叙事层。
- 参考站三色（紫 / 薄荷绿 / 浅粉）全部保留，但职责重新定义为：Lavender 行动、Mint 标题与结果、Pink 案例标题。
- 案例卡从设计作品展示调整为复杂业务系统的产品决策摘要，保留文件夹式描边与渐变标题机制。
- 黏性堆叠保留为首页标志性节奏，但增加低高度设备和 reduced motion 降级。
- 动效参数保留其克制节奏，同时补充 React 生命周期、性能和无障碍约束。

### 12.3 Evidence Boundary

本文档描述的是从公开首页可观察到的视觉与交互语言，以及针对本作品集定位做出的明确适配；不推断参考网站未公开的内部设计系统、隐藏页面或组件状态。
