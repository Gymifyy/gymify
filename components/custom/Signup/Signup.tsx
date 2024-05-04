import { Colors } from "@/constants";
import { View as MotionView } from "moti";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthenticatorButton } from "../Form/AuthenticatorButton";
import { Tables } from "@/types/database.types";
import { EmailInput, PasswordInput, UsernameInput } from "../Form";
import { Loading } from "@/components/skeleton";
import { User } from "@/utils/User";
import { router } from "expo-router";
import { Role } from "@/utils/Role";

// User Controller
const userController: User = new User();
const roleController: Role = new Role();

export function SignUpTab() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userInfo, setUserInfo] = useState<Tables<"users">>({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bmi: 0,
    weight: 0,
    height: 0,
    enrolledGyms: [],
    createdAt: "",
    phoneNumber: "",
    profileImage: "",
    enrolledGymsCount: 0,
    enrolledCoursesCount: 0,
    enrolledCourses: [],
  });

  function setUsername(newUsername: string) {
    setUserInfo((previousValue: Tables<"users">) => {
      return { ...previousValue, username: newUsername }
    })
  }
  function setEmail(newEmail: string) {
    setUserInfo((previousValue: Tables<"users">) => {
      return { ...previousValue, email: newEmail }
    })
  }

  async function signUpWithEmail() {
    setIsLoading(true);
    const {
      error,
      session
    } = await userController.signUpWithEmail(userInfo.email, password, userInfo);
    if (error) {
      setIsLoading(false);
      setError(error.message);
      console.log({ error, component: "SignUpTab" });
      return;
    }
    if (session) {
      setUserInfo({
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        bmi: 0,
        weight: 0,
        height: 0,
        enrolledGyms: [],
        createdAt: "",
        phoneNumber: "",
        profileImage: "",
        enrolledGymsCount: 0,
        enrolledCoursesCount: 0,
        enrolledCourses: [],
      });
      setPassword("");
      const { error } = await userController.insert(userInfo);
      if (error) {
        setIsLoading(false);
        setMessage("");
        setError(error.message);
        console.log({ error, component: "SignUpTab" });
        return;
      }
      setError("");
      setIsLoading(false);
      setMessage("Signed Up successfully.");
      return router.push("/");
    }
  }



  return (
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
      <View style={styles.input_group}>
        <UsernameInput variant={"dark"} username={userInfo.username} setUsername={setUsername} />
        <EmailInput variant={"dark"} email={userInfo.email} setEmail={setEmail} />
        <PasswordInput variant={"dark"} password={password} setPassword={setPassword} />
      </View>

      {loading ? <Loading /> : null}
      {error && !loading ? (
        <Text style={styles.error_text}>{error}</Text>
      ) : null}
      {message && !loading ? (
        <Text style={styles.message_text}>{message}</Text>
      ) : null}
      <View style={{ paddingTop: 20, }}>
        <AuthenticatorButton provider={"Email"} text={"Sign Up"} onPress={signUpWithEmail} />
      </View>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    rowGap: 15,
  },
  error_text: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 0.9,
    color: Colors.red["500"],
  },
  message_text: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.9,
    color: Colors.green["500"],
  },
  input_group: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent,
    rowGap: 30,
  },
});
