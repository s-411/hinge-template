// 06 Location — schematic map with neighborhood labels and a pill banner.
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { border, fonts, gradient, illustration, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';

function Pin({ size: s = 20, color }: { size?: number; color: string }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
      <Circle cx={12} cy={10} r={2.5} />
    </Svg>
  );
}

function Crosshair({ size: s = 16, color }: { size?: number; color: string }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Circle cx={12} cy={12} r={3} />
      <Circle cx={12} cy={12} r={8} />
      <Path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </Svg>
  );
}

export default function Location() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        map: {
          marginHorizontal: 28,
          borderRadius: radius.input,
          overflow: 'hidden',
          aspectRatio: 1 / 1.05,
          position: 'relative',
        },
        banner: {
          position: 'absolute',
          top: '45%',
          left: '50%',
          marginLeft: -110,
          width: 220,
          backgroundColor: role.primary,
          paddingVertical: 8,
          paddingHorizontal: 18,
          borderRadius: radius.pill,
          alignItems: 'center',
        },
        bannerText: {
          ...type.captionMedium,
          color: role.onPrimary,
        },
        currentBtn: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.pill,
          paddingVertical: 12,
          paddingHorizontal: space.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          ...shadow.dropdown,
        },
        currentText: {
          ...type.label,
          fontFamily: fonts.sansSemibold,
          color: role.textPrimary,
        },
        caption: {
          ...type.caption,
          color: role.textMuted,
          textAlign: 'center',
          marginTop: space.sm,
          marginBottom: 120,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView>
        <StepTitle
          icon={<Pin size={20} color={role.textPrimary} />}
          title="Where do you live?"
          step={2}
          total={16}
        />
        <View style={styles.map}>
          <LinearGradient
            colors={gradient.mapCanvas}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice">
            <Defs>
              <RadialGradient id="blob1" cx="80%" cy="70%" r="35%">
                <Stop offset="0%" stopColor={illustration.mapWater} stopOpacity={1} />
                <Stop offset="100%" stopColor={illustration.mapWater} stopOpacity={0} />
              </RadialGradient>
              <RadialGradient id="blob2" cx="20%" cy="90%" r="25%">
                <Stop offset="0%" stopColor={illustration.mapWater} stopOpacity={1} />
                <Stop offset="100%" stopColor={illustration.mapWater} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width={300} height={320} fill="url(#blob1)" />
            <Rect width={300} height={320} fill="url(#blob2)" />
            {[30, 90, 150, 210, 260].map((y, i) => (
              <Path
                key={`h${i}`}
                d={`M0 ${y} Q 100 ${y - 10} 300 ${y + 5}`}
                stroke={illustration.mapRoad}
                strokeWidth={border.thin}
                fill="none"
              />
            ))}
            {[40, 120, 200, 260].map((x, i) => (
              <Path
                key={`v${i}`}
                d={`M${x} 0 Q ${x + 10} 160 ${x - 5} 320`}
                stroke={illustration.mapRoad}
                strokeWidth={border.thin}
                fill="none"
              />
            ))}
            <Path d="M20 60 Q 120 80 280 100" stroke={illustration.mapRoadLight} strokeWidth={3} fill="none" />
            <Circle cx={130} cy={170} r={3} fill={illustration.mapPin} />
          </Svg>
          {[
            { t: 'Yonkers', l: '55%', tp: '15%', sz: 11 },
            { t: 'Paterson', l: '10%', tp: '20%', sz: 10 },
            { t: 'New York', l: '42%', tp: '52%', sz: 14, bold: true },
            { t: 'Brooklyn', l: '60%', tp: '65%', sz: 10 },
          ].map((p, i) => (
            <Text
              key={i}
              style={{
                position: 'absolute',
                left: p.l as any,
                top: p.tp as any,
                fontFamily: p.bold ? fonts.sansSemibold : fonts.sans,
                fontSize: p.sz,
                color: illustration.mapText,
              }}
            >
              {p.t}
            </Text>
          ))}
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Zoom in to your neighborhood</Text>
          </View>
          <View style={styles.currentBtn}>
            <Crosshair color={role.textPrimary} />
            <Text style={styles.currentText}>Go to current location</Text>
          </View>
        </View>
        <Text style={styles.caption}>Only neighborhood name is shown</Text>
      </ScrollView>
      <ArrowFAB enabled={false} onPress={() => router.push('/onboarding/education')} />
    </SafeAreaView>
  );
}
