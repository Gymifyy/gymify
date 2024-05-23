import { FlatList, Text, View } from 'react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { GymCard } from '@/components/gym';
import { Colors } from '@/constants';
import { StyleSheet } from 'react-native';
import { SearchInput, Header } from "@/components/custom";
import { useIsFocused } from '@react-navigation/native';
import { Tables } from '@/types/database.types';
import { AuthContextType, AuthStoreContext } from '@/components/custom/context';
import { supabase } from '@/utils/supabase';
import { GymController } from '@/utils/Gym';
import { getCurrentPositionAsync } from 'expo-location';
import { sortBasedOnLocation } from '@/constants/utils';
import { router } from 'expo-router';
import { LoadingFlatList } from '@/components/custom/LoadingFlatList';

export default function HomeScreen() {
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const [gyms, setGyms] = useState<Tables<"gyms">[]>([]);
  const [allGymsCopy, setAllGymsCopy] = useState<Tables<"gyms">[]>(gyms);
  const AuthContextStore = useContext<AuthContextType>(AuthStoreContext);

  const isFocused = useIsFocused();
  const gymController: GymController = new GymController();
  const saveRendersTemp: Tables<"users"> | null = user;
  const currentIndexes = { from: 0, to: 9 };

  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (AuthContextStore.session) {
        // save re-renders 
        if (AuthContextStore.session.user.email === saveRendersTemp?.email) return;
        const { data: _user, error } = await supabase.from("users").select("*").eq("email", AuthContextStore.session.user.email as string).limit(1).single();
        if (_user) {
          setUser(_user);
          if (_user.isSuperAdmin && !_user.completed_setup) {
            // if setup not completed and is super admin
            router.push({
              pathname: "/edit_profile",
              params: {
                user: JSON.stringify(_user),
              },
            });
          }
        }
        if (error) console.log({ error, component: 'Header' });
      }
      else setUser(null);
    }
    if (isFocused) {
      getUser();
    }
  }, [isFocused])


  // Handle Gyms
  useEffect(() => {
    if (isFocused) {
      async function fetchGyms() {
        const { data, error } = await gymController.getAllPaginated(currentIndexes.from, currentIndexes.to);
        if (error) {
          console.log({ error });
        }
        if (data) {
          const location = await getCurrentPositionAsync();
          const currentLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
          sortBasedOnLocation(data, currentLocation, (value) => {
            setGyms(value);
            setAllGymsCopy(value);
          });
          setIsReadyToRender(true);
        }
      }
      fetchGyms();
    }
  }, [isFocused]);

  const handleGymFilterByName = useCallback((value: string) => {
    if (value.trim() === "") {
      setGyms(allGymsCopy)
      return;
    }
    const filteredGyms: Tables<"gyms">[] = allGymsCopy.filter((gym: Tables<"gyms">) => gym.name.includes(value.toLowerCase()) || gym.location.includes(value));
    setGyms(filteredGyms);
  }, [gyms]);

  function renderItem({ item }: { item: Tables<"gyms"> }) {
    return (
      <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <GymCard user={user} gym={item} clickable={true} />
      </View>
    )
  }
  function renderItemKey(gym: Tables<"gyms">, index: number) { return `${gym}__${index}` };
  function renderItemLayout(_: any, index: number) {
    return { length: 360, offset: 84 * index, index };
  }
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Header />
        <SearchInput handleSearchInput={handleGymFilterByName} />
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
          <LoadingFlatList length={4} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.gray["100"],
  },
  gymsList: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
  noGymsText: {
    paddingTop: 30,
    color: Colors.slate["800"],
    fontSize: 19,
    textAlign: "center",
  },
});
