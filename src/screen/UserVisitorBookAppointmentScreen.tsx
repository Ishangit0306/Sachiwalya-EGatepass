import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform, BackHandler, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Icons from "../constants/Icons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { selectAuthenticated } from "../stores/authentication/selectors";
import { departmentName, designationName, getEmployeeList, officerName, saveUserApi } from "../utils/api";
import { formatDate, formatTime } from "../utils/custom";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { resetPhotoState } from "../stores/appointment/slice";
import { getUserInfo } from "../stores/userdata/selectors";
import { API_BASE_URL, ROLE_TYPE_EMPLOYEE, ROLE_TYPE_SECURITY } from "../utils/config";
import RadioGroup from 'react-native-radio-buttons-group';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const ID_OPTIONS = [
  { label: "Aadhar", value: 1 },
  { label: "Voter's ID", value: 2 },
  { label: "Driving License", value: 3 },
  { label: "None", value: 4 }

];
const Gender = [
  { label: "Male", value: "m" },
  { label: "Female", value: "f" },
  { label: "Trans", value: "t" }
]

type DOC_ADHAR_ID = 1;
type DOC_VOTER_ID = 2;
type DOC_VECHICLE_ID = 3;
type DOC_NONE = 0;

type DocumentType = DOC_ADHAR_ID | DOC_VOTER_ID | DOC_VECHICLE_ID | DOC_NONE;

interface SecurityBookAppointmentValues {
  //departmentName: string,
  // employeeId: number | string,
  visitername: string,
  //visit_purpose: string,
  meeting_purpose: string,
  contact_number: string,
  date: string,
  time: string,
  email_id: string,
  doc_no: any,
  address: string,
  // documentType: DocumentType,
}

