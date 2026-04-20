// 08 Height — vertical picker with highlight band and visibility notice.
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { border, fonts, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';

const HEIGHTS = [`5' 3"`, `5' 4"`, `5' 5"`, `5' 6"`, `5' 7"`];

export default function Height() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        pickerWrap: {
          paddingHorizontal: 28,
          paddingTop: space.sm,
          position: 'relative',
        },
        band: {
          position: 'absolute',
          left: 28,
          right: 28,
          top: 114,
          height: 56,
          backgroundColor: role.surfaceInput,
          opacity: 0.4,
          borderRadius: 4,
          borderTopWidth: border.thin,
          borderBottomWidth: border.thin,
          borderColor: role.textPrimary,
        },
        visibility: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          marginTop: 20,
          paddingTop: 20,
          borderTopWidth: border.hairline,
          borderTopColor: role.border,
        },
        visibilityText: {
          ...type.bodySm,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView>
        <StepTitle
          icon={
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
              <Rect x={8} y={3} width={8} height={18} rx={2} />
              <Path d="M8 7h3M8 11h3M8 15h3M8 19h3" />
            </Svg>
          }
          title="How tall are you?"
          step={3}
          total={16}
        />
        <View style={styles.pickerWrap}>
          <View style={styles.band} />
          {HEIGHTS.map((h, i) => {
            const dist = Math.abs(i - 2);
            const op = dist === 0 ? 1 : dist === 1 ? 0.45 : 0.2;
            const sz = dist === 0 ? 32 : dist === 1 ? 24 : 20;
            return (
              <Text
                key={h}
                style={{
                  textAlign: 'center',
                  paddingVertical: space.md,
                  fontFamily: dist === 0 ? fonts.sansSemibold : fonts.sans,
                  fontSize: sz,
                  color: role.textPrimary,
                  opacity: op,
                }}
              >
                {h}
              </Text>
            );
          })}
          <View style={styles.visibility}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <Circle cx={12} cy={12} r={3} />
            </Svg>
            <Text style={styles.visibilityText}>Always visible on profile</Text>
          </View>
        </View>
      </ScrollView>
      <ArrowFAB enabled onPress={() => router.push('/onboarding/family-plans')} />
    </SafeAreaView>
  );
}
