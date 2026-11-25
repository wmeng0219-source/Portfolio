import { renderHook, act } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import gsap from "gsap";
import { useCaseMotion } from "./motion";

vi.mock("gsap", () => ({
  default: { set: vi.fn(), to: vi.fn(), context: vi.fn() },
}));
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function setup(reduced = false) {
  const root = document.createElement("div");
  root.innerHTML =
    '<header data-case-motion="heading"></header><div data-case-motion="image"></div><ol data-case-motion="roles"><li></li><li></li><li></li><li></li></ol>';
  document.body.append(root);
  const preference = {
    matches: reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(preference);
  const observer = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
  let enter;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(fn) {
        enter = fn;
        return observer;
      }
    },
  );
  const context = { add: (fn) => fn(), revert: vi.fn() };
  gsap.context.mockImplementation((fn) => {
    fn();
    return context;
  });
  return {
    root,
    preference,
    observer,
    context,
    enter: (target) => act(() => enter([{ target, isIntersecting: true }])),
  };
}

test("each heading and screenshot enters once with the requested small distances and durations", () => {
  const s = setup();
  const hook = renderHook(() => useCaseMotion({ current: s.root }));
  const heading = s.root.children[0],
    image = s.root.children[1];
  expect(gsap.set).toHaveBeenCalledWith(
    heading,
    expect.objectContaining({ opacity: 0, y: 16 }),
  );
  expect(gsap.set).toHaveBeenCalledWith(
    image,
    expect.objectContaining({ opacity: 0, y: 10 }),
  );
  s.enter(heading);
  s.enter(heading);
  s.enter(image);
  expect(gsap.to).toHaveBeenCalledTimes(2);
  expect(gsap.to).toHaveBeenCalledWith(
    heading,
    expect.objectContaining({ opacity: 1, y: 0, duration: 0.45 }),
  );
  expect(gsap.to).toHaveBeenCalledWith(
    image,
    expect.objectContaining({ duration: 0.55 }),
  );
  hook.unmount();
  expect(s.observer.disconnect).toHaveBeenCalled();
  expect(s.context.revert).toHaveBeenCalled();
  s.root.remove();
});

test("role nodes use one bounded sequence with 120ms intervals", () => {
  const s = setup();
  const hook = renderHook(() => useCaseMotion({ current: s.root }));
  s.enter(s.root.children[2]);
  expect(gsap.to).toHaveBeenCalledWith(
    [...s.root.children[2].children],
    expect.objectContaining({ stagger: 0.12, duration: 0.45 }),
  );
  hook.unmount();
  s.root.remove();
});

test("reduced motion never hides content and switching it on releases pending animations", () => {
  const s = setup(true);
  const hook = renderHook(() => useCaseMotion({ current: s.root }));
  expect(gsap.set).not.toHaveBeenCalled();
  expect(s.observer.observe).not.toHaveBeenCalled();
  const update = s.preference.addEventListener.mock.calls[0][1];
  s.preference.matches = false;
  act(() => update());
  expect(s.observer.observe).toHaveBeenCalled();
  s.preference.matches = true;
  act(() => update());
  expect(s.context.revert).toHaveBeenCalled();
  hook.unmount();
  expect(s.preference.removeEventListener).toHaveBeenCalledWith(
    "change",
    update,
  );
  s.root.remove();
});
