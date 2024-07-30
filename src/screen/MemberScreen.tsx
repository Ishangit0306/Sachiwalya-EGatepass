import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Icons from '../constants/Icons';
import VisitorLoginComponent from '../components/VisitorLoginComponent';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
const MemberScreen = ({ navigation }: any) => {
  const Gender = [
    { label: "UK-Secretariat", value: "Secreteriat" },
    { label: "Police Headquaters", value: "POLICE HEAD QUARTER" },
  ]

  const authState = useAppSelector(selectAuthenticated);
  const [org, setOrg] = useState('')
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
            }}>Apply for e-Gate Pass</Headline>
          </View>

        </View>
        <View style={{
          width: '90%',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          {/* Login compoenent */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}> SELECT ORGANISATION</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={Gender}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Organisation"}
              value={org}
              onChange={(item) => {
                setOrg(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            {/* <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('organizationName')}
                                    onBlur={handleBlur('organizationName')}
                                    //value={values.organizationName}
                                    value='UK-Secretariat'
                                    placeholder={'SELECT ORGANISATION'}
                                    editable={false}
                                /> */}
            {/* <Text style={styles.errorTxt}>{touched.organizationName && errors.organizationName ? errors.organizationName : null}</Text> */}
          </View>
          <VisitorLoginComponent navigation={navigation} org={org} />
          <View>
            <TouchableOpacity
                           onPress={() => {
                            if (org==='') {
                              Alert.alert("Please Choose Organisation")
                            } else {
                             navigation.navigate('Login',{org})
                            }
                          }}>
              <Text style={styles.label}>Login</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#ffffff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#08A5EF',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    //width: 350,
    width: '100%',
    color: '#fff',
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    marginTop: 5,
    color: '#fff'

  },
  errorTxt: {
    color: 'red',
    position: 'absolute',
    bottom: 0
  },
  disabledButton: {
    backgroundColor: 'gray', // Change the color for disabled state
    opacity: 0.7, // You can adjust the opacity to visually indicate the disabled state
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    borderWidth: 0,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#999999',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#ffffff',
    fontSize: 18,
    color: '#000',
  },
});

export default MemberScreen;