# 文档入口

> 更新：2026-11-13。审核页面内容或设计时，直接从下表进入对应文件；协作与读取边界见根目录 [AGENTS.md](../AGENTS.md)。

网站整体目标、读者路径、页面内容与功能范围见[作品集网站产品文档](site/product.md)。该文档按现有底稿汇总，不替代下表的内容、设计与审核入口。

## 我要审核哪一份？

| 页面 | 案例内容底稿／首页内容 | 页面设计（特例、审核与实施状态） |
| --- | --- | --- |
| 首页 | [内容稿](pages/homepage/content.md) | [设计说明](pages/homepage/design.md) |
| 会员自动化 | [内容稿](pages/member-automation/content.md) | [设计说明](pages/member-automation/design.md) |
| 正畸筛查 | [内容稿](pages/orthodontics/content.md) | [设计说明](pages/orthodontics/design.md) |
| PACS | [内容审核稿](pages/pacs-ai/content.md) | [设计稿说明](pages/pacs-ai/design.md) |
| 接诊预习（候选案例） | [内容稿](pages/pre-visit-engine/content.md) | [设计说明](pages/pre-visit-engine/design.md) |

## 当前焦点与规范入口

- **当前工作顺序：** 先完善PC中文版，整体确认后再统一适配移动端；英文版暂时停用、隐藏切换入口，文案与代码保留供按需恢复。协作规则见根目录[AGENTS.md](../AGENTS.md)。
- **当前实施计划：** [结构精简与当前待办](superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md)（已完成与被替代的历史记录归档于 [`superpowers/plans/archive/`](superpowers/plans/archive/)）。
- **页面审核：** 从上表进入对应design.md的“验收与状态”；当前行动只在实施计划登记，不在本入口复制页面状态。候选预习不因规范整理变为公开主案例。
- **基础与数值：** [DESIGN.md](../DESIGN.md) V4.1维护Design Foundations、共享数值配方及信息关系→视觉表达选择；[原文查看器](../DESIGN-preview.html)直接读取本文，不另存规则。参考拆解仅作证据。
- **组件契约：** [COMPONENTS.md](../COMPONENTS.md)登记用途、变体、状态、源码位置与复用边界，明确已有共享、页面专用与待抽取，引用DESIGN而不复制数值。
- **页面设计：** 上表design.md统一为目标、构图、内容视觉化、局部特例、素材使用、验收六部分；共享规则引用全局，业务语义与有依据的局部差异保留。文件职责详见[页面目录说明](pages/README.md)。
- **规范整理与后续实施：** 本轮仅整理文档；内部组件预览页和双层验收只登记到[当前计划](superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md#后续源码组件化与验收任务仅登记未开发)，尚未开发。待核实冲突也只在该计划维护；[整理前快照](superpowers/plans/archive/2026-11-06-design-responsibility-migration-history.md)不是当前审核入口。
- **案例内容规范：** [CASE_STUDY_SPEC.md](CASE_STUDY_SPEC.md)统一维护底稿定位、自由叙事、十维完整性检查、设计判断与证据、缺口核对及验收；不按网页章节或最终文案字数提前裁剪底稿。
- **证据就绪与页面准入：** 证据与素材缺口见 [content-readiness.md](project/content-readiness.md)；路由与准入状态见 [content-map.md](site/content-map.md)；项目事实与履历事实见 [`project/`](project/README.md) 与 [`profile/`](profile/README.md)。
