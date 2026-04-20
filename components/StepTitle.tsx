import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { border, radius, size, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  title: React.ReactNode;
  icon: React.ReactNode;
  step: number;
  total: number;
};

export default function StepTitle({ title, icon, step, total }: Props) {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          paddingHorizontal: 28,
          paddingTop: 28,
          paddingBottom: 24,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.sm,
          marginBottom: space.lg,
        },
        dot: {
          width: space.xs,
          height: space.xs,
          borderRadius: radius.pill,
          backgroundColor: role.textPrimary,
        },
        iconCircle: {
          width: size.stepAvatar,
          height: size.stepAvatar,
          borderRadius: radius.pill,
          borderWidth: border.medium,
          borderColor: role.textPrimary,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: role.surfacePage,
        },
        steps: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        step: {
          width: 5,
          height: 5,
          borderRadius: radius.pill,
        },
        title: {
          ...type.hero,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.dot} />
        <View style={styles.iconCircle}>{icon}</View>
        <View style={styles.steps}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.step,
                i === step
                  ? { backgroundColor: role.textPrimary, opacity: 1 }
                  : { backgroundColor: role.textMuted, opacity: 0.3 },
              ]}
            />
          ))}
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
