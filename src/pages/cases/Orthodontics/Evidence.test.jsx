import React from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { Evidence } from "./Evidence";

afterEach(() => vi.unstubAllGlobals());

test("clear originals start decoding near the viewport while distant screenshots remain lazy", () => {
  let notify;
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback) {
        notify = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  const { unmount } = render(
    <Evidence
      image={{ src: "/clear.png", width: 2880, height: 1800 }}
      title="工作台"
      alt="完整工作台界面"
      onZoom={() => {}}
    />,
  );
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("loading", "lazy");
  act(() => notify([{ isIntersecting: false }]));
  expect(image).toHaveAttribute("loading", "lazy");
  act(() => notify([{ isIntersecting: true }]));
  expect(image).toHaveAttribute("loading", "eager");
  expect(disconnect).toHaveBeenCalled();
  unmount();
});
