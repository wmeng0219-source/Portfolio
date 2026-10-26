import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import ProjectDetail from "./index";
import {
  publicParagraphs,
  normalizeManuscriptText,
} from "../../test/manuscript";

vi.mock("gsap", () => ({
  default: {
    context: (callback) => {
      callback();
      return { revert() {} };
    },
    fromTo: vi.fn(),
    set: vi.fn(),
  },
}));

const renderProjectDetail = (initialEntry) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );

test("orthodontics keeps clinical responsibilities visible in one shared record", () => {
  renderProjectDetail("/project/orthodontics");
  const flow = screen.getByRole("figure", { name: "角色协作示意" });
  ["护士", "儿牙医生", "正畸医生"].forEach((role) =>
    expect(flow).toHaveTextContent(role),
  );
  expect(flow).toHaveTextContent("资料采集");
  expect(flow).toHaveTextContent("专业判断与结论填写");
  expect(flow).toHaveTextContent("门店与业务团队");
});

test("pacs distinguishes rule diagrams from pending screenshots without loading legacy images", () => {
  const { container } = renderProjectDetail("/project/pacs-ai");

  const visualSlots = [...container.querySelectorAll("[data-visual-slot]")];
  const uniqueSlotIds = new Set(
    visualSlots.map((slot) => slot.dataset.visualSlot),
  );
  const legacyScreenshots = [...container.querySelectorAll("img")].filter(
    (image) => image.getAttribute("src")?.includes("/images/pacs/screen-"),
  );

  const coreSlotIds = [
    "workspace",
    "record-sync",
    "manual-reading",
    "ai-linked-focus",
    "doctor-review",
    "timeout-fallback",
  ];

  expect(coreSlotIds.every((slotId) => uniqueSlotIds.has(slotId))).toBe(true);
  expect(uniqueSlotIds).toContain("image-classification");
  expect(
    screen.getAllByRole("img", { name: /完整读片工作台/ }).length,
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByRole("group", { name: /医生三种复核结果/ }).length,
  ).toBeGreaterThan(0);
  expect(screen.getAllByText("素材准备中")).toHaveLength(3);
  expect(legacyScreenshots).toHaveLength(0);
});

test("pacs detail presents the complete reading project instead of a V1 V2 feature story", () => {
  renderProjectDetail("/project/pacs-ai");

  expect(
    screen.getByRole("heading", { level: 1, name: "PACS 读片与 AI 辅助" }),
  ).toBeInTheDocument();
  const headings = [
    "我的职责与协作",
    "问题",
    "我的判断",
    "方案",
    "关键流程与系统机制",
    "结果",
    "反思",
  ];
  expect(
    screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent),
  ).toEqual(headings);
  const navigation = screen.getByRole("navigation", { name: "章节目录" });
  const links = [...navigation.querySelectorAll("a")];
  expect(links).toHaveLength(7);
  links.forEach((link) =>
    expect(
      document.getElementById(link.getAttribute("href").split("#").at(-1)),
    ).toBeInTheDocument(),
  );
  expect(screen.queryByText("迭代路径")).not.toBeInTheDocument();
  expect(screen.queryByText(/V1 主导/)).not.toBeInTheDocument();
  expect(screen.queryByText(/V2 全权负责/)).not.toBeInTheDocument();
  expect(screen.queryByText(/数据飞轮/)).not.toBeInTheDocument();
  expect(screen.queryByText(/平均发现数提升 \+142%/)).not.toBeInTheDocument();
});

test("global typography defines distinct display, body, serif, and mono roles", () => {
  const variables = readFileSync("src/styles/variables.css", "utf8");
  for (const role of ["display", "body", "serif", "mono"]) {
    expect(variables).toMatch(new RegExp(`--font-${role}:\\s*[^;]+;`));
  }
});

