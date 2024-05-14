import { StyleSheet, TextInput, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';

type Props = {
  email: string,
  variant: "light" | "dark",
  setEmail: React.Dispatch<React.SetStateAction<string>> | ((newEmail: string) => void),
}

export function EmailInput({ email, setEmail, variant }: Props): React.JSX.Element {
  return (
    <View style={styles.email_group}>
      <TextInput
        style={{ ...styles.email_input, color: variant === "dark" ? Colors.slate["200"] : Colors.soft.black, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}
        inputMode={"email"}
        maxLength={120}
        value={email}
        onChangeText={(newValue: string) => setEmail(newValue)}
        placeholderTextColor={variant === "light" ? Colors.soft.black : Colors.soft.white}
        placeholder={"Email"} />
      <Button style={{ ...styles.email_button, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}>
        <Octicons color={variant === "dark" ? Colors.soft.white : Colors.soft.black} size={22} name={"mail"} />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  email_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  email_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 9,
  },
  email_input: {
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
