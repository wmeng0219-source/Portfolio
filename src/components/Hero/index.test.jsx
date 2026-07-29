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

test('renders hero with MENG WEN title and dual action buttons matching Figma design', () => {
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
      name: 'MENG WEN',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('产品经理与设计复合型实践者。聚焦医疗数字化、流程重构与AI协作，在混乱的真实业务现场中，建立可执行、可观察的系统闭环。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看项目' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact');
  expect(fromTo).toHaveBeenCalled();
});
