// Global keyboard dismiss button. Mount ONCE at the app root — it covers every
// text input in the tree.
//
// Modal exception: React Native's <Modal> renders in its own native window and
// will hide this button. If you add a <Modal> that contains <TextInput>, render
// another <KeyboardHideButton /> inside that Modal's subtree.
import React, { useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function KeyboardHideButton() {
  const { role } = useTheme();
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: KeyboardEvent) => setOffset(e.endCoordinates.height);
    const onHide = () => setOffset(null);

    const showSub = Keyboard.addListener(showEvt, onShow);
    const hideSub = Keyboard.addListener(hideEvt, onHide);
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          position: 'absolute',
          right: space.lg,
          paddingHorizontal: space.md,
          paddingVertical: space.sm,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
          ...shadow.pill,
        },
        label: {
          ...type.label,
          color: role.onPrimary,
          letterSpacing: 0.2,
        },
      }),
    [role],
  );

  if (offset === null) return null;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Pressable
        onPress={Keyboard.dismiss}
        style={[styles.button, { bottom: offset + space.sm }]}
        hitSlop={8}
      >
        <Text style={styles.label}>Hide</Text>
      </Pressable>
    </View>
  );
}
