# Design System: Harrison Wheeler · 原站设计规范

> 版本 1.1 · 全量实测/源码快照：2026-10-09；局部复核与补充：2026-10-13。
> 用途：拆解参考站原有视觉语言，供设计师或 AI 在新设计中直接复用；不是本作品集页面的对比报告或实施批准。
> 本作品集的适配规则仍见[根目录 DESIGN.md](../../DESIGN.md)。两份文档职责不同：本文件保留原站规则，根目录文件决定本项目采用什么。
> 阅读顺序：§1 理解风格 → §2–6 使用基础规则与组件 → §8 处理响应式 → §10 编排动效 → §12 按规则设计与验收。配套看板是缩略示意，精确值以本文件表格为准。


### 规范导航

| 位置 | 设计时解决的问题 |
| --- | --- |
| §1 | 风格定位、四种阅读场景、视觉强度分配 |
| §2–3 | 颜色语义、渐变构造、完整字体层级、标题尺寸适配 |
| §4 | 导航、按钮、卡片、案例、媒体、About、表单、图标与文案风格 |
| §5–6 | 容器、间距、对齐轴、圆角、层次与阴影 |
| §7–8 | 风格边界、断点、9组实测字号、移动端重排 |
| §9 | 可以直接交给设计师或AI的组件提示词 |
| §10 | 全站动效的触发、时序、曲线、公式、退出与减弱策略 |
| §11 | 演示模式的完整字阶、版心、图表、结构图与控制 |
| §12 | 可复用令牌、组件契约、动效描述格式与验收清单 |
| §13 | 实测范围、原站一手来源、证据等级 |

## 1. Visual Theme & Atmosphere

原站是一套**以品牌排版为主、个人叙事为线索、分场景切换密度的编辑型作品集**。深色主站像展览入口：字号大、标题窄而高、画面有层次，真实人物与作品媒体提供内容重心。进入案例后切换到白色阅读层：正文变小、行宽收窄、装饰减少，章节、图像与数据承担理解任务。About 则使用影像、时间轴和地理旅程表现个人经历；演示模式进一步把同一内容组织为全屏幻灯片。它不是一种样式铺满所有页面，而是同一品牌下的四种阅读速度。

可迁移的核心是**把视觉强度分配给不同任务**：首屏负责识别，项目卡负责选择，正文负责理解，动效负责空间连续与叙事节奏。超大标题、衬线长句、等宽控件、文件夹轮廓、覆盖式滚动和白色案例阅读器共同形成识别；缺少其中的比例与节奏，只复制颜色不会得到相同气质。

### Key Characteristics

- **压缩的 Display 与轻盈的衬线叙事**：强烈的字形体量和放松的语句密度形成对比。
- **中心开场、左对齐深读**：首页区块标题共用中轴；项目卡和长文共用各自左边界。
- **底层安静、前景明确**：深色中性偏紫底、细描边与遮挡提供层次，少量浅色文字和按钮承担焦点。
- **有用途的视觉戏剧性**：人物拖入、卡片变阅读层、地球旅程有明确语境，不是每段正文都表演。
- **品牌系统共享，阅读场景分离**：主站、案例、About、Deck 共享字体角色，但布局、表面和文字密度不同。

### 1.1 四种场景的设计任务

| 场景 | 读者任务 | 排版与密度 | 主要视觉机制 |
| --- | --- | --- | --- |
| 首页 | 识别作者、筛选作品、找到联系入口 | 大 Display、短摘要、宽幅媒体、低到中密度 | 全视口首屏、居中胶囊、黏性卡片、覆盖标题 |
| 案例阅读器 | 阅读背景、判断、方案和结果 | 16px 长文、窄阅读列、48px 章节、连续内容 | 深色封面 → 白色正文、目录、阅读进度、可扩展媒体 |
| About | 理解作者的经历与个性 | 影像开场、三项概述、交替时间轴 | 背景视频、年份中轴、整行进入、地球旅程 |
| Deck 演示模式 | 有人讲解时观看单个观点 | 全屏、少字、大图、大数字、受控翻页 | 固定标题原点、屏幕/容器两套字号、共享元素转场 |

### 1.2 风格边界

**观察事实：**原站允许极弱网格、照片模糊背景、人物轮廓、低透明度彩色渐变和背景视频；并非完全无装饰的纯黑极简。卡片本体通常很平，空间感主要来自覆盖关系、媒体、封面和长留白。

**设计归纳：**这套系统的高级感来自“高反差的字体角色 + 可预测的对齐线 + 不同阅读场景的密度控制”。不应把所有标题做成巨字、把所有信息包成卡片，或把每个滚动区都变成固定停留的演示。

## 2. Color Palette & Roles

下表是原站实际颜色，不是本作品集的中性底色适配版。原站深色灰阶有轻微紫偏；浅色案例使用另一套局部颜色。

| Role | Semantic Name | Value | Usage |
| --- | --- | --- | --- |
| Page background | Deep ink | `#0d0c11` | 主站、项目卡、案例深色封面、演示画布 |
| Surface | Dark surface | `#16151c` | 控件与局部表面 |
| Elevated surface | Raised surface | `#1f1d26` | 次级表面与媒体底层 |
| Border | Structural line | `#2a2833` | 主站结构描边 |
| Soft border | Quiet line | `#211f29` | 网格与较弱分隔 |
| Heading text | Main light text | `#ece9f1` | 主站高对比文字 |
| Body text | Muted light text | `#a39fb0` | 长句与次级信息 |
| Dim text | Dim metadata | `#75717f` | 元数据与较弱辅助信息 |
| Primary action | Lavender | `#d0bcff` | 主按钮、当前导航、交互强调；About 小标题也使用 |
| Primary hover | Pale lavender | `#e3d6ff` | 主按钮悬停 |
| On primary | Deep violet ink | `#381e72` | 浅紫按钮上的文字 |
| Brand title | Mint | `#b9f2c8` | 姓名与 About 开场标题 |
| Case title / narrative accent | Pale pink | `#ffd8e4` | 项目卡、案例封面、联系标题与部分衬线介绍 |
| Case page background | Reading white | `#ffffff` | 案例阅读层 |
| Case heading text | Reading ink | `#17151b` | 案例标题与正文中的结构文字 |
| Case body text | Reading prose | `#36333c` | 案例衬线正文 |
| Case muted text | Reading muted | `#5c5866` | 目录、图注、指标说明 |
| Case border | Reading line | `#e7e5ea` | 表格、媒体、指标内部分隔 |
| Case interactive accent | Reading violet | `#5b3df5` | 案例阅读进度等交互 |

### 2.1 Primary / Interactive

Lavender 的主要任务是行动与可点击状态，但原站并未实行“只准按钮用紫色”的绝对规则。About 概述卡的标题也用 Lavender。Pink 同时用于作品标题和叙事说明，不能把它记录成“仅案例标题”。Mint 主要承接作者姓名与 About 识别，不把所有成功数据自动染绿。

设计套用时保持语义稳定：同一种操作使用同一颜色；同一种标题处理保持一致。不要为了每个区块不同而轮换紫、绿、粉。颜色角色服务于阅读任务，不按项目数量分配。

### 2.2 Neutral Scale / Surface & Overlay

- Main page surface: `#0d0c11`；普通项目卡与画布同色，主要靠顶部轮廓分开，不是每张卡都使用 `#16151c`。
- Elevated card and control surface: `#1f1d26`，仅用于需要表面分层的位置。
- 主站导航：`rgba(13,12,17,.6)`，`blur(14px) saturate(1.4)`；1px 白色 8% 描边。
- Ghost 按钮：白色 8% 底、白色 18% 的 0.5px 边框、白色 12% 内侧高光；悬停底色升至白色 14%。
- 案例背后遮罩：`rgba(8,7,11,.45)`，用于把深色首页压到阅读层后面。
- 案例 mini-header：白色 94% 背景、`blur(10px)`，保持白色阅读系统内部的层次。

### 2.3 标题渐变的真实构造

| 用途 | 渐变原值 | 设计意图 |
| --- | --- | --- |
| 姓名 / About 大标题 | `linear-gradient(to top, #e4fbea 0%, #cef6d9 20%, #b9f2c8 48%)` | 下部较浅、上部稳定 Mint；不是统一 Mint→白 |
| 联系 / 部分叙事标题 | `linear-gradient(to top, #fff4f8 0%, #ffe7f0 20%, #ffd8e4 48%)` | 同色系 Pink 内部变化 |
| 可用的 Mint→白变体 | `linear-gradient(to top, #b9f2c8 0%, #d9f8e3 42%, #ffffff 100%)` | 原站有声明，但不能替代所有 Mint 渐变 |
| 项目卡标题的可动渐变 | `linear-gradient(to bottom, #ffd8e4 0%, #ffd8e4 50%, #ffffff 62%, #ffffff 100%)` | 背景高为文字框 200%；上下移动在 Pink 实色与 Pink→白之间切换 |

项目卡标题默认 `background-size:100% 200%`、`background-position:0 100%`；hover 到 `0 0%`，600ms。使用 `background-clip:text` 与透明文字填充，并保留实色 fallback。它的运动来自渐变背景位置，不是改变字色或把字缩放。

### 2.4 Theme Modes

原站**没有在已检查页面中提供可切换的亮暗主题控件**。深色首页与白色案例是按场景切换，不是同一页面的两套用户主题。系统偏好 light/dark 不改变已测主站底色。

#### Dark Mode

- Background: `#0d0c11`。
- Surface: `#16151c` / `#1f1d26`。
- Text: `#ece9f1` / `#a39fb0`。
- Accent: Lavender、Mint、Pink，按上文角色使用。
- Notes: 主站、About、案例封面和大部分演示页面。

#### Light Mode

- Background: `#ffffff`。
- Surface: 媒体与表格使用 `#e9e7ee`、`#f6f5f8` 等局部浅灰。
- Text: `#17151b`，长文 `#36333c`，辅助 `#5c5866`。
- Accent: `#5b3df5`。
- Notes: 案例正文阅读场景；部分演示内容也采用不透明白色画布。

### 2.5 Shadows & Depth

- Card media: `0 8px 24px rgba(0,0,0,.4)`。
- Reading sheet: `0 0 60px rgba(0,0,0,.4)`。
- Carousel arrows: `0 4px 16px rgba(0,0,0,.14)`。
- Ghost button inset: `inset 0 1px 0 rgba(255,255,255,.12)`。
- 没有统一“所有卡片都发光”的原站规则。媒体、阅读器和控件分别承担不同深度。

## 3. Typography Rules

### 3.1 Font Family

- Primary: **GT America**，主站运行文字、部分小标题和结构文字；原站自托管 400、400 italic、500、700。
- Display: **Neudron**，作者姓名、作品标题、章节 Display 与案例封面；原站声明可变字重 100–900。
- Narrative: **Merriweather**，300 为主要叙事字重，400 作局部强调、700 用于指标；经 Google Fonts 加载。
- Monospace: **IBM Plex Mono**，400/500，导航、按钮、标签、页脚与技术说明；经 Google Fonts 加载。
- Secondary serif display: **Reckless**，原站有自托管声明和旧式组件规则；当前首页主要章节使用 `.head-gt` 后实际是 Neudron。不能因为声明了 Reckless 就把它列为每个章节的实际字体。
- OpenType Features: 指标与页脚计数采用等宽数字的场景有明确规则；Display 使用 `font-synthesis:none`，避免伪粗体。

