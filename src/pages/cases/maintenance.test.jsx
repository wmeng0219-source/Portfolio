import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import ScrollToTop from "../../components/ScrollToTop";
import PacsAi from "./PacsAi";
import MemberAutomation from "./MemberAutomation";
import { caseContent } from "./PacsAi/content";

let originalScroll;
let scroll;
const restore = [];
beforeEach(() => {
  originalScroll = Element.prototype.scrollIntoView;
  scroll = vi.fn();
  Element.prototype.scrollIntoView = scroll;
});
afterEach(() => {
  cleanup();
  restore.splice(0).forEach((reset) => reset());
  Element.prototype.scrollIntoView = originalScroll;
});
const renderCase = (slug, hash = "") => {
  const Page = slug === "pacs-ai" ? PacsAi : MemberAutomation;
  const router = {};
  function Navigation() {
    router.navigate = useNavigate();
    return <ScrollToTop />;
  }
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[`/project/${slug}${hash}`]}>
        <Navigation />
        <Routes>
          <Route path="/project/:id" element={<Page />} />
          <Route
            path="/"
            element={<section id="portfolio">Portfolio</section>}
          />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  );
  return router;
};

test("PACS solution anchors and target styling survive editorial title and percentage changes", () => {
  const oldTitle = caseContent.chapters[3].title;
  const oldText = caseContent.results.managementBody[0];
  restore.push(() => {
    caseContent.chapters[3].title = oldTitle;
    caseContent.results.managementBody[0] = oldText;
  });
  caseContent.chapters[3].title = "Edited decision title";
  caseContent.results.managementBody[0] = oldText.replace("60%", "65%");
  renderCase("pacs-ai", "#solution-2");
  expect(
    screen.getByRole("heading", { name: "Edited decision title" }),
  ).toHaveAttribute("id", "ai-title");
  expect(document.activeElement).toBe(document.getElementById("ai-title"));
  expect(screen.getByText(/65%/)).toHaveTextContent("并非实际完成率");
});

test("PACS old system hash and history still resolve after removal of the old contents layout", async () => {
  const router = renderCase("pacs-ai", "#system");
  expect(document.activeElement).toBe(document.getElementById("value-title"));
  scroll.mockClear();
  await act(async () => {
    await router.navigate("/project/pacs-ai#problem");
  });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(
    document.getElementById("background-title"),
  );
  scroll.mockClear();
  await act(async () => {
    await router.navigate(-1);
  });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(document.getElementById("value-title"));
});

const anchorCases = [
  ["#impact", "results"],
  ["#resilience", "exceptions"],
  ["#governance", "authorization"],
  ["#solution", "experience"],
  ["#decisions", "exceptions"],
  ["#problem", "background"],
  ["#overview", "background"],
  ["#system", "scope"],
];

test.each(anchorCases)(
  "member legacy anchor %s resolves to %s without adding the retired contents layout",
  (hash, targetId) => {
    renderCase("member-automation", hash);
    expect(scroll).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(
      document.getElementById(targetId + "-title"),
    );
    expect(screen.queryByRole("navigation", { name: "章节目录" })).toBeNull();
  },
);

test("member anchor changes and browser history have one scroll owner", async () => {
  const router = renderCase("member-automation", "#impact");
  scroll.mockClear();
  await act(async () => {
    await router.navigate("/project/member-automation#problem");
  });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(
    document.getElementById("background-title"),
  );
  scroll.mockClear();
  await act(async () => {
    await router.navigate(-1);
  });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(document.getElementById("results-title"));
});

test("member deep links respect reduced motion", () => {
  const query = vi
    .spyOn(window, "matchMedia")
    .mockImplementation(() => ({ matches: true }));
  restore.push(() => query.mockRestore());
  renderCase("member-automation", "#impact");
  expect(scroll).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
});

test("returning to the homepage respects reduced motion despite the global smooth-scroll style", async () => {
  const query = vi
    .spyOn(window, "matchMedia")
    .mockImplementation(() => ({ matches: true }));
  restore.push(() => query.mockRestore());
  const router = renderCase("member-automation", "#system");
  scroll.mockClear();
  await act(async () => {
    await router.navigate("/", { state: { scrollTo: "portfolio" } });
  });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(
    expect.objectContaining({ behavior: "instant" }),
  );
});

test("member returns to the page top when history removes its anchor", async () => {
  const top = vi.spyOn(window, "scrollTo");
  restore.push(() => top.mockRestore());
  const router = renderCase("member-automation");
  expect(top).toHaveBeenCalledTimes(1);
  await act(async () => {
    await router.navigate("/project/member-automation#impact");
  });
  top.mockClear();
  await act(async () => {
    await router.navigate(-1);
  });
  expect(top).toHaveBeenCalledTimes(1);
  expect(top).toHaveBeenCalledWith(0, 0);
});
