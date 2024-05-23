import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants";
import Toast from "react-native-root-toast";
import { memo, useEffect, useState } from "react";
import { View as MotionView } from "moti";
import { Tables } from "@/types/database.types";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "../skeleton";
import { RoleController } from "@/utils/Role";

type RoleDataType = { user: Tables<"users">["username"], role: Tables<"roles_applications">["role"], gym: Tables<"gyms">["name"] };
type Props = {
  role: RoleDataType,
  feedback: (value: string) => void,
}

const roleController: RoleController = new RoleController();


export const RoleApplicationCard = memo(function _Card({
  role,
  feedback
}: Props): React.JSX.Element {
  async function acceptRequest() {
    if (!role.user) return;
    if (!role.gym) return;
    const { data, error } = await roleController.acceptRoleApplication(role.user, role.gym);
    if (error) {
      console.log({ error });
      return;
    }
    if (!data) return;
    const { error: deleteError } = await roleController.deleteRoleApplication(role.user, role.gym, role.role);
    if (deleteError) {
      console.log({ deleteError });
      return;
    }
    feedback("Accepted Role Request Successfully.");
  }
  async function declineRequest() {
    if (!role.user) return;
    if (!role.gym) return;
    const { data, error } = await roleController.declineRoleApplication(role.user, role.gym);
    if (error) {
      console.log({ error });
      return;
    }
    if (!data) return;
    const { error: deleteError } = await roleController.deleteRoleApplication(role.user, role.gym, role.role);
    if (deleteError) {
      console.log({ deleteError });
      return;
    }
    feedback("Declined Role Request Successfully.");
  }

  return (
    <MotionView
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
      key={`${role.gym} ${role.role} ${role.user}`}
    >
      <View style={styles.card}>
        <View style={styles.container}>
          <View style={styles.additionalInfo}>
            <Text style={{ ...styles.text, ...styles.username }}>{role.user}</Text>
          </View>
          <View style={styles.additionalInfo}>
            <Text style={{ ...styles.text, ...styles.role }}>{role.role}</Text>
            <Text style={styles.text}>{role.gym}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Button onPress={async () => await declineRequest()} style={{ ...styles.button, ...styles.rejectButton }}>
            <Text style={styles.buttonText}>Decline</Text>
          </Button>
          <Button onPress={async () => await acceptRequest()} style={{ ...styles.button, ...styles.acceptButton }}>
            <Text style={styles.buttonText}>Accept</Text>
          </Button>
        </View>
      </View>
    </MotionView>
  );
});

const styles = StyleSheet.create({
  card: {
    // stuff
    width: '70%',
    height: "auto",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    // Margin
    marginVertical: 10,
    // Flex stuff
    gap: 8,
    // Padding
    padding: 12,
    // Shadow
    shadowColor: Colors.gray["500"],
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  username: {
    fontSize: 22,
    letterSpacing: 1,
  },
  role: {
    color: Colors.blue[500],
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  additionalInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "auto",
    height: "auto",
    padding: 5,
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    width: "48%",
    height: "auto",
  },
  acceptButton: {
    backgroundColor: Colors.green[500],
  },
  rejectButton: {
    backgroundColor: Colors.red[500],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.white,
    letterSpacing: 0.5,
  }
});

