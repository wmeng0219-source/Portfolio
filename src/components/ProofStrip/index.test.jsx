import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import ProofStrip from './index';

test('renders a labeled proof section with three proof items', () => {
  render(
    <LanguageProvider>
      <ProofStrip />
    </LanguageProvider>,
  );

  expect(
    screen.getByRole('region', {
      name: '继续往下看的三个理由',
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('region', {
      name: '继续往下看的三个理由',
    }),
  ).toHaveAttribute('data-motion-section');
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: '继续往下看的三个理由',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('第二幕 / 能力信号')).toBeInTheDocument();
  expect(screen.getByText('先把复杂问题看清')).toBeInTheDocument();
  expect(screen.getByText('让多角色协作真正推进')).toBeInTheDocument();
  expect(screen.getByText('兼顾表达质量与真实交付')).toBeInTheDocument();
  expect(screen.getAllByText(/先把复杂问题看清|让多角色协作真正推进|兼顾表达质量与真实交付/)).toHaveLength(3);
  expect(document.querySelectorAll('[data-motion-item]')).toHaveLength(3);
});
