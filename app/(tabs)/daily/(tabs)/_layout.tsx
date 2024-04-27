import React, { useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants";
import { useClientOnlyValue } from "@/components/hooks";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [isLoggedIn, _] = useState<boolean>(false);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          title: "Daily",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-month" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.gray,
    zIndex: 999,
  },
});
