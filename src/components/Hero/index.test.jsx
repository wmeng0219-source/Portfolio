import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import Hero from './index';

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

test('renders hero as a lighter cover with a compact episode preview', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(screen.getByText('Meng Wen')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: '产品经理与设计复合型实践者',
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('从复杂 B 端产品设计出发，连接业务、产品、流程与数字化建设。'),
  ).toBeInTheDocument();
  expect(screen.getByText('医疗数字化')).toBeInTheDocument();
  expect(screen.getByText('流程设计')).toBeInTheDocument();
  expect(screen.getByText('AI 工作流实践')).toBeInTheDocument();
  expect(
    screen.queryByText('从这里开始，你看到的不是一组模块，而是一个设计师如何进入复杂问题、建立协作、推动落地。'),
  ).not.toBeInTheDocument();
  expect(screen.getByText('人物登场之后，再进入方法、能力与代表项目。')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('href', '#portfolio');
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('data-motion-hover', 'button');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', '#contact');
  expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('data-motion-hover', 'button');
  expect(fromTo).toHaveBeenCalled();
  expect(to).toHaveBeenCalledWith(
    expect.any(HTMLElement),
    expect.objectContaining({
      yPercent: -8,
      scrollTrigger: expect.objectContaining({
        start: 'top top',
        end: 'bottom top',
      }),
    }),
  );
});
