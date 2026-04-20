// 30 Dating Preferences.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconX, IconChev, IconLock } from '@/components/Icon';

export default function Preferences() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: {
          ...type.caption,
          fontFamily: fonts.sansMedium,
          color: role.textMuted,
          paddingTop: 8,
          paddingBottom: 12,
          letterSpacing: 0.1,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: space.md,
          gap: space.sm,
        },
        rowLabel: { ...type.titleLg, fontFamily: fonts.sansMedium, color: role.textPrimary },
        rowDetail: { ...type.label, fontFamily: undefined, color: role.textSecondary, marginTop: 3 },
        trailingLabel: {
          ...type.caption,
          color: role.textMuted,
          marginRight: 4,
        },
        upgradeCard: {
          backgroundColor: role.primarySoft,
          borderRadius: radius.input,
          paddingVertical: 12,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginTop: space.sm,
          marginBottom: space.sm,
        },
        upgradeBtn: {
          backgroundColor: role.surfaceElevated,
          paddingVertical: 8,
          paddingHorizontal: space.md,
          borderRadius: radius.pill,
        },
        upgradeBtnText: {
          ...type.captionMedium,
          fontFamily: fonts.sansSemibold,
          color: role.primary,
        },
        upgradeText: {
          flex: 1,
          ...type.caption,
          color: role.textPrimary,
        },
      }),
    [role],
  );

  function SectionLabel({ children }: { children: React.ReactNode }) {
    return <Text style={styles.section}>{children}</Text>;
  }

  function PrefRow({
    label,
    detail,
    locked,
    trailingLabel,
    last,
  }: {
    label: string;
    detail: string;
    locked?: boolean;
    trailingLabel?: string;
    last?: boolean;
  }) {
    return (
      <View
        style={[
          styles.row,
          !last && { borderBottomWidth: border.hairline, borderBottomColor: role.border },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.rowLabel}>{label}</Text>
          <Text style={styles.rowDetail}>{detail}</Text>
        </View>
        {trailingLabel ? <Text style={styles.trailingLabel}>{trailingLabel}</Text> : null}
        {locked ? (
          <IconLock size={18} color={role.textPrimary} stroke={border.medium} />
        ) : (
          <IconChev size={16} color={role.textMuted} stroke={2} />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        title="Dating Preferences"
        center
        borderBottom
        right={
          <Pressable onPress={() => router.back()}>
            <IconX size={22} color={role.textPrimary} stroke={border.medium} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ paddingHorizontal: space.lg, paddingTop: 22, paddingBottom: space.sm }}>
          <SectionLabel>Member Preferences</SectionLabel>
          <PrefRow label="I'm interested in" detail="Men" />
          <PrefRow label="My neighborhood" detail="Brighton" />
          <PrefRow label="Maximum distance" detail="80 mi" />
          <PrefRow label="Age range" detail="28 – 51" trailingLabel="Dealbreaker" />
          <PrefRow label="Ethnicity" detail="Open to all" />
          <PrefRow label="Religion" detail="Open to all" last />
        </View>

        <View style={{ paddingHorizontal: space.lg, paddingTop: 18, paddingBottom: 8 }}>
          <SectionLabel>Subscriber Preferences</SectionLabel>
          <View style={styles.upgradeCard}>
            <Pressable style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </Pressable>
            <Text style={styles.upgradeText}>Fine tune your preferences with a subscription.</Text>
          </View>
          <PrefRow label="Height" detail={`3' 0" — 7' 0"`} locked />
          <PrefRow label="Children" detail="Open to all" locked last />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
