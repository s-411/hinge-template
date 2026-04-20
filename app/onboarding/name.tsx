// 03 Name — first/last name inputs with underline and hint.
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Rect, Path } from 'react-native-svg';
import { border, fonts, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';

export default function Name() {
  const router = useRouter();
  const { role } = useTheme();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const styles = useMemo(
    () =>
      StyleSheet.create({
        field: {
          borderBottomWidth: border.thin,
          borderBottomColor: role.textPrimary,
          paddingVertical: 8,
          marginBottom: 22,
        },
        input: {
          fontFamily: fonts.display,
          fontSize: 22,
          color: role.textPrimary,
          fontStyle: 'italic',
          padding: 0,
        },
        hint: {
          ...type.bodySm,
          color: role.textSecondary,
          marginTop: 4,
        },
        hintLink: {
          color: role.primary,
          fontFamily: fonts.sansSemibold,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <StepTitle
          icon={
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={role.textPrimary} strokeWidth={border.medium}>
              <Rect x={3} y={6} width={18} height={12} rx={2} />
              <Path d="M3 10h18M7 14h4" />
            </Svg>
          }
          title={<>What's your name?</>}
          step={0}
          total={16}
        />
        <View style={{ paddingHorizontal: 28, paddingTop: 14 }}>
          <View style={styles.field}>
            <TextInput
              value={first}
              onChangeText={setFirst}
              placeholder="First name (required)"
              placeholderTextColor={role.textMuted}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              value={last}
              onChangeText={setLast}
              placeholder="Last name"
              placeholderTextColor={role.textMuted}
              style={styles.input}
            />
          </View>
          <Text style={styles.hint}>
            Last name is optional, and only shared with matches.{' '}
            <Text style={styles.hintLink}>Why?</Text>
          </Text>
        </View>
      </ScrollView>
      <ArrowFAB enabled={first.length > 0} onPress={() => router.push('/onboarding/date-of-birth')} />
    </SafeAreaView>
  );
}
