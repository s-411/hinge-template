import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { radius, shadow } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  onDismiss?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

export default function ModalSheet({ onDismiss, children, icon, style }: Props) {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: role.scrim,
          justifyContent: 'flex-end',
        },
        sheet: {
          backgroundColor: role.surfaceElevated,
          borderTopLeftRadius: radius.bigSheet,
          borderTopRightRadius: radius.bigSheet,
          paddingHorizontal: 28,
          paddingTop: 44,
          paddingBottom: 46,
          alignItems: 'center',
        },
        icon: {
          position: 'absolute',
          top: -32,
          left: '50%',
          marginLeft: -32,
          width: 64,
          height: 64,
          borderRadius: radius.pill,
          backgroundColor: role.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.sheet,
        },
      }),
    [role],
  );
  return (
    <View style={styles.root}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
      <View style={[styles.sheet, style]} pointerEvents="box-none">
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        {children}
      </View>
    </View>
  );
}
