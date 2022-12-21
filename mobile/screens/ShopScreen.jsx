import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { setProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';

export default function ShopScreen({ navigation }) {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    useEffect(() => {
        async function getAllProducts() {
            await axiosInstance
                .get('/items')
                .then((response) => {
                    dispatch(setProducts(response?.data))
                });
        }
        getAllProducts();
    }, [dispatch]);

    const handlePress = () => {
        navigation.navigate('Корзина');
    };

    return (
        <ScrollView>
            <Button title='Корзина' onPress={handlePress} />
            <View>
                {!!products &&
                    products.map((product) => <ProductCard key={product.id_item} {...product} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}
