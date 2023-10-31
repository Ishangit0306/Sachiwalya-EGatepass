import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import SecurityManualBookingForm from '../components/SecurityManualBookingForm';
import { BookingFormValues } from './AppointmentFormScreen';
import { FormikHelpers } from 'formik';

const DocumentScannedScreen = ({ navigation, route }: any) => {
    // navigation.navigate('VisitorPhotoScreen', params)
    const { params } = route;
    // console.log("paramsssssssssssss", params)
    // const [error, setError] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>('');
    // const [userDataId, setUserDataId] = useState<string>('');
    // const [userDataName, setUserDataName] = useState<string>('');

    const handleTryAgain = () => {
        navigation.navigate("SecurityBookAppointmentScreen");
        console.log("try again")
    }
    const handleSubmit = () => {
        console.log("submit")
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log("use effecttttttttttttttttttttt")
    //         const { data, error, message, statusCode, formData } = params
    //         setError(error);
    //         setMessage(message);
    //         if (!error) {
    //             console.log('my aname is ***********************', data.data.name)
    //             setUserDataId(data.data.idNo);
    //             setUserDataName(data.data.name);

    //         }


    //     }, [userDataName, userDataId])
    // );

    const handleFormSubmit = (
        values: BookingFormValues) => {
        if (values) {
            console.log("----values  doc data****newData****************************", values);
            // navigation.navigate("VisitorPhotoScreen", values);
        }
    };
    return (
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Try Again UPload Not correct</Text>
            </View>
        </View>
    )

}

export default DocumentScannedScreen

const styles = StyleSheet.create({
    innerDataBlock: {
        flexDirection: "row",
        width: "50%"
    },
    label: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000000",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#EBEBEB",
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#ffffff",
        fontSize: 18,
        color: "#000",
    },
    textStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        // height: 40,
        // fontSize: 16,
        // borderColor: 'black'
    },
    dropdown: {
        height: 45,
        borderWidth: 1,
        borderColor: "#EBEBEB",
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#ffffff",
        fontSize: 18,
        color: "#000",
    },
    inputContainer: {
        width: "90%",
        paddingBottom: 20,
        marginBottom: 15,
    },
    errorTxt: {
        color: "red",
        position: "absolute",
        bottom: 0,
    },
    scrollView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // padding: 20,
        // margin: 0
    },
    button: {
        backgroundColor: "#08A5EF",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 100,
        marginBottom: 60,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 20,
    },
})