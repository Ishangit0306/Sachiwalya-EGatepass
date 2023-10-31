import { ToastAndroid } from "react-native";

export const showToast = () => {
    //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    ToastAndroid.show(
        'OTP Sent Succesfully',
        
        ToastAndroid.TOP,
      );
  };