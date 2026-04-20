// 14 Prompt Library — category pills + scrollable prompt list.
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconX } from '@/components/Icon';

const CATEGORIES = ['Self-care', 'About me', "Let's chat about", 'My type', 'Dating me'];

const PROMPTS: Record<string, string[]> = {
  'Self-care': [
    'I feel most supported when',
    'My cry-in-the-car song is',
    'Therapy recently taught me',
    'When I need advice, I go to',
    'I hype myself up by',
    'My friends ask me for advice about',
    'My self-care routine is',
    'My therapist would say I',
    'I get myself out of a funk by',
    'A boundary of mine is',
    'My happy place is',
    'To me, relaxation is',
  ],
  'About me': [
    'A shower thought I recently had',
    "I'm looking for",
    'My simple pleasures',
    'A life goal of mine',
    'The way to win me over is',
    'Weekends are for',
    'I geek out on',
  ],
  "Let's chat about": [
    'The last book that moved me',
    'An unpopular opinion I hold',
    'A hill I will die on',
    'Something I want to learn',
    'The soundtrack of my week',
  ],
  'My type': [
    "I'm weirdly attracted to",
    'Green flags I look for',
    "We'll get along if",
    'The first date I want is',
  ],
  'Dating me': [
    'Dating me is like',
    'The key to my heart is',
    'My love language is',
    "Let's make sure we're on the same page about",
  ],
};

export default function PromptLibrary() {
  const [cat, setCat] = useState('Self-care');
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        viewAll: {
          ...type.bodyMedium,
          color: role.primary,
        },
        pill: {
          paddingHorizontal: 18,
          paddingVertical: 8,
          borderRadius: radius.pill,
          borderWidth: border.medium,
          borderColor: role.primary,
          position: 'relative',
        },
        newBadge: {
          position: 'absolute',
          top: -9,
          left: -6,
          backgroundColor: role.surfaceElevated,
          borderColor: role.primary,
          borderWidth: border.thin,
          borderRadius: space.xs,
          paddingHorizontal: space.xs,
          paddingVertical: 2,
        },
        newBadgeText: {
          fontSize: 9,
          letterSpacing: 0.5,
          color: role.primary,
          fontWeight: '700',
        },
        promptRow: {
          paddingVertical: 22,
          paddingHorizontal: 22,
          borderBottomWidth: border.hairline,
          borderBottomColor: role.borderSoft,
        },
        promptText: {
          ...type.body,
          color: role.textPrimary,
        },
      }),
    [role],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        title="Select a Prompt"
        left={<Text style={styles.viewAll}>View All</Text>}
        right={
          <Pressable onPress={() => router.back()}>
            <IconX size={22} color={role.textPrimary} stroke={border.medium} />
          </Pressable>
        }
        borderBottom
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: space.sm,
          alignItems: 'center',
        }}
        style={{
          height: 78,
          flexGrow: 0,
          flexShrink: 0,
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        }}
      >
        {CATEGORIES.map((c) => {
          const active = c === cat;
          const isNew = c === 'Self-care';
          return (
            <Pressable
              key={c}
              onPress={() => setCat(c)}
              style={[
                styles.pill,
                { backgroundColor: active ? role.primary : 'transparent' },
              ]}
            >
              {isNew ? (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              ) : null}
              <Text
                style={{
                  ...type.bodySmMedium,
                  color: active ? role.onPrimary : role.primary,
                }}
              >
                {c}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingTop: 4, paddingBottom: 110 }}>
        {PROMPTS[cat].map((p) => (
          <View key={p} style={styles.promptRow}>
            <Text style={styles.promptText}>{p}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
