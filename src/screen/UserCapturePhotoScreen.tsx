import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { selectAuthenticated } from '../stores/authentication/selectors'
import UserCameraComponent from '../components/UserCameraComponent'

const UserCapturePhotoScreen = ({ navigation, route }: any) => {
  const{params}=route;
  console.log("authdatainscreenusercapture",route);
  const { token }: any = useAppSelector(selectAuthenticated);
  const dispatch = useAppDispatch();
  const [isButton, setIsButton] = useState<boolean>(false);

  const sendPhotoToNextScreen = async ({ photo }: any) => {
    setIsButton(true)
    let fileName = photo.uri.replace(/^.*[\\\/]/, "");
    const mydata = {
      uri: photo.uri,
      filename: fileName,
      height: photo.height,
      width: photo.width,
    }

    if (photo) {
       //let formData = new FormData();
      const ext = mydata.uri.substring(mydata.uri.lastIndexOf(".") + 1);
      // formData.append("file", {
      //   uri: mydata.uri,
      //   type: `image/${ext}`,
      //   name: mydata.filename,
      // });
    const  formData= {
        uri: mydata.uri,
        type: `image/${ext}`,
        name: mydata.filename,
      };
    

    
      console.log('image data',formData);
  
       navigation.navigate('UserRegistration',{formData,mobile:route.params.mobile,authdata:params.authdata});
   
      let resultData: any;
      //const formSubmission = await scannedDocumentApi(formData, token);
       setIsButton(true)

    }
  }

  return (
    <UserCameraComponent sendPhotoToNextScreen={sendPhotoToNextScreen} route={route} />
  )
}

export default UserCapturePhotoScreen

const styles = StyleSheet.create({})