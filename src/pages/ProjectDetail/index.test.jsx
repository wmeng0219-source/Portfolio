import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import ProjectDetail from './index';

const {
  fromTo,
  to,
  matchMediaAdd,
  matchMediaRevert,
  scrollTriggerCreate,
} = vi.hoisted(() => ({
  fromTo: vi.fn(),
  to: vi.fn(),
  matchMediaAdd: vi.fn(),
  matchMediaRevert: vi.fn(),
  scrollTriggerCreate: vi.fn(),
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
      utils: {
        toArray: (value) => {
          if (typeof value === 'string') {
            return Array.from(document.querySelectorAll(value));
          }

          if (value && typeof value.length === 'number') {
            return Array.from(value);
          }

          return value ? [value] : [];
        },
      },
    },
    gsap: {
      registerPlugin: () => {},
      context,
      fromTo,
      to,
      matchMedia: () => ({
        add: matchMediaAdd,
        revert: matchMediaRevert,
      }),
      utils: {
        toArray: (value) => {
          if (typeof value === 'string') {
            return Array.from(document.querySelectorAll(value));
          }

          if (value && typeof value.length === 'number') {
            return Array.from(value);
          }

          return value ? [value] : [];
        },
      },
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: scrollTriggerCreate,
  },
}));

const renderProjectDetail = (initialEntry) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );

test('orthodontics role tabs expose pressed state and update selection after click', async () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  const user = userEvent.setup();
  renderProjectDetail('/project/orthodontics');

  const nurseTab = screen.getByRole('tab', { name: '护士' });
  const pedoTab = screen.getByRole('tab', { name: '儿牙医生' });

  expect(nurseTab).toHaveAttribute('aria-pressed', 'true');
  expect(pedoTab).toHaveAttribute('aria-pressed', 'false');

  await user.click(pedoTab);

  expect(nurseTab).toHaveAttribute('aria-pressed', 'false');
  expect(pedoTab).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('tabpanel', { name: '儿牙医生' })).toHaveTextContent(/转诊费激励/);
});

test('pacs detail images define explicit dimensions to reduce layout shift', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  renderProjectDetail('/project/pacs-ai');

  const heroImage = screen.getByRole('img', { name: 'PACS AI UI' });
  const flowImage = screen.getByRole('img', { name: '读片状态与病历同步' });
  const solutionImage = screen.getByRole('img', { name: '读片基础功能 (V1)' });

  expect(heroImage).toHaveAttribute('width');
  expect(heroImage).toHaveAttribute('height');
  expect(flowImage).toHaveAttribute('width');
  expect(flowImage).toHaveAttribute('height');
  expect(heroImage.getAttribute('src')).not.toContain('/Portfolio/Portfolio/');
  expect(solutionImage.getAttribute('src')).not.toContain('/Portfolio/Portfolio/');
});

test('pacs detail renders sequential reading sections instead of scroll-stage containers', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  const { container } = renderProjectDetail('/project/pacs-ai');

  expect(screen.getByText('项目背景与挑战')).toBeInTheDocument();
  expect(screen.getByText('迭代路径')).toBeInTheDocument();
  expect(screen.getByText('关键方案')).toBeInTheDocument();
  expect(screen.getByText('关键设计判断')).toBeInTheDocument();
  expect(container.querySelector('[class*="iterationList"]')).not.toBeNull();
  expect(container.querySelector('[class*="decisionList"]')).not.toBeNull();
  expect(container.querySelector('[class*="panTrack"]')).toBeNull();
  expect(container.querySelector('[class*="stackContainer"]')).toBeNull();
});

test('detail page styles include visible focus treatment for back link and role tabs', () => {
  const projectDetailStyles = readFileSync(
    path.resolve(process.cwd(), 'src/pages/ProjectDetail/ProjectDetail.module.css'),
    'utf8',
  );
  const orthodonticsStyles = readFileSync(
    path.resolve(process.cwd(), 'src/pages/cases/Orthodontics/Orthodontics.module.css'),
    'utf8',
  );

  expect(projectDetailStyles).toContain('.backLink:focus-visible');
  expect(orthodonticsStyles).toContain('.roleTab:focus-visible');
});

