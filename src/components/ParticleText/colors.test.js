import { phaseHighlight } from './colors';

test('uses white while gathering and green for settled interactions', () => {
  const colors = { introColor: '#ffffff', highlightColor: '#b9f2c8' };
  expect(phaseHighlight(colors, true)).toBe('#ffffff');
  expect(phaseHighlight(colors, false)).toBe('#b9f2c8');
});

test('keeps the original highlight when no intro color is supplied', () => {
  expect(phaseHighlight({ highlightColor: '#ff5a36' }, true)).toBe('#ff5a36');
});
