import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Headline, Provider as PaperProvider } from 'react-native-paper';

// Sample data extracted from the scanned ID
const scannedData = {
  firstName: 'John',
  lastName: 'Doe',
  addharid: '1234-5678-9012',
  address: '123 Main Street, City',
  appointwhom_id: 'Appointee ID',
  date: '2023-07-19',
  time: '12:00 PM',
  request_id: 'Request ID',
  phoneNumber: '123-456-7890',
};

const LoginForm = () => {
  const [firstName, setFirstName] = useState(scannedData.firstName);
  const [lastName, setLastName] = useState(scannedData.lastName);
  const [addharid, setAddharid] = useState(scannedData.addharid);
  const [address, setAddress] = useState(scannedData.address);
  const [appointwhomId, setAppointwhomId] = useState(scannedData.appointwhom_id);
  const [date, setDate] = useState(scannedData.date);
  const [time, setTime] = useState(scannedData.time);
  const [requestId, setRequestId] = useState(scannedData.request_id);
  const [phoneNumber, setPhoneNumber] = useState(scannedData.phoneNumber);
  const [approved, setApproved] = useState(''); // Empty by default, to be set by admin
  const [creatorId, setCreatorId] = useState(''); // To be set based on the user

  const handleFormSubmit = () => {
    // Implement the logic to handle form submission
    // You can access the form values in this function
    // For example, you can submit the data to a backend server or perform any other action.
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Headline style={styles.headline}>Gatepass Form</Headline>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          label="Addhar ID"
          value={addharid}
          onChangeText={setAddharid}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          label="Appointee ID"
          value={appointwhomId}
          onChangeText={setAppointwhomId}
        />
        <TextInput
          label="Date"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          label="Time"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          label="Request ID"
          value={requestId}
          onChangeText={setRequestId}
        />
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {/* 'approved' will be set by the admin */}
        <TextInput
          label="Approval Status (Approved/Rejected)"
          value={approved}
          onChangeText={setApproved}
        />
        {/* 'creatorId' will be set based on the logged-in user */}
        <TextInput
          label="Creator ID"
          value={creatorId}
          onChangeText={setCreatorId}
        />
        <Button mode="contained" onPress={handleFormSubmit}>
          Submit
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  
  headline: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginForm;
