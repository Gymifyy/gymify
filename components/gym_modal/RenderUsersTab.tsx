import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { MotiView } from "moti";
import { FlatList, Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../skeleton";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

export function RenderUsersTab({ gym, users }: { gym: Tables<"gyms"> | undefined, users: { id: string; username: string; email: string; profileImage: string | null; }[] | null }) {

  function navigateToUserModal(user: { id: string, username: string, email: string, profileImage: string | null }) {
    router.push({
      pathname: "/user_modal",
      params: {
        user: JSON.stringify(user),
      },
    });
    return;
  }

  function renderItem({ item }: { item: { id: string; username: string; email: string; profileImage: string | null; }, index: number }) {
    return (
      <Button onPress={() => navigateToUserModal(item)} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <View key={item.id} style={styles.userContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageContainer} source={item.profileImage ? { uri: item.profileImage } : require("@/assets/images/man.png")} />
          </View>
          <View style={{ display: "flex", width: "75%", flexDirection: "column", alignItems: "flex-start", alignContent: "flex-start", justifyContent: "space-between" }}>
            <View style={{ width: "90%", height: "auto", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", columnGap: 5, }}>
              <Text style={styles.username}>{item.username}</Text>
              {gym?.manager === item.id ?
                <Text style={styles.managerLabel}>Manager</Text>
                : null}
              {gym?.coaches.includes(item.id) ?
                <Text style={styles.coachesLabel}>Coach</Text>
                : null}
              {gym?.frontDesks.includes(item.id) ?
                <Text style={styles.frontDeskLabel}>Front Desk</Text>
                : null}
            </View>
            <Text style={styles.email}>{item.email}</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Button>
              <Octicons name={"info"} size={24} color={Colors.sky[600]} />
            </Button>
          </View>
        </View>
      </Button>
    )
  }
  function renderItemKey(user: { id: string; username: string; email: string; profileImage: string | null; }, index: number) { return `${user.id}__${index}` };
  function renderItemLayout(_: any, index: number) {
    return { length: 350, offset: 84 * index, index };
  }
  return (
    <MotiView
      style={styles.overviewTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      {users && users.length >= 1 ? <Text style={styles.info}>{users.length} registered users</Text> : <Text style={styles.info}>No users are registered in this gym yet.</Text>}
      {/* TODO: Search functionality */}
      <Text>Search here ...</Text>
      {users && users.length >= 1 ?
        <FlatList
          data={users}
          style={styles.gymsList}
          initialNumToRender={8}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={8}
          getItemLayout={renderItemLayout}
          keyExtractor={renderItemKey}
          renderItem={renderItem}
        />
        : null}
    </MotiView>
  )
}


const styles = StyleSheet.create({
  overviewTab: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "center",
    justifyContent: "center",
    rowGap: 12,
  },
  gymsList: {
    width: '100%',
    height: '100%',
  },
  email: {
    fontWeight: "400",
    letterSpacing: 0.8,
    fontSize: 14,
    color: Colors.gray[800],
    lineHeight: 22,
  },
  username: {
    fontWeight: "400",
    letterSpacing: 0.8,
    fontSize: 17,
    color: Colors.gray[800],
    lineHeight: 22,
  },
  info: {
    fontSize: 17,
    lineHeight: 22,
    color: Colors.gray[800],
  },
  managerLabel: {
    fontWeight: "500",
    color: Colors.orange[600],
    fontSize: 17,
  },
  coachesLabel: {
    fontWeight: "500",
    color: Colors.blue[600],
    fontSize: 17,
  },
  frontDeskLabel: {
    fontWeight: "500",
    color: Colors.purple[600],
    fontSize: 17,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userContainer: {
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
});


