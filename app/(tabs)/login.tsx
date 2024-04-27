"use client";
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants';
import { AuthenticatorButton, EmailInput, PasswordInput } from '@/components/custom';
import { Router, useRouter } from 'expo-router';
import { Button, Loading } from '@/components/skeleton';
import { supabase } from '@/utils/supabase';
import { AuthStoreContext } from '@/components/custom/AuthContext';

export default function LoginModalScreen() {
  const router: Router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const AuthContextStore = useContext(AuthStoreContext);

  async function signInWithEmail() {
    setLoading(true)
    const { error: err, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (err) {
      setError(err.message);
      setLoading(false)
      return;
    }
    if (data.user !== null) {
      setError("");
      // redirect to home page
      AuthContextStore.setSession(data.session);
      setLoading(false)
      router.replace("/");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View style={styles.container}>
        <Text style={styles.gymify_header}>Gymify</Text>
        <View style={styles.input_group}>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          <View style={{
            width: '100%',
            height: loading ? 62 : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {loading ? <Loading /> : null}
            {error && !loading ? <Text style={styles.error_text}>{error}</Text> : null}
          </View>
          <AuthenticatorButton provider={"Email"} onPress={signInWithEmail} />
          {/*<AuthenticatorButton provider={"Guest"} text={"Continue as Guest"} /> */}
          <Button onPress={() => router.replace("/(tabs)/signup")}>
            <Text style={styles.do_not_have_account}>Do not have an account ?</Text>
          </Button>
          <View style={styles.or_separator}>
            <View style={styles.separator} />
            <Text style={styles.or_seperator_text}>OR</Text>
            <View style={styles.separator} />
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: '100%', backgroundColor: Colors.transparent }}>
            <AuthenticatorButton provider={"Google"} />
            <AuthenticatorButton provider={"Apple"} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Object like css styling.
const styles = StyleSheet.create({
  error_text: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.9,
    color: Colors.red["600"],
  },
  container: {
    width: '100%',
    backgroundColor: Colors.soft.white,
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '40%',
    backgroundColor: Colors.soft.black,
  },
  or_seperator_text: {
    fontSize: 17,
    color: Colors.soft.black,
  },
  or_separator: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.transparent,
  },
  do_not_have_account: {
    color: Colors.soft.black,
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
});
