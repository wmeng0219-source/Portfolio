import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import Hero from "./index";
import { readFileSync } from "node:fs";

test("renders the identity and scroll cue without hero action buttons", () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /WEN MENG/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(screen.queryByText("温萌")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "向下滚动" })).toHaveAttribute(
    "href",
    "#experience",
  );
  expect(
    screen.queryByRole("link", { name: "联系我" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "WEN MENG",
  );
  expect(
    screen.getByRole("heading", { level: 1 }).querySelector(".hero-char"),
  ).toBeNull();
});

test("homepage reduced-motion presents final content and disables sticky cards", () => {
  const styles = readFileSync("src/pages/Home/Home.css", "utf8");
  expect(styles).toMatch(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none/,
  );
  expect(styles).toMatch(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*position:\s*relative/,
  );
});

test("Hero reduced-motion anchors use instant scrolling despite global smooth CSS", () => {
  const previous = window.matchMedia;
  window.matchMedia = vi.fn(() => ({ matches: true }));
  const target = document.createElement("section");
  target.id = "experience";
  target.scrollIntoView = vi.fn();
  document.body.append(target);
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  );
  fireEvent.click(screen.getByRole("link", { name: "向下滚动" }));
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant" });
  target.remove();
  window.matchMedia = previous;
});
