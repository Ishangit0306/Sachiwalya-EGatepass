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
import { ROLE_TYPE_USER } from '../utils/config';
import { useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
export const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const {  role } = useAppSelector(selectAuthenticated);
  return (

    <Stack.Navigator>
 <>
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
      </>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
