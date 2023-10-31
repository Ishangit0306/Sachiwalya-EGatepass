import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  onChange: (selectedDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, the date picker remains open after selecting a date.
    if (selectedDate) {
      setSelectedDate(selectedDate);
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <View>
        <Button title="Select Date" onPress={showDatepicker} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
