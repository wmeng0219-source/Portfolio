import { render, screen, within } from "@testing-library/react";
import { HashRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";

test("renders homepage sections with updated responsibilities and portfolio emphasis", () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>,
  );

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /WEN MENG/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /向下滚动/ })).toHaveAttribute(
    "href",
    "#experience",
  );

  expect(
    [...document.querySelectorAll(".homepage main > section")].map(
      (section) => section.id,
    ),
  ).toEqual(["hero", "experience", "portfolio", "contact"]);
  const experienceSection = screen
    .getByRole("heading", {
      level: 2,
      name: /职业历程/i,
    })
    .closest("section");
  expect(experienceSection).toHaveAttribute("id", "experience");
  expect(
    within(experienceSection).getByText(/01 \/ CAREER PATH/i),
  ).toBeInTheDocument();
  expect(
    within(experienceSection).getByText("2019.07 – 2020.09"),
  ).toBeInTheDocument();
  expect(
    within(experienceSection).getByText("2023.04 – 2026.09"),
  ).toBeInTheDocument();
  expect(within(experienceSection).getByText("界面设计")).toBeInTheDocument();
  expect(within(experienceSection).getByText("设计规范")).toBeInTheDocument();
  expect(within(experienceSection).getByText("组件体系")).toBeInTheDocument();
  expect(experienceSection.querySelectorAll(".career-row")).toHaveLength(4);
  expect(experienceSection.querySelector(".growth-timeline")).toBeNull();

  const portfolioSection = screen
    .getByRole("heading", {
      level: 2,
      name: /精选项目 · 复杂业务系统实践/i,
    })
    .closest("section");
  expect(portfolioSection).toHaveAttribute("id", "portfolio");
  expect(
    within(portfolioSection).getByText(/02 \/ SELECTED WORK/i),
  ).toBeInTheDocument();
  const caseLinks = within(portfolioSection).getAllByRole("link");
  expect(caseLinks).toHaveLength(3);
  expect(
    within(portfolioSection).getByText("会员与收银自动化"),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText("咬合筛查与正畸协作"),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText("PACS 读片与 AI 辅助"),
  ).toBeInTheDocument();

  const contactSection = screen
    .getByRole("heading", {
      level: 2,
      name: /联系我/i,
    })
    .closest("section");
  expect(contactSection).toHaveAttribute("id", "contact");
  expect(
    within(contactSection).getByText(/03 \/ CONTACT/i),
  ).toBeInTheDocument();
  expect(
    within(contactSection).getByRole("link", { name: /wmeng0219@gmail.com/i }),
  ).toHaveAttribute("href", "mailto:wmeng0219@gmail.com");
});

test.each([
  ["/", "WEN MENG"],
  ["/project/member-automation", "会员自动化与财务治理"],
  ["/project/orthodontics", "咬合筛查与正畸协作前期流程"],
  ["/project/pacs-ai", "PACS 读片与 AI 辅助"],
])(
  "English is paused on %s even with a saved English preference",
  (route, title) => {
    localStorage.setItem("language", "en");
    render(
      <MemoryRouter initialEntries={[route]}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
    expect(
      screen.queryByRole("button", { name: /^(EN|中文|Switch to English)$/ }),
    ).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
  },
);

test("renders case studies and handles invalid project ID 404 fallback", () => {
  const { unmount } = render(
    <MemoryRouter initialEntries={["/project/member-automation"]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "会员自动化与财务治理" }),
  ).toBeInTheDocument();
  unmount();

  const { unmount: unmount2 } = render(
    <MemoryRouter initialEntries={["/project/orthodontics"]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "咬合筛查与正畸协作前期流程",
    }),
  ).toBeInTheDocument();
  unmount2();

  render(
    <MemoryRouter initialEntries={["/project/unknown-id"]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText("未找到该案例")).toBeInTheDocument();
});
