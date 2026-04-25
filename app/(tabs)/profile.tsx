// 28 Profile (self).
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import BoostPill from '@/components/BoostPill';
import ProfileAvatar from '@/components/ProfileAvatar';
import { IconPencil, IconSliders, IconGear, IconBulb } from '@/components/Icon';
import { brand } from '@/lib/brand';
import { demoProfiles } from '@/lib/fixtures';

export default function Profile() {
  const router = useRouter();
  const { role } = useTheme();
  const rows = [
    { label: 'Dating Preferences', icon: <IconSliders size={22} color={role.textPrimary} stroke={border.medium} />, go: '/modal/preferences' },
    { label: 'Settings', icon: <IconGear size={22} color={role.textPrimary} stroke={border.medium} />, go: '/settings' },
    { label: 'What Works', icon: <IconBulb size={22} color={role.textPrimary} stroke={border.medium} />, go: '/modal/what-works' },
    { label: 'Prompt Poll (demo)', icon: <IconBulb size={22} color={role.textPrimary} stroke={border.medium} />, go: '/modal/profile-daisy' },
  ];
  const styles = useMemo(
    () =>
      StyleSheet.create({
        heading: { fontFamily: fonts.display, fontSize: 32, color: role.textPrimary, letterSpacing: -0.3 },
        avatarWrap: { alignItems: 'center', paddingTop: 36, paddingBottom: 14 },
        avatarRing: {
          width: 140,
          height: 140,
          borderRadius: radius.pill,
          borderWidth: border.thick,
          borderColor: role.primary,
          padding: 5,
          position: 'relative',
        },
        avatarInner: {
          width: '100%',
          height: '100%',
          borderRadius: radius.pill,
          overflow: 'hidden',
        },
        editBtn: {
          position: 'absolute',
          bottom: 2,
          left: '50%',
          marginLeft: -18,
          width: 36,
          height: 36,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.dropdown,
        },
        name: {
          fontFamily: fonts.sansSemibold,
          fontSize: 22,
          color: role.textPrimary,
          marginTop: 28,
        },
        memberRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
        memberText: { ...type.label, fontFamily: undefined, color: role.textSecondary },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 22,
        },
        rowLabel: { ...type.titleLg, fontFamily: undefined, color: role.textPrimary },
        upsell: {
          marginHorizontal: space.lg,
          marginTop: 28,
          paddingVertical: 14,
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
      <ScreenHeader
        left={<Text style={styles.heading}>Profile</Text>}
        right={<BoostPill />}
        borderBottom
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing}>
            <View style={styles.avatarInner}>
              <ProfileAvatar size={130} seed={demoProfiles.self.name.toLowerCase()} />
            </View>
            <View style={styles.editBtn}>
              <IconPencil size={16} color={role.textPrimary} stroke={border.medium} />
            </View>
          </View>
          <Text style={styles.name}>{demoProfiles.self.name}</Text>
          <View style={styles.memberRow}>
            <Text style={styles.memberText}>{brand.memberLabel}</Text>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill={role.secondary}>
              <Path d="M12 2l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z" />
              <Path
                d="M8 12l3 3 5-5"
                fill="none"
                stroke={role.textOnDark}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>

        <View style={{ marginHorizontal: space.lg, marginTop: 14 }}>
          {rows.map((r, i, arr) => (
            <Pressable
              key={r.label}
              onPress={() => r.go && router.push(r.go as any)}
              style={[
                styles.row,
                i < arr.length - 1 && {
                  borderBottomWidth: border.hairline,
                  borderBottomColor: role.border,
                },
              ]}
            >
              <Text style={styles.rowLabel}>{r.label}</Text>
              {r.icon}
            </Pressable>
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
