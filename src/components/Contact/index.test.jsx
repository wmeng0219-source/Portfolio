import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Contact from './index';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else delete navigator.clipboard;
});
const renderWithClipboard = (clipboard) => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: clipboard });
  return render(<LanguageProvider><Contact /></LanguageProvider>);
};

test('announces success only after the clipboard operation completes', async () => {
  let finish;
  const writeText = vi.fn(() => new Promise(resolve => { finish = resolve; }));
  renderWithClipboard({ writeText });
  fireEvent.click(screen.getByRole('button', { name: 'wmeng219' }));
  expect(writeText).toHaveBeenCalledWith('wmeng219');
  expect(screen.getByRole('status')).not.toHaveTextContent('已复制');
  expect(screen.getByRole('button', { name: 'wmeng219' })).toBeDisabled();
  await act(async () => finish());
  expect(screen.getByRole('status')).toHaveTextContent('微信号已复制');
  expect(screen.getByRole('button', { name: 'wmeng219' })).toBeEnabled();
});

test('a rejected copy offers manual copying without reporting success', async () => {
  renderWithClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
  fireEvent.click(screen.getByRole('button', { name: 'wmeng219' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('复制失败'));
  expect(screen.getByRole('status')).toHaveTextContent('wmeng219');
  expect(screen.getByRole('status')).not.toHaveTextContent('已复制');
});

test('an unavailable clipboard retains the account and gives a manual-copy instruction', () => {
  renderWithClipboard(undefined);
  fireEvent.click(screen.getByRole('button', { name: 'wmeng219' }));
  expect(screen.getByRole('status')).toHaveTextContent('手动复制');
  expect(screen.getByRole('status')).toHaveTextContent('wmeng219');
});

test('keeps the existing WeChat button and email destination', () => {
  render(<LanguageProvider><Contact /></LanguageProvider>);
  expect(screen.getByRole('button', { name: 'wmeng219' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'wmeng0219@gmail.com' }))
    .toHaveAttribute('href', 'mailto:wmeng0219@gmail.com');
});
