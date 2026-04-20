// Connect — design tokens. This is the ONLY file a template author should
// edit to restyle the entire app. Change the accent family to swap primary
// colour; change `fonts.display` / `fonts.sans` to swap typography; change
// the `type.*` bundles to rescale; change `radius.card` etc. to restyle
// corners. Nothing downstream should contain a raw hex/rgba/font-size.
//
// Locked to defaults: light mode, terracotta accent, comfy density, serif display.

import { StyleSheet } from 'react-native';

// -----------------------------------------------------------------------------
// Named palette — REFERENCE ONLY. Not consumed by any screen directly.
//
// A bank of hand-picked hues an agent can look up when the user says e.g.
// "change primary to forest" or "change background to pebble". Each entry is
// named so it can be referenced conversationally; the agent reads the hex and
// drops it into the appropriate `colors.*` primitive below.
//
// Inspired by Hinge's brand palette. Bright white is intentionally reserved
// for cases where the OS requires it (status bars, iOS modals) — `surfacePage`
// and card backgrounds default to warmer neutrals.
// -----------------------------------------------------------------------------

export const palette = {
  // Purples
  midnight: '#3E1768',
  aubergine: '#67295F',
  lilac: '#75457D',
  mauve: '#9F81A5',

  // Neutrals
  mist: '#C7C7E5',
  sand: '#CCAC9F',
  pebble: '#EEE1DB',
  stone: '#484848',

  // Greens
  forest: '#025656',
  kelp: '#097270', // also currently consumed by `colors.success`

  // Warm accent
  coral: '#D45847', // also currently consumed by `colors.danger`

  // Utility — use only where OS requires pure white
  brightWhite: '#FFFFFF',
} as const;

// -----------------------------------------------------------------------------
// Primitives — raw palette.
// -----------------------------------------------------------------------------

export const colors = {
  bg: '#f6f1ea',
  bgElev: '#fbf7f0',
  bgCard: '#ffffff',

  ink: '#1a1612',
  inkSoft: '#6b6258',
  inkMute: '#9a9187',

  line: 'rgba(26,22,18,0.10)',
  lineSoft: 'rgba(26,22,18,0.06)',

  // Primary accent (purple)
  accent: '#994EA8',
  accentInk: '#ffffff',
  accentSoft: '#e8d4ef',
  accentDeep: '#6e3878',

  secondary: '#395f47',
  secondarySoft: '#cfe4d5',

  // Success — positive/confirm/approve state. "Yes", "good", check marks,
  // green-flag-style affirmations. Kelp by default.
  success: '#097270',
  successSoft: '#cfe5e4',

  // Danger — negative/warn/destructive state. "No", "bad", error toasts,
  // red-flag-style warnings. Coral by default.
  danger: '#D45847',
  dangerSoft: '#f6d6cf',

  overlay: 'rgba(10,8,6,0.55)',
  placeholder: '#ebe5db',

  // Phone shell (referenced in Welcome only)
  heroTop: '#3a2419',
  heroBottom: '#0e0806',
} as const;

// Dark palette — used only by the Connect Pro paywall (and the Pro tab inside
// the Connect+ paywall). The rest of the app remains light-locked.
export const colorsDark = {
  bg: '#0f0d0b',
  bgElev: '#1a1715',
  bgCard: '#201d1a',

  ink: '#f2ede4',
  inkSoft: 'rgba(242,237,228,0.6)',
  inkMute: 'rgba(242,237,228,0.4)',

  line: 'rgba(242,237,228,0.12)',
  lineSoft: 'rgba(242,237,228,0.06)',

  accent: colors.accent,
  accentInk: '#ffffff',
  accentSoft: '#3a2834',
  accentDeep: '#6e3878',

  secondary: colors.secondary,
  secondarySoft: colors.secondarySoft,

  success: colors.success,
  successSoft: '#1a3a39',
  danger: colors.danger,
  dangerSoft: '#3d2520',

  overlay: 'rgba(0,0,0,0.7)',
  placeholder: '#2a2724',

  heroTop: '#3a2a24',
  heroBottom: '#141010',
} as const;

