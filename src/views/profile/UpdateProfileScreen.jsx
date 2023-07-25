import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, TextInput, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const EditProfileScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleSaveProfile = () => {
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Phone Number:', phoneNumber);
        console.log('Address:', address);
        console.log('Profile Photo:', profilePhoto);
    };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            setProfilePhoto(res);
        } catch (error) {
            console.log('Error picking file:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <Avatar.Image size={120} source={profilePhoto} />
                <Button onPress={handleFilePicker} style={styles.filePickerButton}>
                    {profilePhoto ? 'Foto Terupload' : 'Pilih Foto'}
                </Button>
                <Text style={styles.sectionTitle}>Nama Lengkap</Text>
                <TextInput
                    label="Masukan Nama Lengkap"
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    style={styles.input}
                />
                <Text style={styles.sectionTitle}>Email</Text>
                <TextInput
                    label="Masukan Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <Text style={styles.sectionTitle}>No Handphone</Text>
                <TextInput
                    label="Masukan No Handphone"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={styles.input}
                />
                <Text style={styles.sectionTitle}>Alamat</Text>
                <TextInput
                    label="Masukan Alamat"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                    multiline
                />
                <Button mode="contained" onPress={handleSaveProfile} style={styles.saveButton}>
                    Simpan
                </Button>
                <Button mode="contained" onPress={() => navigation.goBack()} style={styles.saveButton}>
                    Batal
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    filePickerButton: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'flex-start',
        width: '100%',
    },
    input: {
        marginBottom: 16,
        width: '100%',
    },
    saveButton: {
        width: '100%',
        marginBottom: 16,
    },
});

export default EditProfileScreen;
