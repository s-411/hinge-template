import React from 'react';
import { Pressable } from 'react-native';
import { radius, shadow, size } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconChev, IconChevL } from './Icon';

type Props = {
  enabled?: boolean;
  direction?: 'right' | 'left';
  onPress?: () => void;
};

export default function ArrowFAB({ enabled = true, direction = 'right', onPress }: Props) {
  const { role } = useTheme();
  const bg = enabled ? role.primary : role.surfaceInput;
  const iconColor = enabled ? role.onPrimary : role.textMuted;
  return (
    <Pressable
      onPress={enabled ? onPress : undefined}
      style={[
        {
          position: 'absolute',
          right: 24,
          bottom: 30,
          width: size.fab,
          height: size.fab,
          borderRadius: radius.pill,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        enabled && shadow.fab,
      ]}
    >
      {direction === 'right' ? (
        <IconChev size={22} color={iconColor} stroke={2} />
      ) : (
        <IconChevL size={22} color={iconColor} stroke={2} />
      )}
    </Pressable>
  );
}
