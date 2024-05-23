import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import PagerView from 'react-native-pager-view';
import { reverseGeocodeAsync, LocationGeocodedAddress } from 'expo-location';
import { Colors } from '@/constants';
import { Loader } from '@/components/skeleton';
import { GymTabs } from '@/components/gym_modal';
import { AuthStoreContext } from '@/components/custom/context';
import { UserController } from '@/utils/User';
import { GymController } from '@/utils/Gym';
import { RoleController } from '@/utils/Role';

const userController: UserController = new UserController();
const gymController: GymController = new GymController();
const roleController: RoleController = new RoleController();
const usersController: UserController = new UserController();
export default function GymModal() {
  const authStoreContext = useContext(AuthStoreContext);
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [gym, setGym] = useState<Tables<"gyms">>();
  const [activeTab, setActiveTab] = useState<"overview" | "prices" | "location" | "users" | "applies">("overview");
  const [images, setImages] = useState<string[]>([]);
  const [gymLocation, setGymLocation] = useState<LocationGeocodedAddress | null>(null);
  const [gymUsers, setGymUsers] = useState<{ id: string; username: string; email: string; profileImage: string | null; }[] | null>([]);
  const [region, setRegion] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isJoiningGym, setIsJoiningGym] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [roles, setRoles] = useState<Tables<"roles_applications">[]>([]);
  const params = useLocalSearchParams<{ gym?: string, user?: string }>()
  const isFocused: boolean = useIsFocused();

  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (authStoreContext.session) {
        if (!params.user) return;
        const parsedUser = JSON.parse(params.user) as Tables<"users">;
        setUser(parsedUser);
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
          setError("Something unexpected happened.");
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

  // Check authed user role for this gym
  useEffect(() => {
    if (isFocused) {
      async function fetchRole() {
        if (!user) return;
        if (!gym) return;
        const { data, error } = await roleController.getApplicationsInGym(user.id, gym.id);
        if (error) console.log({ error });
        if (data) {
          setRoles(data);
          console.log({ data })
        };
        return;
      }
      fetchRole();
    }
  }, [user?.id, isFocused, gym?.id])

  // check joined status
  useEffect(() => {
    async function checkJoinedStatus() {
      if (!user) return;
      const { user: _user, error: userError } = await userController.getUserWithEmail(user.email);
      if (!_user) {
        console.log({ userError });
        setError("Could not verify session. Please try to log in again.");
        return;
      }
      if (gym?.members.includes(_user.id)) {
        // user is already a member. No point in further requests.
        setIsMember(true);
      }
      else setIsMember(false);
    }
    if (isFocused) checkJoinedStatus();
  }, [user, isFocused]);

  async function joinGym() {
    setIsJoiningGym(true);
    // Update MemberCount and members array in gyms
    if (!user) {
      setIsJoiningGym(false);
      setError("Could not verify session. Please try to log in again.");
      return;
    };
    const { user: _user, error: userErrorJoin } = await userController.getUserWithEmail(user.email);
    if (!_user) {
      console.log({ userErrorJoin });
      setError("Could not verify session. Please try to log in again.");
      setIsJoiningGym(false);
      return;
    }
    const { data, error } = await userController.updateAfterJoinGym(_user.id)
    if (!data) {
      setError(`Could not join ${gym?.name}. Please try again later.`);
      console.log({ error });
      setIsJoiningGym(false);
      return;
    }
    // Update user's enrolledGymsCount field
    const { data: _gyms, error: err } = await gymController.updateAfterJoinGym(gym?.id as string, data.id);
    if (err) {
      setIsJoiningGym(false);
      return;
    }
    if (_gyms) {
      setGym(_gyms);
    }
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
          <GymTabs
            chosenTab={activeTab}
            setChosenTab={setActiveTab}
            roles={roles}
            user={user}
            gym={gym}
            error={error}
            region={region}
            gymLocation={gymLocation}
            joinGym={joinGym}
            gymUsers={gymUsers}
            isMember={isMember}
            isJoiningGym={isJoiningGym} />
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
});

