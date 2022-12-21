import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React from 'react';

export default function ProductCard({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Товар', { id: props.id_item });
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: props.photo }} />
            <Text style={styles.text}>Название: {props.name}</Text>
            <Text style={styles.text}>Стоимость: {props.price} р.</Text>
            <Button title='Подробнее' onPress={handlePress} />
        </View>
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
    image: { height: 400, alignSelf: 'stretch' },
    text: { color: '#111', fontSize: 16 },
});
