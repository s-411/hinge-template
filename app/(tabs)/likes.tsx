// 19 Likes You + Boost bottom sheet.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, gradient, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import BoostPill from '@/components/BoostPill';
import { IconBolt, IconX } from '@/components/Icon';

const LIKE_TILES = [
  gradient.avatar1,
  gradient.avatar2,
  gradient.avatar3,
  gradient.avatar4,
];

export default function Likes() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        heading: { fontFamily: fonts.display, fontSize: 32, color: role.textPrimary, letterSpacing: -0.3 },
        grid: {
          padding: space.lg,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
        },
        tile: {
          width: '48%',
          aspectRatio: 1 / 1.25,
          borderRadius: radius.input,
          overflow: 'hidden',
          backgroundColor: role.surfaceInput,
        },
        overlay: { ...StyleSheet.absoluteFillObject },
        dim: { ...StyleSheet.absoluteFillObject, backgroundColor: role.scrim },
        sheet: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: role.surfaceElevated,
          borderTopLeftRadius: radius.bigSheet,
          borderTopRightRadius: radius.bigSheet,
          paddingTop: 28,
          paddingHorizontal: 24,
          paddingBottom: 110,
        },
        boltBadge: {
          position: 'absolute',
          top: -32,
          left: '50%',
          marginLeft: -32,
          width: 64,
          height: 64,
          borderRadius: radius.pill,
          backgroundColor: role.secondary,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.pill,
        },
        closeBtn: { position: 'absolute', top: 22, right: 22 },
        sheetTitle: {
          fontFamily: fonts.display,
          fontSize: 32,
          color: role.textPrimary,
          textAlign: 'center',
          marginTop: 18,
          marginBottom: space.sm,
          letterSpacing: -0.3,
          lineHeight: 35,
        },
        sheetSub: {
          ...type.bodySm,
          color: role.textSecondary,
          textAlign: 'center',
          marginBottom: 24,
        },
        recBadge: {
          position: 'absolute',
          top: -10,
          right: 22,
          backgroundColor: role.secondarySoft,
          borderColor: role.secondary,
          borderWidth: border.hairline,
          paddingVertical: 4,
          paddingHorizontal: space.sm,
          borderRadius: radius.pill,
          zIndex: 2,
        },
        recBadgeText: {
          ...type.smallSemibold,
          color: role.secondary,
        },
        boostOption: {
          paddingVertical: space.md,
          paddingHorizontal: 22,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceCard,
          borderColor: role.border,
          borderWidth: border.medium,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        },
        boostText: {
          ...type.title,
          color: role.textPrimary,
        },
        boostPrice: {
          ...type.title,
          color: role.secondary,
        },
        superCard: {
          marginTop: space.md,
          backgroundColor: role.surfaceCard,
          paddingVertical: 18,
          paddingHorizontal: 20,
          borderRadius: radius.sheet,
          alignItems: 'center',
        },
        superSub: {
          ...type.label,
          color: role.textPrimary,
          marginBottom: 14,
          textAlign: 'center',
        },
        superBtn: {
          width: '100%',
          paddingVertical: space.md,
          borderRadius: radius.pill,
          backgroundColor: role.secondary,
          alignItems: 'center',
        },
        superBtnText: {
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
        left={<Text style={styles.heading}>Likes You</Text>}
        right={<BoostPill />}
      />
      <Pressable onPress={() => router.push('/modal/likes-info')} style={styles.grid}>
        {LIKE_TILES.map((grad, i) => (
          <View key={i} style={styles.tile}>
            <LinearGradient
              colors={grad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
          </View>
        ))}
      </Pressable>

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.dim} />
        <View style={styles.sheet}>
          <View style={styles.boltBadge}>
            <IconBolt size={26} color={role.textOnDark} fill={role.textOnDark} stroke={1.5} />
          </View>
          <Pressable style={styles.closeBtn}>
            <IconX size={22} color={role.textPrimary} stroke={border.medium} />
          </Pressable>
          <Text style={styles.sheetTitle}>
            Boost your profile{'\n'}for more views
          </Text>
          <Text style={styles.sheetSub}>Get seen by 11× more people for{'\n'}one hour.</Text>

          {[
            { n: 1, price: '$9.99', rec: false },
            { n: 3, price: '$8.99', rec: true },
            { n: 5, price: '$7.99', rec: false },
          ].map((o) => (
            <View key={o.n} style={{ position: 'relative', marginBottom: space.sm }}>
              {o.rec ? (
                <View style={styles.recBadge}>
                  <Text style={styles.recBadgeText}>Recommended</Text>
                </View>
              ) : null}
              <View style={styles.boostOption}>
                <Text style={styles.boostText}>
                  {o.n} Boost{o.n > 1 ? 's' : ''}
                </Text>
                <Text style={styles.boostPrice}>{o.price} each</Text>
              </View>
            </View>
          ))}

          <View style={styles.superCard}>
            <Text style={styles.superSub}>
              Increase your chances of getting more{'\n'}likes with a 24 hour Superboost
            </Text>
            <Pressable style={styles.superBtn}>
              <Text style={styles.superBtnText}>Superboost for $19.99</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
