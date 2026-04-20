// 02 Intro — editorial title with abstract concentric mascot + primary Continue band.
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function Intro() {
  const router = useRouter();
  const { role } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 32, paddingTop: 70 }}>
          <Text
            style={{
              fontFamily: fonts.display,
              fontSize: 44,
              lineHeight: 46,
              color: role.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            A warmer way{'\n'}to meet someone.
          </Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Svg width={220} height={220} viewBox="0 0 220 220">
              <Circle cx={110} cy={108} r={82} fill={role.primarySoft} opacity={0.6} />
              <Circle
                cx={110}
                cy={108}
                r={82}
                fill="none"
                stroke={role.textPrimary}
                strokeWidth={border.medium}
                strokeDasharray="2 4"
              />
              <Line x1={60} y1={155} x2={160} y2={155} stroke={role.textPrimary} strokeWidth={border.thick} strokeLinecap="round" />
              <Circle cx={90} cy={150} r={10} fill={role.surfacePage} stroke={role.textPrimary} strokeWidth={border.thick} />
              <Circle cx={90} cy={150} r={4} fill={role.textPrimary} />
              <Circle cx={130} cy={150} r={10} fill={role.surfacePage} stroke={role.textPrimary} strokeWidth={border.thick} />
              <Circle cx={130} cy={150} r={4} fill={role.textPrimary} />
            </Svg>
          </View>
        </View>
        <Pressable
          onPress={() => router.push('/onboarding/education')}
          style={{
            backgroundColor: role.primary,
            paddingTop: 28,
            paddingBottom: 46,
            alignItems: 'center',
          }}
        >
          <Text style={{ ...type.titleLg, color: role.onPrimary }}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
