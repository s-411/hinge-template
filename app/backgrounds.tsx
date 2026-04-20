// Backgrounds — dedicated non-scrolling page for the two background colour
// pickers. Lives outside Settings so the outer ScrollView can't steal the
// drag gestures on the HSV square and hue slider.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChevL } from '@/components/Icon';
import ColorPicker from '@/components/ColorPicker';

export default function Backgrounds() {
  const router = useRouter();
  const { role, pageBgHex, cardBgHex, setPageBgHex, setCardBgHex } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          flex: 1,
          padding: space.md,
          gap: space.md,
        },
        group: {
          backgroundColor: role.surfaceCard,
          borderRadius: radius.input,
          paddingHorizontal: space.lg,
          paddingVertical: space.md,
          gap: space.sm,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        label: {
          ...type.labelSemibold,
          color: role.textPrimary,
        },
        resetBtn: {
          ...type.labelSemibold,
          color: role.primary,
        },
        divider: {
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        },
      }),
    [role],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        left={
          <Pressable onPress={() => router.back()}>
            <IconChevL size={20} color={role.textPrimary} stroke={1.8} />
          </Pressable>
        }
        title="Backgrounds"
        center
        borderBottom
      />
      <View style={styles.body}>
        <View style={styles.group}>
          <View style={styles.header}>
            <Text style={styles.label}>App background</Text>
            {pageBgHex ? (
              <Pressable onPress={() => setPageBgHex(null)}>
                <Text style={styles.resetBtn}>Reset</Text>
              </Pressable>
            ) : null}
          </View>
          <ColorPicker
            value={pageBgHex ?? role.surfacePage}
            onChange={setPageBgHex}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.header}>
            <Text style={styles.label}>Content background</Text>
            {cardBgHex ? (
              <Pressable onPress={() => setCardBgHex(null)}>
                <Text style={styles.resetBtn}>Reset</Text>
              </Pressable>
            ) : null}
          </View>
          <ColorPicker
            value={cardBgHex ?? role.surfaceCard}
            onChange={setCardBgHex}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
