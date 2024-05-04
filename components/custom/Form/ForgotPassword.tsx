import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants';
import { Link } from 'expo-router';

export function ForgotPassword(): React.JSX.Element {
  return (
    <Link href="/" asChild>
      <Pressable>
        <Text style={styles.forgot_password_text}>Forgot Password ?</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  forgot_password_text: {
    color: Colors.neutral["800"],
    letterSpacing: 0.4,
    padding: 3,
  },
});
