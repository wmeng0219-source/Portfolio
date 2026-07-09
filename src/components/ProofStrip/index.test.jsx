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
      name: '先给出你会继续往下看的理由',
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('region', {
      name: '先给出你会继续往下看的理由',
    }),
  ).toHaveAttribute('data-motion-section');
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: '先给出你会继续往下看的理由',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('第二幕 / 能力信号')).toBeInTheDocument();
  expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
  expect(screen.getByText('多角色协同推进')).toBeInTheDocument();
  expect(screen.getByText('设计与落地平衡')).toBeInTheDocument();
  expect(screen.getAllByText(/复杂业务梳理|多角色协同推进|设计与落地平衡/)).toHaveLength(3);
  expect(document.querySelectorAll('[data-motion-item]')).toHaveLength(3);
});
