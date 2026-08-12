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
- [x] 运行定向测试，确认因旧样式不一致而失败。（2026-08-12 核对：历史红态无法复现，当前契约测试已通过）

### 任务 2：统一全局设计变量

**文件：**
- 修改：`src/styles/variables.css`
- 修改：`src/styles/global.css`

- [ ] 将背景、表面、边框和强调色对齐 `AGENTS.md`。（未完成：`variables.css` 仍为旧色板）
- [ ] 将字体变量对齐 `DESIGN.md` 的 Anton / Inter / IBM Plex Mono，并同步更新测试中锁定的旧字体断言。
- [x] 建立案例 H1/H2/H3、正文、标签和数据的 `clamp()` 字号变量。
- [x] 统一 1280px 容器、页面留白、区块留白和 16px 卡片。
- [ ] 控件和内部媒体圆角按 `DESIGN.md` 标准统一（原计划中的 10px 与 4px / 12px / 16px 体系冲突）。

### 任务 3：首页案例区语义化

**文件：**
- 修改：`src/components/Portfolio/index.jsx`
- 修改：`src/styles/global.css`

- [x] 用语义类替换影响一致性的散乱字号、圆角和 Hover 工具类。（主要卡片已语义化，仍残留少量工具类，见核对结果）
- [x] 保持现有主卡 + 双辅助卡结构、链接、内容和无障碍文本。

### 任务 4：统一三个案例页

**文件：**
- 修改：`src/pages/cases/MemberAutomation/MemberAutomation.module.css`
- 修改：`src/pages/cases/PacsAi/PacsAi.module.css`
- 修改：`src/pages/cases/Orthodontics/Orthodontics.module.css`

- [x] 让 Hero、Section、导航、标题、正文和标签使用共同变量。
- [x] 统一所有内容卡为 16px。
- [ ] 控件和内部媒体圆角按 `DESIGN.md` 标准统一（原计划中的 10px 与 4px / 12px / 16px 体系冲突）。
- [x] 统一 Hover 为 `translateY(-2px)` 和薰衣草紫边框/辉光。
- [x] 将正畸页容器从 1000px 调整为 1280px，并校正时间线响应式。

### 任务 5：验证与交付

**文件：**
- 验证：`src/App.test.jsx`
- 验证：`src/components/Portfolio/index.test.jsx`
- 验证：`src/pages/ProjectDetail/index.test.jsx`

- [x] 运行定向测试并确认设计契约通过。（2026-08-12：全量 22/22 通过）
- [x] 运行完整测试、生产构建和 `git diff --check`。（2026-08-12：测试、build、diff check 均通过）
- [ ] 在 1440×900、1024×768、390×844 检查四个页面的溢出与控制台错误。
- [x] 检查待提交文件无凭据；提交所有安全的本地改动并推送 `origin/main`。（实现由 `091d791` 提交并推送，后续动效批次 `af7f338` 亦已推送）

## 2026-08-12 核对结果

主体实现已由 `091d791` 落地，并通过现有契约测试；本计划复选框此前未同步更新。剩余真实缺口：

1. `src/styles/variables.css` 色板仍为 `#0d0c11 / #16151c / #1f1d26 / #d0bcff / #b9f2c8`，未对齐 `DESIGN.md` / `AGENTS.md` 的 `#0B0F14 / #141922 / #1C2330 / #C8B6FF / #B8E6D0`。
2. 字体变量仍为 `Neudron / GT America`，未对齐 `DESIGN.md` 的 `Anton / Inter / IBM Plex Mono`；`src/pages/ProjectDetail/index.test.jsx` 的设计契约断言也固化了旧字体，需同步更新。
3. 圆角体系：`--radius-sm / --radius-md / --radius-control` 目前为 10px，与 `DESIGN.md` 的 4px / 12px / 16px / 9999px 冲突；计划文本中的“10px 控件”也应按规范修正。
4. `src/components/Portfolio/index.jsx` 仍残留少量散乱工具类（如 `rounded-[12px]`、`rounded-[8px]`、`text-xl md:text-2xl`、`text-[11px]`），主要卡片已语义化但未完全清理。
5. 三档视口（1440×900 / 1024×768 / 390×844）的溢出与控制台错误检查尚未完成，需要浏览器验证。

已完成并确认：

- 全量测试 22/22 通过；生产构建成功；`git diff --check` 干净。
- 三个案例页已消费 `--content-max`、`--text-case-*`、`--radius-card`，并统一 `translateY(-2px)` hover。
- 正畸页容器已从 1000px 改为 `var(--content-max)`（1280px）。
