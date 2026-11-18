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
      "会员业务与改造背景",
      "看清办理依据，中断后能顺畅接手",
      "让前台在额度内当场给优惠",
      "上线后发生了什么",
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
      const link = screen.getByRole("link", { name: "结果与边界" });
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
  expect(
    container.querySelector('[data-evidence="observed"]'),
  ).toHaveTextContent("未做统一埋点计时");
  expect(
    container.querySelector('[data-evidence="estimated"]'),
  ).not.toBeInTheDocument();
  expect(container).not.toHaveTextContent(/约 3 天/);
  expect(container.querySelector("#reflection")).not.toBeInTheDocument();
  expect(
    screen.queryByText(/自动化的边界，和自动化本身一样重要|如果重新梳理方案/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/旧卡还在不在有效期内/)).toBeInTheDocument();
  expect(container).not.toHaveTextContent(/日终批处理|门店现场实测/);
});

for (const slug of ["pacs-ai", "member-automation"]) {
  for (const language of ["zh", "en"]) {
    test(`${slug} ${language} separates introduction from responsibilities without a duplicate overview heading`, () => {
      const { container } = renderCase(slug, language);
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
            ? "会员业务与改造背景"
            : "Project Overview"
          : language === "zh"
            ? "我的职责与协作"
            : "My role & collaboration",
      );
      if (slug === "member-automation") {
        expect(
          within(overview).getByRole("heading", {
            level: 3,
            name:
              language === "zh" ? "我的职责与协作" : "My role & collaboration",
          }),
        ).toHaveTextContent(
          language === "zh" ? "我的职责与协作" : "My role & collaboration",
        );
      }
      const intro = cover.querySelector("[data-case-intro]");
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
        language === "zh"
          ? slug === "member-automation"
            ? "业务背景"
            : "项目概览"
          : "Project Overview",
      );
    });
  }
}

test("member decisions place the manual, quota, and failure evidence in their business context", () => {
  const { container } = renderCase("member-automation");
  expect(container.querySelector("#decisions")).toHaveTextContent(
    "遇到多笔相似的历史账单，交由前台拍板确认",
  );
  expect(container.querySelector("#solution")).toHaveTextContent(
    "回原系统把标红的剩余事项补完",
  );
  expect(container.querySelector("#governance")).toHaveTextContent(
    "个人月度额度",
  );
  expect(container.querySelector("#governance")).toHaveTextContent(
    "调回允许额度内才能确认",
  );
  expect(container).not.toHaveTextContent(/原子|回退|防悬空/);
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
