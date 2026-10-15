# 站点结构说明

## 根目录

- `src/`：前端源码目录。
- `docs/`：项目文档目录（统一入口见 [`docs/README.md`](../README.md)）。
- `AGENTS.md`：AI 协作边界、读取路径与条件式追问规则。
- `DESIGN.md` / `DESIGN-preview.html`：通用设计采用值与直接读取 Markdown 的查看器。
- `package.json` / `vite.config.js` / `index.html`：项目依赖、构建配置与页面入口模板。

## `src/`

- `components/`：通用与首页区块组件，包含 `Navbar`、`Hero`、`Portfolio`、`Experience`、`Contact`、`HomeIcon` 等。
- `pages/`：
  - `Home/`：首页装配与私有样式（`Home.css`）。
  - `ProjectDetail/`：案例详情独立路由分发容器。
  - `cases/<CaseName>/`：自包含案例模块（`MemberAutomation`、`Orthodontics`、`PacsAi`、`PreVisitEngine`），各含独立组件、私有样式与 `content.js`；公共阅读样式位于 `cases/shared/`。
- `context/` 与 `locales/`：多语言上下文与中英文文案字典。
- `data/projects.js`：案例路由注册表。
- `styles/`：全局基础样式与 CSS 变量。

## 当前首页结构

首页按 4 个核心区块顺序组织：

1. `Hero`（首屏主张）
2. `Portfolio`（精选项目：会员自动化 → 正畸筛查 → PACS）
3. `Experience`（职业历程交错时间线）
4. `Contact`（合作连接）

## `docs/`

- `origin/`：项目原始材料、报表与过程草稿（仅供追溯）。
- `profile/`：个人履历事实、时间线与背景来源归档。
- `project/`：整理后的项目事实底稿与证据就绪清单（[`content-readiness.md`](../project/content-readiness.md)）。
- `pages/`：各页面内容审核母稿（`content.md`）与设计说明（`design.md`）。
- `design/`：参考站拆解与独立 HTML 视觉样稿。
- `site/`：页面路由注册表（[`content-map.md`](content-map.md)）与站点结构说明。
- `superpowers/`：当前任务计划（`plans/current/`）与历史归档（`plans/archive/`、`specs/archive/`）。

`scripts/` 为本地验证工具；`output/` 保存被 Git 忽略的截图、测量与恢复备份。
