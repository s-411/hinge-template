// 23 What Works — 4-card editorial guide grid.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Path, Line } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconX } from '@/components/Icon';
import { brand } from '@/lib/brand';
import { whatWorksCards, whatWorksIntroLead, type WhatWorksIlloKind } from '@/lib/fixtures';

type IlloKind = WhatWorksIlloKind;

const ITEMS = whatWorksCards;

export default function WhatWorks() {
  const router = useRouter();
  const { role } = useTheme();
  const ink = role.textPrimary;
  const acc = role.primary;
  const soft = role.primarySoft;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        intro: {
          ...type.body,
          color: role.textPrimary,
          textAlign: 'center',
          paddingVertical: 20,
          paddingHorizontal: 40,
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: space.sm,
          paddingHorizontal: space.lg,
          paddingTop: 8,
        },
        card: {
          width: '48%',
          backgroundColor: role.surfaceCard,
          borderRadius: radius.card,
          paddingHorizontal: space.md,
          paddingVertical: 18,
          minHeight: 220,
          borderWidth: border.hairline,
          borderColor: role.border,
        },
        cardTitle: {
          fontFamily: fonts.display,
          fontSize: 26,
          color: role.textPrimary,
          letterSpacing: -0.2,
        },
        cardSub: {
          ...type.caption,
          color: role.textSecondary,
          marginTop: 4,
        },
        illoBox: {
          flex: 1,
          marginTop: space.sm,
          borderRadius: radius.thumb,
          backgroundColor: role.surfacePage,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
      }),
    [role],
  );

  function Illo({ kind }: { kind: IlloKind }) {
    if (kind === 'camera') {
      return (
        <Svg viewBox="0 0 120 80" width="90%" height="90%">
          <Rect x={18} y={18} width={84} height={52} rx={6} fill="none" stroke={ink} strokeWidth={border.medium} />
          <Circle cx={60} cy={44} r={16} fill="none" stroke={ink} strokeWidth={border.medium} />
          <Circle cx={60} cy={44} r={10} fill={soft} />
          <Rect x={48} y={12} width={24} height={10} fill="none" stroke={ink} strokeWidth={border.medium} />
          <Circle cx={92} cy={28} r={2} fill={ink} />
        </Svg>
      );
    }
    if (kind === 'quote') {
      return (
        <Svg viewBox="0 0 120 80" width="90%" height="90%">
          <Rect x={12} y={16} width={96} height={42} rx={4} fill="none" stroke={ink} strokeWidth={border.medium} />
          <Path d="M22 28h60M22 36h72M22 44h50" stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
          <Circle cx={96} cy={66} r={14} fill={soft} />
          <Path d="M92 62c1 2 1 4 0 6M100 62c1 2 1 4 0 6" stroke={ink} strokeWidth={border.medium} strokeLinecap="round" />
        </Svg>
      );
    }
    if (kind === 'sun') {
      return (
        <Svg viewBox="0 0 120 80" width="90%" height="90%">
          <Circle cx={60} cy={44} r={18} fill={soft} stroke={ink} strokeWidth={border.medium} />
          <Path d="M56 42a4 4 0 018 0 6 6 0 01-4 6 6 6 0 01-4-6z" fill={acc} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = i * 45 - 90;
            const x1 = 60 + Math.cos((a * Math.PI) / 180) * 26;
            const y1 = 44 + Math.sin((a * Math.PI) / 180) * 26;
            const x2 = 60 + Math.cos((a * Math.PI) / 180) * 34;
            const y2 = 44 + Math.sin((a * Math.PI) / 180) * 34;
            return (
              <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={border.medium} strokeLinecap="round" />
            );
          })}
        </Svg>
      );
    }
    return (
      <Svg viewBox="0 0 120 80" width="90%" height="90%">
        <Rect x={16} y={18} width={70} height={38} rx={4} fill={soft} stroke={ink} strokeWidth={border.medium} />
        <Path d="M30 56l-4 8 12-8" fill={soft} stroke={ink} strokeWidth={border.medium} strokeLinejoin="round" />
        <Rect x={40} y={32} width={60} height={38} rx={4} fill={role.surfacePage} stroke={ink} strokeWidth={border.medium} />
        <Path d="M90 70l4 8-12-8" fill={role.surfacePage} stroke={ink} strokeWidth={border.medium} strokeLinejoin="round" />
      </Svg>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        title="What Works"
        center
        borderBottom
        right={
          <Pressable onPress={() => router.back()}>
            <IconX size={22} color={role.textPrimary} stroke={border.medium} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.intro}>
          {whatWorksIntroLead} {brand.name} journey.
        </Text>
        <View style={styles.grid}>
          {ITEMS.map((it) => (
            <View key={it.t} style={styles.card}>
              <Text style={styles.cardTitle}>{it.t}</Text>
              <Text style={styles.cardSub}>{it.s}</Text>
              <View style={styles.illoBox}>
                <Illo kind={it.ill} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
