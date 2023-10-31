import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Keyboard} from 'react-native'
import { useAppSelector } from '../stores/hooks';
import { getUserInfo } from '../stores/userdata/selectors';
//import { transliterate } from 'google-transliterate';


const Confirmation = ({ navigation ,route}: any) => {

     const{params}=route;

    //const data= useAppSelector(getUserInfo);
    const visitorname=params.visitername;
    const phoneNumber=params.contact_number;
  
    

    const maskedPhoneNumber = phoneNumber.slice(-4).padStart(phoneNumber.length, '*');
    //const nameInHindi = transliterate(visitorname, { from: 'en', to: 'hi' });
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{
                width: '100%',
            }}>
                
                        <>
                            <View>
                                
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>Hi {visitorname} , your eGate pass is under process</Text>
                                    <Text style={styles.text}>It will be updated via this number:{maskedPhoneNumber} </Text>
                                </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>नमस्कार {visitorname} , आपका eGate पास प्रक्रिया के तहत है</Text>
                            <Text style={styles.text}>यह नंबर के माध्यम से अपडेट किया जाएगा:{maskedPhoneNumber}  </Text>
                        </View>
                            </View>
                         
                        </>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        

    )
}

export default Confirmation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
   logo: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        marginBottom: 20,
    },
    headline: {
        textAlign: 'center',
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
 
});