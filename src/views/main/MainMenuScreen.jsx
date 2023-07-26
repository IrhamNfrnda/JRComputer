import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,ScrollView, ImageBackground } from 'react-native';
import SearchComponent from '../component/SearchComponent';
import { Avatar } from 'react-native-paper';
import ProductCard from '../component/ProductCard';
import ProductViewModel from '../../viewmodels/ProductViewModel';
import CategoryViewModel from '../../viewmodels/CategoryViewModel';

const featuredProducts2 = [
  { id: '1', name: 'Product 1', image: require('../../assets/laptop.jpeg') },
  { id: '2', name: 'Product 2', image: require('../../assets/monitor.jpg') },
  { id: '3', name: 'Product 3', image: require('../../assets/mouse.webp') },
];

const MainMenu = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const productViewModel = new ProductViewModel();
  const categoryViewModel = new CategoryViewModel();

  React.useEffect(() => {
    const fetchData = async () => {
      await productViewModel.fetchProducts();
      setProducts(productViewModel.products);

      await categoryViewModel.fetchCategory();
      setCategories(categoryViewModel.category)
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <SearchComponent /> */}
      <View style={styles.contentContainer}>
        {/* Featured Product */}
        <View style={styles.featuredProductContainer}>
          <Text style={styles.featuredProductLabel}>Produk Unggulan</Text>
          <FlatList
            data={featuredProducts2}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.image}
                style={styles.featuredProductImageBackground}
                imageStyle={styles.featuredProductImage}
              >
              </ImageBackground>
            )}
          />
        </View>
        {/* End of Featured Product */}

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesLabel}>Kategori</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Avatar.Text
                size={70}
                label={item.name}
                style={styles.categoryAvatar}
                labelStyle={styles.categoryLabel}
              />
            )}
          />
        </View>
        {/* End of Categories */}

        {/* Product Catalog */}
        <View style={styles.productCatalogContainer}>
          <Text style={styles.productCatalogLabel}>Produk</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAFFFB',
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
  featuredProductContainer: {
    marginBottom: 20,
  },
  featuredProductLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001C30',
    marginBottom: 10,
  },
  featuredProductImageBackground: {
    height: 150,
    justifyContent: 'flex-end',
    padding: 10,
    width: 250,
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#64CCC5',
    resizeMode: 'cover',
  },
  featuredProductImage: {
    borderRadius: 10,
  },
  featuredProductOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 10,
  },
  featuredProductName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesLabel: {
    fontSize: 20,
    color: '#001C30',
    fontWeight: 'bold',
  },
  categoryAvatar: {
    borderRadius: 20,
    backgroundColor: '#64CCC5',
    marginRight: 10,
    marginTop: 10,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#001C30',
  },
  productCatalogContainer: {
    marginBottom: 20,
  },
  productCatalogLabel: {
    fontSize: 20,
    color: '#001C30',
    fontWeight: 'bold',
  },
});

export default MainMenu;
