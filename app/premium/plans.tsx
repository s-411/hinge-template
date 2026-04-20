// 25 Subscription Plans — carousel card with three duration options.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { border, fonts, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconX, IconChev } from '@/components/Icon';

const PLANS = [
  { n: 1, unit: 'month', price: '$29.99', per: '', rec: false },
  { n: 3, unit: 'months', price: '$59.99', per: '($19.99/mo)', rec: true },
  { n: 6, unit: 'months', price: '$89.99', per: '($14.99/mo)', rec: false },
];

export default function Plans() {
  const router = useRouter();
  const { role, gradient } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        legal: {
          paddingHorizontal: 20,
          paddingTop: 20,
          ...type.micro,
          color: role.textPrimary,
        },
        card: {
          marginHorizontal: space.md,
          marginTop: 14,
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.sheet,
          paddingHorizontal: 20,
          paddingTop: space.md,
          paddingBottom: 20,
          ...shadow.plan,
        },
        cardHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        restore: {
          ...type.label,
          fontFamily: fonts.sansSemibold,
          color: role.primary,
        },
        title: {
          ...type.h3,
          color: role.textPrimary,
          marginBottom: space.xs,
        },
        subtitle: {
          ...type.label,
          fontFamily: undefined,
          color: role.textSecondary,
          marginBottom: space.sm,
        },
        dots: {
          flexDirection: 'row',
          gap: space.xs,
          marginBottom: space.md,
        },
        planRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 4,
          borderTopWidth: border.hairline,
          borderTopColor: role.border,
        },
        planN: {
          fontFamily: fonts.display,
          fontSize: 30,
          color: role.textPrimary,
          marginRight: space.sm,
          letterSpacing: -0.5,
        },
        planUnit: {
          ...type.label,
          fontFamily: undefined,
          color: role.textPrimary,
        },
        planPrice: {
          ...type.label,
          fontFamily: undefined,
          color: role.textSecondary,
        },
        rec: {
          backgroundColor: role.primary,
          paddingVertical: 5,
          paddingHorizontal: space.sm,
          borderRadius: radius.pill,
          marginRight: 8,
        },
        recLabel: {
          ...type.smallSemibold,
          color: role.onPrimary,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <LinearGradient
        colors={gradient.plansBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.legal}>
          <Text style={{ fontFamily: fonts.sansBold }}>Recurring billing, cancel anytime.</Text>{'\n'}
          By tapping Subscribe, your payment will be charged to your Connect account, and your subscription will automatically renew for the same package length at the same price until you cancel in settings. By tapping Subscribe you agree to our <Text style={{ color: role.primary, fontFamily: fonts.sansSemibold }}>Terms</Text>.
        </Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.restore}>Restore subscription</Text>
            <Pressable onPress={() => router.back()}>
              <IconX size={20} color={role.textPrimary} stroke={1.8} />
            </Pressable>
          </View>
          <View style={{ alignItems: 'center', marginVertical: space.sm }}>
            <Svg width={130} height={110} viewBox="0 0 220 190">
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
              />
              <Circle cx={28} cy={60} r={10} fill="none" stroke={role.textPrimary} strokeWidth={border.thick} />
            </Svg>
          </View>
          <Text style={styles.title}>Preferred Members{'\n'}get twice as many{'\n'}dates.</Text>
          <Text style={styles.subtitle}>Here's why…</Text>
          <View style={styles.dots}>
            {[true, false, false, false, false].map((on, i) => (
              <View
                key={i}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: radius.pill,
                  backgroundColor: on ? role.textPrimary : role.border,
                }}
              />
            ))}
          </View>
          {PLANS.map((o) => (
            <Pressable key={o.n} style={styles.planRow}>
              <Text style={styles.planN}>{o.n}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.planUnit}>{o.unit}</Text>
                <Text style={styles.planPrice}>
                  {o.price} {o.per}
                </Text>
              </View>
              {o.rec ? (
                <View style={styles.rec}>
                  <Text style={styles.recLabel}>Recommended</Text>
                </View>
              ) : null}
              <IconChev size={14} color={role.textMuted} stroke={2} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
