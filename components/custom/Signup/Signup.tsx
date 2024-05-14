import { Colors } from "@/constants";
import { AnimatePresence, View as MotionView } from "moti";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthenticatorButton } from "../Form/AuthenticatorButton";
import { Tables } from "@/types/database.types";
import { EmailInput, PasswordInput, UsernameInput } from "../Form";
import { Loading } from "@/components/skeleton";
import { UserController } from "@/utils/User";
import Checkbox from 'expo-checkbox';
import { router } from "expo-router";
import { AdditionalRoleInput } from "../Form/AdditionalRoleInput";
import { useIsFocused } from "@react-navigation/native";
import { GymController } from "@/utils/Gym";
import { RoleController } from "@/utils/Role";

// User Controller
const userController: UserController = new UserController();
const roleController: RoleController = new RoleController();
const gymController: GymController = new GymController();
const allowedAdditionalRoles = [{
  label: "Coach", value: "COACH",
}, {
  label: "Manager", value: "MANAGER"
}, {
  label: "Front Desk", value: "FRONT_DESK"
}, {
  label: "Administrator", value: "ADMINISTRATOR",
}];


export function SignUpTab() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Tables<"roles_applications">["role"] | null>(null);
  const [appliedForAdditionalRole, setAppliedForAdditionalRole] = useState<boolean>(false);
  const [gymData, setGymData] = useState<{ label: string; value: string }[]>([]);
  const [chosenGym, setChosenGym] = useState<string>("");
  const isFocused: boolean = useIsFocused();
  const [userInfo, setUserInfo] = useState<Tables<"users">>({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bmi: 0,
    weight: 0,
    height: 0,
    isSuperAdmin: false,
    completed_setup: false,
    createdAt: "",
    phoneNumber: "",
    profileImage: "",
    enrolledGymsCount: 0,
    enrolledCoursesCount: 0,
    age: 0,
    gender: "MALE",
  });

  useEffect(() => {
    async function fetchGyms() {
      const { data, error } = await gymController.getAll();
      if (error) {
        console.log({ error });
        return;
      }
      if (!data) return;
      const _gymData: { label: string, value: string }[] = data.map((gym) => {
        return { label: gym.name, value: gym.id }
      })
      setGymData(_gymData);
      setChosenGym(_gymData[0].label);
    }
    if (isFocused) {
      fetchGyms();
    }
  }, [isFocused]);

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
    } = await userController.signUpWithEmail(userInfo.email, password, { ...userInfo });
    if (error) {
      setIsLoading(false);
      setError(error.message);
      console.log({ error, component: "SignUpTab" });
      return;
    }
    if (session) {
      setPassword("");
      const { error } = await userController.insert(userInfo);
      if (error) {
        setIsLoading(false);
        setMessage("");
        setError(error.message);
        console.log({ error, component: "SignUpTab" });
        return;
      }
      if (role && chosenGym.trim() !== "") {
        const { user, error } = await userController.getUserWithEmail(userInfo.email);
        if (error) {
          console.log({ error });
          return;
        }
        if (!user) return;
        const { error: err } = await roleController.applyForAdditionalRole(role, chosenGym, user.id);
        console.log({ err });

      }
      setUserInfo({
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        bmi: 0,
        weight: 0,
        height: 0,
        isSuperAdmin: false,
        completed_setup: false,
        createdAt: "",
        phoneNumber: "",
        profileImage: "",
        enrolledGymsCount: 0,
        enrolledCoursesCount: 0,
        age: 0,
        gender: "MALE",
      });
      setError("");
      setIsLoading(false);
      setMessage("Signed Up successfully.");
      return router.replace("/");
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
      transition={{ type: "timing", duration: 250 }}
    >
      <View style={styles.input_group}>
        <UsernameInput variant={"dark"} username={userInfo.username} setUsername={setUsername} />
        <EmailInput variant={"dark"} email={userInfo.email} setEmail={setEmail} />
        <PasswordInput variant={"dark"} password={password} setPassword={setPassword} />
        <View style={styles.checkboxContainer}>
          <Checkbox style={{ margin: 8, width: 22, height: 22, }} value={appliedForAdditionalRole} color={appliedForAdditionalRole ? Colors.theme_orange : undefined} onValueChange={setAppliedForAdditionalRole} />
          <Text style={{ fontWeight: "500", color: Colors.slate[100], letterSpacing: 0.5, fontSize: 15, }}>Apply for addition role</Text>
        </View>
        <AnimatePresence exitBeforeEnter>
          {appliedForAdditionalRole ?
            <AdditionalRoleInput
              chosenGym={chosenGym}
              setChosenGym={setChosenGym}
              allowedRoles={allowedAdditionalRoles}
              gymData={gymData}
              role={role}
              setRole={setRole}
            />
            :
            null}
        </AnimatePresence>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    gap: 4,
  },
  input_group: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 30,
  },
});
