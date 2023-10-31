import { Button, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Headline } from "react-native-paper";
import Icons from "../constants/Icons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import RNDateTimePicker from "@react-native-community/datetimepicker";

const ID_OPTIONS = [
    { label: "Aadhar", value: "Aadhar" },
    { label: "Driving License", value: "License" },
    { label: "Voter's ID", value: "Voter_id" },
    { label: "None", value: "none" }
];

const admin = [
    { label: 'Ishan Malhotra', value: 'Ishan Malhotra' },
    { label: 'Mukul Pundir', value: 'Mukul Pundir' },
    { label: 'Sumeet Arora', value: 'Sumeet Arora' },
    { label: 'Sarika Agarwal', value: 'Sarika Agarwal' },
    { label: 'Aayushi Agarwal', value: 'Aayushi Agarwal' },
]

// dummy ends
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const EmployeeBookAppointmentScreen = ({ navigation }: any) => {
    //state start
    const [id, setId] = useState("");
    const [empid, setEmpid] = useState("");

    //formic handler
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Purpose of visit is required'),
        department: Yup.string().required('Purpose of visit is required'),
        purposeOfVisit: Yup.string().required('Purpose of visit is required'),
        phoneNumber: Yup.string().required('Contact number is required'),
        //   whomToMeet: Yup.string().required('Whom to meet is required'),
        //  selectedId: Yup.string().required('Please select an ID'),
    });

    interface SecurityBookAppointmentValues {
        name: string,
        department: string
        purposeOfVisit: string;
        phoneNumber: string;
        //   whomToMeet: string;
        //  selectedId: string;
    }
    const initialValues: SecurityBookAppointmentValues = {
        name: '',
        department: '',
        purposeOfVisit: '',
        phoneNumber: '',
        //  whomToMeet: '',
        //   selectedId: '',
    };
    const handleFormSubmit = (
        values: SecurityBookAppointmentValues,
        { setSubmitting }: FormikHelpers<SecurityBookAppointmentValues>,
    ) => {
        console.log('form values********************', values)
        const formdata = { ...values, empid: empid, id: id }
        setSubmitting(false);

        if (id === "None" || id === "none") {
            navigation.navigate("AppointmentFormScreen", formdata);
        } else {
            navigation.navigate("CaptureDocumentScreen", formdata);
        }
    };

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, we need to manually toggle the date picker visibility.
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const hideDatepicker = () => {
        setShowDatePicker(false);
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}>
            <View style={{
                width: '90%',
                height: '15%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={Icons.logo} style={{
                    width: '95%',
                    height: '95%',
                }}
                    resizeMode='contain'
                />
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: '80%',
            }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                    }) => (
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}>

                                <View style={{
                                    width: '48%',
                                }}>
                                    <Text style={styles.label}>Department</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange('department')}
                                        onBlur={handleBlur('department')}
                                        value={values.department}
                                        placeholder="Department"
                                    />
                                    <Text style={{ color: 'red' }}>
                                        {touched.department && errors.department ? errors.department : null}
                                    </Text>
                                </View>


                                <View style={{
                                    width: '50%',
                                }}>
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        placeholder="Name"
                                    />
                                    <Text style={{ color: 'red' }}>
                                        {touched.name && errors.name ? errors.name : null}
                                    </Text>
                                </View>

                            </View>

                            <View style={{
                                width: '100%',
                            }}>
                                <Text style={styles.label}>Purpose of Visit</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('purposeOfVisit')}
                                    onBlur={handleBlur('purposeOfVisit')}
                                    value={values.purposeOfVisit}
                                    placeholder="Purpose of Visit"
                                />
                                <Text style={{ color: 'red' }}>
                                    {touched.purposeOfVisit && errors.purposeOfVisit ? errors.purposeOfVisit : null}
                                </Text>
                            </View>

                            <View style={{
                                width: '100%',
                            }}>
                                <Text style={styles.label}>Contact Number</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                    placeholder="Contact Number"
                                />
                                <Text style={{ color: 'red' }}>
                                    {touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <View style={{
                                    width: '48%'
                                }}>
                                    <Text style={styles.label}>Date</Text>
                                    <TextInput
                                        style={styles.input}
                                        onFocus={showDatepicker}
                                        onBlur={hideDatepicker}
                                        value={date.toLocaleString()}
                                        placeholder="Date"
                                    />
                                    {showDatePicker && (
                                        <RNDateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>

                                <View style={{
                                    width: '48%'
                                }}>
                                    <Text style={styles.label}>Time</Text>
                                    <TextInput
                                        style={styles.input}
                                        onFocus={showDatepicker}
                                        onBlur={hideDatepicker}
                                        value={date.toLocaleString()}
                                        placeholder="Date"
                                    />
                                    {showDatePicker && (
                                        <RNDateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>

                            </View>

                            <View style={{
                                width: '100%'
                            }}>
                                <Text style={styles.label}>Select Document</Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={ID_OPTIONS}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select an ID"
                                    value={id}
                                    onChange={(item) => {
                                        setId(item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color="black"
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
                                />
                                <Text style={{ color: 'red' }}>
                                    {``}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '12%',
                                    borderRadius: 12,
                                    backgroundColor: 'blue'
                                }}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.textStyle}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )

}

export default EmployeeBookAppointmentScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        padding: 16,
        //justifyContent: 'center', // Center vertically
        alignItems: "center", // Center horizontally
    },
    logo: {
        width: 100, // Set the desired width of the logo
        height: 100, // Set the desired height of the logo
        resizeMode: "contain", // Adjust the image's size while preserving aspect ratio
        marginBottom: 20, // Add some margin to separate the logo from the headline
    },
    headline: {
        textAlign: "center",
        marginBottom: 20,
    },
    modalView: {
        marginTop: 380,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
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
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    dropdownStyle: {
        backgroundColor: "#fafafa",
        // Other styles for the dropdown container
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderColor: 'black'
    },
    label: {
        fontSize: 18,
        fontWeight: "500",
        color: '#000000'
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1.5
    },
    dropdown: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1.5,
    },
    textStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
    },
});
