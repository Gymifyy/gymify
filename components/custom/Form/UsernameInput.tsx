import { StyleSheet, TextInput, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  username: string,
  setUsername: Dispatch<SetStateAction<string>> | ((newUsername: string) => void),
  variant: "dark" | "light",
}

export function UsernameInput({ username, variant, setUsername }: Props): React.JSX.Element {
  return (
    <View style={styles.username_group}>
      <TextInput
        style={{ ...styles.username_input, color: variant === "dark" ? Colors.slate["200"] : Colors.soft.black, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}
        inputMode={"text"}
        maxLength={120}
        value={username}
        onChangeText={(newValue: string) => setUsername(newValue)}
        placeholderTextColor={variant === "dark" ? Colors.soft.white : Colors.soft.black}
        placeholder={"Username"} />
      <Button onPress={() => { }} style={{ ...styles.username_button, borderBottomColor: variant === "dark" ? Colors.soft.white : Colors.soft.black }}>
        <Octicons color={variant === "dark" ? Colors.soft.white : Colors.soft.black} size={22} name={"smiley"} />
      </Button>
    </View >
  )
}
const styles = StyleSheet.create({
  username_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  username_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 9,
  },
  username_input: {
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
