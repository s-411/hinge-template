// 09 Family Plans — option list with circular indicator + profile visibility.
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';
import { IconCheck } from '@/components/Icon';

const OPTS = [
  "Don't want children",
  'Want children',
  'Open to children',
  'Not sure',
  'Prefer not to say',
];

export default function FamilyPlans() {
  const router = useRouter();
  const { role } = useTheme();
  const [selected, setSelected] = useState<string | null>(null);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 18,
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        },
        label: {
          ...type.body,
          color: role.textPrimary,
        },
        dot: {
          width: 20,
          height: 20,
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        visible: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          paddingTop: 22,
        },
        checkbox: {
          width: 18,
          height: 18,
          borderRadius: 4,
          borderWidth: border.thick,
          borderColor: role.primary,
        },
        visibleText: {
          ...type.bodySm,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <StepTitle
          icon={
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium} strokeLinecap="round" strokeLinejoin="round">
              <Circle cx={12} cy={7} r={3} />
              <Path d="M6 20c0-4 3-7 6-7s6 3 6 7M9 13h6" />
            </Svg>
          }
          title={<>What are your family{'\n'}plans?</>}
          step={4}
          total={16}
        />
        <View style={{ paddingHorizontal: 28 }}>
          {OPTS.map((o) => {
            const active = selected === o;
            return (
              <Pressable key={o} onPress={() => setSelected(o)} style={styles.row}>
                <Text style={styles.label}>{o}</Text>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: active ? role.primary : role.surfaceInput },
                  ]}
                >
                  {active ? <IconCheck size={12} color={role.onPrimary} stroke={2.5} /> : null}
                </View>
              </Pressable>
            );
          })}
          <View style={styles.visible}>
            <View style={styles.checkbox} />
            <Text style={styles.visibleText}>Visible on profile</Text>
          </View>
        </View>
      </ScrollView>
      <ArrowFAB enabled={!!selected} onPress={() => router.push('/onboarding/notifications')} />
    </SafeAreaView>
  );
}
