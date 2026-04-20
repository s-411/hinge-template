import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { border, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  borderBottom?: boolean;
  center?: boolean;
};

export default function ScreenHeader({ title, left, right, borderBottom, center }: Props) {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: space.lg,
          paddingVertical: 18,
          minHeight: 56,
        },
        side: { flex: 1, flexDirection: 'row', alignItems: 'center' },
        right: { justifyContent: 'flex-end' },
        title: {
          ...type.titleLg,
          color: role.textPrimary,
          letterSpacing: -0.2,
          textAlign: 'center',
        },
      }),
    [role],
  );
  return (
    <View
      style={[
        styles.row,
        borderBottom && { borderBottomWidth: border.hairline, borderBottomColor: role.border },
      ]}
    >
      <View style={styles.side}>{left}</View>
      {title !== undefined && title !== '' ? (
        <Text style={[styles.title, center && { flex: 2 }]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={center ? { flex: 2 } : { flex: 0 }} />
      )}
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}
