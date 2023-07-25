import React from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';

const OrderServiceScreen = ({ navigation }) => {
  const serviceDetails = {
    deviceType: 'Laptop',
    brand: 'HP',
    model: 'Pavilion',
    issueDescription: 'Layar kedip kedip',
    attachment: 'laptop_photo.jpg',
  };

  const priceDetails = {
    serviceCharge: 'Rp 200,000',
    partCost: 'Rp 300,000',
    tax: 'Rp 100,000',
    totalCost: 'Rp 600,000',
  };

  const handleDone = () => {
    // Handle the "Done" button press
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Service Confirmation</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <Text>Device Type: {serviceDetails.deviceType}</Text>
        <Text>Brand: {serviceDetails.brand}</Text>
        <Text>Model: {serviceDetails.model}</Text>
        <Text>Issue Description: {serviceDetails.issueDescription}</Text>
        <Text>Attachment: {serviceDetails.attachment}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <Text>Service Charge: {priceDetails.serviceCharge}</Text>
        <Text>Part Cost: {priceDetails.partCost}</Text>
        <Text>Tax: {priceDetails.tax}</Text>
        <Text>Total Cost: {priceDetails.totalCost}</Text>
      </View>

      <Button title="Done" onPress={handleDone} />
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
