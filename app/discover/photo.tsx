// 16 Discovery · Photo — hero photo card + prompt card variant of the browse feed.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { border, fonts, gradient, radius, shadow, size, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import PromptCard from '@/components/PromptCard';
import TabBarVisual from '@/components/TabBarVisual';
import { IconRewind, IconHeart, IconX, IconDots } from '@/components/Icon';

export default function DiscoverPhoto() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        nameRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          paddingHorizontal: space.lg,
          paddingTop: 4,
          paddingBottom: 14,
        },
        name: {
          fontFamily: fonts.display,
          fontSize: 30,
          color: role.textPrimary,
          letterSpacing: -0.3,
        },
        active: {
          color: role.secondary,
          ...type.captionMedium,
        },
        photoCard: {
          marginHorizontal: space.lg,
          borderRadius: radius.card,
          overflow: 'hidden',
          aspectRatio: 1 / 1.15,
          position: 'relative',
          backgroundColor: role.photoBackstop,
        },
        photoCenter: {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
        },
        photoLabel: {
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 1,
          color: role.textOnPhotoScrim,
        },
        photoHeart: {
          position: 'absolute',
          right: 14,
          bottom: 14,
          width: size.fabSm,
          height: size.fabSm,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.fabBold,
        },
        floatX: {
          position: 'absolute',
          left: space.lg,
          bottom: 104,
        },
        fab: {
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        right={
          <View style={{ flexDirection: 'row', gap: 18 }}>
            <IconRewind size={22} color={role.textPrimary} stroke={border.medium} />
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M4 6h10M4 12h6M4 18h14" />
              <Circle cx={18} cy={6} r={2} />
              <Circle cx={14} cy={12} r={2} />
            </Svg>
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>Drew</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{ width: 7, height: 7, borderRadius: radius.pill, backgroundColor: role.secondary }} />
            <Text style={styles.active}>Active today</Text>
          </View>
          <View style={{ flex: 1 }} />
          <IconDots size={22} color={role.textPrimary} />
        </View>
        <View style={styles.photoCard}>
          <LinearGradient
            colors={gradient.heroTan}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.photoCenter} pointerEvents="none">
            <Text style={styles.photoLabel}>PORTRAIT PLACEHOLDER</Text>
          </View>
          <Pressable style={styles.photoHeart} onPress={() => router.push('/profile/demo')}>
            <IconHeart size={20} color={role.primary} stroke={1.8} />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: space.lg, marginTop: space.md }}>
          <PromptCard
            label="The hallmark of a good relationship is"
            answer="A good flirt to roast ratio"
          />
        </View>
      </ScrollView>
      <View style={styles.floatX} pointerEvents="box-none">
        <Pressable style={styles.fab}>
          <IconX size={18} color={role.textPrimary} stroke={2} />
        </Pressable>
      </View>
      <TabBarVisual active="discover" />
    </SafeAreaView>
  );
}