// Font family names. Each semantic role below can point at a different family,
// so brand guidelines that prescribe, say, "buttons use a custom display font"
// are a one-line swap.
//
// ModernEra note: only the Regular weight is currently bundled. Body, caption,
// and button roles point at the same Regular file; `type.body`, `type.caption`,
// and `type.button` apply `fontWeight` overrides so iOS synthesises the missing
// Medium/Bold weights. Drop ModernEra-Medium.ttf / ModernEra-Bold.ttf into
// assets/fonts/ModernEra/, register them in `app/_layout.tsx`, then change the
// role below to the new family name (e.g. 'ModernEra_500Medium') — the
// `fontWeight` overrides become redundant and can stay or be removed.
export const fonts = {
  // Semantic font roles — what a template author swaps per brand guideline.
  heading: 'TiemposHeadline_400Regular',
  headingItalic: 'TiemposHeadline_400RegularItalic',
  body: 'ModernEra_400Regular', // brand: Medium
  label: 'ModernEra_400Regular', // brand: Regular
  caption: 'ModernEra_400Regular', // brand: Medium
  button: 'ModernEra_400Regular', // brand: Bold
  mono: 'Menlo',

  // Legacy aliases — previous names still in use across some inline styles.
  // Point at the new semantic roles so nothing breaks while call sites migrate.
  display: 'TiemposHeadline_400Regular',
  displayItalic: 'TiemposHeadline_400RegularItalic',
  sans: 'ModernEra_400Regular',
  sansMedium: 'ModernEra_400Regular',
  sansSemibold: 'ModernEra_400Regular',
  sansBold: 'ModernEra_400Regular',
} as const;

// -----------------------------------------------------------------------------
// Semantic roles — the layer screens should reach for. Changing any primitive
// above ripples through every `role.*` consumer automatically.
// -----------------------------------------------------------------------------

export const role = {
  primary: colors.accent,
  primarySoft: colors.accentSoft,
  primaryDeep: colors.accentDeep,
  onPrimary: colors.accentInk,

  secondary: colors.secondary,
  secondarySoft: colors.secondarySoft,

  success: colors.success,
  successSoft: colors.successSoft,
  onSuccess: '#ffffff',

  danger: colors.danger,
  dangerSoft: colors.dangerSoft,
  onDanger: '#ffffff',

  surfacePage: colors.bg,
  surfaceElevated: colors.bgElev,
  surfaceCard: colors.bgCard,
  surfaceInput: colors.placeholder,

  textPrimary: colors.ink,
  textSecondary: colors.inkSoft,
  textMuted: colors.inkMute,
  textOnDark: '#ffffff',
  textOnPhoto: 'rgba(255,255,255,0.88)',
  textOnPhotoSoft: 'rgba(255,255,255,0.7)',
  textOnPhotoMute: 'rgba(255,255,255,0.3)',
  textOnPhotoScrim: 'rgba(0,0,0,0.25)',

  border: colors.line,
  borderSoft: colors.lineSoft,

  scrim: colors.overlay,
  scrimLight: 'rgba(180,172,160,0.6)',
  scrimDark: 'rgba(40,30,25,0.3)',
  scrimHeart: 'rgba(100,85,70,0.3)',
  scrimGlyph: 'rgba(0,0,0,0.55)',

  // iOS-styled system permission dialogs (used by notifications prompt)
  iosSheetBg: 'rgba(245,240,232,0.98)',
  iosSheetLine: 'rgba(0,0,0,0.2)',
  iosAction: '#0A7AFF',

  // Dark paywall helpers on top of colorsDark
  darkRowFill: 'rgba(242,237,228,0.08)',

  // Placeholder used behind photos before images load
  photoBackstop: '#2a2420',

  // Primary-on-surface tint (primary @ 18% alpha) — used for icon halos.
  primaryTint: 'rgba(153,78,168,0.18)',

  // Dark chrome — used for the bottom tab bar. Stays dark in BOTH modes
  // because the tab bar is a brand chrome strip, not a surface that flips.
  chromeFill: colors.ink,
} as const;

// Type of the semantic role object — widened to plain strings so alternate
// palettes (e.g. the dark resolver below) can provide different hex values.
export type Role = { [K in keyof typeof role]: string };

// -----------------------------------------------------------------------------
// Dark-mode resolver — given a mode, returns the role object the app should
// render with. Only invariants that must stay identical across modes (brand
// primary/secondary, iOS system blue, photo-overlay text colours, mono family)
// are shared between the two branches. Everything else flips.
// -----------------------------------------------------------------------------

