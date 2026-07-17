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

  expect(screen.getByText('DIGITAL PRODUCT SYSTEMS / 2025')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /Complex.*Systems.*Into Clear.*Execution/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('为复杂业务构建清晰、可执行、可扩展的产品系统。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('data-motion-hover', 'button');
  expect(fromTo).toHaveBeenCalled();
  expect(to).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({
      yPercent: -10,
      scrollTrigger: expect.objectContaining({
        start: 'top top',
        end: 'bottom top',
      }),
    }),
  );
});
