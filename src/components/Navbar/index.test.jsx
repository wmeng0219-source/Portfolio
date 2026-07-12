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

  expect(screen.queryByRole('link', { name: '方法' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '菜单' }));

  expect(screen.getByRole('link', { name: '方法' })).toHaveAttribute('href', '#about');
  expect(screen.getByRole('link', { name: '路径' })).toHaveAttribute('href', '#experience');
  expect(screen.getByRole('link', { name: '案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '联系' })).toHaveAttribute('href', '#contact');

  await user.click(screen.getByRole('link', { name: '方法' }));

  expect(screen.getByRole('button', { name: '菜单' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: '方法' })).not.toBeInTheDocument();
  expect(document.getElementById('primary-navigation')).toHaveAttribute('hidden');
  expect(document.getElementById('primary-navigation')).toHaveAttribute('aria-hidden', 'true');
});

test('returns focus to the menu button after activating a mobile navigation item', async () => {
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  const menuButton = screen.getByRole('button', { name: '菜单' });
  await user.click(menuButton);

  await user.tab();

  const aboutLink = screen.getByRole('link', { name: '方法' });
  expect(aboutLink).toHaveFocus();

  await user.keyboard('{Enter}');

  expect(menuButton).toHaveFocus();
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('marks navbar links and language button for motion hover hooks', async () => {
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  await user.click(screen.getByRole('button', { name: '菜单' }));

  expect(screen.getByRole('link', { name: '方法' })).toHaveAttribute('data-motion-hover', 'nav');
  expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('data-motion-hover', 'button');
});

test('defines a section anchor offset for the fixed navigation', () => {
  const globalStyles = readFileSync(path.resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

  expect(globalStyles).toContain(':where(section[id])');
  expect(globalStyles).toContain('scroll-margin-top: calc(var(--header-height) + 1rem);');
});
