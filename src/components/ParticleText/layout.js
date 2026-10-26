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