本文件记录原站字体身份，不分发或复制其字体文件。套用时需实际提供可用字体。若替换 Display，必须重新校准字宽、字重、行高和纵向处理，不能把原字号直接当作视觉等价。

### 3.2 Hierarchy

数值基于 `html:16px`；桌面示例为 1440×1000，手机示例为 390×844。**字号是排版尺寸，scaleY 后的可见绘制高度另算。**原站不是所有文本都使用 clamp，也不是一套固定倍数的 modular scale。

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline | Neudron | 桌面 `19cqw`；≤560px `38cqw` | 800 | 桌面 `.92`；手机 `.82` | `-.01em` | 实测 238.64 / 133px；静态 scaleY(1.5) |
| Hero lede | Merriweather | 桌面 `32px`；≤560px `18px` | 300 | `1.25` | normal | 实测 40 / 22.5px 行高，居中，Pink |
| Section heading | Neudron | `clamp(3.3rem,8.25vw,5.8rem)` | 400 | `1` | `-.01em` | 实测 92.8 / 52.8px；同一首页中轴 |
| Case card title | Neudron | `clamp(40px,6.5vw,88px)` | 700 | `.92` | `-.01em` | 实测 88 / 40px；全大写，Pink 可动渐变 |
| Case card meta | Merriweather | `20px` | 300 | `1.5` | normal | 30px 行高；手机仍 20px |
| Section supporting copy | Merriweather | `1.12rem` = 17.92px | 300 | `1.6` | normal | 通用40em；同带.prose时44em；标题后18px |
| Body | GT America | `16px` | 400 | `1.6` | normal | 主站结构正文；叙事模块可覆写为衬线 |
| Label / Eyebrow | IBM Plex Mono | `.72rem` = 11.52px | 500 | 继承 `1.6` | `.18em` | 全大写；项目卡 eyebrow 当前隐藏 |
| Navigation | IBM Plex Mono | `.95rem` / ≤860px `.9rem` | 400 | `1.6` | `.02em` | 实测 15.2 / 14.4px |
| Button | IBM Plex Mono | `1.05rem` = 16.8px | 500 | `1.6` | normal | 14px × 28px padding，8px 图文间距 |
| Case hero title | Neudron | JS 测量适配；桌面搜索28–220px，手机28–160px | 800 | `.76` | `-.01em` | 实测约184.23 / 83.4px；scaleY(1.5)；见§3.4 |
| Case hero description | Merriweather | 桌面 `clamp(.95rem,min(2.6cqh,1.5cqi),1.3rem)`；手机`.98rem` | 300 | `1.55` | normal | 实测19.40 / 15.68px；桌面靠右，手机左对齐 |
| Case section heading | Neudron | `3rem` = 48px | 800 | 继承 `1.6` | `-.01em` | 76.8px 行高；本次手机仍48px |
| Case subsection heading | GT America | `1.05rem` = 16.8px | 700 | 继承 `1.6` | normal | 用字重和间距表达层级，非另一个巨标题 |
| Case prose | Merriweather | `16px` | 300 | `1.75` | normal | 28px 行高；max42em =672px |
| Case metric value | Merriweather | `1.9rem` =30.4px | 700 | 继承 `1.6` | `-.02em` | 黑色数字；不默认染品牌色 |
| Case metric label | GT America | `.85rem` =13.6px | 400 | 继承 `1.6` | normal | 说明在数字后4px |
| Caption | GT America | `.82rem` =13.12px | 400 | 继承 `1.6` | normal | 图下10px或14px，居中 |
| About headline | Neudron | `clamp(3.6rem,18vw,14rem)` | 800 | `.92` | `-.01em` | 桌面224px；scaleY(1.5) |
| About tagline | Merriweather | `clamp(1.5rem,3.2vw,2.4rem)` | 300 | `1.4` | `-.02em` | 桌面38.4px；max30em |
| About card heading | GT America | `1.5rem` =24px | 400 | `1.25` | `-.01em` | Lavender；小标题与大Display不同角色 |
| Timeline heading | Neudron | `3rem` =48px | 800 | `1.2` | `-.01em` | 手机`2.4rem` =38.4px |
| Timeline prose | Merriweather | `1.05rem` =16.8px | 300 | `1.8` | normal | 最大34em，White |
| Footer | IBM Plex Mono | `.85rem` =13.6px | 400 | 继承 `1.6` | normal | 导航与版权；计数 `.78rem` |

### 3.3 Principles：为什么这些比例成立

1. **Display 承担识别，不承担长文阅读。**窄字形、大字号、紧行高和浅色渐变用于短标题；正文回到轻衬线与稳定行长。
2. **字号以实际约束为依据。**首页姓名跟随容器宽度 cqw；作品标题跟随视口但有40/88px边界；长文固定16px；演示小卡跟随cqi。不是所有元素只用vw一起变大。
3. **行高跟着角色走。**Display `.76–1`、叙事 `1.25–1.8`；标题的紧行高不能套到多段正文。
4. **字距形成身份差异。**Display 微负字距，标签显著正字距，叙事文本接近自然；导航仅 `.02em`，不把所有等宽文字都当标签。
5. **一段文字只承担一个层级。**结构标题、正文、元信息和行动不能都用渐变、粗体与大字号争夺焦点。
6. **原站只验证拉丁字体语境。**中文、双语或混排没有原站实测依据；需要另行选择真实 CJK 字体、重新确定行高和断行，不能声称英文参数天然适用中文。

### 3.4 scaleY 与案例标题适配

`scaleY(1.5)` 是静态品牌字形处理，视觉高度增大50%，但正常布局盒不会自动增高。原点主要在 bottom center，所以会向上伸长。预留空间、遮罩、关闭按钮与相邻文案都必须围绕绘制边界考虑；用大号字体加 transform，却不预留空间会破坏这套风格。

案例封面通过运行时测量字号，流程可直接复用为设计规则：

- 等字体可用与封面布局确定后测量。
- 桌面在28–220px间二分12次；标题未拉伸的高度预算不超过“封面扣除上下 padding 后的高度 ÷1.5 ×.98”。
- 手机在28–160px间二分12次；标题未拉伸高度不超过视口高×.38÷1.5，且最长单词不造成横向溢出（允许1px测量误差）。
- 手机用 `margin-top≈offsetHeight×.5` 为向上的字形拉伸预留空间。
- 简介由CSS容器字号确定，桌面取封面高度与宽度约束的较小值，手机15.68px。JS只测量并写入标题字号，不同步改简介。
- 桌面简介底部提升量为CSS标题字号基准×.21，补偿标题paint-box；它不读取JS最终字号。必须把容器字号规则与测量标题规则分开记录。
- 字体ready、窗口resize延迟120ms、861px断点切换后重新计算。

这是一个有明确约束的尺寸适配机制；不是随意给不同项目写不同字号。换标题或字体后，最终数值可以变化，边界规则保持一致。

## 4. Component Stylings

### 4.1 Navigation

桌面顶部有左侧品牌与独立居中的胶囊导航。胶囊中心由50%定位确定，不受品牌宽度影响。外层fixed、z-index200；内部胶囊距离顶部16px。

| 属性 | >860px | ≤860px |
| --- | --- | --- |
| 胶囊 padding | `14px 32px` | `12px 20px` |
| 链接 gap | `30px` | `18px` |
| 字号 | `15.2px` | `14.4px` |
| 背景 / 边框 | rgba深底 `.6` / 白色`.08` 1px | 同桌面 |
| 模糊 | `blur(14px) saturate(1.4)` | 同桌面 |
| 圆角 | `999px` | `999px` |
| 品牌与汉堡 | 品牌按滚动状态显现，汉堡不使用 | 当前两者隐藏；保留胶囊链接 |

实测桌面胶囊约341.66×54.31px，手机约272.72px宽。hover与当前项使用Lavender，200ms。原站保留汉堡转叉代码，但当前手机默认没有汉堡菜单；这是必须分开的历史组件能力。

### 4.2 Buttons and Links

**Primary CTA**

- Background: `#d0bcff`。
- Text: `#381e72`。
- Text style: IBM Plex Mono，16.8px/500，行高1.6。
- Common size: 桌面实际高度约56.88px；来自padding与line-height，并非统一固定56px。
- Radius: `100px`。
- Padding: `14px 28px`。
- Icon gap: `8px`。
- Hover: `#e3d6ff`，上移1px；颜色200ms、位移150ms。

**Secondary CTA**

- Background: `rgba(255,255,255,.08)`。
- Text: `#ece9f1`。
- Ring: `rgba(255,255,255,.18)`，0.5px。
- Radius: `100px`。
- Hover: 白底透明度`.14`，Lavender边框与文字，上移1px。

禁用按钮opacity`.5`、cursor not-allowed、无位移。桌面行动组gap14px；≤860px竖排、按钮全宽。按钮箭头是小型功能指示，不能被误当装饰性大图标。

正文链接和媒体/文章列表保持开放式行布局；列表悬停可向右移动24px，350ms，颜色/箭头200ms。默认没有给所有链接套胶囊或背景卡。

### 4.3 Cards and Containers

- Surface: `#0d0c11`；与主画布同色。
- Radius: 首页项目卡 `24px 24px 0 0`，仅顶部圆角。
- Border: 伪元素顶部与左右1px、白色16%，底边不画；mask从35%完整到95%透明。
- Shadow: 卡片本体不靠统一大阴影分层；媒体另有阴影。
- Internal spacing: padding `clamp(28px,3.5vw,52px)`；双栏gap `clamp(32px,5vw,72px)`。
- Columns: **1fr 1fr**，不是固定58/42或7/5。≤860px单栏gap16px。
- Text area: 内部再加 `padding:16px 0 8px`；标题后12px、摘要20px/30px行高。
- Order: 桌面图文交替；第一张文字左、媒体右，下一张相反。
- Hover: 上移3px，200ms；边框白色`.16→.28`，200ms；标题渐变位置600ms。

媒体为16:10、16px圆角、白色12%的1px边框、`0 8px 24px rgba(0,0,0,.4)`阴影。图片`cover`用于项目封面裁切；案例内要检查界面的图像使用另一组规则。

卡片中的公司eyebrow虽然在DOM存在，但当前CSS隐藏。不要依据HTML把它复原为一排可见标签，或增加原站没有的数据区、CTA徽章墙。

### 4.4 Hero：首页开场

- 全视口场景：桌面`min-height:100vh`，≤560px改`100svh`，减少手机浏览器工具栏对构图的影响。
- 姓名与简介居中；Desktop文案组偏底部，容器下方留7vh，不是始终垂直正中。
- 人物影像、背景logo、轮廓与拖拽指针分层；logo滞后，文字更快离场。
- 姓名大写、Neudron800、scaleY1.5、Mint；简介Merriweather300、Pink。
- 首屏CTA两条不同强度的路径；正文没有套容器卡。
- ≤560px：姓名两行、38cqw，说明18px；文案组为按钮预留172px；按钮定位到底部安全区之上，左右20px。

**设计归纳：**这个首屏把“设计者操作画面”的隐喻用在人物入场，而不是把按钮、正文、所有标题都做成可拖拽。作者姓名仍是排版主角，真实影像提供个性。

### 4.5 Section Headers：标题被内容覆盖

章节标题组为中心对齐，主标题通常Neudron400，辅助文字Merriweather300。标题、说明共享页面中轴，但具体文字宽度可收窄。

部分章节使用phead外层：sticky top96px、z-index1；正文z-index2，随着正文上移覆盖标题，标题内部同时淡出并上移，见§10。标题底部的空间是 `clamp(80px,12vh,150px)`，不是随意扩大padding。

