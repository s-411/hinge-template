// Edit Profile — form with several text inputs. Also exists as the main
// surface for verifying the global KeyboardHideButton.
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { border, fonts, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import ScreenHeader from '@/components/ScreenHeader';
import { IconChevL } from '@/components/Icon';

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'email-address';
};

export default function EditProfile() {
  const router = useRouter();
  const { role } = useTheme();
  const [name, setName] = useState('Sarah');
  const [bio, setBio] = useState('Brooklyn-based writer. Happiest walking new streets with a good coffee.');
  const [job, setJob] = useState('Senior Editor');
  const [school, setSchool] = useState('Barnard College');
  const [hometown, setHometown] = useState('Portland, ME');
  const [age, setAge] = useState('29');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        save: {
          ...type.title,
          color: role.primary,
        },
        section: {
          ...type.overline,
          color: role.textMuted,
          paddingHorizontal: space.lg,
          paddingTop: space.lg,
          paddingBottom: space.sm,
        },
        group: {
          backgroundColor: role.surfaceCard,
          marginHorizontal: space.md,
          borderRadius: radius.input,
          paddingHorizontal: space.lg,
        },
        field: {
          paddingVertical: space.md,
          borderBottomWidth: border.hairline,
          borderBottomColor: role.border,
        },
        label: {
          ...type.small,
          fontFamily: fonts.sansMedium,
          color: role.textMuted,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          marginBottom: 4,
        },
        input: {
          ...type.titleLg,
          fontFamily: fonts.sans,
          color: role.textPrimary,
          padding: 0,
        },
      }),
    [role],
  );

  function Field({ label, value, onChangeText, placeholder, multiline, keyboardType }: FieldProps) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={role.textMuted}
          multiline={multiline}
          keyboardType={keyboardType ?? 'default'}
          style={[styles.input, multiline && { minHeight: 80, textAlignVertical: 'top' }]}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: role.surfacePage }} edges={['top']}>
      <ScreenHeader
        left={
          <Pressable onPress={() => router.back()}>
            <IconChevL size={20} color={role.textPrimary} stroke={1.8} />
          </Pressable>
        }
        title="Edit profile"
        center
        right={
          <Pressable onPress={() => router.back()}>
            <Text style={styles.save}>Save</Text>
          </Pressable>
        }
        borderBottom
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 240 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.section}>About you</Text>
        <View style={styles.group}>
          <Field label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <Field
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell people a little about yourself"
            multiline
          />
          <Field
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="29"
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.section}>Background</Text>
        <View style={styles.group}>
          <Field label="Job title" value={job} onChangeText={setJob} placeholder="What you do" />
          <Field label="School" value={school} onChangeText={setSchool} placeholder="Where you studied" />
          <Field
            label="Hometown"
            value={hometown}
            onChangeText={setHometown}
            placeholder="Where you're from"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
