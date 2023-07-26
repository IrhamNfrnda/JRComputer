import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Check if the email exists in Strapi
            const response = await axios.get(`https://strapi-production-3591.up.railway.app/api/customers?filters[email][$eq]=${email}`);
            const userId = response.data.data[0].id;
            const userData = response.data.data[0].attributes;
            // Check if the response contains data and is not empty

            console.log(userData);
            if (!userData) {
                // User with the email not found, show error alert
                SweetAlert.showAlertWithOptions({
                    title: 'Login Error',
                    subTitle: 'Email not registered. Please sign up first.',
                    style: 'error',
                    cancellable: true,
                });
                return; // Stop the login process if email is not registered
            }

            // Save user data to local storage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('userId', JSON.stringify(userId));

            // Show success alert after successful login
            SweetAlert.showAlertWithOptions({
                title: 'Login Success',
                subTitle: 'You have successfully logged in!',
                style: 'success',
                cancellable: true,
            });

            setEmail('');
            setPassword('');
            navigation.navigate('MainMenu');
        } catch (error) {
            // Show an error alert if login fails
            SweetAlert.showAlertWithOptions({
                title: 'Login Error',
                subTitle: 'Failed to login. Please check your email and password.',
                style: 'error',
                cancellable: true,
            });
            console.error('Error logging in:', error);
        }
    };


    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>JRComputer.PKU</Text>
            <Text style={styles.loginTitle}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={handleRegister}>
                <View style={styles.registerLink}>
                    <Text style={styles.registerText}>Belum Memiliki Akun ? </Text>
                    <Text style={styles.registerLinkText}>Register</Text>
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
    loginTitle: {
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
    loginButton: {
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

export default LoginScreen;
