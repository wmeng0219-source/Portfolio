import { act, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, test, vi } from "vitest";
import Orthodontics from "../Orthodontics";
import PacsAi from "../PacsAi";

afterEach(() => vi.unstubAllGlobals());

test.each([
  ["Orthodontics", Orthodontics, "咬合筛查与正畸前期协作流程"],
  ["PacsAi", PacsAi, "PACS 影像读片与 AI 辅助"],
])(
  "%s keeps the return link available and shows the title after the cover leaves",
  (_name, Page, title) => {
    const observers = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback, options) {
          this.callback = callback;
          this.options = options;
          this.observe = vi.fn();
          this.disconnect = vi.fn();
          observers.push(this);
        }
      },
    );
    const { container, unmount } = render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );
    const navigation = screen.getByRole("navigation", { name: "返回主页" });
    expect(
      within(navigation).getByRole("link", { name: /返回主页/ }),
    ).toHaveAttribute("href", "/");
    expect(within(navigation).queryByText(title)).toBeNull();
    const cover = container.querySelector("#case-cover");
    const observer = observers.find((item) =>
      item.observe.mock.calls.some(([target]) => target === cover),
    );
    expect(observer).toBeDefined();
    expect(observer.options.rootMargin).toBe("-64px 0px 0px 0px");
    act(() => observer.callback([{ isIntersecting: false }]));
    expect(within(navigation).getByText(title)).toBeVisible();
    expect(
      within(navigation).getByRole("link", { name: /返回主页/ }),
    ).toBeVisible();
    act(() => observer.callback([{ isIntersecting: true }]));
    expect(within(navigation).queryByText(title)).toBeNull();
    unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  },
);
