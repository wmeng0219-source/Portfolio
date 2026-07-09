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
      name: '能力证据',
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: '能力证据',
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
  expect(screen.getByText('多角色协同推进')).toBeInTheDocument();
  expect(screen.getByText('设计与落地平衡')).toBeInTheDocument();
});
