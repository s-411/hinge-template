// Theme — Connect design tokens + Tweaks state
// Warm editorial dating app. Original palette & type, nothing cloned.

const ACCENTS = {
  terracotta: { hue: 35, chroma: 0.13 },
  sage:       { hue: 155, chroma: 0.07 },
  plum:       { hue: 340, chroma: 0.11 },
  ink:        { hue: 40,  chroma: 0.02 },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "terracotta",
  "density": "comfy",
  "display": "serif"
}/*EDITMODE-END*/;

function buildTheme({ dark, accent, density, display }) {
  const a = ACCENTS[accent] || ACCENTS.terracotta;
  const accentL = dark ? 0.62 : 0.52;
  const accentSoftL = dark ? 0.28 : 0.92;

  const bg       = dark ? '#141210' : '#f6f1ea';
  const bgElev   = dark ? '#1c1a17' : '#fbf7f0';
  const bgCard   = dark ? '#201d1a' : '#ffffff';
  const ink      = dark ? '#f2ede4' : '#1a1612';
  const inkSoft  = dark ? '#b9b2a6' : '#6b6258';
  const inkMute  = dark ? '#6f6b64' : '#9a9187';
  const line     = dark ? 'rgba(242,237,228,0.10)' : 'rgba(26,22,18,0.10)';
  const lineSoft = dark ? 'rgba(242,237,228,0.06)' : 'rgba(26,22,18,0.06)';

  return {
    dark, accent, density, display,
    color: {
      bg, bgElev, bgCard, ink, inkSoft, inkMute, line, lineSoft,
      accent:      `oklch(${accentL} ${a.chroma} ${a.hue})`,
      accentInk:   dark ? '#fff' : '#fff',
      accentSoft:  `oklch(${accentSoftL} ${a.chroma * 0.5} ${a.hue})`,
      accentDeep:  `oklch(${accentL - 0.08} ${a.chroma} ${a.hue})`,
      sage:        dark ? 'oklch(0.6 0.06 155)' : 'oklch(0.45 0.06 155)',
      sageSoft:    dark ? 'oklch(0.28 0.03 155)' : 'oklch(0.9 0.03 155)',
      overlay:     'rgba(10,8,6,0.55)',
      placeholder: dark ? '#2a2724' : '#ebe5db',
    },
    fontDisplay: display === 'serif'
      ? '"Instrument Serif", "Bodoni 72", Georgia, serif'
      : '"Fraunces", Georgia, serif', // fallback variant; we override below
    fontSans: '"Inter", -apple-system, system-ui, sans-serif',
    space: density === 'compact'
      ? { xs: 4, sm: 8, md: 12, lg: 16, xl: 22, xxl: 32 }
      : { xs: 6, sm: 10, md: 16, lg: 22, xl: 30, xxl: 44 },
    radius: { sm: 8, md: 14, lg: 22, xl: 32, pill: 999 },
    row: density === 'compact' ? 48 : 58,
  };
}

// Display font swap — sans display uses Inter display weight
function displayFontFor(theme) {
  if (theme.display === 'sans') return `"Inter", -apple-system, system-ui, sans-serif`;
  return theme.fontDisplay;
}

Object.assign(window, { ACCENTS, TWEAK_DEFAULTS, buildTheme, displayFontFor });
