# 作品集视觉一致性实现计划

> **面向 AI 代理的工作者：** 在当前会话内按 TDD 红—绿—重构顺序执行；步骤使用复选框跟踪。

**目标：** 使用 `DESIGN.md` 规定的设计变量统一首页和三个案例详情页的对齐、字号、间距、圆角、边框、悬停和响应式表现。

**架构：** `src/styles/variables.css` 提供单一视觉变量层，首页通过 `global.css` 的语义类消费，三个案例继续在独立 CSS Module 中消费相同变量。测试读取源码，作为不会被浏览器布局环境影响的设计契约。

**技术栈：** React 18、Vite、CSS Modules、Vitest、Testing Library。

---

### 任务 1：建立设计契约

**文件：**
- 修改：`src/pages/ProjectDetail/index.test.jsx`
- 修改：`src/components/Portfolio/index.test.jsx`

- [x] 编写失败测试，断言统一字体、容器、流式字号、卡片半径和 Hover。
- [ ] 运行定向测试，确认因旧样式不一致而失败。

### 任务 2：统一全局设计变量

**文件：**
- 修改：`src/styles/variables.css`
- 修改：`src/styles/global.css`

- [ ] 将背景、表面、边框和强调色对齐 `AGENTS.md`。
- [ ] 建立案例 H1/H2/H3、正文、标签和数据的 `clamp()` 字号变量。
- [ ] 统一 1280px 容器、页面留白、区块留白、16px 卡片和 10px 控件。

### 任务 3：首页案例区语义化

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`

- [ ] 用语义类替换影响一致性的散乱字号、圆角和 Hover 工具类。
- [ ] 保持现有主卡 + 双辅助卡结构、链接、内容和无障碍文本。

### 任务 4：统一三个案例页

**文件：**
- 修改：`src/pages/cases/MemberAutomation/MemberAutomation.module.css`
- 修改：`src/pages/cases/PacsAi/PacsAi.module.css`
- 修改：`src/pages/cases/Orthodontics/Orthodontics.module.css`

- [ ] 让 Hero、Section、导航、标题、正文和标签使用共同变量。
- [ ] 统一所有内容卡为 16px，所有控件和内部媒体为 10px。
- [ ] 统一 Hover 为 `translateY(-2px)` 和薰衣草紫边框/辉光。
- [ ] 将正畸页容器从 1000px 调整为 1280px，并校正时间线响应式。

### 任务 5：验证与交付

**文件：**
- 验证：`src/App.test.jsx`
- 验证：`src/components/Portfolio/index.test.jsx`
- 验证：`src/pages/ProjectDetail/index.test.jsx`

- [ ] 运行定向测试并确认设计契约通过。
- [ ] 运行完整测试、生产构建和 `git diff --check`。
- [ ] 在 1440×900、1024×768、390×844 检查四个页面的溢出与控制台错误。
- [ ] 检查待提交文件无凭据；提交所有安全的本地改动并推送 `origin/main`。
