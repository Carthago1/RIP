import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { resetProduct, setProduct } from '../store/productSlice';

export default function ProductScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);
    useEffect(() => {
        async function getOneProduct() {
            await axiosInstance
                .get(`/items/${id}`)
                .then((response) => {
                    dispatch(setProduct(response?.data))
                });
        }
        getOneProduct();
        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    const handleClick = () => {
        const addBasket = async () => {
            const values = {
                status: 'Ожидание оплаты',
                item: +id,
                customer: 1,
            };
            const response = await axiosInstance.post('basket/', values);
        };
        addBasket();
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: product.photo }} />
            <Text style={styles.text}>Название: {product.name}</Text>
            <Text style={styles.text}>Производитель: {product.manufacturer}</Text>
            <Text style={styles.text}>Описание: {product.description}</Text>
            <Text style={styles.text}>Стоимость: {product.price} р.</Text>
            <Button title='Добавить в корзину' onPress={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: { height: 400, alignSelf: 'stretch' },
    text: { color: '#111', fontSize: 16 },
});
