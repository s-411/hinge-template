// 24 Preferred Paywall — illustration, benefit checklist, bottom CTA bar.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { border, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconCheck } from '@/components/Icon';

const BENEFITS = [
  'Send unlimited likes',
  'See everyone who likes you',
  'Set extra preferences',
  'See 2× Standouts',
];

export default function Preferred() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        illoWrap: {
          paddingTop: 60,
          alignItems: 'center',
        },
        title: {
          ...type.h1,
          color: role.textPrimary,
          textAlign: 'center',
          marginHorizontal: 28,
          marginTop: space.xl,
          marginBottom: 26,
        },
        list: {
          paddingHorizontal: 28,
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: space.md,
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        },
        rowLabel: {
          ...type.bodySm,
          color: role.textPrimary,
        },
        maybe: {
          ...type.bodySmMedium,
          fontWeight: '600',
          textAlign: 'center',
          paddingTop: space.xl,
          color: role.primary,
        },
        ctaBar: {
          backgroundColor: role.primary,
          paddingTop: 22,
          paddingBottom: 36,
          alignItems: 'center',
        },
        ctaLabel: {
          ...type.title,
          color: role.onPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.illoWrap}>
          <Svg width={200} height={170} viewBox="0 0 220 190">
            <Circle cx={135} cy={78} r={62} fill={role.primarySoft} />
            <Path
              d="M40 80 L150 75 L155 165 L50 170 Z"
              fill={role.surfaceElevated}
              stroke={role.textPrimary}
              strokeWidth={border.bold}
              strokeLinejoin="round"
            />
            <Path
              d="M55 90 L145 85 L148 158 L62 162 Z"
              fill="none"
              stroke={role.textPrimary}
              strokeWidth={border.thick}
              strokeLinejoin="round"
            />
            <Path d="M70 72 L65 95 L75 92 Z" fill={role.textPrimary} />
            <Path d="M110 68 L105 92 L115 88 Z" fill={role.textPrimary} />
            <Circle cx={28} cy={60} r={10} fill="none" stroke={role.textPrimary} strokeWidth={border.thick} />
            <Path d="M22 58q2 -1 4 0M30 58q2 -1 4 0" stroke={role.textPrimary} strokeWidth={1.8} fill="none" strokeLinecap="round" />
            <Path d="M24 66q2 1 6 0" stroke={role.textPrimary} strokeWidth={1.8} fill="none" strokeLinecap="round" />
            <Path d="M22 70q4 2 10 2" stroke={role.textPrimary} strokeWidth={border.thick} fill="none" strokeLinecap="round" />
          </Svg>
        </View>
        <Text style={styles.title}>Meet your person{'\n'}sooner with Preferred</Text>
        <View style={styles.list}>
          {BENEFITS.map((l, i) => (
            <View
              key={l}
              style={[
                styles.row,
                i === 0 && { borderTopWidth: border.hairline, borderTopColor: role.border },
              ]}
            >
              <Text style={styles.rowLabel}>{l}</Text>
              <IconCheck size={16} color={role.primary} stroke={2.2} />
            </View>
          ))}
        </View>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.maybe}>Maybe later</Text>
        </Pressable>
      </ScrollView>
      <Pressable style={styles.ctaBar} onPress={() => router.push('/premium/plans')}>
        <Text style={styles.ctaLabel}>Check it out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
