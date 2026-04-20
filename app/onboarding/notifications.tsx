// 10 Notifications — enable/disable buttons. The real iOS permission sheet
// fires from native code when you call Notifications.requestPermissionsAsync()
// in production, so no fake overlay is rendered here — tapping Enable simply
// unlocks the continue button.
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';

export default function Notifications() {
  const router = useRouter();
  const { role } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttons: {
          paddingHorizontal: 28,
          paddingTop: space.sm,
          alignItems: 'flex-start',
          gap: space.sm,
        },
        btn: {
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceInput,
        },
        btnLabel: {
          ...type.bodySmMedium,
          color: role.textPrimary,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <StepTitle
          icon={
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M5 7c0-2 1-4 4-4h6c3 0 4 2 4 4v8a2 2 0 01-2 2h-9l-3 3V7z" />
              <Circle cx={12} cy={11} r={1.2} fill={role.textPrimary} />
            </Svg>
          }
          title={<>Never miss a message{'\n'}from someone great</>}
          step={1}
          total={16}
        />
        <View style={styles.buttons}>
          <Pressable
            onPress={() => setEnabled(true)}
            style={[
              styles.btn,
              { backgroundColor: enabled ? role.primary : role.surfaceInput },
            ]}
          >
            <Text style={[styles.btnLabel, { color: enabled ? role.onPrimary : role.textPrimary }]}>
              Enable notifications
            </Text>
          </Pressable>
          <Pressable style={[styles.btn, { opacity: enabled ? 0.6 : 1 }]}>
            <Text style={styles.btnLabel}>Disable notifications</Text>
          </Pressable>
        </View>
      </View>
      <ArrowFAB enabled={enabled} onPress={() => router.push('/onboarding/photos')} />
    </SafeAreaView>
  );
}