const UserVisitorBookAppointmentScreen = ({ navigation, route }: any) => {
console.log("route",route)
  useEffect(() => {
    const mobile=route.params.mobile
    const data={mobile};
 const phno={data,back:true};
 console.log("da",phno)
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('UserDashboardScreen',phno);
      return true; // Return true to prevent the default back action
    });

    return () => backHandler.remove(); // Clean up the event listener when the component unmounts
  }, []);
  const [uploadAgain, setUploadAgain] = useState(false);
  useEffect(
    () => {
      if (uploadAgain) {
        data.pic == '';
      }
      console.log('datapic', data.pic);
    }, [uploadAgain]
  )
  let { params } = route;
  console.log('wholeparam',params);
  console.log('paramsinuservisitor', params.authdata);
  const { name, address, visitorId } = params?.authdata ? params.authdata : null;
  const { doctype, id_pic, upload_image_id } = params?.authdata ? params.authdata : null;

  const formData = params?.formData;
  //console.log(formData?._parts[0][1].uri);
  params = params ?? JSON.stringify(params);
  //const [formData,setFormData]=useState();

  //   useEffect(()=>{
  //   if(params)
  //   {
  //     setFormData(params.formData)
  //   }
  // },[formData]);

  const imageUri = params?.formData?.uri;


  const dispatch = useAppDispatch()
  const [departmentdata, setDepartmentdata] = useState([])
  const [designationdata, setDesignationdata] = useState<any[]>([])

  const [desActualData, setDesActualData] = useState<any>([])
  const [odata, setOdata] = useState<any>([])
  const [officer, setOfficer] = useState<any[]>([])
  const { role, user, token }: any = useAppSelector(selectAuthenticated);
  const [isloading, setisloading] = useState(true);

  const data = useAppSelector(getUserInfo);
  const idimage=id_pic??data.idpic
  //console.log('Reduxdata',data);
  const [id, setId] = useState<any>(1); // doc id
  const [empid, setEmpid] = useState<any>(user ? user.id : 0); // employee id
  // employee id
  const [gender, setGender] = useState<any>('m');
  //console.log("genderbelow",gender);


  // useEffect(()=>{

  //   if(data.uid!="") {
  //     setGender(data.gender);
  //     setId(data.typeOfId);
  //     setisloading(false);
  //   }
  //   console.log('REdux fix',data);
  // },[data])
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
  const [dept, setDpt] = useState<any>("");
  useEffect(() => {
    departmentName().then((res) => {
      setDepartmentdata(res.data.map((item: any) => ({
        label: item.ddepartment,
        value: item.did
      })));
    })
  }, []);
  //console.log("departmentdatais",dept);
  // useEffect(() => {
  //   designationName(dept).then((res)=>{
  //     setDesignationdata(res.data.map((item)=>({
  //        label: item.ddepartment,
  //        value: item.ddepartment
  //      })));
  //  })
  // },[dept]);
  useEffect(() => {
    designationName(dept).then((res) => {
      // Assuming that the API response is stored in res.data
      const apiDesignations = res.data;
      //console.log('api designation', apiDesignations);

      const designationData: any[] = [];
      setDesActualData(res.data);
      res.data.forEach((entry: any) => {
        const designation = entry.designation;
        const employee = entry.employee;
        const mid = entry.tm_mid; // Move the mid declaration inside the loop

        // Check if employee is not empty
        if (employee) {
          designationData.push(`${designation} (${employee})`);

        } else {
          designationData.push(designation);
        }
      });

      // Create an array of objects with labels and values
      const designationDataArray = designationData.map((designation, index) => ({
        label: designation,
        value: res.data[index].did // Access the mid value from the API response
      }));

      setDesignationdata(designationDataArray);
    });
  }, [dept]);


  const [designation, setDesignation] = useState<any>('');
  //console.log('designation',designation);
  const [ofcr, setOfcr] = useState<any>('');
  //console.log("officer",ofcr);
  useEffect(() => {
    officerName(dept, designation).then((res) => {
      // Assuming that the API response is stored in res.data
      const apiOfficer = res.data;
      console.log("officernamebug",apiOfficer);
      setOdata(res.data);


      const officerData: any[] = [];
      res.data.forEach((entry: any) => {
        const designation = entry.designation;
        const employee = entry.employee;
        if (designation ) {
          officerData.push(`${employee} (${designation})`);
        } else {
          officerData.push(employee);
        }
      });

      const officerDataArray = officerData.map((designation, index) => ({
        label: designation,
        value: res.data[index].eid, // Access the mid value from the API response
      }));

      setOfficer(officerDataArray);
    });
  }, [dept, designation]);

  //console.log("designationaarrayfromapi",designationdata);
  //date time state end

  //state start
  // const[designation,setDesignation]= useState<any>('');
  const [clicked, setClicked] = useState(false);
  //useEffect(() => { setClicked(true) }, [imageUri])
  const [admin, setAdmin] = useState<any>([]);

  const initialValues: SecurityBookAppointmentValues = {
    //departmentName: role === 'employee' ? user?.departmentName : '',
    visitername: name ?? "",
    email_id: data.email ?? "",
    // employeeId: '',
    //visit_purpose: '',
    meeting_purpose: '',
    doc_no: visitorId ?? '',
    contact_number: data.contactNumber ?? '',
    address: address ?? '',
    // date: role === 'employee' ? currentDate.toLocaleDateString() : currentDate.toLocaleDateString(),
    date: role === ROLE_TYPE_EMPLOYEE ? formatDate(new Date()) : formatDate(new Date()),
    // time: role === 'employee' ? currentDate.toLocaleTimeString() : currentDate.toLocaleTimeString(),
    time: role === ROLE_TYPE_EMPLOYEE ? formatTime(new Date()) : formatTime(new Date()),
    // documentType: 0,
  };

  const validationSchema = Yup.object().shape({
    visitername: Yup.string().required('Name is required'),
    //visit_purpose: Yup.string().required('Purpose of visit is required'),
    meeting_purpose: Yup.string(),
    //email_id: Yup.string().email('Invalid email'),
    //contact_number: Yup.string().required(' Visitor Contact number is required'),
    date: Yup.string().required('Date field is required'),
    time: Yup.string().required('Time field is required'),
    doc_no: Yup.string(),
    address: Yup.string()
  });


  let deviceToken:any
