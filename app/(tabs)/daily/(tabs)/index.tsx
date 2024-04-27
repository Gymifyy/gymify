import { Text, View } from 'react-native';
import { Colors } from '@/constants';
import { StyleSheet } from 'react-native';

export default function DailyHomeScreen() {
  return (
    <View>
      <Text>Daily Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    marginTop: 40,
    paddingBottom: 20,
    backgroundColor: Colors.soft.white,
  },
});
