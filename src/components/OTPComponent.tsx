import React, {useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { verifyOtpApi } from '../utils/api';
import { resendOtp} from '../stores/otp';
import { showToast } from './showToast';
import { getUserInfo } from '../stores/userdata/selectors';
import { userloginSuccess } from '../stores/authentication/slice';
interface LoginFormValues {
    otpNumber: string;
}

const initialValues: LoginFormValues = {
    otpNumber: '',
};

const loginValidationSchema = yup.object().shape({
    otpNumber: yup.string()
        .required('ENTER YOUR 6 DIGIT OTP NUMBER')
        .min(6, 'Otp Number must be at least 6 number'),
});

const OTPComponent = ({ navigation, otp ,formdata}: any) => {
    const authdata = useAppSelector(getUserInfo);

    const dispatch = useAppDispatch();

    const expecteddata = otp;
    const [receivedotp, setReceivedotp] = useState(otp.otp);
    const { id, mobile } = expecteddata;

  
    const verifyOtp = async (enteredOTP: any, navigation: any) => {
        const data = { enteredOTP, id, mobile };
        const res =await  verifyOtpApi(data);
         const{validate}=res;
        if(validate)
        {
            console.log('datainotp',data);
            dispatch(userloginSuccess({data:data.mobile}))
            navigation.navigate('UserDashboardScreen',{data:data,otp})
           
           
        }
        else{
            Alert.alert("Invalid Otp");
        }
    }
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
                       ( <>
                         <View style={styles.inputContainer}>
                                <Text style={styles.label}>ENTER YOUR 6 DIGIT OTP NUMBER</Text>
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
                       
                        onPress={() =>
                            handleSubmit()
                           
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
                        style={styles.resendOTPButton}
                    >
                        <Text style={styles.loginButtonText}>
                            {isSubmitting ? 'Submitting...' : 'Resend OTP'}
                        </Text>
                    </TouchableOpacity>
                </>
                )
                    
                    )}
            </Formik>
        </SafeAreaView>
        </TouchableWithoutFeedback >


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
    }
    ,
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#ffffff',
    fontSize: 18,
    color: '#000',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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