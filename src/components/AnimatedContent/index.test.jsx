import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "./index";

vi.mock("gsap", () => {
  const api = {
    context: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(),
    fromTo: vi.fn(),
    registerPlugin: vi.fn(),
  };
  return { default: api, gsap: api };
});
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { create: vi.fn() } }));

let media;
let revert;
let timeline;
beforeEach(() => {
  vi.clearAllMocks();
  revert = vi.fn();
  media = {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(media);
  timeline = { fromTo: vi.fn(), play: vi.fn(), reverse: vi.fn() };
  gsap.timeline.mockReturnValue(timeline);
  gsap.set.mockImplementation((element, values) =>
    Object.assign(element.style, values),
  );
  gsap.context.mockImplementation((callback) => {
    callback();
    return { revert };
  });
});

test("official defaults reveal on viewport entry and clean up on unmount", () => {
  const { unmount } = render(<AnimatedContent>Content</AnimatedContent>);
  expect(timeline.fromTo).toHaveBeenCalledWith(
    [expect.any(HTMLElement)],
    { y: 100, scale: 1, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
    0,
  );
  const trigger = ScrollTrigger.create.mock.calls[0][0];
  expect(trigger).toMatchObject({ start: "top 90%", once: true });
  expect(timeline.play).not.toHaveBeenCalled();
  trigger.onEnter();
  expect(timeline.play).toHaveBeenCalledTimes(1);
  unmount();
  expect(revert).toHaveBeenCalledTimes(1);
});

test("reduced motion shows content immediately without a timeline or scroll trigger", () => {
  media.matches = true;
  const onComplete = vi.fn();
  render(
    <AnimatedContent onComplete={onComplete}>Visible content</AnimatedContent>,
  );
  expect(screen.getByText("Visible content")).toBeVisible();
  expect(gsap.timeline).not.toHaveBeenCalled();
  expect(ScrollTrigger.create).not.toHaveBeenCalled();
  expect(onComplete).toHaveBeenCalledTimes(1);
});

test("mount trigger plays immediately without registering a scroll trigger", () => {
  render(<AnimatedContent trigger="mount">Hero</AnimatedContent>);
  expect(timeline.play).toHaveBeenCalledTimes(1);
  expect(ScrollTrigger.create).not.toHaveBeenCalled();
});
