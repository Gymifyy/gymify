import { Text, View, StyleSheet } from 'react-native';
import { Audio } from "expo-av";
import { Colors } from '@/constants';
import { Calendar } from '@/components/custom';
import { useCallback, useEffect, useState } from 'react';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { Dayjs } from 'dayjs';

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

  return (
    <View style={styles.container}>
      <View style={styles.center_contents}>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {displayDate()}
      </View>
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
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.soft.white,
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
