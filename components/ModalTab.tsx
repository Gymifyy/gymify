import { Dispatch, SetStateAction } from "react";
import { Colors } from "../constants";
import { Button } from "./skeleton";
import { StyleSheet, Text } from "react-native";

type TabProps<T> = {
  tab: T,
  chosenTab: T,
  setChosenTab: Dispatch<SetStateAction<T>>,
};

export function ModalTab<T>({ tab, setChosenTab, chosenTab }: TabProps<T>) {
  return (
    <Button onPress={() => setChosenTab(tab)} style={{ ...styles.button, backgroundColor: chosenTab === tab ? Colors.theme_orange : Colors.gray[300], borderColor: chosenTab === tab ? Colors.orange[400] : Colors.gray[400] }} >
      <Text style={{ fontSize: 16, paddingHorizontal: 3, textTransform: "capitalize", paddingVertical: 2, color: chosenTab === tab ? Colors.white : Colors.slate[900] }}>{`${tab}`}</Text>
    </Button>
  );
};


const styles = StyleSheet.create({
  button: {
    width: 80,
    borderWidth: 2,
    borderColor: Colors.slate[400],
    padding: 3,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
  },
});
