# 定位与内容整理原则落地实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将当前已确认的求职定位与内容整理原则补充到 `docs/profile/` 与 `docs/site/`，作为后续整理项目事实与生成网站内容的统一依据。

**架构：** 本次实现只修改现有文档，不新增新的文档层级。通过更新 `docs/profile/README.md`、`docs/profile/overview.md` 和 `docs/site/content-map.md`，分别固定整理原则、求职定位与页面表达边界。相关约束以规格文档为准，不扩写完整页面文案。

**技术栈：** Markdown、现有 `docs/` 文档体系

---

## 文件结构

### 修改文件

- `docs/profile/README.md`：补充当前求职方向与“先事实、再提炼、后表达”的整理原则。
- `docs/profile/overview.md`：补充当前求职定位与内容提炼原则。
- `docs/site/content-map.md`：补充首页表达边界与页面内容提炼顺序。

### 参考文件

- `docs/superpowers/specs/2026-07-01-positioning-and-content-principles-design.md`：本次调整的规格依据。
- `docs/profile/career-timeline.md`：确认 `overview.md` 的定位文案不与现有经历时间线冲突。
- `docs/site/README.md`：确认 `site` 目录职责表述保持一致。

---

### 任务 1：更新 `docs/profile/README.md`

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md`

- [ ] **步骤 1：读取现有文件，确认插入位置**

运行：

```bash
sed -n '1,120p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md"
```

预期：可看到“文件说明”与“维护规则”段落，便于在末尾追加“当前整理原则”。

- [ ] **步骤 2：追加“当前整理原则”段落**

将文件更新为以下内容结构（保留原有内容，并在末尾追加新章节）：

```md
## 当前整理原则

- 当前求职方向为：`产品经理 + 设计复合型岗位`。
- 当前文档整理顺序为：`先整理事实 -> 再提炼能力和方法 -> 最后生成网站表达`。
- `docs/profile/` 当前主要承担两项职责：
  - 沉淀个人背景与定位信息。
  - 为后续网站内容提供经过整理的基础材料。
- 在项目事实尚未整理充分之前，不急于生成包装式个人叙事。
```

- [ ] **步骤 3：检查中文排版与术语一致性**

运行：

```bash
grep -n "产品经理 + 设计复合型岗位\|先整理事实" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md"
```

预期：输出新增段落对应的行，说明关键信息已写入。

- [ ] **步骤 4：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/profile/README.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(profile): add positioning principles"
```

---

### 任务 2：更新 `docs/profile/overview.md`

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/career-timeline.md`

- [ ] **步骤 1：读取现有概览文档与时间线文档**

运行：

```bash
sed -n '1,200p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md"
sed -n '1,200p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/career-timeline.md"
```

预期：确认现有“当前定位”“一句话简介”“核心标签”与经历时间线一致。

- [ ] **步骤 2：在 `overview.md` 中新增“当前求职定位”章节**

在“当前定位”之后补充如下内容：

```md
## 当前求职定位

当前求职方向聚焦于：`产品经理 / 设计复合型人才`。

这一定位的重点不是同时罗列两个身份，而是明确：

- 主身份是产品经理。
- 设计背景是差异化优势，而不是独立的第二身份。
- 当前更希望被招聘方优先感知到的能力，是产品方案设计能力。
```

- [ ] **步骤 3：在 `overview.md` 中新增“当前内容提炼原则”章节**

在文档末尾补充如下内容：

```md
## 当前内容提炼原则

- 当前阶段优先从真实经历与项目事实中整理材料。
- 在事实梳理完成之前，不急于直接生成完整的求职叙事。
- 网站表达将基于整理后的材料提炼，而不是先定义人设再倒推内容。
- 文案风格以专业、克制、清晰为主，避免空泛表达。
```

- [ ] **步骤 4：验证新增内容与现有定位不冲突**

运行：

```bash
grep -n "当前求职定位\|产品经理 / 设计复合型人才\|产品方案设计能力" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md"
```

预期：输出新增章节对应的行，且现有“当前定位”仍保留。

- [ ] **步骤 5：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/profile/overview.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(profile): clarify job positioning"
```

---

### 任务 3：更新 `docs/site/content-map.md`

**文件：**
- 修改：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md`

- [ ] **步骤 1：读取 `content-map.md` 与 `site/README.md`**

运行：

```bash
sed -n '1,200p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md"
sed -n '1,120p' "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/README.md"
```

预期：确认当前 `Hero`、`About`、`Experience`、`Portfolio` 的映射关系和目录职责。

- [ ] **步骤 2：补充 `Hero` 的表达原则**

将 `Hero` 段落更新为包含以下要点：

```md
## Hero

- 来源：`docs/profile/overview.md`
- 使用内容：姓名、职业定位、一句话简介、核心标签
- 当前表达原则：
  - 第一屏先建立通用求职身份：`产品经理 / 设计复合型人才`
  - 行业标签不在第一屏强打，放到后续区块展开
  - 文案风格偏专业、克制、清晰
```

- [ ] **步骤 3：补充全局提炼顺序说明**

在“使用建议”部分追加如下内容：

```md
- 当前网站内容整理遵循：`先整理事实 -> 再提炼能力和方法 -> 最后生成网站表达`。
- 页面文案不直接从模糊定位反推，而优先从 `docs/project/` 与 `docs/profile/` 的整理结果中提炼。
```

- [ ] **步骤 4：检查关键表达是否写入**

运行：

```bash
grep -n "产品经理 / 设计复合型人才\|先整理事实\|行业标签不在第一屏强打" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md"
```

预期：输出新增表达原则对应的行。

- [ ] **步骤 5：Commit**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add "docs/site/content-map.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(site): align content mapping with positioning"
```

---

### 任务 4：执行后验证

**文件：**
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md`
- 检查：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md`
- 参考：`/Users/wen/Desktop/myfisrt project/portfolio website/docs/superpowers/specs/2026-07-01-positioning-and-content-principles-design.md`

- [ ] **步骤 1：对照规格检查 3 个文件是否全部覆盖**

运行：

```bash
grep -n "产品经理 / 设计复合型人才\|产品方案设计能力\|先整理事实" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/README.md" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile/overview.md" \
  "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site/content-map.md"
```

预期：3 个文件均有匹配输出。

- [ ] **步骤 2：检查是否引入占位词或模糊表达**

运行：

```bash
grep -R -n "TODO\|待定\|后续补充" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/profile" "/Users/wen/Desktop/myfisrt project/portfolio website/docs/site"
```

预期：除既有明确上下文外，不应新增占位词。

- [ ] **步骤 3：查看 Git 状态**

运行：

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" status --short
```

预期：仅包含本次文档更新及可能存在的既有无关文件改动。

- [ ] **步骤 4：Commit 计划与规格文档**

```bash
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" add \
  "docs/superpowers/specs/2026-07-01-positioning-and-content-principles-design.md" \
  "docs/superpowers/plans/2026-07-01-positioning-and-content-principles.md"
git -C "/Users/wen/Desktop/myfisrt project/portfolio website" commit -m "docs(superpowers): add positioning update plan"
```
