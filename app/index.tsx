// 01 Welcome — dark editorial hero with gradient ground.
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { fonts, gradient, radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function Welcome() {
  const router = useRouter();
  const { role } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        hero: {
          position: 'absolute',
          top: '18%',
          left: 0,
          right: 0,
          alignItems: 'center',
        },
        wordmark: {
          ...type.wordmark,
          fontFamily: fonts.sans,
          fontWeight: '300',
          color: role.textOnDark,
          lineHeight: 54,
        },
        tagline: {
          fontFamily: fonts.display,
          fontSize: 20,
          color: role.textOnPhoto,
          marginTop: 18,
          letterSpacing: 0.1,
        },
        footer: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 48,
          paddingHorizontal: 24,
          alignItems: 'center',
        },
        legal: {
          ...type.small,
          color: role.textOnPhotoSoft,
          textAlign: 'center',
          marginBottom: 20,
        },
        link: { textDecorationLine: 'underline', fontFamily: fonts.sansMedium },
        cta: {
          width: '100%',
          height: 56,
          borderRadius: radius.pill,
          backgroundColor: role.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: space.md,
        },
        ctaText: {
          ...type.title,
          color: role.onPrimary,
          letterSpacing: 0.1,
        },
        signIn: {
          ...type.bodySmMedium,
          color: role.textOnDark,
        },
      }),
    [role],
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={gradient.phoneShell}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={gradient.accentGlow}
        start={{ x: 1, y: 0.1 }}
        end={{ x: 0.2, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.hero}>
        <Text style={styles.wordmark}>connect</Text>
        <Text style={styles.tagline}>For people who date slowly.</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.legal}>
          By tapping 'Sign in' / 'Create account', you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text>. Learn how we process your data in our{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
        <Pressable style={styles.cta} onPress={() => router.push('/intro')}>
          <Text style={styles.ctaText}>Create account</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/intro')}>
          <Text style={styles.signIn}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}
