import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';
import { ForgotPassword } from './ForgotPassword';

interface Props {
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>> | ((newPassword: string) => void),
}

export function PasswordInput({ password, setPassword }: Props): React.JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((oldValue: boolean) => !oldValue)
    return;
  }
  return (
    <View style={styles.password_forgot_group}>
      <View style={styles.password_group}>
        <TextInput
          style={styles.password_input}
          value={password}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={Colors.soft.black}
          inputMode={"text"}
          passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"}
          onChangeText={(newPassword: string) => setPassword(newPassword)}
          placeholder={"Password"} />
        <Button onPress={togglePasswordVisibility} style={styles.toggle_visibility_button}>
          <MaterialIcons color={Colors.soft.black} size={24} name={isPasswordVisible ? "visibility-off" : "visibility"} />
        </Button>
      </View>
      <ForgotPassword />
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
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  toggle_visibility_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.soft.black,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 3,
  },
  password_input: {
    fontSize: 18,
    color: Colors.soft.black,
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 4,
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.soft.black,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
