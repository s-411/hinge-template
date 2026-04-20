// Settings — currently hosts the theme mode switcher (System / Light / Dark).
// Add future global settings rows below the Appearance card.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, radius, space, type } from '@/theme/tokens';
import { ThemeMode, useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChevL } from '@/components/Icon';

const MODES: { value: ThemeMode; label: string; hint: string }[] = [
  { value: 'system', label: 'System', hint: 'Follow your device settings' },
  { value: 'light', label: 'Light', hint: 'Always use light mode' },
  { value: 'dark', label: 'Dark', hint: 'Always use dark mode' },
];

export default function Settings() {
  const router = useRouter();
  const { role, mode, setMode } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: {
          ...type.overline,
          color: role.textMuted,
          paddingHorizontal: space.lg,
          paddingTop: space.lg,
          paddingBottom: space.sm,
        },
        group: {
          backgroundColor: role.surfaceCard,
          marginHorizontal: space.md,
          borderRadius: radius.input,
          paddingHorizontal: space.lg,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.md,
          paddingVertical: space.md,
        },
        rowDivider: {
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        },
        radio: {
          width: 22,
          height: 22,
          borderRadius: radius.pill,
          borderWidth: border.medium,
          borderColor: role.textMuted,
          alignItems: 'center',
          justifyContent: 'center',
        },
        radioActive: {
          borderColor: role.primary,
        },
        radioDot: {
          width: 10,
          height: 10,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
        },
        rowLabel: {
          ...type.titleLg,
          fontFamily: undefined,
          color: role.textPrimary,
        },
        rowHint: {
          ...type.caption,
          color: role.textSecondary,
          marginTop: 2,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        left={
          <Pressable onPress={() => router.back()}>
            <IconChevL size={20} color={role.textPrimary} stroke={1.8} />
          </Pressable>
        }
        title="Settings"
        center
        borderBottom
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.section}>Appearance</Text>
        <View style={styles.group}>
          {MODES.map((m, i) => {
            const active = mode === m.value;
            return (
              <Pressable
                key={m.value}
                onPress={() => setMode(m.value)}
                style={[styles.row, i < MODES.length - 1 && styles.rowDivider]}
              >
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{m.label}</Text>
                  <Text style={styles.rowHint}>{m.hint}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
