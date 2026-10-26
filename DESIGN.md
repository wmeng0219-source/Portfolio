# Design System: Complex Systems Portfolio

> **V4.1 · 当前采用规范**。本文维护通用视觉、布局、组件、响应式与动效采用值；参考证据见 [Harrison Wheeler 拆解](docs/design/reference-harrison-wheeler.md)。[规范查看器](DESIGN-preview.html)直接读取本文，不另维护数值或内嵌全文。
> **页面特例：**[首页](docs/pages/homepage/design.md)覆盖Hero屏高/无CTA、精简项目入口、履历列表和紧凑联系区；[正畸](docs/pages/orthodontics/design.md)覆盖该页封面、阅读布局、字阶与关系图；[PACS](docs/pages/pacs-ai/design.md)按用户要求采用正畸阅读规范，维护本页采用值与规则图形边界。其他页面映射及审核状态从[文档入口](docs/README.md)定位；会员与预习的现行旧实现不等于以下V4目标已落地。
> **当前推进范围：**PC中文优先，移动端后置，英文暂停；本文保留英文角色供未来恢复，不代表当前公开入口已启用。具体工作顺序见[项目规则](AGENTS.md)。

## 1. 设计目标、场景与决策

面向招聘经理、产品和设计负责人，呈现具有设计背景的复杂业务系统产品实践。首页帮助访客识别作者、选择作品；案例帮助访客理解真实问题、判断、方案与证据。高级感来自字体角色、准确的几何关系、阅读密度和空间连续性。

### 1.1 两种主要阅读场景

| 场景 | 主要任务 | 采用机制 | 信息密度 |
| --- | --- | --- | --- |
| Homepage / 展示 | 识别作者、筛选作品、了解经历、联系 | 中性深底、超大姓名、居中章节、宽幅文件夹、可用时堆叠 | 大标题与短说明，作品内有真实摘要及结果 |
| Case Reader / 阅读 | 理解问题、判断、方案、机制与结果 | 深色封面接白色正文；目录、固定阅读尺寸、就近证据 | 连续长文，章节间明显分隔，段落紧密连接 |

About 地理旅程、播客、社区照片条、订阅浮层与演示模式均不加入本轮网站；没有相应已确认内容就不建立这些场景。首屏不复制他人的人物照片、个人标志或拖入人像。

### 1.2 采用边界

深色展示与白色连续阅读分场景，使用中性灰阶与有固定职责的三种强调色。保留独立案例路由；自然文档流是基线，空间足够时才使用sticky。正文采用固定阅读字号，Display独立校准，不要求全站clamp或固定8px网格。未准备的照片、截图与数据不能用虚构材料填空。

通用值以本文为准；页面特例只覆盖自身声明范围。首页特例集中在对应页面design.md；本文保留通用角色和链接。具体章节与正式文字由对应content.md决定，不因视觉迁移改变。

## 2. 颜色、材质与场景作用域

### 2.1 Dark / 展示令牌

| 角色 | 值 | 用法 |
| --- | --- | --- |
| Canvas | #080808 | 首页、案例封面、文件夹本体 |
| Surface | #121212 | 媒体占位、少量控件 |
| Raised | #1a1a1a | 次级工具表面 |
| Heading | #f5f5f5 | 结构标题及主要文字 |
| Prose | #b8b8b8 | 次级正文、说明 |
| Muted | #969696 | 元信息、辅助入口 |
| Structural line | #2b2b2b | 开放式分隔 |
| Folder line | rgba(255,255,255,.16) | 项目轮廓；hover .28 |
| Action | #d0bcff | 主按钮、当前链接、焦点 |
| Action hover | #e3d6ff | 主按钮悬停 |
| On action | #381e72 | 浅紫按钮文字 |
| Identity | #b9f2c8 | 姓名，少量有证据的结果强调 |
| Project / narrative | #ffd8e4 | 作品标题、封面标题、首页叙事句 |

普通灰阶文字保持中性；全屏大范围彩色光晕不使用。三种强调色是角色，不是轮流装饰每个模块的色盘。身份、作品与行动不能临时交换颜色。

### 2.2 Light / 案例阅读令牌

| 角色 | 值 | 用法 |
| --- | --- | --- |
| Paper | #ffffff | 连续阅读正文 |
| Media well | #f3f3f3 | 证据占位与局部图像底 |
| Heading / data ink | #171717 | 章节、数字、表格结构 |
| Prose | #363636 | 长文 |
| Muted | #5c5c5c | 图注、目录、口径 |
| Reading line | #e7e7e7 | 表格、数据内部边界 |
| Action ink | #624595 | 链接、当前目录、阅读进度、focus |
| Selection wash | #eee7fa | 紫色家族的低强度选中底 |

浅色Action ink是Lavender家族的阅读对比适配，不引入第四个强调色家族。结果数字在白色正文使用深色文字，保留标签、单位与口径；不使用低对比Mint数字。深色展示与浅色阅读由页面区域决定，不新增用户主题开关。

### 2.3 标题渐变与表面配方

