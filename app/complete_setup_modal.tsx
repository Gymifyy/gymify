import { UserBasicInformation } from "@/components/signup/UserBasicInformation";
import { UserInformation } from "@/components/signup/UserInformation";
import { Tables } from "@/types/database.types";
import { UserController } from "@/utils/User";
import { supabase } from "@/utils/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function CompleteSetup() {
  const [age, setAge] = useState<Tables<"users">["age"]>(null);
  const [height, setHeight] = useState<Tables<"users">["height"]>(0);
  const [weight, setWeight] = useState<Tables<"users">["weight"]>(0);
  const [firstName, setFirstName] = useState<Tables<"users">["firstName"]>("");
  const [lastName, setLastName] = useState<Tables<"users">["lastName"]>("");
  const [profileImage, setProfileImage] = useState<Tables<"users">["profileImage"]>("");
  const [phoneNumber, setPhoneNumber] = useState<Tables<"users">["phoneNumber"]>(null);
  const [gender, setGender] = useState<Tables<"users">["gender"]>("MALE");
  const [username, setUsername] = useState<Tables<"users">["username"]>("");
  const [email, setEmail] = useState<Tables<"users">["username"]>("");
  const [step, setStep] = useState<number>(0);
  const maxSteps = [0, 1, 2, 3, 4];
  const [error, setError] = useState<string>("");
  const isFocused: boolean = useIsFocused();
  useEffect(() => {
    async function fetchUser() {
      const userController: UserController = new UserController();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log({ error });
        return;
      }
      if (!data) return
      const { data: res, error: err } = await userController.getUserById(data.user.id)
      if (err) {
        console.log({ err });
        return;
      }
      if (!res) return;
      setAge(res.age);
      setWeight(res.weight);
      setLastName(res.lastName);
      setFirstName(res.lastName);
      setHeight(res.height);
      setProfileImage(res.profileImage);
      setPhoneNumber(res.phoneNumber);
      setGender(res.gender);
    }
    if (isFocused) fetchUser();
  }, [isFocused]);

  const proceedToNextStep = () => {
    setStep((previous) => previous + 1);
  };

  return (
    <View>
      <View>
        <Text>AS</Text>
      </View>
    </View>
  )
}
