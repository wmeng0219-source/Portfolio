import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import ProofStrip from './index';

test('renders three proof items', () => {
  render(
    <LanguageProvider>
      <ProofStrip />
    </LanguageProvider>,
  );

  expect(screen.getByText('复杂业务梳理')).toBeInTheDocument();
  expect(screen.getByText('多角色协同推进')).toBeInTheDocument();
  expect(screen.getByText('设计与落地平衡')).toBeInTheDocument();
});
