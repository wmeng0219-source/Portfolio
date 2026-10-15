import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import Navbar from "./index";

const mockMatchMedia = (matches) => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

beforeEach(() => {
  mockMatchMedia(true);
});

afterEach(() => {
  vi.restoreAllMocks();
  window.scrollY = 0;
  delete document.documentElement.scrollHeight;
});

const renderScrollFixture = () => {
  let titleHeight = 200;
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 4320,
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function () {
      const regions = {
        hero: [0, 720],
        experience: [720, 1100],
        portfolio: [1820, 1700],
        contact: [3520, 800],
      };
      if (this.classList.contains("hero-display-title")) {
        return new DOMRect(0, 160 - window.scrollY, 500, titleHeight);
      }
      if (regions[this.id]) {
        const [top, height] = regions[this.id];
        return new DOMRect(0, top - window.scrollY, 1000, height);
      }
      return new DOMRect(0, 16, 400, 54);
    },
  );
  render(
    <LanguageProvider>
      <Navbar />
      <section id="hero">
        <h1 className="hero-display-title" tabIndex={-1}>
          WEN MENG
        </h1>
      </section>
      <section id="experience" />
      <section id="portfolio" />
      <section id="contact" />
    </LanguageProvider>,
  );
  return {
    scroll: (y) => {
      window.scrollY = y;
      fireEvent.scroll(window);
    },
    resizeTitle: (height) => {
      titleHeight = height;
      fireEvent(window, new Event("resize"));
    },
  };
};

test("manual scrolling exposes exactly one current navigation destination", async () => {
  mockMatchMedia(false);
  const fixture = renderScrollFixture();
  expect(
    screen.getByRole("navigation").querySelector("[aria-current]"),
  ).toBeNull();
  for (const [y, name] of [
    [720, "职业历程"],
    [1820, "精选项目"],
    [3520, "联系我"],
  ]) {
    fixture.scroll(y);
    await waitFor(() =>
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "aria-current",
        "location",
      ),
    );
    expect(
      screen.getByRole("navigation").querySelectorAll("[aria-current]"),
    ).toHaveLength(1);
  }
});

test("the separate identity appears only after the Hero title fully leaves the viewport", async () => {
  mockMatchMedia(false);
  const fixture = renderScrollFixture();
  const name = document.querySelector(".home-nav-brand");
  expect(name).not.toBeVisible();
  expect(screen.queryByRole("link", { name: "WEN MENG" })).toBeNull();
  expect(name).toHaveAttribute("href", "#hero");
  expect(name.closest(".home-nav-shell")).toBeNull();
  expect(name).not.toHaveAttribute("tabindex", "-1");
  fixture.scroll(359);
  expect(name).not.toBeVisible();
  fixture.scroll(361);
  await waitFor(() =>
    expect(name.closest("header")).toHaveAttribute(
      "data-hero-title-gone",
      "true",
    ),
  );
  expect(name).toBeVisible();
  fixture.scroll(100);
  await waitFor(() =>
    expect(name.closest("header")).toHaveAttribute(
      "data-hero-title-gone",
      "false",
    ),
  );
  expect(name).not.toBeVisible();
  expect(screen.queryByRole("link", { name: "WEN MENG" })).toBeNull();
});

test("anchor alignment with fractional pixels activates the destination section", async () => {
  mockMatchMedia(false);
  const fixture = renderScrollFixture();
  fixture.scroll(720 - 96.02);
  await waitFor(() =>
    expect(screen.getByRole("link", { name: "职业历程" })).toHaveAttribute(
      "aria-current",
      "location",
    ),
  );
});

test("resizing reevaluates identity visibility against the Hero title boundary", async () => {
  mockMatchMedia(false);
  const fixture = renderScrollFixture();
  const name = document.querySelector(".home-nav-brand");
  fixture.scroll(400);
  await waitFor(() =>
    expect(name.closest("header")).toHaveAttribute(
      "data-hero-title-gone",
      "true",
    ),
  );
  expect(name).toBeVisible();
  fixture.resizeTitle(400);
  await waitFor(() =>
    expect(name.closest("header")).toHaveAttribute(
      "data-hero-title-gone",
      "false",
    ),
  );
  expect(name).not.toBeVisible();
});

test("Escape closes mobile navigation and restores focus", async () => {
  const user = userEvent.setup();
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );
  await user.click(screen.getByRole("button", { name: "菜单" }));
  await user.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "菜单" })).toHaveFocus();
  expect(
    screen.queryByRole("link", { name: "职业历程" }),
  ).not.toBeInTheDocument();
});

test("reduced-motion navigation uses immediate positioning", async () => {
  const user = userEvent.setup();
  window.matchMedia = vi.fn((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  render(
    <LanguageProvider>
      <Navbar />
      <section id="portfolio" />
    </LanguageProvider>,
  );
  const target = document.getElementById("portfolio");
  target.scrollIntoView = vi.fn();
  await user.click(screen.getByRole("link", { name: "精选项目" }));
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant" });
});

test("keyboard identity navigation transfers focus to the visible Hero title", async () => {
  mockMatchMedia(false);
  const user = userEvent.setup();
  const fixture = renderScrollFixture();
  document.getElementById("hero").scrollIntoView = vi.fn();
  fixture.scroll(400);
  const identity = await screen.findByRole("link", { name: "WEN MENG" });
  identity.focus();
  await user.keyboard("{Enter}");
  expect(screen.getByRole("heading", { name: "WEN MENG" })).toHaveFocus();
});

test("removes closed mobile navigation links from the accessibility tree after selection", async () => {
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  expect(
    screen.queryByRole("link", { name: "工作方法" }),
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "菜单" }));

  expect(screen.getByRole("link", { name: "精选项目" })).toHaveAttribute(
    "href",
    "#portfolio",
  );
  expect(screen.getByRole("link", { name: "职业历程" })).toHaveAttribute(
    "href",
    "#experience",
  );
  expect(screen.getByRole("link", { name: "联系我" })).toHaveAttribute(
    "href",
    "#contact",
  );

  await user.click(screen.getByRole("link", { name: "职业历程" }));

  expect(screen.getByRole("button", { name: "菜单" })).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "职业历程" }),
  ).not.toBeInTheDocument();
  expect(document.getElementById("primary-navigation")).toHaveAttribute(
    "hidden",
  );
  expect(document.getElementById("primary-navigation")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

test("returns focus to the menu button after activating a mobile navigation item", async () => {
  const user = userEvent.setup();

  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );

  const menuButton = screen.getByRole("button", { name: "菜单" });
  await user.click(menuButton);

  await user.tab();

  const firstLink = screen.getByRole("link", { name: "职业历程" });
  expect(firstLink).toHaveFocus();

  await user.keyboard("{Enter}");

  expect(menuButton).toHaveFocus();
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("tablet navigation stays available at the same breakpoint as its CSS controls", () => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(max-width: 900px)",
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );
  expect(screen.getByRole("link", { name: "精选项目" })).toBeInTheDocument();
});
