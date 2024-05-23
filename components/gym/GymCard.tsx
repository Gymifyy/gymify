import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants";
import { Image } from "expo-image";
import { Button } from "../skeleton";
import { MaterialIcons } from "@expo/vector-icons";
import { reverseGeocodeAsync, LocationGeocodedAddress } from 'expo-location';
import { memo, useEffect, useState } from "react";
import { View as MotionView } from "moti";
import { Tables } from "@/types/database.types";
import { router } from "expo-router";

type Props = {
  gym: Tables<"gyms">,
  user?: Tables<"users"> | null,
  clickable?: boolean,
}

export const GymCard = memo(function _Card({
  gym,
  user,
  clickable
}: Props): React.JSX.Element {
  const [loc, setLoc] = useState<LocationGeocodedAddress | null>(null);
  useEffect(() => {
    async function getLocation() {
      const _tempLocation = JSON.parse(JSON.parse(gym.location));
      const gymLocation: LocationGeocodedAddress[] = await reverseGeocodeAsync({ latitude: _tempLocation.latitude, longitude: _tempLocation.longitude });
      setLoc(gymLocation[0]);
    }
    getLocation();
  }, [gym.location]);

  function goToGymPage() {
    if (clickable) {
      router.push({
        pathname: "/gym_modal",
        params: {
          gym: JSON.stringify(gym),
          user: JSON.stringify(user),
        },
      });
    }
    return;
  }
  return (
    <MotionView
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <View style={styles.card}>
        <View
          style={styles.image_container}
        >
          <Image
            alt={`${gym.name} promoted image`}
            style={styles.card_image}
            aria-label={`${gym.name} Promoted Image`}
            source={
              !gym.logo
                ? require("@/assets/images/gym-background.jpg")
                : { uri: gym.logo }
            }
          />
        </View>
        <Button style={styles.card_content} onPress={goToGymPage}>
          <View style={styles.card_header_text}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.card_header}
            >
              {gym.name}
            </Text>
          </View>
          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'flex-start', }}>
            <MaterialIcons size={15} name="location-on" color={Colors.gray["500"]} />
            <Text style={styles.card_location}>{loc?.city}, {loc?.name}</Text>
          </View>
          <Text style={styles.card_total_members}>{gym.membersCount} members</Text>
        </Button>
      </View>
    </MotionView>
  );
});

const styles = StyleSheet.create({
  card: {
    // stuff
    width: '100%',
    position: "relative",
    height: 100,
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    // Margin
    marginVertical: 10,
    // Flex stuff
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    // Padding
    padding: 12,
    // Shadow
    shadowColor: Colors.gray["500"],
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.1,
  },
  image_container: {
    width: 70,
    height: 70,
  },
  card_header_text: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    gap: 5,
    backgroundColor: Colors.transparent,
  },
  card_image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  card_content: {
    width: 270,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    gap: 4,
    backgroundColor: Colors.transparent,
    paddingLeft: 10,
  },
  card_header: {
    fontSize: 18,
    maxWidth: 200,
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
  card_location: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.soft.black,
    letterSpacing: 0.3,
  },
  card_total_members: {
    fontSize: 16,
    paddingTop: 4,
    fontWeight: "600",
    color: Colors.blue["500"],
    textAlign: "left",
    letterSpacing: 0.3,
  },
  card_description: {
    fontSize: 16,
    paddingTop: 4,
    fontWeight: "300",
    color: Colors.soft.black,
    letterSpacing: 0.3,
  },
});
