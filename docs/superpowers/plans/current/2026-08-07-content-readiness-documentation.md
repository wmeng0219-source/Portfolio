# 项目内容就绪度文档 实施计划

> **面向 AI 代理的工作者：** 本计划用于一次受控的文档治理更新；按任务顺序执行，并在全部文档更新后运行交叉引用与格式检查。

**目标：** 将作品集案例所需的责任边界、证据口径、决策权衡、素材、验证、反思与能力迁移要求，落实到事实库、案例规范、站点映射和个人资料维护文档。

**架构：** `docs/project/` 继续作为事实层，新增只读的内容就绪度清单记录证据缺口；`docs/CASE_STUDY_SPEC.md` 定义案例合格标准；`docs/site/` 定义页面取材与准入；`docs/profile/` 定义个人可信度与能力迁移材料。所有待补项只描述所需证据，不生成或推断项目事实。

**技术栈：** Markdown、仓库既有文档层级、`rg`、`git diff --check`

---

### 任务 1：补全案例证据契约

**文件：**
- 修改：`docs/CASE_STUDY_SPEC.md`

- [x] 增加研究/验证证据、反思边界、可展示素材和能力迁移的规范。
- [x] 保持已确认事实、设计推理和未验证假设的区分。
- [x] 将新清单作为现有项目的补强入口，不改变项目事实。

### 任务 2：建立事实层收集与就绪度清单

**文件：**
- 修改：`docs/project/README.md`
- 创建：`docs/project/content-readiness.md`

- [x] 定义从原始材料到案例叙事的收集顺序与证据分类。
- [x] 按会员、正畸、PACS、接诊预习逐项列出已有强项与待补证据。
- [x] 明确待补项必须回填事实来源，不能用占位文案上网页。

### 任务 3：同步站点与个人资料维护边界

**文件：**
- 修改：`docs/site/content-map.md`
- 修改：`docs/profile/README.md`
- 修改：`docs/README.md`

- [x] 为首页主案例、扩展案例和详情页定义准入标准。
- [x] 定义“医疗领域经验 → 通用复杂系统能力”的可迁移表达来源。
- [x] 更新文档总览，确保维护者先回填事实，再更新页面。

### 任务 4：验证文档关系

**文件：**
- 验证：`docs/CASE_STUDY_SPEC.md`
- 验证：`docs/project/README.md`
- 验证：`docs/project/content-readiness.md`
- 验证：`docs/site/content-map.md`
- 验证：`docs/profile/README.md`
- 验证：`docs/README.md`

- [x] 用 `rg` 确认每个新增要求都有唯一归属文档。
- [x] 用 `git -c core.fsmonitor=false diff --check -- docs` 确认 Markdown 无空白错误。
- [x] 检查交叉引用路径存在，且没有将待补项表述成既成事实。
