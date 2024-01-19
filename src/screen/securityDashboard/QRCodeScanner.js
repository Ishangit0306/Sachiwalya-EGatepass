import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

//import { useNavigation } from '@react-navigation/native';

const QRCodeScanner = ({ navigation }) => {
  //const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const scannerRef = useRef(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

 useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  useEffect(() => {
    handleScanQR();
  }, );


  const handleBarCodeScanned = ({data }) => {
    //const parsedData=JSON.parse(data);
    console.log("innnqr",data);
    setScanned(true);
    setShowScanner(false);
    navigation.navigate('QRdisplayScreen',{
    Qrdata:data  
    });
  };

  const handleScanAgain = () => {
    setScanned(!scanned);
  };

  const handleScanQR = () => {
    console.log("Check")
    setShowScanner(true);
    // setScanned(!scanned);
  };

  const handleCancelScan = () => {
    navigation.goBack();
    //setShowScanner(!showScanner);
  };

  const renderScanner = () => {
    if (hasPermission) {
      return (
        <>
          <BarCodeScanner
            ref={scannerRef}Scanned
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={handleBarCodeScanned}
          />

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelScan}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
        </>
      );
    } else if (!hasPermission) {
      return( <Text>Please Wait, Acessing Camera</Text>);
    }

  };

  return (
    // <View style={styles.container}>
    //   {<TouchableOpacity style={styles.button} onPress={handleScanQR}>
    //     <Text style={styles.buttonText}>{scanned ? "Scan Again" : "Scan QR"}</Text>
    //   </TouchableOpacity>}
    //    {showScanner && renderScanner()}
    // </View>
    showScanner && renderScanner()
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '70%',
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanQRButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
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
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cancelButtonText: {
    backgroundColor: '#08A5EF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 20,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
    textAlign:"center"
  }


});

export default QRCodeScanner;