import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { vi } from "vitest";
import { HashRouter } from "react-router-dom";
import { LanguageProvider } from "../../context/LanguageContext";
import Portfolio from "./index";

test("a tall case disables the entire stack; resize restores it only when every entry is reachable", async () => {
  const height = vi
    .spyOn(HTMLElement.prototype, "offsetHeight", "get")
    .mockImplementation(function () {
      return this.classList.contains("portfolio-showcase-card")
        ? this.textContent.includes("PACS")
          ? 900
          : 500
        : 180;
    });
  const widthBefore = window.innerWidth,
    heightBefore = window.innerHeight;
  window.innerWidth = 1280;
  window.innerHeight = 800;
  const view = render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );
  const grid = view.container.querySelector(".portfolio-stage-grid");
  expect(grid).toHaveAttribute("data-stack-enabled", "false");
  window.innerHeight = 1200;
  fireEvent(window, new Event("resize"));
  await waitFor(() =>
    expect(grid).toHaveAttribute("data-stack-enabled", "true"),
  );
  window.innerWidth = 390;
  fireEvent(window, new Event("resize"));
  await waitFor(() =>
    expect(grid).toHaveAttribute("data-stack-enabled", "false"),
  );
  view.unmount();
  height.mockRestore();
  window.innerWidth = widthBefore;
  window.innerHeight = heightBefore;
});

test("a live reduced-motion change releases the stack and heading cover without a reload", () => {
  const previous = window.matchMedia;
  let onChange;
  const preference = {
    matches: false,
    addEventListener: (_event, listener) => {
      onChange = listener;
    },
    removeEventListener: vi.fn(),
  };
  window.matchMedia = () => preference;
  const height = vi
    .spyOn(HTMLElement.prototype, "offsetHeight", "get")
    .mockReturnValue(180);
  const view = render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );
  const grid = view.container.querySelector(".portfolio-stage-grid");
  const head = view.container.querySelector(".portfolio-showcase-head");
  expect(grid).toHaveAttribute("data-stack-enabled", "true");
  preference.matches = true;
  onChange();
  expect(grid).toHaveAttribute("data-stack-enabled", "false");
  expect(head).toHaveAttribute("data-cover-enabled", "false");
  expect(
    view.container
      .querySelector(".portfolio-showcase-card")
      .style.getPropertyValue("--folder-top"),
  ).toBe("");
  view.unmount();
  expect(preference.removeEventListener).toHaveBeenCalledWith(
    "change",
    onChange,
  );
  height.mockRestore();
  window.matchMedia = previous;
});

test("renders three equal project entries in the approved order", async () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );

  const section = screen
    .getByRole("heading", {
      level: 2,
      name: /精选项目/i,
    })
    .closest("section");

  expect(within(section).getByText(/SELECTED WORK/i)).toBeInTheDocument();

  const cards = within(section).getAllByRole("link");
  expect(cards).toHaveLength(3);

  expect(within(section).getByText("会员与收银自动化")).toBeInTheDocument();
  expect(within(section).getByText("咬合筛查与正畸协作")).toBeInTheDocument();
  expect(within(section).getByText("PACS 读片与 AI 辅助")).toBeInTheDocument();

  expect(cards[0]).toHaveAttribute("href", "#/project/member-automation");
  expect(cards[1]).toHaveAttribute("href", "#/project/orthodontics");
  expect(cards[2]).toHaveAttribute("href", "#/project/pacs-ai");
  expect(within(section).getAllByText(/查看完整案例/i)).toHaveLength(3);
});

test("uses explicit screenshot placeholders instead of diagrams that look like product evidence", () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );

  expect(
    screen.getByRole("img", { name: "会员收银与权益界面截图占位" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: "正畸筛查与协作界面截图占位" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: "PACS 完整读片工作台截图占位" }),
  ).toBeInTheDocument();
  expect(screen.queryByText("RULE_ENGINE")).not.toBeInTheDocument();
  expect(
    screen.queryByText(/当前动态管理目标，不是已达成结果/),
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/使用规模，非质量提升/)).not.toBeInTheDocument();
  expect(screen.queryByText("+142%")).not.toBeInTheDocument();
});

test("project entries keep a title, value and working route without dense evidence blocks", () => {
  const { container } = render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );
  const cards = container.querySelectorAll(".portfolio-showcase-card");
  cards.forEach((card) => {
    expect(within(card).getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(within(card).getByText("查看完整案例")).toBeInTheDocument();
    expect(
      card.querySelectorAll(".portfolio-showcase-card-metric"),
    ).toHaveLength(0);
  });
  expect(cards[0]).toHaveTextContent("减少人工判断");
  expect(cards[1]).toHaveTextContent("明确跨角色协作");
  expect(cards[2]).toHaveTextContent("医生复核");
  expect(container).not.toHaveTextContent(/75%|147,793|5,495/);
});
