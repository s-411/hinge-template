// 15 Discovery · Prompt — photo card + prompt card + floating action row.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { border, fonts, gradient, radius, shadow, size, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import PromptCard from '@/components/PromptCard';
import { IconRewind, IconSliders, IconDots, IconHeart, IconX } from '@/components/Icon';

export default function Discover() {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        nameRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          paddingHorizontal: space.lg,
          paddingTop: space.xs,
          paddingBottom: 14,
        },
        name: {
          fontFamily: fonts.display,
          fontSize: 30,
          color: role.textPrimary,
          letterSpacing: -0.3,
        },
        activeLabel: {
          color: role.secondary,
          ...type.captionMedium,
        },
        photoCard: {
          marginHorizontal: space.lg,
          borderRadius: radius.sheet,
          overflow: 'hidden',
          aspectRatio: 1 / 1.05,
          position: 'relative',
          backgroundColor: role.photoBackstop,
        },
        photoLabel: {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
        },
        photoLabelText: {
          ...type.small,
          ...type.mono,
          color: role.textOnPhotoMute,
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
          ...shadow.fabStrong,
        },
        actionRow: {
          position: 'absolute',
          left: space.lg,
          right: space.lg,
          bottom: 104,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        actionBtn: {
          width: size.fabLg,
          height: size.fabLg,
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
          <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }}>
            <IconRewind size={22} color={role.textMuted} stroke={border.medium} />
            <IconSliders size={22} color={role.textPrimary} stroke={border.medium} />
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>Kris</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{ width: 7, height: 7, borderRadius: radius.pill, backgroundColor: role.secondary }} />
            <Text style={styles.activeLabel}>Active today</Text>
          </View>
          <View style={{ flex: 1 }} />
          <IconDots size={22} color={role.textPrimary} stroke={border.medium} />
        </View>

        <View style={styles.photoCard}>
          <LinearGradient
            colors={gradient.heroDark}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.photoLabel}>
            <Text style={styles.photoLabelText}>PHOTO 1 / 6</Text>
          </View>
          <Pressable style={styles.photoHeart}>
            <IconHeart size={20} color={role.primary} stroke={1.8} />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: space.lg, marginTop: space.md }}>
          <PromptCard
            label="My most irrational fear"
            answer="Talking to a live bard after 11pm."
          />
        </View>
      </ScrollView>

      <View style={styles.actionRow} pointerEvents="box-none">
        <Pressable style={styles.actionBtn}>
          <IconX size={20} color={role.textPrimary} stroke={1.8} />
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <IconHeart size={20} color={role.primary} stroke={1.8} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
