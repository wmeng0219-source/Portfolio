# 组件用途与复用契约

> 2026-11-06 新建。依据当前源码登记，区分已复用能力、页面专用模块、页面内复用和待抽取对象。本文不表示已完成源码组件化。
> 设计值唯一引用 [DESIGN.md](DESIGN.md)；页面局部覆盖从[文档入口](docs/README.md)进入。后续工作与冲突只在[当前计划](docs/superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md#后续源码组件化与验收任务仅登记未开发)维护。

## 1. 范围与引用关系

- **已有共享**：同一实现已被多个调用方使用，不等于全站通用。
- **页面专用／页面内复用**：有明确局部用途，不因位于 components 目录或被多次调用就自动推广。
- **待抽取**：存在相似结构或跨页规则，但目前没有共享实现；只登记目标契约，不虚构文件和API。
- **保留配方**：设计规范有依据、源码尚无通用实现或当前未选用；不因登记而开发。

每个条目的最小答案是：**用途与内容来源 → 组成 → 合法变体 → 状态 → 字体／几何／材料引用 → 响应式与动效引用 → 源码位置 → 复用及排除范围**。不适用的状态明确排除，不为齐表添加功能。

正式标题、段落、图中文字与配图论点由各页 content.md 提供；本文只定义承载契约。设计角色／共享配方在 DESIGN.md，页面独有数值在本页 design.md；同一值不再抄入本文。不同业务语义不能仅因外形相似强行抽成同一组件。

## 2. 已有组件与基础设施

| 对象／成熟度 | 用途与合法变体 | 状态与行为 | 源码位置／数值来源 | 复用边界 |
| --- | --- | --- | --- | --- |
| HomeIcon／已有共享：首页内 | 行内功能、外链辅助、操作图标；按现有 name 选择 | 装饰图形不进入焦点；操作名称由外部按钮／链接提供 | [HomeIcon](src/components/HomeIcon/index.jsx)；DESIGN §4.5，样式在 [Home.css](src/pages/Home/Home.css) | 多个首页模块已使用；尺寸样式依赖首页作用域，跨页前先处理样式归属；不把状态箭头和业务关系线混作功能图标 |
| AnimatedContent／已有共享：首页内 | 内容进入包装器；当前采用配置见首页特例；源码其它props不等于已选用变体 | 初始化reduce直接显示；完成释放transform/filter；卸载清理context；偏好实时变化支持差距见当前计划 | [AnimatedContent](src/components/AnimatedContent/index.jsx)、[来源记录](src/components/AnimatedContent/README.md)；首页design §4 | 外层保留ol/li、sticky链接等语义与布局；同一transform不得由入场和覆盖效果同时控制；不推广案例正文逐节隐藏 |
| ParticleText／通用能力，当前单一业务调用 | 粒子文字底层；本地画布与可选全首屏绘制；不预设必须用于其它标题 | 视口／页面可见性暂停与卸载清理按源码；由外层提供语义标题和降级 | [ParticleText](src/components/ParticleText/index.jsx)、[来源记录](src/components/ParticleText/README.md) | 粒子配色、字体、采样及互动采用值属于首页，不作为全站动效令牌 |
| ParticleTitle／首页专用适配 | 姓名动态显示与静态回退 | 能力可用且非reduce时运行；偏好变化切换回退；保留h1与导航交接钩子 | [ParticleTitle](src/components/Hero/ParticleTitle.jsx)；首页design §4 | 只包首页姓名，不与其它入场重复叠加 |
| Navbar／首页专用组合 | 独立姓名、居中菜单、窄屏菜单 | 当前项aria-current与非颜色标记；姓名隐藏不占焦点／辅助树；重复锚点可定位；Escape关闭，菜单焦点恢复 | [Navbar](src/components/Navbar/index.jsx)；DESIGN §5.1及首页特例 | 字体和姓名交接不推广到案例顶栏；无装饰loading |
| Hero／首页专用组合 | 姓名、定位句、向下提示、环境层；无CTA | 姓名离场交接；环境层可见性与reduce；不锁滚动 | [Hero](src/components/Hero/index.jsx)；首页design §4、DESIGN §6.1 | 不能将其字号或屏高套给案例封面 |
| Portfolio／首页专用组合，卡片内部重复 | 项目选择；当前精简入口；保留的带证据配方未选用 | hover／focus-within同级；无永久selected；sticky条件及回退引用DESIGN §6.2；失效目标不得伪装可点 | [Portfolio](src/components/Portfolio/index.jsx)；DESIGN §5.4、§6.3及首页特例 | 项目卡尚未独立导出；目录内静态截图不套整卡链接；不恢复首页数据块 |
| Experience／首页专用组合 | 真实履历开放列表、日期与职位／能力 | 静态列表，不添加卡片hover、节点光圈或交错时间线 | [Experience](src/components/Experience/index.jsx)；首页design §4 | 用事实稿供给内容，不抽成营销成就组件 |
| Contact／首页专用组合 | 邮箱与微信渠道 | 邮箱mailto；复制pending防重入、成功文字反馈；失败或不可用保留号码与手动指引，不假报成功；提示不遮挡渠道 | [Contact](src/components/Contact/index.jsx)；首页design §4 | 不新增未授权渠道；复制能力可以后续抽取，布局不因此推广 |
| ScrollToTop／已有全站基础设施 | 路由切换、首页目标区返回定位 | 按路由／hash决定定位；reduce即时；取消过期帧与监听 | [ScrollToTop](src/components/ScrollToTop/index.jsx) | 与案例内部锚点职责区分，避免双重滚动与双重顶部补偿 |
| ProjectDetail／分发器 | 选择独立案例模块及未找到回退 | 有效路由进入案例；无匹配保留返回首页 | [ProjectDetail](src/pages/ProjectDetail/index.jsx) | 不是共享Reader，不把案例业务布局堆入分发器 |

## 3. 案例阅读组件契约

下表是后续抽取依据。各案例仍自包含；未来共享展示实现可位于案例shared目录，业务图形保留本页。表内源码链接是现状，不代表已有同名共享文件。

| 对象／成熟度 | 用途、组成与合法变体 | 状态／交互 | 当前源码位置与采用值引用 | 复用边界 |
| --- | --- | --- | --- | --- |
| Reader布局、封面与控件／待抽取 | 深色封面、浅色正文、目录、返回；V4三轨为保留配方，主案例双轨同宽为已选配方；页面声明节奏与特例 | 封面离场切换顶栏；正文默认可见；返回目标保留；实际未实现的进度不标完成；语言入口继续停用 | [会员入口](src/pages/cases/MemberAutomation/index.jsx)、[正畸入口](src/pages/cases/Orthodontics/index.jsx)、[PACS入口](src/pages/cases/PacsAi/PacsAiPage.jsx)及各自CSS Module；DESIGN §4.6、§5.5 | 共享几何与阅读壳，页面提供内容与锚点；不改变独立路由、准入或建立通用业务数据层；不迁移预习壳 |
| Reader TOC／待抽取 | 基于确认章节的目录；桌面侧栏、正畸已定义popover及其它页既有窄屏方式分别保留 | 完整条目；当前项标记和字重；定位后焦点交标题；重复定位及旧锚点兼容；低高度可滚动；popover支持Escape及返回触发焦点；无滚动高度时进度归零 | 同上；DESIGN §5.6；正畸design §4；实际差距见当前计划 | 概览定位正文或封面的差异由已选配方／本页声明；条目和章数不写死，不把尚未统一的移动方式写成已实现 |
| ChapterHeading／页面内复用，跨页待抽取 | 编号、辅助眉题、正式章标题；紧凑／分隔节奏由DESIGN配方选择 | 正式标题不裁切；锚点可接收程序焦点；辅助编号不重复朗读；无hover、loading | [会员ChapterHeading](src/pages/cases/MemberAutomation/index.jsx)、[正畸ChapterHeading](src/pages/cases/Orthodontics/index.jsx)、[PACS ChapterHeading](src/pages/cases/PacsAi/visuals.jsx)；DESIGN §3.4、§4.6 | 相同结构共用；内容、眉题和章数由页面供给。预习Q标题只继承统一编号间距，其它结构不强改 |
| EvidenceFigure／待抽取 | 完整截图、截图＋摘要与解释行、同源局部放大组、命名占位；均有就近figcaption | 加载维持尺寸；失败保留图名、说明与论点；仅启用放大时使用可操作触发器，普通静态图不伪装按钮 | 会员[Screenshot](src/pages/cases/MemberAutomation/index.jsx)、PACS[EvidencePlaceholder](src/pages/cases/PacsAi/PacsAiPage.jsx)；DESIGN §4.3–4.4、§5.7；会员design §4 | 相同证据关系优先复用；不将占位、封面包装和真实系统证据混作一种证明；图注不拆成悬空说明卡 |
| ImageViewer／会员页面内复用 | 完整图片适应视口的可选模态查看；与正文用同一完整资产；右上仅关闭按钮，预留空间不遮图 | 打开后锁背景滚动并聚焦关闭；Escape、关闭按钮和图外背景退出；关闭恢复触发焦点与滚动；不出现内部滚动、额外链接或新标签页；无适用异步行为则无pending | 会员[ImageViewer](src/pages/cases/MemberAutomation/index.jsx)；会员design §4 | 需要检查细节时才复用，不要求所有图都可放大；不把图片放大层套到案例路由作为overlay |
| ReadingTable／页面内复用，跨页待抽取 | 表头、行标题、单元格；规则对照、状态—处理关系；数值多维比较按真实关系选型 | 使用语义table与行／列标题；局部横向滚动；无真实排序筛选就不新增交互 | PACS[ReadingTable](src/pages/cases/PacsAi/PacsAiPage.jsx)；DESIGN §5.7；页面局部特例 | 与开放数据行区分；同为表格不代表业务字段、列数可写死 |
| MetricRows／PACS页面内变体，跨页待抽取 | 数值与完整解释的开放行；前后对照、区间图是不同业务变体 | 静态数字，不计数；标签、单位、周期、限制一同可读；没有精确数据不补趋势 | PACS ReadingTable的metrics分支；会员RenderBlocks的outcomes；正畸[PeriodComparison／RolloutEvidence](src/pages/cases/Orthodontics/visuals.jsx)；DESIGN §5.7、页面特例 | 不把目标、使用规模与效果混排，不强制所有成果套数字卡或同一字号 |
| Diagram基础／规则已共享，源码未共享 | 图题、业务内容、图注；流程、条件、职责矩阵、状态、区间等按关系选择 | 提供等价说明与阅读顺序，静态图无虚假交互；装饰SVG隐藏；媒体／容器变化重测 | [正畸visuals](src/pages/cases/Orthodontics/visuals.jsx)、[PACS visuals](src/pages/cases/PacsAi/visuals.jsx)；DESIGN §4.5–4.7 | 先共享语法和容器；推荐范围、共同记录、复核与同步等业务内容继续页面专用，不把某案例规则推广全站 |
| Button／Link、Carousel／规则配方，未有独立通用组件 | 动作／导航分工；轮播仅在多个同级证据需顺序浏览时采用 | 真disabled取消操作及位移；hover仅可悬停设备；focus清楚；真实异步才pending；轮播边界禁用、单张隐藏箭头、不自动播放 | 原生button／Link分散在现有模块；DESIGN §5.3、§5.7 | 登记不等于要求新增库、API或轮播功能；比较任务优先同时可见 |

所有控件的active只做既有颜色／边界确认，不增加缩放回弹；hover、focus和当前项不可相互覆盖；状态通过局部关联文字表达，无真实异步行为不显示装饰loading。

### 3.1 媒体加载与生命周期

- 图片声明尺寸或比例；首屏必要媒体优先，其余按需加载；失败保持同尺寸说明，图注与论点不消失，不无限重试。
- 功能视频默认主动播放、可暂停，保留poster及静态说明；仅经确认的环境媒体允许静音自动播放，并在离屏／页面隐藏时暂停，reduce用poster。autoplay属性不等于播放成功，退出路由释放监听和播放。
- 轮播／数据图在load、loadedmetadata、字体就绪和容器resize后重测，保留当前项；无内容显示真实空状态，不填随机图或数字。
- 动效基础条件引用DESIGN §6；同一transform有单一控制者，取消／卸载后释放；第三方组件当前未满足的部分记录为差距，不改写成已实现。

## 4. 待抽取项与实现差距

后续按“基础变量和几何 → 标题／正文 → 证据图组 → 导航阅读壳 → 数据与图形容器”的依赖推进，逐项进入内部组件预览页，再接入真实页面。具体任务、验收与冲突只见[当前计划](docs/superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md#后续源码组件化与验收任务仅登记未开发)。

`src/pages/cases/shared/editorial-case.css` 是现存但未被导入的旧样式，不作为当前共享实现，也不因文件名为shared直接接入。正文解析辅助函数相似，不等于本轮要统一内容数据结构。预览与双层验收均尚未开发。
