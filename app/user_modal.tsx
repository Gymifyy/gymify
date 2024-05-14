import { AuthStoreContext } from "@/components/custom/context";
import { Button, Loader } from "@/components/skeleton";
import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { UserController } from "@/utils/User";
import { Octicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import TinyIcon from 'react-native-ico-mingcute-tiny-bold-filled';
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useContext, useEffect, useState } from "react";
import { Image, Linking, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { ProfileHeader } from "@/components/profile";

type ParamUserType = { id: string, username: string, email: string, profileImage: string | null };

const userController: UserController = new UserController();
export default function UserModal() {
  const authStoreContext = useContext(AuthStoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const params = useLocalSearchParams<{ user?: string }>()
  const isFocused: boolean = useIsFocused();


  useEffect(() => {
    async function fetchUser() {
      if (!params.user) return;
      if (!authStoreContext.session?.user.user_metadata.isSuperAdmin) return router.push("/");
      const parsedUser = JSON.parse(params.user) as ParamUserType;
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

  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${user?.phoneNumber}`);
  }

  // TODO: IS LOADING STATE !!!
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
      {/* Detailed View on Important Info */}
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
      <View style={styles.actions}>
        <Button style={{ ...styles.button, ...styles.removeButton }}>
          <Octicons size={20} name={"x-circle"} color={Colors.red[600]} />
          <Text style={{ ...styles.buttonText, ...styles.removeButtonText }}>Remove</Text>
        </Button>
        <Button onPress={openWhatsApp} style={styles.button}>
          <TinyIcon name="phone" />
          <Text style={styles.buttonText}>Contact</Text>
        </Button>
      </View>
      <Text style={styles.helperText}>* Removes this user from this gym only.</Text>
      <View style={styles.additionalInfo}>
        <Text style={styles.additionalInfoText}>Additional Info</Text>
        <ProfileHeader user={user} styling={"small"} />
        <Text style={{ fontSize: 19, letterSpacing: 0.8, paddingVertical: 10, }}>
          Registered in
          {' '}
          <Text style={{ fontSize: 19, }}>{user?.enrolledGymsCount}</Text>
          {' '}
          gyms
        </Text>
      </View>
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
  actions: {
    width: "100%",
    height: "auto",
    paddingTop: 20,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  button: {
    width: "auto",
    height: "auto",
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    borderColor: Colors.slate[800],
    borderWidth: 2,
    borderRadius: 5,
  },
  removeButton: {
    borderColor: Colors.red[600],
  },
  buttonText: {
    fontSize: 16,
    letterSpacing: 0.8,
  },
  removeButtonText: {
    color: Colors.red[600],
  },
  helperText: {
    lineHeight: 22,
    letterSpacing: 0.7,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.slate[700],
  },
  additionalInfo: {
    width: "100%",
    height: "auto",
    padding: 5,
    marginTop: 15,
    gap: 10,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  additionalInfoText: {
    fontSize: 20,
    letterSpacing: 0.8,
    fontWeight: "500",
  },

});
