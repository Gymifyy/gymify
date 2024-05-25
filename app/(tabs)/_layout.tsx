import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { ViewStyle, Dimensions } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { Colors } from "@/constants";
import { AuthStoreContext } from "@/components/custom/context";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
  size?: number
}) {
  const { size, ...otherProps } = props;
  return <Octicons size={size ? size : 26} {...otherProps} />;
}

export default function TabLayout() {
  const TabBarStyle: ViewStyle = {
    width: 344,
    height: 70,
    elevation: 0,
    position: "absolute",
    bottom: 20,
    // Device.Width / 2 -> Half of screen - Half of tab bar => Center
    left: (Dimensions.get('window').width / 2) - (344 / 2),
    backgroundColor: Colors.gray[100],
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray["300"],
    shadowColor: Colors.gray["600"],
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
  };
  const AuthContextStore = useContext(AuthStoreContext);
  return (
    <Tabs
      screenOptions={{
        title: "Gymify",
        tabBarActiveTintColor: Colors.redBottomBar,
        tabBarInactiveTintColor: Colors.gray["700"],
        tabBarStyle: TabBarStyle,
        headerShown: false,
        tabBarLabelStyle: { padding: 0, margin: -14, fontSize: 11, fontWeight: "600" }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          title: "Daily",
          headerShown: false,
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          href: !AuthContextStore.session?.user || AuthContextStore.session?.user.user_metadata.isSuperAdmin ? null : "/daily",
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: "Program",
          headerShown: false,
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="flame" color={color} />,
          href: !AuthContextStore.session?.user || AuthContextStore.session?.user.user_metadata.isSuperAdmin ? null : "/program",
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
          href: AuthContextStore.session?.user ? null : "/login",
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Roles",
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="id-badge" color={color} />,
          href: AuthContextStore.session?.user && AuthContextStore.session?.user.user_metadata.isSuperAdmin ? "/requests" : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name={"person"} color={color} />,
          href: AuthContextStore.session?.user ? "/profile" : null,
        }}
      />
    </Tabs>
  );
}