test('case studies share the portfolio layout, typography, radius, and motion contract', () => {
  const variables = readFileSync(
    path.resolve(process.cwd(), 'src/styles/variables.css'),
    'utf8',
  );
  const caseStylePaths = [
    'src/pages/cases/MemberAutomation/MemberAutomation.module.css',
    'src/pages/cases/Orthodontics/Orthodontics.module.css',
    'src/pages/cases/PacsAi/PacsAi.module.css',
    'src/pages/cases/PreVisitEngine/PreVisitEngine.module.css',
  ];
  const caseStyles = caseStylePaths.map((file) => readFileSync(path.resolve(process.cwd(), file), 'utf8'));

  expect(variables).toMatch(/--content-max:\s*1320px/);
  expect(variables).toContain("--font-display: 'Anton'");
  expect(variables).toContain("--font-body: 'Hanken Grotesk'");
  expect(variables).toContain("--font-serif: 'Merriweather'");
  expect(variables).toContain("--font-mono: 'IBM Plex Mono'");
  expect(variables).toMatch(/--case-page-pad-x:\s*clamp\(/);
  expect(variables).toMatch(/--case-section-pad-y:\s*clamp\(/);
  expect(variables).toMatch(/--text-case-h1:\s*clamp\(/);
  expect(variables).toMatch(/--text-case-h2:\s*clamp\(/);
  expect(variables).toMatch(/--text-case-h3:\s*clamp\(/);
  expect(variables).toMatch(/--text-case-body:\s*clamp\(/);
  expect(variables).toMatch(/--text-case-label:\s*clamp\(/);
  expect(variables).toMatch(/--radius-card:\s*16px/);
  expect(variables).toMatch(/--radius-control:\s*12px/);

  caseStyles.forEach((css) => {
    expect(css).toContain('var(--content-max)');
    expect(css).toContain('var(--text-case-h2)');
    expect(css).toContain('var(--text-case-body)');
    expect(css).toContain('var(--radius-card)');
    expect(css).toContain('translateY(-2px)');
    expect(css).not.toContain('max-width: 1000px');
    expect(css).not.toContain('border-radius: 18px');
    expect(css).not.toContain('translateY(-4px)');
  });
});

test('orthodontics presents the verified rollout, ownership, iteration decision, and comparison scope', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  renderProjectDetail('/project/orthodontics');

  expect(screen.getByText('2025.04')).toBeInTheDocument();
  expect(screen.getByText('2026.02')).toBeInTheDocument();
  expect(screen.getAllByText(/全门店正式上线/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/独立完成门诊调研/).length).toBeGreaterThan(0);
  expect(screen.getByText(/产品减法/)).toBeInTheDocument();
  expect(screen.getAllByText(/2025 年 2—4 月与 2026 年 2—4 月/).length).toBeGreaterThan(0);
  expect(screen.getByText('54990')).toBeInTheDocument();
});

test('member automation states the final upgrade rule and distinguishes measured from estimated outcomes', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  renderProjectDetail('/project/member-automation');

  expect(screen.getByText(/只要会员卡仍在有效期内即可升级/)).toBeInTheDocument();
  expect(screen.getAllByText(/门店现场实测/).length).toBeGreaterThan(0);
  expect(screen.getByText(/据财务团队估算/)).toBeInTheDocument();
  expect(screen.getByText(/失败时保留原会员卡与原权益/)).toBeInTheDocument();
});

test('pacs renders 2024.11 AI launch and pre/post baseline comparison', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  renderProjectDetail('/project/pacs-ai');

  expect(screen.getAllByText('2024.06').length).toBeGreaterThan(0);
  expect(screen.getAllByText('2025.06').length).toBeGreaterThan(0);
  expect(screen.getAllByText('2024.11 上线').length).toBeGreaterThan(0);
  expect(screen.getByText(/AI 辅助功能于 2024.11 正式上线/)).toBeInTheDocument();
  expect(screen.queryByText(/100% 留痕/)).not.toBeInTheDocument();
  expect(screen.queryByText('3.0s')).not.toBeInTheDocument();
  expect(screen.queryByText('< 100ms')).not.toBeInTheDocument();
});

test('pre-visit engine renders panoramic views, tooth quadrant ergonomics and structured task bundles', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: false } });
  });

  renderProjectDetail('/project/pre-visit-engine');

  expect(screen.getByText(/接诊全流程预习与任务编排引擎/)).toBeInTheDocument();
  expect(screen.getAllByText(/打通孤岛系统/).length).toBeGreaterThan(0);
  expect(screen.getByText(/结构化任务包分层模型/)).toBeInTheDocument();
  expect(screen.getByText(/十字象限牙位选择控件/)).toBeInTheDocument();
  expect(screen.getByText(/复盘反思与未解局限/)).toBeInTheDocument();
});
