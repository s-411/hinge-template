// 21 Matches · Empty — empty-state illustration and boost CTA, with visual TabBar.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import TabBarVisual from '@/components/TabBarVisual';

export default function Matches() {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        heading: {
          fontFamily: fonts.display,
          fontSize: 30,
          color: role.textPrimary,
          letterSpacing: -0.3,
        },
        center: {
          flex: 1,
          alignItems: 'center',
          paddingTop: 40,
          paddingHorizontal: 40,
          paddingBottom: 100,
        },
        title: {
          ...type.titleLg,
          color: role.textPrimary,
          marginTop: 28,
          textAlign: 'center',
        },
        body: {
          ...type.bodySm,
          color: role.textSecondary,
          marginTop: space.sm,
          textAlign: 'center',
        },
        cta: {
          marginTop: space.xl,
          paddingVertical: space.md,
          paddingHorizontal: 26,
          borderRadius: radius.pill,
          backgroundColor: role.secondary,
        },
        ctaLabel: {
          ...type.bodySmMedium,
          fontFamily: fonts.sansSemibold,
          color: role.textOnDark,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        left={<Text style={styles.heading}>Matches</Text>}
        borderBottom
      />
      <View style={styles.center}>
        <Svg width={180} height={130} viewBox="0 0 180 130">
          <Path
            d="M20 28 L110 22 L115 88 L50 92 L35 104 L32 90 L22 90 Z"
            fill="none"
            stroke={role.textPrimary}
            strokeWidth={border.bold}
            strokeLinejoin="round"
          />
          <Path
            d="M70 42 L118 38 L120 100 L108 110 L108 98 L160 92 L158 50 L114 54"
            fill={role.secondarySoft}
            fillOpacity={0.8}
            stroke={role.textPrimary}
            strokeWidth={border.bold}
            strokeLinejoin="round"
          />
          <Path
            d="M30 42h50M30 52h60M30 62h45M80 56h60M80 66h70M80 76h50"
            stroke={role.textPrimary}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.title}>You're new here! No matches yet.</Text>
        <Text style={styles.body}>When a Like turns into a connection, you can{'\n'}chat here.</Text>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaLabel}>Try boosting your profile</Text>
        </Pressable>
      </View>
      <TabBarVisual active="chats" />
    </SafeAreaView>
  );
}
