import { readFileSync } from 'node:fs';
import postcss from 'postcss';
const styles = postcss.parse(readFileSync('src/pages/Home/Home.css', 'utf8'));
const declarations = (selector) => Object.assign({}, ...styles.nodes
  .filter(node => node.type === 'rule' && node.selectors.includes(selector))
  .map(node => Object.fromEntries(node.nodes.map(decl => [decl.prop, decl.value]))));

test('Chinese narrative uses a sans-serif role and the homepage defines its font roles', () => {
  expect(declarations('.homepage[data-language="zh"]')['--font-serif']).toContain('sans-serif');
  for (const role of ['body', 'serif', 'display', 'mono']) {
    expect(declarations('.homepage')[`--font-${role}`]).toBeTruthy();
  }
});

test('homepage section titles share a typography role', () => {
  const titles = ['portfolio-showcase-title', 'experience-stage-title', 'contact-stage-title']
    .map(name => declarations(`.homepage .${name}`));
  for (const property of ['font-size', 'font-weight', 'line-height']) {
    expect(titles[0][property]).toBeTruthy();
    expect(new Set(titles.map(title => title[property])).size).toBe(1);
  }
});
