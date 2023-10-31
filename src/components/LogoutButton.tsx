import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppDispatch } from '../stores/hooks'
import { logoutSuccess } from '../stores/authentication/slice'

const LogoutButton = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
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