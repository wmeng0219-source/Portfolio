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
      name: /MENG WEN/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /查看项目/ })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByText(/产品经理与设计复合型实践者/)).toBeInTheDocument();

  const aboutSection = screen.getByRole('heading', {
    level: 2,
    name: '把复杂业务变成可执行系统',
  }).closest('section');
  expect(aboutSection).toHaveAttribute('data-motion-section');

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: '精选案例',
  }).closest('section');
  expect(portfolioSection).toHaveAttribute('data-motion-section');
  expect(within(portfolioSection).getByText('SELECTED WORK')).toBeInTheDocument();
  const caseLinks = within(portfolioSection).getAllByRole('link');
  expect(caseLinks).toHaveLength(3);
  expect(within(portfolioSection).getByText('会员自动化与服务衔接')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('正畸筛查与状态管理')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('PACS 读片与 AI 辅助判断')).toBeInTheDocument();

  const contactSection = screen.getByRole('heading', {
    level: 2,
    name: '如果你要推进复杂产品，就来联系我。',
  }).closest('section');
  expect(contactSection).toHaveAttribute('data-motion-section');
  expect(within(contactSection).getByRole('link', { name: 'wmeng0219@gmail.com' })).toHaveAttribute(
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

  expect(screen.getByText('View Projects')).toBeInTheDocument();
  expect(screen.getByText('Member automation and service continuity')).toBeInTheDocument();
  expect(screen.getByText('Orthodontic screening and status management')).toBeInTheDocument();
  expect(screen.getByText('PACS interpretation and AI-assisted review')).toBeInTheDocument();
  expect(screen.getByText("Let’s Build What Complex Teams Can Actually Use")).toBeInTheDocument();
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
