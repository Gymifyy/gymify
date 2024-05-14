import { Tables } from "@/types/database.types";
import { StyleSheet, Text, View } from "react-native";
import { ProfileAchievement } from "./ProfileAchievement";

export function ProfileAchievements({ achievements }: { achievements: Tables<"achievements">[] }) {
  return (
    <View style={styles.container}>
      {achievements.map((achievement) => <ProfileAchievement key={achievement.id} achievement={achievement} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
    height: 'auto',
    padding: 7,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
});
