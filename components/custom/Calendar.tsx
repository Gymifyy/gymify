import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SingleChange } from 'react-native-ui-datepicker/lib/typescript/src/types';
import { Colors } from '@/constants';
import { Dayjs } from 'dayjs';

type Props = {
  selectedDate: DateType,
  setSelectedDate: Dispatch<SetStateAction<string | number | Dayjs | Date>>,
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
    []
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
        headerButtonColor={Colors.orange["600"]}
        selectedItemColor={Colors.orange["600"]}
        // eslint-disable-next-line react-native/no-inline-styles
        selectedTextStyle={{
          fontWeight: 'bold',
          color: Colors.slate["300"],
        }}
        // eslint-disable-next-line react-native/no-inline-styles
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
    backgroundColor: Colors.slate["200"],
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: Colors.soft.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
  },
});
