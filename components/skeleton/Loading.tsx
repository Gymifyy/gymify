import { Colors } from "@/constants";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";
export const Loading = () => {
  return (
    <MotiView
      from={{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 0,
        shadowOpacity: 0.2
      }}
      animate={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 4,
        shadowOpacity: 1
      }}
      transition={{
        type: 'timing',
        duration: 1000,
        repeat: Infinity
      }}
      style={styles.loading} />)
}

const styles = StyleSheet.create({
  loading: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: Colors.theme_orange,
    shadowColor: Colors.theme_orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  }
})
