import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import { persistor, store } from './src/stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert, ToastAndroid } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken:any) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
  
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }
  

}

const App = () => {


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);

      ToastAndroid.showWithGravityAndOffset(
        notification.request.content.title,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      //navigation.navigate('EmployeeListScreen');
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <PaperProvider>
          <RootSiblingParent>
            <AppNavigation />
          </RootSiblingParent>
        </PaperProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
