import { Linking, StyleSheet, Text, View } from "react-native";
import { Button } from "../skeleton";
import { Octicons } from "@expo/vector-icons";
import { Tables } from "@/types/database.types";
import TinyIcon from 'react-native-ico-mingcute-tiny-bold-filled';
import { Colors } from "@/constants";
import { MotiView } from "moti";

export function UserTabActions({ user }: { user: Tables<"users"> | null }) {
  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${user?.phoneNumber}`);
  }

  return (
    <>
      <MotiView
        style={{ width: "100%", height: "auto" }}
        from={{ opacity: 0, left: -50 }}
        animate={{ opacity: 1, left: 0 }}
      >
        <View style={styles.actions}>
          <Button style={{ ...styles.button, ...styles.removeButton }}>
            <Octicons size={20} name={"x-circle"} color={Colors.red[600]} />
            <Text style={{ ...styles.buttonText, ...styles.removeButtonText }}>Remove</Text>
          </Button>
          <Button onPress={openWhatsApp} style={styles.button}>
            <TinyIcon name="phone" />
            <Text style={styles.buttonText}>Contact</Text>
          </Button>
        </View >
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
});
