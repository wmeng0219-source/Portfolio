# 参考站机制对齐改版：DESIGN.md v3 与首页视觉改造

> 日期：2026-08-14
> 目标：对齐 Harrison Wheeler 参考站的视觉机制，解决"风格奇怪、不高级"问题
> 状态：**已完成**（2026-08-14）

## 背景

用户反馈当前作品集"奇怪、不高级"，并提供参考站 https://www.harrisonwheeler.com/ 作为喜欢的风格。经实时提取参考站 DOM/CSS 与本地像素分析，定位根因：

1. **假字体声明**：`variables.css` 声明 `Neudron` / `GT America`，但从未加载（构建产物 `@font-face` 数量为 0），实际静默 fallback 到 Hanken Grotesk / Inter。
2. **规范与实现分裂**：DESIGN.md（旧色 #0B0F14 / #C8B6FF / Anton）、variables.css（已抄 Harrison 色 #0d0c11 / #d0bcff）、tailwind.config（旧色）三套体系并存。
3. **视觉机制缺失**：参考站的 sticky 案例堆叠、超大渐变标题、衬线叙事层、薄荷绿/浅粉色彩角色均未落地；Hero 被聚光灯/网格/光晕等背景特效淹没，首屏 98% 像素为纯黑。

## 执行内容

### 1. DESIGN.md v3（重写规范）

- 字体体系真实化：Anton（Display，拉丁）+ Hanken Grotesk（正文）+ **Merriweather（衬线叙事层，新增）** + IBM Plex Mono（标签）。
- 色彩角色重定义：Lavender `#d0bcff` 主交互、Mint `#b9f2c8` 大标题渐变与结果、Pink `#ffd8e4` 案例标题渐变。
- 布局机制：Hero 渐变巨标题 + 衬线 lede + 纯净深色背景；Portfolio sticky 黏性堆叠 + 文件夹式描边 + 超大渐变标题。
- 明确禁止：未加载的假字体声明、聚光灯/光晕背景、跨色相渐变。

### 2. Token 统一

- `src/styles/variables.css`：删除假字体声明，加入 `--font-serif`、`--grad-hero-title`、`--grad-case-title`、`--radius-folder`（24px）、`--content-max: 1320px`。
- `tailwind.config.js`：色板、圆角、字体、字号全部对齐 v3。
- `index.html`：加载 Merriweather 300/400。

### 3. 组件改造

- `Hero/index.jsx`：移除聚光灯跟随/网格强线/水印/光晕，改为 Mint→White 渐变 Anton 姓名（scaleY 拉伸）+ Merriweather 衬线 lede + 简化双 CTA。
- `Portfolio/index.jsx`：改为 3 张全宽 sticky 堆叠卡（`portfolio-showcase-card--stack`），交替布局、Pink→White 渐变超大标题（hover 填满）、文件夹式 masked 描边、衬线 meta。
- 全站衬线叙事层：About/Experience/Contact intro、案例页 heroSummary/sectionDesc 改用 Merriweather 300。

### 4. 测试更新

- `ProjectDetail/index.test.jsx`：字体断言从 Neudron/GT America → Anton/Hanken/Merriweather；`--content-max` 1280→1320；`--radius-control` 10→12。
- `Portfolio/index.test.jsx`：卡片契约断言更新为 `--radius-folder` + 渐变标题。

## 验证

- `npm run build`：通过。
- `vitest run`：23/23 通过。
- 像素分析对比（首屏 1440×900）：
  - 旧版：亮度 7%、亮像素 1%、彩色 0% —— 几乎纯黑。
  - V3：亮度 11%（标题区 22%）、亮像素 6%、彩色 1% —— 渐变标题可见。
  - 参考站：亮度 22%、彩色 16%（含人像大图），机制已对齐，色彩浓度留待素材补充。
- `--dump-dom`：hero-display-title / hero-lede / 3× portfolio-showcase-card-title 均正常渲染。

## 待办状态

- [x] 重写 DESIGN.md v3
- [x] 统一 CSS 变量 / tailwind / 字体加载
- [x] Hero 渐变巨标题 + 衬线 lede
- [x] Portfolio sticky 堆叠 + 渐变标题
- [x] 全站衬线叙事层
- [x] 测试更新与通过
- [x] 待办文档同步（本文档）

## 遗留与后续

- **真实产品图素材**：案例卡目前使用 SVG 蓝图封面；参考站的"高级感"部分来自真实产品截图，待 `docs/project/content-readiness.md` 中的界面素材补齐后替换。
- **色彩浓度**：参考站首屏 16% 彩色像素来自人像大图；本作品集无个人肖像，可通过案例封面真实截图补充色彩焦点。
- **案例页衬线层**：仅 heroSummary 已切换；案例正文保持 Hanken 可读性，后续如需强化编辑感可在决策/反思区块的引文使用衬线。
