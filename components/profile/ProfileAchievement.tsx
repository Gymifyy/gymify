import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { Image, StyleSheet, Text, View } from "react-native";

export function ProfileAchievement({ achievement }: { achievement: Tables<"achievements"> }) {
  return (
    <View style={styles.container}>
      <Image style={styles.trophyImage} source={achievement.image ? { uri: achievement.image } : require("@/assets/images/weight-loss.png")} alt={achievement.name} />
      <View style={styles.trophyInformation}>
        <Text style={styles.trophyText}>
          {achievement.name}
        </Text>
        <Text style={styles.trophyDescription}>
          {achievement.description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    padding: 7,
    backgroundColor: Colors.gray[200],
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trophyImage: {
    width: 70,
    height: 70,
  },
  trophyInformation: {
    width: "75%",
    height: "auto",
  },
  trophyText: {
    width: "100%",
    fontSize: 19,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  trophyDescription: {
    width: "100%",
    fontSize: 16,
    letterSpacing: 0.3,
    fontWeight: "400",
    flexWrap: "wrap",
  },
});
