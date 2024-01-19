import { Alert } from "react-native";
import { fetchOtpApi, fetchUser, verifyOtpApi } from "../utils/api";
//import { showToast } from "../components/showToast";
import { resetUser, storeuser } from "./userdata/slice";
import { useAppDispatch } from "./hooks";
import { showToast } from "../components/showToast";

 export const sendOtp = async (data: any, navigation: any)=> {
        try {
            if (data) {
                const res = await fetchOtpApi(data);
    
                console.log('response data are>>>>>>>>>>>', res);
                
                if (res.statusCode === 404) {
                    Alert.alert(res.message);
                    //Toast.show('Error! login error', { duration: Toast.durations.LONG });
                }
               // Alert.alert(`${JSON.stringify(res)}`);
    
                if (res.statusCode === 200 || res.statusCode === 201) {
                   // console.log('response data are>>>>>>>>>>>', res.otp);
                    //const otpData= res.otp;
                    showToast('Otp Sent Succesfully');
                    navigation.navigate('EnterOTPScreen',{data:res.data});
                    // console.log('login dispatch data', loginData)
                    //dispatch(loginSuccess(loginData));
                    //return;
                }
                // else{
                //     Alert.alert(`Login Network Error ****8${JSON.stringify(res)}`);
                // }
            }
        } catch (err:any) {
            console.error('Error: while authentication', JSON.stringify(err));
            console.error('Error: while authentication', JSON.stringify(err.message));
        }
    };

    export const verifyOtp = async (data: any, navigation: any)=> {
        try {
            if (data) {
                const res = await verifyOtpApi(data);
    
                console.log('data from verify otp', res);
                
                if (res.statusCode === 404) {
                    Alert.alert(res.message);
                    //Toast.show('Error! login error', { duration: Toast.durations.LONG });
                }
               // Alert.alert(`${JSON.stringify(res)}`);
    
                if (res.statusCode === 200 || res.statusCode === 201) {
                    //console.log('response data are>>>>>>>>>>>', res.otp);
                    //const otpData= res.otp;
                    
                    navigation.navigate('VisitorBookAppointmentScreen');
                    
                }
                // else{
                //     Alert.alert(`Login Network Error ****8${JSON.stringify(res)}`);
                // }
            }
        } catch (err:any) {
            console.error('Error: while authentication', JSON.stringify(err));
            console.error('Error: while authentication', JSON.stringify(err.message));
        }
    };
    export const resendOtp = async (data: any, navigation: any)=> {
        try {
            if (data) {
                const res = await fetchOtpApi(data);
    
                console.log('response data are>>>>>>>>>>>', res);
                
                if (res.statusCode === 404) {
                    Alert.alert(res.message);
                    //Toast.show('Error! login error', { duration: Toast.durations.LONG });
                }
               // Alert.alert(`${JSON.stringify(res)}`);
    
                if (res.statusCode === 200 || res.statusCode === 201) {
                   // console.log('response data are>>>>>>>>>>>', res.otp);
                    //const otpData= res.otp;
                    showToast('Otp Sent Succesfully');
                    navigation.navigate('EnterOTPScreen',{data:res.data});
                    console.log('resendotp api',res);
                    //navigation.navigate('EnterOTPScreen',{data:res.data});
                    // console.log('login dispatch data', loginData)
                    //dispatch(loginSuccess(loginData));
                    //return;
                }
                // else{
                //     Alert.alert(`Login Network Error ****8${JSON.stringify(res)}`);
                // }
            }
        } catch (err:any) {
            console.error('Error: while authentication', JSON.stringify(err));
            console.error('Error: while authentication', JSON.stringify(err.message));
        }
    };

  
