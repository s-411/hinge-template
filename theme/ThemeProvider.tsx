// Theme context + useTheme hook. Mount <ThemeProvider> once at the app root.
// Every screen/component reads its semantic role from useTheme() — switching
// mode or hue re-renders consumers automatically.
//
// Mode values:
//   'system' — follow the OS appearance (useColorScheme())
//   'light'  — force light
//   'dark'   — force dark
//
// Primary/secondary hue values are PaletteKey strings (see PALETTE_KEYS in
// tokens.ts) or null to use the baked-in defaults.
//
// Preferences are persisted to AsyncStorage so the app comes back in the
// user's chosen theme after a restart.
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {
  PALETTE_KEYS,
  PaletteKey,
  Role,
  gradient,
  palette,
  resolveGradient,
  resolveRole,
} from './tokens';

// Widen each gradient pair so the dark resolver can provide different hex
// literals without a type mismatch, while keeping it a two-stop tuple so
// `<LinearGradient colors={...}>` type-checks.
type Gradient = { [K in keyof typeof gradient]: readonly [string, string] };

export type ThemeMode = 'system' | 'light' | 'dark';
type ResolvedMode = 'light' | 'dark';

type Theme = {
  mode: ThemeMode;
  resolvedMode: ResolvedMode;
  role: Role;
  gradient: Gradient;
  setMode: (mode: ThemeMode) => void;
  primaryHue: PaletteKey | null;
  secondaryHue: PaletteKey | null;
  setPrimaryHue: (key: PaletteKey | null) => void;
  setSecondaryHue: (key: PaletteKey | null) => void;
  pageBgHex: string | null;
  cardBgHex: string | null;
  setPageBgHex: (hex: string | null) => void;
  setCardBgHex: (hex: string | null) => void;
};

// Namespace AsyncStorage keys by app slug so two forks of this template share
// no state when installed on the same dev device. Falls back to 'app' if slug
// isn't resolvable (e.g. during certain test harnesses).
const ns = Constants.expoConfig?.slug ?? 'app';
const MODE_KEY = `${ns}.themeMode`;
const PRIMARY_KEY = `${ns}.primaryHue`;
const SECONDARY_KEY = `${ns}.secondaryHue`;
const PAGE_BG_KEY = `${ns}.pageBgHex`;
const CARD_BG_KEY = `${ns}.cardBgHex`;

function isHex(v: unknown): v is string {
  return typeof v === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
}

const ThemeContext = createContext<Theme | null>(null);

function isPaletteKey(v: unknown): v is PaletteKey {
  return typeof v === 'string' && (PALETTE_KEYS as readonly string[]).includes(v);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [primaryHue, setPrimaryHueState] = useState<PaletteKey | null>(null);
  const [secondaryHue, setSecondaryHueState] = useState<PaletteKey | null>(null);
  const [pageBgHex, setPageBgHexState] = useState<string | null>(null);
  const [cardBgHex, setCardBgHexState] = useState<string | null>(null);

  // Hydrate persisted preferences on first mount. Failures are silent so the
  // theme still works in-memory when the native module is unavailable
  // (e.g. Expo Go version mismatch, missing dev client rebuild).
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(MODE_KEY),
      AsyncStorage.getItem(PRIMARY_KEY),
      AsyncStorage.getItem(SECONDARY_KEY),
      AsyncStorage.getItem(PAGE_BG_KEY),
      AsyncStorage.getItem(CARD_BG_KEY),
    ])
      .then(([storedMode, storedPrimary, storedSecondary, storedPageBg, storedCardBg]) => {
        if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'system') {
          setModeState(storedMode);
        }
        if (isPaletteKey(storedPrimary)) setPrimaryHueState(storedPrimary);
        if (isPaletteKey(storedSecondary)) setSecondaryHueState(storedSecondary);
        if (isHex(storedPageBg)) setPageBgHexState(storedPageBg);
        if (isHex(storedCardBg)) setCardBgHexState(storedCardBg);
      })
      .catch(() => {});
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(MODE_KEY, next).catch(() => {});
  }, []);

  const setPrimaryHue = useCallback((key: PaletteKey | null) => {
    setPrimaryHueState(key);
    if (key === null) {
      AsyncStorage.removeItem(PRIMARY_KEY).catch(() => {});
    } else {
      AsyncStorage.setItem(PRIMARY_KEY, key).catch(() => {});
    }
  }, []);

  const setSecondaryHue = useCallback((key: PaletteKey | null) => {
    setSecondaryHueState(key);
    if (key === null) {
      AsyncStorage.removeItem(SECONDARY_KEY).catch(() => {});
    } else {
      AsyncStorage.setItem(SECONDARY_KEY, key).catch(() => {});
    }
  }, []);

  const setPageBgHex = useCallback((hex: string | null) => {
    setPageBgHexState(hex);
    if (hex === null) {
      AsyncStorage.removeItem(PAGE_BG_KEY).catch(() => {});
    } else {
      AsyncStorage.setItem(PAGE_BG_KEY, hex).catch(() => {});
    }
  }, []);

  const setCardBgHex = useCallback((hex: string | null) => {
    setCardBgHexState(hex);
    if (hex === null) {
      AsyncStorage.removeItem(CARD_BG_KEY).catch(() => {});
    } else {
      AsyncStorage.setItem(CARD_BG_KEY, hex).catch(() => {});
    }
  }, []);

  const resolvedMode: ResolvedMode =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const value = useMemo<Theme>(
    () => ({
      mode,
      resolvedMode,
      role: resolveRole(resolvedMode, {
        primary: primaryHue ? palette[primaryHue] : undefined,
        secondary: secondaryHue ? palette[secondaryHue] : undefined,
        pageBg: pageBgHex ?? undefined,
        cardBg: cardBgHex ?? undefined,
      }),
      gradient: resolveGradient(resolvedMode),
      setMode,
      primaryHue,
      secondaryHue,
      setPrimaryHue,
      setSecondaryHue,
      pageBgHex,
      cardBgHex,
      setPageBgHex,
      setCardBgHex,
    }),
    [
      mode,
      resolvedMode,
      primaryHue,
      secondaryHue,
      pageBgHex,
      cardBgHex,
      setMode,
      setPrimaryHue,
      setSecondaryHue,
      setPageBgHex,
      setCardBgHex,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be called inside <ThemeProvider>');
  }
  return ctx;
}
