import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import { Camera, CameraType } from "expo-camera";
  import Icon from "react-native-vector-icons/Ionicons";
  
  type CameraComponentType = {
    savePhotoToNextScreen: any
  }
  
  const UserCameraComponent = ({ sendPhotoToNextScreen,route }: any) => {
   
    const cameraRef = useRef<any>(null);
  
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const [photo, setPhoto] = useState<any>();
    const [isButton, setIsButton] = useState<boolean>(false);
  

    useEffect(()=>{
      if(!hasPermission)
      {
        runOpenCamera()
      }   
      },[hasPermission])

    useEffect(() => {
      (async () => {
        if (openCamera) {
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
          const { granted, status } = cameraPermission;
          //setHasPermission(true);
          if (granted) {
            setHasPermission(true);
          }
        } else {
          setHasPermission(false);
        }
      })();
    }, [openCamera]);
  
    function toggleCameraType() {
      setType((current) =>
        current === CameraType.back ? CameraType.front : CameraType.back
      );
    }
  
    const takePicture = async () => {
      if (cameraRef) {
        let options = {
          quality: 0.1,
          base64: true,
          exif: false,
        };
        const capturedPhoto: any = await cameraRef.current.takePictureAsync(
          options
        );
       
  
        setPhoto(capturedPhoto);
        setOpenCamera(false);
      }
    };
  
    const savePhoto = () => {
      if (cameraRef) {
        setIsButton(true)
        setTimeout(() => {
          setIsButton(false);
        }, 5000);
  
        sendPhotoToNextScreen({
          photo: photo
        })
      }
    };
  
    const runOpenCamera = async () => {
      setOpenCamera(!openCamera);
    };
  
    function closeCamera() {
      
      setOpenCamera(false);
    }
  
    if (photo) {
      return (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              width: "100%",
              height: "85%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  alignSelf: "stretch",
                }}
                resizeMode="contain"
                source={{ uri: "data:image/jpg;base64," + photo?.base64 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              height: "15%",
            }}
          >
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
            <Button title="Savephoto" onPress={savePhoto} disabled={isButton} />
          </View>
        </SafeAreaView>
      );
    }
  

    // if (openCamera) {
    //     runOpenCamera();
    //   }


    
    console.log("has",hasPermission);
    return (
      <>
        {hasPermission ? (
          <Camera ref={cameraRef} type={type} style={styles.camera}>
            <View style={styles.buttonContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <Icon.Button
                  name="camera-reverse-outline"
                  backgroundColor="#000000"
                  onPress={toggleCameraType}
                  size={55}
                  iconStyle={{
                    alignItems: "center",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                />
                <Icon.Button
                  name="camera"
                  backgroundColor="#000000"
                  onPress={takePicture}
                  size={55}
                  iconStyle={{
                    alignItems: "center",
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                />
                <Icon.Button
                  name="close-circle-outline"
                  backgroundColor="#000000"
                  onPress={closeCamera}
                  size={55}
                  iconStyle={{
                    marginRight: 0,
                  }}
                />
              </View>
            </View>
          </Camera>
        ) : (
          // <View style={styles.container}>
          //   <TouchableOpacity style={styles.buttonOpn} onPress={runOpenCamera} >
          //     <Text style={styles.buttonText}>Click Photo</Text>
          //   </TouchableOpacity>
          // </View>
         <>
         </>
        )}
      </>
    );
  };
  
  export default UserCameraComponent;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: 'red'
    },
    camera: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
    },
    buttonSmall: {
      backgroundColor: '#08A5EF',
      paddingVertical: 7,
      paddingHorizontal: 15,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    buttonSmallText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    buttonOpn: {
      backgroundColor: '#08A5EF',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 100,
      marginBottom: 60,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
  });
  