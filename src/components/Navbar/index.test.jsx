import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Navbar from './index';

const mockMatchMedia = (matches) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

beforeEach(() => {
  mockMatchMedia(true);
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('removes closed mobile navigation links from the accessibility tree after selection', async () => {
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  expect(screen.queryByRole('link', { name: '关于' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '菜单' }));

  expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute('href', '#about');

  await user.click(screen.getByRole('link', { name: '关于' }));

  expect(screen.getByRole('button', { name: '菜单' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: '关于' })).not.toBeInTheDocument();
  expect(document.getElementById('primary-navigation')).toHaveAttribute('hidden');
  expect(document.getElementById('primary-navigation')).toHaveAttribute('aria-hidden', 'true');
});

test('defines a section anchor offset for the fixed navigation', () => {
  const globalStyles = readFileSync(path.resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

  expect(globalStyles).toContain(':where(section[id])');
  expect(globalStyles).toContain('scroll-margin-top: calc(var(--header-height) + 1rem);');
});
