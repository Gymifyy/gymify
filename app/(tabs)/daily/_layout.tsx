import { Text, View, StyleSheet } from 'react-native';
import { Audio } from "expo-av";
import { Colors } from '@/constants';
import { Calendar } from '@/components/custom';
import { useCallback, useEffect, useState } from 'react';
import { scheduleNotification } from "@/utils/Notifications";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { Dayjs } from 'dayjs';
import Constants from 'expo-constants';
import { Button } from '@/components/skeleton';
import { Octicons } from '@expo/vector-icons';
import { NotificationRequestInput } from 'expo-notifications';

dayjs.extend(relativeTime)

export default function CalendarScreen() {
  // calculate todays date
  const today = dayjs().subtract(dayjs().hour(), 'hours');
  const [sound, setSound] = useState<Audio.Sound>(new Audio.Sound());
  const [selectedDate, setSelectedDate] = useState<string | number | Dayjs | Date>(new Date());

  useEffect(() => {
    Audio.Sound.createAsync(require("@/assets/audio/about-a-week-ago.mp3")).then(async ({ sound }) => {
      setSound(sound);
    });
  }, []);


  const displayDate = useCallback(() => {
    if (sound._loaded) {
      sound.stopAsync();
    }
    const sDate = dayjs(selectedDate.toString());
    // 0 -> Today
    // -7 -> 7 Days ago
    // +7 -> 7 Days ahead f
    const difference: number = sDate.diff(today, "d");
    if (difference === 0 && sDate.date() === today.date()) {
      return <Text style={styles.display_date}>Today</Text>
    }
    else if (difference === -7) {
      sound && sound.playAsync()
      return <Text style={styles.display_date}>A week ago</Text>
    }
    return <Text style={styles.display_date}>{sDate.from(today)}</Text>
  }, [selectedDate]);

  async function notify() {
    const request: NotificationRequestInput = {
      content: {
        title: `Hello a`,
        body: 'Here is the notification body',
      },
      trigger: null,
    }
    await scheduleNotification(request);
  }

  return (
    <View style={styles.container}>
      <View style={styles.center_contents}>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {displayDate()}
        <Button onPress={async () => { await notify() }} style={{ width: 120, display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', gap: 7, height: 50, paddingHorizontal: 7, paddingVertical: 3, borderWidth: 2, borderColor: Colors.blue["500"], borderRadius: 10, }}>
          <Octicons size={24} name="mail" color={Colors.blue["500"]} />
          <Text>Notify me</Text>
        </Button>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.slate["100"],
  },
  center_contents: {
    width: '93%',
    height: 'auto',
    alignSelf: 'center',
    backgroundColor: Colors.transparent,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.soft.white,
    letterSpacing: 0.5,
  },
  display_date: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.soft.black,
    letterSpacing: 0.5,
    paddingVertical: 14,
    textTransform: 'capitalize',
  },
});
