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

test('renders hero as a character introduction with name-first hierarchy', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByText('Meng Wen')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: '产品设计师与数字化实践者',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('我把复杂业务整理成团队能理解、能协作、能推进的产品结构。')).toBeInTheDocument();
  expect(
    screen.queryByText('不是把页面做得更复杂，而是把复杂业务整理得更清楚。'),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('data-motion-hover', 'button');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('data-motion-hover', 'button');
  expect(fromTo).toHaveBeenCalled();
  expect(to).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({
      yPercent: -8,
      scrollTrigger: expect.objectContaining({
        start: 'top top',
        end: 'bottom top',
      }),
    }),
  );
});
