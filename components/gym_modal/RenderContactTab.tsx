import { Tables } from '@/types/database.types';
import { MotiView } from 'moti';
import { Linking, StyleSheet, Text } from 'react-native';
import TinyIcon from 'react-native-ico-mingcute-tiny-bold-filled';
import Icon from 'react-native-ico-social-media';
import { openComposer } from "react-native-email-link";
import { Button } from '../skeleton';
import { Colors } from '@/constants';
import { Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export function RenderContactTab({ gym }: { gym: Tables<"gyms"> | undefined }) {
  function openEmail() {
    openComposer({ to: gym?.contactEmail });
  }

  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${gym?.contactPhone}`);
  }
  function openPhone() {
    Linking.openURL(`tel:${gym?.contactPhone}`);
  }
  return (
    <MotiView
      style={styles.overviewTab}
      from={{ opacity: 0, left: -50 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <Button onPress={openEmail} style={styles.emailButton}>
        <Octicons size={20} name="mail" color={Colors.blue["500"]} />
        <Text>Email</Text>
      </Button>
      <Button onPress={openWhatsApp} style={{ ...styles.emailButton, borderColor: Colors.green[600] }}>
        <Icon size={24} name="whatsapp" color={Colors.green["600"]} />
        <Text>Whats App</Text>
      </Button>
      <Button onPress={openPhone} style={{ ...styles.emailButton, borderColor: Colors.slate[700] }}>
        <TinyIcon size={24} name="phone" />
        <Text>Phone</Text>
      </Button>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  overviewTab: {
    width: "100%",
    height: 'auto',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    paddingTop: Constants.statusBarHeight,
  },
  emailButton: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 7,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.blue["500"],
    borderRadius: 10,
  }
});
