import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../stores/hooks";
import { selectAuthenticated } from "../stores/authentication/selectors";
import SecurityDashboardScreen from "../screen/SecurityDashboardScreen";
import EmployeeDashboardScreen from "../screen/EmployeeDashboardScreen";
import SecurityBookAppointmentScreen from "../screen/SecurityBookAppointmentScreen";
import AppointmentFormScreen from "../screen/AppointmentFormScreen";
import EmployeeBookAppointmentScreen from "../screen/EmployeeBookAppointmentScreen";
import EmployeeListScreen from "../screen/EmployeeListScreen";
import CaptureDocumentScreen from "../screen/CaptureDocumentScreen";

import QRCodeScannerScreen from "../screen/securityDashboard/QRCodeScannerScreen";

import EmployeeCheckRequest from "../screen/EmployeeCheckRequest";
import VisitorPhotoScreen from "../screen/VisitorPhotoScreen";
import QRdisplayScreen from "../screen/QRdisplayScreen";
import { Button, IconButton } from "react-native-paper";
import DocumentScannedScreen from "../screen/DocumentScannedScreen";
import { ROLE_TYPE_PASSOFFICE, ROLE_TYPE_SECURITY, ROLE_TYPE_USER } from "../utils/config";
import PassOfficeDashboardScreen from "../screen/PassOfficeDashboardScreen";
import UserVisitorBookAppointmentScreen from "../screen/UserVisitorBookAppointmentScreen";
import UserCapturePhotoScreen from "../screen/UserCapturePhotoScreen";
import ConfirmationScreen from "../screen/ConfirmationScreen";
import UserDashboardScreen from "../screen/UserDashboardScreen";
import PasswordResetScreen from "../screen/PasswordResetScreen";

const Stack = createNativeStackNavigator();


const DashboardRoutes = ({ role }: any) => {
    //const name= useAppSelector(selectAuthenticated).user?.userName;
    const email= useAppSelector(selectAuthenticated).user?.userName;
    let Name:any;
    if (email) {
  // Extracting the name part before the '@' symbol
  const atIndex = email.indexOf('@');
  const name = atIndex !== -1 ? email.slice(0, atIndex) : email;
  const alphaOnlyName = name.replace(/[^a-zA-Z]/g, '');
  const formattedName = alphaOnlyName.charAt(0).toUpperCase() + alphaOnlyName.slice(1);
Name=formattedName
}
    return (
        <Stack.Navigator>
            {role === ROLE_TYPE_SECURITY ? (
                <>
                    <Stack.Screen
                        name="SecurityDashboard"
                        component={SecurityDashboardScreen}
                        options={() => ({
                            headerShown: true,
                            headerTitle: `Welcome ${Name}`,
                            headerTitleAlign: "center",
                        })}
                    />

                    <Stack.Screen
                        name="QRCodeScannerScreen"
                        component={QRCodeScannerScreen}
                        options={() => ({
                            headerShown: true,
                            headerTitle: "E-Gatepass",
                            headerTitleAlign: "center",
                        })}
                    />

                    <Stack.Screen
                        name="QRdisplayScreen"
                        component={QRdisplayScreen}
                        options={({ navigation, route }) => ({
                            headerShown: true,
                            headerLeft: () => (
                                <IconButton
                                    icon="keyboard-backspace"
                                    size={20}
                                    onPress={() => navigation.navigate("SecurityDashboard")}
                                />
                            ),
                            headerTitle: "Visitor E-GatePass",
                            headerTitleAlign: "center",
                        })}
                    />
                </>
            ) : role === ROLE_TYPE_PASSOFFICE ? (
                <>
                    <Stack.Screen
                        name="PassOfficeDashboard"
                        component={PassOfficeDashboardScreen}
                        options={() => ({
                            headerShown: true,
                            headerTitle: `Welcome ${Name}`,
                            headerTitleAlign: "center",
                        })}
                    />
                </>
            ) : role === ROLE_TYPE_USER ? (<>
                <Stack.Screen
                    name="UserDashboardScreen"
                    component={UserDashboardScreen}
                    options={() => ({
                        headerShown: false,
                        headerTitle: "UserDashboardScreen",
                        headerTitleAlign: "center",
                    })}
                />
                <Stack.Screen
                    name="UserRegistration"
                    component={UserVisitorBookAppointmentScreen}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                {/* <Stack.Screen
                    name="EmployeeListScreen"
                    component={EmployeeListScreen}
                    options={() => ({
                        headerShown: true,
                        headerTitle: "Check Pending Status",
                        headerTitleAlign: "center",
                    })}
                /> */}
                <Stack.Screen name="UserUploadProfile"
                    component={UserCapturePhotoScreen}
                    options={{ title: 'capture screen ' }}
                />
                <Stack.Screen name="ConfirmationScreen"
                    component={ConfirmationScreen}
                    options={{ title: 'Confirmation ' }}
                />

            </>) : (
                <>
                    <Stack.Screen
                        name="EmployeeDashboard"
                        component={EmployeeDashboardScreen}
                        options={() => ({
                            headerShown: true,
                            headerTitle: `Welcome ${Name}`,
                            headerTitleAlign: "center",
                        })}
                    />
                </>
            )}

            <Stack.Screen
                name="SecurityBookAppointmentScreen"
                component={SecurityBookAppointmentScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Appointment Details",
                    headerTitleAlign: "center",
                })}
            />

            <Stack.Screen
                name="AppointmentFormScreen"
                component={AppointmentFormScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Visitor Details",
                    headerTitleAlign: "center",
                })}
            />

            <Stack.Screen
                name="CaptureDocumentScreen"
                component={CaptureDocumentScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Take Photo of Document",
                    headerTitleAlign: "center",
                })}
            />
            <Stack.Screen
                name="VisitorPhotoScreen"
                component={VisitorPhotoScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Visitor Photo",
                    headerTitleAlign: "center",
                })}
            />
            <Stack.Screen
                name="EmployeeListScreen"
                component={EmployeeListScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Check Status",
                    headerTitleAlign: "center",
                })}
            />
            <Stack.Screen
                name="DocumentScannedScreen"
                component={DocumentScannedScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Scanned Data",
                    headerTitleAlign: "center",
                })}
            />
                 <Stack.Screen
                name="PasswordResetScreen"
                component={PasswordResetScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Reset Password",
                    headerTitleAlign: "center",
                })}
            />
            
        </Stack.Navigator>
    );
};

export default DashboardRoutes;