- 姓名：`linear-gradient(to top,#e4fbea 0%,#cef6d9 20%,#b9f2c8 48%)`。
- 案例封面：`linear-gradient(to top,#fff4f8 0%,#ffe7f0 20%,#ffd8e4 48%)`。
- 作品卡：`linear-gradient(to bottom,#ffd8e4 0%,#ffd8e4 50%,#fff 62%,#fff 100%)`，background-size100%200%，default0 100%、hover0 0%，600ms。
- 文字渐变作用于整个标题，使用background-clip:text并提供实色fallback；不逐字裁开背景。
- 导航：rgba(8,8,8,.72)、白8% 1px边、blur14px/saturate1.4，背景不足时用不透明深底回退。
- Ghost按钮：白8%底、白18%边、内高光0 1px白12%；hover白14%底、Lavender文字和边。
- 案例顶栏：白94%底、blur10px、1px Reading line。

## 3. 字体、字号、断行与绘制边界

### 3.1 真实字体角色

| 角色 | 拉丁字体 | 中文字体 | 加载与限制 |
| --- | --- | --- | --- |
| Display | Anton400 | Noto Sans SC700 | Anton仅拉丁；中文不transform拉伸 |
| Structural | Hanken Grotesk400/500/600/700 | Noto Sans SC同字重 | 导航外的结构文字、目录、小节 |
| Narrative | Merriweather300/400/700 | Noto Sans SC400 | 中文长文保留稳定笔画；不让系统随意替换衬线 |
| Utility | IBM Plex Mono400/500 | Noto Sans SC400/500 | 等宽用于英文标签、年份、单位；中文无伪等宽 |

所有实际使用的字体与字重必须加载。可以采用Google Fonts或自托管已获得的字体；缺网时显式系统回退，文字不得隐藏。正文不同时加载Inter、JetBrains Mono等无职责字体。不得写入未加载的Neudron、GT America或Reckless。

### 3.2 Homepage 字体角色

按16px根字号解释。cqw基于HeroCopy的inline-size容器；字号、行高、字重与字距作为整体角色使用。

| 角色 | 中文 | 英文 | 行高 / 字重 / 字距 |
| --- | --- | --- | --- |
| HeroName | 固定Latin Display姓名WEN MENG | `clamp(80px,16cqw,168px)` | Anton400 / .90 / −.01em；scaleY1.10 |
| HeroLede | `clamp(18px,1.5vw,22px)` | `clamp(18px,1.6vw,24px)` | 中文400/1.65；英文Merriweather300/1.6；0 |
| SectionTitle | `clamp(30px,3.2vw,44px)` | `clamp(40px,5.5vw,64px)` | 中文700/1.25/−.025em；英文Anton400/1.08/−.01em |
| SectionIntro | 16px | 16px | 中文400/1.75；英文Merriweather300/1.6 |
| ProjectTitle | `clamp(26px,2.5vw,36px)` | `clamp(32px,3.4vw,48px)` | 中文600/1.3/−.025em；英文Anton400/1.12/−.01em |
| ProjectSummary | 16px | 16px | 中文400/1.8；英文Merriweather300/1.65 |
| ResultValue | 22px | 同左 | Structural600 / 1.35；tabular-nums |
| ResultLabel | 14px | 14px | 400 / 1.65 |
| CareerTitle | 桌面1.25rem；≤860px1.125rem | 同左 | Structural600 / 1.3 |
| Button / case entry | 15px | 15px | Utility500 / 1.6 |
| Nav | 15px；≤860px14px | 同左 | Utility400 / 1.6；当前600 |
| Eyebrow | 12px | 11.52px | Utility500 / 1.5 / .10em仅拉丁 |

≤560pxHeroName切两行WEN / MENG，采用`clamp(76px,28cqw,132px)`。硬断行只用于固定姓名。英文短项目标题、精选项目居中介绍与中文栏目短标题局部采用text-wrap:balance；中文项目标题和连续摘要自然wrap，不推广到正文。

### 3.3 Typographic Principles

- 首页Display负责识别与选择，案例正文负责阅读，不能共享一个全站H1/Body缩放曲线。
- 中文标题保持真实CJK字体，密度用字重、行高、行长调节；不伪粗、不纵向拉伸。
- 中文长文16px/28px、英文16px/28px是阅读基线，固定rem属于有意规则。流式适用于Display和部分结构标题，不强迫所有文字clamp。
- 中文连续阅读段落采用两端对齐（justify），末行左对齐；用于项目摘要、案例封面简介、正文段落与长列表项。由浏览器按中文字间分配空间，保持原有字号、行高与文案，不手工加空格或强制断行。英文长文左对齐，避免词间空隙过大；标题、目录、数据值、短标签、数据解释与图注保持各自原有对齐轴，不全局justify。
- 标题与长文自然换行、无ellipsis、无固定高度裁字；英文允许hyphens与overflow-wrap解决极长词，避免全局word-break:break-all。
- 不用全局balance/pretty改变所有内容的断行。可见样稿验证后才在单个短英文Display中使用balance。
- 标签正字距仅用于拉丁大写；中文正文及标签不加夸张字距。

### 3.4 Case Reader 字体与开场

