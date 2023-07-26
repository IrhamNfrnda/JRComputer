import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
// import firebase from 'react-native-firebase';
import SweetAlert from 'react-native-sweet-alert';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const handleRegister = async () => {
        try {

            // Registration successful, now create the customer in Strapi
            const customerData = {
                data: {
                    fullName,
                    email,
                    phoneNumber,
                    address,
                }
            };

            // Replace 'YOUR_STRAPI_API_URL' with the actual URL of your Strapi API
            const response = await axios.post('https://strapi-production-3591.up.railway.app/api/customers', customerData);

            console.log('Customer created:', response.data);

            // // Show success alert after successful registration
            // SweetAlert.showSweetAlert('Success', 'Registration successful', 'success', {
            //     confirmButtonText: 'OK',
            //     confirmButtonColor: '#008000',
            // });

            // Navigate back to the login screen after successful registration
            navigation.navigate('Login');
        } catch (error) {
            // Show error alert if registration or customer creation fails
            // SweetAlert.showSweetAlert('Error', 'Failed to register. Please try again.', 'error', {
            //     confirmButtonText: 'OK',
            //     confirmButtonColor: '#FF0000',
            // });
            console.error('Error registering user:', error);
            console.log('Error response:', error.response.data);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>JRComputer.PKU</Text>
            <Text style={styles.registerTitle}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                onChangeText={text => setFullName(text)}
                value={fullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="No Handphone"
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Alamat"
                onChangeText={text => setAddress(text)}
                value={address}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={handleLogin}>
                <View style={styles.registerLink}>
                    <Text style={styles.registerText}>Sudah Memiliki Akun ? </Text>
                    <Text style={styles.registerLinkText}>Login</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    registerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        width: '100%',
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
    },
    registerLinkText: {
        color: 'blue',
        fontSize: 14,
    },
});

export default RegisterScreen;
