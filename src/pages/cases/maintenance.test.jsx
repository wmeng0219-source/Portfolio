import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import ScrollToTop from '../../components/ScrollToTop';
import PacsAi from './PacsAi';
import MemberAutomation from './MemberAutomation';
import { pacsCaseSections } from './PacsAi/content';

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

test('PACS solution anchors and target styling survive editorial title and percentage changes', () => {
  const solution = pacsCaseSections.find(({ id }) => id === 'solution').zh;
  const target = pacsCaseSections.find(({ id }) => id === 'impact').zh.find((block) => block.text?.includes('60%'));
  const oldText = target.text;
  const headings = solution.filter((block) => block.text?.match(/^4\.[123]/));
  headings.forEach((block, index) => {
    const text = block.text;
    restore.push(() => { block.text = text; });
    block.text = `Edited solution ${index + 1}`;
  });
  restore.push(() => { target.text = oldText; });
  target.text = oldText.replace('60%', '65%');
  renderCase('pacs-ai');
  headings.forEach((block, index) => {
    expect(screen.getByRole('heading', { name: block.text })).toHaveAttribute('id', `solution-${index + 1}`);
  });
  expect(screen.getByText(/65%/).closest('p').className).toContain('readingTarget');
});

test('PACS judgment links retain their destinations when an editorial heading is inserted', () => {
  const blocks = pacsCaseSections.find(({ id }) => id === 'thinking').zh;
  blocks.splice(1, 0, { type: 'heading', level: 3, text: 'Editorial context' });
  restore.push(() => { blocks.splice(1, 1); });
  renderCase('pacs-ai');
  expect(screen.getAllByRole('link', { name: /^4\.[123] →$/ }).map((link) => link.hash)).toEqual([
    '#solution-1', '#solution-2', '#solution-3',
  ]);
});

const anchorCases = [
  ['pacs-ai', '#system', /系统机制/, 'system-title'],
  ['member-automation', '#impact', /项目结果与边界/, 'impact'],
];

test.each(anchorCases)('%s owns one scroll and focus per anchor navigation, including repeat and history', async (slug, hash, label, targetId) => {
  const router = renderCase(slug, hash);
  const focusTarget = document.getElementById(targetId);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement).toBe(focusTarget);
  const link = screen.getByRole('link', { name: label });
  scroll.mockClear();
  fireEvent.click(link);
  expect(scroll).toHaveBeenCalledTimes(1);
  scroll.mockClear();
  fireEvent.click(screen.getByRole('link', { name: /问题/ }));
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
