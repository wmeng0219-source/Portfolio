import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../../../context/LanguageContext";
import ProjectDetail from "../../ProjectDetail";
import { Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import gsap from "gsap";

vi.mock("gsap", () => ({
  default: {
    context: vi.fn((callback) => {
      callback();
      return { revert() {} };
    }),
    set: vi.fn(),
    fromTo: vi.fn(),
  },
}));

test.each(["zh", "en"])(
  "pre-visit %s distinguishes mechanism evidence from unverified outcomes",
  (language) => {
    localStorage.setItem("language", language);
    const { container } = render(
      <MemoryRouter initialEntries={["/project/pre-visit-engine"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(container).not.toHaveTextContent(
      /100%|全门诊|全门店覆盖|毫秒|大幅提升|All Clinics|100%|millisecond|instant arch/i,
    );
    expect(container).toHaveTextContent(
      language === "zh"
        ? "缺少可公开的上线结果与规模化采纳证据"
        : "Public rollout results and adoption evidence are still pending",
    );
    expect(container).toHaveTextContent(
      language === "zh" ? "超过 7 天" : "more than seven days",
    );
  },
);

test("pre-visit reduced motion shows the final state immediately and cleans up on live changes", () => {
  let listener;
  const query = {
    matches: true,
    addEventListener: vi.fn((_event, callback) => {
      listener = callback;
    }),
    removeEventListener: vi.fn(),
  };
  const previous = window.matchMedia;
  window.matchMedia = () => query;
  const revert = vi.fn();
  gsap.context.mockImplementation((callback) => {
    callback();
    return { revert };
  });
  gsap.fromTo.mockClear();
  gsap.set.mockClear();
  try {
    const { unmount } = render(
      <MemoryRouter initialEntries={["/project/pre-visit-engine"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(gsap.set).toHaveBeenCalledWith("[data-animate]", {
      y: 0,
      autoAlpha: 1,
    });
    expect(gsap.fromTo).not.toHaveBeenCalled();
    query.matches = false;
    act(() => listener());
    expect(revert).toHaveBeenCalledTimes(1);
    expect(gsap.fromTo).toHaveBeenCalledTimes(1);
    query.matches = true;
    act(() => listener());
    expect(revert).toHaveBeenCalledTimes(2);
    expect(gsap.set).toHaveBeenCalledTimes(2);
    unmount();
    expect(revert).toHaveBeenCalledTimes(3);
    expect(query.removeEventListener).toHaveBeenCalledWith("change", listener);
  } finally {
    window.matchMedia = previous;
  }
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../../config/features", () => ({ ENGLISH_ENABLED: true }));
