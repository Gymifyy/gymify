import { Colors } from "@/constants";
import { View, Image, StyleSheet } from "react-native";

export function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <Image source={require("@/assets/images/gym-loading.gif")} alt="Loading Animation Gif" style={{ width: 300, height: 300}} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingScreen: {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.gifBackground,
  }
});
