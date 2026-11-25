import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Orthodontics from "./index";

function mount(entry = "/project/orthodontics") {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Orthodontics />
    </MemoryRouter>,
  );
}
test("the approved eight chapters retain their order and a text-only hero", () => {
  const { container } = mount();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "咬合筛查与正畸前期协作流程",
  );
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((n) => n.textContent),
  ).toEqual([
    "为什么需要改变原有的筛查方式？",
    "如何确定产品的建设范围？",
    "如何确定优先处理的任务？",
    "如何让不同角色协同工作？",
    "如何降低一线人员的操作负担？",
    "如何让家长了解检查过程与结果？",
    "项目如何落地，取得了什么成果？",
    "如果重新做，我会改进什么？",
  ]);
  const hero = container.querySelector("#case-cover");
  expect(hero.querySelector("img, svg")).toBeNull();
  [
    "18,460",
    "5,495",
    "50%–60%",
    "2025 年启动",
    "截至 2026 年 8 月",
    "属团队共同成果",
  ].forEach((text) => expect(hero).toHaveTextContent(text));
});
test("permissions, real feedback and cumulative results keep their factual boundaries", () => {
  const { container } = mount();
  const permissions = screen.getByRole("table", {
    name: "岗位角色与专业等级权限",
  });
  expect(permissions).toHaveTextContent(
    "无、一、二级正畸等级医生基础检查、可选预填写结论",
  );
  expect(permissions).toHaveTextContent("三级正畸及免审医生专业评估、正式结论");
  expect(
    screen.getByRole("figure", { name: "逐题交互的真实迭代" }),
  ).toHaveTextContent("单选题→自动跳转");
  expect(container.querySelector("#execution")).toHaveTextContent(
    "无法预判选择后是否会自动跳转",
  );
  const results = container.querySelector("#results");
  [
    "54,990",
    "19,640",
    "18,460",
    "9,923",
    "5,495",
    "正畸方案沟通后的成交率",
    "并非去重患者人数",
    "预约锁定不等于成交",
    "医疗、运营及产品团队共同作用",
  ].forEach((text) => expect(results).toHaveTextContent(text));
  expect(results).not.toHaveTextContent("需矫患者数");
  expect(container.querySelector("#reflection")).toHaveTextContent(
    "抽样计时和数据埋点",
  );
});
test("the six full desktop screenshots occupy the approved chapters", () => {
  const { container } = mount();
  for (const [id, files] of Object.entries({
    "decision-1": ["screening-list-full.png"],
    "decision-2": ["nurse-collection-full.png", "pedo-confirm-full.png"],
    execution: ["analysis-page-full.png", "ortho-conclusion-full.png"],
    experience: ["scan-analysis-full.png", "report-full.png"],
  })) {
    expect(
      [...container.querySelectorAll(`#${id} figure img:not([alt=""])`)].map(
        (n) => n.getAttribute("src").split("/").at(-1),
      ),
    ).toEqual(files);
  }
  expect(container).not.toHaveTextContent(/素材准备中|图片占位|需矫成交率/);
  expect(
    screen.queryByRole("button", { name: /查看完整原图/ }),
  ).not.toBeInTheDocument();
});
test.each([
  ["thinking", "decision-1-title"],
  ["solution", "decision-2-title"],
  ["reflection", "reflection-title"],
  ["strategy", "strategy-title"],
])("deep link #%s focuses the intended chapter", (hash, id) => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    mount(`/project/orthodontics#${hash}`);
    expect(document.getElementById(id)).toHaveFocus();
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});
test("the image viewer traps focus, closes on Escape and restores its trigger", async () => {
  const user = userEvent.setup();
  mount();
  const trigger = screen.getByRole("button", {
    name: "放大查看：儿牙筛查列表",
  });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(
    within(dialog).getByRole("button", { name: "关闭图片预览" }),
  ).toHaveFocus();
  await user.tab({ shift: true });
  expect(dialog.contains(document.activeElement)).toBe(true);
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
test("the report detail opens the same model region, not an unrelated full report", async () => {
  const user = userEvent.setup();
  mount();
  await user.click(
    screen.getByRole("button", { name: "放大查看：报告中的口腔3D模型" }),
  );
  const detail = within(screen.getByRole("dialog")).getByRole("img");
  expect(detail.tagName.toLowerCase()).toBe("svg");
  expect(detail).toHaveAttribute("viewBox", expect.stringContaining("1632."));
  expect(detail.querySelector("image")).toHaveAttribute(
    "href",
    expect.stringContaining("report-full.png"),
  );
});
test("a failed screenshot leaves its design explanation readable", () => {
  mount();
  act(() => fireEvent.error(screen.getByRole("img", { name: /儿牙筛查列表/ })));
  expect(screen.getByRole("status")).toHaveTextContent("儿牙筛查列表");
  expect(screen.getByText("优先筛查任务")).toBeInTheDocument();
});
