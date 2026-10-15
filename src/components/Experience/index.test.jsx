import { vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LanguageProvider } from "../../context/LanguageContext";
import Experience from "./index";

test.each([
  ["zh", "UI 设计师（兼产品职责）", "至今"],
  ["en", "UI Designer (with Product Responsibilities)", "Present"],
])(
  "career history uses confirmed employment facts in %s",
  (language, role, present) => {
    window.localStorage.setItem("language", language);
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>,
    );

    const entries = screen.getAllByRole("article");
    expect(entries).toHaveLength(4);
    expect(
      within(entries[0]).getByRole("heading", { level: 3, name: role }),
    ).toBeInTheDocument();
    [
      "2023.04 – 2026.09",
      "2022.07 – 2023.04",
      "2020.09 – 2022.05",
      "2019.07 – 2020.09",
    ].forEach((period, index) =>
      expect(within(entries[index]).getByText(period)).toBeInTheDocument(),
    );
    expect(
      screen.queryByText(/ACTIVE|Product Manager \/ ITBP|产品经理 \/ ITBP/),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(present))).not.toBeInTheDocument();
  },
);

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
