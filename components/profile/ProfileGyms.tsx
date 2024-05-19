import { Tables } from "@/types/database.types"
import { GymController } from "@/utils/Gym";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { Text, View } from "react-native";
import { ProfileGym } from "./ProfileGym";

const gymsController: GymController = new GymController();
export function ProfileGyms({ user }: { user: Tables<"users"> | null }) {
  const [gyms, setGyms] = useState<Tables<"gyms">[]>(gymsController.gyms);
  const isFocused: boolean = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      async function fetchGyms() {
        if (gymsController.gyms.length >= 1) {
          return;
        }
        const { data, error } = await gymsController.getAllWithUser(user ? user.id : "");
        if (error) {
          console.log({ error });
        }
        if (data) {
          setGyms(data);
        }
      }
      fetchGyms();
    }
  }, [isFocused, user])
  return (
    <View style={{ width: '100%', height: 'auto', paddingBottom: 40, flexWrap: "wrap", paddingTop: 6, flexDirection: "row", display: "flex", justifyContent: "space-evenly", alignItems: "center", alignContent: "center", }}>
      {gyms.length >= 1 ? gyms.map((gym: Tables<"gyms">) => <ProfileGym key={gym.id} gym={gym} />) : <Text>You have not joined any gyms yet.</Text>}
    </View>
  )
}
