import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants";
import { Image } from "expo-image";
import { Button } from "../skeleton";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ComponentProps, memo, useMemo, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { AnimatePresence, View as MotionView } from "moti";
import { Tables } from "@/types/database.types";

function Card({
  name,
  id,
  logo,
  admin,
  manager,
  membersCount,
  createdAt,
  location,
  index,
}: Tables<"gyms"> & { index: number }): React.JSX.Element {

  function goToGymPage() {
    router.push("/login");
  }


  function zoomImage() {
    alert("Trying to zoom image");
    return;
  }

  return (
    <MotionView
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
      transition={{
        type: "spring",
        delay: index * 100,
      }}
    >
      <View style={styles.card}>
        <Button
          style={styles.image_button}
          onPress={zoomImage}
        >
          <Image
            alt={`${name} promoted image`}
            style={styles.card_image}
            aria-label={`${name} Promoted Image`}
            source={
              !logo
                ? require("@/assets/images/gym-background.jpg")
                : { uri: logo }
            }
          />
        </Button>
        <Button style={styles.card_content} onPress={goToGymPage}>
          <View style={styles.card_header_text}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.card_header}
            >
              {name}
            </Text>
            {/* RENDER QUALITY FOR GYM
            TODO: ADD THIS LATER
            {quality ? (
              <AnimatePresence exitBeforeEnter>
                <MotionView
                  from={{ opacity: 0, top: -30 }}
                  animate={{ opacity: 1, top: 0 }}
                  transition={{
                    type: "spring",
                    delay: index * 160,
                  }}
                  exit={{ opacity: 0, top: -30 }}
                  style={styles.quality_popup}
                >
                  <Text style={styles.quality_popup_text}>Best Price</Text>
                </MotionView>
              </AnimatePresence>
            ) : null}
          */}
          </View>
          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'flex-start', }}>
            <MaterialIcons size={15} name="location-on" color={Colors.gray["500"]} />
            <Text style={styles.card_location}>{location}</Text>
          </View>
          <Text style={styles.card_total_members}>{membersCount} members</Text>
        </Button>
      </View>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "auto",
    maxWidth: "85%",
    minWidth: "85%",
    position: "relative",
    height: 100,
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: Colors.gray["500"],
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.1,
  },
  image_button: {
    width: 70,
    height: 70,
  },
  rating_text: {
    fontSize: 17,
    color: Colors.black,
    fontWeight: "500",
  },
  header_group: {
    width: "80%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: Colors.transparent,
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
  rating: {
    width: "auto",
    display: "flex",
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
  },
  card_image: {
    maxWidth: 60,
    maxHeight: 60,
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
  card_quality: {
    color: Colors.soft.green,
    fontSize: 16,
    fontWeight: "600",
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
  button_group: {
    width: "auto",
    height: "auto",
    backgroundColor: Colors.transparent,
    display: "flex",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 15,
  },
  favorite_gym_button: {
    backgroundColor: Colors.transparent,
    width: "auto",
    height: "auto",
    textAlign: "center",
    padding: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card_more_info: {
    width: "60%",
    height: "100%",
    marginTop: 7,
    backgroundColor: Colors.theme_orange,
    shadowColor: Colors.soft.black,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card_more_info_pressed: {
    opacity: 0.8,
  },
  card_more_info_text: {
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "500",
    color: Colors.white,
    letterSpacing: 0.5,
  },
  quality_popup: {
    position: "absolute",
    width: 'auto',
    right: 0,
    top: 0,
    zIndex: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    borderRadius: 3,
  },
  quality_popup_text: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.white,
  },
});

export const GymCard = memo(Card);