| 角色 | 中文 | 英文 | 行高 / 字重 / 行宽 |
| --- | --- | --- | --- |
| CoverTitle | `clamp(44px,6.4vw,96px)` | `clamp(60px,8.6vw,144px)` | 中文700/1.16；英文Anton400/.98、scaleY1.10；−.01em |
| CoverIntro | `clamp(16px,1.3vw,19px)` | 同左 | 中文400/1.8；英文Merriweather300/1.65 |
| ReaderH2 | `clamp(32px,3.2vw,48px)` | 48px | 中文700/1.25；英文Anton400/1.15 |
| ReaderH3 | `clamp(18px,1.4vw,20px)` | 16.8px | 中文600/1.5；英文Hanken700/1.5 |
| RoleHeading | 18px | 16.8px | 600 / 1.5 |
| Prose / RoleBody | 1rem | 1rem | 中文Noto400；英文Merriweather300；1.75 |
| TOC | 15px | 15px | Structural400/1.6，selected600 |
| Caption / TableBody | 14px | 14px | 400 / 1.65 |
| TableHead | 12px | 12px | Utility500 / 1.6 |
| ReadingMetric | 30.4px | 30.4px | 中文Structural700；英文Merriweather700；1.25；字距0 |

封面仅放标题与项目介绍，桌面左右两等列，标题放左列、简介放右列；中文简介两端对齐且末行左对齐，英文简介左对齐。手机保持同一规则与共同左轴。职责移至封面后的第一阅读区，与完整工作台证据相连。目录“项目概览”定位封面，职责区不再次放一个巨大的“项目概览”。这是内容不变的呈现迁移。


### 3.5 尺寸预算与低高度

font-size决定排版盒，offsetHeight用于布局预算，transform之后的getBoundingClientRect用于绘制边界。Anton scaleY1.10向上增长，封面和Hero必须提供头部空间；中文无此补偿。

常规封面允许自然换行；不复制原站Neudron的28–220px测量结果。在新增测量fit时，以中文42–112px、英文52–160px作为搜索边界，12次二分，绘制高度≤可用封面高度；手机绘制预算≤38vh，同时最长词无横向溢出。字体ready、断点、窗口resize后重算。可用高度不足时改自然增长，不能为了保持一屏把简介压成小字。

### 3.6 中英文混排与窄列阅读

保留中文长文两端对齐、末行左对齐及英文左对齐。这些规则用于字体与容器校准，不能借排版改写已确认内容。

| 内容 | 采用方法 | 边界 |
| --- | --- | --- |
| 中文连续长文 | 正常汉字断行，line-break:strict；字距0；按§3.3两端对齐 | 不用空格撑宽，不对每个字设独立位置 |
| 短说明、图注、目录、数据解释 | 原有左轴或图注中轴；末行自然结束 | 不为填满列宽强制justify |
| PACS / AI等缩写 | 把完整缩写作为词，使用已加载拉丁回退字体 | 不逐字母断开，不用全局break-all |
| 数值与紧邻单位 | 作为同一排版组，空间够时不拆开；完整数字不插入硬换行 | 时间周期、来源等长说明另作普通行，不包成一个永不换行的大块 |
| 英文长词/URL | 优先自然词边界；局部允许overflow-wrap:anywhere，英文可用hyphens:auto | 正式标题不省略；辅助顶栏允许ellipsis |
| 中英间空格 | 按确认内容稿保留；视觉对齐只改变CSS | 不批量改正式文字的标点、数字或空格 |

窄列检测以**文字实际列宽**为准，不只看浏览器宽度：低于16em或混排产生明显连续空洞时，先改为单列/放宽文字列。图形中的说明始终左对齐；普通中文长文确需回退左对齐时，必须在对应design.md标注范围和原因，不自动把整页改回左对齐。至少核查一个纯中文段落、一个含英文缩写段落、一个长数字/日期段落，以及中英两种标题。

### 3.7 构图、内容预算与溢出处理

一组视觉只承担一个主要观点；Display、正文、证据和操作按阅读任务分配强度。下面的行数是**触发校准的检查阈值**，不是截断或删文标准；已确认长文照常完整呈现。

| 场景 | 校准阈值 | 处理顺序 |
| --- | --- | --- |
| 首页姓名 | 桌面一行，≤560px固定两行 | 保留姓名规则；按§5.2调整整体高度/位置，不继续放大字号填空 |
| Hero定位句 | 桌面2行以内、手机3行以内优先 | 检查真实字体与max-width；允许首屏自然增高，CTA可达 |
| 文件夹标题 | 桌面3行、手机4行以上时复核 | 检查两栏与padding；在既有字号区间内校准，随后允许卡片增高、取消sticky |
| 文件夹摘要与结果 | 摘要超过4行或结果解释明显撑高时复核 | 摘要与数据保持完整；先组织分组/自然流，不加line-clamp，不移除周期或来源 |
| CaseCover标题/简介 | 标题超过4行或与简介争抢空间时复核 | 优先自然增高；必要时单列；测量fit仅用于显式声明的封面变体，按§3.5执行 |
| Reader章节 | 标题、导语、正文、证据四类角色 | 短章节不强行占满一屏；大图和复杂表格进入阅读列，不让段落承受展示字号 |

**共同处理顺序：**字体ready → 正常布局盒/绘制盒 → 容器与列宽 → 自然换行和结构重排 → 在角色区间内校准 → 自然增高/取消sticky。只有已确认内容本身需要调整时才回到content.md审核。不得用负margin、大范围scale或固定height裁切掩盖问题。

首屏无真实主视觉时使用排版构图；有真实媒体时先在页面design.md声明媒体角色与文字安全区，不恢复参考站人物拖入、设备艺术层或满屏留白作为通用要求。短内容只保留必要组间距；长内容不增加逐段卡片和过量空白。

## 4. 容器、对齐、间距与圆角

### 4.1 Border-box容器

