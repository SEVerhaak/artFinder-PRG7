import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

export default function FavouriteCard({ title, image, item, navigation }) {

    const { theme } = useContext(ThemeContext); // Get theme from context

    return (
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <Image source={image} style={styles.image} />
            <Button title="Details"/>
            <View style={styles.heart}>
                <Text style={styles.heartText}>❤️</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    heart: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#f00',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartText: {
        color: '#fff',
        fontSize: 16,
    },
});