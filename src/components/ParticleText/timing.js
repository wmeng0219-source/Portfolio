// Keep subtle idle drift cheap, including on displays that refresh above 60 Hz.
export function shouldDrawParticleFrame(now, last, interacting) {
  const interval = 1000 / (interacting ? 60 : 30);
  return last === 0 || now - last >= interval - 1;
}
