# PACS 完整案例页面内容实施计划

> **历史归档 · 2026-09-30**：历史任务退出默认执行；未完成审核/同步/提交事项迁入当前任务。
> 当前审核入口：[PACS 内容审核稿](../../../pages/pacs-ai/content.md)；保留待办与迁移记录见[当前任务](../../plans/current/2026-09-30-architecture-simplification-and-single-source-of-truth.md)。以下原文仅供追溯，不作为当前执行指令；归档不表示所有旧事项已完成。

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法跟踪进度。

**目标：** 将已确认的 PACS 完整读片母稿同步到详情页，使页面从 AI 功能展示改为完整读片项目叙事，并严格区分职责、动态目标、使用规模与未验证结果。

**架构：** 新建页面级双语内容模块，作为 PACS 组件的唯一前端文案来源；组件按七段式连续叙事渲染，并继续复用已实现的视觉证据占位组件。`src/data/projects.js` 只保留路由和通用项目元数据所需字段，并同步纠正对外可见的标题、角色、背景与结果口径。

**技术栈：** React 18、CSS Modules、Vitest、Testing Library、Vite。

---

## 文件结构

- 创建：`src/pages/cases/PacsAi/content.js` - PACS 页面双语事实内容、流程、决策与指标口径。
- 修改：`src/pages/cases/PacsAi/index.jsx` - 按七段式结构渲染内容与视觉证据位。
- 修改：`src/pages/cases/PacsAi/PacsAi.module.css` - 为新叙事结构补充响应式布局。
- 修改：`src/data/projects.js` - 校正 PACS 通用元数据，移除首页或路由可能读取的旧职责与强结果口径。
- 修改：`src/pages/ProjectDetail/index.test.jsx` - 验证新内容结构、事实边界和旧叙事移除。
- 修改：`docs/site/content-map.md` - 标记 PACS 页面母稿已同步到前端。

### 任务 1：建立内容验收测试

- [x] **步骤 1：写入失败测试**

新增测试，验证页面包含以下内容：

```js
expect(screen.getByRole('heading', { name: '让拍片后的读片、沟通和记录重新进入系统' })).toBeInTheDocument();
expect(screen.getByText('拍片已经数字化，拍片后的专业动作还没有')).toBeInTheDocument();
expect(screen.getByText('先让每一次读片有状态、有内容、有去向')).toBeInTheDocument();
expect(screen.getByText('当读片可以被记录，AI 才有位置进入流程')).toBeInTheDocument();
expect(screen.getByText('一条从应拍片判断到管理追踪的完整链路')).toBeInTheDocument();
expect(screen.getByText('60%')).toBeInTheDocument();
```

同时验证页面不再出现：`迭代路径`、`V1 主导`、`V2 全权负责`、`数据飞轮`、`平均发现数提升 +142%`。

- [x] **步骤 2：运行测试确认失败**

运行：

```bash
npm test -- src/pages/ProjectDetail/index.test.jsx -t "pacs detail presents the complete reading project"
```

预期：FAIL，首个失败原因为新 Hero 标题尚未渲染。

### 任务 2：建立页面级双语内容源

- [x] **步骤 1：创建 `content.js`**

内容严格取自 `docs/pages/pacs-ai/content.md`，包含：

- Hero 标题、摘要、职责和项目状态。
- 管理人员与医生两类需求。
- 基础读片四项机制。
- AI 进入流程的三个推动因素。
- 医生选择、三种复核和手动降级三项关键判断。
- 九步端到端流程与异常分支。
- 流程结果、动态目标、使用规模、运营观察限制和复盘。

- [x] **步骤 2：校验禁止表述**

运行：

```bash
rg -n "V1 主导|V2 全权负责|全权负责整个项目|直接用于.*训练|降低漏诊|避免误诊|平均发现数提升 \+142%" src/pages/cases/PacsAi/content.js
```

预期：无匹配。

### 任务 3：重构 PACS 页面结构

- [x] **步骤 1：重写页面为七段式连续叙事**

按以下顺序渲染：

```text
Hero → 项目起点 → 基础读片闭环 → AI 进入原因 → 三项关键判断 → 端到端流程 → 结果与复盘
```

保留 6 个核心视觉证据位和 1 个可选影像类型位，不加载旧截图。

- [x] **步骤 2：补充新结构样式**

使用无框章节、12 列响应式网格、16px 大型容器圆角和现有 Lavender / Mint / Pink 色彩职责。桌面双栏或非对称布局在 `< 900px` 变为单栏，流程在移动端纵向排列。

- [x] **步骤 3：同步通用项目元数据**

在 `src/data/projects.js` 校正 PACS 的标题、标签、背景、角色、问题与结果摘要，确保不再把项目描述成 V1/V2 版本升级或把 `1.43 → 3.46` 当成已证明的医学结果。

- [x] **步骤 4：运行目标测试确认通过**

运行：

```bash
npm test -- src/pages/ProjectDetail/index.test.jsx -t "pacs detail presents the complete reading project"
```

预期：PASS。

### 任务 4：同步状态与完成验证

- [x] **步骤 1：更新内容映射**

在 `docs/site/content-map.md` 标记页面已于 2026-09-28 同步正式母稿，同时保留真实截图待脱敏替换状态。

- [x] **步骤 2：运行完整验证**

运行：

```bash
npm test -- src/pages/ProjectDetail/index.test.jsx
npm run lint
npm run build
git diff --check
```

预期：详情页测试全部通过；lint 无错误；生产构建成功；diff 无空白错误。

- [x] **步骤 3：检查事实边界**

运行：

```bash
rg -n "V1 主导|V2 全权负责|全权负责整个项目|数据飞轮|成功消除|提升医学检出率" src/pages/cases/PacsAi src/data/projects.js
```

预期：PACS 对外内容无上述旧强结论。

## 2026-09-29 内容复核状态

9 月 29 日根据最新场景确认与批注，`docs/pages/pacs-ai/content.md` 已重新组织为“业务背景与问题现场 → 根因与设计命题 → 医疗工作流设计原则 → 关键机制与产品决策 → UX 手艺 → 结果与反思”的内容结构。此次只更新事实底稿和页面母稿，尚未把新版文案同步到前端。

- [x] 补充接诊预习按规则推荐拍片的前序背景。
- [x] 明确医生在诊室电脑前向家长讲片时同步标记并填写全部结构化字段。
- [x] 明确点击“完成读片”并通过完整性校验后才同步病历。
- [x] 补充减少二级选择、长列表搜索/筛选与内容复用的速度设计逻辑。
- [x] 移除对外叙事中的 V1 / V2 高低关系，并收紧效率、医学结果与数据口径边界。
- [x] 用户确认首屏摘要采用“问题缺口 → 读片闭环 → AI 进入工作流”的两句精简表达（2026-09-29）。
- [x] 用户确认首屏正式内容由分类标签、标题、摘要、项目范围、我的角色、项目状态与主视觉组成；详细职责下沉正文（2026-09-29）。
- [ ] 用户复核并确认 2026-09-29 版页面母稿。
- [ ] 用户确认后，将新版母稿同步到 `src/pages/cases/PacsAi/` 与相关页面测试；继续保留视觉证据占位，不替换真实截图。
