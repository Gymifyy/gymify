import { AuthStoreContext } from '@/components/custom/AuthContext';
import { Button } from '@/components/skeleton';
import { Colors } from '@/constants';
import { supabase } from '@/utils/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import { Router, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

/**
 *  User Profile screen
 * */
export default function UserProfileScreen() {
  const AuthContextStore = useContext(AuthStoreContext);
  const router: Router = useRouter();

  useEffect(() => {
    // do not allow unAuthed users to get to this route
    if (!AuthContextStore.session) {
      router.replace("/");
      return;
    }
  }, [AuthContextStore]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error === null) {
      router.replace("/");
      return;
    }
  }
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} style={styles.logoutButton}>
        <MaterialIcons name={"logout"} size={28} color={Colors.slate["800"]} />
        <Text>
          Log Out
        </Text>
      </Button>
      <Text style={styles.title}>User Profile Screen</Text>
    </View>
  );
}

// Object like css styling.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: 5,
    width: 'auto',
    paddingHorizontal: 3,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

