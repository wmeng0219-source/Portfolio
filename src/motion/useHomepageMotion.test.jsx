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
          <a href="#proof" data-motion-item data-motion-hover="card">
            proof
          </a>
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
        <div className="about-stage-list" data-motion-group="about-stage-list">
          <a href="#context" data-motion-item data-motion-hover="card">
            context
          </a>
          <a href="#structure" data-motion-item data-motion-hover="card">
            structure
          </a>
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
            <a href="#side-a" data-motion-item data-motion-hover="card">
              side-a
            </a>
            <a href="#side-b" data-motion-item data-motion-hover="card">
              side-b
            </a>
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
    expect.objectContaining({ y: 18, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.05,
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
    expect.objectContaining({ y: 20, autoAlpha: 0 }),
    expect.objectContaining({
      duration: 0.62,
      stagger: 0.05,
      scrollTrigger: expect.objectContaining({ start: 'top 86%' }),
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
      y: -2,
      duration: 0.18,
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
    expect.objectContaining({ y: 28, autoAlpha: 0 }),
    expect.objectContaining({
      stagger: 0.06,
      scrollTrigger: expect.objectContaining({ start: 'top 84%' }),
    }),
  );
});
