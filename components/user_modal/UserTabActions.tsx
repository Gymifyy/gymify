import { Linking, StyleSheet, Text, View } from "react-native";
import { Button } from "../skeleton";
import { Octicons } from "@expo/vector-icons";
import { Tables } from "@/types/database.types";
import { Colors } from "@/constants";
import Icon from 'react-native-ico-social-media';
import { MotiView } from "moti";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

type RoleType = Tables<"gym_roles">["role"];

export function UserTabActions({ user, gymId }: { user: Tables<"users"> | null, gymId: string | null }) {
  const [selectedRole, setSelectedRole] = useState<RoleType>("MEMBER");
  const isFocused: boolean = useIsFocused();

  useEffect(() => {
    async function fetchRole() {
      if (!user || !gymId) return;
      // user exists.
      const { data, error } = await supabase.from("gym_roles").select("*").or(`userId.eq.${user.id},and(gymId.eq.${gymId})`)
      if (!data || error) {
        console.log({ error });
        return;
      }
      console.log({ data });
    }
    if (isFocused) {
      fetchRole();
    }
  }, [isFocused, user])
  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${user?.phoneNumber}`);
  }

  async function changeRoleTo(role: Tables<"gym_roles">["role"]) {
    if (!user) {
      return;
    }
    const { data, error } = await supabase.from("gym_roles").update({ role }).eq("userId", user.id);
    if (!data || error) {
      console.log({ error });
      return;
    }
    console.log({ data });
    return;
  }

  return (
    <>
      <MotiView
        style={{ width: "100%", height: "auto" }}
        from={{ opacity: 0, left: -50 }}
        animate={{ opacity: 1, left: 0 }}
      >
        <View style={styles.actions}>
          <Text style={styles.header}>Change Role</Text>
          <View style={styles.buttonGroup}>
            <Button onPress={() => changeRoleTo("ADMINISTRATOR")} style={{ ...styles.button, borderColor: Colors.yellow[500] }}>
              <Octicons size={20} name={"alert"} color={Colors.yellow[600]} />
              <Text style={styles.buttonText}>Administrator</Text>
            </Button>
            <Button onPress={() => changeRoleTo("MANAGER")} style={{ ...styles.button, borderColor: Colors.yellow[500] }}>
              <Octicons size={20} name={"alert"} color={Colors.yellow[600]} />
              <Text style={styles.buttonText}>Manager</Text>
            </Button>
            <Button onPress={() => changeRoleTo("FRONT_DESK")} style={{ ...styles.button, borderColor: Colors.blue[600] }}>
              <Octicons size={20} name={"log"} color={Colors.blue[600]} />
              <Text style={styles.buttonText}>Front Desk</Text>
            </Button>
            <Button onPress={() => changeRoleTo("MEMBER")} style={{ ...styles.button, borderColor: Colors.blue[600] }}>
              <Octicons size={20} name={"person"} color={Colors.blue[600]} />
              <Text style={styles.buttonText}>Member</Text>
            </Button>
          </View>
          <Text style={styles.header}>Other</Text>
          <View style={styles.buttonGroup}>
            <Button onPress={openWhatsApp} style={{ ...styles.button, ...styles.whatsAppButton }}>
              <Icon name="whatsapp" color={Colors.green[600]} />
              <Text style={styles.buttonText}>Contact</Text>
            </Button>
            <Button style={{ ...styles.button, ...styles.removeButton }}>
              <Octicons size={20} name={"x-circle"} color={Colors.red[600]} />
              <Text style={{ ...styles.buttonText, ...styles.removeButtonText }}>Remove</Text>
            </Button>
          </View>
        </View>
        <Text style={styles.helperText}>* Removes this user from this gym only.</Text>
      </MotiView >
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: "100%",
    height: "auto",
    paddingTop: 20,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },
  buttonGroup: {
    width: "100%",
    height: "auto",
    paddingTop: 20,
    paddingBottom: 12,
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    flexShrink: 1,
    rowGap: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "space-evenly",
    padding: 5,
  },
  header: {
    letterSpacing: 0.8,
    fontSize: 20,
    fontWeight: "500",
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
    borderWidth: 2,
    borderRadius: 5,
  },
  whatsAppButton: {
    borderColor: Colors.green[600],
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
});
