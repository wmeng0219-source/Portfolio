// Upstream's automatic budget, isolated so large hero glyphs can be verified.
export function selectParticleTargets(targets, width, height, maxParticles) {
  const budget = maxParticles ?? Math.max(900, Math.min(5200, Math.floor((width * height) / 90)));
  const stride = Math.max(1, Math.ceil(targets.length / budget));
  return targets.filter((_, index) => index % stride === 0);
}
