import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { ReportPreview } from "./ReportPreview";
import { media } from "./media";

const image = { src: "/report-full.png", width: 796, height: 6954, long: true };
afterEach(() => vi.unstubAllGlobals());

test("the mockup starts at the design position once and preserves the reader's later scroll", () => {
  render(<ReportPreview image={image} onZoom={() => {}} />);
  const pane = screen.getByRole("region", { name: "家长报告预览，可上下滚动" });
  Object.defineProperty(pane, "clientWidth", { value: 385 });
  const report = screen.getByRole("img", {
    name: /家长端完整咬合筛查报告预览/,
  });
  fireEvent.load(report);
  expect(pane.scrollTop).toBe(0);
  pane.scrollTop = 900;
  fireEvent.load(report);
  expect(pane.scrollTop).toBe(900);
  expect(pane).toHaveAttribute("tabindex", "0");
  expect(report).toHaveAttribute("height", "6954");
});

test("the report caption opens the complete source while its detail keeps the same model region", () => {
  const onZoom = vi.fn();
  render(
    <ReportPreview image={image} detail={media.reportModel} onZoom={onZoom} />,
  );
  const caption = screen.getByRole("button", {
    name: "放大查看：家长端筛查报告",
  });
  fireEvent.click(caption);
  expect(onZoom).toHaveBeenLastCalledWith(
    expect.objectContaining(image),
    caption,
  );
  const detail = screen.getByRole("button", {
    name: "放大查看：报告中的口腔3D模型",
  });
  fireEvent.click(detail);
  expect(onZoom).toHaveBeenLastCalledWith(
    expect.objectContaining({ region: media.reportModel.region }),
    detail,
  );
});

test("the enlarged excerpt defers the shared report source until the mockup is nearby", () => {
  let enter;
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback) {
        enter = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  const { container, unmount } = render(
    <ReportPreview
      image={image}
      detail={media.reportModel}
      onZoom={() => {}}
    />,
  );
  const excerpt = container.querySelector("svg image");
  expect(excerpt).not.toHaveAttribute("href");
  act(() => enter([{ isIntersecting: false }]));
  expect(excerpt).not.toHaveAttribute("href");
  act(() => enter([{ isIntersecting: true }]));
  expect(excerpt).toHaveAttribute("href", media.reportModel.src);
  expect(
    screen.getByRole("img", { name: /家长端完整咬合筛查报告预览/ }),
  ).toHaveAttribute("loading", "eager");
  unmount();
  expect(disconnect).toHaveBeenCalled();
});
