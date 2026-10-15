import { publicParagraphs } from "./manuscript";

test("public prose follows language headings across renumbered chapters and subsections", () => {
  const manuscript = `# Review
Metadata before the page.
## A｜项目概览 Project Overview
> **配图备注，不上页面：** hidden image instruction
### 中文
> 中文介绍。
### English
English introduction.
## B｜结果 Impact
### English
English result.
### 新增的中文小节
中文补充。
## 编辑备注（不上页面）
Do not publish this note.`;
  expect(publicParagraphs(manuscript, "zh")).toEqual(["中文介绍。", "中文补充。"]);
  expect(publicParagraphs(manuscript, "en")).toEqual([
    "English introduction.", "English result.",
  ]);
});

test("a separate English review includes its prose and stops before maintenance details", () => {
  const manuscript = `## 项目概览
中文正文。
<details>
<summary>英文版</summary>
## Project overview
**Public summary**
English prose.
</details>
<details>
<summary>维护资料（不上页面）</summary>
Private maintenance note.
</details>`;
  expect(publicParagraphs(manuscript, "zh")).toEqual(["中文正文。"]);
  expect(publicParagraphs(manuscript, "en")).toEqual([
    "**Public summary**", "English prose.",
  ]);
});

test("an empty or unrecognized public manuscript fails instead of silently passing", () => {
  expect(() => publicParagraphs("# Review\nMetadata only", "zh")).toThrow(
    "No public zh prose found",
  );
});
