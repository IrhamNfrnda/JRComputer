import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetailScreen = ({ navigation, route }) => {
  // Retrieve the product ID from the route parameters
  const { productId } = route.params;

  // Mock data for the product details
  const product = {
    id: productId,
    name: 'RAM Laptop Samsung DDR3 4gb',
    price: '100.000',
    category: 'RAM',
    condition: 'Baru',
    description: `-Merk: SAMSUNG
-Chip: SEC / SAMSUNG
-Manufacture: SAMSUNG
-kapasitas: 4GB (1 keping)
-Speed: 1333MHz/ 10600
-Voltase: 1.5v DDR3
-Jenis: RAM LAPTOP
  
Informasi produk:
-Pastikan produk yang kamu beli baru dan ORI hanya disini!
-Garansi seumur hidup, kalau ada kerusakan, lgsg hubungi kita, kita akan ganti yg baru!
-Label original RAM sama seperti pada gambar, yang lain BUKAN!!
-Jangan tergiur harga murah, tapi kualitas PALSU! Pastikan Ram terdeteksi oleh CPUz!
-Ingat ram sangat bisa di rekondisi (copotan), hanya kami berani jamin 100% CHIP ORI dan bukan COPOTAN`,
    image: require('../../assets/ram.webp'),
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    navigation.navigate('Order');
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
        <Image source={product.image} style={styles.productImage} resizeMode="cover" />
  
        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>
  
        {/* Product Price */}
        <Text style={styles.productPrice}>Rp{product.price}</Text>
  
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
