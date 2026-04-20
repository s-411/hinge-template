// 12 Photo Grid — dashed 3-column grid of 6 photo slots, each with a + badge.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ArrowFAB from '@/components/ArrowFAB';
import { IconPlus, IconBulb } from '@/components/Icon';

function PhotoIcon({ color, size: s = 32, opacity = 0.6 }: { color: string; size?: number; opacity?: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      <Rect x={3} y={5} width={18} height={14} rx={2} />
      <Circle cx={9} cy={11} r={2} />
      <Path d="M21 16l-5-5-6 6" />
    </Svg>
  );
}

export default function Photos() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          paddingHorizontal: 28,
          paddingTop: 28,
          paddingBottom: 24,
        },
        circleIcon: {
          width: 44,
          height: 44,
          borderRadius: radius.pill,
          borderWidth: border.medium,
          borderColor: role.textPrimary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 22,
        },
        title: {
          ...type.h1,
          color: role.textPrimary,
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: space.sm,
          paddingHorizontal: 22,
        },
        slot: {
          width: '31.5%',
          aspectRatio: 1 / 1.15,
          borderRadius: radius.chip,
          borderWidth: border.medium,
          borderStyle: 'dashed',
          borderColor: role.textMuted,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        },
        badge: {
          position: 'absolute',
          right: space.xs,
          bottom: space.xs,
          width: 28,
          height: 28,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        hint: {
          ...type.caption,
          color: role.textMuted,
        },
        tip: {
          marginHorizontal: 28,
          marginTop: 22,
          padding: 18,
          borderWidth: border.thin,
          borderColor: role.border,
          borderRadius: radius.input,
          alignItems: 'center',
          gap: space.xs,
        },
        tipText: {
          ...type.label,
          color: role.textPrimary,
          textAlign: 'center',
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <View style={styles.circleIcon}>
            <PhotoIcon color={role.textPrimary} size={22} opacity={1} />
          </View>
          <Text style={styles.title}>Pick your videos and{'\n'}photos</Text>
        </View>
        <View style={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Pressable key={i} style={styles.slot}>
              <PhotoIcon color={role.textMuted} />
              <View style={styles.badge}>
                <IconPlus size={16} color={role.onPrimary} stroke={2.2} />
              </View>
            </Pressable>
          ))}
        </View>
        <View style={{ paddingHorizontal: 28, paddingTop: space.md }}>
          <Text style={styles.hint}>Tap to edit, drag to reorder</Text>
          <Text style={styles.hint}>6 photos/videos required</Text>
        </View>
        <View style={styles.tip}>
          <IconBulb size={22} color={role.textPrimary} stroke={border.medium} />
          <Text style={styles.tipText}>
            Videos bring your profile to life, giving{'\n'}others a better sense of who you are.
          </Text>
        </View>
      </ScrollView>
      <ArrowFAB enabled onPress={() => router.push('/onboarding/profile-builder')} />
    </SafeAreaView>
  );
}
