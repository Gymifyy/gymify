import { FlatList, View } from 'react-native';
import { Loader } from '@/components/skeleton';
import { GymCard } from '@/components/gym';
import { Colors, GymCardProps, isKey } from '@/constants';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SearchInput, Header } from "@/components/custom";
import { useCallback, useContext, useEffect, useState } from 'react';
import GymCardMocks from "@/assets/gym_mock.json";
import { AuthStoreContext } from '@/components/custom/AuthContext';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const [gyms, setGyms] = useState<GymCardProps[]>([]);
  const [allGymsCopy, setAllGymsCopy] = useState<GymCardProps[]>(gyms);
  const AuthContextStore = useContext(AuthStoreContext);
  useEffect(() => {
    const allGyms: GymCardProps[] = GymCardMocks as GymCardProps[];
    setGyms(allGyms);
    setAllGymsCopy(allGyms);
    setTimeout(() => {
      setIsReadyToRender(true);
    }, 5000);
  }, []);

  useEffect(() => {
    console.log({ page: 'Index', data: JSON.parse(JSON.stringify(AuthContextStore.session)) });
  }, [])

  const handleGymFilterByName = useCallback((value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchTerm("");
      setGyms(allGymsCopy)
      return;
    }
    const filteredGyms: GymCardProps[] = allGymsCopy.filter((gym: GymCardProps) => gym.title.includes(value) || (isKey(gym, "location") && gym.location?.includes(value)));
    setGyms(filteredGyms);
  }, [gyms]);

  //  if (isLoading && isReadyToRender === false) {
  //    return (
  //      <Loader colorMode="light" width={"100%"} height={'100%'} />
  //    )
  //  }

  const renderItem = ({ item, index }: { item: GymCardProps, index: number }) => (
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
  const renderItemKey = (gym: GymCardProps, index: number) => `${gym}__${index}`;
  const renderItemLayout = (_: any, index: number) => (
    { length: 360, offset: 84 * index, index }
  )
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View style={styles.container}>
        <Header user={"Alvi"} />
        <SearchInput handleGymFilterByName={handleGymFilterByName} />
        <FlatList
          data={gyms}
          style={styles.container}
          initialNumToRender={8}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={8}
          getItemLayout={renderItemLayout}
          keyExtractor={renderItemKey}
          renderItem={renderItem}
        />
      </View>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    marginBottom: 0,
    paddingBottom: 49,
    backgroundColor: Colors.soft.white,
  },
});
