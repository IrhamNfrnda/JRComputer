import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('MainMenu');
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
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
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
