import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetailScreen = ({ navigation, route }) => {
  // Retrieve the product ID from the route parameters
  const { product } = route.params;

  const handleCheckout = () => {
    // Handle checkout logic here
    navigation.navigate('Order', { product: product });
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          {/* Your back button component */}
        </TouchableOpacity>
        <Text style={styles.title}>Detail Produk</Text>
      </View>

      <ScrollView>
        {/* Product Image */}
        <Image source={{  uri: `${product.image}` }} style={styles.productImage} resizeMode="cover" />

        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Product Price */}
        <Text style={styles.productPrice}>{convertToIDRFormat(product.price)}</Text>

        {/* Product Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Kategori:</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>
        {/* Product Condition */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Kondisi:</Text>
          <Text style={styles.category}>{product.condition}</Text>
        </View>

        {/* Product Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Deskripsi:</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAFFFB',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    // Styles for your back button
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001C30'
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001C30'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#001C30'
  },
  category: {
    flex: 1,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001C30'
  },
  description: {
    lineHeight: 20,
    paddingBottom: 50,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
