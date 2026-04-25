// Shared paywall body used by Connect+ (light) and Connect Pro (dark) tiers.
// Connect+ follows the app theme (light in light mode, dark in dark mode).
// Connect Pro always uses colorsDark regardless of app theme — that's a brand
// decision. Pro is the "this is premium" moment and stays visually dark.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import {
  border,
  colors,
  colorsDark,
  fonts,
  gradient,
  radius,
  size,
  space,
  type,
} from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import FeatureRow from '@/components/FeatureRow';
import { IconX } from '@/components/Icon';
import { brand } from '@/lib/brand';
import { paywallBenefits, tierPlans } from '@/lib/fixtures';

type Tier = 'plus' | 'pro';

const PLANS = tierPlans;

function PlusFeatureIcon({ kind, color }: { kind: string; color: string }) {
  const common = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: border.medium,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'inf')
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" {...common}>
        <Path d="M8 8a4 4 0 014 4 4 4 0 008 0 4 4 0 00-8 0 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4z" />
      </Svg>
    );
  if (kind === 'person')
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" {...common}>
        <Circle cx={12} cy={8} r={3} />
        <Path d="M6 20c0-3 3-6 6-6s6 3 6 6" />
      </Svg>
    );
  if (kind === 'prefs')
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" {...common}>
        <Path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M20 18h0" />
        <Circle cx={16} cy={6} r={2} />
        <Circle cx={10} cy={12} r={2} />
        <Circle cx={17} cy={18} r={2} />
      </Svg>
    );
  if (kind === 'star')
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24" {...common}>
        <Path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
      </Svg>
    );
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" {...common}>
      <Path d="M5 7h14M7 12h10M9 17h6" />
    </Svg>
  );
}

function ProFeatureThumb({ swatch, textOnDark, scrimGlyph }: { swatch: 'a' | 'b' | 'c'; textOnDark: string; scrimGlyph: string }) {
  const defs = {
    a: { grad: gradient.thumbA, glyph: 'sparkle' as const },
    b: { grad: gradient.thumbB, glyph: 'skip' as const },
    c: { grad: gradient.thumbC, glyph: 'heart' as const },
  };
  const d = defs[swatch];
  const Glyph = () => {
    const props = {
      fill: 'none' as const,
      stroke: textOnDark,
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };
    if (d.glyph === 'sparkle')
      return (
        <Svg width={10} height={10} viewBox="0 0 24 24" {...props}>
          <Path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
        </Svg>
      );
    if (d.glyph === 'skip')
      return (
        <Svg width={10} height={10} viewBox="0 0 24 24" {...props}>
          <Path d="M6 6l6 6-6 6M13 6l6 6-6 6" />
        </Svg>
      );
    return (
      <Svg width={10} height={10} viewBox="0 0 24 24" {...props}>
        <Path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
      </Svg>
    );
  };
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: radius.pill,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <LinearGradient
        colors={d.grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: 'absolute',
          left: 3,
          bottom: 3,
          width: 20,
          height: 20,
          borderRadius: radius.pill,
          backgroundColor: scrimGlyph,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph />
      </View>
    </View>
  );
}

