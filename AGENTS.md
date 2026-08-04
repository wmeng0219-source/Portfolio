# Project Guidelines & Rules

## 前端 UI 开发规范 (Mandatory Frontend Design Rule)

在本项目中修改、重构或新增任何前端代码（页面、组件、样式、CSS 变量、布局）时，**必须默认将根目录下的 [DESIGN.md](file:///Users/wen/Desktop/Portfolio/DESIGN.md) 作为唯一视觉与 UI 规范依据**：

1. **配色与暗黑主题**：使用 Midnight Base (`#0d0c11`)、Obsidian Card (`#16151c`)、薰衣草紫 (`#d0bcff`) 与薄荷绿 (`#b9f2c8`)。不得随意引入未在 `DESIGN.md` 中定义的第三配色。
2. **字体与 Fluid Clamp 缩放**：标题使用 `Neudron`，正文使用 `GT America`，标签与数据使用 `IBM Plex Mono`。所有 Heading 与 Body 字号必须采用 `clamp()` 流式字号响应规则。
3. **圆角与间距系统**：卡片圆角统一为 `16px`，小按钮/微标签圆角统一为 `10px`，遵循 8px 网格基准。
4. **组件风格**：卡片采用 `1px solid #2a2833` 发丝边框与演示文稿 Deck Slide 样式，悬停使用 `transform: translateY(-2px)` 及紫色辉光边框过渡。
5. **案例模块架构规范**：所有案例详情页统一放置于 `src/pages/cases/<CaseName>/` 目录下，保持独立自包含结构（独立 JSX 与 CSS 模块），由 `ProjectDetail/index.jsx` 统一进行路由分发。