这样的标题承担章节转场。普通卡片小标题、案例小节不使用相同的sticky机制。

### 4.6 Case Reader：连续阅读层

案例在主站上方以dialog阅读层打开。桌面四边16px、四角22px、深阴影；深色封面接白色正文。正文三个网格轨道：`minmax(180px,1fr) minmax(0,720px) minmax(180px,1fr)`，gap64px，左右padding48px。

**右侧空列是主动的构图资源。**它使720px主体阅读列仍在整体中间，而不是因为左侧目录被挤向右边；轮播等证据可以延展进这条空列。1440px实测正文列x360、宽720px，段落max672px；左目录视觉边界与关闭按钮对齐，依靠−20px局部偏移。

- 目录：sticky top84px，条目16px、padding上下6px/左12px，条目gap4px；当前项变深并加重到600，不显示紫色大块。
- 章节：48px，前52px/后18px；小节16.8px700，前28px/后8px。
- 段落：Merriweather16px/300/28px，段后16px，max672px。
- 列表：衬线300，行高1.7、缩进22px、项目间6px。
- 内联strong：原站正文主要升至400，不是把每句重点都做成700粗体。
- mini-header：封面标题离开后从顶部出现，标题绝对居中，max66%，单行截断；这条截断只用于辅助导航，不用于正式案例标题。
- 进度：3px紫色条，反映overlay真实滚动距离，不播放虚构时间进度。

≤860px正文单栏、左右22px、底部72px，目录隐藏；顶部控制仍可用。原站没有手机“目录换行链接组”的默认规则。

### 4.7 Evidence / Carousel / Metric / Table

| 组件 | 原站规则 | 阅读作用 |
| --- | --- | --- |
| 普通figure | 16:9，max42em，8px圆角，1px浅边，margin8px 0 24px | 与附近论点对应 |
| 带图注截图 | 图框8px，图注13.12px，图后10px | 明确媒体内容与口径 |
| 宽工作演示视频 | 主体阅读列全宽，自动媒体比例，8px圆角，图后40px | 保留界面细节 |
| 双图网格 | 两列，gap16px，max42em；≤560px单栏 | 同等级证据并置 |
| 横向carousel | track gap16px，viewport4px圆角，底部56px | 用户控制多图，不自动播放 |
| 普通slide | 高`clamp(300px,52vh,500px)`，宽由媒体自然比例决定 | 保持图像完整而非统一cover |
| 竖向slide | 高`clamp(360px,60vh,560px)`；≤560px320–480px | 适配手机画面 |
| carousel按钮 | 桌面46px、手机40px，圆形，浅底、边框、轻阴影 | 显示前后边界与可操作性 |
| 指标组 | auto-fit最小160px，gap1px，背景是浅边框色；单元白底、padding20px | 内部分隔，无外部装饰框 |
| 恰好4项指标 | 固定2×2 | 避免一行过密 |
| 表格 | 12px圆角、1px浅边、标题浅灰底，正文13px×16px padding | 处理规则/比较而非制作另一组大卡片 |

原站轮播没有定时自动播放，没有循环回绕，也没有源码证实的touch swipe。宽屏≥1080px时轮播向右延伸304px；手机恢复100%单张宽度，图像`contain`，见§10的定位规则。

**2026-10-13媒体DOM补充：**Leadcraft演示video标记autoplay、muted、loop、playsinline、preload=metadata，没有默认controls；About环境video标记autoplay/muted/loop、preload=auto。属性表示实现意图，本次演示video读取到paused，部分图片naturalWidth=0，不能把它记录为视频已成功播放或所有媒体已载入。网站图片既有lazy加载，也有onerror隐藏图片的实例；这不是本项目应默认采用的失败呈现。媒体播放、暂停和失败回退的项目采用规则另见根规范§5.11。

### 4.8 About：影像与时间轴

About大标题延续Mint Display，背后是视频。视频上有暗色scrim，底部渐变融入页面；点阵为16×16px格，向下逐渐加重。不是在整个网站铺满颗粒噪点。

概述三卡：三等列、gap24px，透明背景、1px结构边、16px圆角、padding36px 32px。图标约64px，标题24px/400/Lavender，正文16.8px轻衬线。手机单列、gap16px。

时间轴：桌面照片与正文分居年份两边，三轨道约538/132/538px（1440px实测），column-gap24px；左右交替但始终围绕中央年份。正文heading48px、prose16.8px/1.8；文本max34em。正文背景可使用同一照片的模糊低透明度映像，宽74%、比例16:11、blur14px、opacity.32；手机去掉这层。

≤860px改为年份→媒体→正文的单列，单行gap16px，正文padding0 8px，居中。整行统一进入，防止长行照片可见却文字仍隐藏。

特殊停留段桌面220vh、内部sticky100vh，手机170vh；不是整个时间轴每段都固定这么高。地球旅程见§10；它需要地理经历内容，不能作为无语义通用页脚。

### 4.9 Podcast / Community / Lists / Footer

- Podcast：最小高度480px，头像背景与前景文字分层。头像84–118px，方形、6px圆角；行gap16px。中央椭圆暗色mask建立文字可读区，而非给头像全局降到不可辨识。
- Community：照片带横跨100vw，居中容器之外出血；桌面图高按340/280/300px变化，奇偶上下错位−28/+20px；caption覆在图内，等宽小字、圆形暗底。照片随70s线性轨道整体运动，单张不各自漂浮。
- 文章/资源：开放式分隔行、功能箭头、悬停横向位移；不是每条资源都包厚卡片。
- Footer：上方soft line、padding-block36px；内容flex两端对齐、gap20px、可换行；手机竖排与居中。导航/版权13.6px等宽、计数12.48px，图标20px。

### 4.10 Subscribe Popover / Forms

这是首页的次级浮层。源码滚动超过150px后延迟1000ms显现，关闭状态由localStorage记住。fixed右下24px、z60；≤560px右下16px。面板宽320px、最大宽`calc(100vw - 48px)`、16px圆角、白底、1px黑色12%边、padding22px22px20px；阴影`0 24px 60px rgba(0,0,0,.28)`。面板自身没有backdrop blur。

输入框GT America15.2px、padding12px14px、10px圆角、#f5f4f7底、#16151c字、1px黑色14%边；focus用Lavender边框。表单堆叠gap10px；提交按钮IBM Plex Mono14.72px/500、padding12px16px、图文gap7px、胶囊圆角、Lavender底，disabled透明度.6。关闭按钮28px。原站错误/成功提示还使用独立的粉红/绿色状态值，因此原站不存在“第四颜色绝对禁止”的完整约束。

此次只检查控件、CSS与触发源码，未提交邮箱、未验证邮件发送或订阅结果。

### 4.11 Case Cover：封面构图的几何规则

封面是独立的展示舞台，不能把正文首段简单放大后代替。桌面有明确高度`100dvh - 32px`，设置命名size container `csHero`；min-height基础为`100dvh - 9vh`。上下padding分别`clamp(76px,12vh,132px)`与`clamp(36px,6vh,64px)`，右padding`clamp(28px,6vw,88px)`、左固定28px。双列等分、列间`clamp(28px,4.5vw,84px)`、底部对齐。手机padding84px22px40px、单列gap26px，不设置桌面size containment，让长标题与简介自然撑开。

**图像层→暗色scrim→文字层：**设备/作品艺术层z0、scrim z1、文案z2。桌面艺术层top50%并向上移自身一半；Laptop右出血−14%、宽`min(89%,140cqh)`；独立艺术图右−4%、宽`min(56%,100cqh)`；Phone右8%、宽`min(clamp(288px,31%,480px),52cqh)`。手机改top84px、去掉居中变换，Laptop右−18%/宽96%，Free右−6%/78%，Phone右6%/46%。作品类型决定载体，不把所有案例强制放进同一电脑模型。

桌面scrim从底部深底96%透明度开始，22%处78%、42%处32%、60%处透明；手机依次为0%处97%、44%处93%、62%处55%、82%透明。目的在于底部文字清楚、上部设备可辨。不要用全屏黑色遮罩把作品压没。

背景网格48px、Lavender7%的1px线，以椭圆mask向边缘消失。设备内截图cover并锚定左上，保证界面导航仍可识别；案例正文截图则优先contain/自然比例。这是同一种图像在“封面构图”和“证据阅读”中的两个不同任务。

### 4.12 Iconography / Image Treatment

- 导航外链图标11×11px，与文字gap5px，opacity默认.6、hover1；等宽链接配小型功能箭头。2026-10-13运行DOM补充：该SVG使用24×24 viewBox、currentColor、stroke-width2.2、圆端点与圆连接。案例关闭则使用字符叉；原站并非所有控件来自统一SVG图标库。
- 普通按钮图标与文字gap8px，关闭/返回使用清晰的叉或箭头，不叠加装饰徽章。About概述图标64px、到标题28px；Footer社交图标20px、间距7px。
- 主站项目封面16:10、cover；About时间轴16:11，照片宽约所在列90%；头像方形6px圆角；社区照片按三种高度混排，10px圆角。
- 案例证据强调完整画面与可读性：截图16:9或媒体自然比例、轮播contain、可扩展到正文列之外。裁切规则由内容任务决定，不能全站统一object-fit:cover。
- 原站真实照片与设备截图构成主要图像语言。设计归纳：优先真实人物、真实工作与真实界面；渐变只负责统一色调和文字可读区。

### 4.13 Content & Messaging Patterns

以下是对已观察页面的设计归纳，不复制原站完整文案：短而强的Display点题；一两句轻衬线简介补充语境；等宽导航与CTA直接表达动作。首页项目卡先给项目识别与摘要，深度论证放到案例；About以第一人称经历和真实影像建立人格；演示页一页只推进一个观点。可信度主要靠作品图像、章节判断、数据及媒体记录提供，而不是大量标签和自夸形容词。

套用时需要限制“每屏任务数”：一个主要标题、一个主要观点、一种主行动；证据和辅助文字靠近被解释的论点。长阅读可以有更密的信息，但不要沿用首屏的巨字号与稀疏句子密度。

## 5. Layout Principles

### 5.1 Grid & Container

原站容器是 `max-width:1320px`，**1320px包含两侧padding**，不是1320px可用正文宽度。>860px左右32px；≤860px左右20px。宽屏居中后多余空间留在容器外。

| 视口宽 | 容器外宽 | 容器左边界 | 内部主内容左边界 | 可用主内容宽 |
| --- | --- | --- | --- | --- |
| 1920px | 1320px | 300px | 332px | 1256px |
| 1440px | 1320px | 60px | 92px | 1256px |
| 1280px | 1280px | 0px | 32px | 1216px |
| 900px | 900px | 0px | 32px | 836px |
| 860px | 860px | 0px | 20px | 820px |
| 390px | 390px | 0px | 20px | 350px |
| 320px | 320px | 0px | 20px | 280px |

手机项目卡是一个有意的例外：卡片取消外部容器边距、扩到视口全宽，但内部保留28px以上padding；媒体与文字由卡片内边界对齐。不能把full-bleed照片带、全宽手机卡片和普通容器误判为三套随意边距。

原站使用任务导向的网格：项目1/1、概述三等列、时间轴“内容/年份/内容”、案例“目录/正文/空列”。未观察到统一的12列框架；不能把通用12列栅格写成原站事实。

### 5.2 Spacing System

