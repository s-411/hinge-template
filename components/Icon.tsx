// Stroke icons ported from the prototype's icons.jsx.
// All render at viewBox 24. Use react-native-svg primitives.
import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '@/theme/tokens';

// Static fallback — in practice every caller passes an explicit `color` prop.
const DEFAULT_ICON_COLOR = colors.ink;

type IconProps = {
  size?: number;
  color?: string;
  stroke?: number;
  fill?: string;
};

const Wrap = ({
  size = 24,
  color = DEFAULT_ICON_COLOR,
  stroke = 1.6,
  children,
}: IconProps & { children: React.ReactNode }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </Svg>
);

export const IconX = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M6 6l12 12M18 6L6 18" />
  </Wrap>
);
export const IconChev = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M9 6l6 6-6 6" />
  </Wrap>
);
export const IconChevL = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M15 6l-6 6 6 6" />
  </Wrap>
);
export const IconChevD = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M6 9l6 6 6-6" />
  </Wrap>
);
export const IconPlus = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M12 5v14M5 12h14" />
  </Wrap>
);
export const IconPencil = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M4 20h4L20 8l-4-4L4 16v4z" />
  </Wrap>
);
export const IconHeart = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
  </Wrap>
);
export const IconStar = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
  </Wrap>
);
export const IconChat = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M4 5h16v11H9l-5 4V5z" />
  </Wrap>
);
export const IconSliders = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M20 18h0" />
    <Circle cx={16} cy={6} r={2} />
    <Circle cx={10} cy={12} r={2} />
    <Circle cx={18} cy={18} r={2} />
  </Wrap>
);
export const IconGear = (p: IconProps) => (
  <Wrap {...p}>
    <Circle cx={12} cy={12} r={3} />
    <Path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.5-2.3.9a7 7 0 00-2-1.2L14 3h-4l-.6 2.5a7 7 0 00-2 1.2l-2.3-.9-2 3.5 2 1.5a7 7 0 000 2.4l-2 1.5 2 3.5 2.3-.9a7 7 0 002 1.2L10 21h4l.6-2.5a7 7 0 002-1.2l2.3.9 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z" />
  </Wrap>
);
export const IconBulb = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0012 3z" />
  </Wrap>
);
export const IconBolt = ({ fill, ...p }: IconProps) => (
  <Svg
    width={p.size ?? 24}
    height={p.size ?? 24}
    viewBox="0 0 24 24"
    fill={fill ?? 'none'}
    stroke={p.color ?? 'currentColor'}
    strokeWidth={p.stroke ?? 1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M13 2L3 14h9l-1 8 10-12h-9z" fill={fill ?? 'none'} />
  </Svg>
);
export const IconList = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M8 6h12M8 12h12M8 18h12M4 6h0M4 12h0M4 18h0" />
  </Wrap>
);
export const IconQuote = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M7 17s-1-1-1-3c0-3 2-4.5 4-5M15 17s-1-1-1-3c0-3 2-4.5 4-5" />
  </Wrap>
);
export const IconCap = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M12 5l10 4-10 4-10-4 10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </Wrap>
);
export const IconEyeOff = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M3 3l18 18M10.5 10.5A2 2 0 0013.5 13.5M6.5 6.6C4 8 2 12 2 12s3 6 10 6c1.7 0 3.1-.4 4.3-.9M9.5 5.2A10 10 0 0112 5c7 0 10 6 10 6s-.8 1.7-2.5 3.4" />
  </Wrap>
);
export const IconLock = (p: IconProps) => (
  <Wrap {...p}>
    <Rect x={5} y={11} width={14} height={10} rx={2} />
    <Path d="M8 11V8a4 4 0 018 0v3" />
  </Wrap>
);
export const IconRewind = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M4 9c0-2 2-4 4-4h8a4 4 0 014 4v6a4 4 0 01-4 4h-6M4 9l-2 2 2 2M4 9v4" />
  </Wrap>
);
export const IconDots = (p: IconProps) => (
  <Wrap {...p}>
    <Circle cx={5} cy={12} r={1} fill={p.color ?? DEFAULT_ICON_COLOR} />
    <Circle cx={12} cy={12} r={1} fill={p.color ?? DEFAULT_ICON_COLOR} />
    <Circle cx={19} cy={12} r={1} fill={p.color ?? DEFAULT_ICON_COLOR} />
  </Wrap>
);
export const IconCheck = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M5 12l5 5 9-11" />
  </Wrap>
);
export const IconBadge = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M12 3l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z" />
    <Path d="M9 12l2 2 4-4" />
  </Wrap>
);
export const IconSearch = (p: IconProps) => (
  <Wrap {...p}>
    <Circle cx={11} cy={11} r={7} />
    <Path d="M20 20l-4-4" />
  </Wrap>
);
export const IconArrow = (p: IconProps) => (
  <Wrap {...p}>
    <Path d="M5 12h14M13 6l6 6-6 6" />
  </Wrap>
);
