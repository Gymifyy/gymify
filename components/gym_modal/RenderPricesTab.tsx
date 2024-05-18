import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { GymPlansController } from "@/utils/GymPlans";
import { useIsFocused } from "@react-navigation/native";
import { MotiView, ScrollView } from "moti";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Loader } from "../skeleton";
import { Plan } from "./Plan";

export function RenderPricesTab({ gymId }: { gymId: string | undefined }) {
  const [plans, setPlans] = useState<Tables<"gym_plans">[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const gymPlansController = new GymPlansController();
  const isFocused: boolean = useIsFocused();
  const cachedPlans = plans;

  // Render Plans based on type
  const renderPlans = useCallback((type: Tables<"gym_plans">["type"]) => {
    return (
      <>
        {plans.filter((plan) => plan.type === type).length >= 1 ?
          <View style={{ width: "100%", height: 'auto', padding: 5, gap: 7, }}>
            <Text style={styles.planType}>{type.toString()}</Text>
            {plans.filter((plan) => plan.type === type).length >= 1 ? plans.map((plan) => (
              plan.type === type ?
                <Plan plan={plan} key={plan.id} />
                : null
            )) : null}
          </View>
          : null}
      </>
    );
  }, [plans])

  useEffect(() => {
    async function fetchPlans() {
      if (cachedPlans.length === plans.length && cachedPlans.length !== 0 && cachedPlans.every(item => plans.includes(item))) return setIsLoading(false);
      const { data, error } = await gymPlansController.getAllPaginated(0, 4, gymId);
      if (error) {
        console.log({ error });
      }
      if (data) {
        setPlans(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }
    if (isFocused) fetchPlans();

  }, [isFocused, gymId]);

  // Loading state animation when data is not ready.
  if (isLoading) {
    return (
      <MotiView
        style={styles.overviewTab}
        from={{ opacity: 0, left: -50 }}
        animate={{ opacity: 1, left: 0 }}
      >
        <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={200} height={40} />
        <View style={{ paddingVertical: 6, alignItems: 'center', gap: 10, alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
        </View>
        <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={200} height={40} />
        <View style={{ paddingVertical: 6, alignItems: 'center', gap: 10, alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={50} />
        </View>
      </MotiView>
    )
  }

  return (
    <MotiView
      style={styles.overviewTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <ScrollView scrollEnabled={plans.length > 4} style={{ padding: 0, margin: 0, width: "100%", height: "100%", }}>
        {renderPlans("TRIAL")}
        {renderPlans("MONTHLY")}
        {renderPlans("YEARLY")}
      </ScrollView>
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
    alignContent: "flex-start",
    justifyContent: "flex-start",
    rowGap: 12,
  },
  planContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 15,
    paddingVertical: 6,
    flexDirection: "row",
    gap: 10,
    borderRadius: 20,
    backgroundColor: Colors.gray[200],
    borderWidth: 2,
    borderColor: Colors.gray[300],
    margin: 4,
  },
  planType: {
    textTransform: "capitalize",
    color: Colors.theme_orange,
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: 0.8,
  },
});
