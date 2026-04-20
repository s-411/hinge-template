// 18 Bloom Upsell — bottom sheet asking to upgrade a Like to a Bloom.
import React, { useMemo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ModalSheet from '@/components/ModalSheet';

export default function Bloom() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          ...type.h3,
          color: role.textPrimary,
          marginBottom: space.sm,
          textAlign: 'center',
        },
        body: {
          ...type.bodySm,
          color: role.textSecondary,
          marginBottom: 28,
          textAlign: 'center',
        },
        cta: {
          alignSelf: 'stretch',
          paddingVertical: 18,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
          alignItems: 'center',
          marginBottom: 18,
        },
        ctaLabel: {
          ...type.title,
          color: role.onPrimary,
        },
        secondary: {
          ...type.bodySmMedium,
          fontWeight: '600',
          color: role.primary,
        },
      }),
    [role],
  );
  return (
    <ModalSheet
      onDismiss={() => router.back()}
      icon={
        <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={role.primaryDeep} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 14v7" />
          <Path d="M12 14c-4 0-7-3-7-7 4 0 7 3 7 7z" />
          <Path d="M12 14c4 0 7-3 7-7-4 0-7 3-7 7z" />
        </Svg>
      }
    >
      <Text style={styles.title}>Send a Bloom instead?</Text>
      <Text style={styles.body}>
        Upgrade your Like to a Bloom to be{'\n'}seen first and increase your chance{'\n'}of a match.
      </Text>
      <Pressable style={styles.cta} onPress={() => router.back()}>
        <Text style={styles.ctaLabel}>Send a Bloom</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.secondary}>Send Like anyway</Text>
      </Pressable>
    </ModalSheet>
  );
}
