// HSV color picker — saturation/value square + hue slider.
// The square: top-left white, top-right pure hue, bottom edge black.
// The slider: rainbow hue bar. Emits hex on every drag sample.
import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { hexToHsv, hsvToHex } from '@/theme/color';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  value: string;
  onChange: (hex: string) => void;
};

const SQUARE_HEIGHT = 180;
const SLIDER_HEIGHT = 22;
const THUMB_SIZE = 18;

export default function ColorPicker({ value, onChange }: Props) {
  const { role } = useTheme();
  const hsv = hexToHsv(value);
  const [squareW, setSquareW] = useState(0);
  const [sliderW, setSliderW] = useState(0);

  const hueColor = hsvToHex(hsv.h, 100, 100);

  const onSquareLayout = (e: LayoutChangeEvent) => {
    setSquareW(e.nativeEvent.layout.width);
  };
  const onSliderLayout = (e: LayoutChangeEvent) => {
    setSliderW(e.nativeEvent.layout.width);
  };

  const sampleSquare = (e: GestureResponderEvent) => {
    if (!squareW) return;
    const x = Math.max(0, Math.min(squareW, e.nativeEvent.locationX));
    const y = Math.max(0, Math.min(SQUARE_HEIGHT, e.nativeEvent.locationY));
    const s = (x / squareW) * 100;
    const v = (1 - y / SQUARE_HEIGHT) * 100;
    onChange(hsvToHex(hsv.h, s, v));
  };

  const sampleSlider = (e: GestureResponderEvent) => {
    if (!sliderW) return;
    const x = Math.max(0, Math.min(sliderW, e.nativeEvent.locationX));
    const h = (x / sliderW) * 360;
    onChange(hsvToHex(h, hsv.s, hsv.v));
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          gap: 14,
        },
        square: {
          width: '100%',
          height: SQUARE_HEIGHT,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: hueColor,
        },
        squareFill: {
          ...StyleSheet.absoluteFillObject,
        },
        thumb: {
          position: 'absolute',
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          borderWidth: 2,
          borderColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        sliderWrap: {
          height: SLIDER_HEIGHT,
          borderRadius: SLIDER_HEIGHT / 2,
          overflow: 'hidden',
        },
        sliderFill: {
          ...StyleSheet.absoluteFillObject,
        },
        sliderThumb: {
          position: 'absolute',
          top: (SLIDER_HEIGHT - THUMB_SIZE) / 2,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          borderWidth: 2,
          borderColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        swatchRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        },
        swatch: {
          width: 34,
          height: 34,
          borderRadius: 17,
          borderWidth: 1,
          borderColor: role.border,
          backgroundColor: value,
        },
        hexText: {
          fontFamily: 'Menlo',
          fontSize: 13,
          color: role.textSecondary,
        },
      }),
    [hueColor, role, value],
  );

  const thumbX = (hsv.s / 100) * squareW - THUMB_SIZE / 2;
  const thumbY = (1 - hsv.v / 100) * SQUARE_HEIGHT - THUMB_SIZE / 2;
  const sliderX = (hsv.h / 360) * sliderW - THUMB_SIZE / 2;

  return (
    <View style={styles.wrap}>
      <View
        style={styles.square}
        onLayout={onSquareLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={sampleSquare}
        onResponderMove={sampleSquare}
      >
        <LinearGradient
          style={styles.squareFill}
          colors={['#ffffff', hueColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <LinearGradient
          style={styles.squareFill}
          colors={['rgba(0,0,0,0)', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View
          pointerEvents="none"
          style={[
            styles.thumb,
            { left: thumbX, top: thumbY, backgroundColor: value },
          ]}
        />
      </View>

      <View
        style={styles.sliderWrap}
        onLayout={onSliderLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={sampleSlider}
        onResponderMove={sampleSlider}
      >
        <LinearGradient
          style={styles.sliderFill}
          colors={[
            '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ff0000',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View
          pointerEvents="none"
          style={[
            styles.sliderThumb,
            { left: sliderX, backgroundColor: hueColor },
          ]}
        />
      </View>

      <View style={styles.swatchRow}>
        <View style={styles.swatch} />
      </View>
    </View>
  );
}
