// Settings — hosts the theme mode switcher (System / Light / Dark) and the
// primary/secondary hue pickers. Add future global settings rows below.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  PALETTE_KEYS,
  PaletteKey,
  border,
  palette,
  radius,
  space,
  type,
} from '@/theme/tokens';
import { ThemeMode, useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChevL } from '@/components/Icon';

const MODES: { value: ThemeMode; label: string; hint: string }[] = [
  { value: 'system', label: 'System', hint: 'Follow your device settings' },
  { value: 'light', label: 'Light', hint: 'Always use light mode' },
  { value: 'dark', label: 'Dark', hint: 'Always use dark mode' },
];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Settings() {
  const router = useRouter();
  const {
    role,
    mode,
    setMode,
    primaryHue,
    secondaryHue,
    setPrimaryHue,
    setSecondaryHue,
  } = useTheme();
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
        swatchBlock: {
          paddingVertical: space.md,
        },
        swatchBlockDivider: {
          borderTopWidth: border.hairline,
          borderTopColor: role.border,
        },
        subLabel: {
          ...type.labelSemibold,
          color: role.textPrimary,
          marginBottom: space.sm,
        },
        swatchRow: {
          gap: space.sm,
          paddingRight: space.lg,
          alignItems: 'flex-start',
        },
        swatchItem: {
          alignItems: 'center',
          width: 56,
        },
        swatchWrap: {
          width: 44,
          height: 44,
          borderRadius: radius.pill,
          borderWidth: border.thick,
          borderColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        swatchWrapActive: {
          borderColor: role.textPrimary,
        },
        swatch: {
          width: 36,
          height: 36,
          borderRadius: radius.pill,
        },
        swatchName: {
          ...type.caption,
          color: role.textSecondary,
          marginTop: space.xs,
          textAlign: 'center',
        },
      }),
    [role],
  );

  const renderSwatchRow = (
    selected: PaletteKey | null,
    onSelect: (key: PaletteKey) => void,
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.swatchRow}
    >
      {PALETTE_KEYS.map((key) => {
        const active = selected === key;
        return (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            style={styles.swatchItem}
          >
            <View style={[styles.swatchWrap, active && styles.swatchWrapActive]}>
              <View style={[styles.swatch, { backgroundColor: palette[key] }]} />
            </View>
            <Text style={styles.swatchName}>{capitalize(key)}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
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

        <Text style={styles.section}>Theme</Text>
        <View style={styles.group}>
          <View style={styles.swatchBlock}>
            <Text style={styles.subLabel}>Primary</Text>
            {renderSwatchRow(primaryHue, setPrimaryHue)}
          </View>
          <View style={[styles.swatchBlock, styles.swatchBlockDivider]}>
            <Text style={styles.subLabel}>Secondary</Text>
            {renderSwatchRow(secondaryHue, setSecondaryHue)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