- Base unit: 原站没有声明严格固定基础单位；以语义关系、媒体比例和视口空间共同控制。
- Repeated spacing values: `4px, 8px, 12px, 14px, 16px, 18px, 20px, 22px, 24px, 28px, 30px, 32px, 36px, 40px, 48px, 52px, 56px, 64px, 72px, 80px, 96px, 110px, 120px, 150px, 172px`。

| 关系 | 原值 | 使用方式 |
| --- | --- | --- |
| 首页常规section上下padding | 桌面120px；≤860px80px | 注意相邻section可能形成双侧留白；不能统一解释为两个标题间120px |
| 标题组与主体 | 标准section-head底40px | sticky标题另有视口相关底部空间 |
| section标题→说明 | 18px | 说明最大40em，居中 |
| 卡片标题→摘要 | 12px | 标题视觉强、摘要就近承接 |
| 按钮组 | 14px | 与通用网格gap不同 |
| 卡片两栏 | 32–72px | 5vw按宽度变化 |
| 卡片内padding | 28–52px | 3.5vw按宽度变化 |
| 案例章节→正文 | 标题前52px、后18px | 先分章节，再连接说明 |
| 案例小节→正文 | 前28px、后8px | 比大章节紧 |
| 段落之间 | 16px | 不用夸张空白逐段隔开 |
| 案例列间距 | 64px | 目录、正文、空列共享 |
| 图片→图注 | 10或14px | 不与正文段后混用 |
| 轮播后 | 56px | 媒体高密度之后恢复阅读呼吸 |

**设计归纳：**“同一关系用同一间距”比“所有值都能被8整除”更接近原站逻辑。套用时先命名关系，避免每个组件临时写margin；如要改为严格网格，必须标记为二次规范化。

### 5.3 Alignment & Whitespace Philosophy

- 全站中轴：首屏姓名、主要章节标题、联系标题和正文简介的中心一致；由容器与50%定位决定，不凭文字长度调整。
- 项目卡局部左轴：标题、摘要共用卡片文字列左边；交替图文改变列位置，不改变列内关系。
- 案例三条轴：关闭/目录左轴、主体阅读左轴、宽媒体扩展轴；它们不同，但每条轴都有布局依据。
- 案例封面：桌面标题左、简介右对齐；手机单列改左对齐。它是独立构图，不要求与首页居中相同。
- 时间轴中轴：年份稳定居中，左右内容围绕它交替；手机将同一关系改成纵向顺序。
- 留白分配：首屏留出影像空间，宽标题配较短说明；案例长文用较紧段落和较大章节间隔，避免整篇稀疏到失去连贯。
- 同级组件应使用同一列宽、内边距和基线规则。不同场景允许不同轴，但不能无理由跨轴跳动。

### 5.4 Border Radius Scale

- Micro: `2px` 公司logo；`4px` 轮播viewport、slide等。
- Standard: `8px` 案例截图，`10px` 小型照片/输入，`12px` 表格。
- Large: `16px` 媒体与About概述卡；`18px` 手机阅读层；`22px` 桌面阅读器。
- Folder: `24px 24px 0 0`，首页作品卡。
- Pill: `100px`按钮与圆形控件；`999px`导航/标签。

原站圆角跟组件尺度和角色走，不是本项目已归一后的4/12/16/24系统。套用时必须选择对应角色，避免把22px模态框改成24px卡片后仍声称是原站复刻。

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Canvas | 深色画布、极弱局部纹理 | 主站识别与叙事背景 |
| Section | 开放式排版、少量细线 | 章节与信息组织 |
| Media | 16px圆角、1px低透明边、局部阴影 | 作品图像从背景中清晰浮出 |
| Sticky stack | 同色卡片、顶部渐隐轮廓、递增z-index | 阅读顺序与层叠关系 |
| Navigation | 半透明深底、14px blur、细白边 | 持续可达但不压过内容 |
| Reader | 白色sheet、22px圆角、四边16px、60px阴影 | 从选作品切换到深读 |
| Reader topbar | 白色94%、10px blur、3px进度 | 长文阅读的轻量控制 |

深度由遮挡、边缘、材质和内容顺序共同表达。主站卡片并未全部抬升为第二表面。案例白色阅读器是最强的场景切换，不能用一个小弹窗替代其完整阅读体验。

## 7. Do's and Don'ts

### Do

- 先确定页面属于扫描、深读、个人叙事还是讲解场景，再选字号与布局。
- 保持Display、叙事、结构、工具四个字体角色。
- 清楚区分排版盒与scaleY后的视觉边界。
- 用真实媒体与有依据的图表承接内容，让装饰始终处于次层。
- 使用容器定义、局部对齐轴和关系间距，控制每个模块的几何秩序。
- 动效写出入口条件、初态、终态、结束交接、响应式与reduce行为。
- 对固定正文、流式标题、容器字号和JS测量字号分别处理。

### Don't

- 不把原站记成严格8px间距、统一12列或全部clamp的设计系统。
- 不把所有章节标题都变成卡片里的超大渐变文字。
- 不把首页卡片改成无数小卡，也不把案例正文层层套框。
- 不把过去遗留的selector当成当前页面实际显示的组件。
- 不把主题场景切换写成可切换的用户亮暗主题。
- 不把慢速环境动效、滚动映射、时间动画都统一设为750ms淡入。
- 不把品牌拉丁Display规则直接套给未经验证的中文字体。
- 不依据aria-modal、reduce CSS或源码注释声称不存在的完整可访问性保证。

## 8. Responsive Behavior

### 8.1 Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Wide media | `≥1080px` | 案例轮播向右延伸304px；正文仍保持阅读列 |
| Desktop | `≥861px` | 容器padding32px，项目双栏；案例浮动16px边界与三轨网格；About左右时间轴 |
| Compact / tablet | `≤860px` | padding20px、section80px；项目单栏全宽卡、媒体在前；导航缩小仍胶囊；案例目录隐藏、正文单栏 |
| Phone hero / evidence | `≤560px` | 姓名两行38cqw；首屏简介18px，底部行动区；证据双图改单列；竖向轮播尺寸调整 |
| Deck-specific | `1100 / 860 / 780 / 720px` 等 | 只在对应演示组件中应用，不作为普通网站统一断点 |

### 8.2 关键字号的实测矩阵

| 视口宽 | 姓名字号 | 主要章节 | 作品标题 | 卡片摘要 | Hero简介 |
| --- | --- | --- | --- | --- | --- |
| 1920 | 238.64px | 92.8px | 88px | 20px | 32px |
| 1440 | 238.64px | 92.8px | 88px | 20px | 32px |
| 1280 | 231.04px | 92.8px | 83.2px | 20px | 32px |
| 900 | 158.84px | 74.25px | 58.5px | 20px | 32px |
| 860 | 155.8px | 70.95px | 55.9px | 20px | 32px |
| 768 | 138.32px | 63.36px | 49.92px | 20px | 32px |
| 560 | 197.6px | 52.8px | 40px | 20px | 18px |
| 390 | 133px | 52.8px | 40px | 20px | 18px |
| 320 | 106.4px | 52.8px | 40px | 20px | 18px |

560px姓名字号比768px更大是有意切到两行38cqw，不是断点错误；布局形态变化比单纯缩小重要。以上为字体加载后计算值，不包含scaleY1.5的额外视觉高度。

### 8.3 Collapsing Strategy

- 首屏：桌面大幅影像/下部文案，手机两行姓名/按钮落底，保持品牌强度。
- 项目：双栏交替改媒体在前单栏；文字尺寸保留阅读下限，卡片高度自然增长。
- 案例：浮动sheet边界、目录、三轨阅读列改全宽单列；正文16px与章节48px保留。
- 证据：电脑端允许右侧出血，手机收回容器并展示完整单张画面。
- About：年份/左右内容改年份、照片、正文纵向关系；去掉正文背后模糊图层。
- 地球：不能依据旧注释断言手机自动取消旅程；源码主要根据reduce与WebGL能力选择静态模式，手机禁用画布拖拽。
- 页脚：两端flex变分组竖排；计数部分可隐藏，保持导航可用。

### 8.4 Touch Targets 与原站边界

原站部分关闭按钮42px、mini-header返回38px、手机轮播40px，小于常见44px目标。常规站点此次程序focus未观察到统一显式focus环；Deck源码则明确2px Lavender、offset3px。源码提供Escape退出和焦点返回，但阅读器未见完整Tab循环限制。

这些是原站边界，不应在文档里自动美化成已具备的能力。若将本规范用于生产设计，建议将小控件点击范围扩至44px、所有入口补focus-visible、完整处理modal焦点及reduce JS；新增项属于规范化建议，不能冒充实测原值。

## 9. Agent Prompt Guide

### Quick Color Reference

- Background: `#0d0c11`。
- Elevated surface: `#1f1d26`。
- Heading text: `#ece9f1`。
- Body text: `#a39fb0`。
- Ring / border: `#2a2833`。
- Accent / focus: `#d0bcff`。
- Mint title: `#b9f2c8`。
- Pink title / narrative: `#ffd8e4`。
- Case background: `#ffffff`。
- Case ink: `#17151b` / prose `#36333c`。
- Case interactive: `#5b3df5`。

### Quick Summary

先选择阅读场景，再使用原站对应的字体与布局。主站深色、案例正文白色；1320px容器包含padding；Display压缩且可拉伸、叙事轻衬线、控件等宽。中心开场与章节标题配局部左对齐正文。卡片1/1双栏、顶部文件夹轮廓、16:10媒体；案例正文720px轨道与672px段落。动效分功能反馈、阅读进入、首屏编排与环境运动；不是全部元素统一入场。

### Example Component Prompts

- Hero: 构建原站语言的深色全视口开场。1320px容器包含左右32px；Neudron800姓名按19cqw、行高.92、scaleY1.5，Mint内部渐变；轻衬线简介32px/1.25居中。保留影像空间与整组700ms文案进入；≤560px切两行38cqw与18px简介，并为底部按钮留172px。
- Card: 构建宽幅作品卡。1fr/1fr、padding28–52px、gap32–72px；画布同色、仅顶部24px圆角、1px白色16%轮廓向下渐隐。标题40–88px、行高.92，摘要20px/30px；媒体16:10与16px圆角。hover上移3px，白边升至28%，标题渐变600ms移动。
- Navigation: 构建真正共用中轴的胶囊导航，top16px、padding14px32px、gap30px、等宽15.2px。≤860px改padding12px20px、gap18px、14.4px，仍保留胶囊；不要自行添加当前原站没有的手机汉堡。
- Reader: 构建深色封面加白色连续正文的案例阅读器。桌面sheet四边16px、22px圆角；主体三轨目录/720px正文/空列、gap64px。正文16px轻衬线、28px行高、672px最大段宽；章节48px、小节16.8px700；图片在论点附近，轮播允许右侧出血。
- Motion: 对每个效果写出触发条件、进度来源、结束交接和reduce规则。按钮150–200ms，阅读进入450–750ms，首屏总序列约2.2s，环境层线性慢速循环。桌面卡片展开520ms几何morph，后接60ms延迟和450ms正文显现；手机/深链接采用上滑。

### Ready-to-Use Prompt

依据本规范设计一个与Harrison Wheeler参考站同一视觉语言的作品集。先明确四种阅读场景中的适用场景，使用§2颜色、§3字体层级、§5容器与关系间距、§8响应式及§10动效。保留实际字体角色、中心与局部左对齐轴、文件夹卡片和浅色长文阅读层。每个设计决定给出角色、具体数值与状态；不自造8px网格、12列栅格、统一clamp或统一淡入。替换字体、增加中文或强化可访问性时，标为适配决策并重新校准。

