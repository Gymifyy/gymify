import { AuthStoreContext } from "@/components/custom/context";
import { Loader } from "@/components/skeleton";
import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { UserController } from "@/utils/User";
import { useIsFocused } from "@react-navigation/native";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useContext, useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { UserTabs } from "@/components/user_modal/UserTabs";

type ParamUserType = { id: string, username: string, email: string, profileImage: string | null };

const userController: UserController = new UserController();
export default function UserModal() {
  const authStoreContext = useContext(AuthStoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [gymId, setGymId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "actions" | "gyms">("overview");
  const params = useLocalSearchParams<{ user?: string, gymId: string }>()
  const isFocused: boolean = useIsFocused();


  function Header() {
    return (
      <View style={styles.headerContainer}>
        {user?.profileImage ?
          <View style={styles.profileImageContainer}>
            <Image alt={`${user.username} profile photo`} source={{ uri: user.profileImage }} style={styles.profileImage} />
          </View>
          : null}
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{user?.username}</Text>
          <View style={styles.lastAndFirstName}>
            <Text style={styles.fName}>{user?.firstName} </Text>
            <Text style={styles.fName}>{user?.lastName}</Text>
          </View>
          <View>
            <Text>Date Created: {' '}
              <Text style={styles.dateCreated}>{dayjs(user?.createdAt).format("dddd, DD MMMM YYYY")}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    async function fetchUser() {
      if (!params.user) return;
      if (!authStoreContext.session?.user.user_metadata.isSuperAdmin) return router.push("/");
      const parsedUser = JSON.parse(params.user) as ParamUserType;
      setGymId(params.gymId ? params.gymId : "");
      // make query to db to get user with Id
      const { data, error } = await userController.getUserById(parsedUser.id)
      if (error) console.log({ error, component: "User_Modal" });
      if (data) {
        setUser(data);
        setTimeout(() => setIsLoading(false), 1500);
      };
      return;
    }
    if (isFocused) {
      fetchUser();

    }
  }, [params.user]);

  if (isLoading) {
    return (
      <MotiView
        style={styles.userTab}
        from={{ opacity: 0, left: -50 }}
        animate={{ opacity: 1, left: 0 }}
      >
        <View style={styles.headerContainer}>
          <Loader radius={"round"} backgroundColor={Colors.slate[400]} colorMode="light" width={70} height={70} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={200} height={40} />
        </View>
        <View style={{ paddingVertical: 6, alignItems: 'center', gap: 10, alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={30} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={30} />
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={30} />
        </View>
        <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={200} height={20} />
        <View style={{ paddingVertical: 6, alignItems: 'center', gap: 10, alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Loader backgroundColor={Colors.slate[400]} colorMode="light" width={"100%"} height={30} />
        </View>
      </MotiView>
    )
  }

  return (
    <MotiView
      style={styles.userTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <Header />
      <UserTabs user={user} setChosenTab={setActiveTab} chosenTab={activeTab} gymId={gymId} />
    </MotiView>
  )
}

const styles = StyleSheet.create({
  userTab: {
    width: "100%",
    height: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerContainer: {
    width: "100%",
    height: "auto",
    padding: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    columnGap: 10,
  },
  profileImageContainer: {
    width: "auto",
    height: "auto",
    padding: 5,
    borderRadius: 50,
    borderColor: Colors.orange[600],
    borderWidth: 2,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  usernameContainer: {
    width: "auto",
    height: "auto",
    flexDirection: "column",
    gap: 5,
  },
  username: {
    fontSize: 22,
    letterSpacing: 0.9,
    fontWeight: "500",
  },
  lastAndFirstName: {
    flexDirection: "row",
    width: "100%",
  },
  fName: {
    fontSize: 16,
    letterSpacing: 0.9,
  },
  dateCreated: {
    color: Colors.orange[600],
    fontWeight: "600",
  },
});
