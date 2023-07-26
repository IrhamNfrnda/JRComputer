import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, TextInput, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                const userIdString = await AsyncStorage.getItem('userId');
                if (userDataString && userIdString) {
                    const userData = JSON.parse(userDataString);
                    setFullName(userData.fullName);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setAddress(userData.address);
                    setProfilePhoto(userData.profilePhoto);
                    setUserId(userIdString);
                    console.log(userIdString);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getUserData();
    }, []);

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

    const handleSaveProfile = async (e) => {
        e.preventDefault();

        try {
            // Prepare the updated profile data
            const updatedProfile = {
                data: {
                    fullName: fullName,
                    email: email,
                    phoneNumber: phoneNumber,
                    address: address,
                }
            };

            // If profilePhoto is not null, add it to the updatedProfile
            if (profilePhoto) {
                const formData = new FormData();
                formData.append('files.profilePhoto', {
                    uri: profilePhoto.uri,
                    type: profilePhoto.type,
                    name: profilePhoto.name,
                });

                // Make a POST request to upload the profile picture to Strapi
                const response = await axios.post('https://strapi-production-3591.up.railway.app/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response)
                // Get the URL of the uploaded image from the response
                const imageUrl = response.data.url;
                console.log(imageUrl)

                // Add the profilePhoto URL to the updatedProfile
                updatedProfile.data.profilePhoto = imageUrl;
            }

            // Make a PATCH request to update the profile in Strapi
            const response = await axios.put(`https://strapi-production-3591.up.railway.app/api/customers/${userId}`, updatedProfile);
            const userData = response.data.data.attributes;

            // Update the user data in local storage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            // Show success alert after successful profile update
            SweetAlert.showAlertWithOptions({
                title: 'Profile Update',
                subTitle: 'Your profile has been updated successfully!',
                style: 'success',
                cancellable: true,
            });

            // Navigate back to the ProfileScreen
            navigation.goBack();
        } catch (error) {
            // Show an error alert if profile update fails
            SweetAlert.showAlertWithOptions({
                title: 'Profile Update Error',
                subTitle: 'Failed to update profile. Please try again later.',
                style: 'error',
                cancellable: true,
            });
            console.error('Error updating profile:', error);
            console.log('Error response:', error.response.data);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                {/* <Avatar.Image size={120} source={profilePhoto} />
                <Button onPress={handleFilePicker} style={styles.filePickerButton}>
                    {profilePhoto ? 'Foto Terupload' : 'Pilih Foto'}
                </Button> */}
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
