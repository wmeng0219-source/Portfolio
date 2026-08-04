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
    path.resolve(process.cwd(), 'src/pages/ProjectDetail/OrthodonticsCase.module.css'),
    'utf8',
  );

  expect(projectDetailStyles).toContain('.backLink:focus-visible');
  expect(orthodonticsStyles).toContain('.roleTab:focus-visible');
});
