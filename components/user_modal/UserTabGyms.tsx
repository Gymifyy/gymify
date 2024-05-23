import { Tables } from "@/types/database.types";
import { GymController } from "@/utils/Gym";
import { useIsFocused } from "@react-navigation/native";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LoadingFlatList } from "../custom/LoadingFlatList";
import { Colors } from "@/constants";
import { sortBasedOnLocation } from '@/constants/utils';
import { getCurrentPositionAsync } from "expo-location";
import { GymCard } from "../gym";

type Props = {
  user: Tables<"users"> | null,
}

const gymController: GymController = new GymController();
export function UserTabGyms({ user }: Props) {
  const [gyms, setGyms] = useState<Tables<"gyms">[]>([]);
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const isFocused: boolean = useIsFocused();
  function renderItem({ item }: { item: Tables<"gyms">, index: number }) {
    return (
      <GymCard gym={item} clickable={false} />
    )
  }
  function renderItemKey(gym: Tables<"gyms">, index: number) { return `${gym.id}__${index}` };
  function renderItemLayout(_: any, index: number) {
    return { length: 350, offset: 84 * index, index };
  }

  useEffect(() => {
    if (isFocused) {
      async function fetchGyms() {
        if (!user) {
          setError("Something unexpected happened. Please try again later.")
          return;
        };
        const { data, error } = await gymController.getAllWithUser(user.id);
        if (error) {
          console.log({ error });
          setError(error?.message);
          return;
        }
        if (!data) return;
        const location = await getCurrentPositionAsync();
        const currentLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        sortBasedOnLocation(data, currentLocation, (value) => {
          setGyms(value);
        });
        setIsReadyToRender(true);
      }

      fetchGyms();
    }
  }, [isFocused, user]);


  return (
    <MotiView
      style={styles.additionalInfo}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <Text style={{ fontSize: 19, letterSpacing: 0.8 }}>
        Registered in
        {' '}
        <Text style={{ fontSize: 19, }}>{user?.enrolledGymsCount}</Text>
        {' '}
        gyms
      </Text>

      {isReadyToRender ? gyms && gyms.length >= 1 ?
        <>
          <FlatList
            data={gyms}
            style={styles.gymsList}
            initialNumToRender={8}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={8}
            getItemLayout={renderItemLayout}
            keyExtractor={renderItemKey}
            renderItem={renderItem}
          />
        </>
        :
        <View>
          <Text style={styles.noGymsText}>Could not find any nearby gyms. </Text>
        </View>
        :
        <View style={{ maxHeight: "74%", width: "100%" }}>
          <LoadingFlatList length={user?.enrolledGymsCount ? user?.enrolledGymsCount > 3 ? 3 : user?.enrolledGymsCount : 3} />
        </View>
      }
    </MotiView>
  )
}

const styles = StyleSheet.create({
  additionalInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
    marginTop: 15,
    gap: 10,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  additionalInfoText: {
    fontSize: 20,
    letterSpacing: 0.8,
    fontWeight: "500",
  },
  gymsList: {
    width: '100%',
    height: '74%',
    paddingTop: 10,
  },
  noGymsText: {
    paddingTop: 30,
    color: Colors.slate["800"],
    fontSize: 19,
    textAlign: "center",
  },
});
