import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { StyleSheet, Text } from "react-native";
import { Button } from "../skeleton";
import { router } from "expo-router";

export function ProfileUsername({ user }: { user: Tables<"users"> | null }) {
  function navigateToEditProfile() {
    router.push({
      pathname: "/edit_profile",
      params: {
        user: JSON.stringify(user),
      },
    });
  };
  return (
    <>
      <Text style={styles.spaced_text}>{user?.username}</Text>
      <Text style={{ ...styles.spaced_text, fontSize: 13, }}>{user?.email}</Text>
      <Button onPress={navigateToEditProfile} style={{ paddingVertical: 5, paddingHorizontal: 7 }}>
        <Text>
          Edit Profile
        </Text>
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  usernameInp: {
    width: "auto",
    height: "auto",
    paddingHorizontal: 25,
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: Colors.slate["900"],
    textAlign: "center",
  },
  emailInp: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.8,
    color: Colors.slate["900"],
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
  spaced_text: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: Colors.slate["900"]
  },
});
