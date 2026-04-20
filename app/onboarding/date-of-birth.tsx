// 04 Date of Birth — three-column picker with highlight band + age display.
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { border, size, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';
import PickerColumn from '@/components/PickerColumn';

const MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul'];
const DAYS = [28, 29, 30, 31, ' '];
const YEARS = [' ', ' ', 2022, 2021, 2020];

export default function DateOfBirth() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        pickerWrap: {
          paddingHorizontal: 36,
          paddingTop: space.sm,
          position: 'relative',
        },
        band: {
          position: 'absolute',
          left: 28,
          right: 28,
          top: 104,
          height: size.pickerBand,
          backgroundColor: role.surfaceInput,
          borderRadius: 2,
          borderTopWidth: border.thin,
          borderBottomWidth: border.thin,
          borderColor: role.primary,
          opacity: 0.5,
        },
        columns: {
          flexDirection: 'row',
          gap: space.sm,
        },
        ageBlock: {
          marginHorizontal: 28,
          marginTop: space.xl,
          paddingTop: 20,
          borderTopWidth: border.hairline,
          borderTopColor: role.border,
          alignItems: 'center',
        },
        age: {
          ...type.titleLg,
          fontSize: 18,
          color: role.textPrimary,
        },
        note: {
          ...type.caption,
          color: role.textMuted,
          marginTop: 4,
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
              <Path d="M12 4v4M10 8h4M8 10h8l-1 10H9L8 10z" />
            </Svg>
          }
          title="What's your date of birth?"
          step={1}
          total={16}
        />
        <View style={styles.pickerWrap}>
          <View style={styles.band} />
          <View style={styles.columns}>
            <PickerColumn items={MONTHS} />
            <PickerColumn items={DAYS} />
            <PickerColumn items={YEARS} />
          </View>
        </View>
        <View style={styles.ageBlock}>
          <Text style={styles.age}>Age 0</Text>
          <Text style={styles.note}>This can't be changed later</Text>
        </View>
      </ScrollView>
      <ArrowFAB enabled={false} onPress={() => router.push('/onboarding/confirm')} />
    </SafeAreaView>
  );
}
