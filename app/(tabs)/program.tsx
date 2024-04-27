import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Colors } from '@/constants';

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
    paddingTop: 60,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.soft.white,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
});
