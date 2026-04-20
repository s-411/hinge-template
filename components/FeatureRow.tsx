import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { border, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

type Palette = {
  ink: string;
  inkSoft: string;
  line: string;
};

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  lastInGroup?: boolean;
  palette?: Palette;
};

export default function FeatureRow({
  icon,
  title,
  subtitle,
  lastInGroup,
  palette,
}: Props) {
  const { role } = useTheme();
  const p = palette ?? {
    ink: role.textPrimary,
    inkSoft: role.textSecondary,
    line: role.border,
  };
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          paddingVertical: space.md,
        },
        icon: {
          width: 52,
          height: 52,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        },
        title: {
          ...type.title,
        },
        subtitle: {
          ...type.caption,
          marginTop: 2,
        },
      }),
    [],
  );
  return (
    <View
      style={[
        styles.row,
        !lastInGroup && {
          borderBottomWidth: border.hairline,
          borderBottomColor: p.line,
        },
      ]}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: p.ink }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: p.inkSoft }]}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}
