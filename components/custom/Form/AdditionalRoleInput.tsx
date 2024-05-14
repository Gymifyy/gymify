import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { MotiView } from "moti";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  role: Tables<"gym_roles">["role"] | null,
  gymData: Array<{ label: string, value: string }>,
  allowedRoles: Array<{ label: string, value: string }>,
  chosenGym: string,
  setRole: Dispatch<SetStateAction<Tables<"gym_roles">["role"] | null>>,
  setChosenGym: Dispatch<SetStateAction<string>>,
}

export function AdditionalRoleInput({ allowedRoles, gymData, chosenGym, setChosenGym, role, setRole }: Props) {
  return (
    <MotiView
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
      transition={{ type: "timing", duration: 250 }}
      style={styles.additionalRoleContainer}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        placeholder={"Select Role"}
        iconStyle={styles.iconStyle}
        data={allowedRoles}
        labelField="label"
        valueField="value"
        value={role}
        onChange={({ value }) => {
          setRole(value as Tables<"gym_roles">["role"])
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        placeholder={"Select Gym"}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={gymData}
        labelField="label"
        valueField="value"
        value={chosenGym}
        onChange={({ value }) => {
          setChosenGym(value);
        }}
      />
    </MotiView>
  )
}

const styles = StyleSheet.create({
  additionalRoleContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 16,
  },
  dropdown: {
    width: "45%",
    height: 40,
    borderColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.slate[300],
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.gray[200]
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600",
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
