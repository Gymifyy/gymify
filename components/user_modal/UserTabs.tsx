import { ScrollView, StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Tables } from "@/types/database.types";
import { AnimatePresence } from "moti";
import { Text } from "react-native";
// Rendered Tabs
import { ModalTab } from "../ModalTab";
import { UserTabOverview } from "./UserTabOverview";
import { UserTabActions } from "./UserTabActions";

type ModalTabsProps = {
  chosenTab: "overview" | "gyms" | "actions" | "contact",
  setChosenTab: Dispatch<SetStateAction<"overview" | "gyms" | "actions" | "contact">>,
  user: Tables<"users"> | null,
};

export function UserTabs({ setChosenTab, chosenTab, user, }: ModalTabsProps) {
  return (
    <>
      <View style={styles.scrollerWrapper}>
        <ScrollView style={styles.scrollerContainer} horizontal={true}>
          <View style={styles.buttonGroup}>
            <ModalTab tab={"overview"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
            <ModalTab tab={"gyms"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
            <ModalTab tab={"actions"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
            <ModalTab tab={"contact"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.addInfo}>
        <AnimatePresence exitBeforeEnter>
          {chosenTab === "overview" ? <UserTabOverview user={user} /> : null}
          {chosenTab === "actions" ? <UserTabActions user={user} /> : null}
        </AnimatePresence>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  scrollerWrapper: {
    width: "100%",
    height: "auto",
    paddingBottom: 12,
    alignSelf: "center",
  },
  scrollerContainer: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    alignSelf: "center",
  },
  buttonGroup: {
    width: "100%",
    height: "auto",
    marginTop: 15,
    marginBottom: 5,
    paddingTop: 10,
    display: "flex",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  addInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
  },
});

