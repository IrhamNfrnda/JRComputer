import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';
import ProductCard from '../component/ProductCard'; // Import your ProductCard component here
import ProductViewModel from '../../viewmodels/ProductViewModel';

const ProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const route = useRoute();
    const { category } = route.params;
    const productViewModel = new ProductViewModel();

    useEffect(() => {
        const fetchData = async (category) => {
            await productViewModel.fetchProductsByCategory(category);
            setProducts(productViewModel.products);
            console.log(products)
        };

        fetchData(category);
    }, [category]);

    // Function to fetch products by category from Strapi
    const fetchProductsByCategory = async (category) => {
        try {
            // Modify the API URL to filter products by category
            const response = await axios.get(`https://strapi-production-3591.up.railway.app/api/categories/${category.id}?populate=*`);

            const allProducts = response.data.data.attributes.products.data;
            setProducts(allProducts);
        } catch (error) {
            console.error('Error fetching products:', error.response.data);
        }
    };

    // Render the product cards using the ProductCard component
    const renderProductCard = ({ item }) => (
        <ProductCard item={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produk</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductCard}
            />
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
});

export default ProductScreen;
