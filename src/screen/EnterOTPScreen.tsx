import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icons from '../constants/Icons';
import OTPComponent from '../components/OTPComponent';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';

const EnterOTPScreen = ({ navigation, route}: any) => {
  console.log("route.params.org",route.params)
  const {data}= route.params;
  console.log('datainotpScren',route);
  const authState = useAppSelector(selectAuthenticated);
 


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
        <OTPComponent navigation={navigation} otp={data} formdata={route.params} orgName={route.params.org}/>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

});

export default EnterOTPScreen;