import { readFileSync } from "node:fs";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../../context/LanguageContext";
import Orthodontics from "./index";

vi.mock("../../../config/features", () => ({ ENGLISH_ENABLED: true }));

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

test("the cover states the project, role and two facts, and the first chapter is the challenge", () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    const { container } = mount("zh", "/project/orthodontics#challenge");
    const headings = within(container.querySelector("main")).getAllByRole(
      "heading",
      { level: 2 },
    );
    expect(headings).toHaveLength(6);
    expect(headings[0]).toHaveTextContent("业务挑战");
    expect(headings[0]).toHaveAttribute("id", "challenge-title");
    expect(headings[0]).toHaveFocus();

    const cover = container.querySelector("#case-cover");
    expect(cover).toHaveTextContent("咬合筛查与正畸协作前期流程");
    expect(cover).toHaveTextContent("2026.02");
    expect(cover).toHaveTextContent("18,460");
    expect(cover).toHaveTextContent("门店调研");
    expect(cover).toHaveAttribute("aria-labelledby", "case-title");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute(
      "id",
      "case-title",
    );

    expect(
      screen.getByRole("link", { name: /01.*业务挑战/ }),
    ).toHaveAttribute("aria-current", "location");
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test("old deep links map onto the reorganized chapters and the cover", () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    const first = mount("zh", "/project/orthodontics#thinking");
    expect(document.getElementById("decision-1-title")).toHaveFocus();
    expect(
      screen.getByRole("link", { name: /02.*决策一/ }),
    ).toHaveAttribute("aria-current", "location");
    first.unmount();

    mount("zh", "/project/orthodontics#solution");
    expect(document.getElementById("decision-2-title")).toHaveFocus();
    expect(
      screen.getByRole("link", { name: /03.*决策二/ }),
    ).toHaveAttribute("aria-current", "location");
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test("two key decisions combine reasoning, a diagram and real interface evidence", () => {
  const { container } = mount("zh");

  const scope = screen.getByRole("figure", {
    name: "推荐候选与执行任务的区别",
  });
  expect(scope).toHaveTextContent("推荐池");
  expect(scope).toHaveTextContent("已预约筛查");
  expect(scope).toHaveTextContent("原有预约中添加筛查项目");
  expect(scope).toHaveTextContent("医生主动补充");
  expect(scope).toHaveTextContent("删除推荐不会自动补齐固定数量");

  const relay = screen.getByRole("figure", { name: "角色接续示意" });
  ["护士", "儿牙医生", "正畸医生", "正畸顾问"].forEach((role) =>
    expect(relay).toHaveTextContent(role),
  );
  expect(relay).toHaveTextContent("同一份筛查记录");
  expect(relay).toHaveTextContent("不表示所有病例必须按同一顺序一次完成");

  expect(
    screen.getByRole("img", { name: /儿牙筛查列表截图/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /护士资料采集界面/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /儿牙医生完成筛查确认弹窗/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /正畸医生筛查结论面板/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /家长端咬合筛查报告封面/ }),
  ).toBeInTheDocument();

  const images = [...container.querySelectorAll("img")];
  expect(images.length).toBeGreaterThanOrEqual(12);
  expect(
    images.every((image) => image.getAttribute("src")?.endsWith(".webp")),
  ).toBe(true);
  expect(container).not.toHaveTextContent(/金冬天|凤瑾春|王晓云|陈医生/);
});

test("results separate record volume, rollout scope and the same-season business change", () => {
  const { container } = mount("zh");
  const results = container.querySelector("#results");

  expect(results).toHaveTextContent("18,460");
  expect(results).toHaveTextContent("2026 年 2 月在全部门店上线");
  expect(results).toHaveTextContent("30%–40%");
  expect(results).toHaveTextContent("50%–60%");
  expect(results).toHaveTextContent("不能单独归因于本项目");
  expect(results).not.toHaveTextContent("54,990");

  const range = screen.getByRole("figure", {
    name: "需矫成交率同期变化",
  });
  expect(range).toHaveTextContent("判定需矫后产生矫正收费");
  expect(range).toHaveTextContent("2025 年 2—4 月");
  expect(range).toHaveTextContent("2026 年 2—4 月");
});

test("the page keeps reflection short and puts the entry trade-off behind a disclosure", () => {
  const { container } = mount("zh");
  const reflection = container.querySelector("#reflection");
  expect(reflection).toHaveTextContent("信息要求要匹配现场执行能力");
  expect(reflection).toHaveTextContent("流程变更需要与业务共同推进");
  expect(reflection).toHaveTextContent("入口复用取舍");
  expect(container).not.toHaveTextContent("编辑备注");
  expect(container).not.toHaveTextContent("素材准备中");
});

test("the manuscript records the new structure and the verified facts", () => {
  const manuscript = readFileSync("docs/pages/orthodontics/content.md", "utf8");
  [
    "把推荐候选和需要执行的筛查任务分开",
    "按专业边界拆分任务，让多角色能接续完成",
    "18,460",
    "2026.02 全部门店上线",
    "不能单独归因于本项目",
    "姓名、生日、病历字段、医生姓名与患者肖像已做脱敏",
  ].forEach((text) => expect(manuscript).toContain(text));
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
    mount("zh", "/project/orthodontics#results");
    expect(document.getElementById("results-title")).toHaveFocus();
    const link = screen.getByRole("link", { name: /05.*上线结果/ });
    await user.click(link);
    scroll.mockClear();
    await user.click(link);
    expect(scroll).toHaveBeenCalledWith({
      behavior: "instant",
      block: "start",
    });
    expect(document.getElementById("results-title")).toHaveFocus();
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
    const chapters = observers.find((observer) =>
      observer.targets.some((target) => target.id === "decision-1"),
    );
    expect(chapters).toBeDefined();
    act(() =>
      chapters.callback([
        {
          target: document.getElementById("decision-1"),
          isIntersecting: true,
        },
      ]),
    );
    expect(
      screen.getByRole("link", { name: /02.*决策一/ }),
    ).toHaveAttribute("aria-current", "location");

    const end = observers.find((observer) =>
      observer.targets.some((target) => target.id === "reader-end"),
    );
    act(() => end.callback([{ isIntersecting: true }]));
    expect(
      screen.getByRole("link", { name: /06.*反思/ }),
    ).toHaveAttribute("aria-current", "location");
    act(() => end.callback([{ isIntersecting: false }]));
    expect(
      screen.getByRole("link", { name: /02.*决策一/ }),
    ).toHaveAttribute("aria-current", "location");

    const intro = chapters.targets.find((target) => target.id === "challenge");
    expect(intro).toBeDefined();
    act(() => chapters.callback([{ target: intro, isIntersecting: true }]));
    expect(
      screen.getByRole("link", { name: /01.*业务挑战/ }),
    ).toHaveAttribute("aria-current", "location");
    unmount();
    expect(
      observers.every((observer) => observer.disconnect.mock.calls.length > 0),
    ).toBe(true);
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
    challenge: -1800,
    "decision-1": -100,
    "decision-2": 152,
    experience: 1200,
    results: 2000,
    reflection: 2800,
  };
  const rect = vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(function () {
      return { top: tops[this.id] ?? 800 };
    });
  try {
    mount();
    const current = () =>
      screen.getByRole("link", { name: /02.*决策一/ });
    expect(current()).toHaveAttribute("aria-current", "location");
    const cursor = observers.find((observer) =>
      observer.targets.some((target) => target.id === "decision-1"),
    );
    act(() =>
      cursor.callback([
        {
          target: document.getElementById("decision-1"),
          isIntersecting: false,
        },
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

test("screenshot evidence opens in a dialog and Escape restores the trigger", async () => {
  const user = userEvent.setup();
  mount("zh");
  const trigger = screen.getByRole("button", {
    name: /放大查看：同一张列表里/,
  });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(
    screen.getByRole("button", { name: "关闭图片预览" }),
  ).toHaveFocus();
  expect(
    within(dialog).getByRole("img", { name: /儿牙筛查列表截图/ }),
  ).toHaveAttribute("src", expect.stringContaining("screening-list.webp"));
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test("the full report opens the redacted long image", async () => {
  const user = userEvent.setup();
  mount("zh");
  await user.click(screen.getByRole("button", { name: /查看完整报告/ }));
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveTextContent("家长报告：把结论带到离店之后");
  expect(
    within(dialog).getByRole("img", { name: /家长端咬合筛查报告封面/ }),
  ).toHaveAttribute("src", expect.stringContaining("report-full.webp"));
  expect(dialog).toHaveTextContent("报告为长图");
});
