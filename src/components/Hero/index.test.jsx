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

test('renders hero as a gsap-inspired brand stage with a single primary entry', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByText('数字化产品系统 / 2025')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /让复杂.*业务系统.*变得清晰.*可被落地/,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('为复杂业务构建清晰、可执行、可扩展的产品系统。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('data-motion-hover', 'button');
  expect(screen.getByText('FLOW')).toBeInTheDocument();
  expect(screen.getByText('RULES')).toBeInTheDocument();
  expect(screen.getByText('ROLE MAP')).toBeInTheDocument();
  expect(fromTo).toHaveBeenCalled();
  expect(to).toHaveBeenCalledTimes(2);
  expect(to.mock.calls[1][1]).toEqual(
    expect.objectContaining({
      y: -10,
      duration: 5.6,
      repeat: -1,
      yoyo: true,
    }),
  );
});
