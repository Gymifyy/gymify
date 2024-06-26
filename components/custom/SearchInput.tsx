import { StyleSheet, TextInput, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Colors } from '@/constants';
import { Button } from '../skeleton';
import { useState } from 'react';
import { DebouncedState, useDebounceCallback } from 'usehooks-ts';

interface Props {
  handleSearchInput: (value: string) => void;
}

export function SearchInput({ handleSearchInput }: Props): React.JSX.Element {
  const debounced: DebouncedState<(value: string) => void> = useDebounceCallback(handleSearchInput, 230);
  const [sTerm, setSTerm] = useState<string>("");
  function handleSearchInputDebounce(sTerm: string) {
    debounced.cancel();
    setSTerm(sTerm);
    debounced(sTerm);
  }

  return (
    <View style={styles.search_input_group}>
      <TextInput
        style={styles.search_input}
        inputMode={"search"}
        maxLength={120}
        value={sTerm}
        onChangeText={(newValue: string) => handleSearchInputDebounce(newValue)}
        keyboardType={"default"}
        placeholderTextColor={Colors.slate["500"]}
        placeholder={"Search gyms"} />
      <Button onPress={() => { }} style={styles.search_input_button}>
        <Octicons color={sTerm ? Colors.slate["800"] : Colors.slate["500"]} size={22} name={"search"} />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  search_input_group: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '87%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray["300"],
    backgroundColor: Colors.gray["200"],
  },
  search_input_button: {
    height: '100%',
    backgroundColor: Colors.transparent,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search_input: {
    fontSize: 18,
    color: Colors.soft.black,
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.transparent,
  },
});

