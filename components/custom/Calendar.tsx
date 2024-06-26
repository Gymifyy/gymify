import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SingleChange } from 'react-native-ui-datepicker/lib/typescript/src/types';
import { Colors } from '@/constants';
import { Dayjs } from 'dayjs';

type Props = {
  selectedDate: DateType,
  setSelectedDate: Dispatch<SetStateAction<DateType>>,
}

/**
 *  Display Calendar Component
 * */
export function Calendar({ selectedDate, setSelectedDate }: Props): React.JSX.Element {

  const handleOnChange = useCallback<SingleChange>(
    (params) => {
      if (params.date) {
        setSelectedDate(params.date);
      }
    },
    [setSelectedDate]
  );

  return (
    <View style={styles.calendar_view}>
      <DateTimePicker
        mode="single"
        date={selectedDate}
        locale={'en'}
        //minDate={dayjs().startOf('day')}
        //maxDate={dayjs().add(3, 'day').endOf('day')}
        firstDayOfWeek={1}
        displayFullDays
        onChange={handleOnChange}
        timePicker={false}
        headerButtonColor={Colors.orange["600"]}
        selectedItemColor={Colors.orange["600"]}
        selectedTextStyle={{
          fontWeight: 'bold',
          color: Colors.slate["100"],
        }}
        todayContainerStyle={{
          borderWidth: 1,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  calendar_view: {
    width: '100%',
    backgroundColor: Colors.slate["100"],
    padding: 15,
    borderRadius: 15,
    shadowRadius: 30,
    shadowColor: Colors.soft.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -5 },
  },
});