| 场景 | 尺寸 | 内边距 | 对齐 |
| --- | --- | --- | --- |
| Homepage | max-width1200px，包含padding | >860px左右32px；≤860px20px | 居中 |
| Header capsule | 桌面菜单保持中轴，身份槽向左展开；手机靠右 | 引用§5.1，不另存尺寸 | 菜单中心/手机右边界稳定 |
| Case shell | 四边16px，radius22px | 内容区另行定义 | 包围整个深色封面与浅色正文 |
| Reader layout | 三轨目录/正文/平衡空列 | 桌面48px；≤860px22px | 主阅读列居中 |
| Prose | max-width672px | 不重复加padding | 阅读列左轴 |
| Reading column | max-width720px | 无内嵌卡片边距 | 正文及证据左轴 |

首页容器采用border-box：1920/1440px视口内容宽1136px、左边界392/152px；1280px时宽1136px、左72px；390px时宽350px、左20px。1200px已包含内部padding。

案例正文grid为`minmax(180px,1fr) minmax(0,720px) minmax(180px,1fr)`，gap64px。1440px视口中sheet宽1408px，三列232/720/232px，正文x360px。861–1079px桌面缩为目录180px+阅读列，左右padding32px、gap40px，≥1080px宽证据允许最多向右延伸至平衡列；不得造成整页横向溢出。

### 4.2 Alignment Contract


- 首页姓名、章节标题、介绍、联系共用容器中轴；正文与卡片按局部左轴。
- 文件夹标题、摘要、结果、入口共用文字列左轴；媒体共用另一列完整宽度。
- 案例封面左边28px，对齐关闭入口；简介在右列，中文两端对齐、末行左对齐，英文左对齐。手机标题与简介共用22px左轴。
- 案例正文标题、段落、表格、图片共用阅读左轴；平衡列留给视觉呼吸与宽证据。
- 职业历程遵循§5.8交错时间线：桌面中央轨道稳定、卡片左右交替；手机左轨道与单列卡片。每卡内部日期、职位、能力共用左轴，不因文字长度调整整卡位置。
- 结构盒、文字起点和图标的光学边界分别检查。必要光学修正限定在组件内，不给整页加无依据的偏移。

### 4.3 Relationship Spacing

不存在全站严格8px网格。以下关系是唯一采用表，同一关系使用同一值；可以使用非8倍数。

