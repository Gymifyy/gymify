import { UserBasicInformation } from "@/components/signup/UserBasicInformation";
import { UserInformation } from "@/components/signup/UserInformation";
import { Button } from "@/components/skeleton";
import { Colors } from "@/constants";
import { UserRoleEnum, UserInfoType } from "@/constants/Types";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { AnimatePresence, View as MotionView } from "moti";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

const maxSteps: number[] = [0, 1, 2, 3, 4, 5, 6];

export default function SignUp() {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [units, setUnits] = useState<"imperial" | "metric">("metric");
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: "",
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    bmi: 0,
    weight: 0,
    selectedPlan: "FREE",
    role: UserRoleEnum.MEMBER,
    height: 0,
    enrolledCourse: [],
    enrolledGyms: [],
  });

  function setUsername(newUsername: string) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, username: newUsername }
    })
  }
  function setFirstName(newFirstName: string) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, firstName: newFirstName }
    })
  }
  function setLastName(newLastName: string) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, lastName: newLastName }
    })
  }
  function setWeight(newWeight: number) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, weight: newWeight }
    })
  }
  function setHeight(newHeight: number) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, height: newHeight }
    })
  }
  function setBmi(newBmi: number) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, bmi: newBmi }
    })
  }
  function setEmail(newEmail: string) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, email: newEmail }
    })
  }
  function setPassword(newPassword: string) {
    setUserInfo((previousValue: UserInfoType) => {
      return { ...previousValue, password: newPassword }
    })
  }

  function proceedToSecondStep() {
    // if (step === 1 && (userInfo.username.trim() === "" || userInfo.password.trim() === "" || (userInfo.email.trim() === "" || !userInfo.email.includes("@")))) { setError("Please fill in all the fields !"); return; }
    setStep(2);
    setError("");
    return;
  }

  async function signUpWithEmail() {
    const { email, password, ...other } = userInfo;
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          ...other
        }
      }
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }



  return (
    //   <ImageBackground blurRadius={3} source={require("@/assets/images/gym-background.jpg")} alt="Gym Background" style={styles.imageBackground}>
    <AnimatePresence exitBeforeEnter>
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
        {/*step > 0 ?
          //  <Button onPress={() => setStep(step - 1)} style={styles.goBackButton}>
          //    <MotionView style={{ width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
          //      <MaterialIcons name={"arrow-back-ios"} color={Colors.black} />
          //      <Text style={{ textAlign: 'center' }}>Go Back</Text>
          //    </MotionView>
          //  </Button>
          //  : null
          //*/}
        {step === 0 &&
          <UserBasicInformation
            username={userInfo.username}
            setUsername={setUsername}
            email={userInfo.email}
            setEmail={setEmail}
            password={userInfo.password}
            setPassword={setPassword}
            units={units}
            maxSteps={maxSteps}
            step={step}
            setUnits={setUnits}
            proceedToNextStep={proceedToSecondStep}
            error={error}
          />
        }

        {step === 1 &&
          null
        }
      </MotionView>
    </AnimatePresence>
    //  </ImageBackground>
  );

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  goBackButton: {
    width: 100,
    alignSelf: 'flex-start',
    marginTop: 30,
    height: 50,
    borderColor: Colors.theme_orange,
    borderWidth: 0,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
    paddingHorizontal: 5,
    borderRadius: 5,
  }
});
