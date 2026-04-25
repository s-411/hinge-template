// 14 Prompt Library — category pills + scrollable prompt list.
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconX } from '@/components/Icon';
import { promptCategories, promptsByCategory, type PromptCategory } from '@/lib/prompts';

const CATEGORIES = promptCategories;
const PROMPTS = promptsByCategory;

export default function PromptLibrary() {
  const [cat, setCat] = useState<PromptCategory>(CATEGORIES[0]);
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
          const isNew = c === CATEGORIES[0];
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
