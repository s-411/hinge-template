// Dev gallery — every screen in the Connect design system, numbered per the
// Connect.html manifest so future work can reference them by number
// (e.g. "paywall 26", "onboarding 04"). Temporary tab wiring on the star icon.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChev } from '@/components/Icon';

type Row = { num: string; label: string; path: string; note?: string };

const SECTIONS: { title: string; subtitle: string; rows: Row[] }[] = [
  {
    title: 'Onboarding',
    subtitle: 'Welcome through sign-up question flow',
    rows: [
      { num: '01', label: 'Welcome', path: '/' },
      { num: '02', label: 'Intro', path: '/intro' },
      { num: '03', label: 'Name', path: '/onboarding/name' },
      { num: '04', label: 'Date of Birth', path: '/onboarding/date-of-birth' },
      { num: '05', label: 'Confirm Info', path: '/onboarding/confirm', note: 'transparent modal' },
      { num: '06', label: 'Location', path: '/onboarding/location' },
      { num: '07', label: 'Education', path: '/onboarding/education' },
      { num: '08', label: 'Height', path: '/onboarding/height' },
      { num: '09', label: 'Family Plans', path: '/onboarding/family-plans' },
      { num: '10', label: 'Notifications', path: '/onboarding/notifications' },
      { num: '12', label: 'Photo Grid', path: '/onboarding/photos' },
      { num: '13', label: 'Profile Builder', path: '/onboarding/profile-builder' },
      { num: '14', label: 'Prompt Library', path: '/prompts/library', note: 'slide-up modal' },
    ],
  },
  {
    title: 'Core product',
    subtitle: 'Discovery, likes, matches, tips',
    rows: [
      { num: '15', label: 'Discovery · Prompt', path: '/(tabs)/discover' },
      { num: '16', label: 'Discovery · Photo', path: '/discover/photo' },
      { num: '17', label: 'Profile Detail', path: '/profile/demo' },
      { num: '18', label: 'Bloom Upsell', path: '/modal/bloom', note: 'transparent modal' },
      { num: '19', label: 'Likes You · Boost', path: '/(tabs)/likes' },
      { num: '20', label: 'Likes You · Modal', path: '/modal/likes-info', note: 'transparent modal' },
      { num: '21', label: 'Matches · Empty', path: '/matches' },
      { num: '22', label: 'Prompt Guide', path: '/modal/prompt-guide', note: 'slide-up modal' },
      { num: '23', label: 'What Works', path: '/modal/what-works', note: 'slide-up modal' },
    ],
  },
  {
    title: 'Premium',
    subtitle: 'Paywall and subscription flows',
    rows: [
      { num: '24', label: 'Preferred Paywall', path: '/premium/preferred' },
      { num: '25', label: 'Subscription Plans', path: '/premium/plans', note: 'slide-up modal' },
      { num: '26', label: 'Connect+ Paywall', path: '/premium/plus' },
      { num: '27', label: 'Connect Pro Paywall', path: '/premium/pro', note: 'dark variant' },
    ],
  },
  {
    title: 'Your profile',
    subtitle: 'Profile detail and settings',
    rows: [
      { num: '28', label: 'Profile (self)', path: '/(tabs)/profile' },
      { num: '29', label: 'Profile · Poll banner', path: '/modal/profile-daisy', note: 'slide-up modal' },
      { num: '30', label: 'Dating Preferences', path: '/modal/preferences', note: 'slide-up modal' },
    ],
  },
  {
    title: 'Dev',
    subtitle: 'Utility screens outside the manifest',
    rows: [
      { num: '–', label: 'Edit profile', path: '/profile/edit', note: 'exercises the keyboard Hide button' },
      { num: '–', label: 'Settings', path: '/settings', note: 'theme toggle + future settings' },
    ],
  },
];

export default function Standouts() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        intro: {
          ...type.caption,
          color: role.textSecondary,
          paddingHorizontal: space.lg,
          paddingTop: 14,
          paddingBottom: space.xs,
        },
        section: {
          paddingTop: 20,
        },
        sectionTitle: {
          ...type.overline,
          color: role.textMuted,
          letterSpacing: 1.2,
          paddingHorizontal: space.lg,
        },
        sectionSubtitle: {
          ...type.small,
          color: role.textMuted,
          paddingHorizontal: space.lg,
          paddingBottom: 8,
          marginTop: 2,
        },
        group: {
          backgroundColor: role.surfaceCard,
          marginHorizontal: space.md,
          borderRadius: radius.input,
          paddingHorizontal: 18,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingVertical: space.md,
        },
        num: {
          ...type.mono,
          fontSize: 13,
          color: role.textMuted,
          width: 28,
        },
        label: {
          ...type.title,
          fontFamily: undefined,
          color: role.textPrimary,
        },
        note: {
          ...type.small,
          color: role.textSecondary,
          marginTop: 2,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader title="Screen gallery" center borderBottom />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.intro}>
          All 30 screens in the Connect design system, numbered per the manifest.
          Tap any row to preview.
        </Text>
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            <View style={styles.group}>
              {section.rows.map((r, i) => (
                <Pressable
                  key={`${section.title}-${r.num}-${i}`}
                  onPress={() => router.push(r.path as never)}
                  style={[
                    styles.row,
                    i < section.rows.length - 1 && {
                      borderBottomWidth: border.hairline,
                      borderBottomColor: role.border,
                    },
                  ]}
                >
                  <Text style={styles.num}>{r.num}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{r.label}</Text>
                    {r.note ? <Text style={styles.note}>{r.note}</Text> : null}
                  </View>
                  <IconChev size={16} color={role.textMuted} stroke={2} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
