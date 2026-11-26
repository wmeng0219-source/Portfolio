import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../../context/LanguageContext";
import MemberAutomation from "./MemberAutomation";
import PacsAi from "./PacsAi";

for (const [name, Page, title, count] of [
  ["member-automation", MemberAutomation, "会员业务自动化", 6],
  ["pacs-ai", PacsAi, "PACS 影像读片与 AI 辅助", 2],
]) {
  test.each(["zh", "en"])(
    `${name} keeps the approved Chinese case when the saved preference is %s`,
    (language) => {
      localStorage.setItem("language", language);
      const { container } = render(
        <MemoryRouter>
          <LanguageProvider>
            <Page />
          </LanguageProvider>
        </MemoryRouter>,
      );
      const cover = container.querySelector("#case-cover");
      expect(cover).toHaveAttribute("aria-labelledby", "case-title");
      expect(
        within(cover).getByRole("heading", { level: 1 }),
      ).toHaveTextContent(title);
      expect(within(cover).queryByRole("heading", { level: 2 })).toBeNull();
      expect(cover.querySelector("[data-case-intro]")).toBeInTheDocument();
      expect(cover.querySelector("[data-case-roles]")).toHaveTextContent(
        "产品经理 / 产品设计",
      );
      expect(cover.querySelector("img")).toBeNull();
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
      expect(container.querySelectorAll("main img")).toHaveLength(count);
      expect(
        screen.queryByRole("button", { name: "Switch to English" }),
      ).toBeNull();
      expect(container).not.toHaveTextContent(
        /素材准备中|编辑备注|归因待确认|独立主导|V1|V2/,
      );
    },
  );
}
