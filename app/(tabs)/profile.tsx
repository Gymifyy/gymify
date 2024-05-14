import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { AuthStoreContext } from "@/components/custom/context";
import { AchievementController } from "@/utils/Achievements";
import { ProfileImage, ProfileAchievements, ProfileHeader, ProfileUsername, ProfileGyms } from "@/components/profile";
import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { UserController } from "@/utils/User";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "moti";
import { Octicons } from "@expo/vector-icons";
import { Button } from "@/components/skeleton";
import { supabase } from "@/utils/supabase";

/**
 *  User Profile screen
 * */
export default function ProfileScreen() {
  const userController = new UserController();
  const achievementController = new AchievementController();
  const [achievements, setAchievements] = useState<Tables<"achievements">[]>(achievementController.achievements);
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [message, setMessage] = useState<string>("");
  const authContext = useContext(AuthStoreContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchAchievements = async () => {
        if (!authContext.session) {
          router.replace("/");
          return;
        }
        const { user: _user, error } = await userController.getUserWithEmail(authContext.session.user.email);
        if (error) {
          router.replace("/");
          return;
        }
        if (!_user) {
          router.replace("/");
          return;
        }
        setUser(_user);
        if (achievementController.achievements.length >= 1) {
          return;
        }
        const { data, error: err } = await achievementController.getAllUserAchievements(_user ? _user.id : "");
        if (err) {
          console.log({ err });
        }
        if (data && data.length >= 1) {
          setMessage("");
          setAchievements(data);
          return;
        }
        else {
          setAchievements([])
          setMessage("No Achievements earned yet. ");
        };

      }
      fetchAchievements();
    }
  }, [isFocused, authContext]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
  }

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <ScrollView style={{ marginBottom: 40 }}>
        <View style={styles.container}>
          <Button onPress={async () => await signOut()} style={styles.signOutButton}>
            <Octicons size={24} color={Colors.red[500]} name="sign-out" />
            <Text style={{ color: Colors.red[500], fontSize: 17, fontWeight: "500" }}>Sign Out</Text>
          </Button>
          <View style={styles.head}>
            <ProfileImage user={user} />
            <View style={styles.heading_container}>
              <ProfileUsername user={user} />
              <ProfileHeader user={user} styling="big" />
            </View>
          </View>
          <Text style={styles.sectionHeader}>Achievements</Text>
          {achievements.length >= 1 ? <ProfileAchievements achievements={achievements} /> : null}
          {message ? <Text>{message}</Text> : null}
          <Text style={styles.sectionHeader}>Gyms</Text>
          <ProfileGyms user={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// Object like css styling.
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.gray["100"],
    padding: 20,
  },
  head: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: Colors.red[500],
    borderWidth: 2,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
    borderRadius: 10,
  },
  heading_container: {
    width: '100%',
    height: 'auto',
    padding: 2,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.7,
  },
  info_container: {
    width: 'auto',
    height: 'auto',
    flex: 1,
    marginLeft: 9,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.8,
    paddingTop: 20,
    alignSelf: "flex-start",
  }
});
