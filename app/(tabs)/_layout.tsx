import React, { useContext, useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants";
import { useClientOnlyValue } from "@/components/hooks";
import { AuthStoreContext } from "@/components/custom/AuthContext";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const AuthContextStore = useContext(AuthStoreContext);
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
      <Tabs.Screen
        name="program"
        options={{
          title: "Program",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="fitness-center" color={color} />,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Signup",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"login"} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"login"} color={color} />
          ),
          href: AuthContextStore.session?.user ? null : "/login",
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"person"} color={color} />
          ),
          headerShown: false,
          href: AuthContextStore.session?.user ? "/user" : null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.gray["200"],
  },
});
