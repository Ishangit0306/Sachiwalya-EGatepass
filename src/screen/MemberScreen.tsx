import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icons from '../constants/Icons';
import VisitorLoginComponent from '../components/VisitorLoginComponent';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';

const MemberScreen = ({ navigation }: any) => {
  const authState = useAppSelector(selectAuthenticated);

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
          }}>Apply for e-Gate Pass</Headline>
        </View>

      </View>
      <View style={{
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        {/* Login compoenent */}
        <VisitorLoginComponent navigation={navigation} />
      <View>
       <TouchableOpacity
       onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.label}>Login?</Text>
       </TouchableOpacity>

      </View>
      </View>

    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingTop:20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db', 
}
});

export default MemberScreen;