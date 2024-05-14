import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import dayjs from "dayjs";
import { MotiView } from "moti";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../skeleton";
import { Octicons } from "@expo/vector-icons";

export function RenderOverviewTab({ gym, joinGym, isLoading, isSuperAdmin }: { gym: Tables<"gyms"> | undefined, joinGym: () => void, isLoading: boolean, isSuperAdmin: boolean }) {
  return (
    <MotiView
      style={styles.overviewTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <Text style={styles.description}>
        {gym?.description}
      </Text>
      <Text style={styles.description}>
        <Text style={{ ...styles.description, color: Colors.theme_orange, fontWeight: "600" }}>
          {gym?.coaches.length} {' '}
        </Text>
        coaches
      </Text>
      <Text style={styles.description}>
        <Text style={{ ...styles.description, color: Colors.theme_orange, fontWeight: "600" }}>
          {gym?.membersCount} {' '}
        </Text>
        members
      </Text>
      {isLoading ? <View style={{ height: 100, width: "100%", alignSelf: "center", justifyContent: "center", alignItems: "center", alignContent: "center", }}>
        <Image style={{ height: 100 }} source={require("@/assets/loading_animation.gif")} alt={"Loading Animation"} />
      </View> : null}
      {isSuperAdmin ? null : (
        <Button onPress={joinGym} style={styles.joinButton}>
          <Octicons size={19} color={Colors.slate[100]} name={"plus"} />
          <Text style={{ color: Colors.slate[100], fontWeight: "600", letterSpacing: 0.7, fontSize: 16, }}>Join</Text>
        </Button>
      )}
      <Text style={{ ...styles.description, alignSelf: 'flex-end', }}>
        {dayjs(gym?.createdAt).format("DD MMMM YYYY").toString()}
      </Text>
    </MotiView>
  )
}


const styles = StyleSheet.create({
  overviewTab: {
    width: "100%",
    height: 'auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "center",
    justifyContent: "center",
    rowGap: 12,
  },
  description: {
    fontWeight: "400",
    letterSpacing: 0.8,
    fontSize: 17,
    color: Colors.gray[800],
    lineHeight: 22,
  },
  joinButton: {
    width: "auto",
    height: "auto",
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: Colors.green[600],
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    alignItems: "center",
    borderRadius: 8,
    alignContent: "center",
    borderWidth: 1,
    borderColor: Colors.green[700],
  },
});
