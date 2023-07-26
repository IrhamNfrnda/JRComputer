import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductCard = observer(({ item, navigation }) => {
  const handleProductPress = () => {
    navigation.navigate('ProductDetail', { product: item });
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
    <TouchableOpacity style={styles.productCard} onPress={handleProductPress}>
      <View style={styles.imageContainer}>
        <Image source={{  uri: `${item.image}` }} style={styles.productImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{convertToIDRFormat(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAFFFB',
  },
  productCard: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#64CCC5',
    borderRadius: 15,
    borderColor: 'black',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  imageContainer: {
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ProductCard;
