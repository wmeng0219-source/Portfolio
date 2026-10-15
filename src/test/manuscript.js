// Test-only extraction of public prose from the two existing review formats.
// Chapter numbering and paragraph counts are deliberately not part of the contract.
export const normalizeManuscriptText = (text) => text.replace(/[\s*`→]/g, "");

export function publicParagraphs(markdown, language) {
  let inPage = false;
  let currentLanguage = "zh";
  let detailsLanguage;
  const paragraphs = [];
  const editorialLabels = new Set([
    "标题（暂用，待确认）", "项目介绍", "我的职责与协作",
    "Working title", "Project introduction", "My role and collaboration",
  ]);

  for (const source of markdown.split("\n")) {
    const line = source.trim();
    if (/^<summary>/.test(line)) {
      if (line.includes("不上页面")) break;
      if (/英文|English/i.test(line)) detailsLanguage = "en";
      currentLanguage = detailsLanguage || "zh";
      continue;
    }
    if (line === "</details>") {
      detailsLanguage = undefined;
      currentLanguage = "zh";
      continue;
    }
    const heading = line.match(/^(#{2,})\s+(.+)$/);
    if (heading) {
      if (heading[2].includes("不上页面")) break;
      if (heading[1].length === 2) {
        inPage = true;
        currentLanguage = detailsLanguage || "zh";
      } else {
        currentLanguage = /[\u4e00-\u9fff]/.test(heading[2]) ? "zh" : "en";
      }
      continue;
    }
    if (!inPage || currentLanguage !== language || !line) continue;
    if (/^(?:<|#|\|)/.test(line)) continue;
    if (line.startsWith(">") && line.includes("不上页面")) continue;
    if (/^\*\*Project title:/i.test(line)) continue;
    if (editorialLabels.has(line.replace(/^\*\*|\*\*$/g, ""))) continue;
    paragraphs.push(line.replace(/^>\s*|^-\s+/, ""));
  }

  if (!paragraphs.length) throw new Error(`No public ${language} prose found`);
  return paragraphs;
}
