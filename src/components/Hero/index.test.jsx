import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Hero from './index';

const {
  fromTo,
  to,
  matchMediaAdd,
  matchMediaRevert,
} = vi.hoisted(() => ({
  fromTo: vi.fn(),
  to: vi.fn(),
  matchMediaAdd: vi.fn(),
  matchMediaRevert: vi.fn(),
}));

vi.mock('gsap', () => {
  const context = (callback) => {
    callback();
    return { revert: () => {} };
  };

  return {
    default: {
      registerPlugin: () => {},
      context,
      fromTo,
      to,
      matchMedia: () => ({
        add: matchMediaAdd,
        revert: matchMediaRevert,
      }),
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

test('renders hero with WEN MENG title and dual action buttons matching design spec', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /WEN MENG/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /查看精选项目/ })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: /查看精选项目/ })).toHaveAttribute('data-motion-hover', 'button');
  expect(fromTo).toHaveBeenCalled();
});
