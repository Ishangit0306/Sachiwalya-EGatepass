import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CameraComponent from '../components/CameraComponent'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { documentPhotoStore, visitorScannedDataStore } from '../stores/appointment/slice'
import { scannedDocumentApi } from '../utils/api'
import { selectAuthenticated } from '../stores/authentication/selectors'

const CaptureDocumentScreen = ({ navigation, route }: any) => {
  const { token }: any = useAppSelector(selectAuthenticated);
  const { params } = route;
  console.log("paramssssssssssssss", params)
  const dispatch = useAppDispatch();
  const [isButton, setIsButton] = useState<boolean>(false);

  const sendPhotoToNextScreen = async ({ photo }: any) => {
    setIsButton(true)
    let fileName = photo.uri.replace(/^.*[\\\/]/, "");
    let name = '';
    const { imgFor } = params

    if (imgFor === 'document') {
      name = `id_pic_${fileName}`;
    } else {
      name = `profile_pic_${fileName}`;
    }
    const mydata = {
      uri: photo.uri,
      filename: name,
      height: photo.height,
      width: photo.width,
    }

    if (photo) {
      let formData = new FormData();
      formData.append("typeOfId", 3);

      console.log("datataa", formData);
      const ext = mydata.uri.substring(mydata.uri.lastIndexOf(".") + 1);

      formData.append("file", {
        uri: mydata.uri,
        type: `image/${ext}`,
        name: mydata.filename,
      });
      let resultData: any;
      const formSubmission = await scannedDocumentApi(formData, token);
       setIsButton(true)
      if (formSubmission.statusCode === 201) {
        resultData = {
          data: formSubmission,
          formData: params,
          message: "Success",
          statusCode: formSubmission.statusCode,
          error: false
        }
        dispatch(visitorScannedDataStore({
          name: formSubmission.data.name,
          idNo: formSubmission.data.idNo,
          uploadedImgId: formSubmission.data.id
        }))
        dispatch(documentPhotoStore({ documentPhoto: mydata }))
        navigation.navigate("AppointmentFormScreen", params)
      } else {
        resultData = {
          data: formSubmission,
          formData: params,
          message: formSubmission.message,
          statusCode: formSubmission.statusCode,
          error: true
        }
        dispatch(visitorScannedDataStore({
          name: null,
          idNo: null,
          uploadedImgId: null
        }))
        navigation.navigate("DocumentScannedScreen", resultData)
      }

    }
  }

  return (
    <CameraComponent sendPhotoToNextScreen={sendPhotoToNextScreen} />
  )
}

export default CaptureDocumentScreen

const styles = StyleSheet.create({})