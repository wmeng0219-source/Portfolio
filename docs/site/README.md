# 站点说明文档

本目录用于说明当前作品集网站的页面结构、内容映射和维护边界。

首页已经完成一轮品牌化整合，`Hero / Portfolio / About / Experience / Contact` 的核心表达已经进入实际页面。因此本目录当前的重点不是“继续写一套待实现文案”，而是回答两件事：

- 当前页面各区块分别承担什么职责。
- 后续改版时应该从哪里取材、更新哪一层文档。

## 站点定位

这是一个用于求职展示的个人网站，当前首页采用更偏品牌舞台化的表达方式：

- `Hero`：建立第一眼身份与方法气质。
- `Portfolio`：精选案例入口。
- `About`：方法声明。
- `Experience`：成长阶段展示。
- `Contact`：收尾行动邀请。

## 目录职责

- 记录当前站点结构和区块职责。
- 维护页面内容与资料层之间的映射关系。
- 为后续页面维护提供统一入口。
- 不承担原始事实归档职责，也不替代过程方案文档。

## 文件说明

- `structure.md`：当前网站项目结构与源码职责说明。
- `content-map.md`：页面区块与 `profile / project / pages / design` 的取材映射；回答"页面现在从哪取材、后续怎么维护"。

### 与 `docs/pages/` 的分工

`docs/pages/` 保存每个页面的内容结构（`content.md`）与设计规范（`design.md`），是页面文案与视觉的唯一母稿层。`content-map.md` 只维护"区块 ↔ 资料层映射"这类长期信息，**不重复堆叠首页逐句文案**；首页逐字文案见 [`pages/homepage/content.md`](../pages/homepage/content.md)，视觉基准见 [`pages/homepage/design.md`](../pages/homepage/design.md)。两者分工不同，更新首页文案时只改 `pages/homepage/content.md`，并同步 `content-map.md` 中受影响的结果指标，避免口径分叉。

## 使用建议

### 想了解当前页面怎么组成

先看 `structure.md`，再看 `content-map.md`。

### 想补充页面内容

- 个人背景相关内容：优先看 `docs/profile/`
- 项目事实相关内容：优先看 `docs/project/`
- 页面文案与内容结构：优先看 `docs/pages/<slug>/content.md`
- 页面设计规范与视觉素材：优先看 `docs/pages/<slug>/design.md` 与根目录 `DESIGN.md`

### 想回看这轮方案为什么会变成现在这样

前往 `docs/superpowers/` 查看历史规格和实现计划。

## 当前维护原则

- 页面已经整合的内容，以当前实现为准。
- `site/` 文档只保留“页面结构、区块职责、来源映射”这类长期信息。
- 不在这里重复堆叠一版和页面完全一致的逐句文案。
- 若页面改版完成，优先更新 `site/` 中的职责和映射说明。
