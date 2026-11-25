import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import PacsAi from "./index";
import { LanguageProvider } from "../../../context/LanguageContext";

const renderCase = (hash = "") =>
  render(
    <MemoryRouter initialEntries={["/project/pacs-ai" + hash]}>
      <LanguageProvider>
        <PacsAi />
      </LanguageProvider>
    </MemoryRouter>,
  );

test("approved seven-chapter narrative has a text-only hero and real workbench evidence", () => {
  const { container } = renderCase();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "PACS 影像读片与 AI 辅助",
  );
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((n) => n.textContent),
  ).toEqual([
    "从检查执行到读片管理",
    "将新增管理要求融入现有工作流程",
    "在记录规范与操作效率之间寻找平衡",
    "引入 AI 辅助，保留医生的判断权",
    "让一次记录产生多重价值",
    "从功能上线到常态化业务管理",
    "根据真实使用反馈重新审视设计",
  ]);
  expect(container.querySelector("#case-cover img")).toBeNull();
  expect(container.querySelectorAll("main img")).toHaveLength(2);
  expect(container).not.toHaveTextContent("素材准备中");
});

test("AI workbench keeps only the eye annotation and the independent decision tree follows it", () => {
  const { container } = renderCase();
  const section = container.querySelector("#ai");
  const image = within(section).getByRole("figure", {
    name: "AI 辅助读片工作台",
  });
  const tree = within(section).getByRole("figure", {
    name: "AI 识别与病历记录判断关系",
  });
  expect(
    image.compareDocumentPosition(tree) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  [
    "AI 识别是否正确？",
    "识别正确的病灶，是否需要写入病历？",
    "判断正确，继续读片",
    "判断正确，无需写入病历",
    "判断错误",
  ].forEach((t) => expect(tree).toHaveTextContent(t));
  expect(section.querySelectorAll("img")).toHaveLength(1);
  expect(section.querySelectorAll('[data-annotation="eye"]')).toHaveLength(1);
  expect(section.querySelector('[data-annotation="judgment"]')).toBeNull();
});

test("reuse keeps current location and copies only the three empty diagnosis fields", () => {
  renderCase();
  const figure = screen.getByRole("figure", { name: "诊断内容复用机制" });
  const rows = figure.querySelectorAll("[data-reuse-field]");
  expect(rows).toHaveLength(5);
  expect(rows[0]).toHaveTextContent("当前牙位");
  expect(rows[1]).toHaveTextContent("当前方位");
  expect(figure.querySelectorAll("[data-reuse-value]")).toHaveLength(3);
  expect(figure).toHaveTextContent(
    "仅当密度、影像诊断、文字描述均为空时，才提供复用入口。",
  );
  expect(figure).toHaveTextContent("非真实产品界面");
});

test("outcomes retain the record-based AI denominator and separate target from achieved results", () => {
  const { container } = renderCase();
  const results = container.querySelector("#results");
  expect(results).toHaveTextContent("147,793 张");
  expect(results).toHaveTextContent("18,075 张");
  expect(results).toHaveTextContent(
    "96.3% 指最终确认的病灶诊断记录中来源于 AI 的比例，并非识别准确率",
  );
  expect(results).toHaveTextContent("60% 设为阶段性考核目标，并非实际完成率");
  expect(container.querySelector("#value")).toHaveTextContent(
    "3,736 条经医生判断为错误",
  );
  expect(container.querySelector("#reflection")).toHaveTextContent(
    "最终上线情况及效果尚未确认",
  );
});

test("workbench enlargement closes with Escape and restores trigger focus and page scrolling", async () => {
  const user = userEvent.setup();
  renderCase();
  const trigger = screen.getByRole("button", {
    name: "放大查看：AI 辅助读片工作台",
  });
  await user.click(trigger);
  expect(screen.getByRole("dialog")).toHaveTextContent("AI 辅助读片工作台");
  expect(document.body.style.overflow).toBe("hidden");
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).not.toBe("hidden");
});

test("legacy AI deep links still focus the approved chapter", () => {
  const previous = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = vi.fn();
  try {
    renderCase("#solution-2");
    expect(document.activeElement).toBe(document.getElementById("ai-title"));
  } finally {
    Element.prototype.scrollIntoView = previous;
  }
});
