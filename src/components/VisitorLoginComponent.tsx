import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, ToastAndroid, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { authLogin } from '../stores/authentication/userAuthenticate';
import { showToast } from './showToast';
import { fetchOtpApi, fetchUser } from '../utils/api';
import { sendOtp } from '../stores/otp';
import { resetUser, storeuser } from '../stores/userdata/slice';
import { getUserInfo } from '../stores/userdata/selectors';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
interface LoginFormValues {
    //organizationName: string;
    mobileNumber: string;
}

const initialValues: LoginFormValues = {
    //organizationName: '',
    mobileNumber: '',
};

const loginValidationSchema = yup.object().shape({
    // email: yup.string().email('Invalid email').required('Email is required'),
    // organizationName: yup.string().required('Please select Organization'),
    mobileNumber: yup.string()
        .required('Please Enter Mobile Number').min(10, 'Mobile Number must be atleast 10 characters')
        .matches(/^[0-9]+$/, 'Mobile Number must contain only numbers')
        .max(10, 'Mobile Number must be at most 10 characters')
});

const Gender = [
    { label: "UK-Secretariat", value: "Secreteriat" },
    { label: "Police Headquaters", value: "POLICE HEAD QUARTER" },
  ]

const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
        // Display a message to the user that there is no internet connection
        Alert.alert('No Internet Connection', 'Please check your network settings.');
        return false;
    }
    return true;
};

const VisitorLoginComponent = ({ navigation ,org}: any) => {

    //const [org,setOrg]=useState(orgN)
    const [isSubmit, setIsSubmit] = useState(false);

    useFocusEffect(useCallback(() => {
        console.log("Stateee", isSubmit)

        setIsSubmit(false)
    }, []))


    const handleFormSubmit = async (

        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>,
    ) => {
        if (values) {
            if (!(await checkInternetConnection())) {
                return;
            }
            if(org==='')
            {
         Alert.alert("Please Choose Organisation")
            }
            else{
                setIsSubmit(!isSubmit)
            sendOtp(values.mobileNumber, navigation,org);
            }
      
            //existingUser(values.mobileNumber)
        }

    };
    //console.log("issubmitting", isSubmit)
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{
                width: '100%',
            }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleFormSubmit}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                    }) => (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>ENTER YOUR MOBILE NUMBER</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('mobileNumber')}
                                    onBlur={handleBlur('mobileNumber')}
                                    value={values.mobileNumber}
                                    keyboardType="number-pad"
                                //placeholder={'Enter password'}
                                //secureTextEntry
                                />
                                <Text style={{
                                    color: 'red'
                                }}>
                                    {touched.mobileNumber && errors.mobileNumber ? errors.mobileNumber : null}
                                </Text>
                            </View>
                            <TouchableOpacity

                                onPress={() => {
                                    handleSubmit()
                                    //sendOtp({ data: values.mobileNumber, navigation })
                                }
                                }
                                style={[styles.loginButton, isSubmit && styles.disabledButton]}
                                disabled={isSubmit}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isSubmit ? 'Submitting...' : 'Submit'}
                                </Text>
                            </TouchableOpacity>

                        </>
                    )}
                </Formik>
            </SafeAreaView>
        </TouchableWithoutFeedback>


    )
}

export default VisitorLoginComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
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
    label: {
        fontSize: 16,
        lineHeight: 16,
        marginBottom: 5,
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