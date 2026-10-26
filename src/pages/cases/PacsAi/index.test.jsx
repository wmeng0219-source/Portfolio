import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../../context/LanguageContext";
import PacsAi from "./index";

test("the light reader contains all seven chapters and overview navigation focuses the reading heading", async () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={["/project/pacs-ai#overview"]}>
        <LanguageProvider>
          <PacsAi />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(container.querySelector("#case-cover")).toHaveAttribute(
      "aria-labelledby",
      "case-title",
    );
    const reader = within(container.querySelector("[data-case-reader]"));
    expect(reader.getAllByRole("heading", { level: 2 })).toHaveLength(7);
    const overview = reader.getByRole("heading", { name: "我的职责与协作" });
    await user.click(screen.getByRole("link", { name: /01.*项目概览/ }));
    expect(overview).toHaveFocus();
    expect(container.querySelectorAll("[data-chapter-heading]")).toHaveLength(
      7,
    );
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});

test("diagrams preserve the distinction between doctor review, completed reading and checklist synchronization", () => {
  const { container } = render(
    <MemoryRouter>
      <LanguageProvider>
        <PacsAi />
      </LanguageProvider>
    </MemoryRouter>,
  );
  const review = container.querySelector('[data-diagram="doctor-review"]');
  expect(review).toHaveTextContent("判断正确，继续读片");
  expect(review).toHaveTextContent("判断正确，无需写入病历");
  expect(review).toHaveTextContent("判断错误");
  expect(review).toHaveTextContent("检查表同步到病历");
  const sync = container.querySelector('[data-diagram="record-sync"]');
  expect(sync).toHaveTextContent("已完成读片");
  expect(sync).toHaveTextContent("检查表同步");
  expect(sync).toHaveTextContent("辅助检查");
  expect(
    container.querySelector('[data-diagram="timeout-fallback"]'),
  ).toHaveTextContent("必填检查");
  expect(
    container.querySelector('[data-diagram="reuse-module"]'),
  ).toHaveTextContent("牙位与方位");
});
