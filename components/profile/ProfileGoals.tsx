import { Tables } from "@/types/database.types";
import { StyleSheet, Text, View } from "react-native";
import { ProfileGoal } from "./ProfileGoal";

export function ProfileGoals({ user }: { user: Tables<"users"> | undefined }) {
  return (
    <View style={styles.container}>
      <Text style={styles.goalsHeader}>Goals</Text>
      <ProfileGoal imageName={require("@/assets/images/walking.png")} user={user} />
      <ProfileGoal imageName={require("@/assets/images/weight-loss.png")} user={user} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
    height: 'auto',
    padding: 7,
  },
  goalsHeader: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.8,
  }
});

