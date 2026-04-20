import React, { useMemo } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { border, radius, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconCheck } from './Icon';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function OptionRow({ label, selected, onPress }: Props) {
  const { role } = useTheme();
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
        radio: {
          width: 20,
          height: 20,
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [role],
  );
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.radio,
          { backgroundColor: selected ? role.primary : role.surfaceInput },
        ]}
      >
        {selected ? <IconCheck size={12} color={role.onPrimary} stroke={2.5} /> : null}
      </View>
    </Pressable>
  );
}
