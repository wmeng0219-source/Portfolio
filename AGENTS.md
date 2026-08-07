# Project Guidelines & Rules

## 前端 UI 开发规范 (Mandatory Frontend Design Rule)

在本项目中修改、重构或新增任何前端代码（页面、组件、样式、CSS 变量、布局）时，**必须默认将根目录下的 [DESIGN.md](./DESIGN.md) 作为唯一视觉与 UI 规范依据**：

1. **配色与暗黑主题**：使用 Midnight Base (`#0B0F14`)、Dark Surface (`#141922`)、Elevated Surface (`#1C2330`)、Digital Lavender (`#C8B6FF`) 与 System Green (`#B8E6D0`)。不得随意引入未在 `DESIGN.md` 中定义的第三配色。
2. **字体与 Fluid Clamp 缩放**：标题与 Display 使用 `Anton` / `Inter`，正文使用 `Inter`，标签与数据使用 `IBM Plex Mono` / `JetBrains Mono`。所有 Heading 与 Body 字号必须采用 `clamp()` 流式字号响应规则。
3. **圆角与间距系统**：小型元素 `4px`、标准组件 `12px`、大型卡片/容器 `16px`、胶囊 `9999px`，遵循 8px 网格基准。
4. **组件风格**：卡片采用 `1px solid rgba(255,255,255,0.12)` 边框与演示文稿 Deck Slide 样式，悬停使用 `transform: translateY(-4px)` 及紫色辉光边框过渡。
5. **案例模块架构规范**：所有案例详情页统一放置于 `src/pages/cases/<CaseName>/` 目录下，保持独立自包含结构（独立 JSX 与 CSS 模块），由 `ProjectDetail/index.jsx` 统一进行路由分发。

