# 三层文档结构整理实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按三层结构重组 `docs/` 目录，明确 `origin / project / site` 各自职责，将 `docs/cases/` 并入 `docs/project/`，并把规则写入各层 `README.md`。

**架构：** 本次实现只调整文档目录和说明文档，不修改网站页面代码。通过新增或更新 `README.md` 固定三层规则，通过迁移项目文档统一 `docs/project/` 入口，并同步更新 `site` 中对内容来源的说明，确保后续新增案例遵循固定流转路径。

**技术栈：** Markdown、现有 `docs/` 文档体系、Git 文件迁移

---

## 文件结构

### 创建文件

- `docs/origin/README.md`：定义原始材料层的职责与使用规则。

### 修改文件

- `docs/project/README.md`：改写为“事实整理版项目文档”的唯一入口说明。
- `docs/site/README.md`：改写为“网站提炼层”说明。
- `docs/site/content-map.md`：确保内容来源描述与三层结构一致。

### 迁移文件

- `docs/cases/会员自动化.md` -> `docs/project/会员自动化.md`

### 可能删除的目录

- `docs/cases/`：迁移完成且确认为空后删除。

### 参考文件

- `docs/superpowers/specs/2026-07-01-docs-three-layer-structure-design.md`
- `docs/project/正畸筛查与状态管理.md`

---

### 任务 1：建立 `docs/origin/` 规则说明

**文件：**
- 创建：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/origin/README.md`

- [ ] **步骤 1：检查 `docs/origin/` 现有内容**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs/origin" -maxdepth 2 -type f | sort
```

预期：确认当前 `origin/` 下已有原始材料文件，适合新增 README 作为入口说明。

- [ ] **步骤 2：创建 `docs/origin/README.md`**

写入以下内容：

```md
# 原始材料文档

本目录用于归档项目相关的原始材料，作为后续整理与追溯依据。

## 放什么

- 原始需求文档
- 会议整理稿
- 表格
- PPT
- PDF
- 过程草稿
- 尚未结构化整理的补充材料

## 不放什么

- 不放已经整理完成的项目事实文档
- 不放直接用于网站展示的提炼文案

## 使用规则

- 本目录以归档为主，不承担对外表达职责。
- 后续整理项目时，先从本目录中提取材料，再整理到 `docs/project/`。
- 网站内容不直接从本目录提取，而应优先引用整理后的文档。
```

- [ ] **步骤 3：验证 README 已创建**

运行：

```bash
ls "/Users/wen/Desktop/myfisrt project/portfolio website/docs/origin/README.md"
```

预期：输出该文件路径，无报错。

- [ ] **步骤 4：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/origin/README.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(origin): add archive rules"
```

---

### 任务 2：统一 `docs/project/` 入口并迁移案例文件

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md`
- 迁移：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases/会员自动化.md`
- 创建目标：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/会员自动化.md`

- [ ] **步骤 1：读取现有 `project/README.md` 和案例文件**

运行：

```bash
sed -n '1,160p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md"
sed -n '1,220p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases/会员自动化.md"
```

预期：确认现有 README 偏简略，`会员自动化.md` 已具备可迁移内容。

- [ ] **步骤 2：更新 `docs/project/README.md`**

将内容调整为：

```md
# 项目事实文档

本目录用于沉淀已经整理完成的项目事实文档，是整理后项目内容的唯一入口。

## 目录职责

- 存放经过整理的项目事实文档。
- 用于面试复盘、整理思路与后续网站内容提炼。
- 作为 `docs/origin/` 与 `docs/site/` 之间的中间层。

## 文档规则

- 每个项目只保留一份主文档。
- 文档统一采用“事实整理版”口径。
- 优先写清：项目背景、核心问题、项目目标、我的角色、关键动作、项目结果、原始依据。
- 不直接追求网页展示表达，而是先把事实和判断整理清楚。

## 使用建议

- 新项目先归档到 `docs/origin/`。
- 整理完成后写入 `docs/project/`。
- 网站展示内容再从本目录提炼到 `docs/site/`。
```

