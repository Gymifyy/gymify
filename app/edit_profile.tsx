import { Button, Loading } from "@/components/skeleton";
import { Colors } from "@/constants";
import { Tables } from "@/types/database.types";
import { UserController } from "@/utils/User";
import { Octicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { parseInt } from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";


const userController: UserController = new UserController();
export default function EditProfile() {
  const params = useLocalSearchParams<{ user: string }>()
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<Tables<"users">["gender"]>("MALE");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused: boolean = useIsFocused();

  function parseAddInfo(value: string, content: "age" | "weight" | "height") {
    if (!value || value.trim() === "") {
      if (content === "age") setAge(value);
      if (content === "weight") setWeight(value);
      if (content === "height") setHeight(value);
    };
    //const parsedValue: number = parseInt(value);
    //if (!parsedValue) return;
    if (content === "age") setAge(value);
    if (content === "weight") setWeight(value);
    if (content === "height") setHeight(value);
    return;
  }


  async function cancel() {
    setError("");
    setMessage("");
    setIsLoading(false);
    setUsername(user?.firstName ? user.firstName : "");
    setFirstName(user?.firstName ? user.firstName : "");
    setLastName(user?.lastName ? user.lastName : "");
    setPhoneNumber(user?.phoneNumber ? user.phoneNumber : "");
    setWeight(user?.weight ? user.weight ? user.weight.toString() : "" : "");
    setHeight(user?.height ? user.height ? user.height.toString() : "" : "");
    setAge(user?.age ? user.age ? user.age.toString() : "" : "");
    setGender(user?.gender ? user.gender : "MALE");
    return;
  }

  async function editProfile() {
    setError("");
    setMessage("");
    setIsLoading(true);
    // check username
    if (!username || username.trim() === "") {
      setIsLoading(false);
      setError("Username can not be empty");
      return;
    }
    else if (!firstName || firstName.trim() === "") {
      setIsLoading(false);
      setError("First name can not be empty");
      return;
    }
    else if (!lastName || lastName.trim() === "") {
      setIsLoading(false);
      setError("Last name can not be empty");
      return;
    }
    else if (!phoneNumber || phoneNumber.trim() === "") {
      setIsLoading(false);
      setError("Phone number can not be empty");
      return;
    }
    else if (!gender || gender.trim() === "") {
      setIsLoading(false);
      setError("Gender can not be empty");
      return;
    }
    else if (!weight || weight.trim() === "" || weight.trim() === "0") {
      setIsLoading(false);
      setError("Weight can not be empty");
      return;
    }
    else if (!height || height.trim() === "" || height.trim() === "0") {
      setIsLoading(false);
      setError("Weight can not be empty");
      return;
    }
    else if (!age || age.trim() === "" || age.trim() === "0") {
      setIsLoading(false);
      setError("Age can not be empty");
      return;
    }
    const parsedWeight = parseInt(weight);
    const parsedHeight = parseInt(height);
    const parsedAge = parseInt(age);
    const heightInMeters = parsedHeight / 100;
    const bmi = parsedWeight / Math.pow(heightInMeters, 2);
    const newEdits = { username, firstName, lastName, phoneNumber, gender, weight: parsedWeight, height: parsedHeight, age: parsedAge, bmi, completed_setup: true };
    if (!user || !user.id) {
      setError("Could not verify session. Please try again later.");
      return;
    }
    const { data, error } = await userController.updateUser(user.id, newEdits);
    if (!data) {
      console.log({ error });
      setError("Something unexpected happened. Please try again later.");
      return;
    }
    setMessage("Profile Updated successfully. ");
    setIsLoading(false);
  }

  // Auth Handler
  useEffect(() => {
    async function getUser() {
      if (!params.user) return;
      const _user = JSON.parse(params.user) as Tables<"users">;
      console.log(_user);
      setUser(_user);
      setUsername(_user.username);
    }
    if (isFocused) getUser();
  }, [isFocused, params.user]);

  const allowedValued = [
    {
      label: "Male", value: "MALE",
    },
    {
      label: "Female", value: "FEMALE",
    },
  ];

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <ScrollView style={{ marginBottom: 40 }}>
        <View style={styles.container}>
          <View style={styles.head}>
            {/*Profile Username*/}
            <View style={styles.heading_container}>
              <View style={{ width: "auto", height: "auto", display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", }}>
                <TextInput placeholderTextColor={Colors.gray[500]} placeholder={user?.username} onChangeText={(newValue: string) => setUsername(newValue)} value={username} style={styles.usernameInp} />
                <Octicons size={22} name={"pencil"} color={Colors.gray[700]} />
              </View>
              <View style={{ width: "auto", height: "auto", display: "flex", flexDirection: "row", alignItems: "flex-start", alignContent: "center", }}>
                <Text style={{ ...styles.spaced_text, fontSize: 13, }}>{user?.email}</Text>
              </View>
              {/*Profile Header*/}
              <View style={styles.wah_container}>
                <View style={styles.wah}>
                  <Text style={styles.header}>Weight</Text>
                  <View style={{ width: "auto", height: "auto", display: "flex", flexDirection: "row", gap: 12, alignItems: "center", alignContent: "center", }}>
                    <TextInput inputMode="numeric" placeholderTextColor={Colors.gray[500]} value={`${weight}`} onChangeText={(newValue: string) => parseAddInfo(newValue, "weight")} style={styles.additionalInfoInput} placeholder={`${user?.weight}`} />
                    <Octicons size={22} name={"pencil"} color={Colors.gray[700]} />
                  </View>
                  <Text style={styles.metric}>kg</Text>
                </View>
                <View style={styles.devide} />
                <View style={styles.wah}>
                  <Text style={styles.header}>Age</Text>
                  <View style={{ width: "auto", height: "auto", display: "flex", flexDirection: "row", gap: 12, alignItems: "center", alignContent: "center", }}>
                    <TextInput inputMode="numeric" placeholderTextColor={Colors.gray[500]} value={`${age}`} onChangeText={(newValue: string) => parseAddInfo(newValue, "age")} style={styles.additionalInfoInput} placeholder={`${user?.age}`} />
                    <Octicons size={22} name={"pencil"} color={Colors.gray[700]} />
                  </View>
                  <Text style={styles.metric}>y.o</Text>
                </View>
                <View style={styles.devide} />
                <View style={styles.wah}>
                  <Text style={styles.header}>Height</Text>
                  <View style={{ width: "auto", height: "auto", display: "flex", flexDirection: "row", gap: 12, alignItems: "center", alignContent: "center", }}>
                    <TextInput inputMode="numeric" placeholderTextColor={Colors.gray[500]} value={`${height}`} onChangeText={(newValue: string) => parseAddInfo(newValue, "height")} style={styles.additionalInfoInput} placeholder={`${user?.height}`} />
                    <Octicons size={22} name={"pencil"} color={Colors.gray[700]} />
                  </View>
                  <Text style={styles.metric}>cm</Text>
                </View>
              </View>
            </View>
            {/* First Name */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.headerTitle}>First Name</Text>
              <View style={styles.editContainer}>
                <TextInput placeholderTextColor={Colors.gray[500]} onChangeText={(newValue: string) => setFirstName(newValue)} style={styles.editInput} placeholder={user?.firstName ? user.firstName : "First Name"} />
                <Octicons size={18} name={"pencil"} color={Colors.gray[700]} />
              </View>
            </View>
            {/* Last Name */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.headerTitle}>Last Name</Text>
              <View style={styles.editContainer}>
                <TextInput placeholderTextColor={Colors.gray[500]} onChangeText={(newValue: string) => setLastName(newValue)} style={styles.editInput} placeholder={user?.firstName ? user.firstName : "Last Name"} />
                <Octicons size={18} name={"pencil"} color={Colors.gray[700]} />
              </View>
            </View>
            {/* Phone Number */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.headerTitle}>Phone Number</Text>
              <View style={styles.editContainer}>
                <TextInput placeholderTextColor={Colors.gray[500]} onChangeText={(newValue: string) => setPhoneNumber(newValue)} style={styles.editInput} placeholder={user?.phoneNumber ? user.phoneNumber : "Phone Number"} />
                <Octicons size={18} name={"pencil"} color={Colors.gray[700]} />
              </View>
            </View>
            {/* Gender */}
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.headerTitle}>Gender</Text>
              <View style={styles.editContainer}>
                <Dropdown
                  style={styles.editInput}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholder={"Select Role"}
                  iconStyle={styles.iconStyle}
                  iconColor={Colors.gray[700]}
                  data={allowedValued}
                  labelField="label"
                  valueField="value"
                  value={gender}
                  onChange={({ value }) => {
                    setGender(value as Tables<"users">["gender"])
                  }}
                />
                <Octicons size={18} name={"pencil"} color={Colors.gray[700]} />
              </View>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {message ? <Text style={styles.message}>{message}</Text> : null}
            {isLoading ?
              <View style={{ height: 60, paddingTop: 10, display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                <Loading />
              </View>
              : null}
            <View style={{ width: "100%", height: "auto", padding: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
              <Button onPress={cancel} style={styles.discardButton}>
                <Text style={{
                  fontSize: 17,
                  color: Colors.white,
                  fontWeight: "500",
                  letterSpacing: 0.8,
                }}>Discard</Text>
              </Button>
              <Button onPress={editProfile} style={styles.submitButton}>
                <Text style={{
                  fontSize: 17,
                  color: Colors.white,
                  fontWeight: "500",
                  letterSpacing: 0.8,
                }}>Save</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  discardButton: {
    width: "auto",
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.red[500],
    borderColor: Colors.red[700],
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
  },
  submitButton: {
    width: "auto",
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: Colors.white,
    backgroundColor: Colors.green[500],
    borderColor: Colors.green[700],
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.gray["100"],
    padding: 20,
  },
  headerTitle: {
    fontSize: 19,
    letterSpacing: 0.8,
    textAlign: "left",
  },
  editContainer: {
    width: "auto",
    height: "auto",
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  additionalInfoContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  editInput: {
    width: "80%",
    height: "auto",
    padding: 7,
    fontSize: 19,
    alignSelf: "center",
    borderColor: Colors.gray[400],
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
  },
  head: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  heading_container: {
    width: '100%',
    height: 'auto',
    padding: 2,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  dropdown: {
    width: "45%",
    height: 40,
    borderColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.gray[200]
  },
  message: {
    fontSize: 19,
    color: Colors.green[500],
    fontWeight: "600",
    letterSpacing: 0.8
  },
  error: {
    fontSize: 19,
    color: Colors.red[600],
    fontWeight: "600",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.gray[800],
    fontWeight: "600",
  },
  iconStyle: {
    width: 22,
    height: 22,
    color: Colors.gray[800],
  },
  usernameInp: {
    width: "auto",
    height: "auto",
    paddingHorizontal: 25,
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: Colors.slate["900"],
    textAlign: "center",
  },
  emailInp: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.8,
    color: Colors.slate["900"],
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
  spaced_text: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: Colors.slate["900"]
  },
  wah_container: {
    width: '100%',
    height: 'auto',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  wah: {
    width: '33%',
    height: 'auto',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  header: {
    fontSize: 24,
    color: Colors.theme_orange,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  additionalInfoInput: {
    fontSize: 20,
    fontWeight: "500",
    width: "50%",
    height: "auto",
  },
  metric: {
    fontSize: 16,
  },
  devide: {
    width: 2,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: Colors.gray[300],
    marginRight: 15,
  },
});

