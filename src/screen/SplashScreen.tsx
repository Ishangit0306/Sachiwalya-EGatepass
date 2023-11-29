// SplashScreen.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Add your splash screen image or any other content here */}
      <Image source={require('../../assets/appicon.png')} style={styles.image} />
      <Text style={styles.welcomeText}>Welcome to Sachiwalya E-Gatepass App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // adjust the width and height according to your image size
    height: 200,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