| 关系 | 值 |
| --- | --- |
| Homepage section上下padding | 96px；≤860px64px |
| Homepage eyebrow→title | 16px |
| Section title→intro | 18px |
| 作品头→卡片 | 32px；启用覆盖时缓冲见§6.3 |
| Folder padding / 两栏gap | 见§5.4 |
| Folder label→title / title→summary | 12px / 12px |
| Folder summary→evidence | 20px |
| Result value→label / result→entry | 6px / 20px |
| Hero姓名→定位句 | 见[首页特例](docs/pages/homepage/design.md#2-当前首页特例采用值) |
| Hero入口组成与布局 | [首页特例](docs/pages/homepage/design.md#2-当前首页特例采用值) |
| Reader章节前/后 | 52px / 18px |
| Reader小节前/后 | 28px / 8px |
| 段落后 | 16px |
| TOC条目间 | 4px |
| 通用Button group gap | 14px；首页CTA见§5.2 |
| Image→caption | 10px |
| Figure后 | 24px |
| Carousel后 | 56px |
| Career卡片与行距 | 见§5.8 |

### 4.4 Radius / Border / Shadow

| 角色 | 值与材料 |
| --- | --- |
| Folder | 24px24px0 0；before顶部/两侧1px白16%，无底边；mask35%→95%透明 |
| Homepage media | 16px；1px白12%；占位无阴影 |
| Case reader | 22px；手机18px；0 0 60px黑40% |
| Evidence screenshot | 8px；Reading line 1px |
| Table | 12px；Reading line 1px |
| Diagram node | 8px；内层标签4px |
| Input / small utility | 10px |
| Capsule / button | 999px / 100px |
| Carousel viewport | 4px |

嵌套圆角必须小于外层。媒体负责局部深度，文件夹本体负责覆盖关系，不为所有组件加同一种阴影或彩色辉光。

### 4.5 图标与关系图语法

图标与关系图按真实功能及已确认内容选择。

| 角色 | 几何与材料 | 语义 |
| --- | --- | --- |
| 行内功能图标 | 16px；外链辅助14px；24×24 SVG母版、stroke2、圆端点/圆连接、currentColor | 与文字gap8px；不能独立抢占标题层级 |
| 返回/关闭/目录操作 | 图形20px，外部点击框≥44px | 清晰箭头/叉/菜单；图形尺寸与点击框分开 |
| 图形节点 | radius8px，padding16px，主标签16px/500/1.5，说明14px/1.65 | 每节点一角色/状态，不放一整段正文 |
| 主路径/交接线 | 1.5px实线，箭头8px；Action ink，连到节点边缘 | 表示已确认流程方向；不穿过文字 |
| 备用/回流路径 | 1.5px虚线，4px/4px节奏，Muted，附明确条件 | 虚线表示不同路径，不凭颜色推断好坏 |
| 判断节点 | 与普通节点同材料，附明确条件名/分支标签 | 不强制菱形或不同品牌色；只有实际判断才显示 |

节点横向间距32px、纵向24px；拥挤时结构重排，手机改纵向主路径，不把整个图缩成不可读小图。箭头、编号、状态与文字共同表达关系，颜色只辅助；角色不各自绑定不同品牌色。选中底仅用于真实交互选中，不做静态大色块。

数值、单位、周期与限制组成完整数据项。区间图用区间+刻度/端点，不用单根精确柱冒充区间；管理目标明确标“目标”，不画成已达成进度。案例特殊图形语义见对应页面design.md，不能自动推广到其他案例。

图形需给等价的短说明、路径顺序与图注；标注“流程示意/关系示意”，不能冒充原系统截图或实际监控面板。装饰SVG aria-hidden，图标按钮有文字可访问名称；同一套操作不混用emoji、文字箭头和另一套描边图标。

## 5. 组件与状态

### 5.1 Navigation

首页姓名与居中导航的布局、显示时机和尺寸以[首页设计说明](docs/pages/homepage/design.md#2-当前首页特例采用值)为准；本节保留通用导航交互边界。旧同壳身份展开已由用户指定的独立左上姓名替代。

普通菜单Muted，当前与hover用Lavender；当前项600字重、底部16×2px短线及aria-current=location，不仅依赖工具类。字号遵循Nav角色，200ms反馈；focus-visible为2px Lavender/offset4px，姓名链接键盘激活后焦点交给Hero标题。所有入口点击区域≥44px。当前项按导航下方阅读线识别，滚到底明确选中联系区；resize、字体加载与内容高度变化重新评估。手机菜单可Escape关闭、锚点选择后恢复菜单按钮焦点；reduce锚点即时定位，显式instant避免继承全局smooth。

### 5.2 Hero（首页）

首页Hero的屏高、入口组成与响应式特例以[首页设计说明](docs/pages/homepage/design.md#2-当前首页特例采用值)为准；姓名与正文沿用本文字体角色，背景动效遵循§6.1。大姓名离场后的向下提示显隐保留；顶部姓名与导航分离，字体及大姓名离场后的显示时机见首页特例。

### 5.3 Button / Link

通用Primary：Action底、On action字、Utility500、padding14px28px、gap8px、radius100px；英文实际高约56.9px。hover变浅、上移1px；颜色200ms、transform150ms。Ghost保持低强度深色材质，hover边/字Lavender。disabled opacity.5、不位移、不响应点击；不能仅换颜色却保持可操作。

首页CTA采用min-height48px、padding10px22px、gap8px、字阶见§3.2；通用按钮的材料与反馈保持。浅色阅读链接使用Action ink、hover下划线；focus-visible2px/offset3px。活动目录有600字重与2px左标记，其他文字仍Reading muted。手机不压缩到低于44px点击区。

### 5.4 Project Folder（首页）

Canvas底、两等列交替、顶部圆角与渐隐轮廓见§4.4；自然高度、卡间gap0连续排列。内padding:`clamp(24px,2.5vw,36px)`，两栏gap:`clamp(28px,3.5vw,48px)`。≤860px抵消页面20px边距形成全幅，padding24px；680–860px仍两等列交替、gap28px且普通流；<680px单栏媒体在前、gap20px。

每卡呈现名称、一句价值、一项核心证据与完整就近口径、入口；职责和其他结果留案例正文。名称与证据以首页content.md为准。标题Pink，摘要叙事角色，证据开放行顶细线、padding-top16px；数值/说明见§3.2，所有关系间距见§4.3。不截断摘要、隐藏统计限制或添加计数动画。

媒体16:10；未就绪时稳定名称占位，不冒充真实证据，占位无重阴影。hover上移3px、轮廓白16%→28%200ms、标题渐变600ms；focus-within提供同级边界。sticky仅按§6.2整组判定，布局变短不代表所有窗口都应吸附。

### 5.5 Reader shell / cover / controls

保留`/project/<id>`独立路由与`src/pages/cases/<CaseName>/`自包含结构，由ProjectDetail分发。本轮设计样稿只演示布局，不把正式路由改为overlay。

深色封面与白色正文共用浮动sheet，桌面四边16px、手机顶部24px/底16px/两侧0。封面常规min-height`calc(100svh - 32px)`；左padding28px、右`clamp(28px,6vw,88px)`，上`clamp(88px,12vh,132px)`、下`clamp(40px,6vh,64px)`。两等列底对齐，gap`clamp(28px,4.5vw,84px)`；手机padding100px22px40px、单列gap26px、自然增长。

返回按钮44px，定位在sheet左上；语言44px放右侧，focus清楚。封面标题离开后出现白色阅读顶栏：返回、单行辅助标题、语言/目录入口、3px实际滚动进度。正式标题不截断，辅助顶栏可单行ellipsis。

### 5.6 TOC / reading body

TOC仅在正文范围sticky top84px；低高度内部可滚动。桌面条目完整换行，不放只见首字的窄栏；正文始终可见，不逐段reveal。手机TOC从左栏改为阅读顶栏中的“目录”popover，按钮≥44px；打开时按该案例已确认章节完整竖排，无横向隐藏菜单。

目录条目来自各页content.md确认章节，不规定统一章数；概览定位封面，其余项定位相应正文标题；职责为正文首区，依旧属于概览。定位预留100px顶部距离（64px顶栏与额外留白），仅在scroll-padding或scroll-margin之一设置，不叠加；点击后目标接收可见焦点；重复点击仍能定位；滚到底高亮最后一节。reduce下采用即时滚动。独立路由的返回使用浏览器历史/首页回退，并保存用户浏览位置。

### 5.7 Evidence / table / data

- 正文672px max，阅读列720px；截图与示意可以占720px，宽证据≤1080px时收回主列。
- 截图contain/自然比例，图注14px，不能用cover裁掉医疗界面字段。占位名称、用途与缺口由content.md就近说明。
- 结构图只表达已确认角色、状态与路径，明确标“流程示意”；AI可选、同步检查表才写病历、完成读片不是同步入口。
- 指标是数据值、单位、含义、周期和限制的整体，白色正文使用深色数字；目标与实绩分区，不同单位不串漏斗。
- 阅读数据使用开放行，数字采用ReadingMetric角色（§3.4），数字/解释两轨1:1.5、gap24px、padding20px上下；手机≤560px单轨gap8px。解释14px/1.75、单色深灰。
- 表格12px圆角，正文14px/1.65、padding13px16px、header12px/1.6；手机允许表格局部横向滚动，整页无横向溢出。
- 真有多张证据时可用手动carousel，gap16px、450ms主缓动、按钮≥44px、边界disabled；不自动播放、不隐去说明。

### 5.8 Career / contact

首页职业历程与联系区的布局、密度、响应式及字号特例仅在[首页设计说明](docs/pages/homepage/design.md#2-当前首页特例采用值)维护。履历依据确认事实；邮箱mailto与微信复制的成功、失败、不可用状态沿用§5.10，不新增未授权渠道。

### 5.9 媒体选型、证据与图注

| 需要解释的问题 | 默认载体 | 布局选择与边界 |
| --- | --- | --- |
| 项目入口识别 | 真实界面封面，或名称/用途占位 | 首页16:10；仅封面可裁切，关键导航/界面身份仍可见 |
| 完整工作环境 | 一张完整截图 | 自然比例、contain；阅读列展示，过密时另附局部放大 |
| 字段、交互、标记细节 | 完整截图+就近局部放大 | 真实同一界面来源，编号与正文对应；不重绘虚构字段 |
| 两个等权证据 | 双图 | gap16px；手机单列。尺寸/比例差异大时改顺序展示 |
| 多张同级界面 | 手动carousel | 按§5.7；保留图注、序号与边界。需要来回比较时不用轮播隐藏另一图 |
| 规则/角色/交接 | 流程图、关系图或比较表 | 只表达确认关系，图形语法按§4.5；静态示意明确标注 |
| 连续操作 | 有来源的演示视频 | 用户主动播放、可暂停，提供poster和静态说明；不以循环代替论点 |
| 真实数据变化 | 带完整口径的开放数据或区间图 | 不将不同周期/单位串为漏斗；数据限制贴近图形 |
| 媒体未就绪 | 命名的稳定尺寸占位 | 明确素材名称/用途，不制作假产品证据；缺口仍由原证据清单维护 |

每张图只支撑一个主要论点，邻近说明点出“看哪里、说明什么”；来源、时间、单位和限制在已有内容允许范围内就近呈现，不额外编造。证据图注14px/1.65、距图10px、后24px；短图注按原中轴，长说明可用阅读左轴并在design.md说明，不机械居中长段落。

标准截图先落阅读列；只有读者确需检查宽界面时才向平衡列延展，≥1080px启用并声明最大宽度，不突破整页边界；≤1079px收回。设备壳是封面包装的可选变体，不能为每例强套电脑/手机，也不能把脱敏不完整的截图放入设备壳绕过证据要求。

### 5.10 组件状态矩阵

组件专节是精确采用值来源；本表补状态语义。没有该状态的组件标为“不适用”，不为了齐表添加新功能。

| 组件 | 默认/hover | focus/selected | disabled/open | pending/error |
| --- | --- | --- | --- | --- |
| 主/次按钮 | §5.3材料，hover只在可悬停设备启用 | 深色Action或浅色Action ink的2px焦点边界；键盘可激活 | 真disabled取消事件与位移，不只降低透明度；open不适用 | 仅真实异步操作才pending；保持宽度与操作名，结果有明确文字反馈 |
| 项目入口 | §5.4轮廓/标题反馈 | focus-within同级边界；无永久selected状态 | 没有可用目标时不伪装成可点击链接；展开路由契约不变 | 路由/媒体失败不丢失返回入口及正式文字 |
| 主导航 | §5.1普通/当前角色 | 当前项短线+字重+aria-current；焦点清晰 | 手机单一菜单open/close、Escape与焦点恢复 | 不需要loading状态；字体未到位保持入口可达 |
| Reader目录 | §5.6完整条目 | 当前项标记与字重；定位目标接收焦点 | 手机popover展开七/六等实际条目，不固定章数 | 页面无可滚动高度进度为0；无对应标题时不得生成死链接 |
| Carousel | §5.7轨道与按钮 | 可键盘操作，当前索引稳定 | 到边界禁用对应箭头；单张隐藏箭头 | 媒体尺寸/字体/resize变化后重新定位，不丢失当前项 |
| 邮箱/微信 | §5.8渠道行 | 文本与焦点可识别 | 邮箱mailto；复制暂不可用时保留可选择号码 | 复制成功用文字状态；失败展示原号码及手动复制指引，不假报成功 |
| 截图/视频 | §5.9静态证据 | 静态图不伪装成按钮；播放控件可键盘使用 | 播放/暂停只在真实媒体可用时出现 | 采用§5.11的占位/错误回退 |

active按下反馈只作用可交互控件：颜色/边界确认，不另加夸张缩放或回弹；hover、focus、当前项不能互相覆盖。提示通过局部status文本关联操作，不遮住主要CTA或正文。没有真实异步行为时，不显示装饰性loading。

### 5.11 加载、失败与媒体生命周期

- **字体：**真实加载角色与字重，使用显式系统回退；文字从首帧可读。fonts.ready后重测标题、导航、sticky与媒体关系；不能把旧字体测得的位置永久缓存。不同替代字形只校准角色，不给整页补偏移。
- **图片：**提前声明尺寸/比例；首屏必要媒体优先，阅读证据按需加载。未到位时保持盒尺寸与名称，失败时改为同尺寸错误说明；不以空白、破图图标或重复无限重试占用页面。相关论点与图注继续可读。
- **视频：**功能演示默认用户播放、提供暂停与静态poster；除经确认的环境媒体外不自动播放。环境媒体如获准采用须静音、页面隐藏/离屏暂停、reduce使用poster；不能把“autoplay属性存在”当作播放成功。失败时保留静态证据/说明；离开路由释放播放与监听。
- **轮播/数据图：**load、loadedmetadata与容器resize后重测；无内容时展示真实空状态，不用随机图或数字填补。
- **环境动效：**首屏可见/页面可见/reduce条件沿用§6.1，不加第二套未命名规则；偏好变化即时回退。进入动画取消、重进页面或卸载时释放transform控制及监听，不重复启动定时器。

以上定义未来组件实施边界，不声称所有运行页目前已经具备。失败占位完成不等于素材已齐；证据、页面审核和实现分别记录。

## 6. 动效语言与触发契约

### 6.1 Motion Tokens

| 角色 | 参数 | 使用范围 |
| --- | --- | --- |
| 主缓动 | cubic-bezier(.22,1,.36,1) | 进入、位移、空间回归 |
| Feedback | 150–200ms | 按钮、边、字色 |
| Link shift | 350ms、X24px | 开放式资源行；普通正文链接不移动 |
| Title gradient | 600ms | 作品标题背景位置 |
| Group entrance | 700ms、Y32px、opacity0→1 | 首页首屏整组；不对每个字执行 |
| Section header cover | 滚动映射Y−36f、opacity1−f | 指定章节标题；不作用于正文 |
| Reader entrance | 450ms、Y14px→0 | 独立路由内整层一次显现 |
| Carousel | 450ms | 用户主动翻页 |
| Ambient grid | 可选40s linear，一个48px格 | 仅首屏/封面，次要低透明层 |

首页首屏淡网格：网格48px、白3.5%线，整体opacity .8；仅装饰层缓慢平移一个格，40s linear循环，首屏上下渐隐（顶部透明、20%至65%可见、底部透明），底层可用白3.5%的中性径向微光。首屏进入可视区且页面可见时运行，离开或页面隐藏时暂停；≤860px、高≤600px及reduce均静态。文字与入口不跟随环境层移动，不增加全屏彩色光晕。

### 6.2 Sticky folder

最高卡高度为H，视口高V，`base=min(96,V-H-16)`；第i卡top=`base+8i`、z=i+1。正常文档顺序与DOM顺序保持一致。

**启用条件：**宽度≥861px、高度≥700px、非reduce；卡片的可见底部与主要入口能完整进入视口。长卡需要负top时，先自然滚入文字，再吸附底部；如果三个卡的错开仍会裁切可达区域，整组取消sticky。load、fonts.ready、ResizeObserver、resize后重测。不要固定所有卡top96px或硬设高度。

手机、低高度及reduce均普通流、取消层叠偏移。键盘焦点进入覆盖卡片时也退回普通流，保证入口可见。

### 6.3 Sticky section header

外层sticky top96px，启用时底部缓冲clamp(48px,7vh,80px)，内容区处于更高层。覆盖进度`f=clamp((stickyBottom-bodyTop)/stickyHeight,0,1)`；标题内部opacity1−f、Y−36f。进度依据未变形wrapper计算，没有固定duration。

仅在桌面宽度≥861px且高度≥700px启用，手机/低高度/reduce为普通标题。不要在正文露出后仍保留透明标题占据额外几屏空间。

### 6.4 进入、结束、退出与reduced-motion

首页整组进入不锁滚动、不隐藏导航；入口完成后释放transform，才允许Hero额外滚动上移，幅度最多−scrollY×.20。案例正文默认可见；独立阅读层只整组450ms进入一次，不逐节藏文字。

所有CSS动画与持续运动在reduce下关闭；JS必须另外跳过滚动视差、sticky覆盖映射、计数、smooth定位。显示最终状态，取消多余延迟和pin空间。系统偏好变化时重新评估，不要求刷新才能得到静态模式。不可把全局animation:none当成所有JS都停止。

独立路由不实现卡片→overlay的morph。若未来采用overlay，需同时定义历史、深链接、focus trap、Escape、返回焦点与滚动恢复。

## 7. 响应式与可用性

| 断点/条件 | 变化 |
| --- | --- |
| ≥1080px | Reader三轨、宽媒体允许延展 |
| 861–1079px | Reader目录180px+正文，收回宽证据；首页仍双栏 |
| ≤860px | 首页padding20、section64；作品卡全幅，680–860px双栏、<680px媒体先；Reader单栏/22px，目录popover；导航字号缩紧 |
| ≤767px | 导航切同一外壳的手机菜单结构；右边界与身份展开契约引用§5.1 |
| ≤560px | 姓名两行、CTA纵排；双图与结果纵排、说明不裁切 |
| 高度≤600px | Hero与CaseCover自然增长，避免正文和按钮争抢一屏 |
| 高度<700px | 首页取消sticky stack及phead覆盖 |
| reduced-motion | 静态完整内容，JS/CSS共同回退 |

触控≥44px、明确focus-visible、鼠标与键盘都可操作。目录popover支持Escape、返回焦点，不把所有静态图片赋予按钮角色。链接/状态不能只靠颜色识别。背景效果不可降低长文对比。

按影响选择核对范围：纯局部修改至少检查代表性桌面与手机；涉及断点、字体、多语言、低高度或交互时覆盖相关分支；发布时执行全站检查。宽屏容器封顶，手机结构重排；不得靠根元素overflow-x:hidden掩盖内部错误。

## 8. 执行与核对

通用规则由本文维护；页面特例、呈现映射、审核状态从[文档入口](docs/README.md)定位。实施待办、事实、证据与准入的协作边界遵循[AGENTS.md](AGENTS.md)，本规范不复制状态清单。

共享颜色、字体角色与几何变量属于场景层；特殊关系在页面作用域内实现，不靠重复高specificity覆盖。规范是执行依据，不能当作运行页已迁移或素材已齐的证明。

### 8.1 可执行令牌命名

```css
:root {
  --canvas: #080808;
  --surface: #121212;
  --raised: #1a1a1a;
  --text: #f5f5f5;
  --prose: #b8b8b8;
  --muted: #969696;
  --line: #2b2b2b;
  --action: #d0bcff;
  --on-action: #381e72;
  --mint: #b9f2c8;
  --pink: #ffd8e4;
  --container: 1200px; /* 首页；Reader容器见§4.1 */
  --page-pad: 32px;
  --section-pad: 96px;
  --reading-column: 720px;
  --reading-line: 672px;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --font-display: 'Anton', sans-serif;
  --font-structural: 'Hanken Grotesk', 'Noto Sans SC', sans-serif;
  --font-cjk: 'Noto Sans SC', sans-serif;
  --font-narrative: 'Merriweather', Georgia, serif;
  --font-utility: 'IBM Plex Mono', monospace;
}
.reader-body {
  --surface: #ffffff;
  --text: #171717;
  --prose: #363636;
  --muted: #5c5c5c;
  --line: #e7e7e7;
  --action: #624595;
}
@media (max-width:860px) {
  :root { --page-pad:20px; --section-pad:64px; }
}
```

字体与排版根据§3建立HeroName / SectionTitle / ProjectTitle / CoverTitle / ReaderH2 / ReaderH3 / Prose等角色，不用一个全局H1选择器控制全部场景。`.reader-body`仅包白色正文；若把深色封面也包在内，会错误继承浅色文字令牌。

### 8.2 验收清单

- [ ] 首页和Reader场景明确，普通文字为中性灰阶。
- [ ] 字体真实可用、字重正确；中文不拉伸，英文替代字形已校准。
- [ ] 首页1200px容器含padding，Reader几何按§4.1；案例正文672px与主列720px口径正确。
- [ ] 关系间距与局部轴稳定；无无依据的margin微调。
- [ ] 长标题、全部口径、职责和正式正文可完整读取。
- [ ] 文件夹顶部轮廓、层叠与移动回退均正确。
- [ ] TOC、返回、语言、微信复制及进度真实可用；键盘与reduce完整。
- [ ] 占位不冒充截图；目标、规模和效果不混合。
- [ ] 三个公开案例与候选状态保持既有边界。
- [ ] 相关测试、构建与浏览器检查有当次证据；原警告单列。

### 8.3 每个组件的最小交付契约

| 必填项 | 必须回答的问题 | 验收边界 |
| --- | --- | --- |
| Role / Content | 服务哪个阅读任务？正式文字来自哪篇确认稿？ | 不将编辑备注和占位解释当正式文案 |
| Geometry | 容器、列、padding、gap、局部轴、正常/绘制盒如何约束？ | 数值来自本规范角色；溢出按§3.7处理 |
| Type / Material | 字体角色、断行、行宽、颜色职责、描边/圆角是什么？ | 默认与局部变体分开；真实加载 |
| Media | 为什么选截图/放大/图形/表格/视频？ | 论点、来源、fit与加载回退齐备 |
| States | 哪些状态适用，哪些不适用？ | 不能只设计hover，keyboard/失败反馈可用 |
| Responsive | 哪个条件改变结构？低高度如何读完？ | 分组件断点，不用统一缩小代替重排 |
| Motion | 触发、初/终态、时间或进度、结束交接、退出/暂停、reduce是什么？ | 同一transform有明确所有者；内容始终可读 |
| 来源与范围 | 通用规则还是页面特例？ | 特例有明确作用域；审核状态在对应页面维护 |

设计评审优先检查“一个组件能否从这些答案独立实现”。规范查看器仅提供本文原文与章节定位，不需要同步生成或维护第二份摘要。
