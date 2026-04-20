// 22 Prompt Guide — hero illustration block + tip card, with Update Prompts CTA.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { border, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChevL } from '@/components/Icon';

export default function PromptGuide() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        hero: {
          backgroundColor: role.surfaceInput,
          paddingVertical: space.xl,
          paddingHorizontal: 28,
          alignItems: 'center',
        },
        heroTitle: {
          ...type.h4,
          color: role.textPrimary,
          marginTop: 18,
          marginBottom: space.sm,
        },
        heroBody: {
          ...type.label,
          fontFamily: undefined,
          color: role.textSecondary,
          textAlign: 'center',
        },
        tipCard: {
          margin: space.lg,
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.card,
          paddingVertical: 28,
          paddingHorizontal: 24,
          alignItems: 'center',
          ...shadow.subtle,
        },
        tipLabel: {
          ...type.overline,
          color: role.textMuted,
        },
        tipTitle: {
          ...type.h4,
          color: role.textPrimary,
          marginVertical: space.sm,
          textAlign: 'center',
        },
        tipBody: {
          ...type.label,
          fontFamily: undefined,
          color: role.textSecondary,
          textAlign: 'center',
        },
        ctaBar: {
          backgroundColor: role.primary,
          paddingVertical: 22,
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
      <ScreenHeader
        left={
          <Pressable onPress={() => router.back()}>
            <IconChevL size={20} color={role.textPrimary} stroke={1.8} />
          </Pressable>
        }
        title="Prompt Guide"
        center
        borderBottom
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.hero}>
          <Svg width={150} height={110} viewBox="0 0 150 110">
            <Path
              d="M15 22 L80 18 L82 68 L38 72 L28 80 L26 70 L17 70 Z"
              fill="none"
              stroke={role.textPrimary}
              strokeWidth={border.thick}
              strokeLinejoin="round"
            />
            <Path d="M28 34h40M28 44h45M28 54h30" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" />
            <Path
              d="M85 50 L118 46 L120 78 L100 82 L95 92 L92 80 L86 80z"
              fill="none"
              stroke={role.textPrimary}
              strokeWidth={border.thick}
              strokeLinejoin="round"
            />
            <Circle cx={115} cy={34} r={14} fill={role.surfacePage} stroke={role.textPrimary} strokeWidth={border.thick} />
            <Path d="M105 34q5 -4 20 0" stroke={role.textPrimary} strokeWidth={border.thick} fill="none" />
            <Path d="M110 36q0 2 1 3M120 36q0 2 1 3" stroke={role.textPrimary} strokeWidth={1.6} strokeLinecap="round" />
            <Path d="M108 40q6 3 14 0" stroke={role.textPrimary} strokeWidth={1.6} fill="none" strokeLinecap="round" />
            <Path d="M100 50q14 4 30 0" stroke={role.textPrimary} strokeWidth={border.thick} fill="none" strokeLinecap="round" />
          </Svg>
          <Text style={styles.heroTitle}>Prompt Guide</Text>
          <Text style={styles.heroBody}>
            Put your best foot forward by creating a{'\n'}profile that brings out the real you.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>TIP 1/3</Text>
          <Text style={styles.tipTitle}>Choose a range of{'\n'}prompt questions</Text>
          <Text style={styles.tipBody}>
            Highlight your personality and dating{'\n'}intentions by answering different{'\n'}prompt themes.
          </Text>
        </View>
      </ScrollView>
      <Pressable style={styles.ctaBar} onPress={() => router.back()}>
        <Text style={styles.ctaLabel}>Update Prompts</Text>
      </Pressable>
    </SafeAreaView>
  );
}
