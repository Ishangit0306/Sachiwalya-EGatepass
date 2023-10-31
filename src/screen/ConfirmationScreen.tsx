import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icons from '../constants/Icons';
import VisitorLoginComponent from '../components/VisitorLoginComponent';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
import Confirmation from '../components/Confirmation';

const ConfirmationScreen = ({ navigation ,route }: any) => {
  const authState = useAppSelector(selectAuthenticated);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigation.navigate('UserRegister'); // Navigate to the second screen
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(redirectTimeout); // Clear the timeout if the component unmounts
  }, []);
  return (
    <KeyboardAvoidingView
    behavior={"padding"}
    style={{ flex: 1 }}
>
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
          marginBottom: 20,
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
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: 50,
        }}>
          <Headline style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: 5,
          }}>E-Gatepass</Headline>
        </View>

      </View>
      <View style={{
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        {/* Login compoenent */}
        <Confirmation navigation={navigation} route={route} />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

});

export default ConfirmationScreen;