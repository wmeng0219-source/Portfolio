# 页面与资料入口

网站面向已看过简历的用人经理：从首页选一个相关案例，或直接进入案例验证问题理解、判断、个人贡献与证据；读完可返回项目区或联系。首页不承担简历初筛。

规则只看 [AGENTS.md](../AGENTS.md)（协作与内容底线）和 [DESIGN.md](../DESIGN.md)（设计基础，[原文查看器](../DESIGN-preview.html)）。下面只记录页面位置和资料入口。

## 页面

| 页面 | 路由与展示位置 | 当前内容与证据备注 | 重要设计与审核记录 |
| --- | --- | --- | --- |
| 首页 | `/` | [内容](pages/homepage/content.md) | [记录](pages/homepage/design.md) |
| 会员自动化 | `/project/member-automation` · 首页精选 01 | [内容](pages/member-automation/content.md) | [记录](pages/member-automation/design.md) |
| 咬合筛查与正畸协作 | `/project/orthodontics` · 首页精选 02 | [内容](pages/orthodontics/content.md) | [记录](pages/orthodontics/design.md) |
| PACS 读片与 AI 辅助 | `/project/pacs-ai` · 首页精选 03 | [内容](pages/pacs-ai/content.md) | [记录](pages/pacs-ai/design.md) |
| 接诊预习 | `/project/pre-visit-engine` · 候选，不进首页 | [内容](pages/pre-visit-engine/content.md) | [记录](pages/pre-visit-engine/design.md) |
| 会员视觉实验 | 本地 `/design-experiment/membership` · 源码与实验路由保留本地，不纳入正式提交 | 复用会员材料 | [实验记录](pages/design-experiment-membership/design.md) |

## 按需查阅

- [当前待办](superpowers/plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md)：仅未完成行动。
- [项目事实](project/README.md)、[个人资料](profile/README.md)、`origin/`：事实与来源；证据缺口在对应案例内容稿的内部备注。
- 源码：[`src/`](../src/)；首页在 `pages/Home/`，独立案例在 `pages/cases/`，全局样式在 `styles/`。这些路径以源码实际目录为准。
- [设计参考](design/)：研究材料，按需使用，不作为规范。
- [项目精简前记录](superpowers/plans/archive/2026-11-19-project-simplification-history.md)：旧规则、产品摘要、注册表、证据清单和原待办；[此前设计精简记录](superpowers/plans/archive/2026-11-19-design-simplification-history.md)。均仅供追溯。
