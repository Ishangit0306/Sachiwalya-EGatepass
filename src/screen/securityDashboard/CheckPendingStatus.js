import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyComponent = () => {
  const [pendingStatus, setPendingStatus] = useState('In Progress');

  const handleButtonPress = () => {
    // Add your logic here to handle the button press event if needed
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}> Pending Status: {pendingStatus}</Text> */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Check Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', // Replace with your desired button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyComponent;
