import { useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database.types";

/**
 * Responsible for header display.
 * This componenta manages its own state. no need for props.
 * */

export function Header({ user }: { user: User & Omit<Tables<"users">, "email" | "id" | "createdAt"> | null }) {

  const renderHeader = useCallback(() => {
    if (!user) {
      return (
        <>
        </>
      );
    }
    else {
      return (
        <View style={styles.header_group}>
          <Text style={styles.header_text}>
            Hello{' '}
            <Text>
              {user.username}
            </Text>
          </Text>
          <Text style={styles.header_description}>Take a look at our curated list of gyms.</Text>
        </View>
      );
    }
  }, [user])
  return renderHeader();
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
