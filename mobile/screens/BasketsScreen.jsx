import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import {setBasket} from "../store/basketSlice";

const win = Dimensions.get('window');
export default function BasketScreen() {
    const dispatch = useDispatch();
    const { basket } = useSelector((store) => store.basket);

    useEffect(() => {
        async function getAllProducts() {
            await axiosInstance
                .get('/basket-depth')
                .then((response) => {
                    dispatch(setBasket(response?.data))
                });
        }
        getAllProducts();
    }, [dispatch]);


    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            await axiosInstance
                .delete(`basket/${id}/`)
                .then(
                    async () =>
                        await axiosInstance
                            .get('basket-depth/')
                            .then((response) => {
                                dispatch(setBasket(response?.data))
                            })
                );
        };
        fetchDelete(id);
    };
    return (
        <ScrollView>
            {basket.map((note) => (
                <View style={styles.card}>
                    <Image resizeMode='contain' style={styles.image} source={{ uri: note?.item.photo }} />
                    <Text style={styles.text}>Название: {note?.item.name}</Text>
                    <Text style={styles.text}>Статус: Ожидает оплаты</Text>
                    <Text style={styles.text}>Стоимость: {note?.item.price} р.</Text>
                    <Text style={styles.text}>Описание: {note.item.description}</Text>
                    <Button title='Удалить' onPress={() => handleDelete(note.id)} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fdfdfd',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: { width: 400, height: 400 , alignSelf: 'stretch', alignItems:'center',justifyContent: 'center'},
    text: { color: '#111', fontSize: 16 },
});