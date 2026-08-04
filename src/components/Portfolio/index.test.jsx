import { render, screen, within } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import Portfolio from './index';

test('renders portfolio as a showcase stage with one lead card and two supporting cards', () => {
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
  expect(within(section).getByText('+140%')).toBeInTheDocument();

  expect(cards[0]).toHaveAttribute('href', '#/project/member-automation');
  expect(cards[1]).toHaveAttribute('href', '#/project/orthodontics');
  expect(cards[2]).toHaveAttribute('href', '#/project/pacs-ai');
  expect(within(section).getAllByText(/VIEW CASE/i)).toHaveLength(3);
});