test("orthodontics presents the verified rollout, ownership, iteration decision, and comparison scope", () => {
  renderProjectDetail("/project/orthodontics");

  expect(screen.getByText(/2025\.04 - 2026\.02/)).toBeInTheDocument();
  expect(
    screen.getByText(/按上述试点路径，方案于 2026 年 2 月在全部门店上线/),
  ).toBeInTheDocument();
  expect(screen.getAllByText(/全部门店/).length).toBeGreaterThan(0);
  expect(
    screen.getByText(/我负责门诊调研、业务流程与协作规则梳理/),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "区分推荐与执行任务，让工作安排更清晰",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("2025 年 2—4 月")).toBeInTheDocument();
  expect(screen.getByText("2026 年 2—4 月")).toBeInTheDocument();
  expect(screen.queryByText("54,990")).not.toBeInTheDocument();
  expect(
    screen.getByText(/按上述试点路径，方案于 2026 年 2 月在全部门店上线/),
  ).toHaveTextContent("18,460");
  expect(screen.queryByText(/独立完成门诊调研/)).not.toBeInTheDocument();
});

test("member automation states the final upgrade rule and distinguishes measured from estimated outcomes", () => {
  renderProjectDetail("/project/member-automation");

  expect(screen.getByText(/系统判断升级还是续卡/)).toBeInTheDocument();
  expect(screen.getAllByText(/门店现场实测/).length).toBeGreaterThan(0);
  expect(screen.getByText(/财务团队估算，未做精细统计/)).toBeInTheDocument();
  expect(screen.getAllByText(/保留原卡与原权益/).length).toBeGreaterThan(0);
});

test("pacs distinguishes the dynamic completion target from measured scale and unverified outcomes", () => {
  renderProjectDetail("/project/pacs-ai");

  expect(screen.getByText("60%")).toBeInTheDocument();
  expect(
    screen.getByText(/是在上线后形成、随实际情况调整的目标，不是已达到的结果/),
  ).toBeInTheDocument();
  expect(screen.getByText("147,793 张")).toBeInTheDocument();
  expect(screen.getByText("约 96.3%")).toBeInTheDocument();
  expect(screen.getByText("3,736 条")).toBeInTheDocument();
  expect(
    screen.getByText(/不说明诊断准确率或实际读片完成率/),
  ).toBeInTheDocument();
  expect(screen.queryByText(/1.43/)).not.toBeInTheDocument();
  expect(screen.queryByText(/提升医学检出率/)).not.toBeInTheDocument();
  expect(screen.queryByText(/成功消除医生的抵触情绪/)).not.toBeInTheDocument();
});

test("pacs explains checklist synchronization and preserves the post-launch doctor feedback", () => {
  renderProjectDetail("/project/pacs-ai");
  expect(
    screen.getByText(/护士拍片后上传影像并关联本次预约/),
  ).toBeInTheDocument();
  expect(screen.getByText(/但它不直接触发病历同步/)).toBeInTheDocument();
  expect(screen.getByText(/复用只在这三项都未填写时提供/)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "少打字，不等于填写更快" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/但上线后调研中，医生反馈填写路径仍然偏长/),
  ).toBeInTheDocument();
  expect(screen.queryByText(/尚未验证的效果与下一步/)).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 3,
      name: "管理人员知道是否建议拍片，却不知道读片有没有完成",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 3, name: "从影像到病历" }),
  ).toBeInTheDocument();
});

test("pacs contents links keep the case route when navigating between sections", async () => {
  const user = userEvent.setup();
  const scrollIntoView = vi.fn();
  vi.stubGlobal("IntersectionObserver", undefined);
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = scrollIntoView;
  try {
    renderProjectDetail("/project/pacs-ai");
    const link = screen.getByRole("link", { name: /05.*关键流程与系统机制/ });
    expect(link).toHaveAttribute("href", "/project/pacs-ai#system");
    await user.click(link);
    expect(
      screen.getByRole("heading", { level: 1, name: "PACS 读片与 AI 辅助" }),
    ).toBeInTheDocument();
    expect(link).toHaveAttribute("aria-current", "location");
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ block: "start" }),
    );
  } finally {
    Element.prototype.scrollIntoView = previous;
    vi.unstubAllGlobals();
  }
});

