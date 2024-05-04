import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';
import { ForgotPassword } from './ForgotPassword';

interface Props {
  password: string,
  variant: "light" | "dark",
  forgotPasswordDisplayed?: boolean,
  setPassword: React.Dispatch<React.SetStateAction<string>> | ((newPassword: string) => void),
}

export function PasswordInput({ password, setPassword, variant, forgotPasswordDisplayed }: Props): React.JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((oldValue: boolean) => !oldValue)
    return;
  }
  return (
    <View style={styles.password_forgot_group}>
      <View style={styles.password_group}>
        <TextInput
          style={{ ...styles.password_input, color: variant === "dark" ? Colors.slate["200"] : Colors.soft.black, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}
          value={password}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={variant === "dark" ? Colors.soft.white : Colors.soft.black}
          inputMode={"text"}
          passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"}
          onChangeText={(newPassword: string) => setPassword(newPassword)}
          placeholder={"Password"} />
        <Button onPress={togglePasswordVisibility} style={{ ...styles.toggle_visibility_button, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}>
          <Octicons color={variant === "dark" ? Colors.soft.white : Colors.soft.black} size={22} name={isPasswordVisible ? "eye" : "eye-closed"} />
        </Button>
      </View>
      {forgotPasswordDisplayed && <ForgotPassword />}
    </View>
  )
}
const styles = StyleSheet.create({
  password_forgot_group: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'center',
    rowGap: 16,
    backgroundColor: Colors.transparent,
  },
  password_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  toggle_visibility_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 17,
  },
  password_input: {
    fontSize: 18,
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 4,
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
