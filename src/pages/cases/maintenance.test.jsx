import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';
import PacsAi from './PacsAi';
import MemberAutomation from './MemberAutomation';
import { caseContent } from './PacsAi/content';

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
const renderCase = (slug, hash = '') => {
  const Page = slug === 'pacs-ai' ? PacsAi : MemberAutomation;
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
          <Route path="/" element={<section id="portfolio">Portfolio</section>} />
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
  ['member-automation', '#impact', /落地验证与演进/, 'impact', /业务背景/],
];

test.each(anchorCases)('%s owns one scroll and focus per anchor navigation, including repeat and history', async (slug, hash, label, targetId, contextLabel) => {
  const router = renderCase(slug, hash);
  const focusTarget = document.getElementById(targetId);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(focusTarget);
  const link = screen.getByRole('link', { name: label });
  scroll.mockClear();
  fireEvent.click(link);
  expect(scroll).toHaveBeenCalledTimes(1);
  scroll.mockClear();
  fireEvent.click(screen.getByRole('link', { name: contextLabel }));
  expect(scroll).toHaveBeenCalledTimes(1);
  scroll.mockClear();
  await act(async () => { await router.navigate(-1); });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(focusTarget);
  scroll.mockClear();
  await act(async () => { await router.navigate('/', { state: { scrollTo: 'portfolio' } }); });
  expect(scroll).toHaveBeenCalledTimes(1);
});

test.each(anchorCases)('%s anchor navigation is instant with reduced motion', (slug, hash) => {
  const query = vi.spyOn(window, 'matchMedia').mockImplementation(() => ({ matches: true }));
  restore.push(() => query.mockRestore());
  renderCase(slug, hash);
  expect(scroll).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
});

test('returning to the homepage respects reduced motion despite the global smooth-scroll style', async () => {
  const query = vi.spyOn(window, 'matchMedia').mockImplementation(() => ({ matches: true }));
  restore.push(() => query.mockRestore());
  const router = renderCase('member-automation', '#system');
  scroll.mockClear();
  await act(async () => { await router.navigate('/', { state: { scrollTo: 'portfolio' } }); });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'instant' }));
});

test.each(anchorCases)('%s returns to the page top when history removes its anchor', async (slug, hash, label) => {
  const top = vi.spyOn(window, 'scrollTo');
  restore.push(() => top.mockRestore());
  const router = renderCase(slug);
  expect(top).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('link', { name: label }));
  top.mockClear();
  await act(async () => { await router.navigate(-1); });
  expect(top).toHaveBeenCalledTimes(1);
  expect(top).toHaveBeenCalledWith(0, 0);
});
