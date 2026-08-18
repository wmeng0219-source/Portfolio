# 三个项目卡片系统蓝图封面实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 以原生 SVG 为首页三个项目卡片制作统一的二维系统蓝图封面。

**架构：** 新增一个纯展示型 `ProjectBlueprintCover` 组件，使用 `kind` 分派会员规则引擎、正畸状态漏斗、PACS 人机闭环三种 SVG 图。首页负责提供语义和替代文本，`global.css` 负责共享尺寸、色彩、轻量悬停反馈与减弱动效。

**技术栈：** React 18、原生 SVG、CSS、Vitest、Testing Library。

---

### 任务 1：建立封面行为测试

**文件：**
- 修改：`src/components/Portfolio/index.test.jsx`

- [x] **步骤 1：编写失败的测试**

```jsx
expect(within(section).getByLabelText('会员自动化规则引擎')).toBeInTheDocument();
expect(within(section).getByText('RULE_ENGINE')).toBeInTheDocument();
expect(within(section).getByText('RE-ENTRY ENABLED')).toBeInTheDocument();
expect(within(section).getByText('DOCTOR_VERIFIED')).toBeInTheDocument();
```

- [x] **步骤 2：运行测试验证失败**

运行：`npm test -- src/components/Portfolio/index.test.jsx --reporter=verbose`

预期：FAIL，缺少新的封面替代文本和系统标签。

### 任务 2：实现 SVG 封面组件

**文件：**
- 创建：`src/components/ProjectBlueprintCover/index.jsx`

- [x] **步骤 1：创建组件**

```jsx
export default function ProjectBlueprintCover({ kind, label }) {
  return <svg aria-label={label} role="img" viewBox="0 0 640 360" />;
}
```

- [x] **步骤 2：添加三个固定构图**

会员包含四个输入、规则矩阵、三条输出和异常虚线路径；正畸包含五段状态轴与回流路径；PACS 包含影像、AI、医生确认、病历同步和反馈回路。

### 任务 3：首页接入与视觉样式

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`

- [x] **步骤 1：替换远程图片和旧内联 SVG**

```jsx
<ProjectBlueprintCover kind="member" label="会员自动化规则引擎" />
```

- [x] **步骤 2：添加共享封面样式**

```css
.project-blueprint-cover { aspect-ratio: 16 / 9; }
.portfolio-showcase-card:hover .project-blueprint-cover__active { opacity: 1; }
```

- [x] **步骤 3：添加减弱动效支持**

```css
@media (prefers-reduced-motion: reduce) {
  .project-blueprint-cover__signal { animation: none; }
}
```

### 任务 4：验证

**文件：**
- 验证：`src/components/Portfolio/index.test.jsx`
- 验证：`src/App.test.jsx`

- [x] **步骤 1：运行封面测试**

运行：`npm test -- src/components/Portfolio/index.test.jsx --reporter=verbose`

预期：PASS。

- [x] **步骤 2：运行完整验证**

运行：`npm test -- --reporter=verbose && npm run build && git diff --check`

预期：全部测试通过、构建退出码为 0、无 diff 格式错误。
