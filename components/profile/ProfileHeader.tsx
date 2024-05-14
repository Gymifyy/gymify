import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { StyleSheet, Text, View } from "react-native";

export function ProfileHeader({ user, styling }: { user: Tables<"users"> | null, styling: "small" | "big" }) {
  return (
    <View style={styles.wah_container}>
      <View style={styles.wah}>
        <Text style={styling === "small" ? { ...styles.header, fontSize: 19 } : styles.header}>Weight</Text>
        <Text style={styles.text}>{user?.weight}</Text>
        <Text style={styles.metric}>kg</Text>
      </View>
      <View style={styles.devide} />
      <View style={styles.wah}>
        <Text style={styling === "small" ? { ...styles.header, fontSize: 19 } : styles.header}>Age</Text>
        <Text style={styles.text}>{user?.age}</Text>
        <Text style={styles.metric}>y.o</Text>
      </View>
      <View style={styles.devide} />
      <View style={styles.wah}>
        <Text style={styling === "small" ? { ...styles.header, fontSize: 19 } : styles.header}>Height</Text>
        <Text style={styles.text}>{user?.height}</Text>
        <Text style={styles.metric}>cm</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wah_container: {
    width: '100%',
    height: 'auto',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  wah: {
    width: '33%',
    height: 'auto',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  header: {
    fontSize: 24,
    color: Colors.theme_orange,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  metric: {
    fontSize: 16,
  },
  devide: {
    width: 2,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: Colors.gray[300],
    marginRight: 15,
  },
});
