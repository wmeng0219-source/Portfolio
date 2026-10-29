# 文档入口

> 更新：2026-10-15。审核页面内容或设计时，直接从下表进入对应文件；协作与读取边界见根目录 [AGENTS.md](../AGENTS.md)。

## 我要审核哪一份？

| 页面 | 内容结构、文案与配图要求 | 页面设计（特例、审核与实施状态） |
| --- | --- | --- |
| 首页 | [内容稿](pages/homepage/content.md) | [设计说明](pages/homepage/design.md) |
| 会员自动化 | [内容稿](pages/member-automation/content.md) | [设计说明](pages/member-automation/design.md) |
| 正畸筛查 | [内容稿](pages/orthodontics/content.md) | [设计说明](pages/orthodontics/design.md) |
| PACS | [内容审核稿](pages/pacs-ai/content.md) | [设计稿说明](pages/pacs-ai/design.md) |
| 接诊预习（候选案例） | [内容稿](pages/pre-visit-engine/content.md) | [设计说明](pages/pre-visit-engine/design.md) |

## 当前焦点与规范入口

- **当前工作顺序：** 先完善PC中文版，整体确认后再统一适配移动端；英文版暂时停用、隐藏切换入口，文案与代码保留供按需恢复。协作规则见根目录[AGENTS.md](../AGENTS.md)。
- **当前实施计划：** [结构精简与当前待办](superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md)（已完成与被替代的历史记录归档于 [`superpowers/plans/archive/`](superpowers/plans/archive/)）。
- **当前待查看页面：**
  - **运行首页**：已按本轮满屏Hero、极简案例入口、对齐履历列表与紧凑联系区落地并检查运行页，待查看实际视觉（见[首页设计说明](pages/homepage/design.md)）。
  - **正畸实际页面**：已按用户确认的 Figma 适配落实窄文宽图、阅读字阶与解释图形，待查看实际视觉；验证与阻塞状态见[正畸设计说明](pages/orthodontics/design.md)。
  - **PACS 实际页面**：已按用户要求采用正畸阅读规范，保留原七章内容，加入同步、复核及状态等解释图；PC具体视觉待查看，见[PACS设计说明](pages/pacs-ai/design.md)。旧HTML样稿不再作为当前审核入口。
- **视觉与设计规范：** 通用设计值由根目录 [DESIGN.md](../DESIGN.md)（[原文查看器](../DESIGN-preview.html)）维护；页面特例仅在对应 `pages/<slug>/design.md` 维护并明确覆盖范围（[Harrison Wheeler 原站拆解](design/reference-harrison-wheeler.md)仅作参考证据）。
- **案例质量与证据要求：** [CASE_STUDY_SPEC.md](CASE_STUDY_SPEC.md)（含四层叙事推导方法与证据边界）。
- **证据就绪与页面准入：** 证据与素材缺口见 [content-readiness.md](project/content-readiness.md)；路由与准入状态见 [content-map.md](site/content-map.md)；项目事实与履历事实见 [`project/`](project/README.md) 与 [`profile/`](profile/README.md)。
