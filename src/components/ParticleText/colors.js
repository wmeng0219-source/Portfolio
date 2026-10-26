export const phaseHighlight = (settings, gathering) =>
  gathering ? settings.introColor ?? settings.highlightColor : settings.highlightColor;
