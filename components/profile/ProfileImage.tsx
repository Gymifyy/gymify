import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { View, Image, StyleSheet } from "react-native";

export function ProfileImage({ user }: { user: Tables<"users"> | null }) {
  return (
    <View style={{ width: 'auto', }}>
      <View style={styles.profileImageContainer}>
        <Image alt={"User Profile Image"} style={styles.profileImage} defaultSource={require("@/assets/images/man.png")} source={user?.profileImage ? { uri: user.profileImage, width: 125, height: 125 } : user?.gender !== "FEMALE" ? require("@/assets/images/man.png") : require("@/assets/images/woman.png")} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImageContainer: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.orange["500"],
    padding: 4,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
});
