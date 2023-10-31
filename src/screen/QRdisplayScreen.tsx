import { Button, Image, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React from "react";
import { Headline, PaperProvider } from "react-native-paper";
import { API_BASE_URL } from "../utils/config";
import moment from 'moment-timezone';


const QRdisplayScreen = ({ navigation, route }: any) => {
  const { params } = route;
  const data = JSON.parse(params.Qrdata);
  const formattedDate = moment(data?.date).format('YYYY-MM-DD');
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'unknown';
    }
  };

  console.log('qrscreen',data);
  let status = data.isapproved;
  if (status == 1) {
    status = "Approved";
  } else if (status == 2) {
    status = "Rejected";
  } else {
    status = "Pending";
  }
  console.log(data,"in display");
  console.log('url',`${API_BASE_URL}/v1.0/${data.id_pic}`)
  return (
    <View style={{}}>
      <ScrollView style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.label}>Visitor Name:</Text>
          <Text style={styles.value}>{data.uname}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>ID No:</Text>
          <Text style={styles.value}>{data.uidentitynum}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{data?.purpose}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Whom To Meet:</Text>
          <Text style={styles.value}>
            {data?.ename}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>{data?.edepartment}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Appointment Date:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Appointment Time:</Text>
          <Text style={styles.value}>{data?.time}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, {
            color: getStatusColor(status)
          }]}>{status}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone No:</Text>
          <Text style={styles.value}>{data?.uphone}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Visitor Photo </Text>
          
          <Image
            style={styles.image}
            source={{ uri: `${API_BASE_URL}/v1.0/visitor/image/${data.uphoto}` }}
          />
        </View>

        {data.id_pic != "null" && data.id_pic != null && data ? (
          <View style={styles.field}>
            <Text style={styles.label}>Visitor Id Photo</Text>
            <Image
              style={styles.image}
              source={{ uri: `${API_BASE_URL}/v1.0/visitor/image/${data.id_pic}` }}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066cc",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#1A80C2",
  },
  image: {
    width: 250,
    height: 250,
  },
});
export default QRdisplayScreen;