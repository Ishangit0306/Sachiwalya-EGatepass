import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ID_OPTIONS = [
  { label: 'Aadhar', value: 'Aadhar' },
  { label: 'Driving License', value: 'License' },
  { label: "Voter's ID", value: 'Voter_id' },
];

const GatepassForm = () => {

  const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);
const openGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.canceled) {
        return;
      }

      setImageUri(pickerResult.assets[0].uri);
      //setState(pickerResult.assets[0].uri);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };


  const openCamera = async () => {
    try {
      console.log('Opening Camera');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Status: '+status);

      if (status !== 'granted') {
        alert('Permission to access camera is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync();
      if (pickerResult.canceled) {
        return;
      }

      setImageUri(pickerResult.assets[0].uri);
      //setState(pickerResult.assets[0].uri);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [text, onChangeText] = React.useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
// useEffect(()=>{
//   const handleIDSelect = (value) => {
//     setId(value);
//   };
// },[ handleIDSelect]);

const handleIDSelect = (value) => {
  setId(value);
};
  const handleScan = () => {
    if (id === 'Aadhar') {
      openAadharScanner();
    } else if (id === 'License') {
      openDrivingLicenseScanner();
    } else if (id === 'Voter_id') {
      openVoterIdScanner();
    }

  };

  const openAadharScanner = () => {

    setModalVisible(!modalVisible);
  };
 const openDrivingLicenseScanner = () => {
    ImagePicker.launchCameraAsync({}, (response) => {
      console.log('Driving License scanning response:', response);
    });
  };

  const openVoterIdScanner = () => {
    ImagePicker.launchCameraAsync({}, (response) => {
      console.log("Voter's ID scanning response:", response);
    });
  };

  const handleSubmit = () => {
    // Implement the logic to handle form submission
    // You can access the form values in this function
    navigation.navigate('GatepassForm');
  };
  const handlefirstname=(newFirstName)=>{
    setFirstName(newFirstName);
  }
  const handlelastname=(newLastName)=>{
    setLastName(newLastName);
  }
  // const [imageUri, setImageUri] = useState('https://wallpapers.com/images/hd/cute-girl-vector-art-profile-picture-jhbu3wt713zj2bti.jpg');
  //console.log("IMAGE",imageUri);
  return (
    
    <View style={styles.container}>
         <Image source={require('../../../assets/logo.png')} style={styles.logo} /> 
      <Headline style={styles.headline}>Schiwalya Gatepass</Headline>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Purpose of Visit"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Whom to meet"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number with Country Code"
      />
         <Dropdown  style={styles.dropdown}
        data={ID_OPTIONS}
        
        value={id}
        onChange={handleIDSelect}
        placeholder="Select ID Type"
      />
      <Button mode="contained" onPress={handleScan}>
     Scan {id} ID
      </Button>
      {/* <Image source={{uri: imageUri}} style={styles.picture} /> */}
      {/* Add other form fields here */}
      {/* <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button> */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Upload a picture</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => openGallery()}>
              <Text style={styles.textStyle}>Open Gallery</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => openCamera()}>
              <Text style={styles.textStyle}>Open Camera</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({

container: {
    marginTop:10,
    flex: 1,
    padding: 16,
    //justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  logo: {
    width: 100, // Set the desired width of the logo
    height: 100, // Set the desired height of the logo
    resizeMode: 'contain', // Adjust the image's size while preserving aspect ratio
    marginBottom: 20, // Add some margin to separate the logo from the headline
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalView: {
    marginTop: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 30,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    width: 350,
    backgroundColor: "#fff",
    borderWidth: 1, // Width of the border
    borderColor: "black",
    borderBottomWidth: 0,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default GatepassForm;
