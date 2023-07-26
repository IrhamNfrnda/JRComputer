import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const [userProfile, setUserProfile] = useState({});

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

    const handlePayment = async () => {
        try {
            const apiUrl = 'https://strapi-production-3591.up.railway.app/api/orders'; // Replace 'http://your-strapi-api-url' with the actual URL of your Strapi backend

            // Prepare the order data to be sent in the request body
            const orderData = {
                data: { // Wrap the order data in a "data" object
                    product: product.id, // Replace 'id' with the actual attribute name for the product ID in Strapi
                    price: parseFloat(product.price.replace(/[^\d]/g, '')), // Convert the product price from string to a number
                    quantity: 1, // You can set the quantity here based on your requirements
                    customerName: userProfile?.fullName, // Replace with the actual customer's name
                    customerEmail: userProfile?.email, // Replace with the actual customer's email
                    customerPhone: userProfile?.phoneNumber, // Replace with the actual customer's phone number
                    shippingAddress: userProfile?.address, // Replace with the actual shipping address
                    shippingType: 'Ambil di toko', // Replace with the actual shipping type
                    orderDate: new Date().toISOString(), // Set the order date to the current date and time in ISO 8601 format
                },
            };
            console.log(orderData);

            // Make the POST request to create the order
            const response = await axios.post(apiUrl, orderData);

            // If the order was successfully created, navigate to the Payment screen (or any other screen)
            navigation.navigate('Payment');

            // You can also handle success feedback to the user here if needed
            console.log('Order placed successfully:', response.data);
        } catch (error) {
            // Handle errors here (e.g., show an error message to the user)
            console.error('Error placing order:', error);
            console.log('Error response:', error.response.data);
        }
    };

    const convertToIDRFormat = (numberString) => {
        // Remove any non-numeric characters from the input string
        const numericString = numberString.replace(/[^\d]/g, '');

        // Convert the numeric string to a number
        const number = parseFloat(numericString);

        // Check if the number is valid
        if (isNaN(number)) {
            return 'Invalid Number';
        }

        // Format the number as IDR
        const formattedIDR = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);

        return formattedIDR;
    };


    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <Text style={styles.title}>Rincian Pemesanan</Text>
            </View>

            {/* Product Details */}
            <View style={styles.productDetails}>
                {/* Product Image */}
                <Image source={{ uri: `${product.image}` }} style={styles.productImage} />

                {/* Product Name, Price, and Total */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{convertToIDRFormat(product.price)}</Text>
                    <Text style={styles.productTotal}>Jumlah: 1</Text>
                </View>
            </View>

            {/* Address */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alamat</Text>
                <Text style={styles.address}>{userProfile.address}</Text>
            </View>

            {/* Shipping */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Jenis Pengiriman</Text>
                <Text style={styles.shippingType}>Ambil di toko</Text>
            </View>

            {/* Price Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rincian Harga</Text>
                <View style={styles.priceSummaryRow}>
                    <Text style={styles.priceSummaryLabel}>Subtotal:</Text>
                    <Text style={styles.priceSummaryValue}>{convertToIDRFormat(product.price)}</Text>
                </View>
                <View style={styles.priceSummaryRow}>
                    <Text style={styles.priceSummaryLabel}>Biaya Pengiriman:</Text>
                    <Text style={styles.priceSummaryValue}>Rp0</Text>
                </View>
                <View style={styles.priceSummaryRow}>
                    <Text style={styles.priceSummaryLabel}>Total:</Text>
                    <Text style={styles.priceSummaryValue}>{convertToIDRFormat(product.price)}</Text>
                </View>
            </View>

            {/* Done Button */}
            <TouchableOpacity style={styles.doneButton} onPress={handlePayment}>
                <Text style={styles.doneButtonText}>Pesan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    navbar: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    productDetails: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        marginBottom: 4,
    },
    productTotal: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    address: {
        fontSize: 14,
    },
    shippingType: {
        fontSize: 14,
    },
    priceSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    priceSummaryLabel: {
        fontSize: 14,
    },
    priceSummaryValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OrderScreen;
