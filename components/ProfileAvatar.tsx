// Gradient circle avatar placeholder.
// Uses a seed string to pick an OKLCH-like hue, approximated with HSL for RN compatibility.
import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius } from '@/theme/tokens';

function hueFromSeed(seed: string) {
  const n = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (n * 37) % 360;
}

export default function ProfileAvatar({ size = 60, seed = 'a' }: { size?: number; seed?: string }) {
  const hue = hueFromSeed(seed);
  const warmA = `hsl(${hue}, 35%, 72%)`;
  const warmB = `hsl(${(hue + 20) % 360}, 40%, 55%)`;
  const dot = `hsl(${(hue + 15) % 360}, 45%, 48%)`;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.pill,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <LinearGradient
        colors={[warmA, warmB]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: [{ translateX: -(size * 0.25) }, { translateY: -(size * 0.2) }],
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: radius.pill,
          backgroundColor: dot,
        }}
      />
    </View>
  );
}