//  Notifications.getExpoPushTokenAsync({
//     projectId: Constants.expoConfig.extra.eas.projectId,
//   }).then((data)=>{ 
//     deviceToken = data.data
// })
if (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.eas) {
  Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  }).then((data) => {
    deviceToken = data.data;
  });
} else {
  console.error("Some properties in Constants.expoConfig are undefined");
}
  const handleFormSubmit = async (
    values: SecurityBookAppointmentValues,
    { setSubmitting }: FormikHelpers<SecurityBookAppointmentValues>,
  ) => {

    const formdata = {
      ...values,
      employeeId: empid,
      organization_name: "Uk Secteriate",
      doc_type: id,
      apt_date: formatDate(date),
      apt_time: formatTime(time),
      dept: dept,
      designation: designation,
      officer: ofcr,
      gender: gender,
      img: null,
      emp_id: "0",
      vid: data?.uid,
      contact_number: data.contactNumber ? data.contactNumber : params.mobile,
      visit_purpose: selectedPurpose,
      visitor_id: '',
      upload_image_id: upload_image_id ?? "",
      dv_token:deviceToken
    };
    if (!data.uid) {
      formdata.img = params?.formData
    }
    else {

      if (uploadAgain) {
        formdata.visitor_id = data.uid
        formdata.img = params?.formData
      }
    }
    const dData = desActualData.find((item: any) => item.did == formdata.designation);
    console.log('dData', dData);
    const Odata = odata.find((item: any) => item.eid == formdata.officer);
    const oObj = { "name": Odata.employee, "o_name": Odata.designation, "did": formdata.officer };
    const dObj = { "name": dData.employee, "d_name": dData.designation, "did": formdata.designation };
    formdata.designation = JSON.stringify(dObj);
    formdata.officer = JSON.stringify(oObj);
    let formData = new FormData();
    formData.append("organization_name", formdata.organization_name);
    formData.append("contact_number", formdata.contact_number);
    formData.append("dept", formdata.dept);
    formData.append("designation", formdata.designation);
    formData.append("officer", formdata.officer);
    formData.append("visitername", formdata.visitername);
    formData.append("gender", formdata.gender);
    formData.append("apt_date", formdata.apt_date);
    formData.append("apt_time", formdata.apt_time);
    formData.append("visit_purpose", formdata.visit_purpose);
    formData.append("meeting_purpose", formdata.meeting_purpose);
    formData.append("doc_type", formdata.doc_type);
    formData.append("doc_no", formdata.doc_no);
    formData.append("address", formdata.address);
    formData.append("email_id", formdata.email_id);
    formData.append("emp_id", formdata.emp_id);
    formData.append("img", formdata.img);
    formData.append("visitor_id", formdata.visitor_id);
    formData.append("upload_image_id", formdata.upload_image_id);
    formData.append("dv_token",formdata.dv_token)
    console.log('uid', data.uid);

    //  console.log('my form data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#########################', formStoreData);

    //  const ext = visitorImgData.uri.substring(visitorImgData.uri.lastIndexOf(".") + 1);

    //  formData.append("file", {
    //    uri: visitorImgData.uri,
    //    type: `image/${ext}`,
    //    name: visitorImgData.filename,
    //  });







    // for (const key in formdata) {
    //   if (formdata.hasOwnProperty(key)) {
    //     const value = formdata[key];
    //     postData.append(key, value);  
    //   }
    // }


    //console.log("dObj",dObj);
    //console.log('oobj',oObj);



    //console.log("'form formdata********************',",formdata.designation);


    setSubmitting(false);
    try {
      const response = data.uid && !uploadAgain
        ? await saveUserApi(formdata)
        : await saveUserApi(formData);
    
      // Handle the successful API response here
      const cameraScreenData = { ...formdata, "imgFor": "userprofile" };
      navigation.navigate("ConfirmationScreen", cameraScreenData);
    } catch (error) {
      // Handle exceptions (errors) that occurred during the API call
      Alert.alert("API call failed");
      console.error("API call failed:", error);
      // You can display an error message to the user or take other appropriate actions.
    }
    // if (id === 4 || id === "none") {
    //   navigation.navigate("AppointmentFormScreen", {...formdata, "isSimpleForm": true});
    // } else {
    //   
    //   navigation.navigate("ConfirmationScreen", cameraScreenData);
    // }
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
      if (role === 'employee') {

      } else {

      }

      const employeeRecord = async () => {
        try {
          const resData = await getEmployeeList(token);

          if (
            resData.statusCode === 200 ||
            resData.statusCode === 201
          ) {
            const data = resData.data;

            // console.log('emp data&**********************************', data)
            setAdmin(data);
          }
        } catch (e) {
          console.warn('employe record error', e)
        }
      };

      employeeRecord()
      dispatch(resetPhotoState())

    }, [role])
  );
  // useEffect(() => { setGender("m"), setId(1) }, [])


  const radioButtons = useMemo(() => ([
    {
      id: 'Official', // acts as primary key, should be unique and non-empty string
      label: 'Official',
      value: 'Official'
    },
    {
      id: 'Others',
      label: 'Others',
      value: 'Others'
    }
  ]), []);

  const [selectedPurpose, setSelectedPurpose] = useState<any>('Official');
  useEffect(() => {
    setisloading(false);
    console.log("ishanmydata", data.name);
    if (data.gender != undefined) {
      setGender(data.gender);
    }
    else {
      setGender("m");
    }
    if (data.typeOfId != undefined) {
      setId(data.typeOfId)
    }
    else {
      setId(doctype);
    }
  }, [data])

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {isloading ? (<View>
        <Text>Loading...</Text>
      </View>) : (<View style={{}}>
        <ScrollView style={styles.scrollView}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 50
          }}>
            <Image source={Icons.logo} style={{
              width: 120,
              height: 120,
            }}
              resizeMode='contain'
            />
          </View>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}

              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue
              }) => (
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View
                      style={styles.inputContainer}
                    >
                      <Text style={styles.label}>  Select Department <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={departmentdata}
                        search={departmentdata.length >= 5}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Department"
                        searchPlaceholder={departmentdata.length >= 5 ? "Search..." : undefined}
                        value={dept}
                        onChange={(item) => {
                          setDpt(item.value);
                        }}
                      />
                    </View>
                    <View
                      style={styles.inputContainer}
                    >
                      <Text style={styles.label}> Select Designation <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={designationdata}
                        search={designationdata.length >= 5}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Designation"
                        searchPlaceholder={designationdata.length >= 5 ? "Search..." : undefined}
                        value={designation}
                        onChange={(item) => {
                          setDesignation(item.value);
                        }}
                      />
                    </View>


                    <View
                      style={styles.inputContainer}
                    >
                      <Text style={styles.label}>SELECT VISITING OFFICER  <Text style={styles.required}>*</Text></Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={officer}
                        search={officer.length >= 5}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Officer"
                        searchPlaceholder={officer.length >= 5 ? "Search..." : undefined}
                        value={ofcr}
                        onChange={(item) => {
                          setOfcr(item.value);
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingBottom: 20,
                        marginBottom: 15,
                      }}
                    >
                      <View
                        style={{
                          width: "48%",
                        }}
                      >
                        <Text style={styles.label}>Appointment Date</Text>

                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          date={date}
                          onConfirm={handleDateConfirm}
                          onCancel={hideDatePickerModal}
                          minimumDate={new Date()}
                          //minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                        />


                        <TouchableOpacity onPress={showDatePickerModal} >
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
                          width: "48%",
                        }}
                      >
                        <Text style={styles.label}>Appointment Time</Text>
                        {showPicker && (
                          <DateTimePicker
                            value={time}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                            is24Hour={true}
                          />
                        )}
                        <TouchableOpacity onPress={showTimePicker} >
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
                    <View
                      style={styles.inputContainer}
                    >
                      <Text style={styles.label}>Enter Your Name <Text style={styles.required}>*</Text></Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange("visitername")}
                        onBlur={handleBlur("visitername")}
                        value={values.visitername}
                        placeholder="Enter Your Name"
                      />
                      <Text style={styles.errorTxt}>
                        {touched.visitername && errors.visitername
                          ? errors.visitername
                          : null}
                      </Text>
                    </View>

                    <View
                      style={styles.inputContainer}
                    >
                      <Text style={styles.label}>Select Gender</Text>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={Gender}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={data.gender ?? "Select Gender"}
                        value={gender}
                        onChange={(item) => {
                          setGender(item.value);
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
                      <Text style={styles.errorTxt}>{``}</Text>
                    </View>


                  </View>

                  <View
                    style={styles.inputContainer}
                  >
                    <Text style={styles.label}>Purpose of Visit</Text>
                    {/* <TextInput
                      style={styles.input}
                      onChangeText={handleChange("visit_purpose")}
                      onBlur={handleBlur("visit_purpose")}
                      value={values.visit_purpose}
                      placeholder="Purpose of Visit"
                    />
                    <Text style={styles.errorTxt}>
                      {touched.visit_purpose && errors.visit_purpose
                        ? errors.visit_purpose
                        : null}
                    </Text> */}
                    <View style={styles.radioGroup}>
                      <RadioGroup
                       layout="row"
                        radioButtons={radioButtons}
                        onPress={setSelectedPurpose}
                        selectedId={selectedPurpose}
                      />
                    </View>
                  </View>
           { (selectedPurpose==='Others')&&  <View
                    style={styles.inputContainer}
                  >
                    <Text style={styles.label}>Purpose of Meeting</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("meeting_purpose")}
                      onBlur={handleBlur("meeting_purpose")}
                      value={ values.meeting_purpose}
                      placeholder="Purpose of Meeting"
                    />
                    {/* <Text style={styles.errorTxt}>
                      {touched.meeting_purpose && errors.meeting_purpose
                        ? errors.meeting_purpose
                        : null}
                    </Text> */}
                  </View>}

                  {!data.pic && (!clicked || !imageUri) &&!uploadAgain && <TouchableOpacity
                    style={styles.buttonupload}
                    onPress={() => { navigation.navigate('UserUploadProfile', { mobile: params.mobile, authdata: params.authdata }), setClicked(!clicked) }}
                  >
                    <Text style={styles.buttonText}>Upload Your Photo</Text>
                  </TouchableOpacity>}
                  {(clicked || data.pic) && (imageUri || data.pic) ||uploadAgain ? (
                    <View style={styles.inputContainer}>
                      <View><Text style={styles.label}>Visitors Photo</Text></View>
                      <View style={styles.field}>

                        <Image
                          style={styles.image}
                          source={data.pic && !uploadAgain ? { uri: `https://iammaven.com/v1.0/visitor/image/${data.pic}` } : { uri: imageUri }}
                        />

                      </View>
                      <View><TouchableOpacity onPress={() => { navigation.navigate('UserUploadProfile', { mobile: params.mobile, authdata: params.authdata }), setClicked(!clicked), setUploadAgain(!uploadAgain) }}>
                        <Text style={styles.label}>Upload Photo Again?</Text>
                      </TouchableOpacity></View>
                    </View>
                  ) : null}
                 {idimage && <View style={styles.inputContainer}>
                    <View><Text style={styles.label}>Visitors ID</Text></View>
                    <View style={styles.field}>
                      <Image
                        style={styles.image}
                        source={{ uri: `https://iammaven.com/v1.0/visitor/image/${idimage}` }}
                      />
                    </View>
                  </View>
}


                  <View
                    style={styles.inputContainer}
                  >
                    <Text style={styles.label}>Enter ID</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("doc_no")}
                      onBlur={handleBlur("doc_no")}
                      value={values.doc_no}
                      placeholder="Enter ID Number"
                    />
                    <Text style={styles.errorTxt}>
                      {/* {touched.doc_no && errors.doc_no
                        ? errors.idproof
                        : null} */}
                    </Text>
                  </View>
                  {/* <View
                    style={styles.inputContainer}
                  >
                    <Text style={styles.label}>Enter Address</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      placeholder="Enter Address"
                    />
                    <Text style={styles.errorTxt}>
                      {touched.address && errors.address
                        ? errors.address
                        : null}
                    </Text>
                  </View> */}
                  {/* {!data.pic &&!clicked && <TouchableOpacity
                    style={styles.buttonupload}
                    onPress={() => {navigation.navigate('UserUploadProfile'), setClicked(!clicked)}}
                  >
                    <Text style={styles.buttonText}>Upload Image</Text>
                  </TouchableOpacity>}
                {clicked ||data.pic ? (
          <View style={styles.field}>
            <Text style={styles.label}>Visitor Photo</Text>
            <Image
              style={styles.image}
              source={data.pic?{ uri: `https://iammaven.com/v1.0/visitor/image/${data.pic}`}:{  uri: imageUri}}
            />
          </View>
        ) : null}  */}



                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

          </View>
        </ScrollView>
      </View>)}



    </View >
  )

}

export default UserVisitorBookAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 16,
    //justifyContent: 'center', // Center vertically
    alignItems: "center", // Center horizontally
  },
  required: {
    color: 'red', // Change the color to your preference
    marginLeft: 5, // Adjust the spacing between the label text and the asterisk
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
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
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
    // height: 40,
    // fontSize: 16,
    // borderColor: 'black'
  },
  label: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "500",
    color: '#000000',
    marginBottom: 5
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
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 20,
    marginBottom: 15,
  },
  errorTxt: {
    color: 'red',
    position: 'absolute',
    bottom: 0
  },
  scrollView: {
    padding: 20,
    margin: 0
  },
  button: {
    backgroundColor: '#08A5EF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  buttonupload: {
    backgroundColor: '#f9511c',
    paddingVertical: 8,
    paddingHorizontal: 8,
    //borderRadius: 10,
    marginBottom: 60,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  radioGroup: {
    flexDirection: 'row', // or 'column' for vertical alignment
    justifyContent: 'space-between',
    width: 100, // adjust to your desired width
  },
});