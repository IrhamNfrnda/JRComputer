import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MyOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {

    const fetchUserData = async () => {
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

    // Function to fetch order data from Strapi and filter by user email
    const fetchOrders = async () => {
      try {
        // Get user email from wherever you have stored it after login (e.g., AsyncStorage)
        const userEmail = userProfile.email;

        // Make API request to fetch order data from Strapi
        const response = await axios.get(`https://strapi-production-3591.up.railway.app/api/orders?populate=*&filters[customerEmail][$eq]=${userEmail}`);

        setOrders(response.data.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching orders:', error.response.data);
        setLoading(false); // Set loading to false in case of error
      }
    };

    const fetchServices = async () => {
      try {
        // Make API request to fetch service data from Strapi
        const response = await axios.get('https://strapi-production-3591.up.railway.app/api/services');

        setServices(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching services:', error.response.data);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserData();
    fetchOrders();
  }, [userProfile]); // Fetch orders whenever userProfile changes

  const renderOrderCard = ({ item }) => (
    <Card style={styles.orderCard}>
      <Text style={styles.orderName}>{item.attributes.product.data.attributes.name}</Text>
      <Text style={styles.orderPrice}>Harga: Rp{item.attributes.price}</Text>
      <Text style={styles.orderStatus}>Status: {item.attributes.status}</Text>
    </Card>
  );

  const renderServiceCard = ({ item }) => (
    <Card style={styles.serviceCard}>
      <Text style={styles.serviceName}>{item.attributes.title}</Text>
      <Text style={styles.orderPrice}>Harga: Rp{item.attributes.price}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {loading ? (
        <Text>Loading...</Text> // Show loading indicator while fetching data
      ) : userProfile && userProfile.email ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderCard}
        />
      ) : (
        <Text>No user data found</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 14,
  },
});


export default MyOrderScreen
