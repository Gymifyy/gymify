import { MotiView } from "moti";
import { LocationGeocodedAddress } from "expo-location";
import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Colors } from "@/constants";
import Constants from "expo-constants";

export function RenderLocationTab({
  location,
  region,
  gymName,
  gymDescription
}: {
  location: LocationGeocodedAddress | null,
  region: {
    latitude: number,
    longitude: number
  },
  gymName: string | undefined,
  gymDescription: string | undefined
}): ReactNode {
  return (
    <MotiView
      style={styles.overviewTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <MapView region={{ ...region, latitudeDelta: 0.04, longitudeDelta: 0.05, }} style={{ width: '100%', height: '100%' }} >
        <Marker
          coordinate={region}
          title={gymName as string}
          description={gymDescription as string}
        />
      </MapView>
      <Text style={{ fontSize: 17, letterSpacing: 0.7, color: Colors.slate[800] }}>{location?.city}, {location?.country}, {location?.street}</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  overviewTab: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "center",
    justifyContent: "center",
    rowGap: 12,
  },
});
