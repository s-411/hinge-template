// 17 Profile Detail — hero photo, prompt card, stats row, facts list.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { border, gradient, radius, shadow, size, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import PromptCard from '@/components/PromptCard';
import { IconChevL, IconDots, IconHeart, IconX } from '@/components/Icon';
import { demoProfiles } from '@/lib/fixtures';

const FACTS = demoProfiles.detail.facts;

export default function ProfileDetail() {
  const router = useRouter();
  const { role } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const name =
    typeof id === 'string'
      ? id.charAt(0).toUpperCase() + id.slice(1)
      : demoProfiles.detail.defaultName;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        hero: {
          marginHorizontal: space.lg,
          borderRadius: radius.card,
          overflow: 'hidden',
          height: 240,
          position: 'relative',
        },
        heroHeart: {
          position: 'absolute',
          right: 12,
          bottom: 12,
          width: size.fabXs,
          height: size.fabXs,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.fab,
        },
        stats: {
          marginTop: space.sm,
          marginHorizontal: space.lg,
          backgroundColor: role.surfaceCard,
          borderRadius: radius.card,
          paddingVertical: 14,
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        statCell: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        statLabel: {
          ...type.label,
          fontFamily: undefined,
          color: role.textPrimary,
        },
        facts: {
          marginTop: space.sm,
          marginHorizontal: space.lg,
          backgroundColor: role.surfaceCard,
          borderRadius: radius.card,
        },
        factRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 14,
          paddingHorizontal: 20,
          paddingVertical: space.md,
        },
        factLabel: {
          ...type.bodySm,
          color: role.textPrimary,
          flex: 1,
        },
        photo2: {
          marginTop: 20,
          marginHorizontal: space.lg,
          borderRadius: radius.card,
          overflow: 'hidden',
          height: 180,
        },
        passFab: {
          position: 'absolute',
          left: space.lg,
          bottom: 30,
          width: size.fabMd,
          height: size.fabMd,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.fab,
        },
      }),
    [role],
  );

  function StatIcon({ kind }: { kind: 'age' | 'height' | 'loc' }) {
    const p = { fill: 'none', stroke: role.textPrimary, strokeWidth: border.medium, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    if (kind === 'age')
      return (
        <Svg width={16} height={16} viewBox="0 0 24 24" fill={role.textPrimary}>
          <Circle cx={12} cy={6} r={3} />
          <Path d="M6 19c0-4 3-7 6-7s6 3 6 7" />
        </Svg>
      );
    if (kind === 'height')
      return (
        <Svg width={16} height={16} viewBox="0 0 24 24" {...p}>
          <Rect x={9} y={3} width={6} height={18} rx={1} />
        </Svg>
      );
    return (
      <Svg width={16} height={16} viewBox="0 0 24 24" {...p}>
        <Path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
        <Circle cx={12} cy={10} r={2} />
      </Svg>
    );
  }

  function FactIcon({ kind }: { kind: 'work' | 'school' | 'home' }) {
    const p = { fill: 'none', stroke: role.textPrimary, strokeWidth: border.medium, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    if (kind === 'work')
      return (
        <Svg width={18} height={18} viewBox="0 0 24 24" {...p}>
          <Rect x={3} y={8} width={18} height={12} rx={2} />
          <Path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" />
        </Svg>
      );
    if (kind === 'school')
      return (
        <Svg width={18} height={18} viewBox="0 0 24 24" {...p}>
          <Path d="M12 5l10 4-10 4-10-4 10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
        </Svg>
      );
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" {...p}>
        <Path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z" />
      </Svg>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        left={
          <Pressable onPress={() => router.back()}>
            <IconChevL size={20} color={role.textPrimary} stroke={1.8} />
          </Pressable>
        }
        title={name === 'Demo' ? demoProfiles.detail.defaultName : name}
        center
        right={<IconDots size={22} color={role.textPrimary} />}
        borderBottom
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.hero}>
          <LinearGradient
            colors={gradient.heroBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Pressable style={styles.heroHeart}>
            <IconHeart size={18} color={role.primary} stroke={1.8} />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: space.lg, marginTop: space.sm }}>
          <PromptCard
            label={demoProfiles.detail.prompt.label}
            answer={demoProfiles.detail.prompt.answer}
            answerSize={36}
            showLikeButton
          />
        </View>
        <View style={styles.stats}>
          {[
            { kind: 'age' as const, label: demoProfiles.detail.age },
            { kind: 'height' as const, label: demoProfiles.detail.height },
            { kind: 'loc' as const, label: demoProfiles.detail.location },
          ].map((s, i) => (
            <View key={i} style={styles.statCell}>
              <StatIcon kind={s.kind} />
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.facts}>
          {FACTS.map((f, i) => (
            <View
              key={i}
              style={[
                styles.factRow,
                i < FACTS.length - 1 && {
                  borderBottomWidth: border.hairline,
                  borderBottomColor: role.border,
                },
              ]}
            >
              <View style={{ paddingTop: 2 }}>
                <FactIcon kind={f.kind} />
              </View>
              <Text style={styles.factLabel}>{f.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.photo2}>
          <LinearGradient
            colors={gradient.heroBluePhoto}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </ScrollView>
      <Pressable style={styles.passFab}>
        <IconX size={18} color={role.textPrimary} stroke={2} />
      </Pressable>
    </SafeAreaView>
  );
}
