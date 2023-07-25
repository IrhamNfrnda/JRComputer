import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

const ProfileScreen = ({navigation}) => {
  const userProfile = {
    fullName: 'Dinda',
    email: 'dinda@gmail.com',
    phoneNumber: '082278127263',
    address: 'Jl. Purwodadi Ujung, Kec. Tampan, Pekanbaru',
    profilePhoto: require('../../assets/icon.png'),
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Avatar.Image size={120} source={userProfile.profilePhoto} />
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
    marginBottom: 16,
  },
});

export default ProfileScreen;
