// 20 Likes info modal — centered card with explanatory copy over dimmed list.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { border, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function LikesInfo() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        heartWrap: {
          position: 'absolute',
          top: '14%',
          left: '50%',
          marginLeft: -70,
          width: 140,
          height: 140,
          opacity: 0.25,
        },
        card: {
          position: 'absolute',
          left: space.lg,
          right: space.lg,
          top: '30%',
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.sheet,
          paddingHorizontal: 28,
          paddingTop: 34,
          paddingBottom: 26,
          ...shadow.modal,
        },
        title: {
          ...type.h2,
          color: role.textPrimary,
          lineHeight: 33,
        },
        divider: {
          height: border.hairline,
          backgroundColor: role.border,
          marginTop: 22,
          marginBottom: 18,
        },
        ok: {
          ...type.title,
          color: role.primary,
        },
      }),
    [role],
  );
  return (
    <View style={{ flex: 1, backgroundColor: role.scrim }}>
      <View style={styles.heartWrap}>
        <Svg viewBox="0 0 140 140" width="100%" height="100%">
          <Circle cx={70} cy={75} r={40} fill={role.primarySoft} />
          <Path d="M70 50c-8 0-15 7-15 15s15 25 15 25 15-15 15-25-7-15-15-15z" fill={role.primary} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = i * 45;
            const r = 58;
            const x = 70 + Math.cos((a * Math.PI) / 180) * r;
            const y = 75 + Math.sin((a * Math.PI) / 180) * r;
            return (
              <Line
                key={i}
                x1={70}
                y1={75}
                x2={x}
                y2={y}
                stroke={role.textPrimary}
                strokeWidth={border.medium}
                strokeLinecap="round"
              />
            );
          })}
        </Svg>
      </View>

      <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

      <View style={styles.card} pointerEvents="box-none">
        <Text style={styles.title}>
          You choose whether{'\n'}to connect with the{'\n'}people that like you.
        </Text>
        <View style={styles.divider} />
        <Pressable onPress={() => router.back()}>
          <Text style={styles.ok}>OK got it</Text>
        </Pressable>
      </View>
    </View>
  );
}
