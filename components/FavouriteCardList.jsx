import React from 'react';
import { View, StyleSheet } from 'react-native';
import FavouriteCard from './FavouriteCards';

export default function FavouriteCardList() {
    const favourites = [
        { id: 1, title: 'Starry Night', image: require('../assets/starry_night.jpg') },
        { id: 2, title: 'Swirly Tree', image: require('../assets/tree.jpg') },
    ];

    return (
        <View style={styles.row}>
            {favourites.map(item => (
                <FavouriteCard key={item.id} title={item.title} image={item.image} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
