export function particleFrame(textRect, surfaceRect = textRect) {
  return {
    width: Math.floor(surfaceRect.width),
    height: Math.floor(surfaceRect.height),
    left: surfaceRect.left - textRect.left,
    top: surfaceRect.top - textRect.top,
    centerX: textRect.left - surfaceRect.left + textRect.width / 2,
    centerY: textRect.top - surfaceRect.top + textRect.height / 2,
    textWidth: textRect.width,
  };
}

export function scrollScatterProgress(top, height, viewportHeight = height) {
  const travel = Math.max(1, Math.min(height, viewportHeight) * 0.8);
  const start = travel * 0.18;
  const span = Math.max(1, travel - start);
  return Math.min(1, Math.max(0, (-top - start) / span));
}
