import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const MyOrderScreen = (navigation) => {

    const orders = [
        { id: '1', name: 'RAM Samsung 4gb', price: '200.000', status: 'Diproses' },
        { id: '2', name: 'Pasang RAM', price: '50.000', status: 'Diproses' },
        { id: '3', name: 'Monito LG 24 inch', price: '1.500.000', status: 'Selesai' },
    ];

    const renderOrderCard = ({ item }) => (
        <Card style={styles.orderCard}>
            <Text style={styles.orderName}>{item.name}</Text>
            <Text style={styles.orderPrice}>Harga: Rp{item.price}</Text>
            <Text style={styles.orderStatus}>Status: {item.status}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
            />
        </View>
    )
}

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
  