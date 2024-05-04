import { FlatList, Text, View } from 'react-native';
import { Loader } from '@/components/skeleton';
import { GymCard } from '@/components/gym';
import { Colors } from '@/constants';
import { StyleSheet } from 'react-native';
import { SearchInput, Header } from "@/components/custom";
import { useCallback, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { User } from '@supabase/supabase-js';
import { useIsFocused } from '@react-navigation/native';
import { Tables } from '@/types/database.types';
import { AuthContextType, AuthStoreContext } from '@/components/custom/context';
import { supabase } from '@/utils/supabase';

export default function HomeScreen() {
  const [user, setUser] = useState<User & Omit<Tables<"users">, "email" | "id" | "createdAt"> | null>(null);
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const [gyms, setGyms] = useState<Tables<"gyms">[]>([]);
  const [allGymsCopy, setAllGymsCopy] = useState<Tables<"gyms">[]>(gyms);
  const AuthContextStore = useContext<AuthContextType>(AuthStoreContext);
  const isFocused = useIsFocused();
  const saveRendersTemp: User | null = user;
  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (AuthContextStore.session) {
        // save re-renders 
        if (AuthContextStore.session.user.email === saveRendersTemp?.email) return;
        const { data: users, error } = await supabase.from("users").select("username, firstName, lastName, enrolledCourses, enrolledGyms, weight, height, phoneNumber, bmi, profileImage, enrolledCoursesCount, enrolledGymsCount").eq("email", AuthContextStore.session.user.email as string);
        if (users && users.length >= 1) {
          const _user: Omit<Tables<"users">, "email" | "id" | "createdAt"> = users[0];
          setUser({ ...AuthContextStore.session.user, ..._user });
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
    async function fetchGyms() {
      const { data } = await supabase.from("gyms").select("*");
      if (data) {
        setGyms(data);
        setAllGymsCopy(data);
        setTimeout(() => {
          setIsReadyToRender(true);
        }, 120);
      }
    }
    if (isFocused) {
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

  const renderItem = ({ item, index }: { item: Tables<"gyms">, index: number }) => (
    <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>{
      isReadyToRender ?
        <GymCard {...item} index={index} />
        :
        <View style={{ paddingVertical: 6, alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Loader colorMode="light" width={"85%"} height={88} />
        </View>
    }
    </View>
  )
  const renderItemKey = (gym: Tables<"gyms">, index: number) => `${gym}__${index}`;
  const renderItemLayout = (_: any, index: number) => (
    { length: 360, offset: 84 * index, index }
  )
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        {user ? <Header user={user} /> : null}
        <SearchInput handleGymFilterByName={handleGymFilterByName} />
        {gyms && gyms.length >= 1 ?
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
          /> :
          <View>
            <Text style={styles.noGymsText}>Could not find any nearby gyms. </Text>
          </View>
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
