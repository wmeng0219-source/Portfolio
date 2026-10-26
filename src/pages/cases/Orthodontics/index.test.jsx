import { readFileSync } from "node:fs";
import {
  publicParagraphs,
  normalizeManuscriptText,
} from "../../../test/manuscript";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../../context/LanguageContext";
import Orthodontics from "./index";

function mount(language = "zh", entry = "/project/orthodontics") {
  localStorage.setItem("language", language);
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <LanguageProvider>
        <Orthodontics />
      </LanguageProvider>
    </MemoryRouter>,
  );
}

test("the overview is the first of six reading chapters and its link focuses the new title", async () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    const user = userEvent.setup();
    const { container } = mount("zh", "/project/orthodontics#overview");
    const main = within(container.querySelector("main"));
    const headings = main.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(6);
    expect(headings[0]).toHaveTextContent("项目概览");
    expect(headings[0]).toHaveAttribute("id", "overview-title");
    expect(headings[0]).toHaveFocus();
    expect(
      main.getByRole("heading", { name: "我的职责与协作" }),
    ).toHaveProperty("tagName", "H3");
    const link = screen.getByRole("link", { name: /01.*项目概览/ });
    await user.click(link);
    expect(headings[0]).toHaveFocus();
    expect(link).toHaveAttribute("aria-current", "location");
    expect(container.querySelector("#case-cover")).toHaveAttribute(
      "aria-labelledby",
      "case-title",
    );
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test("the earlier introduction deep link still reaches the overview chapter", () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    mount("zh", "/project/orthodontics#case-introduction");
    expect(document.getElementById("overview-title")).toHaveFocus();
    expect(screen.getByRole("link", { name: /01.*项目概览/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test.each(["zh", "en"])(
  "renders the complete six-chapter %s manuscript without the retired cumulative funnel",
  (language) => {
    const { container } = mount(language);
    const manuscript = readFileSync(
      "docs/pages/orthodontics/content.md",
      "utf8",
    );
    const paragraphs = publicParagraphs(manuscript, language);
    paragraphs.forEach((paragraph) =>
      expect(normalizeManuscriptText(container.textContent)).toContain(
        normalizeManuscriptText(paragraph),
      ),
    );
    expect(
      within(
        screen.getByRole("navigation", {
          name: language === "zh" ? "章节目录" : "Contents",
        }),
      ).getAllByRole("link"),
    ).toHaveLength(6);
    expect(container).not.toHaveTextContent(
      /54,990|53\.75%|55\.38%|建档|素材准备中/,
    );
    expect(
      container.querySelector('[data-evidence="cumulative"]'),
    ).toHaveTextContent("18,460");
    const periodComparison = container.querySelector(
      '[data-evidence="period-comparison"]',
    );
    expect(periodComparison).not.toBeNull();
    expect(periodComparison).toHaveTextContent(
      language === "zh"
        ? "判定需矫后产生矫正收费"
        : "subsequently incurred an orthodontic charge",
    );
    expect(periodComparison).not.toHaveTextContent(
      language === "zh" ? "不能全部归因" : "attributed entirely",
    );
  },
);

test("keeps explanatory comparisons and evidence, with no simulated workbench or empty role matrix", () => {
  const { container } = mount();
  expect(screen.queryAllByRole("tab")).toHaveLength(0);
  expect(screen.getAllByRole("figure")).toHaveLength(6);
  expect(
    screen.queryByRole("figure", { name: "筛查入口的过渡" }),
  ).not.toBeInTheDocument();
  const flow = screen.getByRole("figure", { name: "角色协作示意" });
  ["护士", "儿牙医生", "正畸医生"].forEach((role) =>
    expect(flow).toHaveTextContent(role),
  );
  expect(flow).toHaveTextContent("不表示每个病例必须固定顺序一次完成");
  expect(container.querySelector("[role='tabpanel']")).not.toBeInTheDocument();
  const record = flow.querySelector('[data-meaning="shared-record"]');
  expect(record).toHaveTextContent("初步筛查填写");
  expect(record).not.toHaveTextContent("家长沟通");
  const communication = flow.querySelector(
    '[data-meaning="family-communication"]',
  );
  expect(communication).toHaveTextContent("诊间");
  expect(communication).toHaveTextContent("离店后");
  expect(communication).toHaveTextContent("报告");
  const scope = screen.getByRole("figure", {
    name: "推荐候选与执行任务的区别",
  });
  expect(
    scope.querySelector('[data-meaning="candidate-pool"]'),
  ).toHaveTextContent("推荐候选");
  expect(
    scope.querySelector('[data-meaning="execution-tasks"]'),
  ).toHaveTextContent("筛查任务");
  expect(scope).toHaveTextContent("原有预约中添加筛查项目");
  expect(scope).toHaveTextContent("医生主动补充");
  expect(scope).toHaveTextContent("不是删除推荐后自动补齐固定数量");
  const comparison = screen.getByRole("figure", { name: "筛查机制旧新对照" });
  expect(comparison.closest("section")).toHaveAttribute("id", "problem");
  expect(comparison).toHaveTextContent("快筛已有结果与看板");
  expect(within(comparison).getAllByRole("row")).toHaveLength(4);
  const tracking = screen.getByRole("figure", { name: "业务节点与追踪依据" });
  expect(tracking).toHaveTextContent("不代表人数或每位患者必经的固定顺序");
  expect(tracking).toHaveTextContent(
    "筛查时资料采集与后续按收费识别的资料节点口径不同",
  );
  const evidence = screen.getByRole("figure", { name: "实际使用与上线范围" });
  expect(evidence).toHaveTextContent("18,460");
  expect(evidence).toHaveTextContent("不是去重患者数");
  expect(evidence).toHaveTextContent("不等于每家门店的采纳率");
});

test("contents supports repeated navigation, deep links and reduced motion", async () => {
  const scroll = vi.fn();
  const previous = Element.prototype.scrollIntoView;
  const media = vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("prefers-reduced-motion"),
    addEventListener() {},
    removeEventListener() {},
  }));
  Element.prototype.scrollIntoView = scroll;
  try {
    const user = userEvent.setup();
    mount("zh", "/project/orthodontics#solution");
    expect(document.getElementById("solution-title")).toHaveFocus();
    const link = screen.getByRole("link", { name: /04.*整体方案/ });
    await user.click(link);
    scroll.mockClear();
    await user.click(link);
    expect(scroll).toHaveBeenCalledWith({
      behavior: "instant",
      block: "start",
    });
    expect(document.getElementById("solution-title")).toHaveFocus();
    expect(link).toHaveAttribute("aria-current", "location");
    await user.click(screen.getByRole("button", { name: "Switch to English" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Occlusal Screening",
    );
    expect(
      screen.getByRole("navigation", { name: "Contents" }),
    ).toBeInTheDocument();
  } finally {
    Element.prototype.scrollIntoView = previous;
    media.mockRestore();
  }
});

test("mobile contents closes after selection and Escape restores its trigger", async () => {
  const media = vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("max-width: 860px"),
    addEventListener() {},
    removeEventListener() {},
  }));
  const scroll = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    const user = userEvent.setup();
    mount();
    const trigger = screen.getByRole("button", { name: /章节目录/ });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await user.click(screen.getByRole("link", { name: /06.*反思/ }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("reflection-title")).toHaveFocus();
  } finally {
    media.mockRestore();
    Element.prototype.scrollIntoView = scroll;
  }
});

test("contents observes chapter intersections and releases observers when leaving", () => {
  const observers = [];
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.targets = [];
      this.disconnect = vi.fn();
      observers.push(this);
    }
    observe(target) {
      this.targets.push(target);
    }
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  try {
    const { unmount } = mount();
    const chapters = observers.find((o) =>
      o.targets.some((t) => t.id === "solution"),
    );
    expect(chapters).toBeDefined();
    act(() =>
      chapters.callback([
        { target: document.getElementById("solution"), isIntersecting: true },
      ]),
    );
    expect(screen.getByRole("link", { name: /04.*整体方案/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    const end = observers.find((o) =>
      o.targets.some((t) => t.id === "reader-end"),
    );
    act(() => end.callback([{ isIntersecting: true }]));
    expect(screen.getByRole("link", { name: /06.*反思/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    act(() => end.callback([{ isIntersecting: false }]));
    expect(screen.getByRole("link", { name: /04.*整体方案/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    const intro = chapters.targets.find((t) => t.id === "overview");
    expect(intro).toBeDefined();
    act(() => chapters.callback([{ target: intro, isIntersecting: true }]));
    expect(screen.getByRole("link", { name: /01.*项目概览/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    unmount();
    expect(observers.every((o) => o.disconnect.mock.calls.length > 0)).toBe(
      true,
    );
  } finally {
    vi.unstubAllGlobals();
  }
});

test("observer rebuild and non-intersecting entries identify the chapter preceding a gap", () => {
  const observers = [];
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.targets = [];
      observers.push(this);
    }
    observe(target) {
      this.targets.push(target);
    }
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  const tops = {
    overview: -2400,
    problem: -1800,
    thinking: -100,
    solution: 152,
    impact: 1200,
    reflection: 2000,
  };
  const rect = vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(function () {
      return { top: tops[this.id] ?? 800 };
    });
  try {
    mount();
    const current = () => screen.getByRole("link", { name: /03.*我的判断/ });
    expect(current()).toHaveAttribute("aria-current", "location");
    const cursor = observers.find((o) =>
      o.targets.some((t) => t.id === "solution"),
    );
    act(() =>
      cursor.callback([
        { target: document.getElementById("thinking"), isIntersecting: false },
      ]),
    );
    expect(current()).toHaveAttribute("aria-current", "location");
    act(() => window.dispatchEvent(new Event("resize")));
    expect(current()).toHaveAttribute("aria-current", "location");
  } finally {
    rect.mockRestore();
    vi.unstubAllGlobals();
  }
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../../config/features", () => ({ ENGLISH_ENABLED: true }));
