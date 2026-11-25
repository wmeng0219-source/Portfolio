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
  test(`${slug} keeps the confirmed narrative order and supplied interface evidence`, () => {
    const { container } = renderCase(slug);
    const expected = [
      "业务痛点与系统边界取舍",
      "信息架构重构：将跨模块数据聚合成单一决策流",
      "跨系统容错设计：数据歧义识别与断点人工接手",
      "规则解耦与权限前置：让合规校验发生在报价当下",
      "落地验证、系统边界与演进规划",
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
      /30%—40%|53.75%|147,793/,
    );
    expect(
      container.querySelectorAll("[data-visual-slot]").length,
    ).toBeGreaterThanOrEqual(3);
    expect(screen.queryByText("素材准备中")).not.toBeInTheDocument();
    const evidenceSources = new Set(
      Array.from(
        container.querySelectorAll("figure[data-visual-slot] img"),
        (image) => image.getAttribute("src").split("/").at(-1),
      ),
    );
    expect(evidenceSources).toEqual(
      new Set([
        "upgrade-full.jpg",
        "orders-full.jpg",
        "failure-full.jpg",
        "quota-full.jpg",
        "success-full.jpg",
        "workspace-full.jpg",
        "audit-full.jpg",
      ]),
    );
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
      const link = screen.getByRole("link", { name: "落地验证与演进" });
      await user.click(link);
      expect(document.activeElement).toBe(document.getElementById("impact"));
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
      expect(screen.queryByText("Image pending")).not.toBeInTheDocument();
      expect(screen.queryByText(/我的判断|素材准备中/)).not.toBeInTheDocument();
    } finally {
      Element.prototype.scrollIntoView = previous;
    }
  });
}

test("member outcomes retain measured scope and omit the declined estimate and reflection", () => {
  const { container } = renderCase("member-automation");
  expect(container.querySelector("#impact")).toHaveTextContent(
    "当前耗时变化来自一线调研与现场观察，前后未做统一计时",
  );
  expect(
    container.querySelector('[data-evidence="estimated"]'),
  ).not.toBeInTheDocument();
  expect(container).not.toHaveTextContent(/约 3 天/);
  expect(container.querySelector("#reflection")).not.toBeInTheDocument();
  expect(
    screen.queryByText(/自动化的边界，和自动化本身一样重要|如果重新梳理方案/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/在用卡有效期及待开通卡状态/)).toBeInTheDocument();
  expect(container).not.toHaveTextContent(/日终批处理|门店现场实测/);
});

for (const slug of ["pacs-ai", "member-automation"]) {
  for (const language of ["zh", "en"]) {
    test(`${slug} ${language} separates introduction from responsibilities without a duplicate overview heading`, () => {
      const { container } = renderCase(slug, language);
      if (slug === "pacs-ai") {
        const hero = container.querySelector("#case-cover");
        expect(hero).toHaveAttribute("aria-labelledby", "case-title");
        expect(
          within(hero).getByRole("heading", { level: 1 }),
        ).toHaveTextContent("PACS 影像读片与 AI 辅助");
        expect(within(hero).queryByRole("heading", { level: 2 })).toBeNull();
        expect(hero.querySelector("[data-case-roles]")).toHaveTextContent(
          "产品经理 / 产品设计",
        );
        expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
        expect(
          screen.queryByRole("button", { name: "Switch to English" }),
        ).toBeNull();
        return;
      }
      const overview = container.querySelector("#overview");
      const cover = container.querySelector("#case-cover") || overview;
      expect(cover).toHaveAttribute("aria-labelledby", "case-title");
      expect(within(cover).getByRole("heading", { level: 1 })).toHaveAttribute(
        "id",
        "case-title",
      );
      expect(
        within(overview).getByRole("heading", { level: 2 }),
      ).toHaveTextContent(
        slug === "member-automation"
          ? language === "zh"
            ? "业务痛点与系统边界取舍"
            : "Project Overview"
          : language === "zh"
            ? "我的职责与协作"
            : "My role & collaboration",
      );
      const intro = cover.querySelector("[data-case-intro]");
      const roles = overview.querySelector("[data-case-roles]");
      expect(intro).toBeInTheDocument();
      if (slug === "member-automation" && language === "zh") {
        expect(roles).not.toBeInTheDocument();
        expect(within(cover).getByText("我的职责")).toBeInTheDocument();
        expect(
          within(overview).queryByRole("heading", { name: "我的职责与协作" }),
        ).not.toBeInTheDocument();
      } else {
        expect(roles).toBeInTheDocument();
        expect(
          intro.compareDocumentPosition(roles) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
      }
      const nav = screen.getByRole("navigation", {
        name: language === "zh" ? "章节目录" : "Contents",
      });
      expect(within(nav).getAllByRole("link")[0]).toHaveTextContent(
        language === "zh"
          ? slug === "member-automation"
            ? "业务背景与架构取舍"
            : "项目概览"
          : "Project Overview",
      );
    });
  }
}

test("member decisions place the manual, quota, and failure evidence in their business context", () => {
  const { container } = renderCase("member-automation");
  expect(container.querySelector("#decisions")).toHaveTextContent(
    "前置人工确认：遇到多笔相似历史账单，由前台判断",
  );
  expect(container.querySelector("#resilience")).toHaveTextContent(
    "回原系统继续处理",
  );
  expect(container.querySelector("#governance")).toHaveTextContent(
    "个人月度额度",
  );
  expect(container.querySelector("#governance")).toHaveTextContent(
    "调回允许范围后才能继续",
  );
  expect(container).not.toHaveTextContent(/原子|回退|防悬空/);
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
