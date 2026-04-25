import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import { isHexDark } from '@/theme/color';
import KeyboardHideButton from '@/components/KeyboardHideButton';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    TiemposHeadline_400Regular: require('../assets/fonts/tiempos/TiemposHeadline-Regular.otf'),
    TiemposHeadline_400RegularItalic: require('../assets/fonts/tiempos/TiemposHeadline-RegularItalic.otf'),
    ModernEra_400Regular: require('../assets/fonts/ModernEra/ModernEra-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <RootNav />
      <KeyboardHideButton />
    </ThemeProvider>
  );
}

function RootNav() {
  const { role } = useTheme();
  return (
    <>
      <StatusBar style={isHexDark(role.surfacePage) ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: role.surfacePage },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="intro" />
        <Stack.Screen name="onboarding/name" />
        <Stack.Screen name="onboarding/date-of-birth" />
        <Stack.Screen
          name="onboarding/confirm"
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen name="onboarding/location" />
        <Stack.Screen name="onboarding/education" />
        <Stack.Screen name="onboarding/height" />
        <Stack.Screen name="onboarding/family-plans" />
        <Stack.Screen name="onboarding/notifications" />
        <Stack.Screen name="onboarding/photos" />
        <Stack.Screen name="onboarding/profile-builder" />
        <Stack.Screen
          name="prompts/library"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="discover/photo" />
        <Stack.Screen name="profile/[id]" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="matches" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="backgrounds" />
        <Stack.Screen name="premium/preferred" />
        <Stack.Screen
          name="premium/plans"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="premium/plus" />
        <Stack.Screen name="premium/pro" />
        <Stack.Screen
          name="modal/likes-info"
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="modal/what-works"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="modal/preferences"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="modal/profile-daisy"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="modal/bloom"
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="modal/prompt-guide"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </>
  );
}
