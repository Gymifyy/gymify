import { DarkTheme } from '@/constants';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from '@/utils/supabase'
import { Session } from '@supabase/supabase-js'
import { AuthContext } from '@/components/custom/AuthContext';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Request access for Calendar
  useEffect(() => {
    (async () => {
      await Calendar.requestCalendarPermissionsAsync();
      await Calendar.requestRemindersPermissionsAsync();
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
    <ThemeProvider value={DarkTheme}>
      <AuthContext>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthContext>
    </ThemeProvider>
  );
}
