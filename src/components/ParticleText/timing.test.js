import { shouldDrawParticleFrame } from './timing';

test('idle drift draws at 30 fps while pointer, intro and scroll motion can draw at 60 fps', () => {
  expect(shouldDrawParticleFrame(100, 0, false)).toBe(true);
  expect(shouldDrawParticleFrame(116.7, 100, false)).toBe(false);
  expect(shouldDrawParticleFrame(133.3, 100, false)).toBe(true);
  expect(shouldDrawParticleFrame(108.3, 100, true)).toBe(false);
  expect(shouldDrawParticleFrame(116.7, 100, true)).toBe(true);
});
