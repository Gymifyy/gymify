import { Colors } from "@/constants";
import { View as MotionView } from "moti";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
export function WeightRegister() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ width: '100%', height: '100%' }} accessible={false} >
      <MotionView style={styles.container}
        from={{
          opacity: 0,
          left: -100,
        }}
        animate={{
          opacity: 1,
          left: 0,
        }}
        exit={{
          opacity: 0,
          left: 100,
        }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        {/* Components here */}
      </MotionView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.soft.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    rowGap: 15,
    paddingTop: 60,
  },
});
