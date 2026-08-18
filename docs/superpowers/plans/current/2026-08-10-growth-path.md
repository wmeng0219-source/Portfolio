# 首页成长路径实现计划

> **面向 AI 代理的工作者：** 按 TDD 顺序执行下列步骤并在完成前运行完整验证。

**目标：** 将匿名履历式 Experience 模块改为无公司、无年份的四阶段角色成长路径。

**架构：** 保留现有 `Experience` 组件和 `#experience` 锚点以控制改动范围，重塑其语义结构与 CSS。双语内容继续由 locale 文件提供，首页集成测试负责约束用户可见内容和关键结构。

**技术栈：** React、CSS、Vitest、Testing Library

---

### 任务 1：首页成长路径行为

**文件：**
- 修改：`src/App.test.jsx`
- 修改：`src/components/Navbar/index.test.jsx`
- 修改：`src/components/Experience/index.jsx`
- 修改：`src/locales/zh.json`
- 修改：`src/locales/en.json`

- [x] 修改测试，断言成长路径标题、四个角色、连续路径结构及年份消失。
- [x] 运行相关测试，确认旧实现无法满足新断言。
- [x] 更新组件和双语文案，以最小改动满足测试。
- [x] 运行相关测试，确认新行为通过。

### 任务 2：路径视觉与响应式布局

**文件：**
- 修改：`src/styles/global.css`

- [x] 将旧时间线样式替换为连续成长轨道、节点和当前阶段强调。
- [x] 为 900px 以下视口定义单栏收敛规则。
- [x] 运行完整测试与生产构建，检查测试失败、编译错误和警告。
