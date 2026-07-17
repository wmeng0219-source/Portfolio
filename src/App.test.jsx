import { render, screen, within } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

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

test('renders homepage sections with updated responsibilities and portfolio emphasis', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>,
  );

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /让复杂.*业务系统.*变得清晰.*可被落地/,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看精选案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByText('数字化产品系统 / 2025')).toBeInTheDocument();
  expect(screen.getByText('为复杂业务构建清晰、可执行、可扩展的产品系统。')).toBeInTheDocument();

  const aboutSection = screen.getByRole('heading', {
    level: 2,
    name: '把复杂业务变成可执行系统',
  }).closest('section');
  expect(aboutSection).toHaveAttribute('data-motion-section');
  expect(within(aboutSection).getByText('METHOD SYSTEM')).toBeInTheDocument();
  expect(within(aboutSection).getByText('Context')).toBeInTheDocument();
  expect(within(aboutSection).getByText('Structure')).toBeInTheDocument();
  expect(within(aboutSection).getByText('AI Workflow')).toBeInTheDocument();

  const experienceSection = screen.getByRole('heading', {
    level: 2,
    name: '从设计执行到系统判断',
  }).closest('section');
  expect(experienceSection).toHaveAttribute('data-motion-section');
  expect(within(experienceSection).getByText('PHASE SHOWCASE')).toBeInTheDocument();
  expect(within(experienceSection).getByText('2019 - 2020')).toBeInTheDocument();
  expect(within(experienceSection).getByText('2023.04 - 至今')).toBeInTheDocument();
  expect(within(experienceSection).getByText('界面与系统基础')).toBeInTheDocument();
  expect(within(experienceSection).getByText('连接业务与交付')).toBeInTheDocument();

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: '精选案例',
  }).closest('section');
  expect(portfolioSection).toHaveAttribute('data-motion-section');
  expect(within(portfolioSection).getByText('SELECTED WORK')).toBeInTheDocument();
  expect(portfolioSection.querySelector('.portfolio-stage')).toHaveAttribute('data-motion-group', 'portfolio-stage');
  const caseLinks = within(portfolioSection).getAllByRole('link');
  expect(caseLinks).toHaveLength(3);
  expect(within(portfolioSection).getByText('会员自动化与服务衔接')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('正畸筛查与状态管理')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('PACS 读片与 AI 辅助判断')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('规则系统重构')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('漏斗与角色协作')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('人机协作闭环')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('RULE SYSTEM')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('FLOW REBUILD')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('HUMAN + AI')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('20+')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('50-60%')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('+140%')).toBeInTheDocument();

  const contactSection = screen.getByRole('heading', {
    level: 2,
    name: '如果你要推进复杂产品，就来联系我。',
  }).closest('section');
  expect(contactSection).toHaveAttribute('data-motion-section');
  expect(within(contactSection).getByText("LET'S BUILD")).toBeInTheDocument();
  const links = within(contactSection).getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(within(contactSection).getByRole('link', { name: 'wmeng0219@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:wmeng0219@gmail.com',
  );
});