test("pacs active contents use a nonempty viewport-height observer band and resize cleanup", () => {
  const observations = [];
  vi.stubGlobal("innerHeight", 600);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback, options) {
        this.observe = vi.fn();
        this.disconnect = vi.fn();
        observations.push({ callback, options, observer: this });
      }
    },
  );
  try {
    const { unmount } = renderProjectDetail("/project/pacs-ai");
    expect(observations[0].options.rootMargin).not.toContain("%");
    const margins = observations[0].options.rootMargin
      .split(" ")
      .map(Number.parseFloat);
    expect(600 + margins[0] + margins[2]).toBeGreaterThan(0);
    expect(observations[0].observer.observe).toHaveBeenCalledTimes(7);
    window.dispatchEvent(new Event("resize"));
    expect(observations[0].observer.disconnect).toHaveBeenCalled();
    expect(observations).toHaveLength(2);
    unmount();
    expect(observations[1].observer.disconnect).toHaveBeenCalled();
  } finally {
    vi.unstubAllGlobals();
  }
});

test("pacs judgment links scroll again when the same target is clicked twice", async () => {
  const user = userEvent.setup();
  const scrollIntoView = vi.fn();
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = scrollIntoView;
  try {
    renderProjectDetail("/project/pacs-ai");
    const link = screen.getByRole("link", { name: "4.1 →" });
    await user.click(link);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    await user.click(link);
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test.each(["zh", "en"])(
  "pacs renders all approved %s paragraphs without editorial notes",
  (language) => {
    window.localStorage.setItem("language", language);
    const { container } = renderProjectDetail("/project/pacs-ai");
    const manuscript = readFileSync("docs/pages/pacs-ai/content.md", "utf8");
    const paragraphs = publicParagraphs(manuscript, language);
    const visible = normalizeManuscriptText(container.textContent);
    expect(
      paragraphs.filter(
        (paragraph) => !visible.includes(normalizeManuscriptText(paragraph)),
      ),
    ).toEqual([]);
    expect(container).not.toHaveTextContent("编辑备注与资料来源");
    expect(container).not.toHaveTextContent("周期待确认");
  },
);

test("pacs switches all seven sections and evidence captions to English", async () => {
  const user = userEvent.setup();
  renderProjectDetail("/project/pacs-ai");
  await user.click(screen.getByRole("button", { name: "Switch to English" }));
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "PACS Reading with AI Assistance",
    }),
  ).toBeInTheDocument();
  expect(
    screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent),
  ).toEqual([
    "My role & collaboration",
    "Problem",
    "Product Thinking",
    "Solution",
    "System",
    "Impact",
    "Reflection",
  ]);
  expect(
    screen.getByRole("navigation", { name: "Contents" }).querySelectorAll("a"),
  ).toHaveLength(7);
  expect(screen.getAllByText("Image pending")).toHaveLength(3);
  expect(
    screen.getByText(/but does not trigger chart synchronization/),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Less typing does not necessarily mean faster documentation",
    }),
  ).toBeInTheDocument();
});

test("pre-visit engine renders panoramic views, tooth quadrant ergonomics and structured task bundles", () => {
  renderProjectDetail("/project/pre-visit-engine");

  expect(screen.getByText(/接诊全流程预习与任务编排引擎/)).toBeInTheDocument();
  expect(screen.getAllByText(/打通孤岛系统/).length).toBeGreaterThan(0);
  expect(screen.getByText(/结构化任务包分层模型/)).toBeInTheDocument();
  expect(screen.getByText(/十字象限牙位选择控件/)).toBeInTheDocument();
  expect(screen.getByText(/复盘反思与未解局限/)).toBeInTheDocument();
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