### Iteration Guide

1. 先检查构图与阅读场景，是否把深读误做成展览首屏。
2. 再检查容器口径、对齐轴、行宽与媒体比例。
3. 再检查字号/字重/行高/字距是否作为完整样式角色一致。
4. 再检查同一种关系的间距和组件尺度。
5. 最后处理颜色细节、纹理与动效；没有阅读依据时不增加动效。
6. 检查字体ready、断点切换、长标题、低高度、reduce和返回阅读位置。

## 10. Interaction Patterns & Motion Specification

### Motion Quick Reference

| 对象 | 动作/进度 | 时间/缓动 | 触发与边界 |
| --- | --- | --- | --- |
| Primary / Ghost | 上移1px、颜色变化 | 位移150ms；颜色200ms | hover；disabled不位移 |
| ProjectCard | 上移3px、边白16%→28% | 200ms | hover；标题渐变另用600ms |
| ResourceLink | 向右24px | 350ms主缓动 | hover |
| RevealUp | Y30px→0、opacity0→1 | 750ms主缓动 | IO .2；底部−10%；可重播 |
| Hero portrait | 从左侧−46vw拖入 | 1400ms主缓动 | 首页加载；reduce跳过首屏编排 |
| Hero copy | Y48px→0、opacity0→1 | 延迟1500ms、700ms主缓动 | 完成后交还transform给滚动 |
| Hero scroll | 文案上移scrollY×.35 | 滚动位置映射 | 不设固定duration；reduce跳过 |
| Card stack | top=base+8i、后卡覆盖 | 原生sticky | 根据最高卡重算；reduce仍sticky |
| Section title | Y−36f、opacity1−f | 覆盖进度f映射 | sticky96px；reduce改static |
| Community strip | 整轨左移一半 | 70s linear循环 | reduce改手动横向浏览 |
| Timeline row | 整行opacity0→1 | 700ms主缓动 | ≥12%可见；完全离屏才移除 |
| Timeline hold | 固定一屏、三图交替 | 15s循环，延迟0/5/10s | 220vh/手机170vh；reduce首图 |
| Globe journey | 五段镜头与CTA | 500vh；每帧追近8% | 正常能力初始化；reduce静态 |
| Card → Reader | 几何、颜色、圆角变换 | 520ms主缓动 | 桌面点击且有origin；非reduce |
| Reader body | Y14px→0、opacity0→1 | morph后延迟60ms、450ms | 只作用layout与close，非全部封面 |
| Reader basic / close | 上滑进入/下滑退出 | 500ms主缓动 | 手机、深链接或退出 |
| Carousel | track到当前slide | 450ms主缓动 | 手动按钮/键盘；不循环、不自动 |
| Subscribe panel | Y12px/scale.96→正常 | 位移260ms；opacity200ms | 滚动>150px后等待1000ms |
| Deck shared element | FLIP回到新位置 | 720ms主缓动 | data-shared相同；reduce跳过 |
| Deck counter | 0→目标，保留前后缀 | 950ms余弦ease-in-out | 页面进入；reduce直接终值 |

主缓动均指`cubic-bezier(.22,1,.36,1)`。下文逐项记录细节；表格不能代替退出、重算和减弱分支。

### 10.1 动效语言（设计归纳）

原站的动效不是每个元素都有一段动画，而是四个分工明确的层次：功能反馈 150–350ms（按钮/链接/关闭按钮）、阅读显现 450–800ms（淡入与短距离抬升）、品牌首屏 1.4–2.2s（拖入人物→文案出场）、环境运动 10–70s（网格/照片带/徽章慢速循环）。主统一缓动是 `cubic-bezier(.22,1,.36,1)`，起步快、收尾长、无回弹。循环使用 linear；首屏亮度与淡出使用 ease；纯滚动视差直接映射滚动位置，不应混用常规 600ms transition。

`scaleY(1.5)` 主要是静态品牌字形拉伸，不是伸缩动效。用可变化的透明度、短距离位移、纹理漂移和少量空间转场保持动势；大的动作集中在首屏与打开案例。以下“设计归纳”是从实际规则总结出的可复用语言，并非原站明文规范。

### 10.2 首页首屏：明确的导演式顺序

| 元素 / 选择器 | 初始→结束 | 时间与缓动 | 触发 / 限制 |
|---|---|---|---|
| `.hero-loadbar` | scaleX(0)→1，80% 时满宽，100% 时 opacity 0 | 1.4s ease，forwards | `html.hero-intro-lock`；3px，左端原点，fixed z9999 |
| `.hero-bigimg` | translateX(calc(-50% - 46vw))→translateX(-50%) | 1.4s cubic-bezier(.22,1,.36,1)，both | 首页 staged hero |
| `.hero-contour` | 与人物同轨拖入；之后整体淡出 | 拖入1.4s；2.4s后开始0.6s ease淡出 | 白色1.6px轮廓，mask自64%至84%淡化 |
| `.hero-contour path` | stroke-dashoffset 0→−16 | .7s linear infinite | 9/7 虚线产生 marching ants；只作为首屏设计操作隐喻 |
| `.hero-drag-cursor` | 同步人物从−46vw拖入，之后消失 | 拖入1.4s主缓动；1.25s延迟后.4s ease opacity→0 | 位于人物上方，pointer-events none |
| `.hero-logo-bg` | brightness(1)→brightness(0)，前30%保持亮 | 1.4s ease，delay .1s，both | 深色轮廓底层；最终 opacity=.85×fade |
| `.hero-stage-content` | opacity 0→1；translateY(48px)→0 | .7s主缓动，delay 1.5s，both | 整组姓名、说明与CTA；总计约2.2s |
| `.nav` | intro-lock时隐藏并禁用指针；解除后 opacity→1 | .5s opacity | 首屏锁期间 html/body overflow hidden；JS在执行时加锁，固定1500ms后解锁；reduce直接跳过 |
| `.hero::before` | 背景网格水平移动一个单元 | 10s linear infinite，background-position 0→−40px | 40×40px网格，opacity .5，非元素整体位移 |

首屏锁滚与导航隐藏是首页inline脚本执行时开始，1500ms timer后解除，不以图片加载完成、DOMContentLoaded或整套动画结束为条件。由CSS时序可知文案正好在1.5s开始进入，到2.2s完成，因此用户在文字升起过程中已可滚动；这不是“等待全部完成后解锁”。每次非reduce首页加载会重新执行，未见sessionStorage记忆来限制为每会话一次。

首屏文案的 `hero-content-rise` animationend 后 JS 加 `.intro-played` 取消 animation，使同一 transform 能交回滚动视差。实现同类规范时应明确 entrance→scroll 两个运动阶段的所有权；否则 fill-mode:both 会占用 transform 造成滚动效果失效。

手机<=560px保持相同首屏动效，但主体图像与轮廓 height 88%、bottom 6%；hero 使用100svh，文案 bottom padding172px，CTA固定在左右20px与安全区之上，名称换成两行。不能将桌面位移距离原样替成固定像素；原站拖入距离是46vw。

### 10.3 首屏滚动视差与导航

staged hero 的文案相对正常文档滚动额外上移 `scrollY×−.35`；logo在滚动的前半个视口高度内向下漂移并消失。`t=min(1,scrollY/(.5×viewportHeight))`；logo额外位移`t×avail`，avail=max(0,heroHeight−logo底部−12px)；opacity=.85×(1−t)。这使底层logo滞后、前层文字更快离场，产生景深且不撞到首屏裁切边缘。JS采用passive scroll+rAF；滚过hero高度后不再更新。reduced-motion跳过这组视差。

首页 `.show-brand` 的条件是 hero 的底边已越过导航高度，logo/name用.25s淡入；图标另有.3s transform transition。JS在scrollY>24时加 `.nav.scrolled`，但本次CSSOM未看到该class对应视觉覆盖；不能根据源码注释宣称“背景由透明变模糊”。当前胶囊导航的半透明背景和blur默认就存在。

CSS和JS保留汉堡变叉（.25s，上下横线分别translateY±7px rotate±45deg，中线opacity0），但是实际<=860px `.nav-toggle` 为 display:none，采用缩小后的胶囊导航。该动效是可用声明/历史组件，非当前手机默认体验。

旧式 `.hero .hero-photo` 另有 scrollY×−.18 的上移，以及 hello-pill从rotate(3deg)→rotate(−2deg) scale(1.04)，.4s。仅当DOM存在这一旧式hero-photo才启用；不能混入当前staged hero的默认规则。

### 10.4 首页案例卡片：浏览过程中的物理堆叠

卡片使用原生position:sticky，不是JS scrub缩放。基准 `base=min(96px,viewportHeight−maxCardHeight−16px)`；第i张卡（从0起）的top=`base+i×8px`，z-index=i+1。统一以最高卡计算base，保证各卡pin顺序递增、后卡覆盖前卡且露出前卡8px圆角顶部。长卡在移动端可使用负top，先让所有正文滚入视野，再pin其底部；不能将其误写成“所有卡固定96px”。load/resize/ResizeObserver重新测量尺寸。

Hover是三条并行反馈：卡片translateY(−3px)，.2s；masked边框白色alpha .16→.28，.2s；标题渐变background-position 0 100%→0 0%，.6s（背景尺寸100% 200%）。原站没有卡片大范围紫色辉光，也没有hover整体放大。标题的渐变移位和主标题静态scaleY需分开记录。减弱动效时CSS transition降为.01ms，sticky与每卡top/z-index继续存在。

### 10.5 章节标题：被正文覆盖的层次

`.phead` sticky top96px，底部留白clamp(80px,12vh,150px)。内部`[data-phead]`承受opacity/transform，测量时使用未变形的外层wrapper。定义 `f=clamp((stickyBottom−bodyTop)/stickyHeight,0,1)`；透明度=1−f，位移Y=−36f px。正文位于更高层级，向上覆盖标题，标题同时后退消失。没有独立固定持续时间，进度由正文位置决定。

reduced-motion专门将phead改static、padding-bottom0，内部opacity1、transform none，JS不执行视差。此模式不同于卡片堆叠，后者没有取消sticky。

### 10.6 内容进入、播客与社区

通用`[data-reveal-up]`初始opacity0/translateY30px，进入后opacity1/none；.75s主缓动，IntersectionObserver threshold .2、底部rootMargin−10%。class根据isIntersecting双向切换，重复进入可重播。`.timeline-group`旧式组初始抬升48px、.45s主缓动；threshold .2、底部−12%。`timeline-photo.in`最终rotate(−3.5deg)是稳定倾角，不是持续旋转。

播客头像背景`.podcast-guests` opacity .9s transition。section阈值.15首次进入后加is-in并disconnect，为一次性淡入。滚动参数`t=clamp((viewportCenter−sectionCenter)/(viewportHeight/2+sectionHeight/2),−1,1)`；整层Y=−28t px；每行X=t×data-px（各行方向/幅度来自DOM）。reduced-motion跳过位置漂移，但保留显现，由全局transition降时处理。

社区图集将`.community-track`复制一次，副本aria-hidden=true，二者包进`.community-marquee`；70s linear infinite，X 0→−50%，形成无缝左移。CSS未见hover pause。原图集静态高低错位：桌面奇数Y−28px、偶数Y20px；手机−14px/+10px。reduced-motion不创建marquee，strip overflow-x:auto，提供手动横向浏览。不要把静态交错误认成每张照片上下浮动。

