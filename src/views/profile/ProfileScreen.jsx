import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const fetchUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserProfile(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useFocusEffect(() => {
    fetchUserData();
  });


  const handleLogout = async () => {
    try {
      // Show a confirmation alert before logging out
      SweetAlert.showAlertWithOptions(
        {
          title: 'Logout',
          subTitle: 'Are you sure you want to logout?',
          style: 'warning',
          cancellable: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#FF0000',
          showCancelButton: true,
          cancelButtonText: 'Cancel', 
          cancelButtonColor: '#A9A9A9', 
        },
        async (confirmed) => {
          if (confirmed) {
            // Clear user data from local storage
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Login'); // Navigate to Login screen after logout
          }
        }
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userProfile.profilePhoto ? (
        <Avatar.Image size={120} source={userProfile.profilePhoto} />
      ) : (
        <Avatar.Image size={120} source={require('../../assets/profile.webp')} />
      )}
      <Text style={styles.sectionTitle}>Nama Lengkap</Text>
      <Text style={styles.fullName}>{userProfile.fullName}</Text>
      <Text style={styles.sectionTitle}>Email</Text>
      <Text style={styles.email}>{userProfile.email}</Text>
      <Text style={styles.sectionTitle}>No Handphone</Text>
      <Text style={styles.phoneNumber}>{userProfile.phoneNumber}</Text>
      <Text style={styles.sectionTitle}>Alamat</Text>
      <Text style={styles.address}>{userProfile.address}</Text>
      <Button mode="contained" onPress={handleEditProfile} style={styles.editButton}>
        Edit Profile
      </Button>
      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  fullName: {
    fontSize: 24,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  logoutButton: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#FF0000', 
  },
});

export default ProfileScreen;
