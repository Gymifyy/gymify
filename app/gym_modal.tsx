import { useIsFocused } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import PagerView from 'react-native-pager-view';
import { reverseGeocodeAsync, LocationGeocodedAddress } from 'expo-location';
import { Colors } from '@/constants';
import { Button, Loader } from '@/components/skeleton';
import { AnimatePresence } from 'moti';
import { RenderContactTab, RenderPricesTab, RenderLocationTab, RenderOverviewTab } from '@/components/gym_modal';
import { AuthStoreContext } from '@/components/custom/context';
import { User } from '@supabase/supabase-js';
import { UserController } from '@/utils/User';
import { RenderUsersTab } from '@/components/gym_modal/RenderUsersTab';
import { GymController } from '@/utils/Gym';
const usersController: UserController = new UserController();
export default function GymModal() {
  const authStoreContext = useContext(AuthStoreContext);
  const [user, setUser] = useState<User | null>(null);
  const [gym, setGym] = useState<Tables<"gyms">>();
  const [activeTab, setActiveTab] = useState<"overview" | "prices" | "location" | "users" | "contact">("overview");
  const [images, setImages] = useState<string[]>([]);
  const [gymLocation, setGymLocation] = useState<LocationGeocodedAddress | null>(null);
  const [gymUsers, setGymUsers] = useState<{ id: string; username: string; email: string; profileImage: string | null; }[] | null>([]);
  const [region, setRegion] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isJoiningGym, setIsJoiningGym] = useState<boolean>(false);
  const params = useLocalSearchParams<{ gym?: string }>()
  const isFocused: boolean = useIsFocused();

  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (authStoreContext.session) {
        setUser({ ...authStoreContext.session.user });
      }
      else setUser(null);
    }
    if (isFocused) getUser();
  }, [isFocused, authStoreContext]);

  // We will get all the values from here
  useEffect(() => {
    async function getGymProps() {
      // Add the new value to your existing form values
      if (params.gym != null) {
        const _temp = JSON.parse(params.gym) as Tables<"gyms">;
        setImages([_temp.logo, ..._temp.add_images])
        setGym(_temp);
        const parsedGymLocation = JSON.parse(JSON.parse(_temp.location)) as { latitude: number, longitude: number };
        setRegion(parsedGymLocation);
        const _tempGymLocation = await reverseGeocodeAsync(parsedGymLocation);
        setGymLocation(_tempGymLocation[0]);
        // get users for gyms
        const { data, error } = await usersController.getUsersById(_temp.members);
        if (error) {
          console.log({ error });
        }
        if (data) {
          setGymUsers(data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      }
    }
    if (isFocused) getGymProps();
  }, [params.gym, isFocused]);

  async function joinGym() {
    setIsJoiningGym(true);
    const userController: UserController = new UserController();
    const gymController: GymController = new GymController();
    // Update MemberCount and members array in gyms
    const _user = await userController.getUserWithEmail(user?.email);
    const { error } = await userController.updateAferJoinGym(_user.user?.id as string)
    if (error) {
      console.log({ error });
      return;
    }
    // Update user's enrolledGymsCount field
    gymController.updateAferJoinGym(gym?.id as string, _user.user?.id as string);
    setTimeout(() => {
      setIsJoiningGym(false);
    }, 1500);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', alignContent: "center", justifyContent: 'flex-start', display: "flex", flexDirection: "column" }}>
      <View style={styles.imageContainer}>
        {isLoading ? <Loader colorMode='light' width={"100%"} height={200} /> :
          <PagerView style={styles.imageContainer} initialPage={0}>
            {/* Additional images */}
            {images.length >= 1 ?
              images.map((image, index) => <Image source={{ uri: image }} style={styles.image} key={`${index + 1}`} />
              )
              : null}
          </PagerView>}
        <View style={styles.informationContainer}>
          <Text style={styles.gymName}>
            {gym?.name}
          </Text>
          <View style={styles.scrollerWrapper}>
            <ScrollView style={styles.scrollerContainer} horizontal={true}>
              <View style={styles.buttonGroup}>
                <Button onPress={() => setActiveTab("overview")} style={{ ...styles.button, backgroundColor: activeTab === "overview" ? Colors.theme_orange : Colors.gray[300], borderColor: activeTab === "overview" ? Colors.orange[400] : Colors.gray[400] }} >
                  <Text style={{ fontSize: 16, paddingHorizontal: 3, paddingVertical: 2, color: activeTab === "overview" ? Colors.white : Colors.slate[900] }}>Overview</Text>
                </Button>
                {user?.user_metadata.isSuperAdmin ?
                  (
                    <Button onPress={() => setActiveTab("users")} style={{ ...styles.button, backgroundColor: activeTab === "users" ? Colors.theme_orange : Colors.gray[300], borderColor: activeTab === "users" ? Colors.orange[400] : Colors.gray[400] }} >
                      <Text style={{ fontSize: 16, paddingHorizontal: 3, paddingVertical: 2, color: activeTab === "users" ? Colors.white : Colors.slate[600] }}>Users</Text>
                    </Button>
                  ) : null}
                <Button onPress={() => setActiveTab("location")} style={{ ...styles.button, backgroundColor: activeTab === "location" ? Colors.theme_orange : Colors.gray[300], borderColor: activeTab === "location" ? Colors.orange[400] : Colors.gray[400] }} >
                  <Text style={{ fontSize: 16, paddingHorizontal: 3, paddingVertical: 2, color: activeTab === "location" ? Colors.white : Colors.slate[600] }}>Location</Text>
                </Button>
                <Button onPress={() => setActiveTab("prices")} style={{ ...styles.button, backgroundColor: activeTab === "prices" ? Colors.theme_orange : Colors.gray[300], borderColor: activeTab === "prices" ? Colors.orange[400] : Colors.gray[400] }} >
                  <Text style={{ fontSize: 16, paddingHorizontal: 3, paddingVertical: 2, color: activeTab === "prices" ? Colors.white : Colors.slate[600] }}>Prices</Text>
                </Button>
                <Button onPress={() => setActiveTab("contact")} style={{ ...styles.button, backgroundColor: activeTab === "contact" ? Colors.theme_orange : Colors.gray[300], borderColor: activeTab === "contact" ? Colors.orange[400] : Colors.gray[400] }} >
                  <Text style={{ fontSize: 16, paddingHorizontal: 3, paddingVertical: 2, color: activeTab === "contact" ? Colors.white : Colors.slate[600] }}>Contact</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
          <View style={styles.addInfo}>
            <AnimatePresence exitBeforeEnter>
              {activeTab === "overview" ? <RenderOverviewTab isSuperAdmin={user?.user_metadata.isSuperAdmin} isLoading={isJoiningGym} gym={gym} joinGym={joinGym} /> : null}
              {activeTab === "users" ? <RenderUsersTab gym={gym} users={gymUsers} /> : null}
              {activeTab === "location" ? <RenderLocationTab gymName={gym?.name} gymDescription={gym?.description} location={gymLocation} region={region} /> : null}
              {activeTab === "prices" ? <RenderPricesTab gymId={gym?.id} /> : null}
              {activeTab === "contact" ? <RenderContactTab gym={gym} /> : null}
            </AnimatePresence>
          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  imagePager: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  gymName: {
    color: Colors.black,
    fontWeight: "600",
    letterSpacing: 0.8,
    fontSize: 30,
  },
  informationContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
    rowGap: 5,
  },
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
  button: {
    width: 80,
    borderWidth: 2,
    borderColor: Colors.slate[400],
    padding: 3,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
  },
  addInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
  },
  description: {
    fontWeight: "400",
    letterSpacing: 0.8,
    fontSize: 17,
    color: Colors.gray[800],
    lineHeight: 22,
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
});

