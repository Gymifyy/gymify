import { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants";
import { User } from "@supabase/supabase-js";
import { AuthStoreContext } from "./context";
import { useIsFocused } from "@react-navigation/native";

/**
 * Responsible for header display.
 * This component that manages its own state. no need for props.
 * */

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const AuthContextStore = useContext(AuthStoreContext);
  const isFocused = useIsFocused();

  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (AuthContextStore.session) {
        // save re-renders 
        setUser({ ...AuthContextStore.session.user });
      }
      else setUser(null);
    }
    if (isFocused) {
      getUser();
    }
  }, [isFocused, AuthContextStore])

  return <>
    {
      user ? (
        <View style={styles.header_group} >
          <Text style={styles.header_text}>
            Hello{' '}
            <Text>
              {user?.user_metadata.username}
            </Text>
          </Text>
          <Text style={styles.header_description}>
            {user?.user_metadata.isSuperAdmin ? "You are currently logged in as Super Admin." : "Take a look at our curated list of gyms."}
          </Text>
        </View>
      ) : null
    }
  </>
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
