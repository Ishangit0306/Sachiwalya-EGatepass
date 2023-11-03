import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../stores/hooks";
import { selectAuthenticated } from "../stores/authentication/selectors";
import { getVisitorsList } from "../stores/visitors/selectors";
import { VisitorsFormState } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import { getVisitorsListApi, updateVisitorStatusApi } from "../utils/api";
import Toast from "react-native-root-toast";
import { IconButton } from "react-native-paper";
import { sendSMSToVisitor } from "../utils/sms";
import moment from 'moment-timezone';
import { API_BASE_URL, ROLE_TYPE_EMPLOYEE, ROLE_TYPE_SECURITY } from "../utils/config";

type ItemData = {
  PurposeOfVisit: string;
  lastname: string;
  firstname: string;
  id: string;
};

type ItemProps = {
  item: any;
  role: any;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const statusText = (isapproved: number) => {
  if (isapproved === 1) {
    return "Approved";
  }

  if (isapproved === 2) {
    return "Rejected";
  }

  if (isapproved === 0) {
    return "Pending";
  }
};

const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "#FFA500"; // Orange
    case 1:
      return "#008000"; // Green
    case 2:
      return "#FF0000"; // Red
    default:
      return "#000000"; // Default to black or any other valid color code
  }
};
const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  role,
}: ItemProps) => (
  <TouchableOpacity
    key={item?.visitorId}
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
        Visitor Name:
      </Text>
      <Text style={styles.textRight}>{item?.name}</Text>
    </View>

    {role === ROLE_TYPE_SECURITY && (
      <>
        <View style={[styles.textWrap]}>
          <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
            Whom to Meet:
          </Text>
          <Text style={styles.textRight}>
            {item && item?.empName ? item.empName : "Evon Tech"}
          </Text>
        </View>
        <View style={[styles.textWrap]}>
          <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
            Department:
          </Text>
          <Text style={styles.textRight}>{item?.dept}</Text>
        </View>
      </>
    )}

    <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>Purpose:</Text>
      <Text style={styles.textRight}>{item?.purpose}</Text>
    </View>
    <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
        Appointment Date & Time:
      </Text>
      <Text style={styles.textRight}>
        {item?.date} {item?.time}
      </Text>
    </View>

    <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>Status:</Text>
      <Text
        style={[
          styles.textRight,
          {
            color: getStatusColor(item?.isapproved),
          },
        ]}
      >
        {statusText(item?.isapproved)}
      </Text>
    </View>
  </TouchableOpacity>
);
const EmployeeListScreen = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState<string>();
  const authState: any = useAppSelector(selectAuthenticated);
  const [visitorData, setVisitorData] = useState<any>([]);
  const [pendingStatus, setPendingStatus] = useState("In Progress");
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedVisitorId, setSelectorVisitorId] = useState<number>();
  // const [meetingDate, setMeetingDate] = useState<any>("");
  // const [meetingTime, setMeetingTime] = useState<any>("");
  // const [meetDept, setMeetDept] = useState<any>("");
  // const [meetEmployee, setMeetEmployee] = useState<string>("Evon Tech");
  // const [meetVisitor, setMeetVisitor] = useState<string>("");
  const [itemObj, setItemObj] = useState<any>({});


  const handleButtonPress = (visitorId: number, isapproved: number, item: any) => {

    if (authState?.role == ROLE_TYPE_EMPLOYEE && isapproved === 0) {
      setItemObj(item);

      setModalVisible(true);
      setSelectorVisitorId(visitorId);
    }
  };
  //console.log('itemobj',itemObj);
  const _drawerOpenClose = () => {
    setModalVisible(false);
  };

  //modal end
  const renderItem = ({ item }: { item: any }) => {
    console.log('item', item);
    const backgroundColor = item?.id === selectedId ? "#cce5ff" : "#f2f2f2";
    const color = item?.id === selectedId ? "blue" : "black";
    const formattedDate = moment(item.date).format('YYYY-MM-DD');
    return (
      <>
        <Item
          item={{ ...item, date: formattedDate }}
          onPress={() => handleButtonPress(item?.fkuid, item?.isapproved, item)}
          backgroundColor={backgroundColor}
          textColor={color}
          role={authState.role}
        />
      </>
    );
  };

  const [activeTab, setActiveTab] = React.useState(2);
  const handleTabPress = (tabIndex: any) => {
    setActiveTab(tabIndex);
    toggleButtonState();
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("active",activeTab);
      const { token, role, user: { etype, eid } }: any = authState;
      const fetchLeaderBoardData = async () => {
        try {
          const resData = await getVisitorsListApi({
            token: token,
            role: role,
            etype: etype,
            eid: eid,
            archive:activeTab
          });

          if (resData.statusCode === 200 || resData.statusCode === 201) {
            const data = resData.data;
            console.log('data update', data);
            setVisitorData(data);
            // setIsLoading(false);
          }
        } catch (e) {
          Toast.show("Error! login error", { duration: Toast.durations.LONG });
        }
      };

      fetchLeaderBoardData();
    }, [isModalVisible,activeTab])
  );

  const statusUpdateClick = async (status: "Approved" | "Rejected") => {
    let status_id;
    if (status === "Approved") {
      status_id = 1;
    }

    if (status === "Rejected") {
      status_id = 2;
    }

    if (selectedVisitorId && authState?.token && status_id) {

      //console.log("data sending toapi",selectedVisitorId,status_id);
      const data = await updateVisitorStatusApi({
        visitor_id: selectedVisitorId,
        status: status_id,
        token: authState?.token,
      });
      //console.log("res from update ai",data);
      if (data.statusCode === 201) {
        setModalVisible(false);
      }
    }
    //const empName = "Evon Tech";
    if (status === "Approved") {
      const msg: any = `Namaste ${itemObj.name}! Congratulations, your request for an appointment with ${itemObj.ename}, ${itemObj.dept}, Uttarakhand government,has been approved! On arrival, please click on the link below and show the QR code to the Security: ${API_BASE_URL}/oldvisitor/qrcode/${itemObj.phno}`;
    //sendSMSToVisitor(itemObj.phno, msg);
    } else if (status === "Rejected") {
      const msg: any = `Namaste ${itemObj.name}! Unfortunately, your request for an appointment   with ${itemObj.ename}, ${itemObj.dept}, Uttarakhand government, has been rejected!`
   //sendSMSToVisitor(itemObj.phno, msg);
    }
  };
  //console.log('visitordara',visitorData);
  // const filteredItemsArray = visitorData.filter((item:any) => {
  //   const currentTime = new Date();
  //   return (
  //     item.date && new Date(item.date).toDateString() !== currentTime.toDateString() || item.isapproved !== 0 || new Date(item.date).toDateString() > currentTime.toDateString()
  //   );
  // });
  // console.log('filteritem',filteredItemsArray);
  const [isButtonActive, setIsButtonActive] = useState<any>(false)
  //const filteredArray = visitorData.filter((item:any) => !filteredItemsArray.includes(item));
  const toggleButtonState = () => {
    setIsButtonActive(!isButtonActive);
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View>


        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: activeTab === 2 ? 'blue' : 'gray',
            }}
            onPress={() => handleTabPress(2)}
            disabled={activeTab === 2}
          >
            <Text style={{ color: 'white' }}>Upcoming/Today's Visits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: activeTab === 3 ? 'blue' : 'gray',
            }}
            onPress={() => handleTabPress(3)}
            disabled={activeTab === 3}
          >
            <Text style={{ color: 'white' }}>Archived Visits</Text>
          </TouchableOpacity>
        </View>
        {/* <TabButton title="Tab 1" isActive={activeTab === 1} onPress={() => handleTabPress(1)} />
      <TabButton title="Tab 2" isActive={activeTab === 2} onPress={() => handleTabPress(2)} /> */}
      </View>
      <FlatList
        data={visitorData}
        //data={isButtonActive?filteredItemsArray:filteredArray}
        renderItem={renderItem}
        keyExtractor={(item, index): any => index}
        extraData={selectedId}
        style={{ width: "100%", paddingHorizontal: 20 }}
      />

      <View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: 'center'
                }}>

                  <Text style={styles.modalText}>
                    Do you want to approve or reject?
                  </Text>

                  <IconButton style={{ marginBottom: 20 }} onPress={_drawerOpenClose} icon="close-circle" />
                </View>
                <View style={[styles.textWrap]}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
                    Visitor Name:
                  </Text>
                  <Text style={styles.textRight}>{itemObj?.name}</Text>
                </View>
                <View style={[styles.textWrap]}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
                    Purpose:
                  </Text>
                  <Text style={styles.textRight}>{itemObj?.purpose}</Text>
                </View>

                <View style={[styles.textWrap]}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
                    Whom To Meet:
                  </Text>
                  <Text style={styles.textRight}>{itemObj?.ename}</Text>
                </View>
                <View style={[styles.textWrap]}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
                    Department:
                  </Text>
                  <Text style={styles.textRight}>{itemObj?.edepartment}</Text>
                </View>
                {/* <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
       Appointment Date:
      </Text>
      <Text style={styles.textRight}>{itemObj?.date}</Text>
    </View>
    <View style={[styles.textWrap]}>
      <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
       Appointment Time:
      </Text>
      <Text style={styles.textRight}>{itemObj?.time}</Text>
    </View> */}
                <View style={[styles.textWrap]}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>
                    Phone No.:
                  </Text>
                  <Text style={styles.textRight}>{itemObj?.phno}</Text>
                </View>

                <View style={styles.textWrap}>
                  <Text style={[styles.textLeft, { fontWeight: "bold" }]}>Visitor Photo </Text>

                  <Image
                    style={styles.image}
                    source={{ uri: `${API_BASE_URL}/v1.0/visitor/image/${itemObj.profile_pic}` }}
                  />
                </View>

                {itemObj.id_pic != "null" && itemObj.id_pic != null && itemObj ? (
                  <View style={styles.textWrap}>
                    <Text style={[styles.textLeft, { fontWeight: "bold" }]}>Visitor Id Photo</Text>
                    <Image
                      style={styles.image}
                      source={{ uri: `${API_BASE_URL}/v1.0/visitor/image/${itemObj.id_pic}` }}
                    />
                  </View>
                ) : null}

                {/* <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center'
              }}>
               
                <Text style={styles.modalText}>
                  Do you want to approve or reject?
                </Text>

                <IconButton style={{ marginBottom: 20 }} onPress={_drawerOpenClose} icon="close-circle" />
              </View> */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#28a745" }]}
                    onPress={() => statusUpdateClick("Approved")}
                  >
                    <Text style={styles.modalButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#dc3545" }]}
                    onPress={() => statusUpdateClick("Rejected")}
                  >
                    <Text style={styles.modalButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#f2f2f2", // Set a background color for the container
  },
  image: {
    width: 150,
    height: 150,
  },
  item: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Add a border to separate items
  },
  title: {
    fontSize: 20,
    fontWeight: "bold", // Make the title bold
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center", // Center the text in the modal
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "45%", // Adjust the width of the buttons
    alignItems: "center", // Center the text inside the button
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  width50: {
    width: "50%",
    flexWrap: "wrap",
  },
  textLeft: {
    width: "40%",
    flexWrap: "wrap",
  },
  textRight: {
    width: "60%",
    flexWrap: "wrap",
  }
  ,
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: 'blue', // Color for the active tab
  },
  tabText: {
    color: 'black', // Color for inactive tab text
  },
  activeTabText: {
    color: 'blue', // Color for active tab text
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//     backgroundColor: '#fff', // Set a background color for the container
//   },
//   item: {
//     flexDirection: 'row', // Arrange items horizontally
//     alignItems: 'center', // Center items vertically
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc', // Add a border to separate items
//   },
//   itemText: {
//     flex: 1, // Allow the text to take remaining space
//     fontSize: 16,
//     marginLeft: 10, // Add some space between the text and other elements
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold', // Make the title bold
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center', // Center the text in the modal
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   modalButton: {
//     flex: 1, // Allow buttons to take equal space
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center', // Center the text inside the button
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

export default EmployeeListScreen;