export function resolveRole(mode: 'light' | 'dark'): Role {
  if (mode === 'light') return role;
  return {
    // Brand stays.
    primary: colorsDark.accent,
    primarySoft: colorsDark.accentSoft,
    primaryDeep: colorsDark.accentDeep,
    onPrimary: colorsDark.accentInk,

    secondary: colorsDark.secondary,
    secondarySoft: colorsDark.secondarySoft,

    // Success / danger — base hues same, soft tints darker for dark bg.
    success: colorsDark.success,
    successSoft: colorsDark.successSoft,
    onSuccess: '#ffffff',

    danger: colorsDark.danger,
    dangerSoft: colorsDark.dangerSoft,
    onDanger: '#ffffff',

    // Surfaces flip.
    surfacePage: colorsDark.bg,
    surfaceElevated: colorsDark.bgElev,
    surfaceCard: colorsDark.bgCard,
    surfaceInput: colorsDark.placeholder,

    // Text flips.
    textPrimary: colorsDark.ink,
    textSecondary: colorsDark.inkSoft,
    textMuted: colorsDark.inkMute,

    // Photo / on-dark overlays — independent of mode (photos don't flip).
    textOnDark: role.textOnDark,
    textOnPhoto: role.textOnPhoto,
    textOnPhotoSoft: role.textOnPhotoSoft,
    textOnPhotoMute: role.textOnPhotoMute,
    textOnPhotoScrim: role.textOnPhotoScrim,

    // Borders flip.
    border: colorsDark.line,
    borderSoft: colorsDark.lineSoft,

    // Scrims — darker overlay in dark mode.
    scrim: colorsDark.overlay,
    scrimLight: role.scrimLight,
    scrimDark: role.scrimDark,
    scrimHeart: role.scrimHeart,
    scrimGlyph: role.scrimGlyph,

    // iOS system chrome — identical across modes.
    iosSheetBg: role.iosSheetBg,
    iosSheetLine: role.iosSheetLine,
    iosAction: role.iosAction,

    darkRowFill: role.darkRowFill,
    photoBackstop: role.photoBackstop,
    primaryTint: role.primaryTint,

    // Chrome fill — dark in both modes, but a different dark in dark mode
    // so the tab bar lifts off the page via elevation rather than contrast.
    chromeFill: colorsDark.bgElev,
  };
}

// -----------------------------------------------------------------------------
// Mode-dependent gradients — `plansBg` references surface + primarySoft so it
// needs to resolve per mode. Every other gradient is decorative/mode-agnostic.
// -----------------------------------------------------------------------------

export function resolveGradient(mode: 'light' | 'dark') {
  if (mode === 'light') return gradient;
  return {
    ...gradient,
    plansBg: [colorsDark.bg, colorsDark.accentSoft] as const,
  };
}

// -----------------------------------------------------------------------------
// Illustration palette — inline SVG colours for decorative art. Extracted so a
// template author can reskin the map/art without editing screen JSX.
// -----------------------------------------------------------------------------

export const illustration = {
  mapWater: '#a8d4e8',
  mapRoad: '#c9c4b8',
  mapRoadLight: '#d8d3c5',
  mapPin: '#333333',
  mapText: '#2a2a2a',
} as const;

// -----------------------------------------------------------------------------
// Typography — complete style bundles. Spread into Text style arrays.
// -----------------------------------------------------------------------------

export const type = {
  // Heading scale — uses fonts.heading.
  wordmark: { fontFamily: fonts.heading, fontSize: 54, letterSpacing: -1 },
  hero: { fontFamily: fonts.heading, fontSize: 38, lineHeight: 40, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.heading, fontSize: 34, lineHeight: 36, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.heading, fontSize: 30, lineHeight: 33, letterSpacing: -0.3 },
  h3: { fontFamily: fonts.heading, fontSize: 28, lineHeight: 31, letterSpacing: -0.3 },
  h4: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 29, letterSpacing: -0.3 },
  h5: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 26, letterSpacing: -0.2 },

  // Body scale — uses fonts.body. fontWeight: '500' requests Medium; drop when
  // a real Medium file is loaded and fonts.body points at it.
  titleLg: { fontFamily: fonts.body, fontSize: 17, lineHeight: 22, fontWeight: '600' as const },
  title: { fontFamily: fonts.body, fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, fontWeight: '500' as const },
  bodyMedium: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, fontWeight: '500' as const },
  bodySm: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21, fontWeight: '500' as const },
  bodySmMedium: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21, fontWeight: '500' as const },

  // Label scale — uses fonts.label (Regular per brand).
  label: { fontFamily: fonts.label, fontSize: 14, lineHeight: 20 },
  labelSemibold: { fontFamily: fonts.label, fontSize: 14, lineHeight: 20, fontWeight: '600' as const },

  // Caption scale — uses fonts.caption. fontWeight: '500' requests Medium.
  caption: { fontFamily: fonts.caption, fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  captionMedium: { fontFamily: fonts.caption, fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  small: { fontFamily: fonts.caption, fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  smallSemibold: { fontFamily: fonts.caption, fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
  micro: { fontFamily: fonts.caption, fontSize: 11, lineHeight: 16, fontWeight: '500' as const },

  // Button scale — uses fonts.button (Bold per brand).
  button: { fontFamily: fonts.button, fontSize: 16, lineHeight: 22, fontWeight: '700' as const },
  buttonSm: { fontFamily: fonts.button, fontSize: 14, lineHeight: 20, fontWeight: '700' as const },

  // Eyebrow / overline — uses fonts.caption with bold weight synthesis.
  overline: {
    fontFamily: fonts.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
  },

  // Mono (photo placeholders, tech-y labels).
  mono: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1 },
  monoCaption: { fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1 },
} as const;

// -----------------------------------------------------------------------------
// Spacing — padding, margin, gap. Only pick from this scale.
// -----------------------------------------------------------------------------

export const space = {
  xxxs: 2,
  xxs: 3,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  xxl: 44,
} as const;

// -----------------------------------------------------------------------------
// Radii — semantic names are preferred; ordinal names kept for compat.
// -----------------------------------------------------------------------------

export const radius = {
  // Ordinal (legacy, kept for back-compat)
  sm: 8,
  md: 14,
  lg: 22,
  xl: 32,
  pill: 999,
  // Semantic (prefer these)
  thumb: 10, // small rounded chips, thumbnails
  chip: 12, // plan cards, photo slots
  input: 14, // form fields (matches radius.md by value)
  card: 16, // standard card / prompt card
  sheet: 18, // modals, hero images
  bigSheet: 28, // bottom-sheet modal rounded top
} as const;

// -----------------------------------------------------------------------------
// Shadow presets — spread into style objects.
// -----------------------------------------------------------------------------

export const shadow = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },
  softCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdown: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  plan: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  fab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  fabBold: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  fabStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 40,
    elevation: 8,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  pill: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
} as const;

