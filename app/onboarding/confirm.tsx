// 05 Confirm Info — transparent modal confirming DOB.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { border, radius, shadow, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function Confirm() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: role.scrimLight,
        },
        card: {
          position: 'absolute',
          left: 22,
          right: 22,
          top: '32%',
          backgroundColor: role.surfaceElevated,
          borderRadius: radius.sheet,
          overflow: 'hidden',
          ...shadow.modal,
        },
        body: {
          paddingHorizontal: 28,
          paddingTop: 28,
          paddingBottom: 24,
        },
        title: {
          ...type.h2,
          color: role.textPrimary,
        },
        info: {
          marginTop: 22,
          ...type.body,
          color: role.textPrimary,
        },
        actions: {
          flexDirection: 'row',
          borderTopWidth: border.hairline,
          borderTopColor: role.border,
        },
        btn: {
          flex: 1,
          paddingVertical: 18,
          alignItems: 'center',
        },
        btnDivide: {
          borderRightWidth: border.hairline,
          borderRightColor: role.border,
        },
        btnEdit: {
          ...type.bodyMedium,
          color: role.textPrimary,
        },
        btnConfirm: {
          ...type.title,
          color: role.primary,
        },
      }),
    [role],
  );
  return (
    <View style={styles.root}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      <View style={styles.card} pointerEvents="box-none">
        <View style={styles.body}>
          <Text style={styles.title}>Please confirm{'\n'}your info</Text>
          <Text style={styles.info}>27 years old{'\n'}Born March 28, 1995</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={[styles.btn, styles.btnDivide]} onPress={() => router.back()}>
            <Text style={styles.btnEdit}>Edit</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => router.replace('/onboarding/location')}>
            <Text style={styles.btnConfirm}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