- [ ] **步骤 3：迁移 `会员自动化.md` 到 `docs/project/`**

运行：

```bash
mv "/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases/会员自动化.md" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/会员自动化.md"
```

预期：`docs/project/会员自动化.md` 存在，原路径不再保留该文件。

- [ ] **步骤 4：检查 `project/` 目录内容**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs/project" -maxdepth 1 -type f | sort
```

预期输出至少包含：

```text
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/会员自动化.md
/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/正畸筛查与状态管理.md
```

- [ ] **步骤 5：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/project/README.md" "docs/project/会员自动化.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" rm --cached --ignore-unmatch "docs/cases/会员自动化.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(project): unify project document entry"
```

---

### 任务 3：更新 `docs/site/` 规则与来源说明

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md`
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md`

- [ ] **步骤 1：读取现有 `site/README.md` 与 `content-map.md`**

运行：

```bash
sed -n '1,200p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md"
sed -n '1,220p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md"
```

预期：确认当前 `site` 已承担站点说明职责，但需要更明确与 `origin/project` 的边界。

- [ ] **步骤 2：更新 `docs/site/README.md`**

将内容更新为：

```md
# 站点说明文档

本目录用于说明当前作品集网站的结构、页面映射与内容提炼规则。

## 站点定位

这是一个用于求职展示的个人网站。

## 目录职责

- 承担网站层面的结构说明、页面映射与表达边界定义。
- 内容来源优先是 `docs/project/` 与 `docs/profile/`。
- 不直接承担原始事实归档职责。

## 使用建议

- 需要了解网站结构时，先看 `structure.md`。
- 需要补充页面内容时，优先从 `docs/project/` 与 `docs/profile/` 提炼。
- 不直接从 `docs/origin/` 抽取网页文案。
```

- [ ] **步骤 3：更新 `docs/site/content-map.md` 的来源说明**

至少保证以下两点：

```md
## Portfolio

- 来源：`docs/project/`，必要时回看 `docs/origin/` 作为补充依据
```

以及在“使用建议”中包含：

```md
- 页面文案编写优先引用正式整理文档，不直接从原始材料复制。
- 当前网站内容整理遵循：`先整理事实 -> 再提炼能力和方法 -> 最后生成网站表达`。
```

- [ ] **步骤 4：检查关键规则是否存在**

运行：

```bash
grep -n "docs/project/\|docs/origin/\|先整理事实" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md"
```

预期：两个文件都能匹配到新规则。

- [ ] **步骤 5：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/site/README.md" "docs/site/content-map.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(site): clarify extraction rules"
```

---

### 任务 4：清理 `docs/cases/` 并验证三层结构

**文件：**
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/origin/README.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/superpowers/specs/2026-07-01-docs-three-layer-structure-design.md`

- [ ] **步骤 1：检查 `docs/cases/` 是否为空**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases" -maxdepth 1 -type f
```

预期：无输出，表示目录内文件已迁移完毕。

- [ ] **步骤 2：删除空目录 `docs/cases/`**

运行：

```bash
rmdir "/Users/wen/Desktop/myfisrt project/portfolio website/docs/cases"
```

预期：目录删除成功；若非空则应停止并检查残留文件。

- [ ] **步骤 3：检查三层 README 是否齐备**

运行：

```bash
ls \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/origin/README.md" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/project/README.md" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md"
```

预期：3 个 README 路径都被输出。

- [ ] **步骤 4：查看最终目录树**

运行：

```bash
find "/Users/wen/Desktop/myfisrt project/portfolio website/docs" -maxdepth 2 -type f | sort
```

预期：包含 `origin/README.md`、`project/README.md`、`project/会员自动化.md`、`project/正畸筛查与状态管理.md`、`site/README.md` 以及既有 `profile/` 和 `superpowers/` 文件。

- [ ] **步骤 5：Commit 规格与计划文档**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add \
  "docs/superpowers/specs/2026-07-01-docs-three-layer-structure-design.md" \
  "docs/superpowers/plans/2026-07-01-docs-three-layer-structure.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(superpowers): add docs structure plan"
```
