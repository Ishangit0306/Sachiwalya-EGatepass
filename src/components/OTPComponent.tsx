import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { authLogin } from '../stores/authentication/userAuthenticate';
import { fetchUser, scannedUserDocumentApi, verifyOtpApi } from '../utils/api';
import { resendOtp, sendOtp } from '../stores/otp';
import { resetUser, storeuser } from '../stores/userdata/slice';
import { showToast } from './showToast';
import { getUserInfo } from '../stores/userdata/selectors';
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';

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

const ID_OPTIONS = [
    { label: "Aadhar", value: 1 },
    { label: "Voter's ID", value: 2 },
    { label: "Driving License", value: 3 },
    { label: "None", value: 4 }
  
  ];


const OTPComponent = ({ navigation, otp ,formdata}: any) => {


    if(formdata?.formData)
    {
            let form = new FormData();
            form.append("typeOfId", 3);
            form.append("file",formdata.formData);
            console.log('formData is',form)
             scannedUserDocumentApi(form).then((data)=>{
                navigation.navigate('UserRegistration', { mobile, authdata:{name:data.data.name,visitorId:data.data.idNo} });
            });    
    }
    console.log('formdatainotp',formdata.formData);

  
const[dbuser,setDbuser]=useState(false);
    

    const [dropid, setDropid] = useState<any>(1);
    const [isShowUploadButton, setShowUploadButton] = useState(false);
    //useEffect(()=>{},[isShowUploadButton]);
    const authdata = useAppSelector(getUserInfo);

    const dispatch = useAppDispatch();

    const expecteddata = otp;
    const [receivedotp, setReceivedotp] = useState(otp.otp);
    const { id, mobile } = expecteddata;
    console.log('id,mobile', id, mobile)

  

    console.log("otpdata from api", expecteddata);
    const verifyOtp = async (enteredOTP: any, navigation: any) => {
        const data = { enteredOTP, id, mobile };
        let userData: any = []
     
        const existingUser = async (data: any) => {


            dispatch(resetUser());
            const existinguser: any = (await fetchUser(data)).data;
            
            userData.push(existinguser);
            dispatch(storeuser(existinguser));
            if(existinguser.uid!=undefined && enteredOTP == "1234")
            {
               
                navigation.navigate('UserRegistration', { mobile, authdata:userData[0] });
                //setShowUploadButton(!isShowUploadButton)
             //setDbuser(true);
             //console.log("in dbuser",dbuser);
           
            }
            
                
                if(formdata?.formData)
                {
                        let form = new FormData();
                        form.append("typeOfId", 3);
                        form.append("file",formdata.formData);
                         scannedUserDocumentApi(form).then((data)=>{
                            navigation.navigate('UserRegistration', { mobile, authdata:{name:data.data.name,visitorId:data.data.idNo} });
                        });    
                }
           
        }

        await existingUser(data);
        const res = verifyOtpApi(data);

        // if (enteredOTP == expecteddata.otp) {
        //     //setIsValidOTP(true);
        //     navigation.navigate('UserRegistration');
        //   }
        //    else {
        //     Alert.alert("Invalid Otp");

        //   }
        if (enteredOTP == "1234") {

            //setIsValidOTP(true);
            //setShowUploadButton(!isShowUploadButton);
           console.log('dbinif',dbuser);
            if(dbuser)
            {

               // navigation.navigate('UserRegistration', { mobile, authdata:userData[0] });
            }
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
      console.log('ishsho',isShowUploadButton);
        if (values) {
            setShowUploadButton(true);
            // if(!isShowUploadButton){

            //     
            // }
            // else{
            //     console.log("else is working")
            // }
            verifyOtp(values.otpNumber, navigation);
        }
        setSubmitting(false);
    };
    const handleUploadID = () => {
        // Add logic to handle ID upload
        console.log('hi i m working')
        navigation.navigate('UserUploadProfile', { mobile,isUserID:true,otp})
    };
useEffect(()=>{},[isShowUploadButton]);
    console.log('isbutton',isShowUploadButton);
    console.log('dbuserexist',dbuser);
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
                            {!isShowUploadButton ? (<View style={styles.inputContainer}>
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
                            </View>) : 
                                 ( <View 
                                  style={styles.inputContainer}
                                >
                            <Text style={styles.label}>Select Your Id</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={ID_OPTIONS}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select an ID"
                                value={id}
                                onChange={(item) => {
                                    setDropid(item.value);
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
                            <Text style={styles.errorTxt}>{``}</Text>
                        </View>)
                            }
                    {!isShowUploadButton  && <TouchableOpacity
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
                    </TouchableOpacity>}

                    {isShowUploadButton ? (<TouchableOpacity
                        onPress={() => {
                            showToast();
                            handleUploadID();
                        }}
                        // onPress={() =>
                        //     navigation.navigate('VisitorBookAppointmentScreen')
                        //   }
                        style={styles.resendOTPButton}
                    >
                        <Text style={styles.loginButtonText}>
                            {isSubmitting ? 'UPloading...' : 'Upload Your Id Proof'}
                        </Text>
                    </TouchableOpacity>) : <TouchableOpacity
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
                    </TouchableOpacity>}



                    {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
                </>
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