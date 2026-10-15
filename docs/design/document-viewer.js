// Read the source at viewing time; no generated copy of the specification is kept here.
const source = document.querySelector('[data-source]');
const status = document.getElementById('status');
const outline = document.getElementById('outline');

async function loadDocument() {
  try {
    const url = new URL(source.dataset.source, document.baseURI);
    if (url.origin !== location.origin) throw new Error('Expected a local document');
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const lines = text.split('\n');
    let fenced = false;
    const fragment = document.createDocumentFragment();
    for (const [index, textLine] of lines.entries()) {
      const line = document.createElement('span');
      line.className = 'line';
      line.id = `line-${index + 1}`;
      line.textContent = textLine || '\u200b';
      if (/^```/.test(textLine)) fenced = !fenced;
      if (!fenced && /^#{1,3} /.test(textLine)) line.classList.add('heading');
      if (!fenced && /^## /.test(textLine)) {
        const link = document.createElement('a');
        link.href = `#${line.id}`;
        link.textContent = textLine.replace(/^## /, '');
        outline.append(link);
      }
      fragment.append(line);
    }
    source.replaceChildren(fragment);
    status.textContent = '直接读取当前 Markdown；刷新即可查看最新内容。';
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch {
    status.textContent = '请通过本地预览服务器打开此页，或使用上方链接阅读 Markdown 原文。';
  }
}

loadDocument();
