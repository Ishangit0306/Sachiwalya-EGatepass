import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import SecurityManualBookingForm from '../components/SecurityManualBookingForm';
import VisitorPhotoTaken from '../components/VisitorPhotoTaken';
import { useAppSelector } from '../stores/hooks';
import { getAllAppointmentData } from '../stores/appointment/selectors';

// Sample data extracted from the scanned ID
const scannedData = {
  date: '2023-07-19',
  time: '12:00 PM',
};

export interface BookingFormValues {
  // dept: string;
  // visitPurpose: string;
  // employeeId: string | number;
  firstName: string;
  lastName: string;
  // address: string;
  // date: string;
  // time: string;
  // contactNumber: string;
  // documentType: string | number;
  // email: string;
  idNo: string;
}

const AppointmentFormScreen = ({ navigation, route }: any) => {
  const { params } = route;

  console.log('second form params******************************', params)
  const handleFormSubmit = (
    values: BookingFormValues) => {
    // console.log('second form values********************', values)
    if (values) {
      console.log("----values newData****************************", values);
      navigation.navigate("VisitorPhotoScreen", values);
    }

  };

  useEffect(() => {

  }, [route])

  return (
    <SafeAreaView style={styles.container}>
      <SecurityManualBookingForm formOneData={params} handleFormSubmit={handleFormSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingTop: StatusBar.currentHeight
  },
});

export default AppointmentFormScreen;
