import { Tables } from "@/types/database.types";
import { StyleSheet, Text, View } from "react-native";
import { ProfileHeader } from "../profile";
import { MotiView } from "moti";

export function UserTabOverview({ user }: { user: Tables<"users"> | null }) {
  return (
    <MotiView
      style={styles.additionalInfo}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <Text style={styles.additionalInfoText}>Additional Info</Text>
      <ProfileHeader user={user} styling={"small"} />
      <Text style={{ fontSize: 19, letterSpacing: 0.8, paddingVertical: 10, }}>
        Registered in
        {' '}
        <Text style={{ fontSize: 19, }}>{user?.enrolledGymsCount}</Text>
        {' '}
        gyms
      </Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  additionalInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
    marginTop: 15,
    gap: 10,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  additionalInfoText: {
    fontSize: 20,
    letterSpacing: 0.8,
    fontWeight: "500",
  },
});
