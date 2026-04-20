// Custom tab bar for Expo Router Tabs — matches the prototype's dark bottom bar.
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { radius, size, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';
import Logo from './Logo';
import ProfileAvatar from './ProfileAvatar';
import { IconStar, IconHeart, IconChat } from './Icon';

const BADGES: Record<string, number | undefined> = {
  likes: 3,
  chats: 1,
};

function tabIcon(name: string, active: boolean, mute: string, onDark: string) {
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
    default:
      return null;
  }
}

const TAB_ORDER = ['discover', 'standouts', 'likes', 'chats', 'profile'];

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { role } = useTheme();
  const activeName = state.routes[state.index]?.name ?? 'discover';

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
        const active = activeName === id;
        const badge = BADGES[id];
        const route = state.routes.find((r) => r.name === id);
        return (
          <Pressable
            key={id}
            onPress={() => route && navigation.navigate(route.name as never)}
            disabled={!route}
            style={{
              padding: 10,
              paddingHorizontal: 14,
              opacity: active ? 1 : 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tabIcon(id, active, role.textMuted, role.textOnDark)}
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
