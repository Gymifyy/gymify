import { Colors, CourseType, GymType } from "@/constants";
import { View as MotionView, Text as MotionText } from "moti";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";
import { Button } from "../skeleton";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";

type Props = {
  firstName: string,
  lastName: string,
  weight: number,
  height: number,
  enrolledCourses: Array<CourseType>,
  enrolledGyms: Array<GymType>
  step: number,
  units: "imperial" | "metric",
  error: string,
  maxSteps: number[],

  setFirstName: (newFirstName: string) => void,
  setLastName: (newLastName: string) => void,
  setWeight: (newWeight: number) => void,
  setHeight: (newHeight: number) => void,
  setUnits: Dispatch<SetStateAction<"imperial" | "metric">>
  setError: (newError: string) => void,
  setStep: (step: number) => void,
  proceedToNextStep: () => void;
}


export function UserInformation({ firstName, lastName, weight, height, step, setStep, units, error, enrolledGyms, enrolledCourses, setUnits, proceedToNextStep, setError, setHeight, setWeight, setLastName, setFirstName }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ width: '100%', height: '100%' }}>
      <MotionView
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
        }}>
        <View style={styles.container}>
          {/* Components here */}
          <MotionText
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
            style={{ color: Colors.red["500"], fontWeight: '500', fontSize: 17, }}
          >
            {error ? error : null}
          </MotionText>
          <Button onPress={proceedToNextStep}>
            <Text style={{ color: Colors.slate["200"], fontSize: 16 }}>Next Step</Text>
            <MaterialIcons name="arrow-forward-ios" color={Colors.slate["200"]} />
          </Button>
          <View style={{ flexDirection: 'row', gap: 10, width: '100%', height: 'auto' }}>
            {maxSteps.map((value: number) => {
              return (
                <Button key={value}>
                  <MotionView
                    from={{ backgroundColor: Colors.transparent, opacity: 0.6 }}
                    animate={{ backgroundColor: step >= value ? Colors.theme_orange : Colors.transparent, opacity: 1 }}
                    style={{ width: 20, height: 20, borderRadius: 20, borderColor: Colors.theme_orange, borderWidth: 2, }}
                  />
                </Button>
              )
            })}
          </View>
        </View>
      </MotionView>
    </TouchableWithoutFeedback >

  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    rowGap: 15,
    paddingTop: 60,
  },
});
