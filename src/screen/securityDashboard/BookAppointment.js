import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

const SecurityPortal = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toISOString());
    setShowDateTimePicker(false);
  };

  return (
    <View style={styles.container}>
     
      {/* <Text style={styles.header}>Security Dashboard</Text> */}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GatepassForm')}>
        <Text style={styles.buttonText}>Book an Appointment</Text>
      </TouchableOpacity>

      {/* Date and Time Display */}
      {selectedDate !== '' && (
        <Text style={styles.selectedDateTime}>{selectedDate}</Text>
      )}

      {/* Date and Time Picker */}
      <DateTimePickerModal
        isVisible={showDateTimePicker}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDateTimePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  selectedDateTime: {
    marginTop: 20,
    fontSize: 16,
  },
  logo: {
    width: 150, // Set the desired width of the logo
    height: 150, // Set the desired height of the logo
    resizeMode: "contain", // Adjust the image's size while preserving aspect ratio
    marginBottom: 20, // Add some margin to separate the logo from the headline
  },
});

export default SecurityPortal;