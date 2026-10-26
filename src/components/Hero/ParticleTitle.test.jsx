import React from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import ParticleTitle from "./ParticleTitle";

vi.mock("../ParticleText", () => ({
  default: ({ text }) => <div data-testid="particles">{text}</div>,
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("a live reduced-motion preference replaces particles with a readable heading and removes its listener", () => {
  vi.stubGlobal("CanvasRenderingContext2D", function CanvasContext() {});
  vi.stubGlobal("ResizeObserver", function ResizeObserver() {});
  vi.stubGlobal("IntersectionObserver", function IntersectionObserver() {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({});
  const media = {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(media);
  const { unmount } = render(<ParticleTitle />);
  expect(screen.getByTestId("particles")).toHaveTextContent("WEN MENG");
  expect(screen.getByRole("heading", { name: "WEN MENG" })).toHaveAttribute(
    "data-particle-active",
    "true",
  );
  act(() => {
    media.matches = true;
    media.addEventListener.mock.calls[0][1]();
  });
  expect(screen.queryByTestId("particles")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "WEN MENG" })).toHaveTextContent(
    "WEN MENG",
  );
  unmount();
  expect(media.removeEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
});
