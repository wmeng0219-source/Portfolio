import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import Portfolio from './index';

test('renders portfolio as a showcase stage with one lead card and two supporting cards', async () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );

  const section = screen.getByRole('heading', {
    level: 2,
    name: /精选项目/i,
  }).closest('section');

  expect(section).toHaveAttribute('data-motion-section');
  expect(section.querySelector('.portfolio-stage-grid')).toHaveAttribute('data-motion-group', 'portfolio-stage');
  expect(within(section).getByText(/SELECTED WORK/i)).toBeInTheDocument();

  const cards = within(section).getAllByRole('link');
  expect(cards).toHaveLength(3);

  expect(within(section).getByText('会员与收银自动化')).toBeInTheDocument();
  expect(within(section).getByText('正畸筛查与协作工作流')).toBeInTheDocument();
  expect(within(section).getByText('PACS 影像 AI 辅助读片')).toBeInTheDocument();

  expect(cards[0]).toHaveAttribute('href', '#/project/member-automation');
  expect(cards[1]).toHaveAttribute('href', '#/project/orthodontics');
  expect(cards[2]).toHaveAttribute('href', '#/project/pacs-ai');
  expect(within(section).getAllByText(/VIEW CASE/i)).toHaveLength(3);
});

test('portfolio cards use semantic classes backed by the shared card contract', () => {
  const source = readFileSync(path.resolve(process.cwd(), 'src/components/Portfolio/index.jsx'), 'utf8');
  const globalStyles = readFileSync(path.resolve(process.cwd(), 'src/styles/global.css'), 'utf8');

  expect(source).toContain('portfolio-showcase-card');
  expect(source).not.toContain('hover:-translate-y-1');
  expect(globalStyles).toMatch(/\.portfolio-showcase-card[\s\S]*border-radius:\s*var\(--radius-folder\)/);
  expect(globalStyles).toMatch(/\.portfolio-showcase-card:hover[\s\S]*translateY\(-2px\)/);
  expect(globalStyles).toMatch(/\.portfolio-showcase-card-title[\s\S]*background-clip:\s*text/);
});

test('renders three distinct system-blueprint covers for the project mechanisms', () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </HashRouter>,
  );

  expect(screen.getByLabelText('会员自动化规则引擎')).toBeInTheDocument();
  expect(screen.getByLabelText('正畸筛查状态漏斗')).toBeInTheDocument();
  expect(screen.getByLabelText('PACS 人机复核闭环')).toBeInTheDocument();
  expect(screen.getByText('RULE_ENGINE')).toBeInTheDocument();
  expect(screen.getByText('RE-ENTRY ENABLED')).toBeInTheDocument();
  expect(screen.getByText('DOCTOR_VERIFIED')).toBeInTheDocument();
});
