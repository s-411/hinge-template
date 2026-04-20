// 07 Education — onboarding question, radio-style options.
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';
import OptionRow from '@/components/OptionRow';
import { IconCap, IconEyeOff } from '@/components/Icon';

const OPTS = ['High School', 'Undergrad', 'Postgrad', 'Prefer not to say'];

export default function Education() {
  const [selected, setSelected] = useState('Undergrad');
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        hidden: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          paddingTop: 28,
        },
        hiddenText: {
          ...type.bodySm,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <StepTitle
          icon={<IconCap size={22} color={role.textPrimary} stroke={border.medium} />}
          title={<>What's the highest{'\n'}level you attained?</>}
          step={2}
          total={11}
        />
        <View style={{ paddingHorizontal: 28 }}>
          {OPTS.map((o) => (
            <OptionRow
              key={o}
              label={o}
              selected={selected === o}
              onPress={() => setSelected(o)}
            />
          ))}
          <View style={styles.hidden}>
            <IconEyeOff size={18} color={role.textPrimary} stroke={border.medium} />
            <Text style={styles.hiddenText}>Hidden on profile</Text>
          </View>
        </View>
      </ScrollView>
      <ArrowFAB enabled={!!selected} onPress={() => router.push('/onboarding/profile-builder')} />
    </SafeAreaView>
  );
}
