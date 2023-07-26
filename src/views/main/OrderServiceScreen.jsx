import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderServiceScreen = ({ navigation, route }) => {
  const { deviceType, brand, model, issueDescription, attachment } = route.params;
  const [userProfile, setUserProfile] = useState({});

  const handleDone = () => {
    postDataToServiceCollection()
      .then(() => navigation.navigate('Home'))
      .catch((error) => console.error('Error placing order:', error));
  };

  useEffect(() => {
        const getUserData = async () => {
          try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (userDataString) {
              const userData = JSON.parse(userDataString);
              setUserProfile(userData);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        getUserData();
      }, []);

  const postDataToServiceCollection = async () => {
    try {
      const response = await axios.post('https://strapi-production-3591.up.railway.app/api/services', {
        data: {
          deviceType,
          brand,
          model,
          issueDescription,
          customerName: userProfile?.fullName,
          customerEmail: userProfile?.email,
          customerPhone: userProfile?.phoneNumber,
          shippingAddress: userProfile?.address,
          shippingType: 'Ambil di toko',
          orderDate: new Date().toISOString(),
        }
      });

      // Show success alert after successful login
      SweetAlert.showAlertWithOptions({
        title: 'Success',
        subTitle: 'Service berhasil diorder!',
        style: 'success',
        cancellable: true,
      });

      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error.response.data);
      throw error;
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Konfirmasi Service</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Pesanan Service</Text>
        <Text>Device Type: {deviceType}</Text>
        <Text>Brand: {brand}</Text>
        <Text>Model: {model}</Text>
        <Text>Issue Description: {issueDescription}</Text>
        {/* <Text>Attachment: {attachment}</Text> */}
      </View>
      <Button title="Order" onPress={handleDone} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OrderServiceScreen;
