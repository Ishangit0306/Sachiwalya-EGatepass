import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../stores/hooks';
import { authLogin } from '../stores/authentication/userAuthenticate';
import * as Notifications from 'expo-notifications';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
interface LoginFormValues {
    email: string;
    password: string;
}

const initialValues: LoginFormValues = {
    email: '',
    password: '',
};

const loginValidationSchema = yup.object().shape({
    // email: yup.string().email('Invalid email').required('Email is required'),
    email: yup.string().required('Username is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});
// let deviceToken:any
//  Notifications.getExpoPushTokenAsync({
//     projectId: Constants.expoConfig.extra.eas.projectId,
//   }).then((data)=>{ 
//     deviceToken = data.data
// })
let deviceToken: any
if (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.eas) {
    Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
    }).then((data) => {
        deviceToken = data.data;
    });
} else {
    console.error("Some properties in Constants.expoConfig are undefined");
}
const LoginComponent = ({ navigation,route }: any) => {
    console.log("in login",route)
    const [isSubmit, setIsSubmit] = useState(false);
    const checkInternetConnection = async () => {
        const netInfoState = await NetInfo.fetch();
        if (!netInfoState.isConnected) {
            // Display a message to the user that there is no internet connection
            Alert.alert('No Internet Connection', 'Please check your network settings.');
            return false;
        }
        return true;
    };
    const dispatch = useAppDispatch();

    const handleFormSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>,
    ) => {
        if (values) {
            if (!(await checkInternetConnection())) {
                return;
            }
            //   /setIsSubmit(true)
            console.log("staet", isSubmit)
            const requestData = { ...values, deviceToken,orgName:route }
            dispatch(authLogin({ data: requestData, navigation }));
        }
        //setSubmitting(false);
    };
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEyeIconDisabled, setIsEyeIconDisabled] = useState(true);
    const enableEyeIcon = () => {
        setIsEyeIconDisabled(false);
      };
    
      const disableEyeIcon = () => {
        setIsEyeIconDisabled(true);
      };
    
      const togglePasswordVisibility = () => {
        if (!isEyeIconDisabled) {
          setIsPasswordVisible(!isPasswordVisible);
        }
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
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder={'Enter username'}
                                />
                                <Text style={styles.errorTxt}>{touched.email && errors.email ? errors.email : null}</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder={'Enter password'}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={{ color: 'red' }}>
                                    {touched.password && errors.password ? errors.password : null}
                                </Text>
                            </View>
                            {/* <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder={'Enter password'}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPressIn={enableEyeIcon}
                                    onPressOut={disableEyeIcon}
                                    onPress={togglePasswordVisibility}
                                    disabled={isEyeIconDisabled}
                                >
                                    <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={{ color: 'red' }}>
                                    {touched.password && errors.password ? errors.password : null}
                                </Text>
                            </View> */}
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                style={[styles.loginButton, isSubmit && styles.disabledButton]}
                                disabled={isSubmit}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isSubmit ? 'Login...' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    )
}

export default LoginComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    disabledButton: {
        backgroundColor: 'gray', // Change the color for disabled state
        opacity: 0.7, // You can adjust the opacity to visually indicate the disabled state
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
        width: 320,
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
    }, eyeIcon: {
        position: 'absolute',
        top: 35, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
    },
});