import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icons from '../constants/Icons';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { selectAuthenticated } from '../stores/authentication/selectors';
import {
  fetchDepartment,
  fetchDesignation,
  fetchOfficer,
  getEmployeeList,
} from '../utils/api';
import { formatDate, formatTime } from '../utils/custom';
// import RNDateTimePicker from "@react-native-community/datetimepicker";

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { resetPhotoState } from '../stores/appointment/slice';
import { ROLE_TYPE_EMPLOYEE, ROLE_TYPE_SECURITY } from '../utils/config';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const ID_OPTIONS = [
  { label: 'Aadhar', value: 1 },
  { label: "Voter's ID", value: 2 },
  { label: 'Driving License', value: 3 },
  { label: 'None', value: 4 },
];
const admin = [
  { label: 'IT', value: 'IT' },
  { label: 'General', value: 'General' },
  { label: 'Adminstrative', value: 'Adminstrative' },
];

type DOC_ADHAR_ID = 1;
type DOC_VOTER_ID = 2;
type DOC_VECHICLE_ID = 3;
type DOC_NONE = 0;

type DocumentType = DOC_ADHAR_ID | DOC_VOTER_ID | DOC_VECHICLE_ID | DOC_NONE;

interface SecurityBookAppointmentValues {
  //departmentName: string,
  // employeeId: number | string,
  visitPurpose: string;
  contactNumber: string;
  date: string;
  time: string;
  email: string;
  // documentType: DocumentType,
}

const SecurityBookAppointmentScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { role, user, token }: any = useAppSelector(selectAuthenticated);
  const [currentDate, setCurrentDate] = useState<string | any>(
    formatTime(new Date())
  );

  useEffect(()=>{
    if(role==ROLE_TYPE_EMPLOYEE)
    {

    setDpt(24);
    setDesig(5773);
    setEmpid(5710);
    }
  },[])
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchDepartment().then((data) => {
      const departmentArray = data.data.map(
        (item: { ddepartment: string; did: number }) => ({
          label: item.ddepartment,
          value: item.did,
        })
      );
      setDepartmentData(departmentArray);
    });
  }, []);

  const [dept, setDpt] = useState<any>(role == ROLE_TYPE_EMPLOYEE ? 'General' : ''); // employee id

  const [designationData, setDesignationData] = useState([]);
  const isListRender = React.useRef(true);
  const isDesignationRender = React.useRef(true);

  useEffect(
    () => {
      if (!isListRender.current) {
        fetchDesignation(dept).then((data) => {
          let designationdata: any = [];
          data.data.map((entry: any) => {
            const designation = entry.designation;
            const employee = entry.employee;
            if (employee) {
              designationdata.push(`${designation} (${employee})`);
            } else {
              designationdata.push(designation);
            }
          });

          // Create an array of objects with labels and values
          const designationDataArray = designationdata.map(
            (designation: string, index: number) => ({
              label: designation,
              value: data.data[index].did, // Access the mid value from the API response
            })
          );

          setDesignationData(designationDataArray);

          console.log('designation', data);
        });
      }
      isListRender.current = false;

      // const designationArray=data.data.map(item)=>{
      //   label:item.,
      //   value:item.,
      // }
    }, // setDesignationData(designationArray)
    [dept]
  );
  // date time state
  const [desig, setDesig] = useState<any>();

  const [officerData, setOfficerData] = useState<any>([]);
  useEffect(
    () => {
      if (!isDesignationRender.current) {
        fetchOfficer(dept, desig).then((data) => {
          let officerdata: any = [];
          data.data.map((entry: any) => {
            const designation = entry.designation;
            const employee = entry.employee;
            if (designation) {
              officerdata.push(`${employee} (${designation})`);
            } else {
              officerdata.push(employee);
            }
          });

          // Create an array of objects with labels and values
          const officerDataArray = officerdata.map(
            (officer: string, index: number) => ({
              label: officer,
              value: data.data[index].eid, // Access the mid value from the API response
            })
          );

          setOfficerData(officerDataArray);
        });
      }
      isDesignationRender.current = false;

      // const designationArray=data.data.map(item)=>{
      //   label:item.,
      //   value:item.,
      // }
    }, // setDesignationData(designationArray)
    [desig]
  );

  //const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  //const [date, setDate] = useState(new Date()); // Sele// Control the visibility of the date picker

  const [date, setDate] = useState(new Date()); // Selected date
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Control the visibility of the date picker

  //time
  const [showPicker, setShowPicker] = useState(false);
  const [time, setSelectedTime] = useState(new Date());

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event: any, selected: any) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      console.log('handletime',selected);
      setSelectedTime(selected);
      // You can do something with the selected time here, e.g., pass it to a parent component.
    }
  };
  //time
  // Function to handle date selection
  const handleDateConfirm = (selectedDate: any) => {
    setDatePickerVisible(false); // Hide the date picker
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Function to show the date picker
  const showDatePickerModal = () => {
    setDatePickerVisible(true);
  };

  // Function to hide the date picker
  const hideDatePickerModal = () => {
    setDatePickerVisible(false);
  };

  //date time state end

  //state start
  const [id, setId] = useState<any>(0); // doc id
  const [empid, setEmpid] = useState<any>(user ? user.id : 0); // employee id

  const [admin, setAdmin] = useState<any>([]);

  const initialValues: SecurityBookAppointmentValues = {
    //departmentName: role === ROLE_TYPE_EMPLOYEE ? user?.departmentName : '',
    email: '',
    // employeeId: '',
    visitPurpose: '',
    contactNumber: '',
    // date: role === ROLE_TYPE_EMPLOYEE ? currentDate.toLocaleDateString() : currentDate.toLocaleDateString(),
    date: role === ROLE_TYPE_EMPLOYEE ? formatDate(new Date()) : formatDate(new Date()),
    // time: role === ROLE_TYPE_EMPLOYEE ? currentDate.toLocaleTimeString() : currentDate.toLocaleTimeString(),
    time: role === ROLE_TYPE_EMPLOYEE ? formatTime(new Date()) : formatTime(new Date()),
    // documentType: 0,
  };

  //formic handler
  const validationSchema = Yup.object().shape({
    //departmentName: Yup.string().required('department name is required'),
    // employeeId: Yup.string().required('select the employee id'),
    visitPurpose: Yup.string().required('Purpose of visit is required'),
    email: Yup.string().email('Invalid email'),
    contactNumber: Yup.string().required(' Visitor Contact number is required'),
    date: Yup.string().required('Date field is required'),
    time: Yup.string().required('Time field is required'),
  });

  const handleFormSubmit = (
    values: SecurityBookAppointmentValues,
    { setSubmitting }: FormikHelpers<SecurityBookAppointmentValues>
  ) => {
    const formdata = {
      ...values,
      employeeId: empid,
      documentType: id,
      date: formatDate(date),
      time: formatTime(time),
      dept: dept,
    };
    console.log('form formdata********************', formdata);

    setSubmitting(false);

    if (id === 4 || id === 'none') {
      navigation.navigate('AppointmentFormScreen', {
        ...formdata,
        isSimpleForm: true,
      });
    } else {
      const cameraScreenData = { ...formdata, imgFor: 'document' };
      //console.log(cameraScreenData);
      navigation.navigate('CaptureDocumentScreen', cameraScreenData);
    }
  };

  /*
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
  
  */

  useFocusEffect(
    React.useCallback(() => {
      if (role === ROLE_TYPE_EMPLOYEE) {
        //console.log('yes employe data are>>>>>>>>>>>', user);
      } else {
        console.log('current date time', currentDate);
      }

      const employeeRecord = async () => {
        try {
          const resData = await getEmployeeList(token);

          if (resData.statusCode === 200 || resData.statusCode === 201) {
            const data = resData.data;

            // console.log('emp data&**********************************', data)
            setAdmin(data);
          }
        } catch (e) {
          //console.warn('employe record error', e);
        }
      };

      employeeRecord();
      dispatch(resetPhotoState());
    }, [role])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View style={{}}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 50,
            }}>
            <Image
              source={Icons.logo}
              style={{
                width: 120,
                height: 120,
              }}
              resizeMode='contain'
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
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
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Select Department  <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={departmentData}
                        search
                        maxHeight={300}
                        labelField='label'
                        valueField='value'
                        placeholder= {role==ROLE_TYPE_EMPLOYEE?'Forest & Environment':'Select Department'}
                        searchPlaceholder='Search...'
                        value={dept}
                        onChange={(item) => {
                          setDpt(item.value);
                        }}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Select Designation  <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={designationData}
                        search
                        maxHeight={300}
                        labelField='label'
                        valueField='value'
                        placeholder= {role==ROLE_TYPE_EMPLOYEE?'Prin.Secy(Shri Ramesh Kumar)':'Select Designation'}
                        searchPlaceholder='Search...'
                        value={desig}
                        onChange={(item) => {
                          setDesig(item.value);
                        }}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Whom to Meet  <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={officerData}
                        search
                        maxHeight={300}
                        labelField='label'
                        valueField='value'
                        placeholder= {role==ROLE_TYPE_EMPLOYEE?'Amit Bharti(P.S.)':'Whom to Meet'}
                        searchPlaceholder='Search...'
                        value={empid}
                        onChange={(item) => {
                          setEmpid(item.value);
                        }}
                      />
                      {/* <Text style={styles.errorTxt}>
                        {touched.departmentName && errors && !empid
                          ? "field is required"
                          : ""}
                      </Text> */}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Purpose of Visit  <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('visitPurpose')}
                      onBlur={handleBlur('visitPurpose')}
                      value={values.visitPurpose}
                      placeholder='Purpose of Visit'
                    />
                    <Text style={styles.errorTxt}>
                      {touched.visitPurpose && errors.visitPurpose
                        ? errors.visitPurpose
                        : null}
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Visitor Email</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder='Visitor Email'
                    />
                    <Text style={styles.errorTxt}>
                      {touched.email && errors.email ? errors.email : null}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}> Visitor Contact Number  <Text style={styles.required}>*</Text></Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('contactNumber')}
                      onBlur={handleBlur('contactNumber')}
                      value={values.contactNumber}
                      placeholder='Visitor Contact Number'
                    />
                    <Text style={styles.errorTxt}>
                      {touched.contactNumber && errors.contactNumber
                        ? errors.contactNumber
                        : null}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      paddingBottom: 20,
                      marginBottom: 15,
                    }}>
                    <View
                      style={{
                        width: '48%',
                      }}>
                      <Text style={styles.label}>Appointment Date</Text>

                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        date={date}
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePickerModal}
                        minimumDate={
                          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        }
                      />

                      <TouchableOpacity
                        onPress={showDatePickerModal}
                        >
                        <TextInput
                          style={styles.input}
                          value={date.toDateString()}
                          editable={false}
                        />
                      </TouchableOpacity>

                      {/* <TextInput
                        style={styles.input}
                        onChangeText={handleChange("date")}
                        onBlur={handleBlur("date")}
                        value={values.date}
                        placeholder="Date"
                      /> */}
                    </View>

                    <View
                      style={{
                        width: '48%',
                      }}>
                      <Text style={styles.label}>Appointment Time</Text>
                      {showPicker && (
                        <DateTimePicker
                          value={time}
                          mode='time'
                          display='spinner'
                          onChange={handleTimeChange}
                          is24Hour={true}
                        />
                      )}
                      <TouchableOpacity
                        onPress={showTimePicker}
                        >
                        <TextInput
                          style={styles.input}
                          value={time.toLocaleTimeString()}
                          editable={false}
                        />
                      </TouchableOpacity>

                      {/* <TextInput
                        style={styles.input}
                        onChangeText={handleChange("time")}
                        onBlur={handleBlur("time")}
                        value={values.time}
                        placeholder="Time"
                      /> */}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>ID Type  <Text style={styles.required}>*</Text></Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={ID_OPTIONS}
                      maxHeight={300}
                      labelField='label'
                      valueField='value'
                      placeholder='Select an ID'
                      value={id}
                      onChange={(item) => {
                        setId(item.value);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color='black'
                          name='Safety'
                          size={20}
                        />
                      )}
                    />
                    <Text style={styles.errorTxt}>{``}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SecurityBookAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 16,
    //justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  logo: {
    width: 100, // Set the desired width of the logo
    height: 100, // Set the desired height of the logo
    resizeMode: 'contain', // Adjust the image's size while preserving aspect ratio
    marginBottom: 20, // Add some margin to separate the logo from the headline
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalView: {
    marginTop: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
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
    // height: 40,
    // fontSize: 16,
    // borderColor: 'black'
  },
  label: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#ffffff',
    fontSize: 18,
    color: '#000',
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#ffffff',
    fontSize: 18,
    color: '#000',
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 20,
    marginBottom: 15,
  },
  errorTxt: {
    color: 'red',
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    padding: 20,
    margin: 0,
  },
  button: {
    backgroundColor: '#08A5EF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  required: {
    color: 'red', // Change the color to your preference
    marginLeft: 5, // Adjust the spacing between the label text and the asterisk
  },
});
