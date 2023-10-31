import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  getDocumentScannedPhoto,
  getVisitorScannedPhoto,
} from "../stores/appointment/selectors";
import CameraComponent from "../components/CameraComponent";
import {
  resetPhotoState,
  visitorPhotoStore,
} from "../stores/appointment/slice";
import { storeVisitors } from "../stores/visitors/slice";
import { getVisitorsList } from "../stores/visitors/selectors";
import { selectAuthenticated } from "../stores/authentication/selectors";
import { generateUserID } from "../utils/custom";
import { bookAppointmentFormApi } from "../utils/api";
import { smsStatus } from "../stores/authentication/slice";
import { sendSMSToVisitor } from "../utils/sms";
import { API_BASE_URL, ROLE_TYPE_EMPLOYEE, ROLE_TYPE_PASSOFFICE, ROLE_TYPE_SECURITY } from "../utils/config";

const VisitorPhotoScreen = ({ navigation, route }: any) => {
  const { params } = route;
  const { role, user, token } = useAppSelector(selectAuthenticated);
  const documentImgData = useAppSelector(getDocumentScannedPhoto);
  const visitorImgData = useAppSelector(getVisitorScannedPhoto);
  const visitorData = useAppSelector(getVisitorsList);
  const [disabledUploadButton, setDisabledUploadButton] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [isVisitorPhotoTaken, setIsVisitorPhotoTaken] =
    useState<boolean>(false);

  // console.log('doc img data>>>>>>>', visitorImgData?.uri, 'doc data***********', documentImgData?.uri)

  const visitorPhotoTaken = ({ photo }: any) => {
    console.log("visitor photo taken", params);
    if (photo) {
      let fileName = photo.uri.replace(/^.*[\\\/]/, "");
      let name = `profile_pic_${fileName}`;
      const mydata = {
        uri: photo.uri,
        filename: name,
        height: photo.height,
        width: photo.width,
      };

      dispatch(visitorPhotoStore({ visitorPhoto: mydata }));
      setIsVisitorPhotoTaken(true);
    }
  };

  useEffect(() => {
    console.log("my all form data>>>>>>>>>>>>>>>>>>>", params);
    console.log(
      "my visitior lists are***************************",
      visitorData
    );
  }, [isVisitorPhotoTaken, visitorImgData]);

  if (!isVisitorPhotoTaken) {
    return <CameraComponent sendPhotoToNextScreen={visitorPhotoTaken} />;
  }

  const renderImages = () => {
    console.log("document image data", documentImgData);
    console.log("visitor image data", visitorImgData);

    return (
      <>
        {documentImgData && visitorImgData ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.visitorText}>Visitor ID</Text>
              </View>
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    alignSelf: "stretch",
                  }}
                  resizeMode="contain"
                  //source={{ uri: "data:image/jpg;base64," + documentImgData?.base64 }}
                  source={{ uri: documentImgData?.uri }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.visitorText}>Visitor Image</Text>
              </View>
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    alignSelf: "stretch",
                  }}
                  resizeMode="contain"
                  source={{ uri: visitorImgData?.uri }}
                />
                {/* Upload */}
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: "90%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.visitorText}>Visitor Photo</Text>
            </View>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "stretch",
                }}
                resizeMode="contain"
                source={{ uri: visitorImgData?.uri }}
              />
            </View>
          </View>
        )}
      </>
    );
  };

  function sendAppointmentSMS(role: any, formSubmission: any) {
    console.log('Message*********************object data', formSubmission)
    const name = formSubmission.data.name;
    const time = formSubmission.data.time;
    const date = formSubmission.data.date;
    const empId = formSubmission.data.empId;
    const dept = formSubmission.data.dept;
    const phNo = formSubmission.data.phNo;
    const idNo = formSubmission.data.id;
  
    let msg: any;
    const empName = 'Evon Tech'

    if (role === ROLE_TYPE_SECURITY || role===ROLE_TYPE_PASSOFFICE) {
      msg = `Namaste ${name}! Your request for an appointment  with ${empName}, ${dept}, Uttarakhand government, is being processed!`;
    } else {
      msg = `Namaste ${name}! Congratulations, your request for an appointment  with ${empName}, ${dept}, Uttarakhand government, has been approved! On arrival, please click on the link below and show the QR code to the Security: ${API_BASE_URL}/oldvisitor/qrcode/${phNo}`;
    }

    //msg = `Namaste ${name}! Your request for an appointment at ${time} hrs on ${date} with ${empName}, ${dept}, Uttarakhand government, is being processed!`;
  
    sendSMSToVisitor(phNo, msg);
  }
  
  const uploadAllAppointmentFormData = async () => {
    let imageUploadArr = [];

    if (documentImgData) {
      console.log("*********************doc img", documentImgData.uri);
      imageUploadArr.push(documentImgData);
    }
    if (visitorImgData) {
      console.log("*********************visit img", visitorImgData.uri);
      imageUploadArr.push(visitorImgData);
    }

    let visitorStatus = "";
    if (role === ROLE_TYPE_SECURITY || role==ROLE_TYPE_PASSOFFICE) {
      visitorStatus = "pending";
    } else if(role===ROLE_TYPE_EMPLOYEE) {
      visitorStatus = "accepted";
    }
    else
    {}

    let fullName = "";
    let documentNumber = "";

    if (params?.firstName && params?.lastName) {
      fullName = `${params?.firstName} ${params?.lastName}`;
    }

    if (params?.address) {
      documentNumber = `${params?.address}`;
    }

    let roleId;
    if (role === ROLE_TYPE_SECURITY ||role==ROLE_TYPE_PASSOFFICE) {
      roleId = 1;
    } else {
      roleId = 2;
    }

    let formStoreData = {
      name: fullName,
      purpose: params?.visitPurpose,
      typeOfId: params?.documentType,
      idNo: params?.idNo,
      // date: "2023-07-28", // params?.date,
      // time: "12:30", // params?.time,
      date: params?.date,
      time: params?.time,
      phNo: params?.contactNumber,
      user_id: user?.id,
      role: roleId,
      dept: params?.dept,
      email: params?.email,
      uploade_image_id: params?.upload_image_id
    };


    //const ext = visitorImgData.uri.substring(visitorImgData.uri.lastIndexOf(".") + 1);
    // const fileName = visitorImgData.uri.replace(/^.*[\\\/]/, "");

    let formData = new FormData();
    formData.append("idNo", formStoreData.idNo);
    formData.append("purpose", formStoreData.purpose);
    formData.append("role", formStoreData.role);
    formData.append("date", formStoreData.date);
    formData.append("time", formStoreData.time);
    formData.append("typeOfId", formStoreData.typeOfId);
    formData.append("userId", formStoreData.user_id);
    formData.append("dept", formStoreData.dept);
    formData.append("email", formStoreData.email);
    formData.append("phNo", formStoreData.phNo);
    formData.append("name", formStoreData.name);
    formData.append("upload_image_id", formStoreData.uploade_image_id);

    console.log('my form data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#########################', formStoreData);

    const ext = visitorImgData.uri.substring(visitorImgData.uri.lastIndexOf(".") + 1);

    formData.append("file", {
      uri: visitorImgData.uri,
      type: `image/${ext}`,
      name: visitorImgData.filename,
    });

    let test = [];
    // for (const imageData of imageUploadArr) {
    //   const ext = imageData.uri.substring(imageData.uri.lastIndexOf(".") + 1);
    //   // const fileName = imageData.uri.replace(/^.*[\\\/]/, "");
    //   const fileName = imageData.filename;

    //   test.push(fileName);
    //   console.log("in imageData");
    //   formData.append("files", {
    //     uri: imageData.uri,
    //     type: `image/${ext}`,
    //     name: fileName,
    //   });
    // }



    if (token) {
      setDisabledUploadButton(true);

       console.log('form data are', formStoreData, formData)
      const formSubmission = await bookAppointmentFormApi(formData, token);
      console.log(formSubmission, "my data are>>>>>>>>>>>>>>>>>>>");
      if (formSubmission.statusCode === 201) {
        setDisabledUploadButton(false);
        // dispatch(smsStatus({
        //   status: true,
        //   number: formSubmission.data.phNo
        // }));
        // sendSMSToVisitor(formSubmission.data.phNo, formSubmission.data.id);

        sendAppointmentSMS(role, formSubmission)
        // if (role === "security") {
        //   const msg: any = `Namaste ${formSubmission.data.name}! 
        //   Your request for an appointment at ${formSubmission.data.time} hrs on ${formSubmission.data.date} with ${formSubmission.data.empId}, 
        //   ${formSubmission.data.dept}, Uttarakhand government, is being processed! `;
        //   sendSMSToVisitor(formSubmission.data.phNo, msg);
        // }
        // else {
        //   const msg: any = `Namaste ${formSubmission.data.name}! 
        //                     Congratulations, your request for an appointment at ${formSubmission.data.time} hrs on ${formSubmission.data.date} with ${formSubmission.data.empId}, 
        //                     ${formSubmission.data.dept}, Uttarakhand government,has been approved!  
        //                     On arrival, please click on the link below and show the QR code to the Security: https://iammaven.com/users/qrcode/${formSubmission.data.idNo}`;
        //   sendSMSToVisitor(formSubmission.data.phNo, msg);
        // }

        if (role === ROLE_TYPE_SECURITY) {
          navigation.navigate("SecurityDashboard");
        }
        else if(role === ROLE_TYPE_PASSOFFICE){
          navigation.navigate("PassOfficeDashboard");
        }
        else {
          navigation.navigate("EmployeeDashboard");
        }
      } else {
        Alert.alert("ERROR: " + JSON.stringify(formSubmission.message));
        dispatch(resetPhotoState());
        navigation.navigate("SecurityBookAppointmentScreen", params);

      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80%",
        }}
      >
        {renderImages()}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "20%",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "55%",
            height: "45%",
            borderRadius: 18,
            backgroundColor: "blue",
            opacity: disabledUploadButton ? 0.5 : 1,
          }}
          disabled={disabledUploadButton}
          onPress={uploadAllAppointmentFormData}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            Submit Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisitorPhotoScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#08A5EF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 60,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  visitorText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },
});
