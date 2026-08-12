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
    name: '精选案例',
  }).closest('section');

  expect(section).toHaveAttribute('data-motion-section');
  expect(section.querySelector('.portfolio-stage-grid')).toHaveAttribute('data-motion-group', 'portfolio-stage');
  expect(within(section).getByText('SELECTED WORK')).toBeInTheDocument();
  expect(
    within(section).getByText('三个复杂系统案例，展示我如何把流程、规则与协作重组为可执行产品。'),
  ).toBeInTheDocument();

  const cards = within(section).getAllByRole('link');
  expect(cards).toHaveLength(3);

  expect(within(section).getByText('MEMBER AUTOMATION')).toBeInTheDocument();
  expect(within(section).getByText('ORTHO FUNNEL')).toBeInTheDocument();
  expect(within(section).getByText('AI REVIEW LOOP')).toBeInTheDocument();

  expect(within(section).getByText('会员自动化与服务衔接')).toBeInTheDocument();
  expect(within(section).getByText('正畸筛查与状态管理')).toBeInTheDocument();
  expect(within(section).getByText('PACS 读片与 AI 辅助判断')).toBeInTheDocument();
  expect(within(section).getByText('规则系统重构')).toBeInTheDocument();
  expect(within(section).getByText('漏斗与角色协作')).toBeInTheDocument();
  expect(within(section).getByText('人机协作闭环')).toBeInTheDocument();

  expect(within(section).getByText('20+')).toBeInTheDocument();
  expect(within(section).getByText('50-60%')).toBeInTheDocument();
  expect(within(section).getByText('3.46 颗')).toBeInTheDocument();
  expect(within(section).getByText('+140%')).toBeInTheDocument();

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
  expect(globalStyles).toMatch(/\.portfolio-showcase-card[\s\S]*border-radius:\s*var\(--radius-card\)/);
  expect(globalStyles).toMatch(/\.portfolio-showcase-card:hover[\s\S]*translateY\(-2px\)/);
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
