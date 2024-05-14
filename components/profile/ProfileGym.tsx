import { Button } from "@/components/skeleton";
import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { StyleSheet, Text } from "react-native";

export function ProfileGym({ gym }: { gym: Tables<"gyms"> }) {
  return (
    <Button style={styles.buttonContainer}>
      <Text style={styles.gymName}>{gym.name}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: "auto",
    padding: 7,
    borderRadius: 20,
    backgroundColor: Colors.gray[200],
    borderWidth: 2,
    borderColor: Colors.gray[300],
    margin: 4,
  },
  gymName: {
    textAlign: "center",
    color: Colors.slate[700],
    fontWeight: "500",
    padding: 2,
    fontSize: 16,
  },
});
