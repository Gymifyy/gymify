import { AuthStoreContext } from "@/components/custom/context";
import { Button } from "@/components/skeleton";
import { LoadingScreen } from "@/components/skeleton/LoadingScreen";
import { Colors } from "@/constants";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

/**
 *  User Profile screen
 * */
export default function ProfileScreen() {
  const AuthContextStore = useContext(AuthStoreContext);

  useEffect(() => {
    // do not allow unAuthed users to get to this route
    if (!AuthContextStore.session) {
      setTimeout(() => {
        router.push("/");
        return;
      }, 3000);
    }
  }, [AuthContextStore]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setTimeout(() => {
        router.push("/");
        return;
      }, 3000);
    }
    AuthContextStore.setSession(null);
    router.push("/");
    return;
  }
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} style={styles.logoutButton}>
        <MaterialIcons name={"logout"} size={28} color={Colors.slate["800"]} />
        <Text>Log Out</Text>
      </Button>
      <Text style={styles.title}>User Profile Screen</Text>
    </View>
  )
}

// Object like css styling.
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  logoutButton: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 5,
    width: "auto",
    paddingHorizontal: 3,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
