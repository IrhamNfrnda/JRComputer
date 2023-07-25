import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderScreen = ({ navigation }) => {

    const handlePayment = () => {
        // Handle checkout logic here
        navigation.navigate('Payment');
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
                <Image source={require('../../assets/ram.webp')} style={styles.productImage} />

                {/* Product Name, Price, and Total */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>RAM Laptop Samsung DDR3 4gb</Text>
                    <Text style={styles.productPrice}>Rp100.000</Text>
                    <Text style={styles.productTotal}>Jumlah: 1</Text>
                </View>
            </View>

            {/* Address */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alamat</Text>
                <Text style={styles.address}>Jl. Purwodadi Ujung, Kec. Tampan, Pekanbaru</Text>
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
                    <Text style={styles.priceSummaryValue}>Rp100.000</Text>
                </View>
                <View style={styles.priceSummaryRow}>
                    <Text style={styles.priceSummaryLabel}>Biaya Pengiriman:</Text>
                    <Text style={styles.priceSummaryValue}>Rp0</Text>
                </View>
                <View style={styles.priceSummaryRow}>
                    <Text style={styles.priceSummaryLabel}>Total:</Text>
                    <Text style={styles.priceSummaryValue}>Rp100.000</Text>
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
