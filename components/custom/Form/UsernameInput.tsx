import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  username: string,
  setUsername: Dispatch<SetStateAction<string>> | ((newUsername: string) => void),
}

export function UsernameInput({ username, setUsername }: Props): React.JSX.Element {
  return (
    <View style={styles.username_group}>
      <TextInput
        style={styles.username_input}
        inputMode={"text"}
        maxLength={120}
        value={username}
        onChangeText={(newValue: string) => setUsername(newValue)}
        placeholderTextColor={Colors.soft.black}
        placeholder={"Username"} />
      <Button onPress={() => { }} style={styles.username_button}>
        <MaterialIcons color={Colors.soft.black} size={24} name={"face"} />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  username_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  username_button: {
    height: 'auto',
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.soft.black,
    borderBottomWidth: 1.3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 3,
  },
  username_input: {
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
