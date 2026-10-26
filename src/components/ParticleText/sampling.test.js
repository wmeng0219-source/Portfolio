import { selectParticleTargets } from './sampling';

test('large hero glyphs retain their complete sampling grid with a sufficient particle budget', () => {
  const targets = Array.from({ length: 6800 }, (_, index) => ({ x: index % 240, y: Math.floor(index / 240) }));
  expect(selectParticleTargets(targets, 1200, 280, 10000)).toEqual(targets);
});

test('ordinary consumers retain the upstream automatic particle budget', () => {
  const targets = Array.from({ length: 6800 }, (_, index) => index);
  expect(selectParticleTargets(targets, 1200, 280)).toHaveLength(3400);
});
