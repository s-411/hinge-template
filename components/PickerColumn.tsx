import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  items: (string | number)[];
  center?: number;
  width?: number;
};

export default function PickerColumn({ items, center = 2 }: Props) {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        cell: {
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <View style={{ flex: 1, height: 260 }}>
      {items.map((v, i) => {
        const dist = Math.abs(i - center);
        const op = dist === 0 ? 1 : dist === 1 ? 0.35 : 0.15;
        const sz = dist === 0 ? 28 : dist === 1 ? 22 : 18;
        return (
          <Text
            key={i}
            style={[
              styles.cell,
              {
                top: i * 52,
                fontSize: sz,
                opacity: op,
                fontFamily: dist === 0 ? fonts.sansSemibold : fonts.sans,
              },
            ]}
          >
            {String(v)}
          </Text>
        );
      })}
    </View>
  );
}
