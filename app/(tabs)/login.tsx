import { Keyboard, StyleSheet, TouchableWithoutFeedback, } from "react-native";
import Constants from "expo-constants";
import { AnimatePresence, MotiView } from "moti";
import { Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/skeleton";
import { Colors } from "@/constants";
import { LoginTab } from "@/components/custom/Login/Login";
import { SignUpTab } from "@/components/custom/Signup/Signup";
import { ImageBackground } from "expo-image";
import { AuthContextType, AuthStoreContext } from "@/components/custom/context";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";


export default function LoginModalScreen() {
  const [renderSignUp, setRenderSignUp] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const AuthContextStore = useContext<AuthContextType>(AuthStoreContext);

  useEffect(() => {
    async function getUser() {
      if (AuthContextStore.session) {
        return router.push("/profile");
      }
    }
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  return (
    <ImageBackground blurRadius={17} source={require("@/assets/images/gym-background.jpg")} alt="Gym Background" style={styles.imageBackground}>
      <TouchableWithoutFeedback style={{ width: '100%', height: '100%', }} onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.container}>
          <Text style={styles.gymify_header}>Gymify</Text>
          <View style={styles.tabs}>
            <MotiView style={{ ...styles.tab, borderColor: renderSignUp ? Colors.orange["500"] : Colors.gray["200"], borderBottomWidth: renderSignUp ? 4 : 2 }}>
              <Button style={styles.tab_button} onPress={() => setRenderSignUp(true)}>
                <Text style={{ color: Colors.white, fontWeight: "600", fontSize: 16, }}>
                  Sign Up
                </Text>
              </Button>
            </MotiView>
            <MotiView style={{ ...styles.tab, borderColor: !renderSignUp ? Colors.orange["500"] : Colors.gray["200"], borderBottomWidth: !renderSignUp ? 4 : 2 }}>
              <Button style={styles.tab_button} onPress={() => setRenderSignUp(false)}>
                <Text style={{ color: Colors.white, fontWeight: "600", fontSize: 16, }}>
                  Login
                </Text>
              </Button>
            </MotiView>
          </View>

          <AnimatePresence exitBeforeEnter>
            {!renderSignUp && <LoginTab key={"LOGIN_TAB"} />}
            {renderSignUp && <SignUpTab key={"SIGNUP_TAB"} />}
          </AnimatePresence>
        </View >

      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    rowGap: 15,
    paddingTop: Constants.statusBarHeight,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  gymify_header: {
    paddingVertical: 40,
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1,
    color: Colors.theme_orange,
  },
  tabs: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 7,
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
  },
  tab: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  tab_button: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 7,
    paddingHorizontal: 9
  }
});
