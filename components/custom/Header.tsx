import { Colors } from "@/constants";
import { Text, StyleSheet, View } from "react-native";

/**
 * Responsible for header display.
 * This componenta manages its own state. no need for props.
 * */
export function Header({ user }: { user: string, }) {
  function renderBasedOnUser(): React.JSX.Element {
    switch (user.trim()) {
      case "":
        return <Text></Text>
      default:
        return (
          <View style={styles.header_group}>
            <Text style={styles.header_text}>
              Hello, {user}
            </Text>

            <Text style={styles.header_description}>
              Take a look at our curated list of gyms.
            </Text>
          </View>
        )
    }
  }

  return renderBasedOnUser();
}


const styles = StyleSheet.create({
  header_group: {
    width: '100%',
    height: 'auto',
    backgroundColor: Colors.transparent,
  },
  header_description: {
    letterSpacing: 0.4,
    fontSize: 17,
    paddingLeft: 25,
    color: Colors.soft.black,
    paddingBottom: 10,
  },
  header_text: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 25,
    paddingBottom: 10,
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
});
