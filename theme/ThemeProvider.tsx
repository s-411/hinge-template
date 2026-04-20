// Theme context + useTheme hook. Mount <ThemeProvider> once at the app root.
// Every screen/component reads its semantic role from useTheme() — switching
// mode re-renders consumers automatically.
//
// Mode values:
//   'system' — follow the OS appearance (useColorScheme())
//   'light'  — force light
//   'dark'   — force dark
//
// Preference is persisted to AsyncStorage so the app comes back in the
// user's chosen mode after a restart.
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
import {
  Role,
  gradient,
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
};

const STORAGE_KEY = 'connect.themeMode';

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Hydrate persisted preference on first mount. Failures are silent so the
  // theme toggle still works in-memory when the native module is unavailable
  // (e.g. Expo Go version mismatch, missing dev client rebuild).
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setModeState(stored);
        }
      })
      .catch(() => {});
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const resolvedMode: ResolvedMode =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const value = useMemo<Theme>(
    () => ({
      mode,
      resolvedMode,
      role: resolveRole(resolvedMode),
      gradient: resolveGradient(resolvedMode),
      setMode,
    }),
    [mode, resolvedMode, setMode],
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
