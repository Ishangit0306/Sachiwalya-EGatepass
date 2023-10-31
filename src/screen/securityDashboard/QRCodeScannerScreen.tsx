import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCodeScanner from './QRCodeScanner'

const QRCodeScannerScreen = ({navigation}:any) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <QRCodeScanner navigation={navigation} />
    </View>
  )
}

export default QRCodeScannerScreen

const styles = StyleSheet.create({

})