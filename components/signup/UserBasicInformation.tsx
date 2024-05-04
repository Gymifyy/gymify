import {
  View,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/constants";
import { UsernameInput, EmailInput, PasswordInput } from "@/components/custom";
import { View as MotionView, Text as MotionText } from "moti";

type Props = {
  email: string;
  username: string;
  password: string;
  error: string;

  setEmail: (newEmail: string) => void;
  setUsername: (newUsername: string) => void;
  setPassword: (newPassword: string) => void;
  setError: (newError: string) => void;
};

export function UserBasicInformation({
  email,
  username,
  password,
  error,
  setEmail,
  setUsername,
  setPassword,
}: Props) {
  return (
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
        type: "timing",
        duration: 400,
      }}
    >
      <View style={styles.container}>
        <View style={styles.input_group}>
          <UsernameInput username={username} setUsername={setUsername} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
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
              type: "timing",
              duration: 400,
            }}
            style={{
              color: Colors.red["500"],
              fontWeight: "500",
              fontSize: 17,
            }}
          >
            {error ? error : null}
          </MotionText>
        </View>
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
  },
  input_group: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent,
    rowGap: 15,
  },
});
