import { ToastAndroid } from "react-native";

export const showToast = (str:any) => {
    //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    ToastAndroid.show(
        str,
        
        ToastAndroid.TOP,
      );
  };