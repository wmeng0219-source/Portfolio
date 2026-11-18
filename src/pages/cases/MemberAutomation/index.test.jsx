import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../../../context/LanguageContext";
import MemberAutomation from "./index";

const renderCase = () =>
  render(
    <MemoryRouter initialEntries={["/project/member-automation"]}>
      <LanguageProvider>
        <MemberAutomation />
      </LanguageProvider>
    </MemoryRouter>,
  );

test("the reader separates two design decisions and shows each complete screenshot with its caption", () => {
  const { container } = renderCase();
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
  ).toEqual([
    "会员业务与改造背景",
    "看清办理依据，中断后能顺畅接手",
    "让前台在额度内当场给优惠",
    "上线后发生了什么",
  ]);
  const handling = container.querySelector("#solution");
  const discount = container.querySelector("#governance");
  expect(container.querySelector("#case-cover img")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "查看办理设计" }),
  ).not.toBeInTheDocument();
  expect(container.querySelector("details")).not.toBeInTheDocument();
  for (const slot of ["workspace", "upgrade", "orders", "failure", "success"])
    expect(
      handling.querySelector(`[data-visual-slot="${slot}"]`),
    ).toBeInTheDocument();
  expect(
    discount.querySelector('[data-visual-slot="quota"]'),
  ).toBeInTheDocument();
  const figures = container.querySelectorAll("figure[data-visual-slot]");
  expect(figures).toHaveLength(6);
  for (const figure of figures) {
    const image = within(figure).getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(`/member/${figure.dataset.visualSlot}-full.jpg`),
    );
    expect(image).not.toHaveAttribute("style");
    expect(image.parentElement.style.aspectRatio).toBe("2400 / 1350");
    expect(figure.querySelector("figcaption")).toHaveTextContent(image.alt);
    expect(within(figure).getAllByRole("button")).toHaveLength(1);
  }
  expect(
    screen.queryByText(/查看完整界面|查看完整页面/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/前台回原系统查账并办理/)).toBeInTheDocument();
  expect(container).not.toHaveTextContent(/领健|\bODOS\b/i);
  expect(container).not.toHaveTextContent(
    /旧卡剩余价值|门诊、岗位额度|门店现场实测|日终批处理/,
  );
  expect(screen.queryByText("素材准备中")).not.toBeInTheDocument();
});

test("clicking a screenshot enlarges the same complete image", async () => {
  const user = userEvent.setup();
  renderCase();
  const triggers = screen.getAllByRole("button", {
    name: /^放大截图：/,
  });
  expect(triggers).toHaveLength(6);
  for (const trigger of triggers) {
    const thumbnail = within(trigger).getByRole("img");
    await user.click(trigger);
    const enlarged = within(screen.getByRole("dialog")).getByRole("img");
    expect(enlarged).toHaveAttribute("src", thumbnail.getAttribute("src"));
    expect(enlarged).not.toHaveAttribute("style");
    expect(enlarged.parentElement.style.aspectRatio).toBe("2400 / 1350");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).not.toBe("hidden");
  }
});

test("screens can be enlarged and dismissed by keyboard or button with focus restored", async () => {
  const user = userEvent.setup();
  renderCase();
  const trigger = screen.getByRole("button", {
    name: "放大截图：会员升级选卡界面",
  });
  trigger.focus();
  await user.keyboard("{Enter}");
  const dialog = screen.getByRole("dialog", {
    name: "会员升级选卡界面",
  });
  expect(within(dialog).getByRole("img")).toHaveAttribute(
    "src",
    expect.stringMatching(/upgrade-full\.jpg$/),
  );
  const close = within(dialog).getByRole("button", { name: "关闭大图" });
  expect(within(dialog).getAllByRole("button")).toEqual([close]);
  expect(within(dialog).queryByRole("link")).not.toBeInTheDocument();
  expect(close).toHaveFocus();
  await user.tab();
  expect(close).toHaveFocus();
  await user.tab({ shift: true });
  expect(close).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  await user.keyboard("{Enter}");
  await user.click(screen.getByRole("button", { name: "关闭大图" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test("an unavailable screenshot keeps its explanation and the viewer remains dismissible", async () => {
  const user = userEvent.setup();
  renderCase();
  const image = screen.getByRole("img", {
    name: "会员升级选卡界面",
  });
  const figure = within(image.closest("figure"));
  fireEvent.error(image);
  expect(screen.getByRole("status")).toHaveTextContent(
    "会员升级选卡界面暂未加载",
  );
  expect(figure.getByText(/新旧权益变化与系统算出的应付金额/)).toBeInTheDocument();
  await user.click(
    figure.getByRole("button", {
      name: "放大截图：会员升级选卡界面",
    }),
  );
  const dialog = screen.getByRole("dialog");
  fireEvent.error(within(dialog).getByRole("img"));
  expect(within(dialog).getByRole("status")).toHaveTextContent(
    "会员升级选卡界面暂未加载",
  );
  await user.click(within(dialog).getByRole("button", { name: "关闭大图" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.body.style.overflow).not.toBe("hidden");
});
