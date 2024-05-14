import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { StyleSheet, Text, View } from "react-native";

export function Plan({ plan }: { plan: Tables<"gym_plans"> }) {
  return (
    <View key={plan.name} style={styles.planContainer}>
      <View style={{ display: "flex", width: "85%", flexDirection: "column", alignItems: "flex-start", alignContent: "flex-start", justifyContent: "space-between" }}>
        <Text style={styles.planTPW}>
          {plan.timesPerWeek} times per week.
        </Text>
        <Text style={{ ...styles.description }}>
          {plan.description}
        </Text>
      </View>
      <Text style={{ fontSize: 22, color: Colors.cyan[600], fontWeight: "600", alignSelf: "center", }}>
        &#36;{plan.price}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    color: Colors.gray[800],
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  planTPW: {
    fontSize: 19,
    paddingBottom: 3,
  },
  planContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: Colors.gray[200],
    paddingHorizontal: 15,
    paddingVertical: 6,
    flexDirection: "row",
    gap: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    marginHorizontal: 4,
  },
});