波浪文字`.arc-svg`是另一种滚动工具：文字沿静态二次贝塞尔路径位移，textPath startOffset=−scrollY×.6；路径每190px半波、振幅34px。JS没有reduced-motion guard；CSS的全局animation:none并不会停止这条JS滚动映射。如当前DOM无arc，该代码不启用。

### 10.7 About 首屏与时间轴

About `.story-head-text > *`常规进入为opacity0/Y28px→正常，.75s主缓动；源码对子项delay分别.7/.13/.21/.27s；当前About标题组实测只有h1，不能把未使用的后续子项延迟当成真实的整组进入；`.story-bigname`首尾保留scaleY1.5，在拉伸坐标基础上Y28px→0。`.story-head-media`从X48px进入，.8s主缓动、delay .17s；只在存在此媒体节点时启用。标题/说明向上离场时，元素top未越过80px仍完全可见；越过后 opacity=clamp((top+height)/(80+height),0,1)，按滚动直接淡出，reduce时跳过。

时间轴中央spine通过scaleY从顶部向下生长，进度`clamp((.82×viewportHeight−railTop)/railHeight,0,1)`；底部年份的56pxconnector使用相同参考线，起点位于年份上方16+56px。该JS在reduced-motion下仍会更新；不能宣称原站减弱模式所有滚动视觉都关闭。

真实About行以整行`.tl-row`为观察单位，同步年份、照片、正文。IntersectionObserver threshold=[0,.12,.6]；当intersectionRatio≥.12时整行加in，仅完全离屏才移除，部分可见时保持原状态。`[data-reveal]`只做opacity0→1，.7s主缓动，不附加位移。这样避免手机长行中照片已显现而正文仍隐藏的脱节。reduce或无IO直接显示全部。

桌面每张正文卡背景借用本行图片，宽74%、16:11、blur14px、opacity .32，作为叙事气氛，而不是再复制一张清晰证据图。背景视差Y=`((viewportCenter−cardCenter)/viewportHeight)×60px`；实际公式未clamp，不能写成严格±30px。手机<=860px这层伪元素display:none，reduce也不更新视差。

`.tl-hold`的高亮章节桌面占220vh，内部sticky top0、height100vh；手机占170vh。此sticky停留本身未在reduced-motion专门取消。三图carousel用15s linear无限循环，各图delay0/5/10s；每图0%opacity0，5%(0.75s)变1、33%(4.95s)仍1、40%(6s)变0。reduce停播只显示第一图。普通streetview链接hover上移2px/边框Lavender，.2s；内部CTA背景alpha .06→.16，.2s。

### 10.8 Globe：滚动旅程与静态回退

本次先在reduced-motion模式观察到`.globe-scrolly.is-static`，随后以非reduce模式重新加载About，确认canvas存在、is-static移除、500vh旅程激活，滚动时画布位移随进度变化。仅切换系统偏好不会自动重新初始化此旅程；需要重新加载。下面的精确阶段、镜头数值和曲线来自源码核查，并非每个阶段都已逐帧实测。story.js的旧注释说手机降级，但实际静态分支条件只有 reduceMotion || !section；isMobile用于静态镜头zoom/转速，不是当前journey停用条件。WebGL缺失、Mapbox不支持/加载或构造失败也会showFallback→is-static。

源码中的完整journey：section500vh，stage sticky top0/100vh，画布容器边长max(100vw,100vh)。p=clamp(−sectionTop/(sectionHeight−viewportHeight),0,1)，当前p每帧向目标追近8%（DAMP=.08），不是固定ms的transition。镜头主移动采用Catmull-Rom过城市坐标与smootherstep节段ease，以减少转折和硬停；局部zoom/dock用smoothstep(t²(3−2t))。

- 0–12%：从San Francisco移向第一站，zoom1.35→3.30、pitch0→32°；intro按p淡出，画布从额外Y(.18vh+128px)归位，背景逐步blackout。
- 12–72%：近景旅程，zoom3.30/pitch32°；城市路径依次绘制，最后8%的旅程区间停留末站；已完成80%飞行段的城市标签显现（.4s）。底部城市/国家文字.35s opacity。
- 72–84%：末站回到Asia中心、zoom3.30→2.15、pitch32°→0；地球向下shift至.5vh，恢复页面背景，星空渐显。90颗1/2px星点是静态图层，只有整体opacity变化，未见twinkle。
- 84–93%：半球停在底边，CTA从bottom−72vh抬升归位；年份/连接线/标题先显现。标题完全显现后等待500ms再显示副文案与按钮（.45s），回滚会取消待执行timer并隐藏正文，防止未落稳就可点击。
- 93–100%：free-mode每秒5°旋转、可拖拽；pointer位移每px映射.3°，纬度限制±85°，拖拽时停止自动旋转。线路700ms淡出；退出free时镜头450ms easeTo回归并同步450ms恢复线条。手机CSS canvas pointer-events:none，实际不会开放这套拖拽。

静态模式将500vh改auto、stage相对布局、画布680px max/520px高（手机380px）；CTA进入普通文档流、隐藏城市切换/blackout/scroll cue。reduce模式静态镜头且不自动spin。非reduce又无scrolly section的源码备用分支仍可轻转：桌面6°/s、手机4°/s，document.hidden暂停时间累计。文本WebGL fallback没有运行的地球动效。

### 10.9 案例 Overlay：卡片到阅读器的连续空间转接

#### 入口与状态

普通左键点击`[data-cs]`卡片（Meta/Ctrl/Shift或非左键不拦截），读取CASE_STUDIES正文并建立单个`role=dialog`、aria-modal的`.cs-overlay`，在主页面上方打开阅读sheet，不跳转到独立页面。点击把`#cs=key`写入history.pushState并更新document.title；载入深链接也能渲染同一overlay。保存点击前activeElement和window.scrollY；body加cs-lock，背景overflow hidden，overlay.scrollTop归零。

是否走morph必须同时满足：有origin卡片、Element.prototype.animate可用、视口>=861px、非reduce。深链接/浏览器forward没有origin，因此即使桌面也采用sheet上滑。手机与reduce也走基础路径；reduce通过全局transition-duration .01ms将上滑几乎立即完成。

#### 桌面morph的精确序列

1. overlay加cs-morph/open，真实sheet透明但已经在目标位置布局；建立fixed `.cs-morph-ghost`，pointer-events none，z560，shadow 0 0 60px rgba(0,0,0,.4)。ghost不复制卡片里的文字或图像，是纯色几何替身，因此是“卡片框架长成阅读器”，不是整张内容逐元素共享形变。
2. WAAPI从点击卡片`getBoundingClientRect()`的top/left/width/height开始，深底#0d0c11、圆角24px24px0 0，变化到top16px/left16px/width视口−32/height视口−32、白底#fff、完整22px圆角。duration520ms，easing cubic-bezier(.22,1,.36,1)，fill forwards。位置、大小、颜色、圆角共同变化。
3. onfinish添加cs-revealed、移除ghost，真实sheet立即opacity1；其关闭按钮和正文layout的opacity0/Y14px→1/Y0，.45s主缓动，delay .06s。整套正常点击从morph开始到正文落稳约1.03s。注意CSS只给`.cs-layout`和`.cs-close`延迟进入，顶部`.cs-hero`不在该选择器内，换入真sheet时封面直接出现；不要写成“所有内容450ms统一渐显”。
4. 另有620ms timer调用同一settle，防止后台tab动画onfinish未及时触发。它是事件兜底，不是正常动画持续620ms。settle有revealed和cs-morph状态保护，关闭中途不会再显示旧overlay。

背景body::before从opacity0→1，.5s，色rgba(8,7,11,.45)，z499；overlay z500。桌面overlay clip-path inset(16px round22px)，sheet四边16px、完整22px圆角；手机sheet顶24px、底16px、18px圆角。基本打开路径sheet从translateY100vh→0，.5s主缓动；开启前强制测量重排确保transition重播。

#### 关闭、历史和阅读位置

点击封面左上关闭、滚动后mini-header关闭、点击overlay本身的外部peek/dim区域、按Escape均close。没有反向morph回卡片：立即删ghost、移除morph/revealed/open，回到基础sheet向下translateY100vh的.5s退出；遮罩同时.5s消退；body.cs-lock立即移除。450ms后若未再次打开，清空sheet正文（这一清空比CSS500ms略早，应记录原站真实时序，不将450ms当作退出时长）。

如果history.state.cs存在且非skipHistory，history.back回到打开前状态；popstate可重新打开history中的case或close(true)以避免再次back。直接深链接载入没有额外push，关闭后没有同一逻辑保证清空#cs hash。恢复原activeElement.focus({preventScroll:true})，为压住focus/history异步恢复引起的跳位，重复scrollTo(0,savedScrollY)：立即一次、下一rAF一次、setTimeout0一次。此为浏览位置保全，不是滚动回顶部。close期间焦点恢复与背景解锁立即执行，未等待退出transition。代码提供Escape与焦点返回；未见Tab循环focus-trap实现，不能据aria-modal推断键盘焦点被完整限制在阅读器内。

#### 目录、阅读进度与mini-header

目录从`.cs-main h2[id]`生成，正文h1及紧随其后的cs-deck介绍会移到独立深色封面header。目录click不改浏览器hash，preventDefault后调用overlay.scrollTo({top:h.offsetTop−70,behavior:'smooth'})。这里显式smooth没有reduce判断，不能依据html scroll-behavior:auto声称JS目录滚动也被关闭。目录active的scrollspy根是overlay，rootMargin −8% 0 −80% 0；标题进入视口8%–20%窄带时对应链接高亮。正文最后短章节无法到达该带时，滚到底（距离末尾<=4px）强制最后一项active。

mini-header显现条件：封面标题`.cs-hero-title`或回退`.cs-main h1`的boundingRect.bottom<0；找不到标题时overlay.scrollTop>300。它从Y−100%→0，.3s；内容标题居中，关闭按钮左侧。progress3px，width=min(100,overlay.scrollTop/(scrollHeight−clientHeight)×100)；无可滚动高度则0。滚动处理passive+rAF，非计时自动增长。桌面TOC sticky top84px，手机<=860px隐藏，改为顶部阅读控件。

#### 轮播：用户控制，不自动播放

每个`[data-carousel]`独立维护index，前后按钮或容器ArrowLeft/ArrowRight改变index并截在0…n−1。track translateX=−min(目标slide.offsetLeft,track.scrollWidth−viewportWidth)，.45s主缓动；保留可见的邻张露出/宽幅适配，并且末张不会滑过内容尽头。无touch swipe逻辑、无定时autoplay、无循环wrap。x<=0禁用prev，x>=maxScroll−1禁用next；单张直接隐藏箭头。媒体load、video loadedmetadata、ResizeObserver(track)、window resize重新定位当前index，防止自然尺寸加载后箭头/位移失效。

按钮基础位于垂直50%，hover在translateY−50%基础上scale1.06，background更白，.2s；disabled opacity .3。关闭/返回按钮hover scale1.05、背景加深，.2s。案例hero的48px网格40s linear一周期，reduce关闭。

#### 封面标题必须考虑运行时字号

