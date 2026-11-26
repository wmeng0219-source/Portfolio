import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../../../context/LanguageContext";
import MemberAutomation from "./index";

const renderCase = (hash = "") =>
  render(
    <MemoryRouter initialEntries={["/project/member-automation" + hash]}>
      <LanguageProvider>
        <MemberAutomation />
      </LanguageProvider>
    </MemoryRouter>,
  );

test("approved seven chapters retain full screenshots in their actual business context", () => {
  const { container } = renderCase();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "会员业务自动化",
  );
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((n) => n.textContent),
  ).toEqual([
    "一次会员办理，依赖大量人工判断与操作",
    "在原有系统之上实现业务自动化",
    "把员工需要记住的规则，交给系统",
    "让前台只关注买什么、付多少",
    "从逐笔审批，转向额度内自主优惠",
    "明确自动化边界，保留人工接续能力",
    "从业务提效到持续优化",
  ]);
  expect(container.querySelector("#case-cover img")).toBeNull();
  const images = [...container.querySelectorAll("main img")];
  expect(images).toHaveLength(6);
  expect(images.map((n) => n.closest("section").id)).toEqual([
    "experience",
    "experience",
    "authorization",
    "exceptions",
    "exceptions",
    "exceptions",
  ]);
  for (const image of images) {
    expect(image).toHaveAttribute("width", "3840");
    expect(image).toHaveAttribute("height", "2160");
    expect(image).toHaveAttribute(
      "src",
      expect.stringMatching(/\/member\/approved\/.*\.png$/),
    );
  }
  expect(container).not.toHaveTextContent(
    /内部实施|编辑备注|素材准备中|约 3 天/,
  );
});

test("business diagrams keep the judgment dimensions, allocation comparison and observation limits", () => {
  const { container } = renderCase();
  const rules = container.querySelector("#rules");
  [
    "现有卡种",
    "目标卡种",
    "有效状态与剩余权益",
    "A 门店：¥1,500",
    "B 门店：¥6,000",
    "业务逻辑示意，不代表实际会计分录。",
  ].forEach((text) => expect(rules).toHaveTextContent(text));
  expect(container.querySelector("#authorization")).toHaveTextContent(
    "¥3,499 − ¥3,400 = ¥99",
  );
  expect(container.querySelector("#authorization")).toHaveTextContent(
    "剩余可用额度为 ¥80，超额时无法确认。",
  );
  expect(container.querySelector("#results")).toHaveTextContent(
    "依据多门店现场观察及一线员工反馈估算",
  );
  expect(container.querySelector("#results")).toHaveTextContent(
    "尚未完全自动化",
  );
  expect(container.querySelector("#results")).toHaveTextContent(
    "我通过 AI 辅助编程实现门店直接录入",
  );
});

test("all six screenshots enlarge the same full source and restore focus on Escape", async () => {
  const user = userEvent.setup();
  renderCase();
  const triggers = screen.getAllByRole("button", { name: /^放大查看：/ });
  expect(triggers).toHaveLength(6);
  for (const trigger of triggers) {
    const thumbnail = within(trigger).getByRole("img");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      thumbnail.getAttribute("src"),
    );
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "关闭图片预览" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).not.toBe("hidden");
  }
});

test("unavailable screenshot keeps the adjacent design explanation and error feedback", () => {
  renderCase();
  fireEvent.error(screen.getByRole("img", { name: /会员办理完整页面/ }));
  expect(screen.getByRole("status")).toHaveTextContent(
    /会员办理完整页面.*暂时无法加载/,
  );
  expect(screen.getByText("左侧：确认购买内容")).toBeInTheDocument();
  expect(
    screen.getByText("同时展示卡种与权益，避免仅凭卡名选择会员卡。"),
  ).toBeInTheDocument();
});

test("legacy deep links still reach the corresponding labelled chapter", () => {
  renderCase("#resilience");
  expect(document.activeElement).toBe(
    document.getElementById("exceptions-title"),
  );
  expect(screen.getByRole("link", { name: /返回主页/ })).toHaveAttribute(
    "href",
    "/",
  );
});
