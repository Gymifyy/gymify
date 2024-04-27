import { StyleSheet, Text, View } from "react-native";
import { Colors, GymCardProps } from "@/constants";
import { Image } from "expo-image";
import { Button } from "../skeleton";
import { MaterialIcons } from "@expo/vector-icons";
import { Router, useRouter } from "expo-router";
import { ComponentProps, memo, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { AnimatePresence, View as MotionView } from "moti";

function _GymCard({ title, href, quality, localImage, image, location, total_members, index }: GymCardProps & { index?: number }): React.JSX.Element {
  const [iconName, setIconName] = useState<ComponentProps<typeof MaterialIcons>['name']>("price-check");
  const [isQualityDisplayed, setIsQualityDisplayed] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string>(Colors.blue["500"]);
  const router: Router = useRouter();

  function goToGymPage() {
    router.replace("/login");
  }

  function displayQuality() {
    setIsQualityDisplayed((previousValue: boolean) => !previousValue);
    return;
  }

  function zoomImage() {
    alert("Trying to zoom image");
    return;
  }


  useIsomorphicLayoutEffect(() => {
    function mapIconToQuality() {
      switch (quality) {
        case "Best Price":
          setIconColor(Colors.green["500"]);
          setIconName("price-check");
          break;
        case "Best Quality":
          setIconColor(Colors.blue["500"]);
          setIconName("show-chart");
          break;
        default:
          break;
      }
      return;
    }
    mapIconToQuality();

  }, []);

  return (
    <MotionView
      from={{ opacity: 0, left: - 50 }}
      animate={{ opacity: 1, left: 0 }}
      transition={{
        type: 'spring',
        delay: index * 100,
      }}>
      <View style={styles.card}>
        <Button style={({ pressed }: { pressed: boolean }) => [{
          ...styles.image_button
        }]} onPress={zoomImage}>
          <Image alt={`${title} promoted image`} style={styles.card_image} aria-label={`${title} Promoted Image`} source={localImage && !image ? require("@/assets/images/gym-background.jpg") : { uri: image }} />
        </Button>
        <Button style={styles.card_content} onPress={goToGymPage}>
          <View style={styles.card_header_text}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.card_header}>{title}</Text>
            {quality ?
              <Button onPress={displayQuality}>
                <MaterialIcons color={iconColor} size={25} name={iconName} />
              </Button>
              :
              null
            }
            <AnimatePresence exitBeforeEnter>
              {
                isQualityDisplayed ?
                  <MotionView
                    from={{ opacity: 0, right: -10 }}
                    animate={{ opacity: 1, right: 40 }}
                    transition={{
                      type: 'spring',
                    }}
                    exit={{ opacity: 0, right: -10 }}
                    style={[styles.quality_popup, { backgroundColor: iconColor }]}
                  >
                    <Text style={styles.quality_popup_text}>{quality}</Text>
                  </MotionView>
                  : null
              }
            </AnimatePresence>
          </View>
          <Text style={styles.card_location}>{location}</Text>
          <Text style={styles.card_total_members}>{total_members} members</Text>
        </Button>
      </View>
    </MotionView>
  )
}


const styles = StyleSheet.create({
  card: {
    width: 'auto',
    maxWidth: '85%',
    minWidth: '85%',
    position: 'relative',
    height: 'auto',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.2,
  },
  image_button: {
    width: 70,
    height: 70,
  },
  rating_text: {
    fontSize: 17,
    color: Colors.black,
    fontWeight: '500',
  },
  header_group: {
    width: '80%',
    height: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.transparent,
  },
  card_header_text: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    gap: 5,
    backgroundColor: Colors.transparent,
  },
  rating: {
    width: 'auto',
    display: 'flex',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  card_image: {
    maxWidth: 60,
    maxHeight: 60,
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  card_content: {
    width: 270,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    gap: 4,
    backgroundColor: Colors.transparent,
    paddingLeft: 10,
  },
  card_quality: {
    color: Colors.soft.green,
    fontSize: 16,
    fontWeight: '600',
  },
  card_header: {
    fontSize: 18,
    maxWidth: 200,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
  card_location: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.soft.black,
    letterSpacing: 0.3,
  },
  card_total_members: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '400',
    color: Colors.soft.black,
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  card_description: {
    fontSize: 16,
    paddingTop: 4,
    fontWeight: '300',
    color: Colors.soft.black,
    letterSpacing: 0.3,
  },
  button_group: {
    width: 'auto',
    height: 'auto',
    backgroundColor: Colors.transparent,
    display: 'flex',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 15,
  },
  favorite_gym_button: {
    backgroundColor: Colors.transparent,
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    padding: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_more_info: {
    width: '60%',
    height: '100%',
    marginTop: 7,
    backgroundColor: Colors.theme_orange,
    shadowColor: Colors.soft.black,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_more_info_pressed: {
    opacity: 0.8,
  },
  card_more_info_text: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '500',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  quality_popup: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 20,
    fontSize: 19,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowRadius: 2,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.17,
  },
  quality_popup_text: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
  },
});

export const GymCard = memo(_GymCard);
