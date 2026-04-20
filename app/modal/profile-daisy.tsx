// 29 Profile — Daisy variant with Prompt Poll banner.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import BoostPill from '@/components/BoostPill';
import ProfileAvatar from '@/components/ProfileAvatar';
import { IconPencil, IconSliders, IconGear, IconBulb, IconList, IconX } from '@/components/Icon';

export default function ProfileDaisy() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingHorizontal: space.lg,
          paddingTop: space.md,
        },
        avatarWrap: {
          width: 54,
          height: 54,
          borderRadius: radius.pill,
          overflow: 'hidden',
        },
        name: {
          ...type.h3,
          color: role.textPrimary,
        },
        memberRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
        memberText: { ...type.caption, color: role.textSecondary },
        pollCard: {
          marginHorizontal: space.lg,
          marginTop: 22,
          backgroundColor: role.primarySoft,
          borderRadius: radius.sheet,
          paddingTop: 28,
          paddingBottom: 22,
          paddingHorizontal: 24,
          alignItems: 'center',
        },
        pollIconWrap: {
          width: 52,
          height: 52,
          borderRadius: radius.pill,
          backgroundColor: role.primaryTint,
          marginBottom: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        pollTitle: {
          ...type.titleLg,
          fontFamily: fonts.sansBold,
          fontSize: 18,
          color: role.textPrimary,
        },
        pollSub: {
          ...type.label,
          fontFamily: undefined,
          color: role.textPrimary,
          marginTop: 6,
          textAlign: 'center',
        },
        pollBtn: {
          marginTop: 18,
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
        },
        pollBtnText: {
          ...type.bodySmMedium,
          fontFamily: fonts.sansSemibold,
          color: role.onPrimary,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 18,
        },
        rowLabel: { ...type.titleLg, fontFamily: undefined, color: role.textPrimary },
        upsell: {
          marginHorizontal: space.lg,
          marginTop: 14,
          paddingVertical: 12,
          paddingHorizontal: space.md,
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.pill,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          borderWidth: border.hairline,
          borderColor: role.border,
        },
        upsellBtn: {
          backgroundColor: role.textPrimary,
          paddingVertical: space.sm,
          paddingHorizontal: 18,
          borderRadius: radius.pill,
        },
        upsellBtnText: {
          ...type.captionMedium,
          fontFamily: fonts.sansSemibold,
          color: role.surfacePage,
        },
        upsellText: {
          flex: 1,
          ...type.caption,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <ProfileAvatar size={54} seed="daisy" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Daisy</Text>
            <View style={styles.memberRow}>
              <Text style={styles.memberText}>Connect member</Text>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill={role.textPrimary}>
                <Path d="M12 2l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z" />
              </Svg>
            </View>
          </View>
          <BoostPill />
          <Pressable style={{ marginLeft: 8 }} onPress={() => router.back()}>
            <IconX size={22} color={role.textPrimary} stroke={border.medium} />
          </Pressable>
        </View>

        <View style={styles.pollCard}>
          <View style={styles.pollIconWrap}>
            <IconList size={22} color={role.primary} stroke={1.8} />
          </View>
          <Text style={styles.pollTitle}>Add a Prompt Poll</Text>
          <Text style={styles.pollSub}>Kick-start the conversation with{'\n'}your matches.</Text>
          <Pressable style={styles.pollBtn}>
            <Text style={styles.pollBtnText}>Check it out</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: space.lg }}>
          {[
            { l: 'Edit Profile', i: <IconPencil size={20} color={role.textPrimary} stroke={border.medium} /> },
            { l: 'Dating Preferences', i: <IconSliders size={20} color={role.textPrimary} stroke={border.medium} /> },
            { l: 'Settings', i: <IconGear size={20} color={role.textPrimary} stroke={border.medium} /> },
            { l: 'Help Center', i: <IconBulb size={20} color={role.textPrimary} stroke={border.medium} /> },
          ].map((r, i, arr) => (
            <View
              key={r.l}
              style={[
                styles.row,
                i < arr.length - 1 && {
                  borderBottomWidth: border.hairline,
                  borderBottomColor: role.border,
                },
              ]}
            >
              <Text style={styles.rowLabel}>{r.l}</Text>
              {r.i}
            </View>
          ))}
        </View>

        <View style={styles.upsell}>
          <Pressable style={styles.upsellBtn}>
            <Text style={styles.upsellBtnText}>Learn more</Text>
          </Pressable>
          <Text style={styles.upsellText}>Preferred Members go on twice as many dates.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
