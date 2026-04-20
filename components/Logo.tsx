import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '@/theme/tokens';

// Default colour is white — Logo sits on dark chrome (tab bar) in practice.
export default function Logo({ size = 22, color = colors.accentInk }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4v16M20 4v16M4 12h16"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={12} r={2.5} fill={color} />
    </Svg>
  );
}
