import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto'
import { AuthContext } from '@/components/custom/context';
export { ErrorBoundary } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  // Request access for Calendar
  useEffect(() => {
    (async () => {
      await Calendar.requestCalendarPermissionsAsync();
      await Calendar.requestRemindersPermissionsAsync();
      await Notifications.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    })();
  }, []);


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="gym_modal" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="user_modal" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="edit_profile" options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
      </RootSiblingParent>
    </AuthContext>
  );
}
