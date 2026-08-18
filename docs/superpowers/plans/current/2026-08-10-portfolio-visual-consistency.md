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

- [x] 将背景、表面、边框和强调色对齐 `DESIGN.md` v3（2026-08-15：`variables.css` 已落地 v3 色板 `#0d0c11 / #16151c / #1f1d26 / #d0bcff / #b9f2c8 / #ffd8e4`；同日 `AGENTS.md` 同步为 v3 色板，旧 `#0B0F14 / #141922 / #1C2330 / #C8B6FF / #B8E6D0` 描述作废）
- [x] 将字体变量对齐 `DESIGN.md` 的 Anton / Hanken Grotesk / Merriweather / IBM Plex Mono，并同步更新测试中锁定的旧字体断言。（2026-08-14 由参考站改版计划完成：`--font-display: 'Anton'`、`--font-body: 'Hanken Grotesk'`、`--font-serif: 'Merriweather'`，测试断言已更新）
- [x] 建立案例 H1/H2/H3、正文、标签和数据的 `clamp()` 字号变量。
- [x] 统一 1280px 容器、页面留白、区块留白和 16px 卡片。（2026-08-14：`--content-max` 按 v3 调整为 1320px）
- [x] 控件和内部媒体圆角按 `DESIGN.md` v3 标准统一（2026-08-15 核对：`--radius-sm: 4px`、`--radius-md: 12px`、`--radius-lg: 16px`、`--radius-control: 12px`、`--radius-card: 16px`、`--radius-folder: 24px`、`--radius-pill: 9999px`）

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
- [x] 控件和内部媒体圆角按 `DESIGN.md` v3 标准统一（2026-08-15 核对：`--radius-control: 12px`、`--radius-card: 16px`、`--radius-folder: 24px`）。
- [x] 统一 Hover 为 `translateY(-2px)` 和薰衣草紫边框/辉光。
- [x] 将正畸页容器从 1000px 调整为 1280px，并校正时间线响应式。

### 任务 5：验证与交付

**文件：**
- 验证：`src/App.test.jsx`
- 验证：`src/components/Portfolio/index.test.jsx`
- 验证：`src/pages/ProjectDetail/index.test.jsx`

- [x] 运行定向测试并确认设计契约通过。（2026-08-12：全量 22/22 通过）
- [x] 运行完整测试、生产构建和 `git diff --check`。（2026-08-12：测试、build、diff check 均通过）
- [x] 在 1440×900、1024×768、390×844 检查四个页面的溢出与控制台错误。（2026-08-15：通过 `scripts/viewport-check.mjs`（CDP + headless Chrome）验证 12 组合全部无横向溢出、无 console 错误；修复了缺失 favicon 导致的 404；正畸时间线为设计内的横向滚动容器，非溢出）
- [x] 检查待提交文件无凭据；提交所有安全的本地改动并推送 `origin/main`。（实现由 `091d791` 提交并推送，后续动效批次 `af7f338` 亦已推送）

## 2026-08-12 核对结果

主体实现已由 `091d791` 落地，并通过现有契约测试；本计划复选框此前未同步更新。剩余真实缺口：

1. ~~`src/styles/variables.css` 色板仍为 `#0d0c11 / #16151c / #1f1d26 / #d0bcff / #b9f2c8`，未对齐 `DESIGN.md` / `AGENTS.md` 的 `#0B0F14 / #141922 / #1C2330 / #C8B6FF / #B8E6D0`~~ → **已解决**：8-14 参考站改版将 `DESIGN.md` 升级为 v3，v3 色板即 `#0d0c11 / #16151c / #1f1d26 / #d0bcff / #b9f2c8`（新增 `#ffd8e4`）；2026-08-15 `AGENTS.md` 已同步 v3 色板，旧 `#0B0F14` 系描述作废。
2. ~~字体变量仍为 `Neudron / GT America`，未对齐 `DESIGN.md` 的 `Anton / Inter / IBM Plex Mono`~~ → **已解决**：8-14 已落地 `Anton / Hanken Grotesk / Merriweather / IBM Plex Mono` 并更新测试断言。
3. ~~圆角体系：`--radius-sm / --radius-md / --radius-control` 目前为 10px~~ → **已解决**：`variables.css` 已按 v3 统一为 4px / 12px / 16px / 24px / 9999px。
4. `src/components/Portfolio/index.jsx` 仍残留少量散乱工具类（如 `rounded-[12px]`、`rounded-[8px]`、`text-xl md:text-2xl`、`text-[11px]`），主要卡片已语义化但未完全清理。→ **已解决**：2026-08-15 新增 `.portfolio-showcase-card-tag`（含 `--mint` 变体、`__dot`、`__short`）与 `.portfolio-showcase-card-metric` 语义类，替换全部 `text-[11px]` / `flex flex-col` / 颜色工具类，并移除无配套的 `group` 残留类。
5. 三档视口（1440×900 / 1024×768 / 390×844）的溢出与控制台错误检查尚未完成，需要浏览器验证。→ **已完成**：2026-08-15 通过 headless Chrome + CDP 脚本验证 12 组合全部通过。

已完成并确认：

- 全量测试 22/22 通过；生产构建成功；`git diff --check` 干净。
- 三个案例页已消费 `--content-max`、`--text-case-*`、`--radius-card`，并统一 `translateY(-2px)` hover。
- 正畸页容器已从 1000px 改为 `var(--content-max)`（1280px）。