export default function Paywall({ tier }: { tier: Tier }) {
  const router = useRouter();
  const { role, resolvedMode } = useTheme();
  const pro = tier === 'pro';
  // Pro is always dark regardless of app theme.
  // Plus follows the app theme — dark in dark mode, light in light mode.
  const t = pro || resolvedMode === 'dark' ? colorsDark : colors;
  const heroColors = pro ? gradient.heroProTier : gradient.heroPlusTier;
  const heroTitle = pro
    ? 'Get noticed sooner and go on\n3× as many dates'
    : 'Filter by height, dating\nintentions and more';

  const plans = PLANS[tier];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        tabs: {
          flexDirection: 'row',
          paddingHorizontal: 24,
          borderBottomWidth: border.thin,
        },
        tab: {
          flex: 1,
          paddingVertical: 14,
          alignItems: 'center',
          position: 'relative',
        },
        tabLabel: {
          fontFamily: fonts.display,
          fontSize: 20,
          letterSpacing: -0.2,
        },
        tabUnderline: {
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: 2,
        },
        hero: {
          margin: space.lg,
          marginTop: 20,
          borderRadius: radius.sheet,
          overflow: 'hidden',
          height: size.heroImage,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: space.xl,
          position: 'relative',
        },
        heroTitle: {
          fontFamily: fonts.display,
          fontSize: 24,
          color: role.textOnDark,
          textAlign: 'center',
          lineHeight: 28,
          letterSpacing: -0.2,
        },
        planCard: {
          width: size.plans,
          borderRadius: radius.chip,
          overflow: 'hidden',
        },
        planTag: {
          paddingVertical: 5,
          alignItems: 'center',
        },
        planTagLabel: {
          ...type.smallSemibold,
        },
        planDur: {
          ...type.label,
        },
        planPrice: {
          ...type.small,
          marginTop: 4,
        },
        plusRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingVertical: 12,
        },
        plusIcon: {
          width: 36,
          height: 36,
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        legal: {
          paddingHorizontal: space.lg,
          paddingTop: 14,
          ...type.micro,
          textAlign: 'center',
        },
        cta: {
          paddingVertical: 18,
          borderRadius: radius.pill,
          alignItems: 'center',
        },
        ctaLabel: {
          ...type.title,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: space.lg,
            paddingTop: space.xs,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <IconX size={22} color={t.ink} stroke={1.6} />
          </Pressable>
        </View>
        <View style={[styles.tabs, { borderBottomColor: t.line }]}>
          <Pressable
            style={styles.tab}
            onPress={() => (!pro ? null : router.replace('/premium/plus'))}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: !pro ? role.primary : t.inkSoft },
              ]}
            >
              {brand.plusName}
            </Text>
            {!pro ? <View style={[styles.tabUnderline, { backgroundColor: role.primary }]} /> : null}
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => (pro ? null : router.replace('/premium/pro'))}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: pro ? role.textOnDark : t.inkSoft },
              ]}
            >
              {brand.proName}
            </Text>
            {pro ? <View style={[styles.tabUnderline, { backgroundColor: role.textOnDark }]} /> : null}
          </Pressable>
        </View>
        <View style={styles.hero}>
          <LinearGradient
            colors={heroColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.heroTitle}>{heroTitle}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: space.sm,
            paddingHorizontal: space.lg,
            paddingTop: 18,
            paddingBottom: space.xs,
          }}
        >
          {plans.map((p, i) => (
            <View
              key={i}
              style={[
                styles.planCard,
                {
                  backgroundColor: t.bgElev,
                  borderColor: p.selected
                    ? pro
                      ? role.textOnDark
                      : role.primary
                    : t.line,
                  borderWidth: p.selected ? border.thick : border.thin,
                },
              ]}
            >
              <View
                style={[
                  styles.planTag,
                  {
                    backgroundColor: p.selected
                      ? pro
                        ? role.textOnDark
                        : role.primary
                      : pro
                        ? role.darkRowFill
                        : t.placeholder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.planTagLabel,
                    {
                      color: p.selected
                        ? pro
                          ? colorsDark.ink
                          : role.onPrimary
                        : pro
                          ? role.textOnDark
                          : t.ink,
                    },
                  ]}
                >
                  {p.tag}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: space.xs,
                  alignItems: 'center',
                }}
              >
                <Text style={[styles.planDur, { color: t.ink }]}>{p.dur}</Text>
                <Text style={[styles.planPrice, { color: t.inkSoft }]}>{p.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{ paddingHorizontal: space.lg, paddingTop: 24 }}>
          {pro
            ? paywallBenefits.pro.map((f, i, a) => (
                <FeatureRow
                  key={i}
                  icon={<ProFeatureThumb swatch={f.swatch} textOnDark={role.textOnDark} scrimGlyph={role.scrimGlyph} />}
                  title={f.title}
                  subtitle={f.subtitle}
                  lastInGroup={i === a.length - 1}
                  palette={{ ink: t.ink, inkSoft: t.inkSoft, line: t.line }}
                />
              ))
            : paywallBenefits.plus.map((f, i) => (
                <View key={i} style={styles.plusRow}>
                  <View
                    style={[
                      styles.plusIcon,
                      { backgroundColor: t.placeholder },
                    ]}
                  >
                    <PlusFeatureIcon kind={f.kind} color={t.ink} />
                  </View>
                  <Text style={{ ...type.body, color: t.ink }}>{f.title}</Text>
                </View>
              ))}
        </View>
        <Text style={[styles.legal, { color: t.inkSoft }]}>
          *To send unlimited likes, you may need to reply or end the chat where
          it's your turn.{'\n'}
          <Text style={{ textDecorationLine: 'underline' }}>Learn more</Text> |
          You will be charged, your subscription will auto-renew for the same
          price and package length until you cancel via App Store settings, and
          you agree to our{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Terms</Text>.
        </Text>
        <View style={{ paddingHorizontal: space.lg, paddingTop: 14 }}>
          <Pressable
            style={[
              styles.cta,
              { backgroundColor: pro ? role.textOnDark : role.primary },
            ]}
          >
            <Text
              style={[
                styles.ctaLabel,
                { color: pro ? colorsDark.ink : role.onPrimary },
              ]}
            >
              Get 3 months for {pro ? '$99.99' : '$89.99'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
