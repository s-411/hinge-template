// Visual-only tab bar for non-(tabs) screens that still want to show the
// prototype's bottom bar (e.g. the matches-empty state). Does not perform
// navigation as a Tabs child — tapping uses router.push instead.
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { radius, size, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import Logo from './Logo';
import ProfileAvatar from './ProfileAvatar';
import { IconStar, IconHeart, IconChat } from './Icon';

type TabId = 'discover' | 'standouts' | 'likes' | 'chats' | 'profile';

const TAB_ORDER: TabId[] = ['discover', 'standouts', 'likes', 'chats', 'profile'];

const BADGES: Partial<Record<TabId, number>> = {
  likes: 3,
  chats: 1,
};

function tabIcon(name: TabId, active: boolean, mute: string, onDark: string) {
  switch (name) {
    case 'discover':
      return <Logo size={22} color={active ? onDark : mute} />;
    case 'standouts':
      return <IconStar size={22} color={active ? onDark : mute} />;
    case 'likes':
      return <IconHeart size={22} color={active ? onDark : mute} />;
    case 'chats':
      return <IconChat size={22} color={active ? onDark : mute} />;
    case 'profile':
      return (
        <View
          style={{
            width: size.tabAvatar,
            height: size.tabAvatar,
            borderRadius: radius.pill,
            borderWidth: active ? 2 : 0,
            borderColor: onDark,
            overflow: 'hidden',
          }}
        >
          <ProfileAvatar size={size.tabAvatar} seed="sarah" />
        </View>
      );
  }
}

const ROUTES: Record<TabId, string> = {
  discover: '/(tabs)/discover',
  standouts: '/(tabs)/discover',
  likes: '/(tabs)/likes',
  chats: '/(tabs)/likes',
  profile: '/(tabs)/profile',
};

type Props = {
  active: TabId;
};

export default function TabBarVisual({ active }: Props) {
  const router = useRouter();
  const { role } = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: size.tabBar,
        backgroundColor: role.chromeFill,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 24,
      }}
    >
      {TAB_ORDER.map((id) => {
        const isActive = id === active;
        const badge = BADGES[id];
        return (
          <Pressable
            key={id}
            onPress={() => router.push(ROUTES[id] as never)}
            style={{
              padding: 10,
              paddingHorizontal: 14,
              opacity: isActive ? 1 : 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tabIcon(id, isActive, role.textMuted, role.textOnDark)}
            {badge ? (
              <View
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 4,
                  minWidth: 16,
                  height: 16,
                  borderRadius: radius.pill,
                  backgroundColor: role.primary,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    ...type.smallSemibold,
                    color: role.onPrimary,
                  }}
                >
                  {badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
