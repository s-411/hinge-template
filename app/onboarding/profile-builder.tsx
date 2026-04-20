// 13 Profile Builder — three dashed prompt slots with floating + badges.
import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import StepTitle from '@/components/StepTitle';
import ArrowFAB from '@/components/ArrowFAB';
import { IconQuote, IconPlus } from '@/components/Icon';

export default function ProfileBuilder() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        slot: {
          borderWidth: border.medium,
          borderStyle: 'dashed',
          borderColor: role.textMuted,
          borderRadius: radius.input,
          padding: 22,
          position: 'relative',
        },
        slotLineA: {
          fontStyle: 'italic',
          fontSize: 16,
          color: role.textMuted,
          marginBottom: 4,
          fontFamily: fonts.sans,
        },
        slotLineB: {
          fontStyle: 'italic',
          fontSize: 16,
          color: role.textMuted,
          opacity: 0.7,
          fontFamily: fonts.sans,
        },
        badge: {
          position: 'absolute',
          top: -14,
          right: space.md,
          width: 34,
          height: 34,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        note: {
          ...type.label,
          fontFamily: fonts.sans,
          color: role.textMuted,
          marginTop: 4,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <StepTitle
          icon={<IconQuote size={22} color={role.textPrimary} stroke={border.medium} />}
          title={<>Write your profile{'\n'}answers</>}
          step={5}
          total={11}
        />
        <View style={{ paddingHorizontal: 28, gap: space.md }}>
          {[0, 1, 2].map((i) => (
            <Pressable key={i} onPress={() => router.push('/prompts/library')} style={styles.slot}>
              <Text style={styles.slotLineA}>Select a Prompt</Text>
              <Text style={styles.slotLineB}>And write your own answer</Text>
              <View style={styles.badge}>
                <IconPlus size={18} color={role.onPrimary} stroke={2.2} />
              </View>
            </Pressable>
          ))}
          <Text style={styles.note}>3 answers required</Text>
        </View>
      </ScrollView>
      <ArrowFAB onPress={() => router.push('/(tabs)/discover')} />
    </SafeAreaView>
  );
}
