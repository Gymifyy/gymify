import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Colors } from '@/constants';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import { useIsFocused } from '@react-navigation/native';
import { RoleController } from '@/utils/Role';
import { RoleApplicationCard } from '@/components/role_applications/RoleApplicationCard';
import { LoadingFlatList } from '@/components/custom/LoadingFlatList';
import { GymController } from '@/utils/Gym';
import { UserController } from '@/utils/User';
import Toast from 'react-native-root-toast';

type RoleDataType = { user: Tables<"users">["username"], gym: Tables<"gyms">["name"], role: Tables<"roles_applications">["role"] };

const gymController: GymController = new GymController();
const userController: UserController = new UserController();
const roleController: RoleController = new RoleController();

export default function Requests() {
  const [applications, setApplications] = useState<Tables<"roles_applications">[]>([]);
  const [roleData, setRoleData] = useState<Array<RoleDataType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>("");
  const isFocused: boolean = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function fetchApplications() {
        const { data, error } = await roleController.getPending();
        if (error) {
          console.log({ error });
          return;
        }
        if (!data) return;
        setApplications(data);
      }
      fetchApplications();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      async function fetchData() {
        setIsLoading(true);
        if (applications.length < 1) return;
        applications.map(async (application) => {
          const availableData: RoleDataType = { user: "", gym: "", role: application.role };
          // get username
          const { data, error } = await userController.getUserById(application.userId);
          if (error) {
            console.log({ error, component: "RoleApplicationCard" });
            setFeedback(error.message);
          }
          if (!data) return;
          availableData.user = data.username;
          const { data: gymData, error: gymError } = await gymController.getWithId(application.gymId);
          if (gymError) {
            console.log({ gymError, component: "RoleApplicationCard" });
            setFeedback(gymError.message);
          }
          if (!gymData) return;
          availableData.gym = gymData.name;
          setRoleData(previousValue => previousValue.find(val => val.role === availableData.role && val.gym === availableData.gym && val.user === availableData.user) ? [...previousValue] : [...previousValue, availableData]);
        })
      }
      fetchData();
      setTimeout(() => {
        setFeedback("");
        setIsLoading(false);
      }, Toast.durations.SHORT);
    }
  }, [applications, isFocused]);

  function displayToast(value: string) {
    setFeedback(value);
    setTimeout(() => {
      setFeedback("");
    }, Toast.durations.SHORT);
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Role Requests</Text>
        <View style={styles.applicationsContainer}>
          {!isLoading ?
            roleData.length >= 1 ?
              roleData.map((role) => <RoleApplicationCard key={`${role.gym}__${role.user}__${role.role}`} role={role} feedback={displayToast} />)
              :
              <Text style={styles.title}>No Role Requests found.</Text>
            :
            <LoadingFlatList length={4} />
          }
          <Toast visible={feedback.trim() !== ""} duration={Toast.durations.SHORT}>{feedback}</Toast>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: Constants.statusBarHeight,
    margin: 0,
    backgroundColor: Colors.gray["100"],
  },
  applicationsContainer: {
    width: '100%',
    height: '75%',
    padding: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.soft.black,
    letterSpacing: 0.5,
  },
});
