import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { afterEach, expect, test } from "vitest";

// In-memory behavior checks only: no browser rendering or network requests.
const fixtures = [];
function draftFixture(reduce = false) {
  const html = readFileSync("docs/design/orthodontics-v4-preview.html", "utf8");
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    url: "https://draft.invalid/",
  });
  fixtures.push(dom);
  const { window } = dom;
  const ids = [
    "overview",
    "problem",
    "thinking",
    "solution",
    "impact",
    "reflection",
  ];
  Object.defineProperty(window.document.documentElement, "scrollHeight", {
    value: 7000,
  });
  window.matchMedia = () => ({ matches: reduce });
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    return { top: ids.indexOf(this.id) * 1000 - window.scrollY };
  };
  const scrollCalls = [];
  window.HTMLElement.prototype.scrollIntoView = function (options) {
    scrollCalls.push({ id: this.id, options });
  };
  window.eval(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
  return { window, document: window.document, scrollCalls };
}
afterEach(() => {
  fixtures.splice(0).forEach((dom) => dom.window.close());
});

test("manual scrolling marks the same current chapter in desktop and mobile navigation", () => {
  const { window, document } = draftFixture();
  window.scrollY = 3150;
  window.dispatchEvent(new window.Event("scroll"));
  for (const selector of [".toc", ".mobile-menu"]) {
    const current = document.querySelectorAll(
      `${selector} [aria-current="location"]`,
    );
    expect(current).toHaveLength(1);
    expect(current[0].getAttribute("href")).toBe("#solution");
  }
});

test("choosing a mobile chapter closes the menu and focuses its visible heading", () => {
  const { document } = draftFixture();
  const menu = document.querySelector(".mobile-menu");
  menu.open = true;
  menu.querySelector("summary").focus();
  menu.querySelector('a[href="#thinking"]').click();
  expect(menu.open).toBe(false);
  expect(document.activeElement).toBe(document.querySelector("#thinking h2"));
  expect(document.activeElement.getAttribute("tabindex")).toBe("-1");
});

test("reduced-motion chapter navigation uses instant scrolling and keeps its hash", () => {
  const { window, document, scrollCalls } = draftFixture(true);
  document.querySelector('.mobile-menu a[href="#impact"]').click();
  expect(scrollCalls).toEqual([
    { id: "impact", options: { behavior: "instant", block: "start" } },
  ]);
  expect(window.location.hash).toBe("#impact");
});

test("Escape closes the mobile list and restores focus to its summary", () => {
  const { window, document } = draftFixture();
  const menu = document.querySelector(".mobile-menu");
  menu.open = true;
  menu.querySelector("a").focus();
  menu.dispatchEvent(
    new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  );
  expect(menu.open).toBe(false);
  expect(document.activeElement).toBe(menu.querySelector("summary"));
});
