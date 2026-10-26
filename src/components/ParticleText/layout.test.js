import { particleFrame } from './layout';

test('a fullscreen surface reaches the hero edges while preserving the final title position', () => {
  const frame = particleFrame({ left: 40, top: 200, width: 1200, height: 280 }, { left: 0, top: 0, width: 1280, height: 720 });
  expect(frame).toEqual({ width: 1280, height: 720, left: -40, top: -200, centerX: 640, centerY: 340, textWidth: 1200 });
});

test('a regular particle component retains its local canvas coordinates', () => {
  expect(particleFrame({ left: 40, top: 200, width: 1200, height: 280 })).toEqual({ width: 1200, height: 280, left: 0, top: 0, centerX: 600, centerY: 140, textWidth: 1200 });
});