// -----------------------------------------------------------------------------
// Border weights.
// -----------------------------------------------------------------------------

export const border = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  medium: 1.5,
  thick: 2,
  bold: 2.5,
} as const;

// -----------------------------------------------------------------------------
// Opacity ramp — used for disabled/muted overlays and tonal reductions.
// -----------------------------------------------------------------------------

export const opacity = {
  faint: 0.25,
  muted: 0.4,
  half: 0.5,
  soft: 0.6,
  dim: 0.7,
  strong: 0.8,
} as const;

// -----------------------------------------------------------------------------
// Gradients — two-stop pairs ready for <LinearGradient colors={...}/>.
// -----------------------------------------------------------------------------

export const gradient = {
  heroDark: ['#6b5345', '#2c1f17'] as const,
  heroTan: ['#d4b098', '#8a6a52'] as const,
  heroBlue: ['#b4cfe0', '#7aa4c4'] as const,
  heroBluePhoto: ['#a5c7dc', '#6a91b0'] as const,
  heroPlusTier: ['#7a98ba', '#384a6a'] as const,
  heroProTier: [colorsDark.heroTop, colorsDark.heroBottom] as const,
  mapCanvas: ['#e8ebdd', '#dde4d2'] as const,
  accentGlow: ['rgba(153,78,168,0.45)', 'rgba(153,78,168,0)'] as const,

  // Welcome/intro phone shell
  phoneShell: [colors.heroTop, colors.heroBottom] as const,

  // Premium plans hero background
  plansBg: [colors.bg, colors.accentSoft] as const,

  // Paywall Pro feature thumbs
  thumbA: ['#b6806a', '#5a3022'] as const,
  thumbB: ['#b07957', '#5a2f1e'] as const,
  thumbC: ['#a96f4c', '#5a3a24'] as const,

  // Likes list avatar placeholders
  avatar1: ['#ddc2a8', '#7a5844'] as const,
  avatar2: ['#e6b8ae', '#8c5546'] as const,
  avatar3: ['#d9c59a', '#7d6b41'] as const,
  avatar4: ['#c6b79a', '#5b513d'] as const,
} as const;

// -----------------------------------------------------------------------------
// Named sizes for recurring fixed-dimension elements.
// -----------------------------------------------------------------------------

export const size = {
  fab: 60, // ArrowFAB
  fabLg: 52, // strong action (heart, pass) — existing discover
  fabMd: 48, // action row buttons
  fabSm: 44, // header icons, photo-card like button
  fabXs: 40, // small overlay buttons
  fabTiny: 36, // tiny inline like button
  stepAvatar: 44, // step-icon circle in StepTitle / onboarding
  tabAvatar: 30, // tab bar profile avatar
  tabBar: 84,
  pickerBand: 52, // highlight band height on pickers
  heroImage: 170, // paywall hero image
  plans: 110, // plan card width
} as const;

// Legacy export — keep until all call sites stop using it.
export const row = 58;
