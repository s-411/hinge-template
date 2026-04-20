import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="standouts" />
      <Tabs.Screen name="likes" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
