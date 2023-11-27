import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { logoutSuccess } from '../stores/authentication/slice'
import { selectAuthenticated } from '../stores/authentication/selectors'
import { logoutapi } from '../utils/api'

const LogoutButton = () => {
 let reqdata:any
const data = useAppSelector(selectAuthenticated);
 const { token, user } = data;
const eid = user?.eid;
const userName = user?.userName;
  reqdata = { token, eid, userName };
    const dispatch = useAppDispatch()
    const handleLogout = async() => {
        if(token)
        {
            console.log("token",reqdata);
            await logoutapi(reqdata)
        }
        
        dispatch(logoutSuccess());
    }

    return (
        <TouchableOpacity
            onPress={handleLogout}
            style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    )
}

export default LogoutButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#08A5EF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 100,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    },
})