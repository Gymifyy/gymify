import { ScrollView, StyleSheet, View } from "react-native";
import { LocationGeocodedAddress } from "expo-location";
import { AuthUser } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { Tables } from "@/types/database.types";
import { AnimatePresence } from "moti";
import { Colors } from "@/constants";
import { Text } from "react-native";
// Rendered Tabs
import { RenderOverviewTab } from "./RenderOverviewTab";
import { RenderLocationTab } from "./RenderLocationTab";
import { RenderContactTab } from "./RenderContactTab";
import { RenderPricesTab } from "./RenderPricesTab";
import { RenderUsersTab } from "./RenderUsersTab";
import { ModalTab } from "../ModalTab";

type ModalTabsProps = {
  chosenTab: "users" | "overview" | "prices" | "location",
  setChosenTab: Dispatch<SetStateAction<"users" | "overview" | "prices" | "location">>,
  region: { longitude: number, latitude: number },
  gymLocation: LocationGeocodedAddress | null,
  gym: Tables<"gyms"> | undefined,
  user: AuthUser | null,
  isMember: boolean,
  error: string,
  isJoiningGym: boolean,
  joinGym: () => void,
  gymUsers: {
    id: string;
    username: string;
    email: string;
    profileImage: string | null;
  }[] | null,
};

export function GymTabs({ setChosenTab, chosenTab, user, error, isMember, isJoiningGym, gym, joinGym, gymUsers, gymLocation, region }: ModalTabsProps) {
  return (
    <>
      <View style={styles.scrollerWrapper}>
        <ScrollView style={styles.scrollerContainer} horizontal={true}>
          <View style={styles.buttonGroup}>
            <ModalTab tab={"overview"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
            {user?.user_metadata.isSuperAdmin ?
              (
                <ModalTab tab={"users"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
              ) : null}
            <ModalTab tab={"location"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
            <ModalTab tab={"prices"} setChosenTab={setChosenTab} chosenTab={chosenTab} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.addInfo}>
        <AnimatePresence exitBeforeEnter>
          {chosenTab === "overview" ? <>
            <RenderOverviewTab isMember={isMember} isSuperAdmin={user?.user_metadata.isSuperAdmin} isLoading={isJoiningGym} gym={gym} joinGym={joinGym} />
            {error ?
              <Text style={{ fontSize: 19, fontWeight: "500", color: Colors.red[600] }}>
                {error}
              </Text> : null}
            <RenderContactTab gym={gym} />
          </>
            : null}
          {chosenTab === "users" ? <RenderUsersTab gym={gym} users={gymUsers} /> : null}
          {chosenTab === "location" ? <RenderLocationTab gymName={gym?.name} gymDescription={gym?.description} location={gymLocation} region={region} /> : null}
          {chosenTab === "prices" ? <RenderPricesTab gymId={gym?.id} /> : null}
        </AnimatePresence>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  scrollerContainer: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
  },
  scrollerWrapper: {
    width: "100%",
    height: "auto",
    paddingBottom: 12,
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
  },
  addInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
  },
});
