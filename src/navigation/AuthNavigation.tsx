import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from '../screen/AdminScreen';
import MemberScreen from '../screen/MemberScreen';
import EnterOTPScreen from '../screen/EnterOTPScreen';
import UserVisitorBookAppointmentScreen from '../screen/UserVisitorBookAppointmentScreen';
import ConfirmationScreen from '../screen/ConfirmationScreen';
import UserCapturePhotoScreen from '../screen/UserCapturePhotoScreen';
import UserDashboardScreen from '../screen/UserDashboardScreen';
import EmployeeListScreen from '../screen/EmployeeListScreen';

export const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (

    <Stack.Navigator>

      <Stack.Screen
        name="UserRegister"
        component={MemberScreen}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Login"
        component={AdminScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="EnterOTPScreen"
        component={EnterOTPScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="UserRegistration"
        component={UserVisitorBookAppointmentScreen}
        options={() => ({
          headerShown: false,
        })}
      />

      <Stack.Screen name="UserUploadProfile"
        component={UserCapturePhotoScreen}
        options={{ title: 'capture screen ' }}
      />
      <Stack.Screen name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{ title: 'Confirmation ' }}
      />

      <Stack.Screen
        name="UserDashboardScreen"
        component={UserDashboardScreen}
        options={() => ({
          headerShown: true,
          headerTitle: "UserDashboardScreen",
          headerTitleAlign: "center",
        })}
      />
 <Stack.Screen
                name="EmployeeListScreen"
                component={EmployeeListScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Check Pending Status",
                    headerTitleAlign: "center",
                })}
            />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
