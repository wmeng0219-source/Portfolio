import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import MemberAutomation from "./MemberAutomation";
import Orthodontics from "./Orthodontics";
import PacsAi from "./PacsAi";

const renderCase = (slug, language = "zh") => {
  localStorage.setItem("language", language);
  const Component = {
    "pacs-ai": PacsAi,
    orthodontics: Orthodontics,
    "member-automation": MemberAutomation,
  }[slug];
  return render(
    <MemoryRouter initialEntries={[`/project/${slug}`]}>
      <LanguageProvider>
        <Routes>
          <Route
            path="/project/:id"
            element={
              <Component project={projects.find((p) => p.id === slug)} />
            }
          />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );
};

for (const slug of ["member-automation"]) {
  test(`${slug} keeps the approved chapter order, honest media placeholders and no hero metrics`, () => {
    const { container } = renderCase(slug);
    const expected = [
      "我的职责与协作",
      "问题",
      "我的判断",
      "方案",
      "系统机制",
      "结果",
    ];
    if (slug === "orthodontics") expected.push("反思");
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(expected);
    const nav = screen.getByRole("navigation", { name: "章节目录" });
    expect(within(nav).getAllByRole("link")).toHaveLength(expected.length);
    within(nav)
      .getAllByRole("link")
      .forEach((link) => {
        expect(link.getAttribute("href")).toMatch(
          new RegExp(`^/project/${slug}#`),
        );
        expect(
          document.getElementById(link.getAttribute("href").split("#").at(-1)),
        ).toBeInTheDocument();
      });
    expect(container.querySelector("#overview")).not.toHaveTextContent(
      /4—5 分钟|30%—40%|53.75%/,
    );
    expect(
      container.querySelectorAll("[data-visual-slot]").length,
    ).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("素材准备中").length).toBeGreaterThanOrEqual(3);
    expect(
      screen.queryByText(/编辑备注|归因待确认|独立主导|V1|V2/),
    ).not.toBeInTheDocument();
  });

  test(`${slug} switches language and keeps repeated contents navigation on the same route`, async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    const previous = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoView;
    try {
      renderCase(slug);
      const link = screen.getByRole("link", { name: /05.*系统机制/ });
      await user.click(link);
      expect(document.activeElement).toBe(document.getElementById("system"));
      expect(link).toHaveAttribute("aria-current", "location");
      scrollIntoView.mockClear();
      await user.click(link);
      expect(scrollIntoView).toHaveBeenCalled();
      await user.click(
        screen.getByRole("button", { name: "Switch to English" }),
      );
      expect(
        screen.getByRole("navigation", { name: "Contents" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        slug === "orthodontics"
          ? "Orthodontic Screening & Collaborative Workflow"
          : "Member Automation & Financial Governance",
      );
      expect(
        screen.getAllByText("Image pending").length,
      ).toBeGreaterThanOrEqual(3);
      expect(screen.queryByText(/我的判断|素材准备中/)).not.toBeInTheDocument();
    } finally {
      Element.prototype.scrollIntoView = previous;
    }
  });
}

test("member outcomes distinguish measurement from estimates and omit the declined reflection candidate", () => {
  const { container } = renderCase("member-automation");
  expect(
    container.querySelector('[data-evidence="measured"]'),
  ).toHaveTextContent("门店现场实测");
  expect(
    container.querySelector('[data-evidence="estimated"]'),
  ).toHaveTextContent("财务团队估算");
  expect(container.querySelector("#reflection")).not.toBeInTheDocument();
  expect(
    screen.queryByText(/自动化的边界，和自动化本身一样重要|如果重新梳理方案/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/仍在有效期内即可升级/)).toBeInTheDocument();
  expect(screen.getAllByText(/批处理/).length).toBeGreaterThan(0);
});

for (const slug of ["pacs-ai", "member-automation"]) {
  for (const language of ["zh", "en"]) {
    test(`${slug} ${language} separates introduction from responsibilities without a duplicate overview heading`, () => {
      const { container } = renderCase(slug, language);
      const overview = container.querySelector("#overview");
      expect(overview).toHaveAttribute("aria-labelledby", "case-title");
      expect(
        within(overview).getByRole("heading", { level: 1 }),
      ).toHaveAttribute("id", "case-title");
      expect(
        within(overview).getByRole("heading", { level: 2 }),
      ).toHaveTextContent(
        language === "zh" ? "我的职责与协作" : "My role & collaboration",
      );
      const intro = overview.querySelector("[data-case-intro]");
      const roles = overview.querySelector("[data-case-roles]");
      expect(intro).toBeInTheDocument();
      expect(roles).toBeInTheDocument();
      expect(
        intro.compareDocumentPosition(roles) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      const nav = screen.getByRole("navigation", {
        name: language === "zh" ? "章节目录" : "Contents",
      });
      expect(within(nav).getAllByRole("link")[0]).toHaveTextContent(
        language === "zh" ? "项目概览" : "Project Overview",
      );
    });
  }
}

test("member solutions include quota and recovery rule diagrams without invented amounts", () => {
  const { container } = renderCase("member-automation");
  expect(container.querySelector('[data-mechanism="quota"]')).toHaveTextContent(
    "超额",
  );
  expect(
    container.querySelector('[data-mechanism="recovery"]'),
  ).toHaveTextContent("原卡与原权益");
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
