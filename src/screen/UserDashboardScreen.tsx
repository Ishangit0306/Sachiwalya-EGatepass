import { StyleSheet, Text, TouchableOpacity, View, Image, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import Icons from '../constants/Icons'
import QRCodeScanner from './securityDashboard/QRCodeScanner'
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { authLogin } from '../stores/authentication/userAuthenticate';
import { fetchUser, scannedUserDocumentApi, verifyOtpApi } from '../utils/api';
import { resendOtp, sendOtp } from '../stores/otp';
import { resetUser, storeuser } from '../stores/userdata/slice';
import { getUserInfo } from '../stores/userdata/selectors';
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import Loader from './../components/Loader';

const UserDashboardScreen = ({ navigation, route }: any) => {

console.log("routeindashboard",route);
    const ID_OPTIONS = [
        { label: "Aadhar", value: 1 },
        { label: "Voter's ID", value: 2 },
        { label: "Driving License", value: 3 },
        { label: "None", value: 4 }

    ];

    const [dropid, setDropid] = useState<any>(1);
    const { params } = route;
    console.log('paramsinuserscreen', route);
    const [isShowUploadButton, setShowUploadButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let userData: any = []
    const dispatch = useAppDispatch();
    useEffect(()=>{
if(route.key )
{
    setIsLoading(false)
    setShowUploadButton(false)
}
    },[route])

    useEffect(() => {

        if (dropid == 4) {
            navigation.navigate('UserRegistration', { mobile: params.data.mobile, authdata: { name: "", visitorId: "", doctype: dropid, upload_image_id: "", id_pic: "" } });
        }


    }, [dropid])



    useEffect(() => {
        if (params?.formData) {
            console.log("paramscheck",params.data.mobile)
            let form = new FormData();
            form.append("typeOfId", dropid);
            form.append("file", params.formData);
            setIsLoading(true);
            scannedUserDocumentApi(form).then((data) => {
                setIsLoading(false);
                navigation.navigate('UserRegistration', { mobile: params.data.mobile, authdata: { name: data.data.name, visitorId: data.data.idNo, doctype: dropid, upload_image_id: data.data.id, id_pic: data.data.id_pic } });
            });
        }


    }, [params.formData])



    const existingUser = async (data: any) => {
        dispatch(resetUser());
        const existinguser: any = (await fetchUser(data)).data;
        userData.push(existinguser);
        dispatch(storeuser(existinguser));
        // if(existinguser.uid!=undefined)
        // {

        //     navigation.navigate('UserRegistration', { mobile, authdata:userData[0] });
        // }
        if (existinguser.uid != undefined) {
            return true
        }
        else {
            return false
        }


    }

    const handleUploadID = () => {
      
        navigation.navigate('UserUploadProfile', { mobile: params.data.mobile,isUserID:true,otp:params.otp})
    };
    const handleBooking = async () => {

        setShowUploadButton(true)
        const activeuser = await existingUser(params.data);
        if (activeuser) {
            setIsLoading(true);
            navigation.navigate('UserRegistration', { mobile: params.data.mobile, authdata: userData[0] });
        }

    }
    const showQR=async (mob:any)=>{
            Linking.openURL(`https://iammaven.com/oldvisitor/qrcode/${mob}`);
 
            try {
                const response = await Linking.openURL(`https://iammaven.com/oldvisitor/qrcode/${mob}`);
        
                // Check if the request was successful (status code 2xx)
                if (response && response.ok) {
                    // Request was successful, do nothing
                } else {
                    // Request failed, show an alert
                    Alert.alert("Your request is under process.");
            } 
        }
        catch (error) {
                // An error occurred, show an alert
                Alert.alert("Your request is under process.");
            }
        
    }
    return (
        isLoading?(<>
            <Loader></Loader>
            </>):
       ( <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                width: '90%',
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 60,
                }}>
                    <Image source={Icons.logo} style={{
                        width: 120,
                        height: 120,
                    }}
                        resizeMode='contain'
                    />
                </View>
            </View>
          {!isShowUploadButton?(  <View style={{
                width: '90%',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
         <TouchableOpacity style={styles.button} onPress={() => handleBooking()}>
          <Text style={styles.buttonText}>Go For Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmployeeListScreen',{mobile:params.data.mobile})}>
          <Text style={styles.buttonText}>Check Your Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>showQR( params.data.mobile)}>
          <Text style={styles.buttonText}>Get your QR</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('UserRegister')}
            style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
            </View>):
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
              value={dropid}
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
          <TouchableOpacity
      onPress={() => {
          handleUploadID();
      }}
      style={styles.resendOTPButton}
  >
      <Text style={styles.loginButtonText}>
         Upload Your Id Proof
      </Text>
  </TouchableOpacity> 
      </View>
      )}
        </View>)


    )
}

export default UserDashboardScreen

const styles = StyleSheet.create({
    containerdash: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    logo: {
        width: 150, // Set the desired width of the logo
        height: 150, // Set the desired height of the logo
        resizeMode: "contain", // Adjust the image's size while preserving aspect ratio
        marginBottom: 20, // Add some margin to separate the logo from the headline
    },
    button: {
        backgroundColor: '#08A5EF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 100,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
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
})