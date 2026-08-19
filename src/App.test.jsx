import { render, screen, fireEvent, within } from '@testing-library/react';
import { HashRouter, MemoryRouter } from 'react-router-dom';
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

  const gsapMock = {
    registerPlugin: () => {},
    context,
    fromTo,
    to,
    matchMedia: () => ({
      add: matchMediaAdd,
      revert: matchMediaRevert,
    }),
    utils: {
      toArray: () => [],
    },
  };

  return {
    default: gsapMock,
    gsap: gsapMock,
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
      name: /WEN MENG/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /查看精选项目/ })).toHaveAttribute('href', '#portfolio');

  const experienceSection = screen.getByRole('heading', {
    level: 2,
    name: /职业历程/i,
  }).closest('section');
  expect(experienceSection).toHaveAttribute('data-motion-section');
  expect(within(experienceSection).getByText(/02 \/ CAREER PATH/i)).toBeInTheDocument();
  expect(within(experienceSection).getByText('2019 – 2020')).toBeInTheDocument();
  expect(within(experienceSection).getByText('2023 – 至今')).toBeInTheDocument();
  expect(within(experienceSection).getByText('界面设计')).toBeInTheDocument();
  expect(within(experienceSection).getByText('设计规范')).toBeInTheDocument();
  expect(within(experienceSection).getByText('组件体系')).toBeInTheDocument();
  expect(experienceSection.querySelector('.growth-path')).not.toBeNull();
  expect(experienceSection.querySelectorAll('.growth-path-node')).toHaveLength(4);

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: /精选项目 · 复杂业务系统实践/i,
  }).closest('section');
  expect(portfolioSection).toHaveAttribute('data-motion-section');
  expect(within(portfolioSection).getByText(/01 \/ SELECTED WORK/i)).toBeInTheDocument();
  const caseLinks = within(portfolioSection).getAllByRole('link');
  expect(caseLinks).toHaveLength(3);
  expect(within(portfolioSection).getByText('会员与收银自动化')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('正畸筛查与协作工作流')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('PACS 影像 AI 辅助读片')).toBeInTheDocument();

  const contactSection = screen.getByRole('heading', {
    level: 2,
    name: /联系我/i,
  }).closest('section');
  expect(contactSection).toHaveAttribute('data-motion-section');
  expect(within(contactSection).getByText(/03 \/ CONTACT/i)).toBeInTheDocument();
  expect(within(contactSection).getByRole('link', { name: /wmeng0219@gmail.com/i })).toHaveAttribute(
    'href',
    'mailto:wmeng0219@gmail.com',
  );
});

test('toggles language to English seamlessly across navbar, hero, portfolio, and contact', () => {
  render(
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>,
  );

  const langBtns = screen.getAllByRole('button', { name: /EN/i });
  fireEvent.click(langBtns[0]);

  expect(screen.getByText('Explore Work')).toBeInTheDocument();
  expect(screen.getByText('Membership & Automated Billing')).toBeInTheDocument();
  expect(screen.getByText('Orthodontic Screening & Handoff')).toBeInTheDocument();
  expect(screen.getByText('PACS AI-Assisted Reading & QA')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /^Contact$/i })).toBeInTheDocument();
});

test('renders case studies and handles invalid project ID 404 fallback', () => {
  const { unmount } = render(
    <MemoryRouter initialEntries={['/project/member-automation']}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText(/MEMBER AUTOMATION/i)).toBeInTheDocument();
  unmount();

  const { unmount: unmount2 } = render(
    <MemoryRouter initialEntries={['/project/orthodontics']}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText(/正畸筛查与状态管理/i)).toBeInTheDocument();
  unmount2();

  render(
    <MemoryRouter initialEntries={['/project/unknown-id']}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
  expect(screen.getByText('未找到该案例')).toBeInTheDocument();
});
