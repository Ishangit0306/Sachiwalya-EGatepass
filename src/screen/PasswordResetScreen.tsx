// PasswordResetScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { passwordResetapi } from '../utils/api';
import { logoutSuccess } from '../stores/authentication/slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
import Icons from '../constants/Icons';

const PasswordResetScreen = () => {
  const dispatch=useDispatch()
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isPasswordValid = (password:any) => {
    // Validate that the password contains at least 6 characters and at least 1 number
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
  };
  const data = useAppSelector(selectAuthenticated);
 const { user } = data;
const eid = user?.eid;

  const handleResetPassword = async () => {


    if (!isPasswordValid(newPassword)) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters long and contain at least 1 number.'
      );
      return;
    }
    // Add your password reset logic here
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }
     else{

      const reqdata={oldPassword,newPassword}
     const res= await passwordResetapi(reqdata,eid)
     if(res.statusCode===200)
     {
      Alert.alert('Password reset successfully.', 'Please Login again');
      dispatch(logoutSuccess())
     }
     else{
      Alert.alert('Old Password did not matched');
     }
     }
  };

  return (
    <>
    <View style={{
      width: '100%',
      marginBottom: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image source={Icons.logo} style={{
        width: 120,
        height: 120,
      }}
        resizeMode='contain'
      />
    </View>
    <View style={styles.container}>
      <Text style={styles.label}>Enter Old Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={oldPassword}
        onChangeText={(text) => setOldPassword(text)}
      />

      <Text style={styles.label}>Enter New Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});

export default PasswordResetScreen;
