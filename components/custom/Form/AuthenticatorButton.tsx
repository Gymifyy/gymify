import { PressableProps, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Colors } from '@/constants';
import { Button } from '@/components/skeleton';

interface Props extends PressableProps {
  provider: "Google" | "Apple" | "Email" | "Guest",
  text?: string,
}

function renderProvider(
  provider: "Google" | "Apple" | "Email" | "Guest",
  otherProps: PressableProps,
  text?: string,
): React.JSX.Element {
  let toBeRendered: React.JSX.Element = <View></View>;
  switch (provider) {
    case "Google":
      toBeRendered = (
        <Button style={({ pressed }: { pressed: boolean }) => [
          styles.simple_provider_button,
          pressed && styles.opacity_on_press,
        ]} {...otherProps}>
          <Image source={require("../../../assets/images/google-search.png")}
            alt="Google Provider Logo"
            style={styles.provider_image}
          />
        </Button>
      )
      break;
    case 'Apple':
      toBeRendered = (
        <Button style={({ pressed }: { pressed: boolean }) => [
          styles.simple_provider_button,
          pressed && styles.opacity_on_press,
        ]} {...otherProps}>
          <Image source={require("../../../assets/images/apple-logo.png")}
            alt="Apple Provider Logo"
            style={styles.provider_image}
          />
        </Button>
      )
      break;
    case 'Email':
      toBeRendered = (
        <Button style={({ pressed }: { pressed: boolean }) => [
          styles.email_provider_button,
          pressed && styles.opacity_on_press,
        ]} {...otherProps}>
          {/*<Image source={require("../../assets/images/email.png")}
            alt="Provider Logo"
            style={{ ...styles.provider_image, marginLeft: -10 }}
          />*/}
          <Text style={styles.email_provider_text}>{text ? text : "Login"}</Text>
        </Button>
      )
      break;
    default:
      break;
    case 'Guest':
      toBeRendered = (
        <Button
          style={({ pressed }: { pressed: boolean }) => [
            styles.provider_button,
            { backgroundColor: Colors.transparent },
            pressed && styles.opacity_on_press,
          ]}
          {...otherProps}>
          {/*<MaterialIcons size={30}
            name={"person-off"}
            color={Colors.white}
            style={{ ...styles.provider_image, marginLeft: -10 }}
          /> */}
          <Text style={{ ...styles.provider_text, color: Colors.white }}>{text === undefined ? "Continue as Guest" : text}</Text>
        </Button>
      )
      break;
  }
  return toBeRendered;
}
export function AuthenticatorButton({ provider, text, ...otherProps }: Props): React.JSX.Element {
  return (
    <View style={styles.other_auth_methods_group}>
      {renderProvider(provider, otherProps, text)}
    </View>
  )
}

const styles = StyleSheet.create({
  other_auth_methods_group: {
    backgroundColor: Colors.transparent,
  },
  provider_image: {
    width: 30,
    height: 30,
  },
  provider_text: {
    color: Colors.soft.white,
    textAlign: "left",
    fontSize: 17,
  },
  email_provider_text: {
    color: Colors.soft.white,
    textAlign: "center",
    fontSize: 18,
  },
  email_provider_button: {
    width: 220,
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: Colors.theme_orange,
    borderRadius: 8,
    alignSelf: "center",
    textAlign: "center",
    shadowColor: Colors.theme_orange,
    shadowRadius: 5,
    shadowOffset: { width: 8, height: 3 },
    shadowOpacity: 0.3,
    gap: 9,
  },
  simple_provider_button: {
    width: 'auto',
    height: 'auto',
    padding: 15,
    backgroundColor: Colors.gray["200"],
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
    shadowColor: Colors.gray["500"],
    borderWidth: 1,
    borderColor: Colors.gray["300"],
    shadowRadius: 6,
    shadowOffset: { width: 10, height: 8 },
    shadowOpacity: 0.3,
    gap: 9,
  },
  provider_button: {
    width: 250,
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.gray["500"],
    borderRadius: 50,
    alignSelf: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: Colors.soft.black,
    shadowRadius: 10,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    gap: 9,
  },
  opacity_on_press: {
    opacity: 0.8,
  },
})
