import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Colors } from '@/constants';
import Constants from 'expo-constants';

export default function ProgramScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Program Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: Constants.statusBarHeight,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.gray["100"],
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
});
