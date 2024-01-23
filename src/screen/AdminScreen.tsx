import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icons from '../constants/Icons';
import LoginComponent from '../components/LoginComponent';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';

const AdminScreen = ({ navigation ,route}: any) => {
  console.log("inadmin",route)
  const authState = useAppSelector(selectAuthenticated);

  console.log('user current state data are>>>>>>>>>>', authState)
  return (
    <KeyboardAvoidingView
    behavior={ "padding" }
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
          }}>e-Gate Pass</Headline>
        </View>

      </View>
      <View style={{
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        {/* Login compoenent */}
        <LoginComponent navigation={navigation} route={route.params.org} />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

});

export default AdminScreen;