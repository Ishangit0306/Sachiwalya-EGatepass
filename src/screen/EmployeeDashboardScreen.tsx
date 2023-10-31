import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import LogoutButton from '../components/LogoutButton'
import Icons from '../constants/Icons'

const EmployeeDashboardScreen = ({ navigation }: any) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{
        width: '90%',
      }}>
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 60,
        }}>
          <Image source={Icons.logo} style={{
            width: 120,
            height: 120,
          }}
            resizeMode='contain'
          />
        </View>
      </View>
      <View style={{
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SecurityBookAppointmentScreen')}>
          <Text style={styles.buttonText}>Book an Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmployeeListScreen')}>
          <Text style={styles.buttonText}>Visitor List</Text>
        </TouchableOpacity>
        <LogoutButton />
      </View>
    </View>


  )
}

export default EmployeeDashboardScreen

const styles = StyleSheet.create({
  containerdash: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  logo: {
    width: 150, // Set the desired width of the logo
    height: 150, // Set the desired height of the logo
    resizeMode: "contain", // Adjust the image's size while preserving aspect ratio
    marginBottom: 20, // Add some margin to separate the logo from the headline
  },
  button: {
    backgroundColor: '#08A5EF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
})