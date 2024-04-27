import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';

interface Props {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>> | ((newEmail: string) => void),
}

export function EmailInput({ email, setEmail }: Props): React.JSX.Element {
  return (
    <View style={styles.email_group}>
      <TextInput
        style={styles.email_input}
        inputMode={"email"}
        maxLength={120}
        value={email}
        onChangeText={(newValue: string) => setEmail(newValue)}
        keyboardType={"email-address"}
        placeholderTextColor={Colors.soft.black}
        placeholder={"Email"} />
      <Button onPress={() => { }} style={styles.email_button}>
        <MaterialIcons color={Colors.soft.black} size={24} name={"email"} />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  email_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  email_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.soft.black,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 3,
  },
  email_input: {
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