overlay的最终案例标题并非仅CSS clamp(2.4rem,5.4vw,4.6rem)：fitHeroTitle执行12次二分并写inline fontSize，须与静态排版规则区分。桌面搜索28–220px，标题未拉伸的offsetHeight需<=(hero扣除padding的内高/1.5)×.98；scaleY1.5后的绘制高才能恰好充满封面而不裁掉字顶。手机搜索28–160px，同时要求scrollWidth<=clientWidth+1（最长单词不能横向溢出）、offsetHeight<=视口高度×.38/1.5；最终绘制高度约限制为38vh。源码注释的“~45%”不是实际值，文档应采实际38%。手机另加marginTop=round(offsetHeight×.5)，预留字形向上伸长的空间以避开关闭按钮。fonts.ready、resize debounce120ms、861px媒体查询翻转后都会重算。完整规范若要套用，应明确这是例外的测量式标题fit，而不是随意放大字号。

### 10.10 细节反馈与减弱动效

按钮背景/文字/边框.2s，transform .15s；primary hover Lavender变浅(#d0bcff→#e3d6ff)并Y−1px；ghost hover alpha.14白底、Lavender边框/文字、Y−1px。disabled opacity .5、无位移。列表链接hoverX24px，.35s主缓动，文字/箭头颜色.2s。popover由Y12px scale.96/opacity0→Y0 scale1/opacity1，transform .26s主缓动、opacity .2s、visibility .26s，原点right bottom；scroll超过150px后等待1000ms打开，localStorage记住关闭；不需要实际提交验证。

原站reduce总规则：所有CSS animation none !important、scroll-behavior auto !important、transition-duration .01ms !important。JS显式跳过hero视差、phead视差、图片背景视差、播客漂移、社区自动marquee、globe journey/spin；但卡片sticky、tl-hold sticky、timeline draw与arc的JS映射仍存在。不存在一个笼统“全部动画停止”的无障碍保证。设计规范应把这些原站边界写明；若为可复用规范新增更严格的减弱策略，须标注为规范化建议而非原站实测。

### 10.11 Deck 演示模式：仅作为扩展，勿误并默认页面

html.deck-mode会锁滚、隐藏nav/footer/main；deck fixed全屏z1000。slide默认opacity0/visibility hidden，active即显现，未定义常规左右滑动转场；deck--cut更是无transition。内容内部才按组导演：图表Y28px/.65s、opacity .5s、delay .34s；about-cardY30px/transform .65s/opacity .55s、delay0/.12/.24；triptychY46px/.7s、opacity .5s、delay .18/.46/.74；手机模型scale.84→1/.72s、delay.15，再在.87s显示两边说明；brief sheetY70px/.9s、opacity .7s、delay.15。CS设备Y60px/1.1s、delay.45；cover-artY额外140px/1.2s、delay.35。环境网格40s、播客三行90/66/112s、纵向照片带34s、横墙60s，均linear且移动−50%。非active播客行pause，html.deck-reduce关闭这些CSS动画与transition。

#### Deck 的运行时交互与额外动画

源码以P打开演示（输入框/contenteditable内不触发，Meta/Ctrl/Alt不触发），[data-present]点击也可进入，window.HWDeck提供open/toggle/openCaseStudy。进入html.deck-mode隐藏常规页面并锁滚；并非用户进入首页即启用。内部ArrowRight/PageDown/Space下一张，ArrowLeft/PageUp上一张，Home/End首尾，所有index截在边界；G开全页slide overview（真实DOM缩小预览，video预览禁autoplay并pause）；overview打开时只处理G/Escape，不偷偷翻页。Escape在case演示回主deck的Work页，在主deck退出；关闭移除mode并清理?present/#present入口标记，防止刷新重复进入。提示条显示3.2s后以CSS opacity .5s淡出。

相邻slide若data-shared key相同，默认cut80ms并用FLIP保持空间连续：计算旧rect与新rect位置差，width变化时按旧宽/新宽等比scale，原点top left，起始translate(dx,dy) scale(s)→正常transform，.72s主缓动，800ms后清理inline状态。reduce不做FLIP；places slide由自己的退出动效接管，避免叠加transform。视频slide可让globe slide以is-under保留在下层旋转，以实现“视频井升起覆盖地球”，不误当作地球重新从头进场。

数据counter从0到目标，保持数字前后缀与小数位，950ms余弦ease-in-out（.5−.5cos(πt)）；reduce直接最终值。图表内部构建等待340ms（与panel入场delay一致），再触发折线stroke-dashoffset归零、bar展开与计数器，以让文案先读、视觉后构建。需注意340ms只是delay匹配，panel的位移还在进行，不是“等待panel整段动画完全结束”。

## 11. Presentation / Deck：独立的演示设计规范

普通网站为自主浏览设计，Deck为讲解场景设计，两者不能共用全部密度与字号。实测按P进入、右箭头翻页、Escape退出；下面精确令牌与专项组件规则来自`deck.css`及`deck.js`，不是常规首页的默认呈现。

### 11.1 屏幕构图与版心

Deck fixed全屏、z1000，进入后隐藏主站导航、main与footer并锁页面滚动。slide内部max-width1400px，水平padding`clamp(28px,8vw,160px)`；标题顶部原点`clamp(32px,4.5vh,60px)`，底部控制区预留`clamp(104px,13vh,152px)`。这套版心与网站1320px容器独立，不要交叉引用。

标题在幻灯片之间共享起点，密集内容使用小一级标题，而不是挤压底部控制区。每页以一个观点或一个作品阶段为单位；多栏、图表、设备图和指标都有专项布局，原站不存在“每页固定三个卡片”的模板。

底层使用Lavender10%与Pink6%的低透明度局部wash，以及48px网格、1px Lavender7%线；网格40s移一个单元，白色内容页用不透明底覆盖。连续底层让翻页有共享空间，不能把这层wash移植为案例长文的默认背景。

### 11.2 Screen Type Tokens

以下是原始clamp令牌按16px根字号换算的边界。表格是“最小 / 流体项 / 最大”，不能把最大值当成所有屏幕下的实际值。

| 令牌 | 最小 | 流体项 | 最大 | 用途 |
| --- | --- | --- | --- | --- |
| `--t-hero` | 41.6px | 14.5vw | 208px | 开场姓名 |
| `--t-cover` | 64px | 11.2vw | 153.6px | 案例演示封面 |
| `--t-title` | 44.8px | 7.6vw | 102.4px | 常规页标题 |
| `--t-title-lg` | 36.8px | 5.1vw | 72px | 大章节 |
| `--t-title-md` | 35.2px | 4.6vw | 64px | 常用章节 |
| `--t-title-sm` | 30.4px | 4.1vw | 54.4px | 较密页面 |
| `--t-title-xs` | 28px | 3.6vw | 49.6px | 最密页面 |
| `--t-stat` | 57.6px | 9vw | 136px | 重点数据 |
| `--t-quote` | 25.6px | 4.2vw | 57.6px | 主要引述 |
| `--t-quote-sm` | 20.8px | 3.2vw | 44.8px | 次级引述 |
| `--t-lede` | 16.8px | 1.9vw | 28.8px | 叙事引导 |
| `--t-item` | 18.4px | 2vw | 29.6px | 名称型列表 |
| `--t-copy` | 16px | 1.6vw | 24.8px | 正文 |
| `--t-list` | 15.2px | 1.35vw | 20px | 细列表 |
| `--t-label` | 12.8px | 1.1vw | 16.8px | 标签 |
| `--t-micro` | 9.92px | .88vw | 13.6px | 大写微标签 |
| `--t-nano` | 8.8px | .75vw | 11.2px | 最细辅助信息 |

常规标题Neudron800、line-height.98、tracking−.01em、balance；开场姓名与封面另有.76行高和1.5倍纵向处理，不覆盖所有页标题。lede为Merriweather300、1.45、Pink、max28ch；body为轻衬线、1.55、max34ch。小标签不应代替重要手机正文。

### 11.3 Container Type Tokens

小组件随自身可用宽度缩放，使用cqi，而不是跟整个视口一起膨胀。原站在1400px设计宽度校准之后，将卡片内部字号关联到其inline-size container。

| 令牌 | 最小 | 流体项 | 最大 | 原站角色 |
| --- | --- | --- | --- | --- |
| `--tc-head` | 21.6px | 10.6cqi | 32px | About卡标题 |
| `--tc-body` | 13.6px | 5.8cqi | 16.8px | About卡正文 |
| `--tc-cell` | 10.56px | 2.9cqi | 14.72px | 旧2×2单元 |
| `--tc-cap` | 13.6px | 5.9cqi | 21.6px | 三联图注 |
| `--tc-label` | 8.8px | 3.4cqi | 11.2px | 规格卡标签 |
| `--tc-desc` | 10.88px | 4.4cqi | 14.72px | 规格卡正文 |

例如演示About卡标题实际line-height1.12、正文1.6；≤860px单列gap14px，正文隐藏。这是演示模式的信息压缩策略，不能用来删掉普通About页手机正文。

### 11.4 Data Visualization / Diagram Grammar

**图表容器：**三列grid、gap`clamp(12px,1.4vw,18px)`，手机单列并取消跨列。viz-card底`#16151c`、边`#2a2833`1px、radius10px，上下padding12–18px、左右14–20px。标题Neudron26px/1.1；数字等宽；图例色块10px、radius3px、色块与文字gap7px。

**深色六阶连续序列：**`#d7ccff`、`#bcacf7`、`#a08cec`、`#8874df`、`#705bc9`、`#5847ac`；图表grid为`#2f2d39`。通过同一色系亮度表达分组与层级，避免给每组随意分配完全不同的饱和色。

**浅色图表局部场景：**底`#f7f7f5`、grid`#e2e0e6`、ink`#17151b`、muted`#5c5866`；六阶序列`#3a2c86`、`#4d3daa`、`#5f50c2`、`#7364d2`、`#8677de`、`#9a8be7`。这只切换图表内可读性，不是全站主题开关。

**结构图：**五阶Lavender为`#e0d3ff`、`#c4b2ff`、`#a091f0`、`#7a6ad6`、`#5b4bb0`；连接线`#545260`。线宽hairline1、normal1.5、bold2.5，虚线2/5；节点Lavender填充14%/22%/30%随层级加深，节点标题Display、辅助标签Mono。Mint与Pink作为语义补充，不把它们同时当成任意数量系列的默认色。

SVG文字axis11、value12、donut中心22/800、sub9并加.06em字距；这些数值是SVG viewBox用户单位，最终可见尺寸还取决于SVG缩放，不能在手机端直接当11px字体标准。

### 11.5 Metrics / Controls / Motion

演示指标采用Display800、line-height.9、tracking−.01em、tabular-nums；指标框1px、padding16–24px、radius12–16px，方向箭头Mint或Pink、标签Mono/Lavender。四项变2×2，专项数字使用`clamp(44.8px,6.6vw,99.2px)`。这套“讲解大数字”与案例正文Merriweather30.4px的“阅读数据”分工明确。

底部controls距离底`clamp(18px,2.6vw,34px)`、水平padding20–48px；退出胶囊padding9px16px、Mono13.6px；翻页组gap14px、counter14.4px，≤720px隐藏counter。顶部progress3px，Lavender→Pink；focus-visible 2px Lavender、offset3px、radius4px。

普通翻页以cut为主；同名共享元素用720ms FLIP，数据950ms计数、图表340ms延迟构建；细节在§10.11。动效应支持讲解节奏，不能每次翻页都加漫长的全页滑入。

## 12. Ready-to-Apply System：设计交付与验收

本节把原站规则整理成可直接用于设计的工作契约。**角色命名、工作顺序与验收清单是本次设计归纳；具体原值以上文实测和源码为依据。**这是一份参考语言的可用规范，不自动批准任何项目页面改动。

### 12.1 一张设计稿必须先声明的五件事

1. 场景：Homepage / Reader / About / Deck。明确主要阅读任务与信息密度。
2. 几何：容器口径、外部边距、内容列、局部对齐轴、媒体比例。尺寸写包含还是不包含padding。
3. 字体：真实字体身份与可用性；每一角色包含font、size规则、weight、line-height、tracking、最大行宽及纵向处理。
4. 状态：默认、hover、selected、focus、disabled、open、scroll。组件不适用的状态明确写“无”，不虚构原站状态。
5. 运动：触发、初态、终态、进度来源、时间/曲线、退出与恢复、断点、reduce与失败回退。

### 12.2 语义令牌起点

以下代码只提供复用映射，变量名前缀`--ref-`是本文件定义；不是声称原站源码采用这些变量名。不包含字体下载、不写入任何现有页面。

```css
/* 原站颜色与角色；场景必须显式作用域化 */
:root {
  --ref-bg: #0d0c11;
  --ref-surface: #16151c;
  --ref-raised: #1f1d26;
  --ref-border: #2a2833;
  --ref-border-soft: #211f29;
  --ref-text: #ece9f1;
  --ref-muted: #a39fb0;
  --ref-dim: #75717f;
  --ref-action: #d0bcff;
  --ref-action-hover: #e3d6ff;
  --ref-on-action: #381e72;
  --ref-title-mint: #b9f2c8;
  --ref-title-pink: #ffd8e4;
  --ref-ease-out: cubic-bezier(.22, 1, .36, 1);
  --ref-container: 1320px; /* border-box，包含内部padding */
  --ref-page-pad: 32px;
  --ref-section-pad: 120px;
  --ref-radius-media: 16px;
  --ref-radius-reader: 22px;
  --ref-radius-folder: 24px 24px 0 0;
}
.reference-reader-body {
  --ref-bg: #ffffff;
  --ref-text: #17151b;
  --ref-muted: #5c5866;
  --ref-prose: #36333c;
  --ref-border: #e7e5ea;
  --ref-action: #5b3df5;
}
@media (max-width: 860px) {
  :root {
    --ref-page-pad: 20px;
    --ref-section-pad: 80px;
    --ref-radius-reader: 18px;
  }
}
```

字体角色另命名Display / Narrative / Structural / Utility；首页与Reader各自的Heading与Body不能只保留一对全局字号。按§3表格建立样式。CaseCover标题标记“fit测量式”；Hero姓名标记“cqw”；Deck小卡标记“cqi”。这三种规则不能合并成一个`font-size:clamp(...)`模板。

### 12.3 Component Contract：每个组件的最小规格

| 必填项 | 交付内容 | 例子 |
| --- | --- | --- |
| Role | 组件服务的任务 | ProjectCard用于筛选，ReaderSection用于论证 |
| Geometry | 宽高约束、布局、padding、gap、锚点 | Card 1/1、28–52px、32–72px；手机全宽单列gap16px |
| Type | 完整字样式与断行 | CardTitle40–88px/700/.92/−.01em |
| Material | 背景、边框、mask、radius、shadow | Card同色底、顶部白色渐隐轮廓 |
| States | 默认/悬停/选中/聚焦/禁用/展开 | 原站hover−3px；新增focus需标适配 |
| Media | 比例、fit、crop anchor、加载占位 | Cover16:10；证据contain与自然比例 |
| Responsive | 结构变化，不只缩字号 | 860px改媒体先、文字后；560pxHero两行 |
| Motion | 触发、曲线、进度、恢复、reduce | Sticky按最高卡算top；不等于动画duration |
| Provenance | 原值/实测/归纳/适配 | 记录来源页面与选择器，修改保留依据 |

### 12.4 三个强制分离的尺寸概念

- **字体排版尺寸**：font-size、line-height与实际换行；可由computed style读取。
- **正常布局盒**：offsetHeight、padding、margin、网格分配；用于定位与sticky可见预算。
- **可见绘制盒**：transform后的边界、字形实际笔画与裁切；scaleY标题尤其需要留出头部空间。

设计检查应逐一核对这三层。标题看起来过高、按钮对不齐、关闭按钮被覆盖，经常不是缺少一个新的字号，而是三种盒的口径混在一起。

### 12.5 Motion Contract：直接填写的动效描述格式

“当【触发】发生，在【范围】把【对象】从【初态】变成【终态】，使用【计时duration+delay+easing / 滚动公式】，与【其他对象】按【顺序/并行】执行；在【完成点】交还状态或transform控制；退出时【恢复焦点/滚动/媒体】；在【断点/减弱偏好/无能力】下采用【替代】。”

示例：桌面左键点项目卡、有可用WAAPI、非reduce时，用520ms主缓动把卡片几何扩到四边16px的白色阅读器；完成后换真实sheet，60ms后让正文layout及关闭按钮用450ms从Y14/opacity0归位；退出仍用500ms向下滑，并立即恢复原滚动位置与焦点。手机与深链接走基础上滑。参照§10，不自行增加反向morph。

### 12.6 原站一致性验收

- [ ] 颜色按场景与角色使用；深色主站与白色正文有清楚边界。
- [ ] 四类字体职责明确，字体实际可用；替代字体完成独立校准。
- [ ] 容器1320px含padding、手机20px、手机卡片满幅的例外有明确依据。
- [ ] 标题、说明、卡片、正文、年份、控件各自的对齐轴稳定。
- [ ] 章节间距与段落间距分开；同一语义关系采用同一数值或公式。
- [ ] 标题没有把scaleY后的可见高度误当offsetHeight；长标题与低高度视口能容纳。
- [ ] 项目媒体与证据媒体有各自比例和裁切策略。
- [ ] 卡片顶部渐隐轮廓、24px顶部圆角、hover−3px保留正确机制。
- [ ] Reader段落16px/28px、672px行宽与720px主列没有混淆。
- [ ] 860/560/1080px的结构变化明确；演示模式断点没有混入网站规则。
- [ ] 每个动效能回答触发、速度、进度、退出和reduce；入口结束后滚动视差能接管。
- [ ] 加载、重复点击、历史返回、resize与媒体加载后状态没有断裂。
- [ ] 原站没有的状态或改进标记为适配；不将遗留选择器、注释与真实启用混为一谈。

### 12.7 专家规范化建议（区别于原站实测）

如果把这套参考规范应用到新的生产界面，建议补齐：≥44px功能控件点击区域、明确focus-visible、弹层焦点限制与返回、对JS smooth scroll和所有滚动映射统一处理reduce、低对比辅助文字的调整。中文或双语设计补真实CJK字体与断行校准。没有叙事依据时缩短高亮停留或地球旅程，优先连续阅读。

这些改善应在对应组件中单独记“原值→采用值→原因”，不用它们倒改原站记录。也不要在参考阶段提前把所有间距归一为8px、所有圆角归一为12/16px；这会抹掉真实机制。

## 13. Observed Pages & Evidence Notes

### 13.1 页面范围与样本

| 样本 | 观察范围 | 页面 |
| --- | --- | --- |
| Homepage | 字体加载后布局、章节、卡片、导航、按钮、滚动、社区/播客、订阅控件 | [原站首页](https://www.harrisonwheeler.com/) |
| About | 视频开场、概述卡、时间轴、停留段、正常与reduce地球 | [原站About](https://www.harrisonwheeler.com/about) |
| Leadcraft | 案例封面、目录、正文、媒体与指标 | [Leadcraft阅读器](https://www.harrisonwheeler.com/#cs=leadcraft) |
| Pods | 封面与正文的不同媒体形态 | [Pods阅读器](https://www.harrisonwheeler.com/#cs=pods) |
| Events | 封面、章节、图组/表格类内容 | [Events阅读器](https://www.harrisonwheeler.com/#cs=events) |
| Base | 同一Reader中的另一内容实例 | [Base阅读器](https://www.harrisonwheeler.com/#cs=base) |
| Video Recorder | 自然比例视频与设备型封面 | [Video Recorder阅读器](https://www.harrisonwheeler.com/#cs=video-recorder) |
| Presentation | P进入、右箭头翻页、Escape退出；更多组件按CSS与JS核查 | 首页内置Deck，不是独立默认页面 |

首页字体/容器矩阵实测宽度1920、1440、1280、900、860、768、560、390、320px；案例主要深测1440×1000及390×844，五个案例均提取桌面实际结构/样式。About核查桌面与手机布局，并对普通及reduce模式重新加载。测量值有小数是浏览器排版结果，非必须手动写同样小数。

**2026-10-13局部复核范围：**通过agent-browser重新检查首页、About、Leadcraft与Pods，提取真实DOM、计算样式、CSSOM与实际卡片hover；桌面1440×1000、Reader平板768×1024、手机390×844。已核对四种字体加载、卡片−3px/白28%边反馈、阅读16px/28px与672px行宽、手机单列/隐藏原站目录、About三轨538/132/538px。主要机制与旧快照一致。本轮没有重新逐帧验证全部案例转场、地球阶段或Deck，不覆盖10月9日证据的时间与范围；媒体未全部载入的限制见§4.7。

### 13.2 原站一手来源与规则对应

- [styles.css](https://www.harrisonwheeler.com/assets/css/styles.css)：全站变量、字体声明、主站与Reader布局、组件、响应式、CSS动画；对应§2–8及§10。
- [main.js](https://www.harrisonwheeler.com/assets/js/main.js)：首页视差、卡片sticky测量、章节覆盖、reveal、播客与社区；对应§10.2–10.6。
- 首页内联脚本（位于[首页HTML](https://www.harrisonwheeler.com/)）：intro-lock执行条件与1500ms解锁；对应§10.2。
- [overlay.js](https://www.harrisonwheeler.com/assets/js/overlay.js)：案例打开/关闭/history/focus、morph、fitHeroTitle、目录、carousel；对应§3.4、§4.6及§10.9。
- [case-studies.js](https://www.harrisonwheeler.com/assets/js/case-studies.js)：五个案例真实DOM内容、媒体/指标/表格结构；对应§4.7。
- [story.js](https://www.harrisonwheeler.com/assets/js/story.js)：时间轴显现与线条绘制、地球阶段与fallback；对应§4.8及§10.7–10.8。
- [deck.css](https://www.harrisonwheeler.com/assets/css/deck.css)、[deck.js](https://www.harrisonwheeler.com/assets/js/deck.js)：演示令牌、图表、控件、环境运动、共享元素与计数；对应§10.11与§11。

### 13.3 证据等级与适用边界

**实测**指浏览器里已加载页面的DOM、computed style、尺寸或交互；**源码规则**指可读CSS/JS声明，说明条件与计算但不保证每个分支本轮都运行；**设计归纳**指根据多处规则总结的原则；**规范化建议**是原站之外的改进。本文以这些词明确区分，未标为实测的完整地球阶段和Deck专项转场，应按源码级理解。

已检查当前真正存在的组件，保留选择器是为了追溯；旧hero-photo、汉堡、arc与旧timeline-group只有在相应DOM存在时才启用，不作为默认页面要求。未检查外部社交/播客站、邮件实际投递、所有演示页面逐帧过程、全量键盘/读屏或完整性能报告；没有把这些写成已验收。

配套[规范看板](reference-harrison-wheeler-preview.html)直接读取本Markdown，提供原文与章节定位，不另存生成副本。原站商业Display/结构字体未复制到本地；实际规格以§3、§11为准。原站将来可能修改，这份文档是2026-10-09的观察快照。
