import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { View as MotionView } from "moti";
import { useState } from "react";
import { AuthenticatorButton, EmailInput, PasswordInput, } from "@/components/custom";
import { Loading } from "@/components/skeleton";
import { Colors } from "@/constants";
import { UserController } from "@/utils/User";

// User Controller
const userController = new UserController();

export function LoginTab() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error: err, user } = await userController.loginWithEmail(email, password);
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    if (user !== null) {
      setEmail("");
      setPassword("");
      setError("");
      setLoading(false);
      // give app time to look at context
      router.replace("/");
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
        <EmailInput variant={"dark"} email={email} setEmail={setEmail} />
        <PasswordInput variant={"dark"} password={password} setPassword={setPassword} />
        <View
          style={{
            width: "100%",
            height: loading ? 62 : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <Loading /> : null}
          {error && !loading ? (
            <Text style={styles.error_text}>{error}</Text>
          ) : null}
        </View>
        <AuthenticatorButton provider={"Email"} onPress={signInWithEmail} />
      </View>
    </MotionView>
  );
}


// Object like css styling.
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    rowGap: 15,
    zIndex: 999,
  },
  error_text: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 0.9,
    color: Colors.red["500"],
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
