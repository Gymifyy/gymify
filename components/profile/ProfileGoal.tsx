import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { ImageSource } from "expo-image";
import { View } from "moti";
import { Image, StyleSheet, Text } from "react-native";

export function ProfileGoal({ user, imageName }: { user: Tables<"users"> | undefined, imageName: ImageSource }) {

  return (
    <View style={styles.container}>
      <Image style={styles.goalImage} source={imageName} alt={"Weight Loss Profile Goal"} />
      <View style={styles.goalInformation}>
        <Text style={styles.goalText}>
          Consistent Challenger
        </Text>
        <Text style={styles.goalDescription}>
          Work out 7 or more consecutive days.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
    height: 'auto',
    padding: 10,
    backgroundColor: Colors.gray[200],
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goalImage: {
    width: 70,
    height: 70,
  },
  goalInformation: {
    width: "75%",
    height: "auto",
  },
  goalText: {
    width: "100%",
    fontSize: 19,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  goalDescription: {
    width: "100%",
    fontSize: 16,
    letterSpacing: 0.3,
    fontWeight: "400",
    flexWrap: "wrap",
  },
});
