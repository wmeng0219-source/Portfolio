import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function Probe() {
  const { language, englishEnabled, toggleLanguage, t } = useLanguage();
  return (
    <button onClick={toggleLanguage}>
      {language} / {String(englishEnabled)} / {t("nav.portfolio")}
    </button>
  );
}

test("paused English ignores the previous preference and cannot be toggled internally", () => {
  localStorage.setItem("language", "en");
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  );
  const probe = screen.getByRole("button");
  expect(probe).toHaveTextContent("zh / false / 精选项目");
  fireEvent.click(probe);
  expect(probe).toHaveTextContent("zh / false / 精选项目");
  expect(document.documentElement.lang).toBe("zh-CN");
  expect(localStorage.getItem("language")).toBe("zh");
});
