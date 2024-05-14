import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { StyleSheet, Text } from "react-native";
import { Button } from "../skeleton";

export function ProfileUsername({ user }: { user: Tables<"users"> | null }) {
  return (
    <>
      <Text style={styles.spaced_text}>{user?.username}</Text>
      <Text style={{ ...styles.spaced_text, fontSize: 13, }}>{user?.email}</Text>
      <Button style={{ paddingVertical: 5, paddingHorizontal: 7 }}>
        <Text>
          Edit Profile
        </Text>
      </Button>
    </>
  )
}

const styles = StyleSheet.create({

  edit_profile: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'flex-end',
    paddingVertical: 7,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
    backgroundColor: Colors.theme_orange,
    borderRadius: 5,
    shadowColor: Colors.gray["500"],
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
  },
  spaced_text: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: Colors.slate["900"]
  },
});
