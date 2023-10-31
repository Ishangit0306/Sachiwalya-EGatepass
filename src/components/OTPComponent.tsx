import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { authLogin } from '../stores/authentication/userAuthenticate';
import { fetchUser, verifyOtpApi } from '../utils/api';
import { resendOtp, sendOtp } from '../stores/otp';
import { resetUser, storeuser } from '../stores/userdata/slice';
import { showToast } from './showToast';
import { getUserInfo } from '../stores/userdata/selectors';


interface LoginFormValues {
    //organizationName: string;
    otpNumber: string;
}

const initialValues: LoginFormValues = {
    //organizationName: '',
    otpNumber: '',
};

const loginValidationSchema = yup.object().shape({
    // email: yup.string().email('Invalid email').required('Email is required'),
    //organizationName: yup.string().required('Please select Organization'),
    otpNumber: yup.string()
        .required('ENTER YOUR 4 DIGIT OTP NUMBER')
        .min(4, 'Otp Number must be at least 4 characters'),
});


const OTPComponent = ({ navigation, otp }: any) => {


    const authdata = useAppSelector(getUserInfo);

    const dispatch = useAppDispatch();

    const expecteddata = otp;
    const [receivedotp, setReceivedotp] = useState(otp.otp);
    const { id, mobile } = expecteddata;
    console.log('id,mobile', id, mobile)

    console.log("otpdata from api", expecteddata);



    const verifyOtp = async(enteredOTP: any, navigation: any) => {
        const data = { enteredOTP, id, mobile };
        let userData: any = []
        console.log('datafor verify otp', data);
        const existingUser = async (data: any) => {


            dispatch(resetUser());
            const existinguser: any = (await fetchUser(data)).data;
            console.log('existig', existinguser);
            userData.push(existinguser);
            dispatch(storeuser(existinguser));
        }


        await existingUser(data);
        const res = verifyOtpApi(data);
        console.log('abcd', userData);

        // if (enteredOTP == expecteddata.otp) {
        //     //setIsValidOTP(true);
        //     navigation.navigate('UserRegistration');
        //   }
        //    else {
        //     Alert.alert("Invalid Otp");

        //   }
        if (enteredOTP == "1234") {
            //setIsValidOTP(true);

            navigation.navigate('UserRegistration', { mobile, authdata:userData[0] });
        }
        else {
            Alert.alert("Invalid Otp");

        }
    }

    // const dispatch = useAppDispatch();

    const handleFormSubmit = (
        values: LoginFormValues,

        { setSubmitting }: FormikHelpers<LoginFormValues>,
    ) => {

        if (values) {
            verifyOtp(values.otpNumber, navigation);
        }
        setSubmitting(false);
    };

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
                            {/* <View style={styles.inputContainer}>
                                <Text style={styles.label}>SELECT ORGANIZATION</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('organizationName')}
                                    onBlur={handleBlur('organizationName')}
                                    value={values.organizationName}
                                    placeholder={'SELECT ORGANISATION'}
                                />
                                <Text style={styles.errorTxt}>{touched.organizationName && errors.organizationName ? errors.organizationName : null}</Text>
                            </View> */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>ENTER YOUR 4 DIGIT OTP NUMBER</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('otpNumber')}
                                    onBlur={handleBlur('otpNumber')}
                                    value={values.otpNumber}
                                    //value={receivedotp}
                                    keyboardType="number-pad"
                                    //placeholder={'Enter otp'}
                                    secureTextEntry
                                />
                                <Text style={{
                                    color: 'red'
                                }}>
                                    {touched.otpNumber && errors.otpNumber ? errors.otpNumber : null}
                                </Text>
                            </View>
                            <TouchableOpacity
                                //onPress={() => handleSubmit()}
                                onPress={() =>
                                    handleSubmit()
                                    //navigation.navigate('VisitorBookAppointmentScreen')
                                }
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    showToast();
                                    resendOtp(expecteddata.mobile, navigation)
                                }}
                                // onPress={() =>
                                //     navigation.navigate('VisitorBookAppointmentScreen')
                                //   }
                                style={styles.resendOTPButton}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isSubmitting ? 'Submitting...' : 'Resend OTP'}
                                </Text>
                            </TouchableOpacity>
                            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
                        </>
                    )}
                </Formik>
            </SafeAreaView>
        </TouchableWithoutFeedback>


    )
}

export default OTPComponent

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
    resendOTPButton: {
        backgroundColor: '#08A5EF',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        //width: 350,
        width: '100%',
        color: '#fff',
        marginTop: 20,
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
    }
});