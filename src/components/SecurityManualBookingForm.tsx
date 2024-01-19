import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, ScrollView } from "react-native";
import * as yup from "yup";
import { BookingFormValues } from "../screen/AppointmentFormScreen";
import { Dropdown } from "react-native-element-dropdown";
import { useAppSelector } from "../stores/hooks";
import { selectAuthenticated } from "../stores/authentication/selectors";
import { useFocusEffect } from "@react-navigation/native";
import { getEmployeeList } from "../utils/api";
import { getAllAppointmentData } from "../stores/appointment/selectors";

type FormValType = {
  formOneData: any,
  handleFormSubmit: any,
  firstNameVal?: string,
  lastNameVal?: string,
  idNoVal?: string
}

const SecurityManualBookingForm = ({ formOneData, handleFormSubmit }: any) => {
  const { role, user, token }: any = useAppSelector(selectAuthenticated);

  const { idNo, name, uploadedImgId } = useAppSelector(getAllAppointmentData);


  console.log('my formdata redux state>>>>>>>>>>>>>>>>>>>>>>>>', name);

  const [myFormData, setMyFormData] = useState<any>({
    visitPurpose: '',
    contactNumber: '',
    date: '',
    time: '',
    employeeId: '',
    dept: '',
    documentType: '',
    email: '',
    firstName: '',
    lastName: ''
  });


  const [empid, setEmpid] = useState<any>(myFormData.employeeId); // meet whom
  const [admin, setAdmin] = useState<any>([]);

  console.log("my form one data are>>>>>>>>>>>>>>>>", formOneData);

  function getFirstNameAndLastName(fullName: string) {
    // Split the full name into first name and last name using the space as the separator
    const nameParts = fullName.split(' ');
    const fName = nameParts[0];
    const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    return [fName, lName];
  }

  const fromSubmitHandling = (
    values: BookingFormValues) => {
    // console.log('value*****************************', values, '***prev data******', myFormData)
    const newData = {
      ...formOneData,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "idNo": values.idNo,
      "upload_image_id": uploadedImgId
    }
    handleFormSubmit(newData)
  }
  const initialValues: any = {
    dept: formOneData.dept,
    visitPurpose: formOneData.visitPurpose,
    firstName: name ? getFirstNameAndLastName(name)[0] : '',
    lastName: name ? getFirstNameAndLastName(name)[1] : '',
    address: "",
    date: formOneData.date,
    time: formOneData.time,
    employeeId: empid,
    contactNumber: formOneData.contactNumber,
    documentType: formOneData.documentType,
    email: formOneData.email,
    idNo: idNo ?? '',
  };

  const bookingValidationSchema = yup.object().shape({
    // visitPurpose: yup.string().required('purposeOfVisit of visit is required'),
    firstName: yup.string()
    .trim()
    .required('First Name of Visitor is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name must be at most 50 characters')
    .matches(/^[a-zA-Z ]+$/, 'First Name must only contain letters'),
    lastName: yup.string().trim()
    .required('Last Name of Visitor is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name must be at most 50 characters')
    .matches(/^[a-zA-Z ]+$/, 'Last Name must only contain letters'),
    idNo: yup.string().trim().required('Id Number is required').min(2, 'ID must be at least 2 characters')
    .max(50, 'ID must be at most 50 characters'),
    // address: yup.string().required('address of visit is required'),
    // date: yup.string().required('date of visit is required'),
    // time: yup.string().required('time of visit is required'),
    // purpose: yup.string().required('purpose of visit is required'),
    // phoneNumber: yup.string().required('phoneNumber of visit is required'),
  });

  /*
  useFocusEffect(
    React.useCallback(() => {
      // const employeeRecord = async () => {
      //   try {
      //     const resData = await getEmployeeList(token);

      //     if (resData.statusCode === 200 || resData.statusCode === 201) {
      //       const data = resData.data;

      //       // console.log('emp data&**********************************', data)
      //       setAdmin(data);
      //     }
      //   } catch (e) {
      //     console.warn("employe record error", e);
      //   }
      // };

      // employeeRecord();

      console.log(formOneData.isSimpleForm, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      if (formOneData && formOneData.isSimpleForm) {
        console.log('tre&&&&&&&&&&&&&&&&&&&&&&&&&',formOneData)
        setMyFormData({
          visitPurpose: formOneData.visitPurpose,
          contactNumber: formOneData.contactNumber,
          date: formOneData.date,
          time: formOneData.time,
          employeeId: formOneData.employeeId,
          dept: formOneData.dept,
          documentType: formOneData.documentType,
          email: formOneData.email,
          firstName: '',
          lastName: ''
        })
      } else {
        setMyFormData({
          visitPurpose: formOneData.formData.visitPurpose,
          contactNumber: formOneData.formData.contactNumber,
          date: formOneData.formData.date,
          time: formOneData.formData.time,
          employeeId: formOneData.formData.employeeId,
          dept: formOneData.formData.dept,
          documentType: formOneData.formData.documentType,
          email: formOneData.formData.email,
          firstName: formOneData.data.data.name,
          lastName: formOneData?.data.data.name,
          idNo: formOneData?.data.idNo
        })
      }


      console.log('myFormData**************************************', myFormData)

    }, [role,formOneData])
  );*/

  /*
  useEffect(() => {
    if (formOneData && formOneData.isSimpleForm) {
      setMyFormData({
        visitPurpose: formOneData.visitPurpose,
        contactNumber: formOneData.contactNumber,
        date: formOneData.date,
        time: formOneData.time,
        employeeId: formOneData.employeeId,
        dept: formOneData.dept,
        documentType: formOneData.documentType,
        email: formOneData.email,
        firstName: firstNameVal,
        lastName: lastNameVal,
        idNo: idNoVal
      });
    } else {
      console.log('yes else is running')
      setMyFormData({
        visitPurpose: formOneData.formData.visitPurpose,
        contactNumber: formOneData.formData.contactNumber,
        date: formOneData.formData.date,
        time: formOneData.formData.time,
        employeeId: formOneData.formData.employeeId,
        dept: formOneData.formData.dept,
        documentType: formOneData.formData.documentType,
        email: formOneData.formData.email,
        firstName: firstNameVal,
        lastName: lastNameVal,
        idNo: idNoVal
      });
    }

  }, [firstNameVal, lastNameVal, idNoVal]);
  */

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={bookingValidationSchema}
        onSubmit={fromSubmitHandling}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <View style={styles.inputContainer}>
                            <Text style={styles.label}>Purpose of Visit</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('visitPurpose')}
                                onBlur={handleBlur('visitPurpose')}
                                value={values.visitPurpose}
                                placeholder="Purpose of Visit"
                            />
                            <Text style={styles.errorTxt}>
                                {touched.visitPurpose && errors.visitPurpose ? errors.visitPurpose : null}
                            </Text>
                        </View> */}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="First Name"
              />
              <Text style={styles.errorTxt}>
                {touched.firstName && errors.firstName
                  ? errors.firstName
                  : null}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Last Name"
              />
              <Text style={styles.errorTxt}>
                {touched.lastName && errors.lastName ? errors.lastName : null}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("idNo")}
                onBlur={handleBlur("idNo")}
                value={values.idNo}
                placeholder="Enter id number"
              />
              <Text style={styles.errorTxt}>
                {touched.idNo && errors.idNo ? errors.idNo : null}
              </Text>
            </View>

            {/* <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('contactNumber')}
                                onBlur={handleBlur('contactNumber')}
                                value={values.contactNumber}
                                placeholder="contactNumber"
                            />
                            <Text style={styles.errorTxt}>
                                {touched.contactNumber && errors.contactNumber ? errors.contactNumber : null}
                            </Text>
                        </View> */}

            {/* <View style={styles.inputContainer}>
                            <Text style={styles.label}>Meet Whom</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={admin}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Meet Whom"
                                searchPlaceholder="Search..."
                                value={empid}
                                onChange={item => {
                                    setEmpid(item.value);
                                }}
                            />
                        </View> */}

            {/* <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingBottom: 20,
                            marginBottom: 15,
                        }}>
                            <View style={{
                                width: '50%',
                            }}>
                                <Text style={styles.label}>Date</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('date')}
                                    onBlur={handleBlur('date')}
                                    value={values.date}
                                    placeholder="date"
                                />
                                <Text style={styles.errorTxt}>
                                    {touched.date && errors.date ? errors.date : null}
                                </Text>
                            </View>
                            <View style={{
                                width: '48%',
                            }}>
                                <Text style={styles.label}>Time</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('time')}
                                    onBlur={handleBlur('time')}
                                    value={values.time}
                                    placeholder="time"
                                />
                                <Text style={styles.errorTxt}>
                                    {touched.time && errors.time ? errors.time : null}
                                </Text>
                            </View>
                        </View> */}

            <View
              style={{
                width: "90%",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SecurityManualBookingForm;

const styles = StyleSheet.create({
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
});
