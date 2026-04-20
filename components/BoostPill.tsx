import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconBolt } from './Icon';

// BoostPill sits on a light-green surface (secondarySoft) that is identical
// in both light and dark modes, so icon + text use static dark colours —
// flipping them to the dark-mode `textPrimary` (light cream) would leave the
// text invisible on the light-green background.
export default function BoostPill() {
  const { role } = useTheme();
  return (
    <Pressable
      style={{
        backgroundColor: role.secondarySoft,
        paddingHorizontal: space.md,
        paddingVertical: 9,
        borderRadius: radius.pill,
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.xs,
      }}
    >
      <IconBolt size={15} color={colors.secondary} fill={colors.secondary} stroke={1.5} />
      <Text style={{ ...type.labelSemibold, color: colors.ink }}>Boost</Text>
    </Pressable>
  );
}
