import { render, screen, within } from '@testing-library/react';
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
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );

  const proofSection = screen.getByRole('region', { name: '先给出你会继续往下看的理由' });
  expect(proofSection).toHaveAttribute('data-motion-section');
  expect(within(proofSection).queryByRole('link')).not.toBeInTheDocument();
  expect(proofSection.querySelectorAll('[data-motion-item]')).toHaveLength(3);

  const aboutSection = screen.getByRole('heading', {
    level: 2,
    name: '把复杂业务翻译成团队可协作的产品结构',
  }).closest('section');
  expect(aboutSection).toHaveAttribute('data-motion-section');
  expect(within(aboutSection).getByText('角色定位')).toBeInTheDocument();
  expect(within(aboutSection).getByText('问题类型')).toBeInTheDocument();
  expect(within(aboutSection).getByText('工作方式')).toBeInTheDocument();

  const experienceSection = screen.getByRole('heading', {
    level: 2,
    name: '从设计执行走到复杂业务协同。',
  }).closest('section');
  expect(experienceSection).toHaveAttribute('data-motion-section');
  expect(within(experienceSection).getByText('设计基础')).toBeInTheDocument();
  expect(within(experienceSection).getByText('复杂产品')).toBeInTheDocument();
  expect(within(experienceSection).getByText('产品与落地')).toBeInTheDocument();

  const portfolioSection = screen.getByRole('heading', {
    level: 2,
    name: '主线篇章：代表作',
  }).closest('section');
  expect(portfolioSection).toHaveAttribute('data-motion-section');
  expect(within(portfolioSection).getByText('主篇章')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('侧篇章')).toBeInTheDocument();
  const featuredCard = within(portfolioSection).getByText('主篇章').closest('article');
  expect(featuredCard).toHaveAttribute('data-motion-item', 'featured');
  expect(within(featuredCard).getByRole('heading', { name: '正畸筛查与状态管理' })).toBeInTheDocument();
  expect(within(portfolioSection).getByText('会员自动化与服务衔接')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('PACS 读片与 AI 辅助判断')).toBeInTheDocument();

  const contactSection = screen.getByRole('heading', {
    level: 2,
    name: '如果你正在推进复杂业务产品，我们可以聊聊。',
  }).closest('section');
  expect(contactSection).toHaveAttribute('data-motion-section');
  const links = within(contactSection).getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(within(contactSection).getByRole('link', { name: '发送邮件' })).toHaveAttribute(
    'href',
    'mailto:meng.wen@orangedental.cn',
  );
  expect(within(contactSection).getByRole('link', { name: '回到顶部' })).toHaveAttribute(
    'href',
    '#hero',
  );
});
