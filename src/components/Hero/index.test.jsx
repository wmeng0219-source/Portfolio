import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Hero from './index';

vi.mock('gsap', () => {
  const context = (callback) => {
    callback();
    return { revert: () => {} };
  };

  return {
    default: {
      registerPlugin: () => {},
      context,
      fromTo: () => {},
      to: () => {},
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

test('renders the value proposition hero with new contract content', () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: '把复杂业务整理成可理解、可协作、可落地的产品体验',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('Meng Wen')).toBeInTheDocument();
  expect(screen.getByText('产品设计师与数字化实践者')).toBeInTheDocument();
  expect(screen.getByText('不是把页面做得更复杂，而是把复杂业务整理得更清楚。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact');
});
