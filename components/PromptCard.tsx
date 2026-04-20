import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { border, fonts, radius, shadow, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import { IconHeart } from './Icon';

type Props = {
  label: string;
  answer: string;
  onLike?: () => void;
  answerSize?: number;
  showLikeButton?: boolean;
};

export default function PromptCard({
  label,
  answer,
  onLike,
  answerSize = 28,
  showLikeButton = false,
}: Props) {
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: role.surfaceCard,
          borderRadius: radius.card,
          paddingHorizontal: space.lg,
          paddingTop: space.lg,
          paddingBottom: space.xl,
          position: 'relative',
          ...shadow.subtle,
        },
        label: {
          ...type.label,
          color: role.textPrimary,
          opacity: 0.8,
        },
        answer: {
          fontFamily: fonts.display,
          color: role.textPrimary,
          marginTop: space.sm,
          letterSpacing: -0.3,
        },
        like: {
          position: 'absolute',
          right: 14,
          bottom: 14,
          width: 36,
          height: 36,
          borderRadius: radius.pill,
          backgroundColor: role.surfaceElevated,
          borderWidth: border.hairline,
          borderColor: role.border,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow.softCard,
        },
      }),
    [role],
  );
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.answer, { fontSize: answerSize, lineHeight: answerSize + 3 }]}>
        {answer}
      </Text>
      {showLikeButton ? (
        <Pressable style={styles.like} onPress={onLike}>
          <IconHeart size={16} color={role.primary} stroke={1.8} />
        </Pressable>
      ) : null}
    </View>
  );
}
