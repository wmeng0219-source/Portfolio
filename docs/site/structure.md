# 站点结构说明

## 根目录

- `src/`：前端源码目录。
- `docs/`：项目文档目录。
- `chatgpt记忆.md`：原始背景资料，保留。
- `职业背景信息chatgpt.md`：原始背景资料，保留。
- `package.json`：项目依赖与脚本配置。
- `vite.config.js`：Vite 配置。
- `index.html`：页面入口模板。

## `src/`

- `components/`：页面区块组件，目前包含 `Navbar`、`Hero`、`About`、`Experience`、`Portfolio`、`Contact`。
- `context/`：语言上下文。
- `locales/`：中英文文案。
- `styles/`：全局样式与变量。
- `App.jsx`：页面主装配文件。
- `main.jsx`：应用入口。

## `docs/`

- `origin/`：项目原始材料、草稿和过程性整理。
- `profile/`：个人背景资料、结构化总结与来源归档。
- `project/`：已整理、可进入网页展示的项目案例。
- `site/`：当前作品集网站的结构说明与内容映射。
- `superpowers/`：AI 协作过程中的规格与计划文档。

## 当前整理原则

- 运行相关文件尽量保持稳定，不因资料整理而变动。
- 个人背景资料统一沉淀到 `docs/profile/`。
- 原始项目材料保留在 `docs/origin/`。
- 面向网页展示的项目内容统一沉淀到 `docs/project/`。
- 页面内容开发前，优先参考 `docs/profile/`、`docs/project/` 与 `docs/site/content-map.md`。
