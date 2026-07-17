import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';

const {
  fromTo,
  to,
  set,
  matchMediaAdd,
  matchMediaRevert,
  registerPlugin,
} = vi.hoisted(() => ({
  fromTo: vi.fn(),
  to: vi.fn(),
  set: vi.fn(),
  matchMediaAdd: vi.fn(),
  matchMediaRevert: vi.fn(),
  registerPlugin: vi.fn(),
}));

vi.mock('gsap', () => ({
  default: {
    registerPlugin,
    fromTo,
    to,
    set,
    matchMedia: () => ({
      add: matchMediaAdd,
      revert: matchMediaRevert,
    }),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

import { useHomepageMotion } from './useHomepageMotion';

const Harness = () => {
  const ref = useRef(null);
  useHomepageMotion(ref);

  return (
    <div ref={ref}>
      <section data-motion-section>
        <div data-motion-group="proof">
          <article data-motion-item data-motion-hover="card">
            proof
          </article>
        </div>
      </section>
    </div>
  );
};

const DenseStageHarness = () => {
  const ref = useRef(null);
  useHomepageMotion(ref);

  return (
    <div ref={ref}>
      <section data-motion-section>
        <div className="about-stage-grid" data-motion-group="about-stage-grid">
          <article data-motion-item data-motion-hover="card">
            context
          </article>
          <article data-motion-item data-motion-hover="card">
            structure
          </article>
        </div>
      </section>
    </div>
  );
};

const PortfolioHarness = () => {
  const ref = useRef(null);
  useHomepageMotion(ref);

  return (
    <div ref={ref}>
      <section data-motion-section>
        <div data-motion-group="portfolio-stage">
          <div data-motion-item="featured">lead</div>
          <div data-motion-group="portfolio-secondary">
            <article data-motion-item data-motion-hover="card">
              side-a
            </article>
            <article data-motion-item data-motion-hover="card">
              side-b
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

beforeEach(() => {
  fromTo.mockClear();
  to.mockClear();
  set.mockClear();
  matchMediaAdd.mockReset();
  matchMediaRevert.mockClear();
  registerPlugin.mockClear();
});

test('uses stronger reveal settings for proof chapter content', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<Harness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement)]),
    expect.objectContaining({ y: 36, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.08,
      scrollTrigger: expect.objectContaining({ start: 'top 88%' }),
    }),
  );
});

test('uses denser reveal settings for stage-based secondary sections', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<DenseStageHarness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement), expect.any(HTMLElement)]),
    expect.objectContaining({ y: 48, autoAlpha: 0 }),
    expect.objectContaining({
      duration: 0.92,
      stagger: 0.1,
      scrollTrigger: expect.objectContaining({ start: 'top 84%' }),
    }),
  );
});

test('registers desktop hover tweens for marked motion hover elements', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<Harness />);

  const hoverTarget = document.querySelector('[data-motion-hover="card"]');
  hoverTarget.dispatchEvent(new Event('pointerenter'));
  hoverTarget.dispatchEvent(new Event('pointerleave'));

  expect(to).toHaveBeenCalledWith(
    hoverTarget,
    expect.objectContaining({
      y: -6,
      duration: 0.24,
      ease: 'power2.out',
    }),
  );
  expect(to).toHaveBeenCalledWith(
    hoverTarget,
    expect.objectContaining({
      y: 0,
      duration: 0.22,
      ease: 'power2.out',
    }),
  );
});

test('keeps lead episode ahead of side episodes in portfolio reveal', () => {
  matchMediaAdd.mockImplementation((_queries, callback) => {
    callback({ conditions: { reduceMotion: false, isDesktop: true } });
  });

  render(<PortfolioHarness />);

  expect(fromTo).toHaveBeenCalledWith(
    expect.arrayContaining([expect.any(HTMLElement), expect.any(HTMLElement), expect.any(HTMLElement)]),
    expect.objectContaining({ y: 64, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.12,
      scrollTrigger: expect.objectContaining({ start: 'top 78%' }),
    }),
  );
});
