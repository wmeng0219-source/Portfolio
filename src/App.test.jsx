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
  expect(within(portfolioSection).getByText('主篇章').closest('.portfolio-stage')).toHaveAttribute(
    'data-motion-group',
    'portfolio-stage',
  );
  expect(within(portfolioSection).getByText('主篇章')).toBeInTheDocument();
  expect(within(portfolioSection).getByText('侧篇章')).toBeInTheDocument();
  const featuredCard = within(portfolioSection).getByText('主篇章').closest('article');
  expect(featuredCard).toHaveAttribute('data-motion-item', 'featured');
  expect(within(featuredCard).getByText('主流程重构 / 筛查机制')).toBeInTheDocument();
  expect(within(featuredCard).getByRole('heading', { name: '正畸筛查与状态管理' })).toBeInTheDocument();
  expect(
    within(featuredCard).getByText('原有正畸前置管理依赖面评会与线下沟通，筛查、结论和后续推进缺少连续承接。'),
  ).toBeInTheDocument();
  expect(
    within(featuredCard).getByText('我把推荐逻辑、再筛查机制、正畸状态与多角色协作整理进同一条系统流程。'),
  ).toBeInTheDocument();
  expect(
    within(featuredCard).getByText('最终建立了从推荐到预约的可追踪漏斗，让前置管理第一次成为连续机制。'),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText('会员、卡券、收费和账单彼此独立，一线靠经验操作，财务靠人工核对。'),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText('我梳理会员卡、优惠、收费与对账关系，并把高频会员流程改成系统自动承接。'),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText('纯人工读片缺少系统留痕与质控，拍片利用率和诊断行为都无法追踪。'),
  ).toBeInTheDocument();
  expect(
    within(portfolioSection).getByText('我先把读片变成结构化记录流程，再建立 AI 标记、医生复核、差异回收的人机协作机制。'),
  ).toBeInTheDocument();
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
