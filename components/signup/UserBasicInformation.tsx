import { Text, View, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Router, useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';
import { UsernameInput, EmailInput, PasswordInput } from '@/components/custom';
import { View as MotionView, Text as MotionText } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  email: string,
  username: string,
  password: string,
  step: number,
  maxSteps: number[],
  units: "imperial" | "metric",
  error: string,

  setEmail: (newEmail: string) => void,
  setUsername: (newUsername: string) => void,
  setPassword: (newPassword: string) => void,
  setUnits: Dispatch<SetStateAction<"imperial" | "metric">>
  proceedToNextStep: () => void;
}


export function UserBasicInformation({ email, username, password, step, maxSteps, error, proceedToNextStep, setEmail, setUsername, setPassword }: Props) {
  const router: Router = useRouter();
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
          <Text style={styles.gymify_header}>Gymify</Text>
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
                type: 'timing',
                duration: 400,
              }}
              style={{ color: Colors.red["500"], fontWeight: '500', fontSize: 17, }}
            >
              {error ? error : null}
            </MotionText>
            <Button style={styles.next_step_button} onPress={proceedToNextStep}>
              <Text style={{ color: Colors.slate["200"], fontSize: 16 }}>Next Step</Text>
              <MaterialIcons name="arrow-forward-ios" color={Colors.slate["200"]} />
            </Button>
            <Button onPress={() => router.replace("/(tabs)/login")}>
              <Text style={styles.do_not_have_account}>Already have an account ?</Text>
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

            {/*
            <View style={styles.or_separator}>
              <View style={styles.separator} />
              <Text style={styles.or_seperator_text}>OR</Text>
              <View style={styles.separator} />
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: '100%', backgroundColor: Colors.transparent }}>
              <AuthenticatorButton provider={"Google"} />
              <AuthenticatorButton provider={"Apple"} />
            </View>
          */}
          </View>
        </View>
      </MotionView>
    </TouchableWithoutFeedback>
  );
}

// Object like css styling.
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
  gymify_header: {
    paddingVertical: 40,
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1,
    color: Colors.theme_orange,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10
  },
  do_not_have_account: {
    color: Colors.slate["700"],
    letterSpacing: 0.4,
  },
  input_group: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    rowGap: 30,
  },
  next_step_button: {
    width: 250,
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.theme_orange,
    borderRadius: 5,
    alignSelf: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.orange["800"],
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    gap: 9,
  },
});
